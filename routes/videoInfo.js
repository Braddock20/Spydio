const express = require("express");
const ytdl = require("ytdl-core");
const router = express.Router();

router.get("/", async (req, res) => {
  const { url } = req.query;
  if (!url || !ytdl.validateURL(url)) {
    return res.status(400).json({ error: "Invalid or missing YouTube URL" });
  }

  try {
    const info = await ytdl.getInfo(url);
    res.json({
      title: info.videoDetails.title,
      description: info.videoDetails.description,
      thumbnail: info.videoDetails.thumbnails.pop().url,
      channel: info.videoDetails.author.name,
      duration: info.videoDetails.lengthSeconds,
      videoId: info.videoDetails.videoId
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch video info", message: err.message });
  }
});

module.exports = router;
