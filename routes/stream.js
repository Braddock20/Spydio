
const express = require('express');
const router = express.Router();
const { Innertube } = require('youtubei.js');

router.get('/', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing video ID' });

  try {
    const yt = await new Innertube();
    const info = await yt.getInfo(id);
    const format = info.streaming_data?.formats?.[0];

    res.json({
      quality: format?.quality_label,
      mime: format?.mime_type,
      url: format?.url
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stream URL', message: error.message });
  }
});

module.exports = router;
