
const express = require('express');
const router = express.Router();
const { Innertube } = require('youtubei.js');

router.get('/', async (req, res) => {
  const { id, type } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing video ID' });

  try {
    const yt = await new Innertube();
    const info = await yt.getInfo(id);

    if (type === 'audio') {
      const audio = info.streaming_data?.adaptive_formats?.find(f => f.mime_type.includes('audio'));
      return res.redirect(audio?.url || '/404');
    } else {
      const video = info.streaming_data?.formats?.[0];
      return res.redirect(video?.url || '/404');
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch download URL', message: error.message });
  }
});

module.exports = router;
