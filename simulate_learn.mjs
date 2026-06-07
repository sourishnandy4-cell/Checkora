import { Chess } from 'chess.js';

const lessonFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const tempChess = new Chess(lessonFen);

console.log("Initial FEN:", tempChess.fen());

// Step 1: User plays e2e4
tempChess.move({ from: 'e2', to: 'e4', promotion: 'q' });
console.log("After User e2e4 FEN:", tempChess.fen());

// Effect runs
const effectChess = new Chess(tempChess.fen());
effectChess.move({ from: 'e7', to: 'e5' });
console.log("After Opponent e7e5 FEN:", effectChess.fen());

// Step 2: User plays g1f3
effectChess.move({ from: 'g1', to: 'f3', promotion: 'q' });
console.log("After User g1f3 FEN:", effectChess.fen());

// Effect runs
const effectChess2 = new Chess(effectChess.fen());
effectChess2.move({ from: 'b8', to: 'c6' });
console.log("After Opponent b8c6 FEN:", effectChess2.fen());

console.log("All moves succeeded!");
