import fs from 'fs';
import https from 'https';
import path from 'path';

const bots = [
  { id: 'vidit-gujrathi', name: 'Vidit Gujrathi' },
  { id: 'hikaru', name: 'Hikaru Nakamura' },
  { id: 'magnus', name: 'Magnus Carlsen' },
  { id: 'pragg', name: 'Praggnanandhaa', query: 'Rameshbabu Praggnanandhaa' },
  { id: 'narendra-modi', name: 'Narendra Modi' },
  { id: 'rahul-gandhi', name: 'Rahul Gandhi' },
  { id: 'mamta-banarjee', name: 'Mamta Banerjee' },
  { id: 'amit-shah', name: 'Amit Shah' },
  { id: 'donald-trump', name: 'Donald Trump' },
  { id: 'meloni', name: 'Giorgia Meloni' },
  { id: 'xi-jinping', name: 'Xi Jinping' },
  { id: 'vladimir-putin', name: 'Vladimir Putin' },
  { id: 'mohammed-bin-salman', name: 'Mohammed bin Salman' },
  { id: 'elon-musk', name: 'Elon Musk' },
  { id: 'benjamin-netanyahu', name: 'Benjamin Netanyahu' },
  { id: 'pope-francis', name: 'Pope Francis' },
  { id: 'claudia-sheinbaum', name: 'Claudia Sheinbaum' },
  { id: 'larry-page', name: 'Larry Page' },
  { id: 'abraham-lincoln', name: 'Abraham Lincoln' },
  { id: 'nelson-mandela', name: 'Nelson Mandela' },
  { id: 'alexander-the-great', name: 'Alexander the Great' },
  { id: 'winston-churchill', name: 'Winston Churchill' },
  { id: 'julius-caesar', name: 'Julius Caesar' },
  { id: 'queen-elizabeth-ii', name: 'Elizabeth II' },
  { id: 'emperor-ashoka', name: 'Ashoka' },
  { id: 'genghis-khan', name: 'Genghis Khan' },
  { id: 'chanakya', name: 'Chanakya' },
  { id: 'cyrus-the-great', name: 'Cyrus the Great' },
  { id: 'napoleon-bonaparte', name: 'Napoleon' },
  { id: 'charlemagne', name: 'Charlemagne' },
  { id: 'queen-elizabeth-i', name: 'Elizabeth I' },
  { id: 'adolf-hitler', name: 'Adolf Hitler' },
  { id: 'chhatrapati-shivaji', name: 'Shivaji' },
  { id: 'akbar-the-great', name: 'Akbar' },
  { id: 'chandragupta-maurya', name: 'Chandragupta Maurya' },
  { id: 'raja-raja-chola-i', name: 'Rajaraja I' },
  { id: 'netaji-subhas-chandra-bose', name: 'Subhas Chandra Bose' },
  { id: 'rani-lakshmibai', name: 'Rani of Jhansi' },
  { id: 'swami-vivekananda', name: 'Swami Vivekananda' },
  { id: 'prithviraj-chauhan', name: 'Prithviraj Chauhan' },
  { id: 'maharana-pratap', name: 'Maharana Pratap' },
  { id: 'chhatrapati-sambhaji', name: 'Sambhaji' },
  { id: 'qin-shi-huang', name: 'Qin Shi Huang' },
  { id: 'suleiman-magnificent', name: 'Suleiman the Magnificent' },
  { id: 'garry-kasparov', name: 'Garry Kasparov' },
  { id: 'bobby-fischer', name: 'Bobby Fischer' },
  { id: 'mikhail-tal', name: 'Mikhail Tal' },
  { id: 'viswanathan-anand', name: 'Viswanathan Anand' },
  { id: 'botez-sisters', name: 'Botez Sisters', query: 'Alexandra Botez' },
  { id: 'anish-giri', name: 'Anish Giri' },
  { id: 'judit-polgar', name: 'Judit Polgar' },
  { id: 'divya-deshmukh', name: 'Divya Deshmukh' },
  { id: 'anatoly-karpov', name: 'Anatoly Karpov' },
  { id: 'vaishali-r', name: 'Vaishali Rameshbabu' },
  { id: 'koneru-humpy', name: 'Koneru Humpy' },
  { id: 'ding-liren', name: 'Ding Liren' },
  { id: 'gotham-chess', name: 'GothamChess', query: 'Levy Rozman' },
  { id: 'sagar-shah', name: 'Sagar Shah' },
  { id: 'samay-raina', name: 'Samay Raina' }
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
        content = content.replace(idRegex, `$1avatar: './avatars/${filename}',\n    isImageAvatar: true`);
    } else {
        // Fallback for emojis, no isImageAvatar yet
        const fallbackRegex = new RegExp(`(id:\\s*'${id}',\\s*name:\\s*'[^']+',\\s*)avatar:\\s*'[^']+'`, 'g');
        content = content.replace(fallbackRegex, `$1avatar: './avatars/${filename}',\n    isImageAvatar: true`);
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
        await sleep(1000);
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
    await sleep(1000);
  }
  console.log('Finished updating bots!');
};

run();
