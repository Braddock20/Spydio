const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const scrapeFromSite = require('./scraper');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/news', async (req, res) => {
  const site = req.query.site;
  if (!site) return res.status(400).json({ error: 'Missing ?site= parameter' });

  try {
    const result = await scrapeFromSite(site);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch or scrape', detail: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
