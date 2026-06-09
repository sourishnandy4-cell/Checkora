import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCampaignStore } from '../store/campaignStore';
import { useGameStore } from '../store/gameStore';
import { BOTS } from '../data/bots';
import { CAMPAIGN_ERAS } from '../data/campaign';
import { Lock, CheckCircle, ArrowLeft, Play as PlayIcon, Sparkles, X } from 'lucide-react';

const SparkleParticle: React.FC<{ delay: number; index: number }> = ({ delay, index }) => {
  const angle = (index / 8) * 360;
  const radius = 80;
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-accent-cyan"
      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1.5, 1, 0],
        x: [0, x * 0.5, x, x],
        y: [0, y * 0.5, y, y],
      }}
      transition={{
        duration: 1.5,
        delay: delay,
        repeat: Infinity,
        repeatDelay: 1,
        ease: 'easeOut',
      }}
      style={{
        left: '50%',
        top: '50%',
        marginLeft: '-4px',
        marginTop: '-4px',
      }}
    />
  );
};

export const Campaign: React.FC = () => {
  const navigate = useNavigate();
  const { completedNodes, isNodeUnlocked, lastUnlockedNodeId, clearLastUnlocked } = useCampaignStore();
  const { startNewGame } = useGameStore();
  const [showUnlockModal, setShowUnlockModal] = useState(false);

  const unlockedBot = lastUnlockedNodeId ? BOTS.find(b => b.id === lastUnlockedNodeId) : null;

  useEffect(() => {
    if (lastUnlockedNodeId && unlockedBot) {
      const timer = setTimeout(() => {
        setShowUnlockModal(true);
      }, 300);
      return () => clearTimeout(timer);
    }
    return;
  }, [lastUnlockedNodeId, unlockedBot]);

  const handleCloseModal = () => {
    setShowUnlockModal(false);
    clearLastUnlocked();
  };

  const handleChallengeFromModal = () => {
    if (lastUnlockedNodeId && unlockedBot) {
      setShowUnlockModal(false);
      clearLastUnlocked();
      startNewGame(unlockedBot, '10+0', 'white', undefined, undefined, lastUnlockedNodeId);
      navigate('/play');
    }
  };

  const handleStartMatch = (nodeId: string) => {
    const bot = BOTS.find(b => b.id === nodeId);
    if (bot) {
      startNewGame(bot, '10+0', 'white', undefined, undefined, nodeId);
      navigate('/play');
    }
  };

  return (
    <div className="w-full h-full flex flex-col relative bg-base overflow-hidden">
      {/* HEADER */}
      <div className="p-6 border-b border-bg-border bg-bg-surface flex items-center justify-between shrink-0 z-10 shadow-md">
        <div>
          <h1 className="font-serif-header text-3xl font-bold tracking-tight">Time Travel Campaign</h1>
          <p className="text-text-secondary text-sm mt-1 max-w-2xl">
            Journey through history, defeating the greatest minds from Ancient times to the Modern era.
            Complete nodes to progress to the next era!
          </p>
        </div>
      </div>

      {/* MAP AREA */}
      <div className="flex-1 overflow-y-auto p-8 relative pb-24">
        <div className="max-w-4xl mx-auto flex flex-col gap-12 relative">
          
          {/* Connection Line Behind Nodes */}
          <div className="absolute left-1/2 top-10 bottom-10 w-1 bg-bg-border -translate-x-1/2 z-0 hidden md:block"></div>

          {CAMPAIGN_ERAS.map((era, eraIndex) => {
            const isEraUnlocked = era.nodes.some(n => isNodeUnlocked(n.id, n.prerequisite));

            return (
              <div key={eraIndex} className={`relative z-10 transition-opacity duration-500 ${isEraUnlocked ? 'opacity-100' : 'opacity-40'}`}>
                <div className="text-center mb-8 bg-bg-surface/80 glassmorphism p-4 rounded border border-bg-border w-fit mx-auto shadow-lg">
                  <h2 className="font-serif-header text-2xl font-bold text-accent-primary">{era.name}</h2>
                  <p className="text-xs font-mono-clock text-text-secondary mt-1 uppercase tracking-wider">{era.description}</p>
                </div>

                <div className="flex flex-col gap-6 items-center">
                  {era.nodes.map((node, nodeIndex) => {
                    const bot = BOTS.find(b => b.id === node.id);
                    if (!bot) return null;

                    const unlocked = isNodeUnlocked(node.id, node.prerequisite);
                    const completed = completedNodes.includes(node.id);
                    const isFreshlyUnlocked = unlocked && !completed && lastUnlockedNodeId === node.id;

                    return (
                      <motion.div 
                        key={node.id}
                        className={`flex flex-col md:flex-row items-center gap-6 w-full max-w-2xl bg-bg-surface border p-4 rounded shadow-xl transition-all duration-300 ${
                          completed ? 'border-accent-primary bg-accent-primary/5' : 
                          unlocked ? 'border-bg-border hover:border-accent-cyan cursor-pointer hover:-translate-y-1' : 
                          'border-bg-border/50 grayscale cursor-not-allowed'
                        }`}
                        animate={isFreshlyUnlocked ? {
                          boxShadow: [
                            '0 0 0px rgba(59, 130, 246, 0)',
                            '0 0 20px rgba(59, 130, 246, 0.4)',
                            '0 0 0px rgba(59, 130, 246, 0)',
                          ],
                        } : {}}
                        transition={isFreshlyUnlocked ? {
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        } : {}}
                        onClick={() => {
                          if (unlocked && !completed) handleStartMatch(node.id);
                        }}
                      >
                        <div className="flex-shrink-0 w-20 h-20 bg-bg-elevated rounded-full border-4 flex items-center justify-center overflow-hidden z-10 relative" style={{ borderColor: completed ? '#10B981' : unlocked ? '#3B82F6' : '#3f3f46' }}>
                          {bot.isImageAvatar ? (
                            <img src={bot.avatar} alt={bot.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-4xl">{bot.avatar}</span>
                          )}
                          {isFreshlyUnlocked && (
                            <motion.div
                              className="absolute inset-0 rounded-full border-2 border-accent-cyan"
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.8, 0.3, 0.8],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                            />
                          )}
                        </div>

                        <div className="flex-1 text-center md:text-left">
                          <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                            <h3 className="text-xl font-bold">{bot.name}</h3>
                            <span className="text-xs font-mono-clock bg-bg-void px-2 py-0.5 rounded text-text-secondary border border-bg-border">ELO {bot.elo}</span>
                          </div>
                          <p className="text-sm text-text-secondary italic line-clamp-2">{bot.quote}</p>
                        </div>

                        <div className="flex-shrink-0 flex items-center justify-center min-w-[120px]">
                          {completed ? (
                            <div className="flex flex-col items-center text-accent-green">
                              <CheckCircle size={32} />
                              <span className="text-xs font-mono-clock mt-2 uppercase tracking-widest">Defeated</span>
                            </div>
                          ) : unlocked ? (
                            <button 
                              className="premium-btn py-2 px-6 flex items-center gap-2 text-sm uppercase font-mono-clock bg-accent-cyan/10 border-accent-cyan text-accent-cyan hover:bg-accent-cyan/20 w-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStartMatch(node.id);
                              }}
                            >
                              <PlayIcon size={16} /> Challenge
                            </button>
                          ) : (
                            <div className="flex flex-col items-center text-text-muted">
                              <Lock size={24} />
                              <span className="text-[10px] font-mono-clock mt-2 uppercase tracking-widest text-center">Beat previous to unlock</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* UNLOCK CELEBRATION MODAL */}
      <AnimatePresence>
        {showUnlockModal && unlockedBot && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-void/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
            />

            {/* Modal Content */}
            <motion.div
              className="relative bg-bg-surface border border-bg-border rounded-lg p-8 max-w-md w-full shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-accent-cyan/10 via-transparent to-accent-primary/10 pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors z-10"
              >
                <X size={20} />
              </button>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Title */}
                <motion.div
                  className="flex items-center gap-2 mb-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Sparkles size={18} className="text-accent-cyan" />
                  <span className="text-xs font-mono-clock uppercase tracking-[0.3em] text-accent-cyan font-bold">
                    New Challenger Unlocked
                  </span>
                  <Sparkles size={18} className="text-accent-cyan" />
                </motion.div>

                {/* Avatar with Sparkles */}
                <div className="relative my-6">
                  {/* Sparkle Particles */}
                  <div className="absolute inset-0">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <SparkleParticle key={i} delay={i * 0.15} index={i} />
                    ))}
                  </div>

                  {/* Glow Ring */}
                  <motion.div
                    className="absolute -inset-3 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-primary))`,
                    }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  {/* Avatar */}
                  <motion.div
                    className="relative w-28 h-28 bg-bg-elevated rounded-full border-4 border-accent-cyan flex items-center justify-center overflow-hidden shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
                  >
                    {unlockedBot.isImageAvatar ? (
                      <img src={unlockedBot.avatar} alt={unlockedBot.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-6xl">{unlockedBot.avatar}</span>
                    )}
                  </motion.div>
                </div>

                {/* Bot Info */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="font-serif-header text-3xl font-bold mb-1">{unlockedBot.name}</h2>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-xs font-mono-clock bg-bg-void px-3 py-1 rounded text-text-secondary border border-bg-border">
                      ELO {unlockedBot.elo}
                    </span>
                    <span className="text-xs font-mono-clock bg-accent-primary/20 px-3 py-1 rounded text-accent-primary border border-accent-primary/30">
                      {unlockedBot.tier}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary italic mb-6 px-4">"{unlockedBot.quote}"</p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  className="flex gap-3 w-full"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 py-3 px-4 bg-bg-void border border-bg-border text-text-secondary text-xs uppercase font-mono-clock rounded hover:bg-bg-elevated hover:text-text-primary transition-all"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleChallengeFromModal}
                    className="flex-1 py-3 px-4 bg-accent-cyan/20 border border-accent-cyan text-accent-cyan text-xs uppercase font-mono-clock rounded hover:bg-accent-cyan/30 transition-all flex items-center justify-center gap-2 font-bold"
                  >
                    <PlayIcon size={16} /> Challenge Now
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
