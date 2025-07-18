const express = require('express');
const router = express.Router();
const { Client } = require('youtubei.js');

router.get('/', async (req, res) => {
  const videoId = req.query.id;
  if (!videoId) {
    return res.status(400).json({ error: 'Missing YouTube ID' });
  }

  try {
    const client = new Client();
    const video = await client.getVideo(videoId);
    const best = video.download(video.quality); // best available
    res.json({ streamUrl: best.url });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch video stream',
      message: error.message
    });
  }
});

module.exports = router;
