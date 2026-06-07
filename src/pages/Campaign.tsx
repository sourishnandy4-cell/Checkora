import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaignStore } from '../store/campaignStore';
import { useGameStore } from '../store/gameStore';
import { BOTS } from '../data/bots';
import { Lock, Unlock, CheckCircle, ArrowLeft, Play as PlayIcon } from 'lucide-react';

const CAMPAIGN_ERAS = [
  {
    name: 'Ancient & Medieval',
    description: 'Face the greatest conquerors of the old world.',
    nodes: [
      { id: 'alexander-the-great', prerequisite: null },
      { id: 'chanakya', prerequisite: 'alexander-the-great' },
      { id: 'chandragupta-maurya', prerequisite: 'chanakya' },
      { id: 'emperor-ashoka', prerequisite: 'chandragupta-maurya' },
      { id: 'julius-caesar', prerequisite: 'emperor-ashoka' },
      { id: 'raja-raja-chola-i', prerequisite: 'julius-caesar' },
      { id: 'genghis-khan', prerequisite: 'raja-raja-chola-i' },
      { id: 'akbar-the-great', prerequisite: 'genghis-khan' },
      { id: 'chhatrapati-shivaji', prerequisite: 'akbar-the-great' },
    ]
  },
  {
    name: 'Industrial & Modern History',
    description: 'Challenge the visionaries of the 19th and 20th centuries.',
    nodes: [
      { id: 'napoleon-bonaparte', prerequisite: 'chhatrapati-shivaji' },
      { id: 'abraham-lincoln', prerequisite: 'napoleon-bonaparte' },
      { id: 'winston-churchill', prerequisite: 'abraham-lincoln' },
      { id: 'queen-elizabeth-ii', prerequisite: 'winston-churchill' },
      { id: 'nelson-mandela', prerequisite: 'queen-elizabeth-ii' },
    ]
  },
  {
    name: 'Modern Leaders',
    description: 'Match wits with the politicians of the 21st century.',
    nodes: [
      { id: 'donald-trump', prerequisite: 'nelson-mandela' },
      { id: 'vladimir-putin', prerequisite: 'donald-trump' },
      { id: 'narendra-modi', prerequisite: 'vladimir-putin' },
    ]
  },
  {
    name: 'Tech & Masters',
    description: 'The final frontier. Innovators and Grandmasters.',
    nodes: [
      { id: 'elon-musk', prerequisite: 'narendra-modi' },
      { id: 'gotham-chess', prerequisite: 'elon-musk' },
      { id: 'pragg', prerequisite: 'gotham-chess' },
      { id: 'magnus', prerequisite: 'pragg' },
    ]
  }
];

export const Campaign: React.FC = () => {
  const navigate = useNavigate();
  const { completedNodes, isNodeUnlocked } = useCampaignStore();
  const { startNewGame } = useGameStore();

  const handleStartMatch = (nodeId: string) => {
    const bot = BOTS.find(b => b.id === nodeId);
    if (bot) {
      // 10+0 Rapid for campaign matches, player is always white
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

                    return (
                      <div 
                        key={node.id}
                        className={`flex flex-col md:flex-row items-center gap-6 w-full max-w-2xl bg-bg-surface border p-4 rounded shadow-xl transition-all duration-300 ${
                          completed ? 'border-accent-primary bg-accent-primary/5' : 
                          unlocked ? 'border-bg-border hover:border-accent-cyan cursor-pointer hover:-translate-y-1' : 
                          'border-bg-border/50 grayscale cursor-not-allowed'
                        }`}
                        onClick={() => {
                          if (unlocked && !completed) handleStartMatch(node.id);
                        }}
                      >
                        <div className="flex-shrink-0 w-20 h-20 bg-bg-elevated rounded-full border-4 flex items-center justify-center overflow-hidden z-10" style={{ borderColor: completed ? '#10B981' : unlocked ? '#3B82F6' : '#3f3f46' }}>
                          {bot.isImageAvatar ? (
                            <img src={bot.avatar} alt={bot.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-4xl">{bot.avatar}</span>
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
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};
