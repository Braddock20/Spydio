const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) {
    return res.status(400).json({ error: "Missing YouTube URL" });
  }

  // Extract videoId
  const videoIdMatch = videoUrl.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;
  if (!videoId) return res.status(400).json({ error: "Invalid YouTube URL" });

  try {
    const response = await axios.get(`https://pipedapi.kavin.rocks/streams/${videoId}`);
    const info = response.data;

    res.json({
      title: info.title,
      description: info.description,
      thumbnail: info.thumbnailUrl,
      channel: info.uploader,
      duration: info.duration,
      audio: info.audioStreams[0]?.url,
      video: info.videoStreams[0]?.url,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch video from proxy",
      message: err.message,
    });
  }
});

module.exports = router;
