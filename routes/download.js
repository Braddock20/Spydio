const express = require('express');
const router = express.Router();
const { Client } = require('youtubei.js');

router.get('/', async (req, res) => {
  const videoId = req.query.id;
  const type = req.query.type || 'video';

  if (!videoId) {
    return res.status(400).json({ error: 'Missing YouTube ID' });
  }

  try {
    const client = new Client();
    const video = await client.getVideo(videoId);
    const stream =
      type === 'audio' ? video.download(0) : video.download(video.quality);
    res.redirect(stream.url);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to process download',
      message: error.message
    });
  }
});

module.exports = router;
