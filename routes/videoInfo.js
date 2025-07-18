const express = require('express');
const router = express.Router();
const { Client } = require('youtubei.js');

router.get('/', async (req, res) => {
  const videoId = req.query.id;
  if (!videoId) {
    return res.status(400).json({ error: 'Missing YouTube URL or ID' });
  }

  try {
    const client = new Client();
    const video = await client.getVideo(videoId);
    res.json({
      title: video.title,
      description: video.description,
      duration: video.durationFormatted,
      views: video.viewCount,
      thumbnail: video.thumbnail.url,
      channel: video.channel.name,
      published: video.uploadDate
    });
  } catch (error) {
    res.status(500).json({
      error: 'YouTube blocked this request (410)',
      message: error.message
    });
  }
});

module.exports = router;
