import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Users, 
  Puzzle, 
  GraduationCap, 
  Zap, 
  BarChart3, 
  User, 
  Settings, 
  Map, 
  LayoutDashboard,
  ArrowRight
} from 'lucide-react';
import { useMultiplayerStore } from '../store/multiplayerStore';

export const Menu: React.FC = () => {
  const navigate = useNavigate();
  const { setShowModal } = useMultiplayerStore();

  const menuItems = [
    {
      icon: <LayoutDashboard className="text-blue-400" size={24} />,
      title: 'Dashboard',
      description: 'View ELO ratings, active streaks, and recent game history.',
      action: () => navigate('/')
    },
    {
      icon: <Play className="text-green-400" size={24} />,
      title: 'Bot Lobby',
      description: 'Challenge 20+ advanced custom neural bots from ELO 200 to 2850.',
      action: () => navigate('/play')
    },
    {
      icon: <Users className="text-cyan-400" size={24} />,
      title: 'Play a Friend',
      description: 'Host or join an offline peer-to-peer multiplayer chess match.',
      action: () => setShowModal(true)
    },
    {
      icon: <Map className="text-amber-400" size={24} />,
      title: 'Story Mode',
      description: 'Embark on a campaigns through history from ancient India to modern masters.',
      action: () => navigate('/campaign')
    },
    {
      icon: <Puzzle className="text-purple-400" size={24} />,
      title: 'Puzzles',
      description: 'Solve tactical chess puzzles and raise your puzzle rating.',
      action: () => navigate('/puzzles')
    },
    {
      icon: <GraduationCap className="text-emerald-400" size={24} />,
      title: 'Learn Rules',
      description: 'Interactive tutorial lessons designed to teach rules and tactics.',
      action: () => navigate('/learn')
    },
    {
      icon: <Zap className="text-yellow-400" size={24} />,
      title: 'Coordinates Training',
      description: 'Train your chess board notation and speed reading of squares.',
      action: () => navigate('/train')
    },
    {
      icon: <BarChart3 className="text-indigo-400" size={24} />,
      title: 'Analysis Board',
      description: 'Review board coordinates, analyze games, and try out variations.',
      action: () => navigate('/analysis')
    },
    {
      icon: <User className="text-rose-400" size={24} />,
      title: 'Player Profile',
      description: 'Manage player name, guest credentials, and game log archives.',
      action: () => navigate('/profile')
    },
    {
      icon: <Settings className="text-gray-400" size={24} />,
      title: 'App Settings',
      description: 'Customize board themes, piece sets, volume levels, and options.',
      action: () => navigate('/settings')
    }
  ];

  return (
    <div className="w-full h-full flex flex-col p-6 overflow-y-auto custom-scrollbar">
      {/* Title */}
      <div className="mb-6">
        <h1 className="font-serif-header text-3xl font-bold tracking-tight">
          Application Menu
        </h1>
        <p className="text-xs text-text-secondary mt-1">
          Explore all of Checkora's offline features, local engines, tools, and game configurations.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
        {menuItems.map((item) => (
          <button
            key={item.title}
            onClick={item.action}
            className="bg-bg-surface border border-bg-border/60 hover:border-text-muted hover:bg-bg-elevated/40 p-5 rounded-sm flex items-start gap-4 transition-all duration-200 text-left group cursor-pointer shadow-sm hover:shadow-md"
          >
            <div className="p-2.5 bg-bg-void rounded border border-bg-border/40 group-hover:scale-105 transition-transform duration-200 shrink-0">
              {item.icon}
            </div>
            
            <div className="flex-1 flex flex-col gap-1 pr-6 relative h-full justify-between">
              <div>
                <h3 className="font-serif-header text-sm font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-text-secondary leading-relaxed mt-1">
                  {item.description}
                </p>
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 text-text-muted group-hover:text-text-primary opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
                <ArrowRight size={14} />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
