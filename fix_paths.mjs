import fs from 'fs';
import path from 'path';

function replaceInFile(filePath, regex, replacement) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const newContent = content.replace(regex, replacement);
  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log(`Updated ${filePath}`);
}

const srcDir = path.join(process.cwd(), 'src');

// Fix src/data/bots.ts
replaceInFile(path.join(srcDir, 'data/bots.ts'), /'\/avatars\//g, "'./avatars/");

// Fix src/pages/Profile.tsx
replaceInFile(path.join(srcDir, 'pages/Profile.tsx'), /'\/avatars\//g, "'./avatars/");

// Fix src/store/settingsStore.ts
replaceInFile(path.join(srcDir, 'store/settingsStore.ts'), /'\/avatars\//g, "'./avatars/");

// Fix src/index.css
replaceInFile(path.join(srcDir, 'index.css'), /url\('\/mauryan_watermark\.png'\)/g, "url('./mauryan_watermark.png')");
replaceInFile(path.join(srcDir, 'index.css'), /url\('\/roman_watermark\.png'\)/g, "url('./roman_watermark.png')");
replaceInFile(path.join(srcDir, 'index.css'), /url\('\/spartan_watermark\.png'\)/g, "url('./spartan_watermark.png')");
