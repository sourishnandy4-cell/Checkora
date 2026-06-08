import fs from 'fs';
import { Chess } from 'chess.js';

async function fetchPuzzles() {
  const TOTAL = 3000;
  const BATCH = 100;
  let puzzles = [];

  for (let offset = 0; offset < TOTAL; offset += BATCH) {
    console.log(`Fetching offset ${offset}...`);
    const res = await fetch(`https://datasets-server.huggingface.co/rows?dataset=Lichess%2Fchess-puzzles&config=default&split=train&offset=${offset}&length=${BATCH}`);
    const json = await res.json();
    if (!json.rows) break;

    for (const rowObj of json.rows) {
      const row = rowObj.row;
      const id = row.PuzzleId;
      const origFen = row.FEN;
      const moves = row.Moves.split(' ');
      const themes = row.Themes || [];
      const rating = row.Rating || 1500;

      // Make the first move
      const chess = new Chess(origFen);
      try {
        const firstMoveUci = moves[0];
        const from = firstMoveUci.slice(0, 2);
        const to = firstMoveUci.slice(2, 4);
        const promo = firstMoveUci.length > 4 ? firstMoveUci[4] : undefined;
        chess.move({ from, to, promotion: promo });
      } catch (e) {
        continue;
      }

      const fen = chess.fen();
      const solution = moves[1];
      const playerColor = chess.turn() === 'w' ? 'white' : 'black';
      
      let theme = themes.length > 0 ? themes[0] : 'Tactics';
      theme = theme.charAt(0).toUpperCase() + theme.slice(1);

      let difficulty = 3;
      if (rating < 1200) difficulty = 1;
      else if (rating < 1600) difficulty = 2;
      else if (rating < 2000) difficulty = 3;
      else if (rating < 2400) difficulty = 4;
      else difficulty = 5;

      puzzles.push({
        id,
        fen,
        solution,
        theme,
        difficulty,
        playerColor,
        instruction: `Find the best move. (${theme})`,
        successMessage: `Excellent! You found the solution.`
      });
    }
  }

  fs.writeFileSync('src/data/puzzles.json', JSON.stringify(puzzles, null, 2));
  console.log(`Saved ${puzzles.length} puzzles to src/data/puzzles.json`);
}

fetchPuzzles().catch(console.error);
