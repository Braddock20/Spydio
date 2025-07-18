const axios = require('axios');
const cheerio = require('cheerio');

const siteConfigs = {
  bbc: {
    url: 'https://www.bbc.com/news',
    selector: 'a.gs-c-promo-heading',
    base: 'https://www.bbc.com',
  },
  cnn: {
    url: 'https://edition.cnn.com',
    selector: 'h3.cd__headline a',
    base: 'https://edition.cnn.com',
  },
  techcrunch: {
    url: 'https://techcrunch.com',
    selector: 'a.post-block__title__link',
    base: '',
  }
};

async function fetchWithAxios(url) {
  return axios.get(url, {
    timeout: 10000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    },
  });
}

async function scrapeFromSite(siteKey) {
  const config = siteConfigs[siteKey.toLowerCase()] || { url: siteKey, selector: 'a', base: '' };

  const { data } = await fetchWithAxios(config.url);
  const $ = cheerio.load(data);
  const articles = [];

  $(config.selector).each((i, el) => {
    const title = $(el).text().trim();
    const link = $(el).attr('href');
    if (title && link) {
      articles.push({
        title,
        link: link.startsWith('http') ? link : config.base + link,
      });
    }
  });

  return { site: siteKey, total: articles.length, articles };
}

module.exports = scrapeFromSite;
