import { Chess } from 'chess.js';

try {
  const chess = new Chess();
  chess.move({ from: 'e2', to: 'e4', promotion: undefined });
  console.log("Move e2e4 with promotion: undefined worked!");
} catch (e) {
  console.error("ERROR e2e4:", e.message);
}
