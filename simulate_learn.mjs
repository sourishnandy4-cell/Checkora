import { Chess } from 'chess.js';

const lessonFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
let chess = new Chess(lessonFen);

const steps = [
  { num: 1, expectedMove: 'e2e4', opponentMove: 'e7e5' },
  { num: 2, expectedMove: 'g1f3', opponentMove: 'b8c6' },
  { num: 3, expectedMove: 'f1c4', opponentMove: 'f8c5' },
  { num: 4, expectedMove: 'c2c3', opponentMove: 'g8f6' },
  { num: 5, expectedMove: 'd2d3', opponentMove: 'd7d6' },
  { num: 6, expectedMove: 'e1g1', opponentMove: 'a7a6' },
  { num: 7, expectedMove: 'b1d2', opponentMove: 'c5a7' },
  { num: 8, expectedMove: 'f1e1', opponentMove: 'e8g8' },
  { num: 9, expectedMove: 'd2f1' }
];

try {
  for (const step of steps) {
    console.log(`\n--- Step ${step.num} ---`);
    
    // User move
    const userFrom = step.expectedMove.slice(0, 2);
    const userTo = step.expectedMove.slice(2, 4);
    const userPromo = step.expectedMove.length > 4 ? step.expectedMove[4] : undefined;
    
    console.log(`User plays: ${userFrom}-${userTo}`);
    const userRes = chess.move({ from: userFrom, to: userTo, promotion: userPromo });
    if (!userRes) throw new Error(`User move ${step.expectedMove} failed! FEN: ${chess.fen()}`);
    console.log("FEN after User:", chess.fen());

    // Opponent move
    if (step.opponentMove) {
      const oppFrom = step.opponentMove.slice(0, 2);
      const oppTo = step.opponentMove.slice(2, 4);
      const oppPromo = step.opponentMove.length > 4 ? step.opponentMove[4] : undefined;
      
      console.log(`Opponent plays: ${oppFrom}-${oppTo}`);
      const oppRes = chess.move({ from: oppFrom, to: oppTo, promotion: oppPromo });
      if (!oppRes) throw new Error(`Opponent move ${step.opponentMove} failed! FEN: ${chess.fen()}`);
      console.log("FEN after Opponent:", chess.fen());
    }
  }
  console.log("\nALL MOVES SUCCEEDED!");
} catch (e) {
  console.error("ERROR:", e.message);
}
