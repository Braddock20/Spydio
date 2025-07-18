const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const scrapeFromSite = require('./scraper');

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

app.listen(PORT, () => console.log(`✅ API running on port ${PORT}`));
