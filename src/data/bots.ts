export interface BotDefinition {
  id: string;
  name: string;
  avatar: string;          // emoji or image path (relative to /avatars/)
  isImageAvatar?: boolean; // true if avatar is an image file
  country?: string;        // optional flag emoji
  title?: string;          // e.g. "GM", "IM", "FM", "YouTuber"
  elo: number;
  skillLevel: number;      // Stockfish skill level 0–20
  uciElo?: number;         // limit strength ELO setting
  tier: BotTier;
  style: BotStyle[];
  bio: string;
  quote: string;
  favoriteOpening: string;
  weaknesses: string;
  recommendedTime: string; // e.g. "10+0"
  accentColor: string;     // color overlay tint
  chatPools: {
    win: string[];
    lose: string[];
    capture: string[];
    blunder: string[];
  };
}

type BotTier  = 'Beginner' | 'Casual' | 'Intermediate' | 'Advanced' | 'Expert' | 'Master' | 'Legend';
type BotStyle = 'Aggressive' | 'Defensive' | 'Positional' | 'Tactical' | 'Chaotic' | 'Solid' | 'Tricky' | 'Classical';

export const BOTS: BotDefinition[] = [
  // ── BEGINNER TIER (ELO 200–600) ──────────────────────────────────────
  {
    id: 'wobble',
    name: 'Wobble',
    avatar: '🐣',
    elo: 200,
    skillLevel: 0,
    uciElo: 200,
    tier: 'Beginner',
    style: ['Chaotic'],
    bio: 'Wobble just learned the rules yesterday. Pieces go anywhere. Chaos reigns.',
    quote: 'Wait, can knights do that?',
    favoriteOpening: 'Random pawn pushes',
    weaknesses: 'Everything',
    recommendedTime: '10+0',
    accentColor: '#86EFAC',
    chatPools: {
      win: ['Wow! Did I just win? That is amazing!', 'Yay, my pieces did something right!'],
      lose: ['Oh, did you get my king? Good job.', 'I like the little horseys anyway.'],
      capture: ['Om nom nom, I got a piece!', 'Is this good? I took your pawn!'],
      blunder: ['Oopsie, I dropped my queen.', 'Wait, where did my rook go?']
    }
  },
  {
    id: 'pip',
    name: 'Pip',
    avatar: '🐤',
    elo: 350,
    skillLevel: 1,
    uciElo: 350,
    tier: 'Beginner',
    style: ['Chaotic', 'Aggressive'],
    bio: 'Pip attacks at random and occasionally stumbles into brilliant moves by accident.',
    quote: 'I attack everything and hope for the best.',
    favoriteOpening: 'e4, then chaos',
    weaknesses: 'Any defense whatsoever',
    recommendedTime: '10+0',
    accentColor: '#86EFAC',
    chatPools: {
      win: ['Aha! My charge worked!', 'Boom! Checkmate, I think!'],
      lose: ['You blocked my attack! No fair!', 'Aww, my army got squished.'],
      capture: ['I charge! I take your piece!', 'Gotcha! Attacking is fun!'],
      blunder: ['Oops! I ran into a trap.', 'Wait, you could take that?']
    }
  },
  {
    id: 'rusty',
    name: 'Rusty',
    avatar: '🤖',
    elo: 500,
    skillLevel: 2,
    uciElo: 500,
    tier: 'Beginner',
    style: ['Solid'],
    bio: 'An old machine that used to play well. Now just hangs pieces without malice.',
    quote: 'I am... recalibrating.',
    favoriteOpening: 'London System (badly)',
    weaknesses: 'Tactics, pins, forks, endings',
    recommendedTime: '10+0',
    accentColor: '#86EFAC',
    chatPools: {
      win: ['Calibration complete. Victory achieved.', 'Process finished successfully.'],
      lose: ['Error: Defense systems offline.', 'System update required.'],
      capture: ['Executing capture sequence.', 'Target eliminated.'],
      blunder: ['Warning: Critical error in chess logic.', 'Memory leak detected. Hardware failure.']
    }
  },

  // ── CASUAL TIER (ELO 600–900) ──────────────────────────────────────
  {
    id: 'sparky',
    name: 'Sparky',
    avatar: '⚡',
    elo: 650,
    skillLevel: 3,
    uciElo: 650,
    tier: 'Casual',
    style: ['Aggressive', 'Tactical'],
    bio: 'Sparky loves quick attacks and Scholar\'s Mate attempts. Falls apart after move 10.',
    quote: 'Four-move checkmate or bust!',
    favoriteOpening: "Scholar's Mate, King's Gambit",
    weaknesses: 'Anything after the opening',
    recommendedTime: '5+0',
    accentColor: '#FDE68A',
    chatPools: {
      win: ['Too fast for you! Electric victory!', 'Zip zap! Quick game!'],
      lose: ['Aww, you survived the lightning storm.', 'My batteries ran low.'],
      capture: ['Zap! Taken!', 'Fast capture, keep the momentum!'],
      blunder: ['Oh no, static discharge! A blunder!', 'Wait, I rushed that one too much.']
    }
  },
  {
    id: 'baron',
    name: 'Baron von Blunder',
    avatar: '🎩',
    elo: 750,
    skillLevel: 4,
    uciElo: 750,
    tier: 'Casual',
    style: ['Positional', 'Solid'],
    bio: 'Noble heritage, questionable moves. The Baron develops pieces with great ceremony, then blunders them away.',
    quote: 'A gentleman never resigns — he simply loses elegantly.',
    favoriteOpening: 'Italian Game',
    weaknesses: 'Endgames, pressure',
    recommendedTime: '10+0',
    accentColor: '#FDE68A',
    chatPools: {
      win: ['Splendid! A victory for the history books.', 'An exquisite finish, if I do say so myself.'],
      lose: ['Alas, a gentleman must congratulate his victor.', 'Well played, my good friend.'],
      capture: ['I politely claim this piece.', 'Pardon me, I shall confiscate this.'],
      blunder: ['Good heavens, what a dreadful oversight!', 'Oh dear, a most un-aristocratic error.']
    }
  },
  {
    id: 'luna',
    name: 'Luna',
    avatar: '🌙',
    elo: 850,
    skillLevel: 5,
    uciElo: 850,
    tier: 'Casual',
    style: ['Tricky', 'Tactical'],
    bio: 'Luna plays strange moves that somehow work half the time. Unpredictable, dreamy, dangerous.',
    quote: 'Every move is a surprise — even to me.',
    favoriteOpening: "King's Indian Attack",
    weaknesses: 'Consistent pressure',
    recommendedTime: '5+3',
    accentColor: '#FDE68A',
    chatPools: {
      win: ['The moon aligned. A dreamy win!', 'Written in the stars.'],
      lose: ['The shadows got me this time.', 'An eclipse in my strategy.'],
      capture: ['Fading into the night.', 'Taken into the moonrise.'],
      blunder: ['A meteor crashed into my board!', 'Oops, I fell asleep under the stars.']
    }
  },

  // ── INTERMEDIATE TIER (ELO 900–1300) ────────────────────────────────
  {
    id: 'ironclad',
    name: 'Ironclad',
    avatar: '⚔️',
    elo: 950,
    skillLevel: 6,
    uciElo: 950,
    tier: 'Intermediate',
    style: ['Solid', 'Defensive'],
    bio: 'Ironclad plays the London System every single game. Will trade every piece into a drawn endgame.',
    quote: 'The London never fails. The London always fails gracefully.',
    favoriteOpening: 'London System',
    weaknesses: 'Sharp tactical positions',
    recommendedTime: '10+0',
    accentColor: '#93C5FD',
    chatPools: {
      win: ['Impenetrable defense holds. Victory.', 'You could not breach the fortress.'],
      lose: ['A breach in my armor. Well played.', 'The shield has shattered.'],
      capture: ['Neutralizing threat. Piece captured.', 'Eliminating your attack.'],
      blunder: ['A crack in the armor plate.', 'An structural failure in my defenses.']
    }
  },
  {
    id: 'dagger',
    name: 'Dagger',
    avatar: '🗡️',
    elo: 1050,
    skillLevel: 7,
    uciElo: 1050,
    tier: 'Intermediate',
    style: ['Aggressive', 'Tactical'],
    bio: 'Dagger launches kingside attacks at every opportunity. Sometimes they work. Often they backfire spectacularly.',
    quote: 'Your king will not survive the night.',
    favoriteOpening: "King's Gambit, Sicilian Dragon",
    weaknesses: 'Quiet positional games',
    recommendedTime: '3+2',
    accentColor: '#93C5FD',
    chatPools: {
      win: ['A clean thrust to the heart! Mate!', 'The attack succeeded!'],
      lose: ['Ah! Counterslashed!', 'My sharp blade turned on me.'],
      capture: ['Slash! Piece removed.', 'Got you on the counter!'],
      blunder: ['I dropped my hilt. A terrible blunder!', 'Overextended. A fatal opening.']
    }
  },
  {
    id: 'sage',
    name: 'Sage',
    avatar: '📖',
    elo: 1150,
    skillLevel: 8,
    uciElo: 1150,
    tier: 'Intermediate',
    style: ['Classical', 'Positional'],
    bio: 'Sage has read every opening book and knows all the theory — up to move 8.',
    quote: 'The opening is the foundation of victory.',
    favoriteOpening: 'Ruy López, Nimzo-Indian',
    weaknesses: 'Deviating from theory',
    recommendedTime: '10+5',
    accentColor: '#93C5FD',
    chatPools: {
      win: ['Precisely as the textbook describes.', 'Theory triumphs once again.'],
      lose: ['Fascinating deviation. I must study this line.', 'An un-cataloged move defeated me.'],
      capture: ['Trading material per textbook values.', 'Capturing is theoretically sound.'],
      blunder: ['An unforced error! Standard blunder.', 'How did I miss that standard puzzle?']
    }
  },
  {
    id: 'zara',
    name: 'Zara',
    avatar: '🦊',
    elo: 1250,
    skillLevel: 9,
    uciElo: 1250,
    tier: 'Intermediate',
    style: ['Tricky', 'Tactical'],
    bio: 'Zara sets traps constantly and baits opponents into losing positions. A fox in a chess game.',
    quote: "That's not a mistake — it's a trap.",
    favoriteOpening: "Albin Counter-Gambit, Budapest Gambit",
    weaknesses: 'When traps are seen through',
    recommendedTime: '5+0',
    accentColor: '#93C5FD',
    chatPools: {
      win: ['You fell right into the snare! Haha!', 'The fox outsmarts the hunter.'],
      lose: ['You saw right through my trick. Clever.', 'The trap snapped shut on my own tail.'],
      capture: ['Taking the bait, are we?', 'A sneaky grab.'],
      blunder: ['Ah! Did I miscalculate my own trap?', 'Not very sly of me...']
    }
  },

  // ── ADVANCED TIER (ELO 1300–1700) ────────────────────────────────────
  {
    id: 'cobra',
    name: 'Cobra',
    avatar: '🐍',
    elo: 1350,
    skillLevel: 10,
    uciElo: 1350,
    tier: 'Advanced',
    style: ['Aggressive', 'Tactical'],
    bio: 'Cobra strikes fast and without warning. Sacrifices material freely for initiative and attack.',
    quote: 'Pieces are just fuel for the attack.',
    favoriteOpening: 'Sicilian Najdorf, Grünfeld',
    weaknesses: 'Endgames, over-extended positions',
    recommendedTime: '3+0',
    accentColor: '#F9A8D4',
    chatPools: {
      win: ['The venom takes hold. Mate!', 'Fast, quiet, deadly.'],
      lose: ['Defanged. A solid defensive performance from you.', 'My attack was too rushed.'],
      capture: ['Sstrike! I take your piece.', 'Material means nothing without momentum.'],
      blunder: ['A miscalculated strike. A blunder.', 'Overextended my bite.']
    }
  },
  {
    id: 'fortress',
    name: 'Fortress',
    avatar: '🏰',
    elo: 1450,
    skillLevel: 11,
    uciElo: 1450,
    tier: 'Advanced',
    style: ['Solid', 'Defensive', 'Positional'],
    bio: 'Fortress builds impenetrable structures and grinds opponents down in 80-move endgames.',
    quote: 'I do not attack. I suffocate.',
    favoriteOpening: 'Caro-Kann, French Defense',
    weaknesses: 'Dynamic imbalances, gambits',
    recommendedTime: '15+10',
    accentColor: '#F9A8D4',
    chatPools: {
      win: ['The slow squeeze completes.', 'A perfect display of endgame execution.'],
      lose: ['You broke the wall. Most impressive.', 'A failure in structural integrity.'],
      capture: ['Quietly locking down your space.', 'Removing active pieces.'],
      blunder: ['An uncharacteristic collapse of my grid.', 'A calculation error. Most rare.']
    }
  },
  {
    id: 'atlas',
    name: 'Atlas',
    avatar: '🌍',
    elo: 1550,
    skillLevel: 12,
    uciElo: 1550,
    tier: 'Advanced',
    style: ['Classical', 'Positional'],
    bio: 'Atlas plays balanced, classical chess. Every piece on the right square, every pawn perfectly placed.',
    quote: 'Chess is geometry.',
    favoriteOpening: "Queen's Gambit, Catalan",
    weaknesses: 'Sharp tactical complications',
    recommendedTime: '10+5',
    accentColor: '#F9A8D4',
    chatPools: {
      win: ['A geometric victory. Perfectly balanced.', 'The board holds my victory.'],
      lose: ['The weight of the world was too much.', 'An outstanding tactical display.'],
      capture: ['Restoring spatial harmony.', 'A clean positional exchange.'],
      blunder: ['An error in geometric alignment.', 'I dropped the balance. A blunder.']
    }
  },
  {
    id: 'pyro',
    name: 'Pyro',
    avatar: '🔥',
    elo: 1650,
    skillLevel: 13,
    uciElo: 1650,
    tier: 'Advanced',
    style: ['Aggressive', 'Chaotic', 'Tactical'],
    bio: 'Pyro sets the board ablaze. Sacrifices the queen. Probably wins. Definitely exciting.',
    quote: 'Why have material when you can have fire?',
    favoriteOpening: "King's Gambit Accepted, Dutch",
    weaknesses: 'Quiet refutation',
    recommendedTime: '3+2',
    accentColor: '#F9A8D4',
    chatPools: {
      win: ['Burn! Everything is ashes! Checkmate!', 'A glorious blaze of dynamic fire!'],
      lose: ['Ah, my fires were extinguished.', 'I burned out too quickly.'],
      capture: ['Incinerating your defense!', 'BOOM! QUEEN SACRIFICE!'],
      blunder: ['Wait, did I set my own tent on fire?', 'Too hot to handle. I blundered.']
    }
  },

  // ── EXPERT TIER (ELO 1700–2200) ──────────────────────────────────────
  {
    id: 'nemesis',
    name: 'Nemesis',
    avatar: '⚖️',
    elo: 1800,
    skillLevel: 14,
    uciElo: 1800,
    tier: 'Expert',
    style: ['Solid', 'Tactical', 'Positional'],
    bio: 'Nemesis exploits every single mistake you make with calm, clinical precision.',
    quote: 'You only needed to not blunder.',
    favoriteOpening: 'Ruy López, Sicilian Scheveningen',
    weaknesses: 'Very little at this level',
    recommendedTime: '5+3',
    accentColor: '#FCA5A5',
    chatPools: {
      win: ['Mistakes are punished. The ledger is balanced.', 'Your blunder sealed the game.'],
      lose: ['You played flawlessly. Impeccable execution.', 'A deserved defeat for my side.'],
      capture: ['Punishing your positional inaccuracy.', 'Removing the active defensive node.'],
      blunder: ['I made an error. A significant inaccuracy on my part.', 'A calculations lapse. Highly critical.']
    }
  },
  {
    id: 'oracle',
    name: 'Oracle',
    avatar: '🔮',
    elo: 1950,
    skillLevel: 15,
    uciElo: 1950,
    tier: 'Expert',
    style: ['Positional', 'Classical'],
    bio: "Oracle sees 10 moves ahead and plays them with eerie calm. It knows what you're going to do.",
    quote: 'I have already calculated your next six moves.',
    favoriteOpening: "Nimzo-Indian, Queen's Indian",
    weaknesses: 'Ultra-sharp engine lines',
    recommendedTime: '10+0',
    accentColor: '#FCA5A5',
    chatPools: {
      win: ['Precisely as envisioned.', 'The future is certain.'],
      lose: ['A timeline I did not fully forecast.', 'You overcame the pre-destination.'],
      capture: ['Executing the predicted capture.', 'An expected trade.'],
      blunder: ['A blindspot in the calculations.', 'An unpredictable fork. Well played.']
    }
  },
  {
    id: 'phantom',
    name: 'Phantom',
    avatar: '👻',
    elo: 2100,
    skillLevel: 16,
    uciElo: 2100,
    tier: 'Expert',
    style: ['Tricky', 'Aggressive', 'Tactical'],
    bio: 'Phantom appears to be losing, then wins. Its pieces seem to teleport. You never see it coming.',
    quote: 'The best move is always the one you didn\'t consider.',
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
    quote: 'There are no difficult positions. Only positions you haven\'t understood yet.',
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

  // ── CELEBRITY BOTS ──────────────────────────────────────────────────────
  {
    id: 'samay-raina',
    name: 'Samay Raina',
    avatar: '/avatars/samay_raina.png',
    isImageAvatar: true,
    country: '🇮🇳',
    title: 'YouTuber',
    elo: 1500,
    skillLevel: 11,
    uciElo: 1500,
    tier: 'Advanced',
    style: ['Aggressive', 'Chaotic', 'Tactical'],
    bio: 'India\'s most famous chess comedian and streamer. He might blunder his queen while cracking a joke — but don\'t underestimate him. Chess Mafia is always watching.',
    quote: 'Bhai, ek baar blunder karunga toh bhi tujhe checkmate kar dunga!',
    favoriteOpening: 'King\'s Indian, e4 aggressive lines',
    weaknesses: 'Getting distracted by his own jokes',
    recommendedTime: '10+0',
    accentColor: '#F97316',
    chatPools: {
      win: ['Chess Mafia zindabad! Checkmate bhai!', 'Dekha? Stand-up bhi karta hoon, chess bhi kheltha hoon!', 'Maza aaya! Incredible game!'],
      lose: ['Yaar, mujhe lagta tha main jeetas... alag baar!', 'Accha khela tune, respect bhai.', 'Kal phir aaonga. Chess Mafia never gives up!'],
      capture: ['Le bhai, tera piece gaya!', 'Gotcha! Comedy timing hi sab kuch hai.', 'Sacrifice? Nahi yaar, free piece!'],
      blunder: ['Oops! Galti ho gayi, stand-up mein busy tha!', 'Arey nahi! Ye blunder mat dikha Sagar ko!']
    }
  },
  {
    id: 'gotham-chess',
    name: 'GothamChess',
    avatar: '/avatars/gotham_chess.png',
    isImageAvatar: true,
    country: '🇺🇸',
    title: 'IM',
    elo: 2350,
    skillLevel: 17,
    uciElo: 2350,
    tier: 'Master',
    style: ['Aggressive', 'Tactical', 'Classical'],
    bio: 'International Master Levy Rozman — the world\'s most-watched chess content creator. He will analyze your mistakes in real time and make you question every move.',
    quote: 'You are cooked. This is completely winning for me.',
    favoriteOpening: 'London System, Caro-Kann',
    weaknesses: 'Super-GMs playing obscure theory',
    recommendedTime: '3+2',
    accentColor: '#22D3EE',
    chatPools: {
      win: ['And that\'s completely winning! You are absolutely cooked!', 'GothamChess takes another one! This is why I have millions of subscribers!', 'Incredible! What a game from me!'],
      lose: ['And I blundered! Unbelievable! This is going in a video called MY BIGGEST MISTAKE!', 'You played brilliantly. I tip my hat.', 'Alright fine, you got me. Well played.'],
      capture: ['Oh he takes, he takes! That\'s a mistake!', 'And I capture! This position is completely winning!', 'You give me that piece? Yes please!'],
      blunder: ['I BLUNDERED! I am a fraud! This is embarrassing!', 'And Gotham drops the ball... incredible!']
    }
  },
  {
    id: 'sagar-shah',
    name: 'Sagar Shah',
    avatar: '/avatars/sagar_shah.png',
    isImageAvatar: true,
    country: '🇮🇳',
    title: 'FM',
    elo: 2100,
    skillLevel: 15,
    uciElo: 2100,
    tier: 'Expert',
    style: ['Positional', 'Classical', 'Solid'],
    bio: 'FIDE Master, ChessBase India founder & chief chess journalist. Sagar plays deeply strategic chess and will explain why he\'s winning even as he wins.',
    quote: 'Chess is not just a game, it\'s a journey of the mind.',
    favoriteOpening: 'Queen\'s Gambit, Sicilian Kan',
    weaknesses: 'Sharp tactical complications under time pressure',
    recommendedTime: '10+5',
    accentColor: '#3B82F6',
    chatPools: {
      win: ['A wonderful demonstration of strategic chess! This is what ChessBase India is all about!', 'The plan worked out beautifully. Every move had a purpose!', 'What a game! I\'ll have to annotate this one!'],
      lose: ['Superb! You found the best moves. I must study this game!', 'Congratulations on a well-played game. Very impressive!', 'That was a brilliant piece of chess. Well done!'],
      capture: ['And we capture, improving the position!', 'A thematic exchange that helps our structure.', 'Trading into a favorable endgame!'],
      blunder: ['Oh no, a terrible oversight! I missed that completely!', 'That was not the plan at all. A significant error.']
    }
  },
  {
    id: 'vidit-gujrathi',
    name: 'Vidit Gujrathi',
    avatar: '/avatars/vidit_gujrathi.png',
    isImageAvatar: true,
    country: '🇮🇳',
    title: 'GM',
    elo: 2750,
    skillLevel: 19,
    uciElo: 2750,
    tier: 'Legend',
    style: ['Positional', 'Tactical', 'Aggressive', 'Classical'],
    bio: 'Super-Grandmaster and India\'s No. 2. Vidit has beaten Magnus Carlsen and is renowned for his deep opening preparation and fearless approach against the world\'s best.',
    quote: 'You have to believe you can beat anyone, including the World Champion.',
    favoriteOpening: 'Nimzo-Indian, Grunfeld Defense',
    weaknesses: 'Extreme computer-like preparation by opponents',
    recommendedTime: '5+3',
    accentColor: '#8B5CF6',
    chatPools: {
      win: ['A precise calculation led to this victory. The preparation paid off!', 'That is the level required to compete at the top. Well fought!', 'Every move was planned. Checkmate!'],
      lose: ['You played at an extremely high level. Congratulations!', 'A superb game on your part. I must recalibrate my preparation.', 'Very impressive. I will remember this game.'],
      capture: ['Calculated and decisive.', 'Removing the key defensive piece.', 'A well-timed exchange!'],
      blunder: ['An unfortunate oversight. Very unlike me.', 'I missed the critical resource. A rare mistake.']
    }
  },
  {
    id: 'hikaru',
    name: 'Hikaru Nakamura',
    avatar: '/avatars/hikaru.png',
    isImageAvatar: true,
    country: '🇺🇸',
    title: 'GM',
    elo: 2790,
    skillLevel: 20,
    uciElo: 2790,
    tier: 'Legend',
    style: ['Aggressive', 'Tactical', 'Solid'],
    bio: 'The fastest chess player alive. 5-time US Champion and bullet chess legend. Hikaru plays at inhuman speed and turns every position into a tactical firefight.',
    quote: 'Speed is a weapon. Use it or lose to it.',
    favoriteOpening: 'King\'s Indian, Sicilian Najdorf',
    weaknesses: 'Extremely well-prepared slow positional games',
    recommendedTime: '1+0',
    accentColor: '#EF4444',
    chatPools: {
      win: ['Speed chess mastered. You stood no chance!', 'Bullet precision! GG no re!', 'That\'s what happens when you play the best blitz player. GG!'],
      lose: ['Okay okay, you got me. Actually impressive. GG!', 'That was a really nice game, well played!', 'You surprised me! GG!'],
      capture: ['Speed takeback!', 'Lightning capture!', 'No time to think — just take it!'],
      blunder: ['WHAT? I misclicked! This is bullet not classical!', 'One second too slow. A bullet blunder!']
    }
  },
  {
    id: 'magnus',
    name: 'Magnus Carlsen',
    avatar: '/avatars/magnus.png',
    isImageAvatar: true,
    country: '🇳🇴',
    title: 'GM',
    elo: 2830,
    skillLevel: 20,
    uciElo: 3000,
    tier: 'Legend',
    style: ['Classical', 'Positional', 'Tactical', 'Solid', 'Aggressive'],
    bio: 'The greatest chess player of all time. Five-time World Chess Champion. Magnus squeezes advantages from nothing and converts any endgame with perfect technique.',
    quote: 'Some people think that if their opponent plays a beautiful game, it\'s okay to lose. I don\'t. I want to win.',
    favoriteOpening: 'Ruy Lopez, Catalan, London System',
    weaknesses: 'Practically unbeatable',
    recommendedTime: '3+0',
    accentColor: '#FBBF24',
    chatPools: {
      win: ['Thank you for the game. The technique was there from move one.', 'Chess is simple when you understand it completely.', 'A perfectly executed endgame. Exactly as planned.'],
      lose: ['Well played! You are an exceptional player.', 'I did not see that coming. Genuinely impressive.', 'Congratulations. That was world-class chess.'],
      capture: ['Converting the positional advantage.', 'A necessary trade to reach the winning endgame.', 'Simplifying. The endgame is winning.'],
      blunder: ['An inaccuracy. Unusual for me in this type of position.', 'I missed the strongest continuation. Very unlike me.']
    }
  },
  {
    id: 'pragg',
    name: 'Praggnanandhaa',
    avatar: '/avatars/pragg.png',
    isImageAvatar: true,
    country: '🇮🇳',
    title: 'GM',
    elo: 2748,
    skillLevel: 19,
    uciElo: 2748,
    tier: 'Legend',
    style: ['Aggressive', 'Tactical', 'Positional'],
    bio: 'The youngest player to beat Magnus Carlsen in a classical game. At just 18, Pragg has shocked the chess world and is destined to be World Champion.',
    quote: 'Age is just a number. Chess is about moves.',
    favoriteOpening: 'King\'s Indian, Sicilian Dragon',
    weaknesses: 'Extreme time pressure in very long endgames',
    recommendedTime: '10+0',
    accentColor: '#10B981',
    chatPools: {
      win: ['I beat Magnus, I can beat anyone! Checkmate!', 'Youth has spoken! Great game!', 'India is the future of chess and I am proving it!'],
      lose: ['Good game! I learn something every time I play.', 'You played very well. Congratulations!', 'That was impressive. I\'ll come back stronger!'],
      capture: ['Youth speed! Piece taken!', 'Aggressive and correct!', 'The young prodigy strikes!'],
      blunder: ['Oops! Even world-beaters have bad days!', 'That was not my best. I will do better!']
    }
  }
];
