
const express = require('express');
const router = express.Router();
const { Innertube } = require('youtubei.js');

router.get('/', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing video ID' });

  try {
    const yt = await new Innertube();
    const info = await yt.getInfo(id);
    const audio = info.streaming_data?.adaptive_formats?.find(f => f.mime_type.includes('audio'));

    res.json({
      bitrate: audio?.bitrate,
      mime: audio?.mime_type,
      url: audio?.url
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch audio URL', message: error.message });
  }
});

module.exports = router;
