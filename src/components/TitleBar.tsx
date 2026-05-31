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
              <span className="text-sm pb-1">─</span>
            </button>
            <button
              onClick={handleMaximize}
              className="w-11 h-full flex items-center justify-center hover:bg-white/10 text-text-secondary hover:text-text-primary transition-colors duration-150"
              title="Maximize"
            >
              <span className="text-[10px] border border-current w-2.5 h-2.5" />
            </button>
            <button
              onClick={handleClose}
              className="w-11 h-full flex items-center justify-center hover:bg-[#E81123] hover:text-white text-text-secondary transition-colors duration-150"
              title="Close"
            >
              <span className="text-[10px] font-sans">✕</span>
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

