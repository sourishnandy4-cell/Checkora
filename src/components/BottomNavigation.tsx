import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Play, Map, Puzzle, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

export const BottomNavigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Home', path: '/' },
    { icon: <Play size={20} />, label: 'Play', path: '/play' },
    { icon: <Map size={20} />, label: 'Story', path: '/campaign' },
    { icon: <Puzzle size={20} />, label: 'Puzzles', path: '/puzzles' },
    { icon: <Menu size={20} />, label: 'Menu', path: '/settings' },
  ];

  return (
    <div className="w-full bg-bg-surface border-t border-bg-border/50 pb-safe pt-2 px-2 flex justify-between items-center z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <NavLink
            key={item.label}
            to={item.path}
            className={`flex flex-col items-center justify-center w-full py-2 relative transition-colors duration-200 ${
              isActive ? 'text-accent-primary' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeBottomNav"
                className="absolute -top-2 w-8 h-1 bg-accent-primary rounded-b-full shadow-[0_2px_10px_rgba(59,130,246,0.5)]"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <div className="mb-1 transition-transform duration-200 group-hover:scale-110">
              {item.icon}
            </div>
            <span className="text-[10px] font-mono-clock uppercase tracking-wider">
              {item.label}
            </span>
          </NavLink>
        );
      })}
    </div>
  );
};
