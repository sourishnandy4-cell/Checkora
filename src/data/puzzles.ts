export interface TacticalPuzzle {
  id: string;
  fen: string;
  solution: string; // e.g. "h5f7" or "c3b5"
  theme: string;
  difficulty: number; // 1-5 stars
  playerColor: 'white' | 'black';
  instruction: string;
  successMessage: string;
}

export const LOCAL_PUZZLES: TacticalPuzzle[] = [
  {
    id: 'p1',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
    solution: 'h5f7',
    theme: 'Checkmate',
    difficulty: 1,
    playerColor: 'white',
    instruction: 'Find the crushing blow. White to move - Mate in 1.',
    successMessage: 'Brilliant! Scholar\'s Mate executed successfully.'
  },
  {
    id: 'p2',
    fen: 'r1bqk2r/ppp2ppp/2n5/1B1pp3/4n3/2P2N2/PP1P1PPP/RNBQ1RK1 b kq - 0 6',
    solution: 'e4d6',
    theme: 'Pin',
    difficulty: 2,
    playerColor: 'black',
    instruction: 'White\'s bishop is pinning your knight. Find the retreat that saves material.',
    successMessage: 'Great work! Defending the pin and attacking the bishop.'
  },
  {
    id: 'p3',
    fen: 'rn1qkbnr/ppp2ppp/3p4/4p3/2B1P1b1/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 4',
    solution: 'c4f7',
    theme: 'Fork',
    difficulty: 3,
    playerColor: 'white',
    instruction: 'A classic tactical sacrifice. Draw the king out and win a bishop.',
    successMessage: 'Stunning! Bxf7+ draws the king out, setting up a winning knight fork!'
  },
  {
    id: 'p4',
    fen: 'r3kb1r/ppp1pppp/2n5/3q4/3P2b1/5N2/PPP1BPPP/R1BQK2R b KQkq - 2 7',
    solution: 'g4f3',
    theme: 'Removal of Defender',
    difficulty: 3,
    playerColor: 'black',
    instruction: 'Eliminate white\'s key defender to secure material.',
    successMessage: 'Excellent. Removing the knight key defender!'
  },
  {
    id: 'p5',
    fen: 'r1bqkb1r/ppp2ppp/2n5/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5',
    solution: 'c4f7',
    theme: 'Sacrifice',
    difficulty: 4,
    playerColor: 'white',
    instruction: 'Attack f7. Sacrificing the bishop to disrupt the black king.',
    successMessage: 'Correct! Sacrificing to ruin black\'s castling rights!'
  },
  {
    id: 'p6',
    fen: 'r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4',
    solution: 'e8e7',
    theme: 'Escape',
    difficulty: 2,
    playerColor: 'black',
    instruction: 'You are in check. Escape the threat with the only legal square.',
    successMessage: 'Yes! King safely stepped away from the mate.'
  }
];
