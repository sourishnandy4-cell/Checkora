import React, { useState, useEffect, useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { 
  Search, 
  User, 
  FlipHorizontal, 
  Flag, 
  Handshake, 
  Send, 
  Volume2, 
  ArrowLeft,
  X,
  Play as PlayIcon,
  Check,
  Undo2
} from 'lucide-react';
import { useGameStore, TimeControl, getTcCategory } from '../store/gameStore';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../store/settingsStore';
import { BOTS, BotDefinition } from '../data/bots';
import { StockfishEngine, EngineEvaluation } from '../engine/stockfish';
import { playSound } from '../utils/audio';

export const Play: React.FC = () => {
  const navigate = useNavigate();
  // Navigation & Screen Control
  const { 
    chess,
    fen, 
    turn, 
    history, 
    whiteTime, 
    blackTime, 
    playerColor, 
    activeBot, 
    gameResult, 
    gameOverReason,
    isGameActive,
    chatMessages,
    startNewGame, 
    makeMove,
    tickClocks,
    resignGame,
    offerDraw,
    sendChatMessage,
    timeControl,
    userEloBlitz,
    userEloRapid,
    userEloBullet,
    undoMove
  } = useGameStore();

  const { 
    showCoordinates, 
    showLegalMoves, 
    boardFlipped, 
    toggleBoardFlipped,
    playerName,
    confirmMoves,
    autoPromoteToQueen,
    playerAvatar,
    pieceSet
  } = useSettingsStore();

  // Local Pre-game Picker states
  const [activeTier, setActiveTier] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBot, setSelectedBot] = useState<BotDefinition | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [timePreset, setTimePreset] = useState<TimeControl>('10+0');
  const [customMin, setCustomMin] = useState(10);
  const [customInc, setCustomInc] = useState(0);
  const [pickedColor, setPickedColor] = useState<'white' | 'black' | 'random'>('random');

  // Local In-game chat message box
  const [chatInput, setChatInput] = useState('');

  // Local Move Confirmation states
  const [pendingMove, setPendingMove] = useState<{ from: string; to: string; promotion?: string; fen: string } | null>(null);

  // Local Pawn Promotion states
  const [showPromotionDialog, setShowPromotionDialog] = useState(false);
  const [promoMove, setPromoMove] = useState<{ from: string; to: string } | null>(null);

  // Engine references
  const engineRef = useRef<StockfishEngine | null>(null);
  const clockIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const botThinkingRef = useRef(false);

  // Engine evaluation states for the real-time Eval Bar
  const evalEngineRef = useRef<StockfishEngine | null>(null);
  const [evalData, setEvalData] = useState<EngineEvaluation>({ depth: 0, score: 0 });

  useEffect(() => {
    evalEngineRef.current = new StockfishEngine();
    return () => {
      if (evalEngineRef.current) evalEngineRef.current.terminate();
    };
  }, []);

  useEffect(() => {
    if (!isGameActive || !evalEngineRef.current) return;
    evalEngineRef.current.stop();
    evalEngineRef.current.evaluatePosition(fen, 14, (evaluation) => {
      setEvalData(evaluation);
    });
  }, [fen, isGameActive]);

  const getEvalBarPercentage = () => {
    if (evalData.mateIn) {
      return evalData.mateIn > 0 ? 100 : 0;
    }
    const score = evalData.score;
    const percentage = 50 + (score * 10);
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

  // Responsive board size
  const boardContainerRef = useRef<HTMLDivElement>(null);
  const [boardSize, setBoardSize] = useState(504);

  // Chat scroll reference
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat log to bottom as bot (or player) speaks
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Initialize engine on start
  useEffect(() => {
    engineRef.current = new StockfishEngine();
    return () => {
      if (engineRef.current) engineRef.current.terminate();
      if (clockIntervalRef.current) clearInterval(clockIntervalRef.current);
    };
  }, []);

  // Responsive board size via ResizeObserver
  useEffect(() => {
    const el = boardContainerRef.current;
    if (!el) return;

    const initialWidth = el.getBoundingClientRect().width;
    if (initialWidth > 0) {
      setBoardSize(Math.floor(initialWidth));
    }

    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = Math.floor(entry.contentRect.width);
        if (width > 0) {
          setBoardSize(width);
        }
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [isGameActive, gameResult]);

  // Clock Ticking Interval Setup
  useEffect(() => {
    if (isGameActive && !gameResult) {
      clockIntervalRef.current = setInterval(() => {
        tickClocks();
      }, 1000);
    } else {
      if (clockIntervalRef.current) {
        clearInterval(clockIntervalRef.current);
        clockIntervalRef.current = null;
      }
    }

    return () => {
      if (clockIntervalRef.current) clearInterval(clockIntervalRef.current);
    };
  }, [isGameActive, gameResult, tickClocks]);

  // Reset pending moves when the game starts/stops
  useEffect(() => {
    if (!isGameActive) {
      setPendingMove(null);
      setShowPromotionDialog(false);
      setPromoMove(null);
    }
  }, [isGameActive]);

  // Handle low-time clock pulses (Synthesize heartbeat thuds under 10 seconds)
  useEffect(() => {
    if (!isGameActive) return;

    if (whiteTime <= 10 && whiteTime > 0) {
      playSound.play('alarm');
    }
  }, [whiteTime, isGameActive]);

  useEffect(() => {
    if (!isGameActive) return;

    if (blackTime <= 10 && blackTime > 0) {
      playSound.play('alarm');
    }
  }, [blackTime, isGameActive]);

  // AI Opponent trigger on turn changes
  useEffect(() => {
    if (!isGameActive || !activeBot || gameResult) return;

    const isBotTurn = (turn === 'w' && playerColor === 'black') || (turn === 'b' && playerColor === 'white');

    if (isBotTurn && !botThinkingRef.current) {
      botThinkingRef.current = true;
      
      // Determine depth based on ELO to simulate different strengths
      const depth = Math.min(22, Math.max(1, Math.floor(activeBot.elo / 150)));

      // Delay a tiny bit to make bot feel "human"
      const botDelay = Math.max(800, Math.min(3000, 4000 - activeBot.elo));
      const startingFen = fen;

      setTimeout(() => {
        if (!isGameActive || !engineRef.current) {
          botThinkingRef.current = false;
          return;
        }

        // Verify that the game state hasn't changed (e.g. undo, reset, etc.)
        if (useGameStore.getState().fen !== startingFen) {
          botThinkingRef.current = false;
          return;
        }

        engineRef.current.getBestMove(
          fen, 
          depth, 
          activeBot.skillLevel, 
          activeBot.elo, 
          (bestMove) => {
            const from = bestMove.slice(0, 2);
            const to = bestMove.slice(2, 4);
            const promo = bestMove.slice(4, 5) || undefined;
            
            // Execute move
            const success = makeMove(from, to, promo);
            
            if (success) {
              // Trigger move/capture sound
              const isCapture = chess.history({ verbose: true }).pop()?.captured;
              const isCheck = chess.inCheck();
              
              if (isCheck) {
                playSound.play('check');
              } else if (isCapture) {
                playSound.play('capture');
              } else {
                playSound.play('move');
              }

              // Simulated bot comment probability (Increased to 55% for highly active chat)
              if (Math.random() < 0.55) {
                const chatPool = isCapture ? activeBot.chatPools.capture : activeBot.chatPools.win;
                const msg = chatPool[Math.floor(Math.random() * chatPool.length)];
                sendChatMessage(activeBot.name, msg);
              }
            }

            botThinkingRef.current = false;
          }
        );
      }, botDelay);
    }
  }, [fen, turn, playerColor, activeBot, isGameActive, gameResult, makeMove, chess, sendChatMessage]);

  // Helper sound & bot speech dispatcher
  const handlePostMoveSoundAndGameEnding = (isCapture: boolean) => {
    const isCheck = chess.inCheck();
    
    if (isCheck) {
      playSound.play('check');
    } else if (isCapture) {
      playSound.play('capture');
    } else {
      playSound.play('move');
    }

    if (chess.isGameOver()) {
      const checkResult = chess.turn() === 'w' ? 'b' : 'w';
      const isBotWinner = (checkResult === 'w' && playerColor === 'black') || (checkResult === 'b' && playerColor === 'white');
      
      setTimeout(() => {
        if (activeBot) {
          const comment = isBotWinner ? activeBot.chatPools.win[0] : activeBot.chatPools.lose[0];
          sendChatMessage(activeBot.name, comment);
          
          // Win/Lose arpeggios
          if (isBotWinner) {
            playSound.play('lose');
          } else {
            playSound.play('win');
          }
        }
      }, 1000);
    } else if (activeBot) {
      // 35% chance for bot to talk/react to player's check or capture
      if (Math.random() < 0.35) {
        setTimeout(() => {
          let msg = '';
          if (isCheck) {
            const pool = [...activeBot.chatPools.blunder, ...activeBot.chatPools.lose];
            msg = pool[Math.floor(Math.random() * pool.length)];
          } else if (isCapture) {
            const pool = activeBot.chatPools.blunder;
            msg = pool[Math.floor(Math.random() * pool.length)];
          } else {
            const pool = [...activeBot.chatPools.lose, ...activeBot.chatPools.blunder];
            msg = pool[Math.floor(Math.random() * pool.length)];
          }
          if (msg) {
            sendChatMessage(activeBot.name, msg);
          }
        }, 1000);
      }
    }
  };

  // Handlers for piece drops
  const onPieceDrop = (sourceSquare: string, targetSquare: string): boolean => {
    if (!isGameActive || gameResult) return false;
    
    // Check if it's the player's turn
    const isPlayerTurn = (turn === 'w' && playerColor === 'white') || (turn === 'b' && playerColor === 'black');
    if (!isPlayerTurn || botThinkingRef.current) return false;

    // Check if we already have a pending move that needs confirmation
    if (pendingMove) return false;

    try {
      const tempChess = new Chess(fen);
      const moves = tempChess.moves({ verbose: true });
      const isPromo = moves.some(m => m.from === sourceSquare && m.to === targetSquare && m.flags.includes('p'));

      if (confirmMoves) {
        // ── WITH CONFIRM MOVES MODE ──
        if (isPromo && !autoPromoteToQueen) {
          setPromoMove({ from: sourceSquare, to: targetSquare });
          setShowPromotionDialog(true);
          return false;
        }

        const promo = isPromo ? 'q' : undefined;
        const validMove = tempChess.move({ from: sourceSquare, to: targetSquare, promotion: promo });
        if (validMove) {
          setPendingMove({ from: sourceSquare, to: targetSquare, promotion: promo, fen: tempChess.fen() });
          return true;
        }
      } else {
        // ── IMMEDIATE MOVE MODE ──
        if (isPromo && !autoPromoteToQueen) {
          setPromoMove({ from: sourceSquare, to: targetSquare });
          setShowPromotionDialog(true);
          return false;
        }

        const sourcePiece = chess.get(sourceSquare as any);
        const targetPiece = chess.get(targetSquare as any);
        const isCapture = !!targetPiece || (sourcePiece?.type === 'p' && sourceSquare[0] !== targetSquare[0] && !targetPiece);

        const success = makeMove(sourceSquare, targetSquare);
        if (success) {
          handlePostMoveSoundAndGameEnding(isCapture);
          return true;
        }
      }
    } catch (e) {
      console.warn('Invalid player move attempt:', e);
    }

    return false;
  };

  const handleConfirmMove = () => {
    if (!pendingMove) return;

    const sourcePiece = chess.get(pendingMove.from as any);
    const targetPiece = chess.get(pendingMove.to as any);
    const isCapture = !!targetPiece || (sourcePiece?.type === 'p' && pendingMove.from[0] !== pendingMove.to[0] && !targetPiece);

    const success = makeMove(pendingMove.from, pendingMove.to, pendingMove.promotion);
    if (success) {
      handlePostMoveSoundAndGameEnding(isCapture);
    }
    setPendingMove(null);
  };

  const handleCancelMove = () => {
    setPendingMove(null);
    playSound.play('move'); // play tap click on undo slide back
  };

  // Helper formatting for seconds to MM:SS
  const formatTime = (timeInSec: number) => {
    const min = Math.floor(timeInSec / 60);
    const sec = timeInSec % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  // Chat Submissions
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    sendChatMessage('You', chatInput);
    const userText = chatInput;
    setChatInput('');

    // Trigger responsive bot replies!
    if (activeBot && isGameActive && !gameResult) {
      setTimeout(() => {
        let reply = "I am focusing on the board.";
        if (userText.toLowerCase().includes('hello') || userText.toLowerCase().includes('hi')) {
          reply = activeBot.quote;
        } else if (userText.toLowerCase().includes('draw')) {
          reply = "If you want a draw, use the draw offer button!";
        } else {
          // Pull a random quote
          const pools = [...activeBot.chatPools.capture, ...activeBot.chatPools.win];
          reply = pools[Math.floor(Math.random() * pools.length)];
        }
        sendChatMessage(activeBot.name, reply);
      }, 1000);
    }
  };

  // Bot Filtering
  const filteredBots = BOTS.filter(bot => {
    const matchesTier = activeTier === 'All' || bot.tier === activeTier;
    const matchesSearch = bot.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          bot.style.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          bot.tier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (bot.title || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });


  const handleStartSetup = (bot: BotDefinition) => {
    setSelectedBot(bot);
    setTimePreset(bot.recommendedTime as any || '10+0');
    setShowConfigModal(true);
  };

  const handleConfirmStart = () => {
    if (!selectedBot) return;
    startNewGame(selectedBot, timePreset, pickedColor, customMin, customInc);
    setShowConfigModal(false);
    
    // Play transition swoosh
    playSound.play('move');
  };

  // Determine colors based on active theme
  const customBoardStyles = {
    customLightSquareStyle: { backgroundColor: 'var(--board-light)' },
    customDarkSquareStyle: { backgroundColor: 'var(--board-dark)' }
  };

  // Active Game State rendering
  if (isGameActive || gameResult) {
    const isBotTurn = (turn === 'w' && playerColor === 'black') || (turn === 'b' && playerColor === 'white');

    const canUndo = !!activeBot && (
      playerColor === 'white' 
        ? history.length > 0 
        : (history.length > 1 || (history.length === 1 && history[0].black !== undefined))
    );

    // Dynamically retrieve ELO corresponding to timeControl
    const getActiveUserElo = () => {
      const tcCat = getTcCategory(timeControl);
      if (tcCat === 'bullet') return userEloBullet;
      if (tcCat === 'rapid') return userEloRapid;
      return userEloBlitz;
    };
    const activeUserElo = getActiveUserElo();

    const blackPlayerName = playerColor === 'black' ? playerName : (activeBot ? activeBot.name : 'Stockfish Bot');
    const blackPlayerElo = playerColor === 'black' ? activeUserElo : (activeBot ? activeBot.elo : 1500);
    const whitePlayerName = playerColor === 'white' ? playerName : (activeBot ? activeBot.name : 'Stockfish Bot');
    const whitePlayerElo = playerColor === 'white' ? activeUserElo : (activeBot ? activeBot.elo : 1500);

    const isWhiteActive = turn === 'w';
    const isBlackActive = turn === 'b';

    return (
      <div className="w-full h-full flex flex-col lg:flex-row bg-base overflow-hidden">
        {/* LEFT COLUMN: Board and info cards */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-6 overflow-y-auto">
          {/* Back button */}
          <div className="w-full max-w-[540px] flex items-center justify-start mb-2">
            <button 
              onClick={() => useGameStore.getState().resetAll()}
              className="text-xs uppercase font-mono-clock text-text-secondary hover:text-text-primary flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft size={14} /> Back to Bot Selection
            </button>
          </div>

          <div className="w-full max-w-[540px] flex flex-col gap-3">
            {/* BLACK PLAYER BAR */}
            <div className={`p-3 bg-bg-surface border border-bg-border rounded-sm flex items-center justify-between transition-all duration-300 ${
              isBlackActive ? 'border-accent-primary ring-1 ring-accent-primary/20' : ''
            }`}>
              <div className="flex items-center gap-3">
                {playerColor === 'black' 
                  ? playerAvatar
                    ? <img src={playerAvatar} alt={playerName} className="w-8 h-8 rounded-full object-cover border border-accent-primary" />
                    : <div className="w-8 h-8 rounded-sm bg-bg-elevated flex items-center justify-center text-sm border border-bg-border">👤</div>
                  : activeBot && activeBot.isImageAvatar
                    ? <img src={activeBot.avatar} alt={activeBot.name} className="w-8 h-8 rounded-full object-cover border-2" style={{ borderColor: activeBot.accentColor + '80' }} />
                    : <div className="w-8 h-8 rounded-sm bg-bg-elevated flex items-center justify-center text-sm border border-bg-border">{activeBot ? activeBot.avatar : '🤖'}</div>
                }
                <div>
                  <div className="text-xs font-semibold flex items-center gap-1.5">
                    {blackPlayerName} 
                    <span className="text-[9px] font-mono-clock bg-bg-border text-text-muted px-1 rounded-sm">
                      {blackPlayerElo}
                    </span>
                  </div>
                  {isBotTurn && playerColor === 'white' && botThinkingRef.current && (
                    <span className="text-[9px] font-mono-clock text-accent-cyan tracking-wider animate-pulse">THINKING...</span>
                  )}
                </div>
              </div>

              {/* CLOCK */}
              <div className={`font-mono-clock text-xl font-bold tracking-tight px-3 py-1 bg-bg-void rounded-sm border ${
                blackTime <= 10 ? 'text-accent-amber border-accent-amber animate-pulse' : 'text-text-primary border-bg-border'
              } ${isBlackActive ? 'bg-bg-elevated' : 'opacity-70'}`}>
                {formatTime(blackTime)}
              </div>
            </div>

            {/* EVAL BAR + BOARD WRAPPER */}
            <div className="flex w-full gap-2 lg:gap-4 relative">
              {/* EVAL BAR */}
              <div className="w-4 lg:w-6 rounded-sm bg-bg-surface border border-bg-border relative flex flex-col items-center justify-center select-none shrink-0 overflow-hidden shadow-xl hidden md:flex">
                <div className="absolute inset-0 bg-zinc-900" />
                <div 
                  style={{ height: `${whitePercent}%` }}
                  className="absolute bottom-0 left-0 right-0 bg-zinc-100 transition-all duration-500 ease-out" 
                />
                <span className="z-10 font-mono-clock text-[9px] font-bold px-1 py-0.5 rounded-sm mix-blend-difference text-white absolute top-2">
                  {formatEvalText()}
                </span>
              </div>

            {/* INTERACTIVE CHESS BOARD */}
            <div ref={boardContainerRef} data-pieces={pieceSet} className="w-full shrink-0 aspect-square border-4 border-bg-border bg-bg-void rounded-sm shadow-2xl relative">
              <Chessboard
                id="PlayBoard"
                position={pendingMove ? pendingMove.fen : fen}
                onPieceDrop={onPieceDrop}
                boardWidth={boardSize}
                boardOrientation={playerColor}
                arePiecesDraggable={!botThinkingRef.current && !gameResult && !pendingMove}
                showBoardNotation={showCoordinates}
                customLightSquareStyle={customBoardStyles.customLightSquareStyle}
                customDarkSquareStyle={customBoardStyles.customDarkSquareStyle}
                showPromotionDialog={showPromotionDialog}
                onPromotionPieceSelect={(piece) => {
                  if (!piece) return false;
                  const selectedPromo = piece[1].toLowerCase();
                  if (promoMove) {
                    if (confirmMoves) {
                      const tempChess = new Chess(fen);
                      tempChess.move({ from: promoMove.from, to: promoMove.to, promotion: selectedPromo });
                      setPendingMove({ from: promoMove.from, to: promoMove.to, promotion: selectedPromo, fen: tempChess.fen() });
                    } else {
                      const sourcePiece = chess.get(promoMove.from as any);
                      const targetPiece = chess.get(promoMove.to as any);
                      const isCapture = !!targetPiece || (sourcePiece?.type === 'p' && promoMove.from[0] !== promoMove.to[0] && !targetPiece);

                      const success = makeMove(promoMove.from, promoMove.to, selectedPromo);
                      if (success) {
                        handlePostMoveSoundAndGameEnding(isCapture);
                      }
                    }
                  }
                  setShowPromotionDialog(false);
                  setPromoMove(null);
                  return true;
                }}
                customSquareStyles={
                  chess.inCheck() 
                    ? {
                        // Soft red overlay on checked king
                        [chess.history({ verbose: true }).pop()?.color === 'w' 
                          ? (chess.board().flatMap(b => b).find(p => p?.type === 'k' && p?.color === 'b')?.square || '')
                          : (chess.board().flatMap(b => b).find(p => p?.type === 'k' && p?.color === 'w')?.square || '')
                        ]: { backgroundColor: 'rgba(248, 113, 113, 0.45)' }
                      }
                    : {}
                }
              />

              {/* Game Over Overlay */}
              {gameResult && (
                <div className="absolute inset-0 bg-void/90 flex flex-col items-center justify-center p-6 text-center z-25">
                  <span className="font-serif-header text-3xl font-bold mb-2">
                    {gameResult === 'd' 
                      ? 'Match Drawn' 
                      : (gameResult === 'w' && playerColor === 'white') || (gameResult === 'b' && playerColor === 'black')
                        ? 'Victory'
                        : 'Defeat'}
                  </span>
                  <span className="text-xs uppercase font-mono-clock text-text-secondary tracking-widest mb-6">
                    {gameOverReason === 'checkmate' ? 'Checkmate' : gameOverReason}
                  </span>
                  <div className="flex gap-4">
                    {canUndo && (
                      <button
                        onClick={() => {
                          const success = undoMove();
                          if (success) {
                            playSound.play('move');
                          }
                        }}
                        className="premium-btn py-2 px-5 text-xs font-mono-clock uppercase bg-accent-amber/20 border border-accent-amber text-accent-amber hover:bg-accent-amber/30"
                      >
                        Takeback
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (activeBot) startNewGame(activeBot, timeControl as any, playerColor);
                      }}
                      className="premium-btn py-2 px-5 text-xs font-mono-clock uppercase"
                    >
                      Rematch
                    </button>
                    <button
              onClick={() => {
                useGameStore.getState().resetAll();
              }}
              className="w-full premium-btn border-bg-border text-xs py-2 uppercase font-mono-clock"
            >
              Play Again
            </button>
            <button
              onClick={() => {
                const currentPgn = chess.pgn();
                useGameStore.getState().loadPGN(currentPgn);
                navigate('/analysis');
              }}
              className="w-full premium-btn border-bg-border text-xs py-2 uppercase font-mono-clock mt-2 bg-bg-surface hover:text-accent-cyan transition-colors"
            >
              Review Game
            </button>
                  </div>
                </div>
              )}
            </div>
            </div>

            {/* OPPONENT BAR (BOTTOM) */}
            <div className={`p-3 bg-bg-surface border border-bg-border rounded-sm flex items-center justify-between transition-all duration-300 ${
              isWhiteActive ? 'border-accent-primary ring-1 ring-accent-primary/20' : ''
            }`}>
              <div className="flex items-center gap-3">
                {playerColor === 'white' 
                  ? playerAvatar
                    ? <img src={playerAvatar} alt={playerName} className="w-8 h-8 rounded-full object-cover border border-accent-primary" />
                    : <div className="w-8 h-8 rounded-sm bg-bg-elevated flex items-center justify-center text-sm border border-bg-border">👤</div>
                  : activeBot && activeBot.isImageAvatar
                    ? <img src={activeBot.avatar} alt={activeBot.name} className="w-8 h-8 rounded-full object-cover border-2" style={{ borderColor: activeBot.accentColor + '80' }} />
                    : <div className="w-8 h-8 rounded-sm bg-bg-elevated flex items-center justify-center text-sm border border-bg-border">{activeBot ? activeBot.avatar : '🤖'}</div>
                }
                <div>
                  <div className="text-xs font-semibold flex items-center gap-1.5">
                    {whitePlayerName}
                    <span className="text-[9px] font-mono-clock bg-bg-border text-text-muted px-1 rounded-sm">
                      {whitePlayerElo}
                    </span>
                  </div>
                  {isBotTurn && playerColor === 'black' && botThinkingRef.current && (
                    <span className="text-[9px] font-mono-clock text-accent-cyan tracking-wider animate-pulse">THINKING...</span>
                  )}
                </div>
              </div>

              {/* CLOCK */}
              <div className={`font-mono-clock text-xl font-bold tracking-tight px-3 py-1 bg-bg-void rounded-sm border ${
                whiteTime <= 10 ? 'text-accent-amber border-accent-amber animate-pulse' : 'text-text-primary border-bg-border'
              } ${isWhiteActive ? 'bg-bg-elevated' : 'opacity-70'}`}>
                {formatTime(whiteTime)}
              </div>
            </div>

            {/* CONTROLS OR CONFIRMATION STRIP */}
            {pendingMove ? (
              <div className="flex gap-2 w-full mt-1">
                <button
                  onClick={handleConfirmMove}
                  className="flex-1 py-2 bg-accent-green/20 border border-accent-green text-xs uppercase font-mono-clock text-accent-green hover:bg-accent-green/30 premium-btn flex items-center justify-center gap-1.5 rounded-sm"
                >
                  <Check size={14} /> Confirm Move
                </button>
                <button
                  onClick={handleCancelMove}
                  className="flex-1 py-2 bg-accent-red/20 border border-accent-red text-xs uppercase font-mono-clock text-accent-red hover:bg-accent-red/30 premium-btn flex items-center justify-center gap-1.5 rounded-sm"
                >
                  <X size={14} /> Cancel Move
                </button>
              </div>
            ) : (
              <div className="flex gap-2 w-full mt-1">
                <button
                  onClick={offerDraw}
                  disabled={!!gameResult}
                  className="flex-1 py-2 bg-bg-surface border border-bg-border text-xs uppercase font-mono-clock text-text-secondary hover:text-text-primary disabled:opacity-50 flex items-center justify-center gap-1.5 premium-btn"
                >
                  <Handshake size={14} /> Offer Draw
                </button>
                <button
                  onClick={resignGame}
                  disabled={!!gameResult}
                  className="flex-1 py-2 bg-bg-surface border border-bg-border text-xs uppercase font-mono-clock text-text-secondary hover:text-accent-red disabled:opacity-50 flex items-center justify-center gap-1.5 premium-btn"
                >
                  <Flag size={14} /> Resign
                </button>
                <button
                  onClick={() => {
                    const success = undoMove();
                    if (success) {
                      playSound.play('move');
                    }
                  }}
                  disabled={!canUndo}
                  className="flex-1 py-2 bg-bg-surface border border-bg-border text-xs uppercase font-mono-clock text-text-secondary hover:text-text-primary disabled:opacity-50 flex items-center justify-center gap-1.5 premium-btn"
                  title="Takeback Move"
                >
                  <Undo2 size={14} /> Undo
                </button>
                <button
                  onClick={toggleBoardFlipped}
                  className="p-2 bg-bg-surface border border-bg-border text-text-secondary hover:text-text-primary premium-btn"
                  title="Flip Board"
                >
                  <FlipHorizontal size={14} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar (Move log, Chat) (320px width) */}
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-bg-border flex flex-col bg-bg-surface">
          {/* Active Opponent Info */}
          {activeBot && (
            <div className="p-4 border-b border-bg-border flex items-center gap-3">
              {activeBot.isImageAvatar
                ? <img src={activeBot.avatar} alt={activeBot.name} className="w-10 h-10 rounded-full object-cover border-2 flex-shrink-0" style={{ borderColor: activeBot.accentColor + '80' }} />
                : <span className="text-2xl flex-shrink-0">{activeBot.avatar}</span>
              }
              <div>
                <h3 className="text-xs font-bold text-text-primary flex items-center gap-1.5">
                  {activeBot.name}
                  {activeBot.title && <span className="text-[9px] px-1 py-0.5 rounded-sm font-mono-clock" style={{ color: activeBot.accentColor, backgroundColor: activeBot.accentColor + '20', border: `1px solid ${activeBot.accentColor}40` }}>{activeBot.title}</span>}
                  {activeBot.country && <span className="text-[12px]">{activeBot.country}</span>}
                </h3>
                <p className="text-[10px] text-text-secondary italic">"{activeBot.quote}"</p>
              </div>
            </div>
          )}

          {/* Move Log pane */}
          <div className="flex-1 min-h-[120px] p-4 flex flex-col border-b border-bg-border overflow-hidden">
            <h4 className="text-[10px] font-mono-clock uppercase text-text-muted mb-2 tracking-wider">Move Log</h4>
            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-1.5 text-xs text-text-secondary font-mono-clock">
              {history.length > 0 ? (
                history.map((record) => (
                  <div key={record.num} className="flex py-1 px-2 hover:bg-bg-elevated rounded-sm">
                    <span className="w-10 text-text-muted">{record.num}.</span>
                    <span className="flex-1 text-text-primary font-medium">{record.white}</span>
                    <span className="flex-1">{record.black || '...'}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-text-muted italic text-[11px]">
                  No moves played yet.
                </div>
              )}
            </div>
          </div>

          {/* Simulated Chat Pane */}
          <div className="h-60 flex flex-col bg-bg-surface">
            <div className="p-3 border-b border-bg-border bg-bg-void flex items-center justify-between text-[10px] font-mono-clock text-text-muted tracking-wider uppercase">
              <span>Chat Log</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green inline-block" />
            </div>

            {/* Chat message scrolling list */}
            <div className="flex-1 p-3 overflow-y-auto custom-scrollbar flex flex-col gap-2.5">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className="flex flex-col text-xs leading-relaxed">
                  <div className="flex items-baseline justify-between mb-0.5">
                    <span className={`font-semibold ${msg.sender === 'You' ? 'text-accent-cyan' : 'text-text-primary'}`}>
                      {msg.sender}
                    </span>
                    <span className="text-[8px] font-mono-clock text-text-muted">{msg.time}</span>
                  </div>
                  <p className="text-text-secondary bg-bg-elevated/40 border border-bg-border/30 px-2 py-1 rounded-sm">
                    {msg.text}
                  </p>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Send Form */}
            <form onSubmit={handleSendChat} className="p-2 border-t border-bg-border flex gap-1.5 bg-bg-void">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Talk to opponent..."
                className="flex-1 px-3 py-1.5 bg-bg-elevated border border-bg-border focus:border-text-muted focus:outline-none rounded-sm text-xs"
              />
              <button
                type="submit"
                className="p-1.5 bg-bg-surface border border-bg-border text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-sm transition-all"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // PRE-GAME BOT PICKER SCREEN
  const botTiers = ['All', 'Celebrity', 'Leaders', 'Luminaries', 'Beginner', 'Casual', 'Intermediate', 'Advanced', 'Expert', 'Master', 'Legend'];

  return (
    <div className="w-full h-full flex flex-col p-6 overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif-header text-3xl font-bold tracking-tight">Bot Lobby</h1>
          <p className="text-xs text-text-secondary mt-1">Challenge our advanced Stockfish neural bots ranging from novice ELO 200 up to grandmaster ELO 2850.</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bots or tags..."
            className="w-full pl-9 pr-4 py-2 bg-bg-surface border border-bg-border focus:border-text-muted focus:outline-none rounded-sm text-xs transition-all duration-200"
          />
          <Search size={14} className="absolute left-3 top-2.5 text-text-muted" />
        </div>
      </div>

      {/* Tier Filter Tags */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {botTiers.map((tier) => (
          <button
            key={tier}
            onClick={() => setActiveTier(tier)}
            className={`px-3 py-1.5 border rounded-sm text-xs font-mono-clock uppercase transition-all duration-150 cursor-pointer ${
              tier === 'Celebrity'
                ? activeTier === tier
                  ? 'bg-amber-400 text-bg-void border-amber-400 font-bold shadow-lg shadow-amber-400/20'
                  : 'bg-amber-400/10 border-amber-400/40 text-amber-400 hover:bg-amber-400/20'
                : activeTier === tier 
                  ? 'bg-text-primary text-bg-void border-text-primary font-semibold' 
                  : 'bg-bg-surface border-bg-border text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
            }`}
          >
            {tier === 'Celebrity' ? '⭐ Celebrity' : tier}
          </button>
        ))}
      </div>

      {/* Bot Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredBots.map((bot) => (
          <div
            key={bot.id}
            onClick={() => handleStartSetup(bot)}
            style={{ borderColor: bot.accentColor + '50' }}
            className="bg-bg-surface border p-5 rounded-sm flex flex-col justify-between hover:bg-bg-elevated/60 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 group cursor-pointer"
          >
            {/* Header info */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                {bot.isImageAvatar
                  ? <img src={bot.avatar} alt={bot.name} className="w-16 h-16 rounded-full object-cover border-2 shadow-lg" style={{ borderColor: bot.accentColor + '80' }} />
                  : <span className="text-4xl filter drop-shadow">{bot.avatar}</span>
                }
                <div className="flex flex-col items-end gap-1">
                  {bot.title && (
                    <span className="text-[9px] font-mono-clock uppercase px-1.5 py-0.5 border rounded-sm font-bold" style={{ color: bot.accentColor, backgroundColor: bot.accentColor + '15', borderColor: bot.accentColor + '40' }}>
                      {bot.country && <span className="mr-1">{bot.country}</span>}{bot.title}
                    </span>
                  )}
                  <span 
                    style={{ color: bot.accentColor, backgroundColor: bot.accentColor + '10', borderColor: bot.accentColor + '30' }}
                    className="text-[9px] font-mono-clock uppercase px-1.5 py-0.5 border rounded-sm"
                  >
                    ELO {bot.elo}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-serif-header text-md font-bold tracking-tight text-text-primary">{bot.name}</h3>
                <span className="text-[10px] font-mono-clock uppercase text-text-muted tracking-wider">
                  {bot.tier} Opponent
                </span>
              </div>

              <p className="text-xs text-text-secondary leading-relaxed min-h-[48px] line-clamp-3">
                {bot.bio}
              </p>
            </div>

            {/* Footer tags and Challenge CTA */}
            <div className="mt-5 flex flex-col gap-4">
              <div className="flex flex-wrap gap-1">
                {bot.style.map((tag) => (
                  <span key={tag} className="text-[9px] font-mono-clock bg-bg-void text-text-muted px-1.5 py-0.5 rounded-sm border border-bg-border">
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleStartSetup(bot);
                }}
                className="premium-btn py-2 text-xs uppercase font-mono-clock w-full flex items-center justify-center gap-1.5 group-hover:bg-text-primary group-hover:text-bg-void group-hover:border-text-primary"
              >
                Challenge Bot <PlayIcon size={12} fill="currentColor" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBots.length === 0 && (
        <div className="text-center py-20 bg-bg-surface border border-bg-border rounded-sm">
          <span className="text-3xl">♟</span>
          <h3 className="font-serif-header text-md font-semibold mt-3">No Chess Bots Found</h3>
          <p className="text-xs text-text-muted mt-1">Try resetting your search query or choosing another tier filter.</p>
        </div>
      )}

      {/* GAME MODE CONFIGURATION MODAL */}
      {showConfigModal && selectedBot && (
        <div className="fixed inset-0 bg-void/85 flex items-center justify-center z-50 p-4">
          <div className="bg-bg-surface border border-bg-border p-6 rounded-md max-w-md w-full relative shadow-2xl">
            <button 
              onClick={() => setShowConfigModal(false)}
              className="absolute right-4 top-4 text-text-secondary hover:text-text-primary"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-5 pb-4 border-b border-bg-border">
              {selectedBot.isImageAvatar
                ? <img src={selectedBot.avatar} alt={selectedBot.name} className="w-14 h-14 rounded-full object-cover border-2 flex-shrink-0" style={{ borderColor: selectedBot.accentColor + '80' }} />
                : <span className="text-4xl">{selectedBot.avatar}</span>
              }
              <div>
                <h3 className="font-serif-header text-md font-bold flex items-center gap-2">
                  Challenge {selectedBot.name}
                  {selectedBot.title && <span className="text-[10px] font-mono-clock px-1.5 py-0.5 rounded-sm" style={{ color: selectedBot.accentColor, backgroundColor: selectedBot.accentColor + '20', border: `1px solid ${selectedBot.accentColor}40` }}>{selectedBot.title}</span>}
                  {selectedBot.country && <span className="text-sm">{selectedBot.country}</span>}
                </h3>
                <span className="text-[10px] font-mono-clock text-text-muted uppercase">Recommended ELO: {selectedBot.elo}</span>
              </div>
            </div>

            {/* Time Control Options */}
            <div className="flex flex-col gap-3 mb-5">
              <label className="text-xs font-mono-clock text-text-muted uppercase tracking-wider">Time Control Presets</label>
              <div className="grid grid-cols-3 gap-2">
                {(() => {
                  const standardPresets = [
                    { id: '1+0', name: 'Bullet 1m' },
                    { id: '3+0', name: 'Blitz 3m' },
                    { id: '5+0', name: 'Blitz 5m' },
                    { id: '10+0', name: 'Rapid 10m' },
                    { id: '15+10', name: 'Rapid 15+10' }
                  ];
                  
                  // Check if recommended time is standard
                  const recommended = selectedBot.recommendedTime || '10+0';
                  const isStandard = standardPresets.some(p => p.id === recommended);
                  
                  const presetsToRender = [...standardPresets];
                  if (!isStandard && recommended !== 'custom') {
                    const parts = recommended.split('+');
                    const min = parseInt(parts[0], 10) || 10;
                    const inc = parseInt(parts[1], 10) || 0;
                    let cat = 'Blitz';
                    if (min < 3) cat = 'Bullet';
                    else if (min >= 10) cat = 'Rapid';
                    
                    presetsToRender.push({
                      id: recommended,
                      name: `Rec: ${cat} ${min}+${inc}`
                    });
                  }
                  
                  presetsToRender.push({ id: 'custom', name: 'Custom' });
                  
                  return presetsToRender.map(tc => (
                    <button
                      key={tc.id}
                      onClick={() => setTimePreset(tc.id as any)}
                      className={`py-2 px-3 border rounded-sm text-xs font-mono-clock uppercase transition-all ${
                        timePreset === tc.id
                          ? 'bg-text-primary text-bg-void border-text-primary font-bold'
                          : 'bg-bg-void border-bg-border text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {tc.name}
                    </button>
                  ));
                })()}
              </div>

              {/* Custom Time inputs */}
              {timePreset === 'custom' && (
                <div className="grid grid-cols-2 gap-3 mt-1.5 p-3 bg-bg-void border border-bg-border rounded-sm">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono-clock text-text-muted uppercase">Minutes</label>
                    <input
                      type="number"
                      min={1}
                      max={120}
                      value={customMin}
                      onChange={(e) => setCustomMin(parseInt(e.target.value, 10))}
                      className="bg-bg-surface border border-bg-border rounded-sm px-2 py-1 text-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono-clock text-text-muted uppercase">Increment (sec)</label>
                    <input
                      type="number"
                      min={0}
                      max={60}
                      value={customInc}
                      onChange={(e) => setCustomInc(parseInt(e.target.value, 10))}
                      className="bg-bg-surface border border-bg-border rounded-sm px-2 py-1 text-xs"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Color selection */}
            <div className="flex flex-col gap-3 mb-6">
              <label className="text-xs font-mono-clock text-text-muted uppercase tracking-wider">Your Color</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'white', name: 'White ⚪' },
                  { id: 'black', name: 'Black ⚫' },
                  { id: 'random', name: 'Random 🔄' }
                ].map(col => (
                  <button
                    key={col.id}
                    onClick={() => setPickedColor(col.id as any)}
                    className={`py-2 px-3 border rounded-sm text-xs font-mono-clock uppercase transition-all ${
                      pickedColor === col.id
                        ? 'bg-text-primary text-bg-void border-text-primary font-bold'
                        : 'bg-bg-void border-bg-border text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {col.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Play CTA */}
            <button
              onClick={handleConfirmStart}
              className="premium-btn-primary w-full py-3 text-xs uppercase font-mono-clock flex items-center justify-center gap-1.5"
            >
              Start Battle <PlayIcon size={12} fill="currentColor" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Play;
