
const express = require('express');
const router = express.Router();
const { Innertube } = require('youtubei.js');

router.get('/', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing video ID' });

  try {
    const yt = await new Innertube();
    const info = await yt.getInfo(id);
    const videoDetails = info.basic_info;

    res.json({
      title: videoDetails.title,
      author: videoDetails.author,
      duration: videoDetails.duration,
      thumbnail: videoDetails.thumbnail?.url,
      description: videoDetails.description,
      views: videoDetails.view_count
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch video info', message: error.message });
  }
});

module.exports = router;
