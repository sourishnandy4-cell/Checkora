import fs from 'fs';

const content = fs.readFileSync('c:/Projects/Checkora/Checkora/src/data/bots.ts', 'utf-8');

const bots = [];
const blocks = content.split('  {');
for (const block of blocks) {
  const idMatch = block.match(/id:\s*'([^']+)'/);
  const nameMatch = block.match(/name:\s*'([^']+)'/);
  const tierMatch = block.match(/tier:\s*'([^']+)'/);
  
  if (idMatch && nameMatch && tierMatch) {
    const tier = tierMatch[1];
    if (['Legend', 'Leaders', 'Luminaries', 'Celebrity'].includes(tier)) {
      bots.push({ id: idMatch[1], name: nameMatch[1], tier });
    }
  }
}

console.log(JSON.stringify(bots, null, 2));
