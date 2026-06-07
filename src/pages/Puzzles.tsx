import React, { useState, useEffect, useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { Puzzle as PuzzleIcon, Flame, Heart, Clock, Check, AlertCircle, ArrowRight, RefreshCw, Layers, CheckCircle2, Lightbulb } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { playSound } from '../utils/audio';

interface TacticalPuzzle {
  id: string;
  fen: string;
  solution: string; // e.g. "h5f7" or "c3b5"
  theme: string;
  difficulty: number; // 1-5 stars
  playerColor: 'white' | 'black';
  instruction: string;
  successMessage: string;
}

const LOCAL_PUZZLES: TacticalPuzzle[] = [
  {
    id: 'p1',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
    solution: 'h5f7',
    theme: 'Checkmate',
    difficulty: 1,
    playerColor: 'white',
    instruction: 'Find the crushing blow. White to move - Mate in 1.',
    successMessage: 'Brilliant! Scholar\'s Mate executed successfully.'
  },
  {
    id: 'p2',
    fen: 'r1bqk2r/ppp2ppp/2n5/1B1pp3/4n3/2P2N2/PP1P1PPP/RNBQ1RK1 b kq - 0 6',
    solution: 'e4d6',
    theme: 'Pin',
    difficulty: 2,
    playerColor: 'black',
    instruction: 'White\'s bishop is pinning your knight. Find the retreat that saves material.',
    successMessage: 'Great work! Defending the pin and attacking the bishop.'
  },
  {
    id: 'p3',
    fen: 'rn1qkbnr/ppp2ppp/3p4/4p3/2B1P1b1/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 4',
    solution: 'c4f7',
    theme: 'Fork',
    difficulty: 3,
    playerColor: 'white',
    instruction: 'A classic tactical sacrifice. Draw the king out and win a bishop.',
    successMessage: 'Stunning! Bxf7+ draws the king out, setting up a winning knight fork!'
  },
  {
    id: 'p4',
    fen: 'r3kb1r/ppp1pppp/2n5/3q4/3P2b1/5N2/PPP1BPPP/R1BQK2R b KQkq - 2 7',
    solution: 'g4f3',
    theme: 'Removal of Defender',
    difficulty: 3,
    playerColor: 'black',
    instruction: 'Eliminate white\'s key defender to secure material.',
    successMessage: 'Excellent. Removing the knight key defender!'
  },
  {
    id: 'p5',
    fen: 'r1bqkb1r/ppp2ppp/2np1n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5',
    solution: 'c4f7',
    theme: 'Sacrifice',
    difficulty: 4,
    playerColor: 'white',
    instruction: 'Attack f7. Sacrificing the bishop to disrupt the black king.',
    successMessage: 'Correct! Sacrificing to ruin black\'s castling rights!'
  },
  {
    id: 'p6',
    fen: 'r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4',
    solution: 'e8e7',
    theme: 'Escape',
    difficulty: 2,
    playerColor: 'black',
    instruction: 'You are in check. Escape the threat with the only legal square.',
    successMessage: 'Yes! King safely stepped away from the mate.'
  }
];

export const Puzzles: React.FC = () => {
  const { 
    puzzleRushActive, 
    puzzleRushScore, 
    puzzleRushLives, 
    puzzleRushTime,
    puzzleRushHighscore,
    startPuzzleRush,
    endPuzzleRush,
    tickPuzzleRush,
    submitPuzzleAnswer,
    solvedPuzzles,
    markPuzzleSolved
  } = useGameStore();

  // Local modes: 'daily' | 'rush' | 'themes'
  const [activeTab, setActiveTab] = useState<'daily' | 'rush' | 'themes'>('daily');

  // Interactive Chess Engine states for puzzles
  const [puzzleChess, setPuzzleChess] = useState<Chess>(new Chess(LOCAL_PUZZLES[0].fen));
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [puzzleFen, setPuzzleFen] = useState(LOCAL_PUZZLES[0].fen);
  const [puzzleStatus, setPuzzleStatus] = useState<'solving' | 'correct' | 'wrong'>('solving');
  const [hintActive, setHintActive] = useState(false);

  const rushIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize active puzzle
  const currentPuzzle = LOCAL_PUZZLES[puzzleIndex];

  useEffect(() => {
    setPuzzleChess(new Chess(currentPuzzle.fen));
    setPuzzleFen(currentPuzzle.fen);
    setPuzzleStatus('solving');
    setHintActive(false);
  }, [puzzleIndex, activeTab]);

  // Puzzle Rush Timer Interval
  useEffect(() => {
    if (puzzleRushActive) {
      rushIntervalRef.current = setInterval(() => {
        tickPuzzleRush();
      }, 1000);
    } else {
      if (rushIntervalRef.current) {
        clearInterval(rushIntervalRef.current);
        rushIntervalRef.current = null;
      }
    }

    return () => {
      if (rushIntervalRef.current) clearInterval(rushIntervalRef.current);
    };
  }, [puzzleRushActive, tickPuzzleRush]);

  // Handle game-over on lives or timer hitting zero
  useEffect(() => {
    if (puzzleRushActive && (puzzleRushLives === 0 || puzzleRushTime === 0)) {
      endPuzzleRush();
      playSound.play('lose');
    }
  }, [puzzleRushLives, puzzleRushTime, puzzleRushActive, endPuzzleRush]);

  const onPieceDrop = (sourceSquare: string, targetSquare: string): boolean => {
    if (puzzleStatus !== 'solving') return false;

    const moveUci = `${sourceSquare}${targetSquare}`;
    const isCorrect = moveUci.toLowerCase() === currentPuzzle.solution.toLowerCase();

    try {
      // Create temporary chess logic to verify move validity
      const tempChess = new Chess(puzzleFen);
      const moveResult = tempChess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q' // force promotion
      });

      if (moveResult) {
        if (isCorrect) {
          setPuzzleChess(tempChess);
          setPuzzleFen(tempChess.fen());
          setPuzzleStatus('correct');
          markPuzzleSolved(currentPuzzle.id);
          
          playSound.play('win');

          if (puzzleRushActive) {
            submitPuzzleAnswer(true);
            // Load next puzzle quickly in rush mode
            setTimeout(() => {
              const nextIdx = (puzzleIndex + 1) % LOCAL_PUZZLES.length;
              setPuzzleIndex(nextIdx);
            }, 1000);
          }
        } else {
          setPuzzleStatus('wrong');
          playSound.play('check'); // alarm alert

          if (puzzleRushActive) {
            submitPuzzleAnswer(false);
            // Even if wrong, slide to next in rush to keep speed high
            setTimeout(() => {
              const nextIdx = (puzzleIndex + 1) % LOCAL_PUZZLES.length;
              setPuzzleIndex(nextIdx);
            }, 1200);
          }
        }
        return true;
      }
    } catch {
      // Invalid chess moves drop back automatically
    }

    return false;
  };

  const handleNextPuzzle = () => {
    // Adaptive difficulty: find next unsolved puzzle with >= difficulty
    const unsolved = LOCAL_PUZZLES.filter(p => !solvedPuzzles.includes(p.id) && p.id !== currentPuzzle.id);
    let nextPuzzle = unsolved.find(p => p.difficulty >= currentPuzzle.difficulty);
    
    if (!nextPuzzle) {
      nextPuzzle = unsolved[0]; // fallback to any unsolved
    }
    if (!nextPuzzle) {
      nextPuzzle = LOCAL_PUZZLES[(puzzleIndex + 1) % LOCAL_PUZZLES.length]; // fallback loop if all solved
    }
    
    setPuzzleIndex(LOCAL_PUZZLES.findIndex(p => p.id === nextPuzzle.id));
  };

  const handleRetryPuzzle = () => {
    setPuzzleChess(new Chess(currentPuzzle.fen));
    setPuzzleFen(currentPuzzle.fen);
    setPuzzleStatus('solving');
  };

  const formatRushTime = (sec: number) => {
    const min = Math.floor(sec / 60);
    const remainder = sec % 60;
    return `${min}:${remainder.toString().padStart(2, '0')}`;
  };

  const customBoardStyles = {
    customLightSquareStyle: { backgroundColor: 'var(--board-light)' },
    customDarkSquareStyle: { backgroundColor: 'var(--board-dark)' }
  };

  const dynamicSquareStyles: any = {};
  if (hintActive && puzzleStatus === 'solving') {
    const fromSquare = currentPuzzle.solution.slice(0, 2);
    dynamicSquareStyles[fromSquare] = { backgroundColor: 'rgba(56, 189, 248, 0.45)' };
  }

  return (
    <div className="w-full h-full flex flex-col p-6 overflow-y-auto custom-scrollbar">
      {/* Header Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-bg-border pb-4 mb-6 gap-4">
        <div>
          <h1 className="font-serif-header text-3xl font-bold tracking-tight">Chess Tactics</h1>
          <p className="text-xs text-text-secondary mt-1">Hone your positional vision with offline interactive tactics boards.</p>
        </div>

        <div className="flex gap-1 bg-bg-surface p-1 border border-bg-border rounded-sm self-start">
          <button
            onClick={() => { setActiveTab('daily'); }}
            className={`px-3 py-1 text-xs uppercase font-mono-clock rounded-sm transition-all cursor-pointer ${
              activeTab === 'daily' && !puzzleRushActive
                ? 'bg-text-primary text-bg-void font-bold'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Daily Puzzle
          </button>
          <button
            onClick={() => setActiveTab('rush')}
            className={`px-3 py-1 text-xs uppercase font-mono-clock rounded-sm transition-all cursor-pointer ${
              activeTab === 'rush' || puzzleRushActive
                ? 'bg-text-primary text-bg-void font-bold'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Puzzle Rush
          </button>
          <button
            onClick={() => { if (!puzzleRushActive) setActiveTab('themes'); }}
            disabled={puzzleRushActive}
            className={`px-3 py-1 text-xs uppercase font-mono-clock rounded-sm transition-all disabled:opacity-50 cursor-pointer ${
              activeTab === 'themes'
                ? 'bg-text-primary text-bg-void font-bold'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Browse Themes
          </button>
        </div>
      </div>

      {/* Tab 1: DAILY PUZZLE */}
      {activeTab === 'daily' && !puzzleRushActive && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto w-full">
          {/* Board representation */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className="w-full max-w-[460px] aspect-square border-4 border-bg-border rounded-sm shadow-xl relative">
              <Chessboard
                id="DailyPuzzleBoard"
                position={puzzleFen}
                onPieceDrop={onPieceDrop}
                boardWidth={452}
                boardOrientation={currentPuzzle.playerColor}
                arePiecesDraggable={puzzleStatus === 'solving'}
                customSquareStyles={dynamicSquareStyles}
                customLightSquareStyle={customBoardStyles.customLightSquareStyle}
                customDarkSquareStyle={customBoardStyles.customDarkSquareStyle}
              />
              
              {/* Success / Error Overlay */}
              {puzzleStatus === 'correct' && (
                <div className="absolute inset-0 bg-void/80 flex flex-col items-center justify-center p-6 text-center z-25">
                  <div className="w-12 h-12 bg-accent-green/10 border border-accent-green/45 rounded-full flex items-center justify-center text-accent-green mb-4">
                    <Check size={24} />
                  </div>
                  <h3 className="font-serif-header text-xl font-bold mb-2 text-text-primary">Correct Move!</h3>
                  <p className="text-xs text-text-secondary mb-6 max-w-xs">{currentPuzzle.successMessage}</p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleRetryPuzzle}
                      className="premium-btn py-2 px-4 text-xs font-mono-clock uppercase bg-bg-border"
                    >
                      Replay
                    </button>
                    <button
                      onClick={handleNextPuzzle}
                      className="premium-btn-primary py-2 px-5 text-xs font-mono-clock uppercase"
                    >
                      Next Tactics
                    </button>
                  </div>
                </div>
              )}

              {puzzleStatus === 'wrong' && (
                <div className="absolute inset-0 bg-void/80 flex flex-col items-center justify-center p-6 text-center z-25">
                  <div className="w-12 h-12 bg-accent-red/10 border border-accent-red/45 rounded-full flex items-center justify-center text-accent-red mb-4">
                    <AlertCircle size={24} />
                  </div>
                  <h3 className="font-serif-header text-xl font-bold mb-2 text-text-primary">Incorrect Move</h3>
                  <p className="text-xs text-text-secondary mb-6">That is not the optimal line. Give it another try!</p>
                  <button
                    onClick={handleRetryPuzzle}
                    className="premium-btn py-2 px-6 text-xs font-mono-clock uppercase"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Metadata Card Panel */}
          <div className="lg:col-span-5 bg-bg-surface border border-bg-border p-6 rounded-sm self-stretch flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-clock uppercase bg-accent-amber/10 border border-accent-amber/35 text-accent-amber px-2 py-0.5 rounded-sm">
                  Theme: {currentPuzzle.theme}
                </span>
                <span className="text-xs font-mono-clock text-text-muted">
                  Difficulty: {Array.from({ length: currentPuzzle.difficulty }).map((_, i) => '★').join('')}
                </span>
              </div>

              <h2 className="font-serif-header text-xl font-bold mt-1 text-text-primary flex items-center gap-2">
                Daily Tactical Quiz
                {solvedPuzzles.includes(currentPuzzle.id) && <CheckCircle2 size={18} className="text-accent-green" />}
              </h2>
              
              <p className="text-xs text-text-secondary leading-relaxed bg-bg-void/50 border border-bg-border p-4 rounded-sm">
                {currentPuzzle.instruction}
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-8">
              {puzzleStatus === 'solving' && (
                <button
                  onClick={() => setHintActive(true)}
                  className="premium-btn w-full py-2.5 text-xs font-mono-clock uppercase flex items-center justify-center gap-1.5"
                >
                  <Lightbulb size={14} className="text-accent-amber" /> Show Hint
                </button>
              )}
              <button
                onClick={handleNextPuzzle}
                className="premium-btn w-full py-2.5 text-xs font-mono-clock uppercase flex items-center justify-center gap-1.5"
              >
                Skip Tactics <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: PUZZLE RUSH CONTAINER */}
      {activeTab === 'rush' && (
        <div className="flex flex-col items-center justify-center max-w-xl mx-auto w-full">
          {!puzzleRushActive ? (
            <div className="bg-bg-surface border border-bg-border p-8 rounded-sm text-center w-full shadow-lg">
              <div className="w-16 h-16 bg-bg-elevated border border-bg-border rounded-full flex items-center justify-center mx-auto text-accent-amber mb-4">
                <Flame size={32} className="animate-pulse" />
              </div>
              <h2 className="font-serif-header text-2xl font-bold mb-2">Puzzle Rush Challenge</h2>
              <p className="text-xs text-text-secondary mb-6 leading-relaxed max-w-sm mx-auto">
                Solve as many chess puzzles as you can in **3 minutes**. You have **3 lives**. One error subtracts a life. Keep your streak alive!
              </p>

              {/* Highscore details */}
              <div className="p-3 bg-bg-void border border-bg-border rounded-sm flex items-center justify-between mb-8 max-w-xs mx-auto text-xs">
                <span className="text-text-secondary font-medium">⚡ Local Highscore</span>
                <span className="font-mono-clock text-accent-amber font-bold">{puzzleRushHighscore} Puzzles</span>
              </div>

              <button
                onClick={startPuzzleRush}
                className="premium-btn-primary w-full max-w-xs py-3 text-xs uppercase font-mono-clock inline-flex items-center justify-center gap-2"
              >
                Start Puzzle Rush <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-5 items-center">
              {/* Score HUD bar */}
              <div className="w-full flex justify-between items-center bg-bg-surface border border-bg-border p-3 rounded-sm text-xs select-none">
                <div className="flex items-center gap-1">
                  <Flame size={16} className="text-accent-amber animate-pulse" />
                  <span className="font-mono-clock font-bold text-accent-amber">{puzzleRushScore}</span>
                  <span className="text-text-secondary font-medium uppercase ml-1">Solved</span>
                </div>

                <div className="flex items-center gap-1 font-mono-clock font-semibold text-text-primary px-3 py-1 bg-bg-void border border-bg-border rounded-sm">
                  <Clock size={14} className="text-text-muted" />
                  {formatRushTime(puzzleRushTime)}
                </div>

                <div className="flex gap-1 text-accent-red">
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <Heart
                      key={idx}
                      size={16}
                      fill={idx < puzzleRushLives ? 'currentColor' : 'none'}
                      className={idx < puzzleRushLives ? 'text-accent-red animate-pulse' : 'text-bg-border'}
                    />
                  ))}
                </div>
              </div>

              {/* Active Puzzle Board */}
              <div className="w-full max-w-[420px] aspect-square border-4 border-bg-border rounded-sm shadow-xl relative">
                <Chessboard
                  id="RushBoard"
                  position={puzzleFen}
                  onPieceDrop={onPieceDrop}
                  boardWidth={412}
                  boardOrientation={currentPuzzle.playerColor}
                  arePiecesDraggable={puzzleStatus === 'solving'}
                  customSquareStyles={dynamicSquareStyles}
                  customLightSquareStyle={customBoardStyles.customLightSquareStyle}
                  customDarkSquareStyle={customBoardStyles.customDarkSquareStyle}
                />
              </div>

              <p className="text-[11px] font-mono-clock text-text-muted uppercase text-center max-w-xs leading-relaxed">
                {currentPuzzle.instruction}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: BROWSE THEMES */}
      {activeTab === 'themes' && !puzzleRushActive && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { tag: 'Checkmate', desc: 'Find the critical forcing moves to deliver absolute checkmate.', icon: '👑', count: 12 },
            { tag: 'Pin', desc: 'Exploit pinned pieces that cannot move without dropping massive material.', icon: '📎', count: 8 },
            { tag: 'Fork', desc: 'Double attacks targeting two vulnerable enemy pieces simultaneously.', icon: '🍴', count: 15 },
            { tag: 'Sacrifice', desc: 'Give away material temporarily to break defensive coordinates.', icon: '🎁', count: 9 },
            { tag: 'Escape', desc: 'Find safe cells to escape threats and evade mate lines.', icon: '🚪', count: 6 },
            { tag: 'Skewer', desc: 'Force high-value targets to move, exposing undefended units behind.', icon: '🗡️', count: 11 }
          ].map((theme) => (
            <div
              key={theme.tag}
              onClick={() => {
                const idx = LOCAL_PUZZLES.findIndex(p => p.theme === theme.tag);
                if (idx !== -1) setPuzzleIndex(idx);
                setActiveTab('daily');
              }}
              className="bg-bg-surface border border-bg-border p-5 rounded-sm hover:bg-bg-elevated cursor-pointer group flex flex-col justify-between transition-colors duration-150"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl">{theme.icon}</span>
                  <span className="text-[9px] font-mono-clock bg-bg-void text-text-muted border border-bg-border px-1.5 py-0.5 rounded-sm">
                    {theme.count} PUZZLES
                  </span>
                </div>
                <h3 className="font-serif-header text-md font-bold tracking-tight text-text-primary group-hover:text-accent-primary">
                  {theme.tag}
                </h3>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                  {theme.desc}
                </p>
              </div>

              <button className="premium-btn py-1.5 px-3 mt-4 text-[10px] uppercase font-mono-clock self-start flex items-center gap-1">
                Explore <ArrowRight size={10} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Puzzles;
