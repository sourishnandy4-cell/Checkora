import fs from 'fs';

const playPath = 'c:/Projects/Checkora/src/pages/Play.tsx';
let playContent = fs.readFileSync(playPath, 'utf-8');

playContent = playContent.replace(
  "const allBots = [...BOTS, ...customBots];\n  const filteredBots = allBots.filter(bot => {",
  "const filteredBots = BOTS.filter(bot => {"
);

playContent = playContent.replace(
  "const allBots = [...BOTS, ...customBots];\r\n  const filteredBots = allBots.filter(bot => {",
  "const filteredBots = BOTS.filter(bot => {"
);

const modalStartIndex = playContent.indexOf('{/* ANTIGRAVITY EVALUATION MODAL */}');
if (modalStartIndex !== -1) {
  const modalEndIndex = playContent.indexOf('  );\n};', modalStartIndex);
  if (modalEndIndex !== -1) {
    playContent = playContent.substring(0, modalStartIndex) + '  );\n};';
  } else {
    // Windows CRLF
    const modalEndIndexCRLF = playContent.indexOf('  );\r\n};', modalStartIndex);
    if (modalEndIndexCRLF !== -1) {
      playContent = playContent.substring(0, modalStartIndex) + '  );\r\n};';
    }
  }
}

fs.writeFileSync(playPath, playContent);

const botsPath = 'c:/Projects/Checkora/src/data/bots.ts';
let botsLines = fs.readFileSync(botsPath, 'utf-8').split('\n');
const antiStart = botsLines.findIndex(l => l.includes("id: 'antigravity',"));
if (antiStart !== -1) {
  // Find start of block '{'
  let blockStart = antiStart;
  while (blockStart > 0 && !botsLines[blockStart].includes('{')) {
    blockStart--;
  }
  // Find end of block '},'
  let blockEnd = antiStart;
  while (blockEnd < botsLines.length && !botsLines[blockEnd].includes('  },')) {
    blockEnd++;
  }
  botsLines.splice(blockStart, blockEnd - blockStart + 1);
  fs.writeFileSync(botsPath, botsLines.join('\n'));
}

console.log("Reverted successfully!");
