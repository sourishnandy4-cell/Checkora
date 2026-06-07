import { Chess } from 'chess.js';

try {
  const chess = new Chess();
  chess.move({ from: 'e2', to: 'e4', promotion: 'q' });
  console.log("Move e2e4 with promotion: 'q' worked!");
} catch (e) {
  console.error("ERROR e2e4:", e.message);
}

try {
  const chess = new Chess('r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4');
  chess.move({ from: 'c2', to: 'c3', promotion: 'q' });
  console.log("Move c2c3 with promotion: 'q' worked!");
} catch (e) {
  console.error("ERROR c2c3:", e.message);
}
