import fs from 'fs';
import https from 'https';
import path from 'path';

const bots = [
  { id: 'pragg', name: 'Praggnanandhaa', query: 'R_Praggnanandhaa' }
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'BotAvatarFetcher/1.0 (some@email.com)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(downloadFile(res.headers.location, dest));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

const updateBotsTs = (id, filename) => {
  const outerPath = 'c:/Projects/Checkora/src/data/bots.ts';
  const innerPath = 'c:/Projects/Checkora/Checkora/src/data/bots.ts';
  
  [outerPath, innerPath].forEach(filePath => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf-8');
    
    const idRegex = new RegExp(`(id:\\s*'${id}',\\s*name:\\s*'[^']+',\\s*)avatar:\\s*'[^']+'(,\\s*isImageAvatar:\\s*true)?`, 'g');
    
    if (content.match(idRegex)) {
        content = content.replace(idRegex, `$1avatar: '/avatars/${filename}',\n    isImageAvatar: true`);
    } else {
        const fallbackRegex = new RegExp(`(id:\\s*'${id}',\\s*name:\\s*'[^']+',\\s*)avatar:\\s*'[^']+'`, 'g');
        content = content.replace(fallbackRegex, `$1avatar: '/avatars/${filename}',\n    isImageAvatar: true`);
    }
    
    fs.writeFileSync(filePath, content);
  });
};

const run = async () => {
  for (const bot of bots) {
    console.log(`Fetching ${bot.name}...`);
    try {
      const query = bot.query || bot.name;
      const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(query)}&prop=pageimages&format=json&pithumbsize=500`;
      
      const responseText = await new Promise((resolve, reject) => {
        https.get(apiUrl, { headers: { 'User-Agent': 'BotAvatarFetcher/1.0 (some@email.com)' } }, (res) => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => resolve(data));
        }).on('error', reject);
      });

      let response;
      try {
        response = JSON.parse(responseText);
      } catch (e) {
        console.error(`Invalid JSON for ${bot.name}`);
        continue;
      }

      const filename = `${bot.id.replace(/-/g, '_')}.png`;
      let downloaded = false;

      if (response.query && response.query.pages) {
        const pages = response.query.pages;
        const pageId = Object.keys(pages)[0];
        if (pageId !== '-1' && pages[pageId].thumbnail) {
          const imgUrl = pages[pageId].thumbnail.source;
          const outerDest = path.join('c:/Projects/Checkora/public/avatars', filename);
          const innerDest = path.join('c:/Projects/Checkora/Checkora/public/avatars', filename);
          
          await downloadFile(imgUrl, outerDest);
          if (fs.existsSync(path.dirname(innerDest))) {
            fs.copyFileSync(outerDest, innerDest);
          }
          downloaded = true;
          console.log(`Downloaded ${bot.name} to ${filename}`);
        } else {
          console.log(`No Wikipedia image found for ${bot.name}`);
        }
      }

      if (downloaded) {
        updateBotsTs(bot.id, filename);
      }
    } catch (e) {
      console.error(`Failed ${bot.name}:`, e.message);
    }
  }
  console.log('Finished final bots!');
};

run();
