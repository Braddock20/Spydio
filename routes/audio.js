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
    const audio = video.download(0); // 0 = best audio
    res.json({ audioUrl: audio.url });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch audio stream',
      message: error.message
    });
  }
});

module.exports = router;
