import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Puzzle, Trophy, Flame, User, History, ArrowRight } from 'lucide-react';
import { useGameStore, TimeControl } from '../store/gameStore';
import { useSettingsStore } from '../store/settingsStore';
import { BOTS } from '../data/bots';


export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { 
    userEloBlitz, 
    userEloRapid, 
    userEloBullet, 
    gameHistory,
    startNewGame 
  } = useGameStore();

  const { playerName, isGuest, playerEmail, playerAvatar } = useSettingsStore();

  const quickControls: { label: string; sub: string; tc: TimeControl }[] = [
    { label: '1+0 Bullet', sub: 'Lightning Fast', tc: '1+0' },
    { label: '3+0 Blitz', sub: 'Speed Battle', tc: '3+0' },
    { label: '10+0 Rapid', sub: 'Balanced Focus', tc: '10+0' },
    { label: '15+10 Rapid', sub: 'Theoretical Match', tc: '15+10' }
  ];

  const handleQuickPlay = (tc: TimeControl) => {
    // Challenge standard bot Wobble or Sparky on quick start, or go to play screen
    const sparkyBot = BOTS.find(b => b.id === 'sparky') || null;
    startNewGame(sparkyBot, tc, 'random');
    navigate('/play');
  };

  // Compute current consecutive-day streak from gameHistory
  const computeStreak = (): number => {
    if (gameHistory.length === 0) return 0;
    const uniqueDays = [...new Set(gameHistory.map(g => g.date))].sort((a, b) => b.localeCompare(a));
    const today = new Date().toISOString().split('T')[0];
    let streak = 0;
    let cursor = today;
    for (const day of uniqueDays) {
      if (day === cursor) {
        streak++;
        const d = new Date(cursor);
        d.setDate(d.getDate() - 1);
        cursor = d.toISOString().split('T')[0];
      } else {
        break;
      }
    }
    return streak;
  };
  const activeStreak = computeStreak();

  const getResultColor = (res: 'W' | 'L' | 'D') => {
    if (res === 'W') return 'text-accent-green';
    if (res === 'L') return 'text-accent-red';
    return 'text-text-secondary';
  };

  // Static 4x4 representation of a chess board for the mini-puzzle preview
  const miniBoard = [
    ['♜', ' ', ' ', '♚'],
    [' ', '♟', ' ', ' '],
    [' ', ' ', '♙', ' '],
    ['♔', ' ', ' ', ' ']
  ];

  return (
    <div className="w-full h-full flex flex-col p-6 overflow-y-auto custom-scrollbar">
      {/* Page Title */}
      <h1 className="font-serif-header text-3xl font-bold tracking-tight mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: User Stats Strip (3 cols) */}
        <div className="lg:col-span-3 bg-bg-surface border border-bg-border p-5 rounded-sm flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-accent-primary bg-bg-elevated flex items-center justify-center text-text-secondary font-serif-header text-xl uppercase overflow-hidden shrink-0">
              {playerAvatar ? (
                <img src={playerAvatar} alt={playerName} className="w-full h-full object-cover" />
              ) : (
                playerName.charAt(0) || <User size={24} />
              )}
            </div>
            <div className="overflow-hidden">
              <h2 className="font-serif-header text-md font-semibold text-text-primary truncate" title={playerName}>{playerName}</h2>
              <span className="text-[10px] font-mono-clock bg-bg-border text-text-secondary px-1.5 py-0.5 rounded-sm uppercase">
                {isGuest ? 'Guest User' : (playerEmail ? 'Verified Member' : 'Offline Mode')}
              </span>
            </div>
          </div>

          <div className="w-full border-t border-bg-border" />

          {/* Rating Badges */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs uppercase font-mono-clock text-text-muted">ELO RATINGS</h3>
            <div className="flex items-center justify-between py-1 border-b border-bg-border/30 text-xs">
              <span className="text-text-secondary font-medium">⚡ Blitz</span>
              <span className="font-mono-clock text-text-primary font-bold">{userEloBlitz}</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-bg-border/30 text-xs">
              <span className="text-text-secondary font-medium">⏱ Rapid</span>
              <span className="font-mono-clock text-text-primary font-bold">{userEloRapid}</span>
            </div>
            <div className="flex items-center justify-between py-1 text-xs">
              <span className="text-text-secondary font-medium">🔫 Bullet</span>
              <span className="font-mono-clock text-text-primary font-bold">{userEloBullet}</span>
            </div>
          </div>

          <div className="w-full border-t border-bg-border" />

          {/* Today's Activity */}
          <div className="flex flex-col gap-2.5">
            <h3 className="text-xs uppercase font-mono-clock text-text-muted">Today's Activity</h3>
            <div className="text-xs text-text-secondary flex flex-col gap-1.5">
              <div className="flex justify-between">
                <span>Games Played</span>
                <span className="font-mono-clock font-semibold text-text-primary">{gameHistory.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Win Ratio</span>
                <span className="font-mono-clock font-semibold text-text-primary">
                  {gameHistory.length > 0 
                    ? `${Math.round((gameHistory.filter(g => g.result === 'W').length / gameHistory.length) * 100)}%`
                    : '0%'}
                </span>
              </div>
            </div>
          </div>

          {/* Streak Indicator */}
          <div className="bg-bg-elevated p-3 border border-bg-border flex items-center justify-between rounded-sm">
            <div className="flex items-center gap-2">
              <Flame size={16} className="text-accent-amber animate-pulse" />
              <span className="text-xs font-medium text-text-primary">Active Streak</span>
            </div>
            <span className="font-mono-clock text-xs font-bold text-accent-amber">
              {activeStreak > 0 ? `${activeStreak} DAY${activeStreak !== 1 ? 'S' : ''}` : 'START TODAY'}
            </span>
          </div>
        </div>

        {/* CENTER COLUMN: Story mode, Quick play presets & daily puzzle (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Story Mode Banner */}
          <div className="bg-bg-surface border border-bg-border p-6 rounded-sm relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 group shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/10 via-transparent to-transparent pointer-events-none" />
            <div className="z-10 text-center sm:text-left">
              <h2 className="font-serif-header text-xl font-bold mb-1 flex items-center justify-center sm:justify-start gap-2 text-text-primary">
                <Trophy size={20} className="text-accent-primary" /> Time Travel Campaign
              </h2>
              <p className="text-xs text-text-secondary max-w-sm leading-relaxed">
                Battle through history against legends like Alexander the Great, Genghis Khan, and modern Masters!
              </p>
            </div>
            <button
              onClick={() => navigate('/campaign')}
              className="premium-btn text-xs uppercase font-mono-clock py-3 px-6 z-10 shrink-0 w-full sm:w-auto flex items-center justify-center gap-2 bg-accent-primary text-white hover:bg-accent-primary/80 border-accent-primary transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
            >
               Enter Story Mode <ArrowRight size={14} />
            </button>
          </div>

          {/* Quick Play Presets */}
          <div className="bg-bg-surface border border-bg-border p-6 rounded-sm">
            <h2 className="font-serif-header text-lg font-bold mb-4 flex items-center gap-2">
              <Play size={18} /> Quick Start Game
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickControls.map((control) => (
                <button
                  key={control.label}
                  onClick={() => handleQuickPlay(control.tc)}
                  className="premium-btn text-left p-4 flex flex-col gap-1 group relative overflow-hidden"
                >
                  <span className="text-sm font-semibold tracking-wide group-hover:text-text-primary">{control.label}</span>
                  <span className="text-[10px] text-text-muted">{control.sub}</span>
                  <div className="absolute right-4 bottom-4 text-text-muted group-hover:text-text-primary opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
                    <ArrowRight size={14} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Daily Puzzle */}
          <div className="bg-bg-surface border border-bg-border p-6 rounded-sm flex flex-col sm:flex-row gap-6 items-center">
            {/* Board Preview Grid */}
            <div className="w-32 h-32 border border-bg-void bg-board-dark grid grid-cols-4 select-none shrink-0 relative shadow-md">
              {miniBoard.map((row, rIdx) =>
                row.map((piece, cIdx) => {
                  const isLight = (rIdx + cIdx) % 2 === 0;
                  return (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      className={`w-full h-full flex items-center justify-center text-xl ${
                        isLight ? 'bg-zinc-200 text-black' : 'bg-zinc-800 text-zinc-100'
                      }`}
                    >
                      {piece}
                    </div>
                  );
                })
              )}
              {/* Highlight Target */}
              <div className="absolute inset-0 bg-accent-amber/5 border border-accent-amber/35 pointer-events-none" />
            </div>

            {/* Puzzle Metadata */}
            <div className="flex-1 flex flex-col justify-between h-full w-full text-center sm:text-left">
              <div>
                <span className="text-[9px] font-mono-clock uppercase bg-accent-amber/10 border border-accent-amber/30 text-accent-amber px-1.5 py-0.5 rounded-sm">
                  Daily Puzzle
                </span>
                <h3 className="font-serif-header text-md font-bold text-text-primary mt-2">
                  Find the Defending Fork
                </h3>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                  White to move — Mate in 2. Can you locate the tactical breakthrough that cracks Black's kingside pawn structure?
                </p>
              </div>

              <button
                onClick={() => navigate('/puzzles')}
                className="premium-btn text-xs uppercase font-mono-clock py-2 px-4 mt-4 w-full sm:w-fit flex items-center justify-center gap-1.5"
              >
                Solve Puzzle <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Recent Games List (3 cols) */}
        <div className="lg:col-span-3 bg-bg-surface border border-bg-border p-5 rounded-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-header text-md font-bold flex items-center gap-2">
              <History size={16} /> Recent Games
            </h2>
            <button
              onClick={() => navigate('/profile')}
              className="text-[10px] text-text-secondary hover:text-text-primary uppercase font-mono-clock transition-colors"
            >
              Full Profile
            </button>
          </div>

          <div className="w-full border-t border-bg-border" />

          {/* History Scroll List */}
          <div className="flex flex-col gap-3">
            {gameHistory.length > 0 ? (
              gameHistory.slice(0, 4).map((game) => (
                <div
                  key={game.id}
                  className="p-3 bg-bg-elevated/40 border border-bg-border/60 rounded-sm flex items-center justify-between text-xs hover:border-text-muted transition-colors duration-150"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-text-primary">vs {game.opponent}</span>
                    <span className="text-[10px] text-text-muted">
                      {game.timeControl} • {game.playerColor === 'white' ? 'White' : 'Black'}
                    </span>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className={`font-mono-clock font-bold ${getResultColor(game.result)}`}>
                      {game.result}
                    </span>
                    <span className="text-[9px] font-mono-clock text-text-muted">
                      {game.ratingChange >= 0 ? `+${game.ratingChange}` : game.ratingChange}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-xs text-text-muted">
                No local games logged yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
