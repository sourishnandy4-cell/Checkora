import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Play, 
  Puzzle, 
  GraduationCap, 
  Zap, 
  Eye, 
  Trophy, 
  BarChart3, 
  User, 
  Settings,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  isFuture?: boolean;
}

export const NavigationRail: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();
  const [showScaffoldModal, setShowScaffoldModal] = useState<string | null>(null);

  const navItems: NavItem[] = [
    { icon: <Play size={20} />, label: 'Play Now', path: '/play' },
    { icon: <Puzzle size={20} />, label: 'Puzzles', path: '/puzzles' },
    { icon: <GraduationCap size={20} />, label: 'Learn Rules', path: '/learn' },
    { icon: <Zap size={20} />, label: 'Coordinates', path: '/train' },
    { icon: <Eye size={20} />, label: 'Watch Games', path: '#watch', isFuture: true },
    { icon: <Trophy size={20} />, label: 'Tournaments', path: '#tournaments', isFuture: true },
    { icon: <BarChart3 size={20} />, label: 'Analysis Board', path: '/analysis' },
  ];

  const bottomItems: NavItem[] = [
    { icon: <User size={20} />, label: 'Profile', path: '/profile' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  const handleFutureClick = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    setShowScaffoldModal(label);
  };

  const renderItem = (item: NavItem) => {
    const isActive = location.pathname === item.path;

    if (item.isFuture) {
      return (
        <a
          href={item.path}
          key={item.label}
          onClick={(e) => handleFutureClick(e, item.label)}
          className={`flex items-center gap-4 px-4 py-3.5 mx-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-elevated cursor-pointer relative group transition-all duration-150 my-0.5`}
          title={!isExpanded ? item.label : undefined}
        >
          <div className="flex-shrink-0 transition-transform duration-200 group-hover:scale-105 z-10">{item.icon}</div>
          {isExpanded && (
            <span className="text-sm font-medium whitespace-nowrap tracking-wide z-10">{item.label}</span>
          )}
          {isExpanded && (
            <span className="absolute right-3 px-1.5 py-0.5 text-[8px] font-mono-clock uppercase bg-bg-border text-text-muted rounded-sm z-10">
              Soon
            </span>
          )}
        </a>
      );
    }

    return (
      <NavLink
        to={item.path}
        key={item.label}
        className={`flex items-center gap-4 px-4 py-3.5 mx-2 rounded-md relative group transition-all duration-150 my-0.5 ${
          isActive 
            ? 'text-bg-void' 
            : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
        }`}
        title={!isExpanded ? item.label : undefined}
      >
        {isActive && (
          <motion.div
            layoutId="activeNavIndicator"
            className="absolute inset-0 bg-accent-primary rounded-md shadow-[var(--glow-sm)]"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        <div className="flex-shrink-0 transition-transform duration-200 group-hover:scale-105 z-10">
          {item.icon}
        </div>
        {isExpanded && (
          <span className="text-sm font-medium whitespace-nowrap tracking-wide z-10">{item.label}</span>
        )}
      </NavLink>
    );
  };

  return (
    <div className="py-4 pl-4 pr-2 bg-void z-40">
      <div 
        className={`h-full glassmorphism rounded-xl flex flex-col justify-between select-none transition-all duration-300 ease-in-out shadow-2xl overflow-hidden border border-bg-border/50 ${
          isExpanded ? 'w-[220px]' : 'w-14'
        }`}
      >
        {/* Top Section */}
        <div className="flex flex-col mt-2">
          {/* Logo element */}
          <div className="h-12 flex items-center justify-start px-4 mb-2">
            <span className="text-text-primary font-serif-header text-2xl font-bold flex items-center gap-3">
              ♟ 
              {isExpanded && (
                <span className="font-sans font-bold uppercase tracking-wider text-sm text-text-primary">
                  Checkora
                </span>
              )}
            </span>
          </div>

          {/* Core Navigation Items */}
          <nav className="flex flex-col mt-2">
            {navItems.map(renderItem)}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col mb-4">
          <div className="w-full border-t border-bg-border/50 my-2" />
          {bottomItems.map(renderItem)}

          {/* Manual Expand / Collapse Trigger */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center p-3.5 text-text-muted hover:text-text-primary transition-colors cursor-pointer w-full mt-2"
          >
            {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>
      </div>

      {/* Scaffold Modal Overlay */}
      {showScaffoldModal && (
        <div className="fixed inset-0 bg-void/85 flex items-center justify-center z-50 p-4">
          <div className="bg-bg-surface border border-bg-border p-6 rounded-md max-w-sm w-full text-center relative shadow-lg shadow-black/50 popover-reveal">
            <h3 className="font-serif-header text-lg font-bold text-text-primary mb-2">
              🏆 {showScaffoldModal} Scaffold
            </h3>
            <p className="text-xs text-text-secondary mb-5 leading-relaxed">
              We are working on bringing full offline and local database support for this mode. Stay tuned for subsequent software updates.
            </p>
            <button
              onClick={() => setShowScaffoldModal(null)}
              className="premium-btn w-full py-2 text-xs uppercase font-mono-clock"
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
