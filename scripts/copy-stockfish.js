const fs = require('fs');
const path = require('path');
const https = require('https');

const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const localJs = path.join(__dirname, '../node_modules/stockfish/src/stockfish.js');
const localWasm = path.join(__dirname, '../node_modules/stockfish/src/stockfish.wasm');

const destJs = path.join(publicDir, 'stockfish.js');
const destWasm = path.join(publicDir, 'stockfish.wasm');

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(true));
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  if (fs.existsSync(localJs) && fs.existsSync(localWasm)) {
    try {
      fs.copyFileSync(localJs, destJs);
      fs.copyFileSync(localWasm, destWasm);
      console.log('Successfully copied Stockfish assets from node_modules!');
      return;
    } catch (e) {
      console.warn('Local copy failed, resorting to download:', e);
    }
  }

  console.log('Stockfish node_modules not found or uncopied. Downloading stable WASM from UNPKG...');
  try {
    await downloadFile('https://unpkg.com/stockfish@10.0.2/src/stockfish.js', destJs);
    console.log('Downloaded stockfish.js successfully.');
    await downloadFile('https://unpkg.com/stockfish@10.0.2/src/stockfish.wasm', destWasm);
    console.log('Downloaded stockfish.wasm successfully.');
    console.log('Stockfish asset setup complete.');
  } catch (err) {
    console.error('Error during Stockfish CDN download:', err);
  }
}

run();
