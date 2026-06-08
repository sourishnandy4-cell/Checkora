import React, { useState, useEffect, useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { 
  Play, 
  Pause, 
  FlipHorizontal, 
  Upload, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight, 
  X,
  Plus
} from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { useSettingsStore } from '../store/settingsStore';
import { StockfishEngine, EngineEvaluation } from '../engine/stockfish';
import { playSound } from '../utils/audio';
import { useChessOptions } from '../utils/useChessOptions';

interface ChartPoint {
  move: number;
  eval: number; // clamped for plotting
}

export const Analysis: React.FC = () => {
  const { showCoordinates, pieceSet, showLegalMoves } = useSettingsStore();

  // Chess Board state
  const [analysisChess, setAnalysisChess] = useState<Chess>(new Chess());
  const [fen, setFen] = useState<string>('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  const [history, setHistory] = useState<string[]>([]);
  const [currentMoveIdx, setCurrentMoveIdx] = useState<number>(-1);
  const [boardFlipped, setBoardFlipped] = useState(false);
  const [rightClickedSquares, setRightClickedSquares] = useState<{ [square: string]: React.CSSProperties | undefined }>({});

  // Engine evaluation states
  const [engineActive, setEngineActive] = useState(true);
  const [evalData, setEvalData] = useState<EngineEvaluation>({ depth: 0, score: 0 });
  const [depthLimit, setDepthLimit] = useState(14);
  const [evalHistory, setEvalHistory] = useState<ChartPoint[]>([{ move: 0, eval: 0 }]);

  // Modal states
  const [showImportModal, setShowImportModal] = useState(false);
  const [importInput, setImportInput] = useState('');
  const [importType, setImportType] = useState<'FEN' | 'PGN'>('FEN');

  const engineRef = useRef<StockfishEngine | null>(null);

  // Responsive board size
  const boardContainerRef = useRef<HTMLDivElement>(null);
  const [boardSize, setBoardSize] = useState(492);

  const { optionSquares, onSquareClick: defaultSquareClick, onPieceDragBegin, onPieceDragEnd, clearOptions } = useChessOptions(
    analysisChess,
    onPieceDrop,
    true,
    showLegalMoves
  );

  const onSquareClick = (square: string) => {
    setRightClickedSquares({});
    defaultSquareClick(square);
  };

  function onSquareRightClick(square: string) {
    const colour = "rgba(239, 68, 68, 0.8)";
    setRightClickedSquares((prev) => {
      const copy = { ...prev };
      if (copy[square]) {
        delete copy[square];
      } else {
        copy[square] = { backgroundColor: colour };
      }
      return copy;
    });
  }

  // Initialize analysis engine
  useEffect(() => {
    engineRef.current = new StockfishEngine();
    return () => {
      if (engineRef.current) engineRef.current.terminate();
    };
  }, []);

  // Responsive board size via ResizeObserver
  useEffect(() => {
    const el = boardContainerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        setBoardSize(Math.floor(entry.contentRect.width));
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Trigger engine calculation whenever FEN changes
  useEffect(() => {
    if (!engineActive || !engineRef.current) return;

    engineRef.current.stop();
    setEvalData({ depth: 0, score: 0 });

    engineRef.current.evaluatePosition(fen, depthLimit, (evaluation) => {
      setEvalData(evaluation);

      // Map evaluation to chart (clamp to +8 / -8 for visible scale)
      const clampedScore = evaluation.mateIn 
        ? (evaluation.mateIn > 0 ? 8 : -8)
        : Math.min(8, Math.max(-8, evaluation.score));

      // Update active move index evaluation inside history plotting
      setEvalHistory((prev) => {
        const next = [...prev];
        const activeIndex = currentMoveIdx + 1; // 0 index is start
        
        const nextPoint = { move: activeIndex, eval: clampedScore };
        if (next[activeIndex]) {
          next[activeIndex] = nextPoint;
        } else {
          next.push(nextPoint);
        }
        return next;
      });
    });
  }, [fen, engineActive, depthLimit, currentMoveIdx]);

  useEffect(() => {
    clearOptions();
    setRightClickedSquares({});
  }, [fen]);

  // Handle piece drop in free setup
  const onPieceDrop = (sourceSquare: string, targetSquare: string): boolean => {
    try {
      const tempChess = new Chess(fen);
      
      const move = tempChess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q'
      });

      if (move) {
        playSound.play('move');

        // Capture moves array and cut off future history if user drop branches
        const fullHistory = analysisChess.history();
        const activeHistory = fullHistory.slice(0, currentMoveIdx + 1);
        
        const nextChess = new Chess();
        // Re-make all previous moves plus active move
        activeHistory.forEach(m => nextChess.move(m));
        nextChess.move({ from: sourceSquare, to: targetSquare, promotion: 'q' });

        setAnalysisChess(nextChess);
        setFen(nextChess.fen());
        setHistory(nextChess.history());
        setCurrentMoveIdx(activeHistory.length);

        return true;
      }
    } catch {
      // Invalid moves
    }
    return false;
  };

  // Navigations [◀◀] [◀] [▶] [▶▶]
  const handleJumpStart = () => {
    const nextChess = new Chess();
    setAnalysisChess(nextChess);
    setFen(nextChess.fen());
    setCurrentMoveIdx(-1);
    playSound.play('move');
  };

  const handlePrevMove = () => {
    if (currentMoveIdx < 0) return;
    const fullHistory = history;
    const nextChess = new Chess();
    
    for (let i = 0; i < currentMoveIdx; i++) {
      nextChess.move(fullHistory[i]);
    }

    setAnalysisChess(nextChess);
    setFen(nextChess.fen());
    setCurrentMoveIdx(currentMoveIdx - 1);
    playSound.play('move');
  };

  const handleNextMove = () => {
    if (currentMoveIdx + 1 >= history.length) return;
    const fullHistory = history;
    const nextChess = new Chess();
    
    for (let i = 0; i <= currentMoveIdx + 1; i++) {
      nextChess.move(fullHistory[i]);
    }

    setAnalysisChess(nextChess);
    setFen(nextChess.fen());
    setCurrentMoveIdx(currentMoveIdx + 1);
    playSound.play('move');
  };

  const handleJumpEnd = () => {
    const fullHistory = history;
    const nextChess = new Chess();
    fullHistory.forEach(m => nextChess.move(m));

    setAnalysisChess(nextChess);
    setFen(nextChess.fen());
    setCurrentMoveIdx(fullHistory.length - 1);
    playSound.play('move');
  };

  // Load imported FEN or PGN
  const handleImportSubmit = () => {
    if (!importInput.trim()) return;

    if (importType === 'FEN') {
      try {
        const testChess = new Chess(importInput);
        setAnalysisChess(testChess);
        setFen(testChess.fen());
        setHistory([]);
        setCurrentMoveIdx(-1);
        setEvalHistory([{ move: 0, eval: 0 }]);
        setShowImportModal(false);
        setImportInput('');
        playSound.play('move');
      } catch {
        alert('Invalid FEN format.');
      }
    } else {
      try {
        const testChess = new Chess();
        testChess.loadPgn(importInput);
        setAnalysisChess(testChess);
        setFen(testChess.fen());
        
        const fullHistory = testChess.history();
        setHistory(fullHistory);
        setCurrentMoveIdx(fullHistory.length - 1);
        
        // Initialise empty chart
        const initChart = Array.from({ length: fullHistory.length + 1 }).map((_, idx) => ({
          move: idx,
          eval: 0
        }));
        setEvalHistory(initChart);

        setShowImportModal(false);
        setImportInput('');
        playSound.play('move');
      } catch {
        alert('Invalid PGN format.');
      }
    }
  };

  // Setup FEN/PGN triggers
  const openImport = (type: 'FEN' | 'PGN') => {
    setImportType(type);
    setImportInput('');
    setShowImportModal(true);
  };

  const handleResetBoard = () => {
    const fresh = new Chess();
    setAnalysisChess(fresh);
    setFen(fresh.fen());
    setHistory([]);
    setCurrentMoveIdx(-1);
    setEvalHistory([{ move: 0, eval: 0 }]);
    playSound.play('move');
  };

  // Calculate percentage mapping for the vertical evaluation bar
  // Clamped at white having +5 pawn advantage (100% white) or -5 black advantage (100% black)
  const getEvalBarPercentage = () => {
    if (evalData.mateIn) {
      return evalData.mateIn > 0 ? 100 : 0;
    }
    const score = evalData.score;
    const percentage = 50 + (score * 10); // +5 pawns -> 100%, -5 pawns -> 0%
    return Math.min(100, Math.max(0, percentage));
  };

  const whitePercent = getEvalBarPercentage();
  const formatEvalText = () => {
    if (evalData.mateIn) {
      return `M${Math.abs(evalData.mateIn)}`;
    }
    const val = evalData.score;
    return val >= 0 ? `+${val.toFixed(1)}` : val.toFixed(1);
  };

  const customBoardStyles = {
    customLightSquareStyle: { backgroundColor: 'var(--board-light)' },
    customDarkSquareStyle: { backgroundColor: 'var(--board-dark)' }
  };

  // Scroll log rows
  const renderLogTable = () => {
    const rows = [];
    for (let i = 0; i < history.length; i += 2) {
      const idx = Math.floor(i / 2) + 1;
      const wIdx = i;
      const bIdx = i + 1;
      const wActive = currentMoveIdx === wIdx;
      const bActive = currentMoveIdx === bIdx;

      rows.push(
        <div key={idx} className="flex text-xs font-mono-clock py-1 text-text-secondary border-b border-bg-border/20">
          <span className="w-10 text-text-muted text-center">{idx}.</span>
          <button 
            onClick={() => {
              const nextChess = new Chess();
              for (let x = 0; x <= wIdx; x++) nextChess.move(history[x]);
              setFen(nextChess.fen());
              setCurrentMoveIdx(wIdx);
              playSound.play('move');
            }}
            className={`flex-1 text-left px-2 rounded-sm cursor-pointer ${wActive ? 'bg-bg-elevated font-semibold text-text-primary border-l-2 border-accent-primary' : 'hover:bg-bg-surface hover:text-text-primary'}`}
          >
            {history[wIdx]}
          </button>
          {history[bIdx] && (
            <button 
              onClick={() => {
                const nextChess = new Chess();
                for (let x = 0; x <= bIdx; x++) nextChess.move(history[x]);
                setFen(nextChess.fen());
                setCurrentMoveIdx(bIdx);
                playSound.play('move');
              }}
              className={`flex-1 text-left px-2 rounded-sm cursor-pointer ${bActive ? 'bg-bg-elevated font-semibold text-text-primary border-l-2 border-accent-primary' : 'hover:bg-bg-surface hover:text-text-primary'}`}
            >
              {history[bIdx]}
            </button>
          )}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="w-full h-full flex flex-col bg-base overflow-hidden">
      {/* Upper Control Bar */}
      <div className="h-14 bg-void border-b border-bg-border flex items-center justify-between px-6 shrink-0 select-none z-30">
        <h1 className="font-serif-header text-xl font-bold tracking-tight">Analysis Board</h1>
        
        <div className="flex gap-2">
          <button 
            onClick={() => openImport('FEN')}
            className="premium-btn text-[10px] uppercase font-mono-clock py-1.5 px-3 flex items-center gap-1.5"
          >
            <Upload size={12} /> Import FEN
          </button>
          <button 
            onClick={() => openImport('PGN')}
            className="premium-btn text-[10px] uppercase font-mono-clock py-1.5 px-3 flex items-center gap-1.5"
          >
            <Upload size={12} /> Import PGN
          </button>
          <button 
            onClick={handleResetBoard}
            className="premium-btn text-[10px] uppercase font-mono-clock py-1.5 px-3"
          >
            Clear Board
          </button>
        </div>
      </div>

      {/* Main Core Layout View */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden relative">
        
        {/* SECTION 1: Evaluation Vertical Bar (24px width) */}
        <div className="w-full lg:w-6 h-12 lg:h-full bg-bg-surface border-b lg:border-b-0 lg:border-r border-bg-border relative flex lg:flex-col items-center justify-center select-none shrink-0 z-20">
          {/* Black Portion */}
          <div className="absolute inset-0 bg-zinc-900" />
          {/* White Portion (grows from bottom) */}
          <div 
            style={{ height: `${whitePercent}%` }}
            className="absolute bottom-0 left-0 right-0 bg-zinc-100 transition-all duration-300 ease-out" 
          />
          {/* Eval Badge Indicator */}
          <span className="z-10 font-mono-clock text-[10px] font-bold px-2 py-0.5 rounded-sm mix-blend-difference text-white">
            {formatEvalText()}
          </span>
        </div>

        {/* SECTION 2: Board Workspace */}
        <div className="w-full flex-none lg:flex-1 flex flex-col items-center p-4 lg:p-6 lg:overflow-y-auto select-none">
          <div className="w-full max-w-[500px] flex flex-col gap-4">
            
            {/* Chessboard frame */}
            <div ref={boardContainerRef} data-pieces={pieceSet} className="w-full shrink-0 aspect-square border-4 border-bg-border bg-bg-void rounded-sm shadow-2xl relative">
              <Chessboard
                key={fen}
                id="AnalysisBoard"
                position={fen}
                onPieceDrop={onPieceDrop}
                onPieceDragBegin={(piece, sourceSquare) => {
                  setRightClickedSquares({});
                  onPieceDragBegin(piece, sourceSquare);
                }}
                onPieceDragEnd={onPieceDragEnd}
                onSquareClick={onSquareClick}
                onSquareRightClick={onSquareRightClick}
                boardWidth={boardSize}
                boardOrientation={boardFlipped ? 'black' : 'white'}
                arePiecesDraggable={true}
                showBoardNotation={showCoordinates}
                customLightSquareStyle={customBoardStyles.customLightSquareStyle}
                customDarkSquareStyle={customBoardStyles.customDarkSquareStyle}
                customSquareStyles={{
                  ...(analysisChess.inCheck() 
                    ? {
                        [analysisChess.history({ verbose: true }).pop()?.color === 'w' 
                          ? (analysisChess.board().flatMap(b => b).find(p => p?.type === 'k' && p?.color === 'b')?.square || '')
                          : (analysisChess.board().flatMap(b => b).find(p => p?.type === 'k' && p?.color === 'w')?.square || '')
                        ]: { backgroundColor: 'rgba(248, 113, 113, 0.45)' }
                      }
                    : {}),
                  ...optionSquares,
                  ...rightClickedSquares
                }}
              />
            </div>

            {/* Jump controls toolbar */}
            <div className="flex gap-1.5 w-full justify-between items-center bg-bg-surface border border-bg-border p-2 rounded-sm">
              <div className="flex gap-1">
                <button onClick={handleJumpStart} className="p-2 bg-bg-void border border-bg-border text-text-secondary hover:text-text-primary premium-btn" title="Start">
                  <ChevronsLeft size={14} />
                </button>
                <button onClick={handlePrevMove} className="p-2 bg-bg-void border border-bg-border text-text-secondary hover:text-text-primary premium-btn" title="Previous">
                  <ChevronLeft size={14} />
                </button>
                <button onClick={handleNextMove} className="p-2 bg-bg-void border border-bg-border text-text-secondary hover:text-text-primary premium-btn" title="Next">
                  <ChevronRight size={14} />
                </button>
                <button onClick={handleJumpEnd} className="p-2 bg-bg-void border border-bg-border text-text-secondary hover:text-text-primary premium-btn" title="End">
                  <ChevronsRight size={14} />
                </button>
              </div>

              <div className="flex gap-1">
                <button 
                  onClick={() => setBoardFlipped(!boardFlipped)} 
                  className="p-2 bg-bg-void border border-bg-border text-text-secondary hover:text-text-primary premium-btn"
                  title="Flip Board"
                >
                  <FlipHorizontal size={14} />
                </button>
                <button 
                  onClick={() => setEngineActive(!engineActive)} 
                  className={`p-2 border premium-btn ${engineActive ? 'bg-accent-green/10 border-accent-green text-accent-green' : 'bg-bg-void border-bg-border text-text-muted'}`}
                  title="Toggle Stockfish Engine"
                >
                  {engineActive ? <Pause size={14} /> : <Play size={14} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: Engine Control HUD & Move List */}
        <div className="w-full lg:w-80 lg:flex-none border-t lg:border-t-0 lg:border-l border-bg-border flex flex-col bg-bg-surface shrink-0 z-20">
          
          {/* Stockfish Engine Status panel */}
          <div className="p-4 border-b border-bg-border flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs font-mono-clock">
              <span className="text-text-primary font-bold">STOCKFISH 10</span>
              <span className="text-[10px] text-accent-green px-1.5 py-0.5 bg-accent-green/10 rounded-sm">DEPTH: {evalData.depth}/{depthLimit}</span>
            </div>
            
            <div className="p-3 bg-bg-void border border-bg-border rounded-sm flex flex-col gap-1.5 text-xs font-mono-clock">
              <div className="text-text-secondary">
                Best move: <span className="font-bold text-accent-cyan uppercase">{evalData.bestMove || '...'}</span>
              </div>
              <div className="text-[10px] text-text-muted italic truncate">
                Continuation: {evalData.bestMove ? `${evalData.bestMove} ...` : 'calibrating optimal line...'}
              </div>
            </div>

            {/* Depth Slider */}
            <div className="flex items-center justify-between text-[10px] font-mono-clock text-text-muted">
              <span>TARGET DEPTH: {depthLimit}</span>
              <input 
                type="range" 
                min={8} 
                max={22} 
                value={depthLimit}
                onChange={(e) => setDepthLimit(parseInt(e.target.value, 10))}
                className="w-24 h-1 bg-bg-border rounded-lg appearance-none cursor-pointer accent-accent-primary"
              />
            </div>
          </div>

          {/* Move Log Log */}
          <div className="min-h-[140px] lg:flex-1 flex flex-col lg:overflow-hidden">
            <div className="p-3 border-b border-bg-border bg-bg-void text-[10px] font-mono-clock text-text-muted tracking-wider uppercase flex justify-between items-center select-none">
              <span>Loaded Game Notation</span>
              <span>MOVES: {history.length}</span>
            </div>

            <div className="flex-1 p-3 overflow-y-auto custom-scrollbar flex flex-col">
              {history.length > 0 ? (
                <div className="flex flex-col gap-0.5">
                  {renderLogTable()}
                </div>
              ) : (
                <div className="text-center py-10 text-text-muted italic text-[11px] select-none">
                  Import PGN or setup pieces above to inspect moves.
                </div>
              )}
            </div>
          </div>

          {/* SECTION 4: Bottom Recharts Evaluation Sparkline */}
          <div className="h-28 border-t border-bg-border p-3 flex flex-col gap-1 bg-bg-void">
            <span className="text-[9px] font-mono-clock text-text-muted uppercase select-none mb-1">Position Eval Trend</span>
            <div className="flex-1 w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={evalHistory} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                  <XAxis dataKey="move" hide />
                  <YAxis domain={[-8, 8]} hide />
                  <Area 
                    type="monotone" 
                    dataKey="eval" 
                    stroke="var(--accent-primary)" 
                    fill="rgba(245,245,245,0.06)" 
                    strokeWidth={1.5}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>

      {/* IMPORT FEN / PGN MODAL */}
      {showImportModal && (
        <div className="fixed inset-0 bg-void/85 flex items-center justify-center z-50 p-4">
          <div className="bg-bg-surface border border-bg-border p-6 rounded-md max-w-lg w-full relative shadow-2xl">
            <button 
              onClick={() => setShowImportModal(false)}
              className="absolute right-4 top-4 text-text-secondary hover:text-text-primary"
            >
              <X size={18} />
            </button>

            <h3 className="font-serif-header text-lg font-bold mb-2">Import Chess {importType}</h3>
            <p className="text-xs text-text-secondary mb-4 leading-relaxed">
              Paste your chess {importType === 'FEN' ? 'FEN position string' : 'PGN game history file contents'} below to analyze.
            </p>

            <textarea
              value={importInput}
              onChange={(e) => setImportInput(e.target.value)}
              placeholder={importType === 'FEN' ? 'e.g. r1bqkb1r/pppp1ppp/... w KQkq -' : 'e.g. 1. e4 e5 2. Nf3 Nc6 3. Bb5...'}
              rows={5}
              className="w-full p-3 bg-bg-void border border-bg-border focus:border-text-muted focus:outline-none rounded-sm text-xs font-mono-clock mb-5 resize-none"
            />

            <button
              onClick={handleImportSubmit}
              className="premium-btn-primary w-full py-2.5 text-xs uppercase font-mono-clock flex items-center justify-center gap-1.5"
            >
              Load into Analyzer <Plus size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analysis;
