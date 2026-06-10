import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCampaignStore } from '../store/campaignStore';
import { useGameStore } from '../store/gameStore';
import { BOTS } from '../data/bots';
import { CAMPAIGN_ERAS } from '../data/campaign';
import { Lock, CheckCircle, ArrowLeft, Play as PlayIcon, Sparkles, X, Flame, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { BOT_HISTORICAL_STORIES } from '../data/campaignStories';

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

const ERA_COLORS = [
  {
    name: 'orange',
    base: '#ea580c',
    glow: '#dc2626',
    core: '#fde047',
    glowClass: 'era-glow-orange border-amber-500/50',
    lineFlowClass: 'fire-line-flow-0',
    lineGlowClass: 'fire-line-glow-0',
    activeCardClass: 'active-boss-card-0 border-amber-500/50 bg-amber-950/5 hover:-translate-y-1 cursor-pointer',
    activeButtonClass: 'premium-btn py-2 px-6 flex items-center gap-2 text-sm uppercase font-mono-clock bg-amber-500/10 border-amber-500 text-amber-400 hover:bg-amber-500/20 w-full active-boss-card-0',
    activeButtonTextClass: 'text-amber-400 fill-amber-400',
    badgeClass: 'bg-amber-500/20 border-amber-500/40 text-amber-400',
    nodeBorderColor: '#ea580c'
  },
  {
    name: 'cyan',
    base: '#0891b2',
    glow: '#2563eb',
    core: '#99f6e4',
    glowClass: 'era-glow-cyan border-cyan-500/50',
    lineFlowClass: 'fire-line-flow-1',
    lineGlowClass: 'fire-line-glow-1',
    activeCardClass: 'active-boss-card-1 border-cyan-500/50 bg-cyan-950/5 hover:-translate-y-1 cursor-pointer',
    activeButtonClass: 'premium-btn py-2 px-6 flex items-center gap-2 text-sm uppercase font-mono-clock bg-cyan-500/10 border-cyan-500 text-cyan-400 hover:bg-cyan-500/20 w-full active-boss-card-1',
    activeButtonTextClass: 'text-cyan-400 fill-cyan-400',
    badgeClass: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400',
    nodeBorderColor: '#06b6d4'
  },
  {
    name: 'green',
    base: '#059669',
    glow: '#16a34a',
    core: '#a7f3d0',
    glowClass: 'era-glow-green border-emerald-500/50',
    lineFlowClass: 'fire-line-flow-2',
    lineGlowClass: 'fire-line-glow-2',
    activeCardClass: 'active-boss-card-2 border-emerald-500/50 bg-emerald-950/5 hover:-translate-y-1 cursor-pointer',
    activeButtonClass: 'premium-btn py-2 px-6 flex items-center gap-2 text-sm uppercase font-mono-clock bg-emerald-500/10 border-emerald-500 text-emerald-400 hover:bg-emerald-500/20 w-full active-boss-card-2',
    activeButtonTextClass: 'text-emerald-400 fill-emerald-400',
    badgeClass: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400',
    nodeBorderColor: '#10b981'
  },
  {
    name: 'blue',
    base: '#2563eb',
    glow: '#1d4ed8',
    core: '#93c5fd',
    glowClass: 'era-glow-blue border-blue-500/50',
    lineFlowClass: 'fire-line-flow-3',
    lineGlowClass: 'fire-line-glow-3',
    activeCardClass: 'active-boss-card-3 border-blue-500/50 bg-blue-950/5 hover:-translate-y-1 cursor-pointer',
    activeButtonClass: 'premium-btn py-2 px-6 flex items-center gap-2 text-sm uppercase font-mono-clock bg-blue-500/10 border-blue-500 text-blue-400 hover:bg-blue-500/20 w-full active-boss-card-3',
    activeButtonTextClass: 'text-blue-400 fill-blue-400',
    badgeClass: 'bg-blue-500/20 border-blue-500/40 text-blue-400',
    nodeBorderColor: '#2563eb'
  },
  {
    name: 'purple',
    base: '#7c3aed',
    glow: '#db2777',
    core: '#f5d0fe',
    glowClass: 'era-glow-purple border-purple-500/50',
    lineFlowClass: 'fire-line-flow-4',
    lineGlowClass: 'fire-line-glow-4',
    activeCardClass: 'active-boss-card-4 border-purple-500/50 bg-purple-950/5 hover:-translate-y-1 cursor-pointer',
    activeButtonClass: 'premium-btn py-2 px-6 flex items-center gap-2 text-sm uppercase font-mono-clock bg-purple-500/10 border-purple-500 text-purple-400 hover:bg-purple-500/20 w-full active-boss-card-4',
    activeButtonTextClass: 'text-purple-400 fill-purple-400',
    badgeClass: 'bg-purple-500/20 border-purple-500/40 text-purple-400',
    nodeBorderColor: '#8b5cf6'
  }
];

const BOT_STORIES: { [key: string]: string } = {
  // Ancient & Medieval
  'alexander-the-great': 'King of Macedon and legendary conqueror. Undefeated in battle, he created one of the largest empires of the ancient world by the age of thirty. He breaches enemy defenses with swift, relentless aggression.',
  'chanakya': 'Ancient Indian teacher, philosopher, economist, and royal advisor. Author of the Arthashastra, he is the master of political strategy, silent maneuvers, and devious traps.',
  'chandragupta-maurya': 'Founder of the Mauryan Empire in ancient India. A fierce conqueror who unified most of India under a single administration, executing solid, powerful military formations.',
  'emperor-ashoka': 'One of India\'s greatest emperors of the Maurya dynasty. After the bloody Kalinga War, he embraced Buddhism and ruled with moral righteousness, playing a balanced and deeply defensive game.',
  'julius-caesar': 'Roman general and statesman who led the demise of the Roman Republic and the rise of the Roman Empire. A brilliant tactician who divided and conquered his enemies through rapid maneuvers.',
  'raja-raja-chola-i': 'Legendary emperor of India\'s Chola dynasty. He conquered Southern India and parts of Southeast Asia, creating a powerful maritime empire through positional mastery and structural dominance.',
  'genghis-khan': 'Founder and first Great Khan of the Mongol Empire, the largest contiguous empire in history. He dominated through terrifying mobility, chaotic flanking attacks, and tactical ruthlessness.',
  'akbar-the-great': 'The third Mughal emperor. Known for his inclusive administration, patron of the arts, and military conquests, Akbar played a classical, solid game with absolute control.',
  'chhatrapati-shivaji': 'Founder of the Maratha Empire. A pioneer of guerrilla warfare and quick maneuvers, he used speed, local geography, and tactical surprise to defeat far larger armies.',

  // Industrial & Modern History
  'napoleon-bonaparte': 'French military commander and emperor who dominated European and global affairs for over a decade. A legendary mathematical strategist who concentrated force to crush enemy lines.',
  'abraham-lincoln': 'The 16th President of the United States. He led the nation through its Civil War, preserving the Union and abolishing slavery. A patient, resilient defender of unified fronts.',
  'winston-churchill': 'Prime Minister of the United Kingdom who rallied the British people during World War II. A symbol of stubborn defiance, he weathered the blitz through ironclad defensive fortresses.',
  'queen-elizabeth-ii': 'Queen of the United Kingdom and other Commonwealth realms. The longest-reigning British monarch, she ruled with calm stability, poise, and classical positional discipline.',
  'nelson-mandela': 'Anti-apartheid revolutionary and President of South Africa. He endured 27 years of imprisonment to lead the nation into equality, playing with infinite resilience and peaceful composure.',

  // Modern Leaders
  'donald-trump': '45th President of the United States. A businessman and media personality, he plays with unpredictable aggression, bold claims, and high-impact media maneuvers.',
  'vladimir-putin': 'President of Russia. A former intelligence officer, he plays a cold, calculating, and silent positional game, waiting to exploit any weakness.',
  'narendra-modi': 'Prime Minister of India. Known for his developmental focus and strategic long-term planning, he controls the center with solid, patient expansion.',
  'rahul-gandhi': 'Prominent Indian opposition leader. Seeking dynamic structures and challenger strategies, he relies on unexpected tactical maneuvers to challenge status quo.',
  'mamta-banarjee': 'The Chief Minister of West Bengal. Known for her passionate stance, she plays with fierce independence and emotional, chaotic intensity.',
  'amit-shah': 'Home Minister of India. Renowned as a master election strategist and political planner, he develops solid, classical, and tightly coordinated structures.',

  // Tech & Innovators
  'elon-musk': 'Tech entrepreneur and founder of SpaceX and Tesla. He plays hyper-modern, chaotic chess, taking massive risks to launch rapid attacks.',
  'larry-page': 'Co-founder of Google. He views the chessboard as a search space, using logical precision to optimize the coordinates of his pieces.',

  // Chess Masters
  'gotham-chess': 'International Master Levy Rozman. The world\'s most popular chess content creator, he analyzes every blunder and cooks his opponents with sharp tactical instructions.',
  'pragg': 'Grandmaster Praggnanandhaa. The young Indian prodigy who stunned the world by defeating Magnus Carlsen. He represents the future of chess, combining youth speed with mature positional mastery.',
  'magnus': 'Magnus Carlsen. The highest-rated player in history and five-time World Champion. He converts tiny advantages into endgame victories through flawless technique.',
};

export const Campaign: React.FC = () => {
  const navigate = useNavigate();
  const { completedNodes, isNodeUnlocked, lastUnlockedNodeId, clearLastUnlocked } = useCampaignStore();
  const { startNewGame } = useGameStore();
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [activeStoryBot, setActiveStoryBot] = useState<any | null>(null);
  const [timecode, setTimecode] = useState("00:00");

  // Ticker for historical briefing video playback timecode
  useEffect(() => {
    if (!activeStoryBot) {
      setTimecode("00:00");
      return;
    }
    let seconds = 0;
    const interval = setInterval(() => {
      seconds++;
      const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
      const secs = (seconds % 60).toString().padStart(2, '0');
      setTimecode(`${mins}:${secs}`);
    }, 1000);
    return () => {
      clearInterval(interval);
      setTimecode("00:00");
    };
  }, [activeStoryBot]);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [slideProgress, setSlideProgress] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Reset slide index and progress when active bot changes
  useEffect(() => {
    setCurrentSlideIndex(0);
    setSlideProgress(0);
    setIsPlaying(true);
    setImageErrors({});
  }, [activeStoryBot]);

  const activeSlides = useMemo(() => {
    if (!activeStoryBot) return [];
    const customSlides = BOT_HISTORICAL_STORIES[activeStoryBot.id];
    if (customSlides && customSlides.length > 0) return customSlides;
    // Fallback: single slide with the bot's avatar
    return [{
      image: activeStoryBot.avatar,
      caption: activeStoryBot.bio || activeStoryBot.quote || "Challenger in the Time Travel Campaign."
    }];
  }, [activeStoryBot]);

  // Slideshow auto-advance and progress ticker
  useEffect(() => {
    if (!activeStoryBot || !isPlaying) return;

    const slidesCount = activeSlides.length;
    if (slidesCount <= 1) return;

    const intervalTime = 100; // ms
    const slideDuration = 5000; // 5 seconds per slide
    const increment = (intervalTime / slideDuration) * 100;

    const timer = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slidesCount);
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [activeStoryBot, isPlaying, activeSlides]);

  const handleNextSlide = () => {
    if (activeSlides.length <= 1) return;
    setCurrentSlideIndex((prev) => (prev + 1) % activeSlides.length);
    setSlideProgress(0);
  };

  const handlePrevSlide = () => {
    if (activeSlides.length <= 1) return;
    setCurrentSlideIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
    setSlideProgress(0);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Debug overrides for testing campaign layout states
  const [debugUnlockAll, setDebugUnlockAll] = useState(false);
  const [debugCompleteAll, setDebugCompleteAll] = useState(false);

  const unlockedBot = lastUnlockedNodeId ? BOTS.find(b => b.id === lastUnlockedNodeId) : null;

  // Track DOM references for line measurements
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const eraHeaderRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const nodeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [fireLineSegments, setFireLineSegments] = useState<{ eraIndex: number; top: number; height: number; isLast: boolean }[]>([]);

  // Render overrides for campaign states
  const completedNodesForRender = useMemo(() => {
    if (debugCompleteAll) {
      return CAMPAIGN_ERAS.flatMap(e => e.nodes).map(n => n.id);
    }
    return completedNodes;
  }, [completedNodes, debugCompleteAll]);

  const isNodeUnlockedForRender = (nodeId: string, prerequisiteId?: string | null) => {
    if (debugUnlockAll || debugCompleteAll) return true;
    return isNodeUnlocked(nodeId, prerequisiteId);
  };

  // Compute active boss node and bot object
  const activeBossNode = useMemo(() => {
    const allNodes = CAMPAIGN_ERAS.flatMap(e => e.nodes);
    for (const node of allNodes) {
      if (!completedNodesForRender.includes(node.id)) {
        return node;
      }
    }
    // Fallback if all nodes are completed (returns the very last node)
    return allNodes[allNodes.length - 1] || null;
  }, [completedNodesForRender]);

  const activeBossBot = useMemo(() => {
    if (!activeBossNode) return null;
    return BOTS.find(b => b.id === activeBossNode.id) || null;
  }, [activeBossNode]);

  const activeBossEraIndex = useMemo(() => {
    if (!activeBossNode) return 0;
    const idx = CAMPAIGN_ERAS.findIndex(era => era.nodes.some(n => n.id === activeBossNode.id));
    return idx === -1 ? 0 : idx;
  }, [activeBossNode]);

  // Recalculate fire line positions relative to the absolute map parent container
  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;

    const calculateFireLine = () => {
      const mapEl = mapRef.current;
      if (!mapEl) return;

      const targetNodeId = activeBossNode?.id;
      if (!targetNodeId) return;

      const activeBossEraIndex = CAMPAIGN_ERAS.findIndex(era => era.nodes.some(n => n.id === targetNodeId));
      if (activeBossEraIndex === -1) return;

      const mapRect = mapEl.getBoundingClientRect();
      const segments: { eraIndex: number; top: number; height: number; isLast: boolean }[] = [];

      for (let i = 0; i <= activeBossEraIndex; i++) {
        const headerEl = eraHeaderRefs.current[i];
        if (!headerEl) continue;

        const headerRect = headerEl.getBoundingClientRect();
        const top = headerRect.top - mapRect.top + (headerRect.height / 2);
        let bottom = top;
        const isLast = i === activeBossEraIndex;

        if (isLast) {
          const targetNodeEl = nodeRefs.current[targetNodeId];
          if (targetNodeEl) {
            const targetRect = targetNodeEl.getBoundingClientRect();
            bottom = targetRect.top - mapRect.top + (targetRect.height / 2);
          }
        } else {
          const nextHeaderEl = eraHeaderRefs.current[i + 1];
          if (nextHeaderEl) {
            const nextHeaderRect = nextHeaderEl.getBoundingClientRect();
            bottom = nextHeaderRect.top - mapRect.top + (nextHeaderRect.height / 2);
          }
        }

        segments.push({
          eraIndex: i,
          top,
          height: Math.max(0, bottom - top),
          isLast
        });
      }

      setFireLineSegments(segments);

      // Dynamically initialize and observe once refs are bound
      if (!resizeObserver) {
        resizeObserver = new ResizeObserver(() => {
          calculateFireLine();
        });
        resizeObserver.observe(mapEl);
        for (let i = 0; i <= activeBossEraIndex; i++) {
          const hEl = eraHeaderRefs.current[i];
          if (hEl) resizeObserver.observe(hEl);
        }
        const targetNodeEl = nodeRefs.current[targetNodeId];
        if (targetNodeEl) resizeObserver.observe(targetNodeEl);
      }
    };

    calculateFireLine();

    // Defer calculations to ensure React has completed the mount and bound refs to DOM elements
    const t1 = setTimeout(calculateFireLine, 100);
    const t2 = setTimeout(calculateFireLine, 400);
    const t3 = setTimeout(calculateFireLine, 1000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [activeBossNode]);

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
      setActiveStoryBot(unlockedBot);
    }
  };

  const handleConfirmBattle = (bot: any) => {
    startNewGame(bot, '10+0', 'white', undefined, undefined, bot.id);
    navigate('/play');
  };

  const handleStartMatch = (nodeId: string) => {
    const bot = BOTS.find(b => b.id === nodeId);
    if (bot) {
      setActiveStoryBot(bot);
    }
  };

  return (
    <div className="w-full h-full flex flex-col relative bg-base overflow-hidden">
      {/* ATMOSPHERIC BACKGROUND OF ACTIVE BOSS */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <AnimatePresence mode="wait">
          {activeBossBot && (
            <motion.div
              key={activeBossBot.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
            >
              {activeBossBot.isImageAvatar ? (
                <div 
                  className="absolute inset-0 bg-cover bg-center scale-105"
                  style={{ 
                    backgroundImage: `url(${activeBossBot.avatar})`,
                    filter: 'blur(35px) brightness(0.18) saturate(0.7)',
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-[35rem] opacity-[0.03] select-none filter blur-md">
                    {activeBossBot.avatar}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Radial vignette gradient overlay for blending into theme */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, transparent 15%, var(--bg-void) 85%), linear-gradient(to bottom, transparent 40%, var(--bg-void) 98%)',
          }}
        />
      </div>

      {/* HEADER */}
      <div className="p-6 border-b border-bg-border bg-bg-surface/80 backdrop-blur-md flex items-center justify-between shrink-0 z-10 shadow-md">
        <div>
          <h1 className="font-serif-header text-3xl font-bold tracking-tight">Time Travel Campaign</h1>
          <p className="text-text-secondary text-sm mt-1 max-w-2xl">
            Journey through history, defeating the greatest minds from Ancient times to the Modern era.
            Complete nodes to progress to the next era!
          </p>
        </div>
        

      </div>

      {/* MAP AREA */}
      <div className="flex-1 overflow-y-auto p-8 relative pb-24 z-10" ref={containerRef}>
        <div className="max-w-4xl mx-auto flex flex-col gap-12 relative" ref={mapRef}>
          
          {/* Connection Line Behind Nodes */}
          <div className="absolute left-1/2 top-10 bottom-10 w-1 bg-bg-border -translate-x-1/2 z-0 hidden md:block"></div>

          {/* SVG Distortion Filter for the Burning Fire Column */}
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
              <filter id="fire-filter">
                <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="3" result="turbulence">
                  <animate attributeName="baseFrequency" dur="5s" values="0.04 0.08;0.04 0.12;0.04 0.08" repeatCount="indefinite" />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="10" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>

          {/* Glowing Burning Fire Connection Line Column */}
          {fireLineSegments.map((segment) => {
            const colors = ERA_COLORS[segment.eraIndex] || ERA_COLORS[0];
            return (
              <div 
                key={segment.eraIndex}
                className={`absolute left-1/2 -translate-x-1/2 z-[1] hidden md:block ${colors.lineGlowClass}`}
                style={{
                  top: `${segment.top}px`,
                  height: `${segment.height}px`,
                  width: '6px',
                  filter: 'url(#fire-filter)'
                }}
              >
                {/* Outer era-specific blur base */}
                <div 
                  className="absolute inset-0 rounded-full opacity-80 blur-[1px]" 
                  style={{ 
                    backgroundColor: colors.glow,
                    boxShadow: `0 0 10px ${colors.base}, 0 0 16px ${colors.glow}` 
                  }} 
                />
                
                {/* Flowing flame texture */}
                <div className={`absolute inset-x-[0.5px] inset-y-0 rounded-full ${colors.lineFlowClass}`} />
                
                {/* Inner hot core */}
                <div 
                  className="absolute inset-x-[1.2px] inset-y-0 rounded-full opacity-90" 
                  style={{ backgroundColor: colors.core }}
                />
                
                {/* White hot center line */}
                <div className="absolute inset-x-[1.8px] inset-y-0 bg-white rounded-full opacity-95" />

                {/* Fireball Spark at the leading edge (only for the active boss tip) */}
                {segment.isLast && (
                  <div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10 fireball-spark"
                    style={{
                      backgroundColor: colors.core,
                      boxShadow: `0 0 12px ${colors.base}, 0 0 24px ${colors.glow}`
                    }}
                  />
                )}
              </div>
            );
          })}



          {CAMPAIGN_ERAS.map((era, eraIndex) => {
            const isEraUnlocked = era.nodes.some(n => isNodeUnlockedForRender(n.id, n.prerequisite));
            const colors = ERA_COLORS[eraIndex] || ERA_COLORS[0];

            return (
              <div key={eraIndex} className={`relative z-10 transition-opacity duration-500 ${isEraUnlocked ? 'opacity-100' : 'opacity-40'}`}>
                <div 
                  ref={el => { eraHeaderRefs.current[eraIndex] = el; }}
                  className={`text-center mb-8 bg-bg-surface/80 glassmorphism p-4 rounded border w-fit mx-auto shadow-lg transition-all duration-300 ${
                    isEraUnlocked ? colors.glowClass : 'border-bg-border'
                  }`}
                >
                  <h2 className="font-serif-header text-2xl font-bold text-accent-primary">{era.name}</h2>
                  <p className="text-xs font-mono-clock text-text-secondary mt-1 uppercase tracking-wider">{era.description}</p>
                </div>

                <div className="flex flex-col gap-6 items-center">
                  {era.nodes.map((node, nodeIndex) => {
                    const bot = BOTS.find(b => b.id === node.id);
                    if (!bot) return null;

                    const unlocked = isNodeUnlockedForRender(node.id, node.prerequisite);
                    const completed = completedNodesForRender.includes(node.id);
                    const isFreshlyUnlocked = unlocked && !completed && lastUnlockedNodeId === node.id;
                    const isCurrentBoss = activeBossBot?.id === node.id;
                    const eraColors = ERA_COLORS[eraIndex] || ERA_COLORS[0];

                    return (
                      <motion.div 
                        key={node.id}
                        ref={el => { nodeRefs.current[node.id] = el; }}
                        className={`flex flex-col md:flex-row items-center gap-6 w-full max-w-2xl bg-bg-surface border p-4 rounded shadow-xl transition-all duration-300 ${
                          completed ? 'border-accent-primary bg-accent-primary/5' : 
                          isCurrentBoss ? eraColors.activeCardClass :
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
                          if (unlocked) handleStartMatch(node.id);
                        }}
                      >
                        <div 
                          className="flex-shrink-0 w-20 h-20 bg-bg-elevated rounded-full border-4 flex items-center justify-center overflow-hidden z-10 relative" 
                          style={{ borderColor: (unlocked || completed) ? eraColors.nodeBorderColor : '#3f3f46' }}
                        >
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
                            {isCurrentBoss && (
                              <span className={`text-[9px] font-mono-clock border px-1.5 py-0.5 rounded uppercase font-bold tracking-wider flex items-center gap-0.5 ${eraColors.badgeClass}`}>
                                <Flame size={10} className="fill-current" /> Active Boss
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-text-secondary italic line-clamp-2">{bot.quote}</p>
                        </div>

                        <div className="flex-shrink-0 flex items-center justify-center min-w-[120px]">
                          {completed ? (
                            <div className="flex flex-col items-center gap-1.5 w-full">
                              <div className="flex items-center gap-1 text-accent-green">
                                <CheckCircle size={18} />
                                <span className="text-xs font-mono-clock uppercase tracking-wider">Defeated</span>
                              </div>
                              <button 
                                className="premium-btn py-1.5 px-4 text-xs uppercase font-mono-clock bg-bg-surface/50 border-bg-border hover:border-accent-cyan text-text-secondary hover:text-text-primary w-full"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStartMatch(node.id);
                                }}
                              >
                                Rematch
                              </button>
                            </div>
                          ) : isCurrentBoss ? (
                            <button 
                              className={eraColors.activeButtonClass}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStartMatch(node.id);
                              }}
                            >
                              <Flame size={16} className={`${eraColors.activeButtonTextClass} animate-pulse`} /> Battle
                            </button>
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

      {/* CINEMATIC STORY INTRODUCTION OVERLAY */}
      <AnimatePresence>
        {activeStoryBot && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-bg-void/98 overflow-hidden select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Blurry, Atmospheric Background Backdrop */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden opacity-25">
              {activeStoryBot.isImageAvatar ? (
                <div 
                  className="absolute inset-0 bg-cover bg-center scale-110 filter blur-[45px] brightness-[0.25]"
                  style={{ backgroundImage: `url(${activeStoryBot.avatar})` }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-[45rem] filter blur-xl select-none text-text-primary">
                  {activeStoryBot.avatar}
                </div>
              )}
            </div>

            {/* Subtle floating particles background */}
            <div 
              className="absolute inset-0 z-[1] opacity-[0.05]"
              style={{
                background: 'radial-gradient(circle at center, transparent 30%, var(--bg-void) 90%)',
              }}
            />

            {/* Inner Content Dashboard */}
            <div className="relative z-10 max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 px-6 items-center">
              
              {/* LEFT COLUMN: simulated video player and stats */}
              <div className="md:col-span-5 flex flex-col gap-6 w-full">
                
                {/* Widescreen Boss Image */}
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-bg-border shadow-2xl bg-black">
                  {activeSlides[0] && (
                    <>
                      {/* Blurred background for letterboxing */}
                      <img 
                        src={activeSlides[0].image} 
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 select-none pointer-events-none scale-105"
                        onError={(e) => {
                          e.currentTarget.src = activeStoryBot.avatar;
                        }}
                      />
                      {/* Sharp contained main image */}
                      <img 
                        src={activeSlides[0].image} 
                        alt={activeStoryBot.name} 
                        className="relative z-10 w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = activeStoryBot.avatar;
                        }}
                      />
                    </>
                  )}
                  {/* Subtle vignette shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-20" />
                </div>

                {/* Dossier Credentials */}
                <div className="bg-bg-surface/40 border border-bg-border/60 rounded-lg p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400 font-mono-clock">CLASSIFICATION:</span>
                    <span className="text-white font-mono-clock font-bold tracking-wider">{activeStoryBot.title || 'CHALLENGER'}</span>
                  </div>
                  <div className="h-[1px] bg-bg-border" />
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400 font-mono-clock">SYSTEM ELO:</span>
                    <span className="text-white font-mono-clock font-bold">{activeStoryBot.elo} ELO</span>
                  </div>
                  <div className="h-[1px] bg-bg-border" />
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400 font-mono-clock">STYLE SIGNATURE:</span>
                    <span className="text-white font-mono-clock font-bold">{activeStoryBot.style ? activeStoryBot.style.join(', ') : 'Versatile'}</span>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: name, description, quote and controls */}
              <div className="md:col-span-7 flex flex-col gap-6 text-left">
                
                {/* Era tag */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono-clock uppercase tracking-[0.3em] text-zinc-400 font-bold">
                    Chronicles Dossier
                  </span>
                  <div className="h-[1px] flex-1 bg-bg-border" />
                </div>

                {/* Name */}
                <div>
                  <h2 className="font-serif-header text-4xl md:text-5xl font-bold tracking-tight text-white">
                    {activeStoryBot.name}
                  </h2>
                </div>

                {/* Briefing Story Text */}
                <div className="bg-bg-elevated/30 border border-bg-border/80 backdrop-blur-md rounded-lg p-5 shadow-lg relative">
                  <div className="absolute top-0 left-6 -translate-y-1/2 bg-bg-surface border border-bg-border px-2.5 py-0.5 rounded text-[9px] font-mono-clock uppercase tracking-wider text-accent-cyan font-bold shadow-sm">
                    Briefing Story
                  </div>

                  <p className="text-sm md:text-base leading-relaxed font-sans mt-2" style={{ color: '#e5e7eb' }}>
                    {BOT_STORIES[activeStoryBot.id] || activeStoryBot.bio}
                  </p>

                  {activeStoryBot.quote && (
                    <div 
                      className="border-l-2 pl-3 mt-4 italic text-xs md:text-sm text-text-secondary"
                      style={{ borderColor: activeStoryBot.accentColor || '#22d3ee' }}
                    >
                      "{activeStoryBot.quote}"
                    </div>
                  )}
                </div>

                {/* Opening & Weakness Cards */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="bg-bg-elevated/20 border border-bg-border/30 rounded p-3">
                    <span className="text-[9px] uppercase font-mono-clock text-zinc-400 tracking-wider block mb-0.5">Favored Opening</span>
                    <span className="font-semibold text-white font-mono-clock">{activeStoryBot.favoriteOpening || 'Standard Open'}</span>
                  </div>
                  <div className="bg-bg-elevated/20 border border-bg-border/30 rounded p-3">
                    <span className="text-[9px] uppercase font-mono-clock text-zinc-400 tracking-wider block mb-0.5">Weakness</span>
                    <span className="font-semibold text-white font-mono-clock">{activeStoryBot.weaknesses || 'Adaptive'}</span>
                  </div>
                </div>

                {/* Control Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full mt-4">
                  <button
                    onClick={() => setActiveStoryBot(null)}
                    className="flex-1 py-3 px-6 bg-bg-void/40 border border-bg-border text-zinc-300 text-xs uppercase font-mono-clock rounded hover:bg-bg-elevated hover:text-white transition-all cursor-pointer text-center"
                  >
                    Return to Map
                  </button>
                  <button
                    onClick={() => {
                      const botToRun = activeStoryBot;
                      setActiveStoryBot(null);
                      handleConfirmBattle(botToRun);
                    }}
                    className="flex-1 py-3 px-6 text-xs uppercase font-mono-clock rounded transition-all cursor-pointer font-bold text-center flex items-center justify-center gap-1.5 shadow-lg"
                    style={{
                      backgroundColor: `${activeStoryBot.accentColor}15` || 'rgba(34, 211, 238, 0.15)',
                      border: `1.5px solid ${activeStoryBot.accentColor}` || '1.5px solid #22d3ee',
                      color: activeStoryBot.accentColor || '#22d3ee'
                    }}
                  >
                    <PlayIcon size={14} className="fill-current" /> Enter Battlefield
                  </button>
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

