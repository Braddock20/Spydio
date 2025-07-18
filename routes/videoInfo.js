const express = require('express');
const router = express.Router();
const ytdl = require('ytdl-core');

router.get('/', async (req, res) => {
  const videoURL = req.query.url;
  if (!videoURL) return res.status(400).json({ error: 'Missing YouTube URL' });

  try {
    const info = await ytdl.getInfo(videoURL);
    const details = info.videoDetails;

    res.json({
      title: details.title,
      duration: details.lengthSeconds + ' seconds',
      thumbnail: details.thumbnails[details.thumbnails.length - 1].url,
      channel: details.author.name,
      views: details.viewCount,
    });

  } catch (err) {
    if (err.statusCode === 410) {
      return res.status(410).json({
        error: 'YouTube blocked this request (410)',
        message: 'Try another video or wait a while. This is a known YouTube restriction.'
      });
    }

    res.status(500).json({
      error: 'Failed to fetch video info',
      message: err.message
    });
  }
});

module.exports = router;
