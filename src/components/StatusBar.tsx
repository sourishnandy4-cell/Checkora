import React from 'react';
import { Cpu, WifiOff } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const StatusBar: React.FC = () => {
  const { isGameActive, activeBot, timeControl } = useGameStore();

  return (
    <div className="w-full h-6 bg-void border-t border-bg-border flex items-center justify-between px-3 text-[10px] font-mono-clock text-text-muted select-none z-30">
      {/* Left section: Engine status */}
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1 text-accent-green">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green inline-block animate-pulse" />
          SYSTEM: ONLINE
        </span>
        <span className="text-bg-border">|</span>
        <span className="flex items-center gap-1">
          <Cpu size={10} />
          STOCKFISH 10 LITE (WASM)
        </span>
      </div>

      {/* Middle section: Active Game Details */}
      <div className="hidden sm:flex items-center gap-2">
        {isGameActive ? (
          <>
            <span className="text-text-secondary uppercase">
              MATCH IN PROGRESS vs {activeBot ? activeBot.name : 'ENGINE'}
            </span>
            <span className="text-bg-border">|</span>
            <span>TC: {timeControl}</span>
          </>
        ) : (
          <span className="text-text-muted uppercase tracking-wider">
            Ready to challenge opponent
          </span>
        )}
      </div>

      {/* Right section: System properties */}
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5">
          <WifiOff size={10} />
          LOCAL SANDBOX
        </span>
        <span className="text-bg-border">|</span>
        <span>LATENCY: 0.1ms</span>
      </div>
    </div>
  );
};
