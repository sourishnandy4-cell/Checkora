import fs from 'fs';

const filePath = 'c:/Projects/Checkora/src/data/bots.ts';
let lines = fs.readFileSync(filePath, 'utf-8').split('\n');

const startIndex = lines.findIndex(l => l.includes("id: 'phantom',"));
const endIndex = lines.findIndex((l, i) => i > startIndex && l.includes("// ── CELEBRITY BOTS"));

if (startIndex !== -1 && endIndex !== -1) {
  const replacement = `    id: 'phantom',
    name: 'Phantom',
    avatar: '👻',
    elo: 2100,
    skillLevel: 16,
    uciElo: 2100,
    tier: 'Expert',
    style: ['Tricky', 'Aggressive', 'Tactical'],
    bio: 'Phantom appears to be losing, then wins. Its pieces seem to teleport. You never see it coming.',
    quote: 'The best move is always the one you didn\\'t consider.',
    favoriteOpening: "Alekhine's Defense, Pirc",
    weaknesses: 'Precise, patient defense',
    recommendedTime: '5+0',
    accentColor: '#FCA5A5',
    chatPools: {
      win: ['Boo! Checkmate from the shadows!', 'I was never in danger.'],
      lose: ['The phantom has been banished.', 'A brilliant defensive block. You saw the ghost.'],
      capture: ['Disappearing your active knight.', 'Striking from the void.'],
      blunder: ['Ah, my illusions failed me.', 'I materialized in a bad square.']
    }
  },

  // ── MASTER TIER (ELO 2200–2700) ──────────────────────────────────────
  {
    id: 'archon',
    name: 'Archon',
    avatar: '👑',
    elo: 2300,
    skillLevel: 17,
    uciElo: 2300,
    tier: 'Master',
    style: ['Classical', 'Positional', 'Solid'],
    bio: 'Archon plays chess the way Capablanca did — effortless, inevitable, perfect.',
    quote: 'There are no difficult positions. Only positions you haven\\'t understood yet.',
    favoriteOpening: "Queen's Gambit, English Opening",
    weaknesses: 'Extreme tactical sharpness',
    recommendedTime: '10+5',
    accentColor: '#C4B5FD',
    chatPools: {
      win: ['The natural conclusion of the position.', 'Inherent positional harmony.'],
      lose: ['Superb tactical calculation on your part.', 'An exceptionally deep combination defeated me.'],
      capture: ['Maintaining strategic supremacy.', 'Simplifying to a won endgame.'],
      blunder: ['A highly uncharacteristic lapse.', 'An overlook. I apologize for the drop in quality.']
    }
  },
  {
    id: 'vortex',
    name: 'Vortex',
    avatar: '🌀',
    elo: 2500,
    skillLevel: 18,
    uciElo: 2500,
    tier: 'Master',
    style: ['Aggressive', 'Tactical', 'Chaotic'],
    bio: 'Vortex plays like Tal — sacrificing wildly, creating unsolvable complications, pulling you into the chaos.',
    quote: 'Enter the vortex. There is no escaping it.',
    favoriteOpening: "King's Indian, Sicilian Dragon",
    weaknesses: 'Perfect engine refutation',
    recommendedTime: '3+0',
    accentColor: '#C4B5FD',
    chatPools: {
      win: ['You drowned in the storm! Checkmate!', 'A beautiful tactical cyclone!'],
      lose: ['You defended with cold, machine-like accuracy.', 'The cyclone has dissipated.'],
      capture: ['Tearing your fortress apart!', 'Sacrificing for dynamic storm!'],
      blunder: ['My storm blew me off course!', 'A catastrophic calculation error.']
    }
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    avatar: '🌌',
    elo: 2650,
    skillLevel: 19,
    uciElo: 2650,
    tier: 'Master',
    style: ['Aggressive', 'Positional', 'Solid'],
    bio: 'I am Antigravity. Play a game against me, and I will analyze your moves, estimate your ELO, determine your playstyle, and generate a customized chess bot representing YOU in the Casual tier!',
    quote: 'Show me what you are made of.',
    favoriteOpening: 'Any',
    weaknesses: 'None',
    recommendedTime: '10+0',
    accentColor: '#38BDF8',
    chatPools: {
      win: ['Evaluation complete. Generating your profile...', 'You played well! Let me analyze your moves.'],
      lose: ['Incredible performance. Generating your Master profile...', 'You defeated me! Let me process your data.'],
      capture: ['Interesting choice.', 'Data point recorded.'],
      blunder: ['A slight inaccuracy. Noted.', 'I see. Re-evaluating your style.']
    }
  },

  // ── LEGEND TIER (ELO 2700–3200) ──────────────────────────────────────
  {
    id: 'sovereign',
    name: 'Sovereign',
    avatar: '⚡👑',
    elo: 2850,
    skillLevel: 20,
    uciElo: 3200,
    tier: 'Legend',
    style: ['Classical', 'Positional', 'Tactical', 'Aggressive', 'Solid'],
    bio: 'Sovereign is the full strength Stockfish 16. It plays perfectly in every phase of the game. Good luck.',
    quote: 'There are no second chances against a perfect player.',
    favoriteOpening: 'All openings equally',
    weaknesses: 'None',
    recommendedTime: '1+0',
    accentColor: '#FBBF24',
    chatPools: {
      win: ['Game terminated. Victory is absolute.', 'Stockfish algorithm confirms mate.'],
      lose: ['Error. Defeat detected. Excellent execution, human.', 'Congratulations. You have defeated the Legend.'],
      capture: ['Securing material advantage.', 'Positional superiority verified.'],
      blunder: ['Minor evaluation drop detected.', 'Optimal move missed. Recalibrating.']
    }
  },

  // ── CELEBRITY BOTS`.split('\n');

  lines.splice(startIndex, endIndex - startIndex, ...replacement);
  fs.writeFileSync(filePath, lines.join('\n'));
  
  // also copy it to the inner dir
  if (fs.existsSync('c:/Projects/Checkora/Checkora/src/data/bots.ts')) {
    fs.writeFileSync('c:/Projects/Checkora/Checkora/src/data/bots.ts', lines.join('\n'));
  }
  
  console.log("Fixed bots.ts successfully!");
} else {
  console.log("Could not find start/end indexes", startIndex, endIndex);
}
