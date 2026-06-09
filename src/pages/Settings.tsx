import React from 'react';
import { useSettingsStore, ThemeId, PieceSetId } from '../store/settingsStore';
import { useGameStore } from '../store/gameStore';
import { 
  Palette, 
  Gamepad2, 
  Volume2, 
  Info,
  Check
} from 'lucide-react';

const THEMES = [
  { id: 'mono',    name: 'Mono',    preview: ['#000000', '#E8E8E8', '#1E1E1E', '#E8E8E8'] },
  { id: 'forest',  name: 'Forest',  preview: ['#0F160D', '#F0E6C8', '#2D5A27', '#6FCF5A'] },
  { id: 'ocean',   name: 'Ocean',   preview: ['#060F1E', '#BFDDEE', '#143054', '#38BDF8'] },
  { id: 'crimson', name: 'Crimson', preview: ['#180A0C', '#F5E8D8', '#6B1A22', '#F87171'] },
  { id: 'aurora',  name: 'Aurora',  preview: ['#0D0A1C', '#DDD6F3', '#2B1D5E', '#A78BFA'] },
  { id: 'wooden',  name: 'Wooden',  preview: ['#1C1511', '#E1C699', '#965D37', '#D4A373'] },
  { id: 'walnut',  name: 'Walnut',  preview: ['#110E0C', '#D2B48C', '#5C4033', '#A67B5B'] },
] as const;

