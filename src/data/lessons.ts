export interface LessonStep {
  num: number;
  instruction: string;
  expectedMove: string;
  opponentMove?: string;
}

export interface ChessLesson {
  id: string;
  name: string;
  category: 'openings' | 'tactics' | 'strategy' | 'endgames';
  difficulty: string;
  description: string;
  stepsCount: number;
  steps: LessonStep[];
  percentCompleted: number;
  startFen?: string;
  playerColor?: 'white' | 'black';
  funFact?: string;
  commonBlunder?: string;
}

export const LESSON_DATABASE: ChessLesson[] = [
  {
    id: 'l1',
    name: 'Italian Opening: Giuoco Pianissimo',
    category: 'openings',
    difficulty: 'Beginner',
    description: 'Master the quintessential classical opening. Learn the slow, strategic maneuvering of the Giuoco Pianissimo (Very Quiet Game).',
    funFact: 'The Italian Opening is the oldest recorded chess opening, appearing in the Göttingen manuscript in 1490!',
    commonBlunder: 'Avoid playing Ng5 too early without preparation. Black can easily defend the f7 pawn with d5, leading to a strong counterattack that often crushes unprepared White players.',
    stepsCount: 9,
    percentCompleted: 0,
    steps: [
      { num: 1, expectedMove: 'e2e4', opponentMove: 'e7e5', instruction: 'Start your journey by playing e4. This immediately claims the center, opens lines for your Queen, and prepares to develop your light-squared Bishop.' },
      { num: 2, expectedMove: 'g1f3', opponentMove: 'b8c6', instruction: 'Black matched your central presence. Now, develop your Knight to f3. This follows the golden rule: "Knights before Bishops." It also directly attacks Black\'s e5 pawn.' },
      { num: 3, expectedMove: 'f1c4', opponentMove: 'f8c5', instruction: 'Black defended with Nc6. Bring your light-squared Bishop to c4. This targets f7, the weakest square in Black\'s camp because it is only defended by the King.' },
      { num: 4, expectedMove: 'c2c3', opponentMove: 'g8f6', instruction: 'Black played Bc5 (The Giuoco Piano). Play c3! This is the defining move of the main line. You are preparing to build a massive pawn center with d4.' },
      { num: 5, expectedMove: 'd2d3', opponentMove: 'd7d6', instruction: 'Black brings out their Knight, attacking your e4 pawn. Instead of immediately pushing d4 (which leads to sharp, chaotic lines), play the solid d3. This defends e4 and characterizes the "Pianissimo" (very quiet) variation.' },
      { num: 6, expectedMove: 'e1g1', opponentMove: 'a7a6', instruction: 'Black secures their center with d6. Now, castle kingside to tuck your King into absolute safety and activate your Rook.' },
      { num: 7, expectedMove: 'b1d2', opponentMove: 'c5a7', instruction: 'Black plays a6 to give their Bishop a hiding spot. Now, develop your Queenside Knight to d2. Wait, why not c3? Because your pawn is already there! You are preparing a famous Knight maneuver.' },
      { num: 8, expectedMove: 'f1e1', opponentMove: 'e8g8', instruction: 'Black tucks their Bishop away. Bring your Rook to e1 to support the center.' },
      { num: 9, expectedMove: 'd2f1', instruction: 'Black castles. Complete the famous Italian Knight maneuver: swing the d2 Knight to f1! From here, it will travel to g3, eyeing the crucial f5 square for a devastating Kingside attack. You have reached a master-level middlegame position!' }
    ]
  },
  {
    id: 'l2',
    name: 'Ruy Lopez: Morphy Defense',
    category: 'openings',
    difficulty: 'Intermediate',
    description: 'Learn the Spanish Torture. Apply relentless pressure and master positional tension in chess\'s most deeply analyzed opening.',
    funFact: 'Named after a 16th-century Spanish priest Ruy López de Segura. It is considered the ultimate test of positional chess understanding.',
    commonBlunder: 'Trading the Bishop on b5 for the c6 Knight immediately (The Exchange Variation) is playable, but usually just gives Black the Bishop pair advantage without enough compensation unless you know the specific endgame theory.',
    stepsCount: 8,
    percentCompleted: 0,
    steps: [
      { num: 1, expectedMove: 'e2e4', opponentMove: 'e7e5', instruction: 'Open the game with e4, staking your claim in the center.' },
      { num: 2, expectedMove: 'g1f3', opponentMove: 'b8c6', instruction: 'Develop the Knight to f3, immediately attacking Black\'s e5 pawn.' },
      { num: 3, expectedMove: 'f1b5', opponentMove: 'a7a6', instruction: 'Instead of the Italian (Bc4), play your Bishop to b5. This is the Ruy Lopez! You are pinning the Knight that defends the e5 pawn.' },
      { num: 4, expectedMove: 'b5a4', opponentMove: 'g8f6', instruction: 'Black plays a6 (The Morphy Defense), kicking your Bishop. Retreat to a4. Maintaining the tension is better than trading immediately.' },
      { num: 5, expectedMove: 'e1g1', opponentMove: 'f8e7', instruction: 'Black develops their Knight, attacking e4. Ignore the threat and castle! If Black takes on e4, you have devastating discovered attacks down the e-file.' },
      { num: 6, expectedMove: 'f1e1', opponentMove: 'b7b5', instruction: 'Black plays safely with Be7. Now, defend your e4 pawn with Re1.' },
      { num: 7, expectedMove: 'a4b3', opponentMove: 'd7d6', instruction: 'Black kicks your Bishop again with b5. Retreat to b3. Look at that beautiful diagonal aiming at f7!' },
      { num: 8, expectedMove: 'c2c3', instruction: 'Black solidifies with d6. Play c3. This is the classical Spanish setup: preparing the d4 central break and giving your Bishop a hiding square on c2 if attacked by Na5. You are ready for a complex strategic battle.' }
    ]
  },
  {
    id: 'l3',
    name: 'Queen\'s Gambit Declined',
    category: 'openings',
    difficulty: 'Advanced',
    description: 'Master the dark arts of the Queen\'s pawn. Sacrifice a flank pawn to secure absolute, iron-clad control of the center.',
    funFact: 'The Queen\'s Gambit isn\'t a true gambit! If Black takes the pawn (dxc4), White can easily regain it while dominating the center.',
    commonBlunder: 'As Black, desperately trying to hang onto the sacrificed c4 pawn with b5 is a famous beginner mistake. White will play a4 and completely shatter Black\'s queenside structure.',
    stepsCount: 7,
    percentCompleted: 0,
    steps: [
      { num: 1, expectedMove: 'd2d4', opponentMove: 'd7d5', instruction: 'Open with d4. This controls e5 and c5, leading to a more strategic, maneuvering game than e4.' },
      { num: 2, expectedMove: 'c2c4', opponentMove: 'e7e6', instruction: 'Black mirrors with d5. Strike immediately with c4! You are offering a pawn to draw Black\'s central pawn away.' },
      { num: 3, expectedMove: 'b1c3', opponentMove: 'g8f6', instruction: 'Black declines the gambit by defending with e6 (QGD). Develop your Knight to c3, adding immense pressure to d5.' },
      { num: 4, expectedMove: 'c1g5', opponentMove: 'f8e7', instruction: 'Black develops the Knight to f6, defending d5. Pin that Knight to the Queen by playing your dark-squared Bishop to g5!' },
      { num: 5, expectedMove: 'e2e3', opponentMove: 'e8g8', instruction: 'Black unpins with Be7. Solidify your center and open lines for your light-squared Bishop by playing e3.' },
      { num: 6, expectedMove: 'g1f3', opponentMove: 'b8d7', instruction: 'Black tucks their King away safely. Continue logical development by bringing your Kingside Knight to f3.' },
      { num: 7, expectedMove: 'a1c1', instruction: 'Black develops Nd7. Place your Rook on the semi-open c-file with Rc1. This prepares the famous "Minority Attack" plan, where you will push your a and b pawns to create a weakness in Black\'s queenside.' }
    ]
  },
  {
    id: 'l4',
    name: 'Sicilian Defense: Najdorf',
    category: 'openings',
    difficulty: 'Advanced',
    description: 'Play the sharpest, most aggressive response to e4. Master the complex imbalances of the Open Sicilian.',
    funFact: 'Garry Kasparov and Bobby Fischer both used the Najdorf as their primary weapon with Black to become World Champions.',
    commonBlunder: 'Failing to control the d4 square as Black early on allows White to establish a terrifying, unstoppable center. The entire opening revolves around the d4 square.',
    stepsCount: 7,
    percentCompleted: 0,
    playerColor: 'black',
    startFen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    steps: [
      { num: 1, expectedMove: 'c7c5', opponentMove: 'g1f3', instruction: 'White opened with e4. Respond with the asymmetrical c5! You are fighting for control of the d4 square using a flank pawn.' },
      { num: 2, expectedMove: 'd7d6', opponentMove: 'd2d4', instruction: 'White prepares to open the center. Play d6 to clamp down on the e5 square and prepare your Queenside development.' },
      { num: 3, expectedMove: 'c5d4', opponentMove: 'f3d4', instruction: 'White strikes in the center with d4. This is the Open Sicilian. Capture it immediately to trade your flank pawn for White\'s central pawn.' },
      { num: 4, expectedMove: 'g8f6', opponentMove: 'b1c3', instruction: 'White recaptures with the Knight. Develop your Kingside Knight to f6, attacking White\'s e4 pawn.' },
      { num: 5, expectedMove: 'a7a6', opponentMove: 'c1g5', instruction: 'White defends e4 with Nc3. Now play the defining move of the Najdorf: a6! This completely locks White\'s Knights and Bishops out of the critical b5 square.' },
      { num: 6, expectedMove: 'e7e6', opponentMove: 'f2f4', instruction: 'White plays the aggressive Bg5. Respond solidly with e6, blunting the Bishop\'s diagonal and preparing to develop your own Bishop.' },
      { num: 7, expectedMove: 'f8e7', instruction: 'White plays f4, launching a massive Kingside attack. Stay calm, play Be7 to unpin your Knight and prepare castling. The position is razor-sharp; one mistake by either side means death!' }
    ]
  },
  {
    id: 'l5',
    name: 'French Defense: Advance Variation',
    category: 'openings',
    difficulty: 'Intermediate',
    description: 'Build an impenetrable fortress. Learn to counterattack White\'s overextended pawn center from the flanks.',
    funFact: 'Despite its reputation as a drawish opening, the French Defense creates incredibly complex, locked pawn structures where strategic understanding beats raw calculation.',
    commonBlunder: 'Black\'s light-squared Bishop on c8 often gets trapped behind its own pawns. Finding a way to trade or activate this "bad French Bishop" is the key to winning.',
    stepsCount: 6,
    percentCompleted: 0,
    playerColor: 'black',
    startFen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    steps: [
      { num: 1, expectedMove: 'e7e6', opponentMove: 'd2d4', instruction: 'White plays e4. Respond with e6. You are allowing White to take the center, but preparing to strike back immediately.' },
      { num: 2, expectedMove: 'd7d5', opponentMove: 'e4e5', instruction: 'White claims the full center with d4. Strike the center with d5! You are forcing White to make a decision.' },
      { num: 3, expectedMove: 'c7c5', opponentMove: 'c2c3', instruction: 'White pushes e5 (The Advance Variation), locking the pawn structure. Immediately attack the base of White\'s pawn chain with c5!' },
      { num: 4, expectedMove: 'b8c6', opponentMove: 'g1f3', instruction: 'White defends the center with c3. Pile more pressure onto d4 by developing your Knight to c6.' },
      { num: 5, expectedMove: 'd8b6', opponentMove: 'a2a3', instruction: 'White defends with Nf3. Bring your Queen to b6! You are now hitting d4 with three pieces, and White is sweating to hold their center together.' },
      { num: 6, expectedMove: 'g8h6', instruction: 'White prepares to expand on the Queenside. Play Nh6! Normally Knights on the rim are dim, but here it plans to jump to f5 to add a FOURTH attacker to the d4 square!' }
    ]
  },
  {
    id: 'l6',
    name: 'Caro-Kann: Classical Variation',
    category: 'openings',
    difficulty: 'Intermediate',
    description: 'Play the thinking man\'s defense. Similar to the French, but you solve the "bad bishop" problem before locking the center.',
    funFact: 'Anatoly Karpov used the Caro-Kann to frustrate his opponents with impossibly solid, unbreakable defensive setups.',
    commonBlunder: 'Moving the f-pawn early in the Caro-Kann can be suicidal, as it opens the e8-h5 diagonal to devastating Queen checks.',
    stepsCount: 6,
    percentCompleted: 0,
    playerColor: 'black',
    startFen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    steps: [
      { num: 1, expectedMove: 'c7c6', opponentMove: 'd2d4', instruction: 'White plays e4. Respond with c6. This prepares d5, similar to the French Defense, but leaves the c8-h3 diagonal open.' },
      { num: 2, expectedMove: 'd7d5', opponentMove: 'b1c3', instruction: 'White grabs the center. Strike back with d5, challenging e4.' },
      { num: 3, expectedMove: 'd5e4', opponentMove: 'c3e4', instruction: 'White defends e4 with Nc3. Capture the pawn! dxe4 opens the game slightly.' },
      { num: 4, expectedMove: 'c8f5', opponentMove: 'e4g3', instruction: 'White recaptures. Here is the genius of the Caro-Kann: develop your light-squared Bishop to f5 BEFORE playing e6. It attacks the Knight and gets outside the pawn chain!' },
      { num: 5, expectedMove: 'f5g6', opponentMove: 'h2h4', instruction: 'White attacks your Bishop. Retreat to g6. You have secured an active diagonal for your Bishop.' },
      { num: 6, expectedMove: 'h7h6', instruction: 'White plays h4, trying to trap your Bishop with h5! Create an escape square by playing h6. You have a rock-solid position with no weaknesses.' }
    ]
  },
  {
    id: 'l7',
    name: 'London System',
    category: 'openings',
    difficulty: 'Beginner',
    description: 'Learn an opening you can play against almost anything Black does. Build a brutal pyramid of pawns and launch a crushing Kingside attack.',
    funFact: 'Magnus Carlsen brought the London System back from obscurity, proving that even "boring" systemic openings can be lethal at the highest level.',
    commonBlunder: 'Allowing Black to play Qb6 and attack your b2 pawn while your dark-squared Bishop is developed can be extremely annoying. Always be ready to defend b2 with Qc1 or Qb3.',
    stepsCount: 7,
    percentCompleted: 0,
    steps: [
      { num: 1, expectedMove: 'd2d4', opponentMove: 'd7d5', instruction: 'Start with d4. Claim the center securely.' },
      { num: 2, expectedMove: 'c1f4', opponentMove: 'g8f6', instruction: 'Black matches with d5. Immediately bring out your dark-squared Bishop to f4. This is the trademark move of the London System!' },
      { num: 3, expectedMove: 'e2e3', opponentMove: 'c7c5', instruction: 'Black develops. Now play e3. You are locking your Bishop OUTSIDE the pawn chain, solving the main problem of d4 openings.' },
      { num: 4, expectedMove: 'c2c3', opponentMove: 'b8c6', instruction: 'Black attacks your center with c5. Defend with c3. Look at your pawns on c3, d4, and e3—they form a beautiful, unbreakable pyramid!' },
      { num: 5, expectedMove: 'b1d2', opponentMove: 'e7e6', instruction: 'Black adds pressure. Develop your Queenside Knight to d2. This supports the center and prepares to jump to f3 if needed.' },
      { num: 6, expectedMove: 'g1f3', opponentMove: 'f8e7', instruction: 'Black prepares to castle. Develop your Kingside Knight to f3. Your setup is nearly complete.' },
      { num: 7, expectedMove: 'f1d3', instruction: 'Black develops the Bishop. Bring your light-squared Bishop to d3, aiming a terrifying gaze directly at Black\'s Kingside (h7). You are ready to launch a massive attack once Black castles.' }
    ]
  },
  {
    id: 'l8',
    name: 'King\'s Indian Defense',
    category: 'openings',
    difficulty: 'Advanced',
    description: 'Surrender the center early to build a coiled spring on the Kingside, then unleash a violent, sacrificial mating attack against White\'s King.',
    funFact: 'The KID was famously championed by Bobby Fischer and Garry Kasparov in their most brilliant, chaotic wins against d4.',
    commonBlunder: 'Playing the KID requires immense calculation and risk tolerance. If your Kingside attack fails, you will simply be suffocated to death by White\'s massive space advantage.',
    stepsCount: 7,
    percentCompleted: 0,
    playerColor: 'black',
    startFen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1',
    steps: [
      { num: 1, expectedMove: 'g8f6', opponentMove: 'c2c4', instruction: 'White opens with d4. Play Nf6, preventing e4 and keeping your options flexible.' },
      { num: 2, expectedMove: 'g7g6', opponentMove: 'b1c3', instruction: 'White grabs more space with c4. Play g6, preparing to fianchetto your dark-squared Bishop.' },
      { num: 3, expectedMove: 'f8g7', opponentMove: 'e2e4', instruction: 'White develops Nc3, preparing a massive center. Complete the fianchetto with Bg7. This Bishop is the soul of the King\'s Indian.' },
      { num: 4, expectedMove: 'd7d6', opponentMove: 'g1f3', instruction: 'White plays e4, claiming the entire center! Play d6 to prevent White from pushing e5 and running you off the board.' },
      { num: 5, expectedMove: 'e8g8', opponentMove: 'f1e2', instruction: 'White develops calmly. Castle your King into absolute safety. The coiled spring is ready.' },
      { num: 6, expectedMove: 'e7e5', opponentMove: 'e1g1', instruction: 'White prepares to castle. BOOM! Strike the center with e5! You are challenging White\'s space advantage head-on.' },
      { num: 7, expectedMove: 'b8c6', instruction: 'White castles. Develop your Knight to c6, adding unbearable pressure to d4. The position will soon explode into a race: White attacks the Queenside, you attack the Kingside!' }
    ]
  },
  {
    id: 'l9',
    name: 'Punishing the Scholar\'s Mate',
    category: 'tactics',
    difficulty: 'Beginner',
    description: 'The Scholar\'s Mate is a cheap trick used to embarrass beginners. Learn how to decisively punish it and gain a massive advantage.',
    funFact: 'If both players cooperate, the fastest possible checkmate in chess is the Fool\'s Mate, which takes only 2 moves. The Scholar\'s mate takes 4!',
    commonBlunder: 'When White plays Qh5, do NOT play g6 immediately. White will play Qxe5+, forking your King and Rook, and you will instantly lose the game!',
    stepsCount: 5,
    percentCompleted: 0,
    playerColor: 'black',
    startFen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    steps: [
      { num: 1, expectedMove: 'e7e5', opponentMove: 'f1c4', instruction: 'White opens with e4. Respond classically with e5.' },
      { num: 2, expectedMove: 'b8c6', opponentMove: 'd1h5', instruction: 'White plays Bc4, eyeing f7. Develop your Knight to c6, defending your e5 pawn.' },
      { num: 3, expectedMove: 'g7g6', opponentMove: 'h5f3', instruction: 'White brings the Queen to h5, threatening a 4-move checkmate on f7! NOW you play g6, attacking the Queen while your e5 pawn is safe.' },
      { num: 4, expectedMove: 'g8f6', opponentMove: 'g1e2', instruction: 'White retreats the Queen to f3, renewing the threat of checkmate on f7. Develop your Kingside Knight to f6, physically blocking the Queen\'s path to f7.' },
      { num: 5, expectedMove: 'f8g7', instruction: 'White gives up on the cheap tricks and develops a Knight. Play Bg7. You have successfully defended, gained free development tempos, and White\'s Queen looks incredibly silly on f3!' }
    ]
  }
];
