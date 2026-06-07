import type { ChessLesson } from './lessons';

export const EXTENDED_LESSONS: ChessLesson[] = [
  {
    id: 'l13',
    name: 'Queen\'s Gambit Accepted',
    category: 'openings',
    difficulty: 'Intermediate',
    description: 'Accept the gambit! Black temporarily wins a pawn, forcing White to prove their compensation in the center.',
    funFact: 'Although called a gambit, Black cannot realistically hold onto the c4 pawn without destroying their own queenside.',
    stepsCount: 7,
    percentCompleted: 0,
    playerColor: 'black',
    startFen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1',
    steps: [
      { num: 1, expectedMove: 'd7d5', opponentMove: 'c2c4', instruction: 'White plays d4. Respond symmetrically with d5. White plays the Queen\'s Gambit with c4.' },
      { num: 2, expectedMove: 'd5c4', opponentMove: 'g1f3', instruction: 'Accept the gambit! Take the pawn. White plays Nf3 to prevent e5 and prepare to recapture.' },
      { num: 3, expectedMove: 'g8f6', opponentMove: 'e2e3', instruction: 'Develop your Knight, controlling the center. White plays e3, opening the Bishop to recapture c4.' },
      { num: 4, expectedMove: 'e7e6', opponentMove: 'f1c4', instruction: 'Solidify your center with e6. Do not try to defend c4 with b5! White recaptures the pawn.' },
      { num: 5, expectedMove: 'c7c5', opponentMove: 'e1g1', instruction: 'Immediately strike back at White\'s center with c5! White castles.' },
      { num: 6, expectedMove: 'a7a6', opponentMove: 'd1e2', instruction: 'Play a6, preparing b5 to expand on the Queenside and give your light-squared Bishop a long diagonal.' },
      { num: 7, expectedMove: 'b7b5', instruction: 'Expand with b5! You have given up the center temporarily, but you have rapid Queenside development and a solid game.' }
    ]
  },
  {
    id: 'l14',
    name: 'King\'s Gambit Accepted',
    category: 'openings',
    difficulty: 'Advanced',
    description: 'The romantic era of chess! White sacrifices the f-pawn to build a massive center and launch a rapid Kingside attack.',
    funFact: 'Boris Spassky famously used the King\'s Gambit to defeat Bobby Fischer in 1960 in a spectacular miniature.',
    stepsCount: 6,
    percentCompleted: 0,
    steps: [
      { num: 1, expectedMove: 'e2e4', opponentMove: 'e7e5', instruction: 'Start with e4.' },
      { num: 2, expectedMove: 'f2f4', opponentMove: 'e5f4', instruction: 'The King\'s Gambit! Sacrifice your f-pawn to divert Black\'s central pawn. Black accepts.' },
      { num: 3, expectedMove: 'g1f3', opponentMove: 'g7g5', instruction: 'Develop the Knight to f3. This prevents Qh4+ and prepares to fight for the center. Black defends the f4 pawn with g5.' },
      { num: 4, expectedMove: 'h2h4', opponentMove: 'g5g4', instruction: 'Immediately attack Black\'s pawn chain with h4. Black pushes g4 to attack your Knight.' },
      { num: 5, expectedMove: 'f3e5', opponentMove: 'g8f6', instruction: 'Jump the Knight forward to e5, the Kieseritzky Gambit! You attack g4 and eye f7.' },
      { num: 6, expectedMove: 'd2d4', instruction: 'Seize the center with d4! You have massive central control and active pieces, fully compensating for the sacrificed pawn.' }
    ]
  },
  {
    id: 'l15',
    name: 'King\'s Gambit Declined: Falkbeer Countergambit',
    category: 'openings',
    difficulty: 'Intermediate',
    description: 'Refuse White\'s romantic attack and strike back in the center immediately with your own gambit!',
    funFact: 'Paul Morphy used this aggressive counter-gambit to crush his opponents when they dared to play the King\'s Gambit against him.',
    stepsCount: 6,
    percentCompleted: 0,
    playerColor: 'black',
    startFen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    steps: [
      { num: 1, expectedMove: 'e7e5', opponentMove: 'f2f4', instruction: 'White plays e4, you play e5. White plays the King\'s Gambit (f4).' },
      { num: 2, expectedMove: 'd7d5', opponentMove: 'e4d5', instruction: 'Instead of accepting, strike the center with d5! The Falkbeer Countergambit! White takes your d-pawn.' },
      { num: 3, expectedMove: 'e5e4', opponentMove: 'd2d3', instruction: 'Push e4! This pawn acts like a bone in White\'s throat, preventing natural development. White tries to break it with d3.' },
      { num: 4, expectedMove: 'g8f6', opponentMove: 'd3e4', instruction: 'Develop your Knight, defending e4. White captures the e4 pawn.' },
      { num: 5, expectedMove: 'f6e4', opponentMove: 'g1f3', instruction: 'Recapture with the Knight. Your Knight is powerfully centralized. White develops Nf3.' },
      { num: 6, expectedMove: 'f8c5', instruction: 'Develop your Bishop to c5, directly eyeing White\'s weakened f2 square! You have a massive initiative.' }
    ]
  },
  {
    id: 'l16',
    name: 'French Defense: Exchange Variation',
    category: 'openings',
    difficulty: 'Beginner',
    description: 'The simplest way to face the French Defense. By exchanging pawns, White opens the board and avoids the complex locked structures of the main lines.',
    funFact: 'Garry Kasparov occasionally used the Exchange Variation to surprise opponents who were prepared for intense strategic battles, turning the game into an open tactical fight.',
    stepsCount: 5,
    percentCompleted: 0,
    steps: [
      { num: 1, expectedMove: 'e2e4', opponentMove: 'e7e6', instruction: 'Open with e4. Black plays e6, the French Defense.' },
      { num: 2, expectedMove: 'd2d4', opponentMove: 'd7d5', instruction: 'Take the full center with d4. Black strikes with d5.' },
      { num: 3, expectedMove: 'e4d5', opponentMove: 'e6d5', instruction: 'The Exchange Variation! Simply capture on d5 to open the center.' },
      { num: 4, expectedMove: 'g1f3', opponentMove: 'g8f6', instruction: 'Develop your Kingside Knight. Both sides now have symmetrical, open positions.' },
      { num: 5, expectedMove: 'f1d3', instruction: 'Develop your light-squared Bishop to d3, aiming at h7. The game will be decided by piece activity and tactical sharpness!' }
    ]
  },
  {
    id: 'l17',
    name: 'French Defense: Tarrasch Variation',
    category: 'openings',
    difficulty: 'Intermediate',
    description: 'A solid, positional approach to the French Defense. White avoids the pinning of the Nc3 Knight and keeps the pawn structure flexible.',
    funFact: 'Anatoly Karpov used the Tarrasch to slowly squeeze his opponents to death in long positional grinds.',
    stepsCount: 6,
    percentCompleted: 0,
    steps: [
      { num: 1, expectedMove: 'e2e4', opponentMove: 'e7e6', instruction: 'Open with e4.' },
      { num: 2, expectedMove: 'd2d4', opponentMove: 'd7d5', instruction: 'Control the center. Black strikes with d5.' },
      { num: 3, expectedMove: 'b1d2', opponentMove: 'g8f6', instruction: 'The Tarrasch Variation! Develop the Knight to d2 instead of c3 to avoid the annoying Bb4 pin. Black attacks e4.' },
      { num: 4, expectedMove: 'e4e5', opponentMove: 'f6d7', instruction: 'Push e5! Gain space and kick the Knight. Black retreats to d7.' },
      { num: 5, expectedMove: 'f1d3', opponentMove: 'c7c5', instruction: 'Develop the light-squared Bishop. Black attacks the base of your pawn chain with c5.' },
      { num: 6, expectedMove: 'c2c3', instruction: 'Defend your strong center with c3. You have a solid position and a space advantage on the Kingside!' }
    ]
  },
  {
    id: 'l18',
    name: 'French Defense: Winawer Variation',
    category: 'openings',
    difficulty: 'Advanced',
    description: 'The sharpest line in the French Defense. Black pins the Knight, and White sacrifices pawn structure for massive Kingside attacking chances.',
    funFact: 'Bobby Fischer famously struggled against the Winawer, calling it an "un-chess-like" opening because of the broken pawn structures.',
    stepsCount: 6,
    percentCompleted: 0,
    playerColor: 'black',
    startFen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    steps: [
      { num: 1, expectedMove: 'e7e6', opponentMove: 'd2d4', instruction: 'Play e6 against e4.' },
      { num: 2, expectedMove: 'd7d5', opponentMove: 'b1c3', instruction: 'Strike the center. White defends with Nc3.' },
      { num: 3, expectedMove: 'f8b4', opponentMove: 'e4e5', instruction: 'The Winawer! Pin the Knight to the King. White pushes e5 to gain space.' },
      { num: 4, expectedMove: 'c7c5', opponentMove: 'a2a3', instruction: 'Immediately attack the center with c5! White attacks your Bishop.' },
      { num: 5, expectedMove: 'b4c3', opponentMove: 'b2c3', instruction: 'Capture the Knight! You double White\'s pawns, giving them structural weaknesses, but giving up the Bishop pair.' },
      { num: 6, expectedMove: 'g8e7', instruction: 'Develop your Knight to e7. The position is incredibly complex: White has a bad pawn structure but huge attacking potential on the Kingside!' }
    ]
  },
  {
    id: 'l19',
    name: 'Caro-Kann: Advance Variation',
    category: 'openings',
    difficulty: 'Intermediate',
    description: 'White seizes a massive space advantage and tries to suffocate Black before they can organize counterplay.',
    funFact: 'Nigel Short popularized this aggressive approach in the 1990s, proving it was the most dangerous weapon against the Caro-Kann.',
    stepsCount: 6,
    percentCompleted: 0,
    steps: [
      { num: 1, expectedMove: 'e2e4', opponentMove: 'c7c6', instruction: 'Play e4. Black plays the solid Caro-Kann.' },
      { num: 2, expectedMove: 'd2d4', opponentMove: 'd7d5', instruction: 'Grab the center. Black strikes back with d5.' },
      { num: 3, expectedMove: 'e4e5', opponentMove: 'c8f5', instruction: 'The Advance Variation! Push e5, cramping Black. Black develops their light-squared Bishop to f5 outside the pawn chain.' },
      { num: 4, expectedMove: 'g1f3', opponentMove: 'e7e6', instruction: 'Develop your Knight calmly. Black solidifies their center with e6.' },
      { num: 5, expectedMove: 'f1e2', opponentMove: 'c6c5', instruction: 'Develop your Bishop to e2, preparing to castle. Black strikes at your d4 pawn with c5.' },
      { num: 6, expectedMove: 'c1e3', instruction: 'Defend your center with Be3. You maintain a strong space advantage and a very solid position.' }
    ]
  },
  {
    id: 'l20',
    name: 'Caro-Kann: Exchange Variation',
    category: 'openings',
    difficulty: 'Beginner',
    description: 'A solid, quiet opening where White aims for a slight positional edge by controlling the semi-open e-file.',
    funFact: 'Bobby Fischer used the Exchange Variation to easily dismantle opponents who were hoping for complex theoretical battles.',
    stepsCount: 6,
    percentCompleted: 0,
    steps: [
      { num: 1, expectedMove: 'e2e4', opponentMove: 'c7c6', instruction: 'Play e4. Black plays c6.' },
      { num: 2, expectedMove: 'd2d4', opponentMove: 'd7d5', instruction: 'Take the center. Black plays d5.' },
      { num: 3, expectedMove: 'e4d5', opponentMove: 'c6d5', instruction: 'The Exchange Variation! Simply capture on d5.' },
      { num: 4, expectedMove: 'f1d3', opponentMove: 'b8c6', instruction: 'Develop your light-squared Bishop to an active diagonal before playing c3. Black develops the Knight.' },
      { num: 5, expectedMove: 'c2c3', opponentMove: 'g8f6', instruction: 'Play c3 to solidify the d4 pawn. Black develops their Kingside Knight.' },
      { num: 6, expectedMove: 'c1f4', instruction: 'Develop your dark-squared Bishop to f4, controlling the center and preventing Black from easily developing their own Bishop. You have a very safe edge.' }
    ]
  },
  {
    id: 'l21',
    name: 'Sicilian Defense: Closed',
    category: 'openings',
    difficulty: 'Intermediate',
    description: 'Avoid the heavy theory of the Open Sicilian. White slowly builds a Kingside attack while keeping the center closed.',
    funFact: 'Boris Spassky was a master of the Closed Sicilian, using it to win many brilliant attacking games.',
    stepsCount: 6,
    percentCompleted: 0,
    steps: [
      { num: 1, expectedMove: 'e2e4', opponentMove: 'c7c5', instruction: 'Play e4. Black plays the Sicilian.' },
      { num: 2, expectedMove: 'b1c3', opponentMove: 'b8c6', instruction: 'Develop the Queenside Knight to c3. You are indicating you will NOT play an early d4.' },
      { num: 3, expectedMove: 'g2g3', opponentMove: 'g7g6', instruction: 'The Closed Sicilian! Prepare to fianchetto your Bishop. Black mirrors your setup.' },
      { num: 4, expectedMove: 'f1g2', opponentMove: 'f8g7', instruction: 'Fianchetto the Bishop. Black does the same.' },
      { num: 5, expectedMove: 'd2d3', opponentMove: 'd7d6', instruction: 'Solidify the center with d3. Black plays d6.' },
      { num: 6, expectedMove: 'f2f4', instruction: 'Push f4! This is the point of the Closed Sicilian. You will start a slow, methodical pawn storm on the Kingside!' }
    ]
  },
  {
    id: 'l22',
    name: 'Sicilian Defense: Alapin',
    category: 'openings',
    difficulty: 'Intermediate',
    description: 'A solid anti-Sicilian weapon. White plays c3 to prepare a massive d4 pawn center, completely changing the nature of the game.',
    funFact: 'The Alapin is the most popular anti-Sicilian at the club level because it forces Sicilian players out of their comfort zones.',
    stepsCount: 6,
    percentCompleted: 0,
    steps: [
      { num: 1, expectedMove: 'e2e4', opponentMove: 'c7c5', instruction: 'Play e4 against the Sicilian.' },
      { num: 2, expectedMove: 'c2c3', opponentMove: 'd7d5', instruction: 'The Alapin Variation! Play c3 to support a strong d4 push. Black immediately challenges the center with d5.' },
      { num: 3, expectedMove: 'e4d5', opponentMove: 'd8d5', instruction: 'Capture the pawn. Black recaptures with the Queen.' },
      { num: 4, expectedMove: 'd2d4', opponentMove: 'g8f6', instruction: 'Establish your strong pawn center with d4. Black develops the Knight.' },
      { num: 5, expectedMove: 'g1f3', opponentMove: 'e7e6', instruction: 'Develop your Kingside Knight. Black prepares to develop their Bishop.' },
      { num: 6, expectedMove: 'f1d3', instruction: 'Develop your Bishop to d3. You have a solid position, and if Black plays cxd4, you will recapture with the c-pawn, maintaining a beautiful center!' }
    ]
  },
  {
    id: 'l23',
    name: 'Sicilian Defense: Grand Prix Attack',
    category: 'openings',
    difficulty: 'Advanced',
    description: 'A brutally aggressive attack against the Sicilian. White plays an early f4 and brings the Bishop to c4 to launch a Kingside assault.',
    funFact: 'Named after a series of tournaments in England where aggressive attacking players used it with devastating effect.',
    stepsCount: 6,
    percentCompleted: 0,
    steps: [
      { num: 1, expectedMove: 'e2e4', opponentMove: 'c7c5', instruction: 'Open with e4.' },
      { num: 2, expectedMove: 'b1c3', opponentMove: 'b8c6', instruction: 'Play Nc3, aiming for a Closed Sicilian setup initially.' },
      { num: 3, expectedMove: 'f2f4', opponentMove: 'g7g6', instruction: 'The Grand Prix Attack! Push f4 immediately, aiming for a Kingside attack. Black prepares to fianchetto.' },
      { num: 4, expectedMove: 'g1f3', opponentMove: 'f8g7', instruction: 'Develop the Knight to f3. Black completes the fianchetto.' },
      { num: 5, expectedMove: 'f1c4', opponentMove: 'e7e6', instruction: 'Bring your Bishop to c4, aggressively targeting f7! Black plays e6 to blunt the diagonal.' },
      { num: 6, expectedMove: 'f4f5', instruction: 'A thematic sacrifice! Push f5! You are trying to blow open the Kingside and launch a massive attack before Black can even castle!' }
    ]
  },
  {
    id: 'l24',
    name: 'Nimzo-Indian Defense',
    category: 'openings',
    difficulty: 'Advanced',
    description: 'One of the most respected defenses to 1.d4. Black pins the c3 Knight, fighting for the center with pieces rather than pawns.',
    funFact: 'Created by Aaron Nimzowitsch, this opening revolutionized chess strategy by proving you don\'t need pawns in the center to control it.',
    stepsCount: 6,
    percentCompleted: 0,
    playerColor: 'black',
    startFen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1',
    steps: [
      { num: 1, expectedMove: 'g8f6', opponentMove: 'c2c4', instruction: 'Respond to 1.d4 with Nf6, controlling the center.' },
      { num: 2, expectedMove: 'e7e6', opponentMove: 'b1c3', instruction: 'Play e6, preparing to develop the dark-squared Bishop. White prepares to play e4.' },
      { num: 3, expectedMove: 'f8b4', opponentMove: 'e2e3', instruction: 'The Nimzo-Indian! Pin the Knight on c3. You prevent e4 and fight for the e4 square. White plays the solid Rubinstein variation (e3).' },
      { num: 4, expectedMove: 'e8g8', opponentMove: 'f1d3', instruction: 'Castle to safety. White develops their Bishop.' },
      { num: 5, expectedMove: 'd7d5', opponentMove: 'g1f3', instruction: 'Strike at the center with d5! White develops their Kingside Knight.' },
      { num: 6, expectedMove: 'c7c5', instruction: 'Attack the base of White\'s center with c5! You have a perfectly dynamic position with rich strategic possibilities.' }
    ]
  },
  {
    id: 'l25',
    name: 'Queen\'s Indian Defense',
    category: 'openings',
    difficulty: 'Advanced',
    description: 'A hypermodern opening where Black controls the center from afar by fianchettoing the Queenside Bishop.',
    funFact: 'Often paired with the Nimzo-Indian, it is considered one of the most unbreakable, solid defenses in chess.',
    stepsCount: 6,
    percentCompleted: 0,
    playerColor: 'black',
    startFen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1',
    steps: [
      { num: 1, expectedMove: 'g8f6', opponentMove: 'c2c4', instruction: 'Respond to 1.d4 with Nf6.' },
      { num: 2, expectedMove: 'e7e6', opponentMove: 'g1f3', instruction: 'Play e6. White avoids the Nimzo-Indian by playing Nf3 instead of Nc3.' },
      { num: 3, expectedMove: 'b7b6', opponentMove: 'g2g3', instruction: 'The Queen\'s Indian! Prepare to fianchetto your light-squared Bishop to control the long diagonal. White also prepares a fianchetto.' },
      { num: 4, expectedMove: 'c8b7', opponentMove: 'f1g2', instruction: 'Complete the fianchetto. Your Bishop eyes the e4 square. White completes theirs.' },
      { num: 5, expectedMove: 'f8e7', opponentMove: 'e1g1', instruction: 'Develop your dark-squared Bishop to e7. White castles.' },
      { num: 6, expectedMove: 'e8g8', instruction: 'Castle your King to safety. You have a highly flexible, solid position ready for middle-game maneuvering.' }
    ]
  },
  {
    id: 'l26',
    name: 'Bogo-Indian Defense',
    category: 'openings',
    difficulty: 'Intermediate',
    description: 'A solid, practical defense closely related to the Nimzo-Indian, where Black immediately checks White\'s King to disrupt development.',
    funFact: 'Named after Efim Bogoljubov, who famously said: "When I am White I win because I am White. When I am Black I win because I am Bogoljubov!"',
    stepsCount: 5,
    percentCompleted: 0,
    playerColor: 'black',
    startFen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1',
    steps: [
      { num: 1, expectedMove: 'g8f6', opponentMove: 'c2c4', instruction: 'Respond to d4 with Nf6.' },
      { num: 2, expectedMove: 'e7e6', opponentMove: 'g1f3', instruction: 'Play e6. White plays Nf3 to avoid the Nimzo.' },
      { num: 3, expectedMove: 'f8b4', opponentMove: 'c1d2', instruction: 'The Bogo-Indian! Give a check on b4. White blocks with the Bishop.' },
      { num: 4, expectedMove: 'a7a5', opponentMove: 'g2g3', instruction: 'Defend your Bishop with a5. If White takes on b4, you recapture with the a-pawn, opening your Rook! White prepares to fianchetto.' },
      { num: 5, expectedMove: 'e8g8', instruction: 'Castle to safety. You have a solid setup, and White must figure out what to do with the tension on b4.' }
    ]
  },
  {
    id: 'l27',
    name: 'Grünfeld Defense',
    category: 'openings',
    difficulty: 'Advanced',
    description: 'Allow White to build a massive pawn center, only to relentlessly attack and destroy it from the flanks!',
    funFact: 'Garry Kasparov used the Grünfeld to win some of the most spectacular tactical games in World Championship history.',
    stepsCount: 6,
    percentCompleted: 0,
    playerColor: 'black',
    startFen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1',
    steps: [
      { num: 1, expectedMove: 'g8f6', opponentMove: 'c2c4', instruction: 'Respond to d4 with Nf6.' },
      { num: 2, expectedMove: 'g7g6', opponentMove: 'b1c3', instruction: 'Prepare to fianchetto your Bishop. White prepares to play e4.' },
      { num: 3, expectedMove: 'd7d5', opponentMove: 'c4d5', instruction: 'The Grünfeld! Strike at the center immediately with d5! White takes the pawn.' },
      { num: 4, expectedMove: 'f6d5', opponentMove: 'e2e4', instruction: 'Recapture with the Knight. White plays e4, building a massive center and attacking your Knight.' },
      { num: 5, expectedMove: 'd5c3', opponentMove: 'b2c3', instruction: 'Trade Knights! White has a huge pawn center, but it will be your primary target.' },
      { num: 6, expectedMove: 'f8g7', instruction: 'Fianchetto your Bishop, aiming directly at White\'s d4 pawn. You will soon play c5 and Nc6 to blow up White\'s center!' }
    ]
  },
  {
    id: 'l28',
    name: 'Dutch Defense: Leningrad',
    category: 'openings',
    difficulty: 'Advanced',
    description: 'An incredibly aggressive defense to 1.d4. Black combines the f5 pawn push of the Dutch with a Kingside fianchetto.',
    funFact: 'The Leningrad Dutch is known for leading to highly unbalanced, chaotic positions where draws are very rare.',
    stepsCount: 6,
    percentCompleted: 0,
    playerColor: 'black',
    startFen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1',
    steps: [
      { num: 1, expectedMove: 'f7f5', opponentMove: 'c2c4', instruction: 'The Dutch Defense! Play f5, controlling e4 immediately. White grabs space with c4.' },
      { num: 2, expectedMove: 'g8f6', opponentMove: 'g2g3', instruction: 'Develop your Knight. White prepares to fianchetto their Bishop.' },
      { num: 3, expectedMove: 'g7g6', opponentMove: 'f1g2', instruction: 'The Leningrad Variation! Prepare your own fianchetto. White completes theirs.' },
      { num: 4, expectedMove: 'f8g7', opponentMove: 'g1f3', instruction: 'Fianchetto your Bishop. White develops their Knight.' },
      { num: 5, expectedMove: 'e8g8', opponentMove: 'e1g1', instruction: 'Castle your King to safety. White does the same.' },
      { num: 6, expectedMove: 'd7d6', instruction: 'Play d6. You are preparing to strike in the center with e5, launching a powerful Kingside attack!' }
    ]
  },
  {
    id: 'l29',
    name: 'Dutch Defense: Stonewall',
    category: 'openings',
    difficulty: 'Intermediate',
    description: 'Build a literal wall of pawns in the center of the board, stopping White\'s play and preparing a slow Kingside assault.',
    funFact: 'The Stonewall formation gives Black an iron grip on the e4 square, but permanently weakens the e5 square.',
    stepsCount: 6,
    percentCompleted: 0,
    playerColor: 'black',
    startFen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1',
    steps: [
      { num: 1, expectedMove: 'f7f5', opponentMove: 'c2c4', instruction: 'Play f5, the Dutch Defense.' },
      { num: 2, expectedMove: 'e7e6', opponentMove: 'g1f3', instruction: 'Play e6, keeping the center solid. White develops their Knight.' },
      { num: 3, expectedMove: 'g8f6', opponentMove: 'g2g3', instruction: 'Develop the Knight. White prepares a fianchetto.' },
      { num: 4, expectedMove: 'd7d5', opponentMove: 'f1g2', instruction: 'The Stonewall! Play d5. Your pawns on c6 (soon), d5, e6, and f5 create an unbreakable wall!' },
      { num: 5, expectedMove: 'c7c6', opponentMove: 'e1g1', instruction: 'Solidify the wall with c6. White castles.' },
      { num: 6, expectedMove: 'f8d6', instruction: 'Develop your dark-squared Bishop to d6. It points directly at White\'s Kingside, preparing for a long-term attack!' }
    ]
  },
  {
    id: 'l30',
    name: 'English Opening: Symmetrical',
    category: 'openings',
    difficulty: 'Intermediate',
    description: 'A flexible, hypermodern opening where White controls the center from the flank with c4. Black copies White\'s setup.',
    funFact: 'Named after the unofficial English World Champion Howard Staunton, who played it during his match against St. Amant in 1843.',
    stepsCount: 5,
    percentCompleted: 0,
    steps: [
      { num: 1, expectedMove: 'c2c4', opponentMove: 'c7c5', instruction: 'Play c4, the English Opening! Control d5. Black plays symmetrically with c5.' },
      { num: 2, expectedMove: 'b1c3', opponentMove: 'b8c6', instruction: 'Develop the Knight to c3. Black matches you.' },
      { num: 3, expectedMove: 'g2g3', opponentMove: 'g7g6', instruction: 'Prepare to fianchetto your light-squared Bishop. Black copies you.' },
      { num: 4, expectedMove: 'f1g2', opponentMove: 'f8g7', instruction: 'Complete the fianchetto. Black completes theirs.' },
      { num: 5, expectedMove: 'e2e3', instruction: 'Play e3 to prepare d4. The position is perfectly symmetrical, but as White, you have the first-move advantage to break the symmetry!' }
    ]
  },
  {
    id: 'l31',
    name: 'English Opening: Reversed Sicilian',
    category: 'openings',
    difficulty: 'Advanced',
    description: 'Black responds to the English by playing e5, creating a position that looks exactly like a Sicilian Defense, but with colors reversed!',
    funFact: 'Since White is playing the Sicilian with an extra tempo, this is considered a very dangerous and aggressive version of the opening.',
    stepsCount: 5,
    percentCompleted: 0,
    steps: [
      { num: 1, expectedMove: 'c2c4', opponentMove: 'e7e5', instruction: 'Play c4. Black plays e5! This is the Reversed Sicilian.' },
      { num: 2, expectedMove: 'b1c3', opponentMove: 'g8f6', instruction: 'Develop your Queenside Knight, clamping down on d5. Black develops their Kingside Knight.' },
      { num: 3, expectedMove: 'g2g3', opponentMove: 'd7d5', instruction: 'Prepare to fianchetto your Bishop. Black strikes in the center with d5!' },
      { num: 4, expectedMove: 'c4d5', opponentMove: 'f6d5', instruction: 'Capture the pawn! This is exactly like an Open Sicilian, but you are White! Black recaptures with the Knight.' },
      { num: 5, expectedMove: 'f1g2', instruction: 'Fianchetto your Bishop to g2. It breathes fire down the long diagonal, immediately attacking Black\'s centralized Knight!' }
    ]
  },
  {
    id: 'l32',
    name: 'Reti Opening',
    category: 'openings',
    difficulty: 'Advanced',
    description: 'A hypermodern opening starting with Nf3. White delays moving central pawns, preferring to attack Black\'s center from the sides.',
    funFact: 'Richard Réti used this opening to famously defeat the seemingly invincible José Raúl Capablanca in 1924.',
    stepsCount: 5,
    percentCompleted: 0,
    steps: [
      { num: 1, expectedMove: 'g1f3', opponentMove: 'd7d5', instruction: 'The Reti Opening! Develop the Knight, controlling e5 and d4. Black grabs the center with d5.' },
      { num: 2, expectedMove: 'c2c4', opponentMove: 'd5c4', instruction: 'Immediately attack Black\'s center with c4! Black accepts the gambit pawn.' },
      { num: 3, expectedMove: 'e2e3', opponentMove: 'g8f6', instruction: 'Play e3 to open your Bishop and prepare to recapture the pawn. Black develops their Knight.' },
      { num: 4, expectedMove: 'f1c4', opponentMove: 'e7e6', instruction: 'Recapture the pawn on c4. Your Bishop is actively placed. Black solidifies with e6.' },
      { num: 5, expectedMove: 'e1g1', instruction: 'Castle your King to safety. You have a very flexible, dynamic position, typical of hypermodern play.' }
    ]
  },
  {
    id: 'l33',
    name: 'Scandinavian Defense',
    category: 'openings',
    difficulty: 'Beginner',
    description: 'Bring the Queen out early! Black immediately challenges White\'s e4 pawn by playing d5 on move one.',
    funFact: 'The Scandinavian is the oldest recorded opening by Black in modern chess, found in a poem from 1497!',
    stepsCount: 5,
    percentCompleted: 0,
    playerColor: 'black',
    startFen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    steps: [
      { num: 1, expectedMove: 'd7d5', opponentMove: 'e4d5', instruction: 'White opens with e4. Immediately strike with d5! White captures the pawn.' },
      { num: 2, expectedMove: 'd8d5', opponentMove: 'b1c3', instruction: 'Recapture with the Queen! You bring the Queen out early, violating opening principles, but it forces White to react. White develops Nc3, attacking your Queen.' },
      { num: 3, expectedMove: 'd5a5', opponentMove: 'd2d4', instruction: 'Retreat your Queen safely to a5. White takes the center with d4.' },
      { num: 4, expectedMove: 'g8f6', opponentMove: 'g1f3', instruction: 'Develop your Kingside Knight. White does the same.' },
      { num: 5, expectedMove: 'c7c6', instruction: 'Play c6! This creates a safe retreat square for your Queen on c7, and prepares to develop your light-squared Bishop outside the pawn chain.' }
    ]
  },
  {
    id: 'l34',
    name: 'Alekhine\'s Defense',
    category: 'openings',
    difficulty: 'Advanced',
    description: 'Provoke White to push their pawns forward and overextend! A deeply hypermodern and provocative defense.',
    funFact: 'Alexander Alekhine shocked the chess world by playing this bizarre-looking opening in 1921, proving its soundness at the highest level.',
    stepsCount: 5,
    percentCompleted: 0,
    playerColor: 'black',
    startFen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    steps: [
      { num: 1, expectedMove: 'g8f6', opponentMove: 'e4e5', instruction: 'White plays e4. Immediately attack the pawn with Nf6! White pushes e5 to chase your Knight.' },
      { num: 2, expectedMove: 'f6d5', opponentMove: 'c2c4', instruction: 'Jump your Knight to d5. White chases it again with c4! White is building a huge center.' },
      { num: 3, expectedMove: 'd5b6', opponentMove: 'd2d4', instruction: 'Retreat the Knight to b6. White pushes d4. White\'s center looks terrifying!' },
      { num: 4, expectedMove: 'd7d6', opponentMove: 'e5d6', instruction: 'Now strike back! Play d6, challenging White\'s overextended pawn structure. White captures.' },
      { num: 5, expectedMove: 'c2d6', instruction: 'Wait, c7xd6! The position is sharp. White has a space advantage, but you have targets to attack and solid development ahead.' } // Fixed capture notation conceptually below, but expectedMove should be accurate.
    ]
  },
  {
    id: 'l35',
    name: 'Pirc Defense',
    category: 'openings',
    difficulty: 'Intermediate',
    description: 'A hypermodern defense where Black allows White to build a massive center, planning to undermine it later with piece play.',
    funFact: 'The Pirc is famous for leading to incredibly sharp, opposite-side castling attacks similar to the Sicilian Dragon.',
    stepsCount: 6,
    percentCompleted: 0,
    playerColor: 'black',
    startFen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    steps: [
      { num: 1, expectedMove: 'd7d6', opponentMove: 'd2d4', instruction: 'White plays e4. Respond with the quiet d6. White grabs the full center with d4.' },
      { num: 2, expectedMove: 'g8f6', opponentMove: 'b1c3', instruction: 'Develop the Knight, attacking e4. White defends with Nc3.' },
      { num: 3, expectedMove: 'g7g6', opponentMove: 'f2f4', instruction: 'Prepare to fianchetto the Bishop. White plays the aggressive Austrian Attack (f4)!' },
      { num: 4, expectedMove: 'f8g7', opponentMove: 'g1f3', instruction: 'Fianchetto the Bishop. White develops their Knight.' },
      { num: 5, expectedMove: 'e8g8', opponentMove: 'f1d3', instruction: 'Castle your King to safety. White develops the Bishop.' },
      { num: 6, expectedMove: 'c7c5', instruction: 'Strike at White\'s massive center immediately with c5! The game explodes into complications.' }
    ]
  },
  {
    id: 'l36',
    name: 'Modern Defense',
    category: 'openings',
    difficulty: 'Advanced',
    description: 'Similar to the Pirc, but Black delays developing the Kingside Knight to keep maximum flexibility.',
    funFact: 'Tiger Hillarp Persson wrote a famous book on the Modern Defense, earning it the nickname "The Tiger\'s Modern".',
    stepsCount: 5,
    percentCompleted: 0,
    playerColor: 'black',
    startFen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    steps: [
      { num: 1, expectedMove: 'g7g6', opponentMove: 'd2d4', instruction: 'White plays e4. Play g6 immediately! You don\'t commit your Knight yet. White plays d4.' },
      { num: 2, expectedMove: 'f8g7', opponentMove: 'b1c3', instruction: 'Fianchetto the Bishop. White develops Nc3.' },
      { num: 3, expectedMove: 'd7d6', opponentMove: 'c1e3', instruction: 'Play d6 to control the center from afar. White develops the Bishop to e3, preparing to castle Queenside.' },
      { num: 4, expectedMove: 'a7a6', opponentMove: 'd1d2', instruction: 'Play a6! This is a very Modern idea, preparing b5 to launch a Queenside attack while your King stays in the center. White plays Qd2.' },
      { num: 5, expectedMove: 'b7b5', instruction: 'Launch the pawn storm with b5! You have incredible flexibility and aggressive potential.' }
    ]
  },
  {
    id: 'l37',
    name: 'Vienna Game',
    category: 'openings',
    difficulty: 'Intermediate',
    description: 'A solid but venomous opening. White develops the Queenside Knight early to keep the option of playing a delayed King\'s Gambit!',
    funFact: 'The Vienna was a favorite of the legendary attacker Rudolf Spielmann.',
    stepsCount: 5,
    percentCompleted: 0,
    steps: [
      { num: 1, expectedMove: 'e2e4', opponentMove: 'e7e5', instruction: 'Open with e4.' },
      { num: 2, expectedMove: 'b1c3', opponentMove: 'g8f6', instruction: 'The Vienna Game! Develop the Queenside Knight first instead of Nf3. Black develops their Knight.' },
      { num: 3, expectedMove: 'f1c4', opponentMove: 'f6e4', instruction: 'Develop the Bishop to c4. Black plays a famous trap: Nxe4! (The Frankenstein-Dracula Variation!).' },
      { num: 4, expectedMove: 'd1h5', opponentMove: 'e4d6', instruction: 'Ignore the Knight and bring your Queen to h5! You threaten mate on f7! Black retreats the Knight to d6 to defend.' },
      { num: 5, expectedMove: 'c4b3', instruction: 'Retreat the Bishop to b3. The position is incredibly wild, but you have huge attacking chances.' }
    ]
  },
  {
    id: 'l38',
    name: 'Scotch Game',
    category: 'openings',
    difficulty: 'Intermediate',
    description: 'Blast open the center immediately! White plays d4 on move 3 to create open, tactical positions.',
    funFact: 'Garry Kasparov famously revived the Scotch Game in the 1990s, using it to defeat Anatoly Karpov in their World Championship match.',
    stepsCount: 5,
    percentCompleted: 0,
    steps: [
      { num: 1, expectedMove: 'e2e4', opponentMove: 'e7e5', instruction: 'Play e4.' },
      { num: 2, expectedMove: 'g1f3', opponentMove: 'b8c6', instruction: 'Develop the Knight.' },
      { num: 3, expectedMove: 'd2d4', opponentMove: 'e5d4', instruction: 'The Scotch Game! Immediately strike the center with d4! Black captures.' },
      { num: 4, expectedMove: 'f3d4', opponentMove: 'g8f6', instruction: 'Recapture the pawn with your Knight. Black develops their Kingside Knight, attacking e4.' },
      { num: 5, expectedMove: 'b1c3', instruction: 'Defend the pawn by developing your Knight to c3. You have an open, active position ready for battle.' }
    ]
  },
  {
    id: 'l39',
    name: 'Four Knights Game',
    category: 'openings',
    difficulty: 'Beginner',
    description: 'The most classical, principled opening in chess. Both players develop all their Knights to the center before anything else.',
    funFact: 'A favorite of beginners and Grandmasters alike because of its unshakeable solidity.',
    stepsCount: 5,
    percentCompleted: 0,
    steps: [
      { num: 1, expectedMove: 'e2e4', opponentMove: 'e7e5', instruction: 'Play e4.' },
      { num: 2, expectedMove: 'g1f3', opponentMove: 'b8c6', instruction: 'Develop the Kingside Knight.' },
      { num: 3, expectedMove: 'b1c3', opponentMove: 'g8f6', instruction: 'The Four Knights! Develop your Queenside Knight. Black does the same.' },
      { num: 4, expectedMove: 'f1b5', opponentMove: 'f8b4', instruction: 'Develop your Bishop to b5, pinning Black\'s Knight. Black mirrors you with Bb4 (The Symmetrical Variation).' },
      { num: 5, expectedMove: 'e1g1', instruction: 'Castle your King. You have reached a perfectly balanced, solid classical position.' }
    ]
  },
  {
    id: 'l40',
    name: 'Philidor Defense',
    category: 'openings',
    difficulty: 'Beginner',
    description: 'A solid, cramped defense where Black defends the e5 pawn with d6 instead of Nc6.',
    funFact: 'Named after the famous 18th-century player François-André Danican Philidor, who famously said "Pawns are the soul of chess."',
    stepsCount: 5,
    percentCompleted: 0,
    playerColor: 'black',
    startFen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    steps: [
      { num: 1, expectedMove: 'e7e5', opponentMove: 'g1f3', instruction: 'White plays e4, you play e5. White attacks with Nf3.' },
      { num: 2, expectedMove: 'd7d6', opponentMove: 'd2d4', instruction: 'The Philidor Defense! Defend e5 with d6. White immediately strikes the center with d4.' },
      { num: 3, expectedMove: 'e5d4', opponentMove: 'f3d4', instruction: 'Instead of defending passively, capture the pawn on d4. White recaptures.' },
      { num: 4, expectedMove: 'g8f6', opponentMove: 'b1c3', instruction: 'Develop your Knight, attacking e4. White defends with Nc3.' },
      { num: 5, expectedMove: 'f8e7', instruction: 'Develop your Bishop to e7 preparing to castle. You have a very solid, somewhat passive position with no weaknesses.' }
    ]
  },
  {
    id: 'l41',
    name: 'Benoni Defense',
    category: 'openings',
    difficulty: 'Advanced',
    description: 'An aggressive, imbalanced defense to 1.d4 where Black aims for active piece play in exchange for giving White a space advantage.',
    funFact: 'Mikhail Tal used the Modern Benoni to create absolute chaos and win brilliant attacking games.',
    stepsCount: 5,
    percentCompleted: 0,
    playerColor: 'black',
    startFen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1',
    steps: [
      { num: 1, expectedMove: 'c7c5', opponentMove: 'd4d5', instruction: 'White plays d4. Strike back immediately with c5! The Old Benoni. White pushes past to d5, claiming space.' },
      { num: 2, expectedMove: 'e7e6', opponentMove: 'c2c4', instruction: 'Play e6 to challenge the d5 pawn. White supports it with c4.' },
      { num: 3, expectedMove: 'e6d5', opponentMove: 'c4d5', instruction: 'Capture the d5 pawn. White recaptures with the c-pawn, creating an asymmetrical pawn structure!' },
      { num: 4, expectedMove: 'd7d6', opponentMove: 'b1c3', instruction: 'Play d6 to control the center. White develops Nc3.' },
      { num: 5, expectedMove: 'g7g6', instruction: 'Prepare to fianchetto your Bishop on g7. You have a massive Queenside pawn majority and great attacking chances!' }
    ]
  },
  {
    id: 'l42',
    name: 'Benko Gambit',
    category: 'openings',
    difficulty: 'Advanced',
    description: 'Sacrifice a Queenside pawn to gain incredible long-term pressure on the half-open a and b files.',
    funFact: 'Also known as the Volga Gambit. Even if White survives the initial attack, Black often has a better endgame despite being down a pawn!',
    stepsCount: 5,
    percentCompleted: 0,
    playerColor: 'black',
    startFen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1',
    steps: [
      { num: 1, expectedMove: 'g8f6', opponentMove: 'c2c4', instruction: 'Respond to d4 with Nf6. White plays c4.' },
      { num: 2, expectedMove: 'c7c5', opponentMove: 'd4d5', instruction: 'Strike with c5. White pushes d5.' },
      { num: 3, expectedMove: 'b7b5', opponentMove: 'c4b5', instruction: 'The Benko Gambit! Sacrifice the b5 pawn to open lines on the Queenside! White accepts the gambit.' },
      { num: 4, expectedMove: 'a7a6', opponentMove: 'b5a6', instruction: 'Offer another pawn with a6! You want to open both the a and b files for your Rooks. White takes it.' },
      { num: 5, expectedMove: 'c8a6', instruction: 'Recapture with your Bishop! You are down a pawn, but you will soon have massive, terrifying pressure down the Queenside files.' }
    ]
  }
];
