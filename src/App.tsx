import React, { useEffect, Component, ReactNode } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSettingsStore } from './store/settingsStore';
import { useGameStore } from './store/gameStore';
import { TitleBar } from './components/TitleBar';
import { NavigationRail } from './components/NavigationRail';
import { StatusBar } from './components/StatusBar';
import { AnimatePresence, motion } from 'framer-motion';

// Page Imports
import { Auth } from './pages/Auth';
import { Home } from './pages/Home';
import { Play } from './pages/Play';
import { Puzzles } from './pages/Puzzles';
import { Learn } from './pages/Learn';
import { Train } from './pages/Train';
import { Analysis } from './pages/Analysis';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { Campaign } from './pages/Campaign';

const pageVariants = {
  initial: { opacity: 0, y: 10, scale: 0.99 },
  in: { opacity: 1, y: 0, scale: 1 },
  out: { opacity: 0, y: -10, scale: 0.99 },
};

const pageTransition = {
  type: 'tween',
  ease: [0.16, 1, 0.3, 1],
  duration: 0.3,
};

// ── Error Boundary ─────────────────────────────────────────────
interface ErrorBoundaryState { hasError: boolean; message: string }

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[Checkora ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-void text-text-primary p-8 text-center">
          <span className="text-4xl mb-4">♟</span>
          <h1 className="font-serif-header text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-xs text-text-secondary font-mono-clock mb-6 max-w-sm">{this.state.message}</p>
          <button
            onClick={() => { this.setState({ hasError: false, message: '' }); window.location.reload(); }}
            className="premium-btn text-xs uppercase font-mono-clock py-2 px-6"
          >
            Reload App
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="absolute inset-0">
            <Home />
          </motion.div>
        } />
        <Route path="/play" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="absolute inset-0">
            <Play />
          </motion.div>
        } />
        <Route path="/campaign" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="absolute inset-0">
            <Campaign />
          </motion.div>
        } />
        <Route path="/puzzles" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="absolute inset-0">
            <Puzzles />
          </motion.div>
        } />
        <Route path="/learn" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="absolute inset-0">
            <Learn />
          </motion.div>
        } />
        <Route path="/train" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="absolute inset-0">
            <Train />
          </motion.div>
        } />
        <Route path="/analysis" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="absolute inset-0">
            <Analysis />
          </motion.div>
        } />
        <Route path="/profile" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="absolute inset-0">
            <Profile />
          </motion.div>
        } />
        <Route path="/settings" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="absolute inset-0">
            <Settings />
          </motion.div>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  const initSettings = useSettingsStore(state => state.initSettings);
  const initGameStore = useGameStore(state => state.initGameStore);
  const isLoggedIn = useSettingsStore(state => state.isLoggedIn);

  useEffect(() => {
    initSettings();
    initGameStore();
  }, [initSettings, initGameStore]);

  if (!isLoggedIn) {
    return (
      <ErrorBoundary>
        <div className="w-screen h-screen flex flex-col overflow-hidden">
          <TitleBar />
          <div className="flex-1 overflow-hidden relative">
            <Auth />
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <HashRouter>
        <div className="w-screen h-screen flex flex-col bg-void text-text-primary overflow-hidden">
          <TitleBar />
          <div className="flex-1 flex overflow-hidden">
            <NavigationRail />
            <main className="flex-1 h-full bg-base overflow-hidden flex flex-col relative">
              <AnimatedRoutes />
            </main>
          </div>
          <StatusBar />
        </div>
      </HashRouter>
    </ErrorBoundary>
  );
};

export default App;