export const Settings: React.FC = () => {
  const resetElo = useGameStore(state => state.resetElo);
  const {
    theme,
    pieceSet,
    showLegalMoves,
    showCoordinates,
    soundVolume,
    enableSound,
    confirmMoves,
    autoPromoteToQueen,
    setTheme,
    setPieceSet,
    toggleLegalMoves,
    toggleCoordinates,
    setSoundVolume,
    toggleSound,
    toggleConfirmMoves,
    toggleAutoPromote,
    isVoiceEnabled,
    voiceGender,
    toggleVoiceEnabled,
    setVoiceGender
  } = useSettingsStore();

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSoundVolume(parseInt(e.target.value, 10));
  };

  return (
    <div className="w-full h-full flex flex-col p-6 overflow-y-auto custom-scrollbar">
      {/* Title */}
      <h1 className="font-serif-header text-3xl font-bold tracking-tight mb-6">
        App Settings
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* LEFT COLUMN: Appearance, Themes, Voice & Danger Zone (Zustand persistent) */}
        <div className="flex flex-col gap-6">
          {/* Theme Switcher card */}
          <div className="bg-bg-surface border border-bg-border p-5 rounded-sm">
            <h2 className="font-serif-header text-sm font-bold uppercase tracking-wider text-text-secondary mb-4 flex items-center gap-2">
              <Palette size={14} /> Color Themes
            </h2>
            
            {/* Theme switcher cards grid */}
            <div className="flex flex-wrap gap-4">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as ThemeId)}
                  className={`w-28 h-20 rounded-sm overflow-hidden cursor-pointer relative transition-all border ${
                    theme === t.id 
                      ? 'border-accent-primary ring-1 ring-accent-primary/20 scale-105 shadow-md shadow-black/30' 
                      : 'border-bg-border'
                  }`}
                  style={{ background: t.preview[0] }}
                >
                  {/* Mini board preview 2x2 */}
                  <div className="grid grid-cols-2 absolute top-2 left-2 w-7 h-7 rounded-sm overflow-hidden border border-bg-border/30">
                    <div style={{ background: t.preview[1] }} />
                    <div style={{ background: t.preview[2] }} />
                    <div style={{ background: t.preview[2] }} />
                    <div style={{ background: t.preview[1] }} />
                  </div>
                  
                  {/* Accent dot */}
                  <div 
                    style={{ background: t.preview[3] }}
                    className="w-2.5 h-2.5 rounded-full absolute top-2.5 right-2.5 border border-bg-border/30" 
                  />

                  {/* Theme Name */}
                  <span className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-text-secondary font-mono-clock uppercase tracking-wider font-semibold">
                    {t.name}
                  </span>

                  {/* Active checkmark */}
                  {theme === t.id && (
                    <div className="absolute top-2 left-2 text-void text-[9px] w-7 h-7 flex items-center justify-center font-black">
                      ✓
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Piece Set Options */}
          <div className="bg-bg-surface border border-bg-border p-5 rounded-sm">
            <h2 className="font-serif-header text-sm font-bold uppercase tracking-wider text-text-secondary mb-4 flex items-center gap-2">
              <Gamepad2 size={14} /> Board Piece Sets
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {(['classic', 'neo', 'alpha', 'maya', 'bases', 'wooden-pieces'] as PieceSetId[]).map((set) => (
                <button
                  key={set}
                  onClick={() => setPieceSet(set)}
                  className={`py-2 px-3 border rounded-sm text-xs font-mono-clock uppercase transition-all cursor-pointer ${
                    pieceSet === set
                      ? 'bg-text-primary text-bg-void border-text-primary font-bold'
                      : 'bg-bg-void border-bg-border text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                  }`}
                >
                  {set}
                </button>
              ))}
            </div>
          </div>

          {/* Coach Voice Settings panel */}
          <div className="bg-bg-surface border border-bg-border p-5 rounded-sm flex flex-col gap-4">
            <h2 className="font-serif-header text-sm font-bold uppercase tracking-wider text-text-secondary flex items-center gap-2">
              <Volume2 size={14} className="text-accent-cyan" /> Coach Voice Settings
            </h2>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs">
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-text-primary">Enable Coach Voice Instructions</span>
                  <span className="text-[10px] text-text-muted">Speak lesson instruction steps aloud using Web Speech API synthesis.</span>
                </div>                 <input 
                  type="checkbox" 
                  checked={isVoiceEnabled}
                  onChange={() => {
                    const nextEnabled = !isVoiceEnabled;
                    toggleVoiceEnabled();
                    if (nextEnabled && 'speechSynthesis' in window) {
                      try {
                        window.speechSynthesis.cancel();
                        window.speechSynthesis.speak(new SpeechSynthesisUtterance('Voice enabled'));
                      } catch (e) {}
                    }
                  }}
                  className="w-4 h-4 rounded border-bg-border bg-bg-void focus:ring-0 text-text-primary accent-accent-primary"
                />
              </div>

              <div className="w-full border-t border-bg-border/40" />

              {/* Voice Gender Toggle */}
              <div className="flex items-center justify-between text-xs gap-6">
                <div className="flex flex-col gap-0.5 flex-1">
                  <span className="font-medium text-text-primary">Voice Gender</span>
                  <span className="text-[10px] text-text-muted">Select gender personality of the synthetic chess tutor.</span>
                </div>
                
                <div className="flex bg-bg-void p-1 rounded border border-bg-border">
                  <button
                    disabled={!isVoiceEnabled}
                    onClick={() => {
                      setVoiceGender('female');
                      if (isVoiceEnabled && 'speechSynthesis' in window) {
                        try {
                          window.speechSynthesis.cancel();
                          window.speechSynthesis.speak(new SpeechSynthesisUtterance('Female voice selected'));
                        } catch (e) {}
                      }
                    }}
                    className={`px-3 py-1 text-[10px] uppercase font-mono-clock rounded cursor-pointer transition-all disabled:opacity-30 disabled:cursor-not-allowed ${voiceGender === 'female' && isVoiceEnabled ? 'bg-accent-primary text-void font-bold' : 'text-text-secondary hover:text-text-primary'}`}
                  >
                    Female
                  </button>
                  <button
                    disabled={!isVoiceEnabled}
                    onClick={() => {
                      setVoiceGender('male');
                      if (isVoiceEnabled && 'speechSynthesis' in window) {
                        try {
                          window.speechSynthesis.cancel();
                          window.speechSynthesis.speak(new SpeechSynthesisUtterance('Male voice selected'));
                        } catch (e) {}
                      }
                    }}
                    className={`px-3 py-1 text-[10px] uppercase font-mono-clock rounded cursor-pointer transition-all disabled:opacity-30 disabled:cursor-not-allowed ${voiceGender === 'male' && isVoiceEnabled ? 'bg-accent-primary text-void font-bold' : 'text-text-secondary hover:text-text-primary'}`}
                  >
                    Male
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone: Reset ELO panel */}
          <div className="bg-bg-surface border border-accent-red/35 p-5 rounded-sm flex flex-col gap-4 shadow-lg shadow-accent-red/5">
            <h2 className="font-serif-header text-sm font-bold uppercase tracking-wider text-accent-red flex items-center gap-2">
              ⚠️ Danger Zone
            </h2>
            
            <div className="flex flex-col gap-1 text-xs">
              <span className="font-medium text-text-primary">Reset ELO Ratings</span>
              <span className="text-[10px] text-text-muted leading-relaxed mb-3">
                This will permanently reset all your ratings (Rapid, Blitz, and Bullet) back to the base rating floor of **100 ELO**. This action cannot be undone.
              </span>
              
              <button
                onClick={() => {
                  const confirmReset = window.confirm("Are you absolutely sure you want to reset all your ELO ratings back to 100? This cannot be undone.");
                  if (confirmReset) {
                    resetElo();
                    alert("Your ELO ratings have been successfully reset to 100.");
                  }
                }}
                className="py-2.5 px-4 bg-accent-red/20 border border-accent-red text-xs uppercase font-mono-clock text-accent-red hover:bg-accent-red hover:text-bg-void hover:border-accent-red transition-all duration-200 cursor-pointer font-bold rounded-sm text-center"
              >
                Reset ELO Ratings
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Gameplay, Sound, and About (Zustand persistent) */}
        <div className="flex flex-col gap-6">
          {/* Gameplay switches */}
          <div className="bg-bg-surface border border-bg-border p-5 rounded-sm flex flex-col gap-4">
            <h2 className="font-serif-header text-sm font-bold uppercase tracking-wider text-text-secondary flex items-center gap-2">
              <Gamepad2 size={14} /> Gameplay Options
            </h2>
            
            <div className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-text-primary">Show Coordinates</span>
                  <span className="text-[10px] text-text-muted">Display rank and file coordinates (A-H, 1-8) along board borders.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={showCoordinates}
                  onChange={toggleCoordinates}
                  className="w-4 h-4 rounded border-bg-border bg-bg-void focus:ring-0 text-text-primary accent-accent-primary"
                />
              </div>

              <div className="w-full border-t border-bg-border/40" />

              <div className="flex items-center justify-between text-xs">
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-text-primary">Highlight Legal Moves</span>
                  <span className="text-[10px] text-text-muted">Display faint highlight dots on squares that active pieces can legally drop onto.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={showLegalMoves}
                  onChange={toggleLegalMoves}
                  className="w-4 h-4 rounded border-bg-border bg-bg-void focus:ring-0 text-text-primary accent-accent-primary"
                />
              </div>

              <div className="w-full border-t border-bg-border/40" />

              <div className="flex items-center justify-between text-xs">
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-text-primary">Auto-Promote to Queen</span>
                  <span className="text-[10px] text-text-muted">Automatically promote advanced pawns to Queens without popping up selectors.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={autoPromoteToQueen}
                  onChange={toggleAutoPromote}
                  className="w-4 h-4 rounded border-bg-border bg-bg-void focus:ring-0 text-text-primary accent-accent-primary"
                />
              </div>

              <div className="w-full border-t border-bg-border/40" />

              <div className="flex items-center justify-between text-xs">
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-text-primary">Confirm Moves</span>
                  <span className="text-[10px] text-text-muted">Require double tapping squares or a tick check before locking in drops.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={confirmMoves}
                  onChange={toggleConfirmMoves}
                  className="w-4 h-4 rounded border-bg-border bg-bg-void focus:ring-0 text-text-primary accent-accent-primary"
                />
              </div>
            </div>
          </div>

          {/* Sound adjustments */}
          <div className="bg-bg-surface border border-bg-border p-5 rounded-sm flex flex-col gap-4">
            <h2 className="font-serif-header text-sm font-bold uppercase tracking-wider text-text-secondary flex items-center gap-2">
              <Volume2 size={14} /> Sound Settings
            </h2>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs">
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-text-primary">Enable Chess Sound Effects</span>
                  <span className="text-[10px] text-text-muted">Synthesize sounds on moves, captures, check warnings, and timeouts.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={enableSound}
                  onChange={toggleSound}
                  className="w-4 h-4 rounded border-bg-border bg-bg-void focus:ring-0 text-text-primary accent-accent-primary"
                />
              </div>

              <div className="w-full border-t border-bg-border/40" />

              {/* Volume Slider */}
              <div className="flex items-center justify-between text-xs gap-6">
                <div className="flex flex-col gap-0.5 flex-1">
                  <span className="font-medium text-text-primary">Master Volume</span>
                  <span className="text-[10px] text-text-muted">Adjust scale gain multiplier of Audio Synthesizer node.</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <input 
                    type="range" 
                    min={0} 
                    max={100}
                    value={soundVolume}
                    disabled={!enableSound}
                    onChange={handleVolumeChange}
                    className="w-28 h-1 bg-bg-border rounded-lg appearance-none cursor-pointer accent-accent-primary disabled:opacity-30"
                  />
                  <span className="font-mono-clock text-xs w-8 text-right font-bold">{soundVolume}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* About Specification panel */}
          <div className="bg-bg-surface border border-bg-border p-5 rounded-sm flex flex-col gap-3">
            <h2 className="font-serif-header text-sm font-bold uppercase tracking-wider text-text-secondary flex items-center gap-2">
              <Info size={14} /> System Specifications
            </h2>
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex justify-between border-b border-bg-border/20 py-1 font-mono-clock text-[11px]">
                <span className="text-text-muted">APPLICATION</span>
                <span className="text-text-secondary">Checkora v1.0.0</span>
              </div>
              <div className="flex justify-between border-b border-bg-border/20 py-1 font-mono-clock text-[11px]">
                <span className="text-text-muted">AI ENGINE</span>
                <span className="text-text-secondary">Stockfish 10 (WASM build)</span>
              </div>
              <div className="flex justify-between border-b border-bg-border/20 py-1 font-mono-clock text-[11px]">
                <span className="text-text-muted">SHELL VERSION</span>
                <span className="text-text-secondary">Electron v31.0.0</span>
              </div>
              <div className="flex justify-between py-1 font-mono-clock text-[11px]">
                <span className="text-text-muted">LICENSE</span>
                <span className="text-text-secondary">GNU GPL-3.0 (Open Source)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
