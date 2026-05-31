import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogIn, ArrowRight, Shield, Mail, Lock } from 'lucide-react';
import { useSettingsStore } from '../store/settingsStore';

type AuthMode = 'initial' | 'signin' | 'signup' | 'forgot' | 'guest' | 'name';

export const Auth: React.FC = () => {
  const { login } = useSettingsStore();
  const [mode, setMode] = useState<AuthMode>('initial');
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [mode]);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      if (mode === 'signin') {
        const storedPass = localStorage.getItem(`checkora-pass-${email}`);
        if (!storedPass) {
          setError('Account not found. Please sign up.');
          return;
        }
        if (storedPass !== password) {
          setError('Incorrect password.');
          return;
        }
        const storedName = localStorage.getItem(`checkora-name-${email}`) || email.split('@')[0];
        login(storedName, false, email);
      } else if (mode === 'signup') {
        if (localStorage.getItem(`checkora-pass-${email}`)) {
          setError('Account already exists. Please sign in.');
          return;
        }
        setMode('name');
      }
    }
  };

  const handleGuestSubmit = () => {
    setMode('name');
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || 'Guest User';
    const isGuest = mode === 'guest' || (mode === 'name' && !email);
    if (email && !isGuest) {
      localStorage.setItem(`checkora-name-${email}`, finalName);
      localStorage.setItem(`checkora-pass-${email}`, password);
    }
    login(finalName, isGuest, email);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-void text-text-primary p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-sm z-10">
        <div className="text-center mb-8">
          <span className="text-text-primary font-serif-header text-4xl font-bold tracking-widest flex items-center justify-center gap-3">
            ♟ CHECKORA
          </span>
          <p className="text-xs text-text-secondary mt-2 font-mono-clock uppercase tracking-widest">
            Offline Desktop Shell
          </p>
        </div>

        <div className="bg-bg-surface border border-bg-border rounded-sm p-6 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {mode === 'initial' && (
              <motion.div
                key="initial"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-4"
              >
                <button
                  onClick={() => setMode('signin')}
                  className="premium-btn w-full py-4 px-4 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <LogIn size={18} className="text-text-secondary group-hover:text-text-primary transition-colors" />
                    <span className="font-semibold">Sign In</span>
                  </div>
                  <ArrowRight size={16} className="text-text-muted group-hover:text-text-primary transition-colors" />
                </button>

                <button
                  onClick={() => setMode('signup')}
                  className="premium-btn w-full py-4 px-4 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <User size={18} className="text-text-secondary group-hover:text-text-primary transition-colors" />
                    <span className="font-semibold">Sign Up</span>
                  </div>
                  <ArrowRight size={16} className="text-text-muted group-hover:text-text-primary transition-colors" />
                </button>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-bg-border"></div>
                  <span className="flex-shrink-0 mx-4 text-xs text-text-muted font-mono-clock uppercase">OR</span>
                  <div className="flex-grow border-t border-bg-border"></div>
                </div>

                <button
                  onClick={handleGuestSubmit}
                  className="premium-btn w-full py-4 px-4 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <User size={18} className="text-text-secondary group-hover:text-text-primary transition-colors" />
                    <span className="font-semibold">Play as Guest</span>
                  </div>
                  <ArrowRight size={16} className="text-text-muted group-hover:text-text-primary transition-colors" />
                </button>
              </motion.div>
            )}

            {mode === 'signin' && (
              <motion.div
                key="signin"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">
                  {error && <div className="text-xs text-accent-red font-mono-clock uppercase">{error}</div>}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-text-secondary font-mono-clock uppercase">Email Address</label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-bg-void border border-bg-border text-text-primary text-sm rounded-sm py-2.5 pl-9 pr-3 focus:outline-none focus:border-text-secondary transition-colors"
                        placeholder="player@example.com"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-text-secondary font-mono-clock uppercase">Password</label>
                      <button 
                        type="button" 
                        onClick={() => setMode('forgot')}
                        className="text-[10px] text-text-muted hover:text-text-primary transition-colors"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-bg-void border border-bg-border text-text-primary text-sm rounded-sm py-2.5 pl-9 pr-3 focus:outline-none focus:border-text-secondary transition-colors"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <button type="submit" className="premium-btn-primary w-full py-3 mt-2 flex items-center justify-center gap-2">
                    Continue <ArrowRight size={16} />
                  </button>

                  <button 
                    type="button" 
                    onClick={() => setMode('initial')}
                    className="text-xs text-text-muted hover:text-text-primary transition-colors mt-2 text-center"
                  >
                    Back to options
                  </button>
                </form>
              </motion.div>
            )}

            {mode === 'signup' && (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">
                  {error && <div className="text-xs text-accent-red font-mono-clock uppercase">{error}</div>}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-text-secondary font-mono-clock uppercase">Email Address</label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-bg-void border border-bg-border text-text-primary text-sm rounded-sm py-2.5 pl-9 pr-3 focus:outline-none focus:border-text-secondary transition-colors"
                        placeholder="player@example.com"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-text-secondary font-mono-clock uppercase">Password</label>
                    <div className="relative">
                      <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-bg-void border border-bg-border text-text-primary text-sm rounded-sm py-2.5 pl-9 pr-3 focus:outline-none focus:border-text-secondary transition-colors"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <button type="submit" className="premium-btn-primary w-full py-3 mt-2 flex items-center justify-center gap-2">
                    Create Account <ArrowRight size={16} />
                  </button>

                  <button 
                    type="button" 
                    onClick={() => setMode('initial')}
                    className="text-xs text-text-muted hover:text-text-primary transition-colors mt-2 text-center"
                  >
                    Back to options
                  </button>
                </form>
              </motion.div>
            )}

            {mode === 'forgot' && (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <form onSubmit={(e) => { e.preventDefault(); setMode('signin'); }} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-text-secondary font-mono-clock uppercase">Reset Password</label>
                    <p className="text-[11px] text-text-muted mb-2">
                      Enter your email to receive reset instructions.
                    </p>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-bg-void border border-bg-border text-text-primary text-sm rounded-sm py-2.5 pl-9 pr-3 focus:outline-none focus:border-text-secondary transition-colors"
                        placeholder="player@example.com"
                      />
                    </div>
                  </div>

                  <button type="submit" className="premium-btn-primary w-full py-3 mt-2 flex items-center justify-center gap-2">
                    Send Link <ArrowRight size={16} />
                  </button>

                  <button 
                    type="button" 
                    onClick={() => setMode('signin')}
                    className="text-xs text-text-muted hover:text-text-primary transition-colors mt-2 text-center"
                  >
                    Back to sign in
                  </button>
                </form>
              </motion.div>
            )}

            {mode === 'name' && (
              <motion.div
                key="name"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <form onSubmit={handleFinalSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-text-secondary font-mono-clock uppercase">
                      {email ? "Complete Profile" : "Guest Profile"}
                    </label>
                    <p className="text-[11px] text-text-muted mb-2">
                      What should we call you?
                    </p>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-bg-void border border-bg-border text-text-primary text-sm rounded-sm py-2.5 pl-9 pr-3 focus:outline-none focus:border-text-secondary transition-colors"
                        placeholder="Grandmaster"
                        autoFocus
                      />
                    </div>
                  </div>

                  <button type="submit" className="premium-btn-primary w-full py-3 mt-2 flex items-center justify-center gap-2">
                    Enter Checkora <ArrowRight size={16} />
                  </button>

                  <button 
                    type="button" 
                    onClick={() => setMode(email ? 'signin' : 'initial')}
                    className="text-xs text-text-muted hover:text-text-primary transition-colors mt-2 text-center"
                  >
                    Back
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 text-center flex items-center justify-center gap-2 text-[10px] text-text-muted font-mono-clock uppercase">
          <Shield size={12} /> Local Offline Storage
        </div>
      </div>
    </div>
  );
};
