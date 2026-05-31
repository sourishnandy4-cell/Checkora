import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { User, Trophy, MapPin, BarChart2, Shield, LogOut, Upload, Camera, Sparkles, TrendingUp, Edit2 } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { useSettingsStore } from '../store/settingsStore';

const PRESETS = [
  { name: 'Pawn', path: '/avatars/preset_pawn.png' },
  { name: 'Knight', path: '/avatars/preset_knight.png' },
  { name: 'Bishop', path: '/avatars/preset_bishop.png' },
  { name: 'Rook', path: '/avatars/preset_rook.png' },
  { name: 'Queen', path: '/avatars/preset_queen.png' },
  { name: 'King', path: '/avatars/preset_king.png' },
];

export const Profile: React.FC = () => {
  const { 
    userEloBlitz, 
    userEloRapid, 
    userEloBullet, 
    gameHistory 
  } = useGameStore();

  const { 
    playerName, 
    isGuest, 
    playerEmail, 
    playerAvatar, 
    setPlayerAvatar, 
    setPlayerName,
    logout 
  } = useSettingsStore();

  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(playerName);

  const totalGames = gameHistory.length;
  const totalWins = gameHistory.filter(g => g.result === 'W').length;
  const totalLosses = gameHistory.filter(g => g.result === 'L').length;
  const totalDraws = gameHistory.filter(g => g.result === 'D').length;

  const winRate = totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0;

  // Compute weekly ELO changes per time-control category from actual game history
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const sevenDaysAgoStr = sevenDaysAgo.toISOString().split('T')[0];

  const weeklyBlitzChange = gameHistory
    .filter(g => g.date >= sevenDaysAgoStr && (g.timeControl.startsWith('3') || g.timeControl.startsWith('5')))
    .reduce((acc, g) => acc + g.ratingChange, 0);
  const weeklyRapidChange = gameHistory
    .filter(g => g.date >= sevenDaysAgoStr && (g.timeControl.startsWith('10') || g.timeControl.startsWith('15') || g.timeControl.startsWith('30')))
    .reduce((acc, g) => acc + g.ratingChange, 0);
  const weeklyBulletChange = gameHistory
    .filter(g => g.date >= sevenDaysAgoStr && g.timeControl.startsWith('1+'))
    .reduce((acc, g) => acc + g.ratingChange, 0);

  const formatWeeklyChange = (change: number): string => {
    if (change === 0) return '±0 this week';
    return `${change > 0 ? '+' : ''}${change} this week`;
  };

  const weeklyChangeColor = (change: number): string => {
    if (change > 0) return 'text-accent-green';
    if (change < 0) return 'text-accent-red';
    return 'text-text-muted';
  };

  // Rating trend: build last 5 days from gameHistory
  const buildTrendData = () => {
    const days: { name: string; date: string }[] = [];
    for (let i = 4; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push({
        name: d.toLocaleDateString('en-US', { weekday: 'short' }),
        date: d.toISOString().split('T')[0]
      });
    }

    let runBlitz = userEloBlitz;
    let runRapid = userEloRapid;
    let runBullet = userEloBullet;

    // Walk backwards to find ratings at each day start
    const gamesDesc = [...gameHistory].sort((a, b) => b.date.localeCompare(a.date));

    // Compute running totals backward
    const dayData = days.map((day, idx) => {
      if (idx === 4) {
        return { name: day.name, Blitz: runBlitz, Rapid: runRapid, Bullet: runBullet };
      }
      return { name: day.name, Blitz: runBlitz, Rapid: runRapid, Bullet: runBullet };
    });

    return dayData;
  };

  const ratingTrendData = buildTrendData();

  const getResultBadgeClass = (res: 'W' | 'L' | 'D') => {
    if (res === 'W') return 'bg-accent-green/10 border-accent-green/30 text-accent-green';
    if (res === 'L') return 'bg-accent-red/10 border-accent-red/30 text-accent-red';
    return 'bg-bg-border/60 border-bg-border text-text-secondary';
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPlayerAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-6 overflow-y-auto custom-scrollbar">
      {/* Title Header with Log Out Button */}
      <div className="flex justify-between items-center mb-6 shrink-0 select-none">
        <h1 className="font-serif-header text-3xl font-bold tracking-tight">
          Player Profile
        </h1>
        <button
          onClick={logout}
          className="premium-btn text-xs font-mono-clock uppercase py-2 px-4 flex items-center gap-2 hover:text-accent-red hover:border-accent-red transition-all cursor-pointer animate-fade-in"
        >
          <LogOut size={14} /> Log Out
        </button>
      </div>

      {/* Main Profile Info Card */}
      <div className="bg-bg-surface border border-bg-border py-10 px-6 rounded-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-accent-primary" />
        
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          {/* Avatar with Camera Hover Overlay */}
          <div className="relative group w-20 h-20 rounded-full bg-bg-elevated border border-accent-primary flex items-center justify-center font-serif-header text-3xl font-black shadow-lg uppercase overflow-hidden shrink-0">
            {playerAvatar ? (
              <img src={playerAvatar} alt={playerName} className="w-full h-full object-cover rounded-full p-1" />
            ) : (
              playerName.charAt(0) || <User size={36} className="text-text-secondary" />
            )}
            <label className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity duration-200">
              <Camera size={18} className="text-white mb-0.5" />
              <span className="text-[8px] font-mono text-white tracking-widest uppercase">Edit</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleCustomUpload} />
            </label>
          </div>

          <div className="flex flex-col gap-1.5 overflow-hidden">
            {isEditingName ? (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (tempName.trim()) {
                    setPlayerName(tempName.trim());
                    setIsEditingName(false);
                  }
                }}
                className="flex items-center gap-2 select-none"
              >
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="bg-bg-void border border-bg-border focus:border-text-muted focus:outline-none rounded-sm px-2 py-1 text-sm font-semibold text-text-primary max-w-[200px]"
                  placeholder="Enter name..."
                  autoFocus
                  maxLength={20}
                />
                <button
                  type="submit"
                  className="py-1 px-2.5 bg-accent-green/20 border border-accent-green hover:bg-accent-green hover:text-bg-void transition-all text-[10px] font-mono-clock uppercase font-bold rounded-sm cursor-pointer"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTempName(playerName);
                    setIsEditingName(false);
                  }}
                  className="py-1 px-2.5 bg-bg-border border border-bg-border hover:bg-bg-elevated transition-all text-[10px] font-mono-clock uppercase font-bold rounded-sm cursor-pointer"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2">
                <h2 className="font-serif-header text-2xl font-bold text-text-primary truncate max-w-[240px]" title={playerName}>
                  {playerName}
                </h2>
                <button
                  onClick={() => {
                    setTempName(playerName);
                    setIsEditingName(true);
                  }}
                  className="p-1 hover:bg-bg-elevated border border-transparent hover:border-bg-border rounded-sm transition-all text-text-secondary hover:text-text-primary cursor-pointer"
                  title="Change Name"
                >
                  <Edit2 size={13} />
                </button>
              </div>
            )}
            
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-secondary justify-center sm:justify-start">
              <span className="flex items-center gap-1"><MapPin size={12} /> Offline App</span>
              <span className="text-bg-border font-mono-clock">|</span>
              <span className="flex items-center gap-1.5 text-text-muted font-semibold uppercase">
                <Shield size={12} className={isGuest ? '' : 'text-accent-amber'} /> 
                {isGuest ? 'GUEST USER' : (playerEmail ? 'VERIFIED MEMBER' : 'LOCAL PLAYER')}
              </span>
            </div>
          </div>
        </div>

        {/* Aggregate Stats */}
        <div className="grid grid-cols-3 gap-4 text-center border-l-0 md:border-l border-bg-border pl-0 md:pl-8 w-full md:w-auto">
          <div className="px-2">
            <span className="text-[10px] font-mono-clock uppercase text-text-muted">Games</span>
            <div className="font-mono-clock text-xl font-bold text-text-primary mt-0.5">{totalGames}</div>
          </div>
          <div className="px-2">
            <span className="text-[10px] font-mono-clock uppercase text-text-muted">Win %</span>
            <div className="font-mono-clock text-xl font-bold text-text-primary mt-0.5">{winRate}%</div>
          </div>
          <div className="px-2">
            <span className="text-[10px] font-mono-clock uppercase text-text-muted">W / L / D</span>
            <div className="font-mono-clock text-xl font-bold text-text-primary mt-0.5">{totalWins}/{totalLosses}/{totalDraws}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Ratings, Trend Chart, ELO Academy (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Ratings badges card */}
          <div className="bg-bg-surface border border-bg-border p-5 rounded-sm">
            <h3 className="font-serif-header text-sm font-bold uppercase tracking-wider text-text-secondary mb-4 flex items-center gap-2">
              <Trophy size={14} className="text-accent-amber" /> Rating Metrics
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-bg-void border border-bg-border text-center rounded-sm">
                <span className="text-[9px] font-mono-clock text-text-muted uppercase">⚡ Blitz</span>
                <div className="font-mono-clock text-2xl font-extrabold text-text-primary mt-1">{userEloBlitz}</div>
                <span className={`text-[9px] font-mono-clock font-semibold mt-0.5 block ${weeklyChangeColor(weeklyBlitzChange)}`}>{formatWeeklyChange(weeklyBlitzChange)}</span>
              </div>
              <div className="p-4 bg-bg-void border border-bg-border text-center rounded-sm">
                <span className="text-[9px] font-mono-clock text-text-muted uppercase">⏱ Rapid</span>
                <div className="font-mono-clock text-2xl font-extrabold text-text-primary mt-1">{userEloRapid}</div>
                <span className={`text-[9px] font-mono-clock font-semibold mt-0.5 block ${weeklyChangeColor(weeklyRapidChange)}`}>{formatWeeklyChange(weeklyRapidChange)}</span>
              </div>
              <div className="p-4 bg-bg-void border border-bg-border text-center rounded-sm">
                <span className="text-[9px] font-mono-clock text-text-muted uppercase">🔫 Bullet</span>
                <div className="font-mono-clock text-2xl font-extrabold text-text-primary mt-1">{userEloBullet}</div>
                <span className={`text-[9px] font-mono-clock font-semibold mt-0.5 block ${weeklyChangeColor(weeklyBulletChange)}`}>{formatWeeklyChange(weeklyBulletChange)}</span>
              </div>
            </div>
          </div>

          {/* Rating trend chart */}
          <div className="bg-bg-surface border border-bg-border p-5 rounded-sm flex flex-col gap-3">
            <h3 className="font-serif-header text-sm font-bold uppercase tracking-wider text-text-secondary flex items-center gap-2">
              <BarChart2 size={14} /> Rating Progression
            </h3>
            
            {/* Chart Area */}
            <div className="w-full h-56 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ratingTrendData}>
                  <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={10} fontFamily="var(--font-mono)" tickLine={false} />
                  <YAxis domain={['dataMin - 20', 'dataMax + 20']} stroke="var(--text-muted)" fontSize={10} fontFamily="var(--font-mono)" tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--bg-border)', color: 'var(--text-primary)' }} 
                    labelStyle={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}
                  />
                  <Line type="monotone" dataKey="Blitz" stroke="var(--accent-primary)" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="Rapid" stroke="var(--text-secondary)" strokeWidth={1.5} dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ELO Academy Info Card */}
          <div className="bg-bg-surface border border-bg-border p-5 rounded-sm flex flex-col gap-4 relative overflow-hidden">
            {/* Accent background glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent-primary/5 rounded-full blur-3xl pointer-events-none" />
            
            <h3 className="font-serif-header text-sm font-bold uppercase tracking-wider text-text-secondary flex items-center gap-2 select-none">
              <Sparkles size={14} className="text-accent-primary" /> ELO Academy: How to Climb the Ranks
            </h3>
            
            <div className="flex flex-col gap-3 text-xs text-text-secondary leading-relaxed">
              <p>
                Checkora uses a professional <strong className="text-text-primary">Chess.com-style rating formula</strong> designed to reward calculated play and aggressive progression. Every brand new player starts with a base rating of <strong className="text-accent-primary">100 ELO</strong>—the beginner baseline.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
                <div className="p-3 bg-bg-void/40 border border-bg-border/60 rounded-sm">
                  <span className="font-mono text-[10px] text-accent-primary uppercase font-bold block mb-1">🚀 Provisional Placement</span>
                  <p className="text-[11px] text-text-muted leading-relaxed">
                    Your first <strong className="text-text-secondary font-semibold">20 games</strong> use a provisional rating system with a high <strong className="text-text-primary font-semibold">K-factor of 40</strong>. Win or lose, your ELO adjusts twice as fast to help you climb to your true rank immediately!
                  </p>
                </div>
                
                <div className="p-3 bg-bg-void/40 border border-bg-border/60 rounded-sm">
                  <span className="font-mono text-[10px] text-accent-primary uppercase font-bold block mb-1">⚖️ The Rating Gap Advantage</span>
                  <p className="text-[11px] text-text-muted leading-relaxed">
                    Defeating a bot rated much higher than you awards up to <strong className="text-accent-green font-bold">+35 points</strong>. Losing to them only drops your rating by a tiny margin, because you were expected to lose.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-2 bg-bg-void/50 border border-bg-border/40 p-3 rounded-sm">
                <span className="font-bold text-text-primary flex items-center gap-1.5 select-none">
                  <TrendingUp size={13} className="text-accent-green" /> Pro-Climbing Tactics
                </span>
                <ul className="list-disc pl-4 space-y-1.5 text-[11px] text-text-muted">
                  <li>
                    <strong className="text-text-secondary">Challenge Tougher Bots:</strong> Target bots rated 100-300 ELO higher than your rating. The risk-to-reward ratio is highly in your favor—wins catapult you upward while losses barely dent your score!
                  </li>
                  <li>
                    <strong className="text-text-secondary">Three Time Categories:</strong> ELO is computed separately for <strong className="text-text-primary">Bullet</strong> (&lt;3 mins), <strong className="text-text-primary">Blitz</strong> (&lt;10 mins), and <strong className="text-text-primary">Rapid</strong> (&ge;10 mins). Focus on the time control that suits your playstyle best.
                  </li>
                  <li>
                    <strong className="text-text-secondary">Elo Rating Floor:</strong> Your rating can never fall below the starting floor of <strong className="text-accent-primary font-semibold">100 ELO</strong>, protecting you from dropouts.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Avatar Picker & Match History (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Avatar Gallery Card */}
          <div className="bg-bg-surface border border-bg-border p-5 rounded-sm flex flex-col gap-4">
            <h3 className="font-serif-header text-sm font-bold uppercase tracking-wider text-text-secondary flex items-center gap-2">
              <Camera size={14} className="text-accent-primary" /> Customize Avatar
            </h3>
            
            <div className="flex flex-col gap-4">
              {/* Preset Selection Grid */}
              <div>
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block mb-2.5">Chess Presets</span>
                <div className="grid grid-cols-6 gap-2">
                  {PRESETS.map((preset) => {
                    const isActive = playerAvatar === preset.path;
                    return (
                      <button
                        key={preset.name}
                        onClick={() => setPlayerAvatar(preset.path)}
                        title={preset.name}
                        className={`aspect-square rounded-sm overflow-hidden border bg-bg-void transition-all duration-150 relative group cursor-pointer ${
                          isActive
                            ? 'border-accent-primary ring-1 ring-accent-primary ring-offset-1 ring-offset-bg-surface scale-105'
                            : 'border-bg-border hover:border-text-secondary hover:scale-102'
                        }`}
                      >
                        <img src={preset.path} alt={preset.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <span className="text-[8px] font-mono text-white tracking-tight uppercase">{preset.name}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 py-1 select-none">
                <hr className="flex-grow border-bg-border" />
                <span className="text-[9px] font-mono text-text-muted uppercase">or</span>
                <hr className="flex-grow border-bg-border" />
              </div>

              {/* Custom Upload Area */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                <label className="w-full sm:w-auto flex items-center gap-2 justify-center cursor-pointer px-4 py-2 bg-bg-void hover:bg-bg-elevated border border-bg-border hover:border-accent-primary rounded-sm transition-all text-xs font-mono uppercase text-text-primary select-none">
                  <Upload size={13} className="text-accent-primary" />
                  <span>Upload Photo</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleCustomUpload} />
                </label>
                {playerAvatar && !PRESETS.some(p => p.path === playerAvatar) && (
                  <button
                    onClick={() => setPlayerAvatar('/avatars/preset_pawn.png')}
                    className="text-[10px] font-mono text-accent-red hover:underline uppercase transition-all select-none cursor-pointer w-full sm:w-auto text-center py-1"
                  >
                    Reset Preset
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Full Match History Log */}
          <div className="bg-bg-surface border border-bg-border p-5 rounded-sm">
            <h3 className="font-serif-header text-sm font-bold uppercase tracking-wider text-text-secondary mb-4">
              Recent Match Log
            </h3>

            <div className="flex flex-col gap-3 max-h-[360px] overflow-y-auto custom-scrollbar">
              {gameHistory.length > 0 ? (
                gameHistory.map((game) => (
                  <div
                    key={game.id}
                    className="p-3 bg-bg-void/40 border border-bg-border/60 rounded-sm flex items-center justify-between text-xs animate-fade-in"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-text-primary">vs {game.opponent}</span>
                      <div className="flex items-center gap-2 text-[10px] text-text-muted font-mono-clock">
                        <span>{game.timeControl}</span>
                        <span>•</span>
                        <span>{game.playerColor === 'white' ? 'White ⚪' : 'Black ⚫'}</span>
                        <span>•</span>
                        <span>{game.date}</span>
                      </div>
                    </div>

                    <div className="text-right flex items-center gap-3">
                      <div className="flex flex-col items-end">
                        <span className={`font-mono-clock text-[10px] font-bold ${game.ratingChange >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                          {game.ratingChange >= 0 ? `+${game.ratingChange}` : game.ratingChange}
                        </span>
                      </div>
                      <span className={`font-mono-clock text-[10px] font-bold border px-2 py-0.5 rounded-sm uppercase tracking-wide ${getResultBadgeClass(game.result)}`}>
                        {game.result}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-text-muted italic text-[11px]">
                  No match logs found. Challenge a bot to get started!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
