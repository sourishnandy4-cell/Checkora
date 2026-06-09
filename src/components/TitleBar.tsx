import React from 'react';

export const TitleBar: React.FC = () => {
  const isElectron = !!window.electronAPI;

  const handleMinimize = () => {
    window.electronAPI?.windowControls.minimize();
  };

  const handleMaximize = () => {
    window.electronAPI?.windowControls.maximize();
  };

  const handleClose = () => {
    window.electronAPI?.windowControls.close();
  };

  return (
    <div className="w-full h-9 bg-void/80 backdrop-blur-md border-b border-bg-border/60 flex items-center justify-between pl-4 pr-0 select-none draggable z-50">
      {/* Title / Logo */}
      <div className="flex items-center gap-2">
        <span className="text-text-primary font-serif-header text-sm tracking-widest font-semibold flex items-center gap-1.5 opacity-90">
          ♟ <span className="font-sans font-bold tracking-normal uppercase text-xs text-text-secondary">Checkora</span>
        </span>
      </div>

      {/* Drag Status Indicator / Draggable Area */}
      <div className="text-[10px] text-text-muted font-mono-clock uppercase tracking-widest hidden sm:block opacity-60">
        System 16.0 • Premium Shell
      </div>

      {/* Window Controls */}
      <div className="flex items-center h-full no-drag">
        {isElectron ? (
          <>
            <button
              onClick={handleMinimize}
              className="w-11 h-full flex items-center justify-center hover:bg-white/10 text-text-secondary hover:text-text-primary transition-colors duration-150"
              title="Minimize"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="2" y1="6" x2="10" y2="6" />
              </svg>
            </button>
            <button
              onClick={handleMaximize}
              className="w-11 h-full flex items-center justify-center hover:bg-white/10 text-text-secondary hover:text-text-primary transition-colors duration-150"
              title="Maximize"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="8" height="8" rx="0.5" />
              </svg>
            </button>
            <button
              onClick={handleClose}
              className="w-11 h-full flex items-center justify-center hover:bg-[#E81123] hover:text-white text-text-secondary transition-colors duration-150"
              title="Close"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="2.5" y1="2.5" x2="9.5" y2="9.5" />
                <line x1="9.5" y1="2.5" x2="2.5" y2="9.5" />
              </svg>
            </button>
          </>
        ) : (
          <div className="flex items-center gap-1.5 px-4 h-full border-l border-bg-border/30">
            <span className="w-2 h-2 rounded-full bg-accent-green shadow-[var(--glow-sm)] inline-block" title="Web Mode Enabled" />
            <span className="text-[10px] font-mono-clock uppercase text-text-muted tracking-wide">Web Runtime</span>
          </div>
        )}
      </div>
    </div>
  );
};

