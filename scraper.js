const axios = require('axios');
const proxies = require('./proxies');

function getRandomProxy() {
  return proxies[Math.floor(Math.random() * proxies.length)];
}

async function fetchWithProxy(url) {
  return axios.get(url, {
    timeout: 10000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    },
  });
} catch (err) {
      lastError = err;
      console.log(`❌ Proxy failed: ${proxy}`);
    }
  }

  throw lastError; // All proxies failed
}
