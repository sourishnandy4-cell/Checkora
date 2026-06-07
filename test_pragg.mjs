import https from 'https';

const titles = ['Praggnanandhaa', 'Rameshbabu Praggnanandhaa', 'R_Praggnanandhaa'];

const fetchWiki = (title) => {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=500`;
    https.get(apiUrl, { headers: { 'User-Agent': 'BotAvatarFetcher/1.0 (some@email.com)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pageId !== '-1' && pages[pageId].thumbnail) {
            console.log(`Success for ${title}:`, pages[pageId].thumbnail.source);
          } else {
            console.log(`Failed for ${title}`);
          }
        } catch (e) {
          console.log(`Error parsing for ${title}`);
        }
        resolve();
      });
    });
  });
};

(async () => {
  for (const t of titles) {
    await fetchWiki(t);
  }
})();
