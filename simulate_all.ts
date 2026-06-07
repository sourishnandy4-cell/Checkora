import { Chess } from 'chess.js';
import { LESSON_DATABASE } from './src/data/lessons';

for (const lesson of LESSON_DATABASE) {
  console.log(`\nTesting Lesson: ${lesson.name}`);
  const fen = lesson.startFen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  let chess = new Chess(fen);
  let failed = false;

  for (const step of lesson.steps) {
    try {
      const userFrom = step.expectedMove.slice(0, 2);
      const userTo = step.expectedMove.slice(2, 4);
      const userPromo = step.expectedMove.length > 4 ? step.expectedMove[4] : undefined;
      
      const userRes = chess.move({ from: userFrom, to: userTo, promotion: userPromo });
      if (!userRes) throw new Error(`User move ${step.expectedMove} failed! FEN: ${chess.fen()}`);
      
      if (step.opponentMove) {
        const oppFrom = step.opponentMove.slice(0, 2);
        const oppTo = step.opponentMove.slice(2, 4);
        const oppPromo = step.opponentMove.length > 4 ? step.opponentMove[4] : undefined;
        
        const oppRes = chess.move({ from: oppFrom, to: oppTo, promotion: oppPromo });
        if (!oppRes) throw new Error(`Opponent move ${step.opponentMove} failed! FEN: ${chess.fen()}`);
      }
    } catch (e) {
      console.error(`  -> Failed at step ${step.num}: ${e.message}`);
      failed = true;
      break;
    }
  }
  
  if (!failed) {
    console.log(`  -> SUCCESS!`);
  }
}
