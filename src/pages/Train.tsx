import React, { useEffect, useRef, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Zap, Clock, Trophy, Play, RefreshCw, Compass } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { playSound } from '../utils/audio';

export const Train: React.FC = () => {
  const {
    coordsActive,
    coordsTarget,
    coordsScore,
    coordsTime,
    coordsHighscore,
    startCoordsTrainer,
    endCoordsTrainer,
    tickCoordsTrainer,
    submitCoordsAnswer
  } = useGameStore();

  const coordsIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const trainBoardContainerRef = useRef<HTMLDivElement>(null);
  const [trainBoardSize, setTrainBoardSize] = useState(412);

  useEffect(() => {
    const el = trainBoardContainerRef.current;
    if (!el) return;
    
    const initialWidth = el.getBoundingClientRect().width;
    if (initialWidth > 0) setTrainBoardSize(Math.floor(initialWidth));

    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setTrainBoardSize(Math.floor(entry.contentRect.width));
        }
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [coordsActive]);

  // Coordinates timer tick setup
  useEffect(() => {
    if (coordsActive) {
      coordsIntervalRef.current = setInterval(() => {
        tickCoordsTrainer();
      }, 1000);
    } else {
      if (coordsIntervalRef.current) {
        clearInterval(coordsIntervalRef.current);
        coordsIntervalRef.current = null;
      }
    }

    return () => {
      if (coordsIntervalRef.current) clearInterval(coordsIntervalRef.current);
    };
  }, [coordsActive, tickCoordsTrainer]);

  // Handle countdown timeout
  useEffect(() => {
    if (coordsActive && coordsTime === 0) {
      endCoordsTrainer();
      playSound.play('win'); // celebration sound
    }
  }, [coordsTime, coordsActive, endCoordsTrainer]);

  const handleSquareClick = (square: string) => {
    if (!coordsActive) return;
    
    // Play move tap sound
    playSound.play('move');
    submitCoordsAnswer(square);
  };

  const customBoardStyles = {
    customLightSquareStyle: { backgroundColor: 'var(--board-light)' },
    customDarkSquareStyle: { backgroundColor: 'var(--board-dark)' }
  };

  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-6 overflow-y-auto custom-scrollbar items-center justify-start pt-6">
      {!coordsActive ? (
        /* START LOBBY */
        <div className="bg-bg-surface border border-bg-border p-8 rounded-sm text-center max-w-md w-full shadow-lg">
          <div className="w-16 h-16 bg-bg-elevated border border-bg-border rounded-full flex items-center justify-center mx-auto text-accent-cyan mb-4">
            <Zap size={32} />
          </div>
          
          <h1 className="font-serif-header text-2xl font-bold mb-2">Coordinates Vision</h1>
          <p className="text-xs text-text-secondary mb-6 leading-relaxed max-w-sm mx-auto">
            Hone your chess board notation sight speed. Click as many requested coordinates (e.g. "e4", "g6") as possible in **60 seconds**!
          </p>

          {/* Highscore HUD */}
          <div className="p-3 bg-bg-void border border-bg-border rounded-sm flex items-center justify-between mb-8 max-w-xs mx-auto text-xs">
            <span className="text-text-secondary font-medium flex items-center gap-1">
              <Trophy size={12} className="text-accent-amber" /> Local Highscore
            </span>
            <span className="font-mono-clock text-accent-cyan font-bold">{coordsHighscore} Squares</span>
          </div>

          <button
            onClick={startCoordsTrainer}
            className="premium-btn-primary w-full max-w-xs py-3 text-xs uppercase font-mono-clock flex items-center justify-center gap-1.5 cursor-pointer"
          >
            Start Challenge <Play size={12} fill="currentColor" />
          </button>
        </div>
      ) : (
        /* ACTIVE CHALLENGE VIEW */
        <div className="w-full max-w-xl flex flex-col gap-5 items-center">
          {/* Target HUD row */}
          <div className="w-full flex justify-between items-center bg-bg-surface border border-bg-border p-3.5 rounded-sm select-none">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono-clock text-text-muted">Target Square</span>
              <span className="font-mono-clock text-2xl font-black text-text-primary px-3 py-1 bg-bg-void border border-bg-border rounded-sm uppercase tracking-wide scale-105 animate-pulse">
                {coordsTarget}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono-clock">
              <div className="flex items-center gap-1 text-text-secondary">
                <Trophy size={14} className="text-accent-amber" />
                Score: <span className="font-bold text-text-primary">{coordsScore}</span>
              </div>
              <div className="flex items-center gap-1 text-text-secondary px-2.5 py-1 bg-bg-void border border-bg-border rounded-sm">
                <Clock size={14} className="text-text-muted" />
                Time: <span className="font-bold text-text-primary">{coordsTime}s</span>
              </div>
            </div>
          </div>

          {/* Interactive clicking board */}
          <div ref={trainBoardContainerRef} className="w-full max-w-[420px] shrink-0 aspect-square border-4 border-bg-border rounded-sm shadow-xl relative select-none">
            <Chessboard
              id="TrainerBoard"
              position="8/8/8/8/8/8/8/8"
              onSquareClick={handleSquareClick}
              boardWidth={trainBoardSize}
              boardOrientation="white"
              arePiecesDraggable={false}
              showBoardNotation={true}
              customLightSquareStyle={customBoardStyles.customLightSquareStyle}
              customDarkSquareStyle={customBoardStyles.customDarkSquareStyle}
            />
          </div>

          {/* Tips info */}
          <div className="flex items-center gap-2 text-[10px] font-mono-clock text-text-muted uppercase text-center max-w-xs leading-relaxed mt-2 bg-bg-surface border border-bg-border px-3 py-1.5 rounded-sm">
            <Compass size={12} className="text-accent-cyan" />
            Click the board coordinate requested above!
          </div>
        </div>
      )}
    </div>
  );
};

export default Train;
