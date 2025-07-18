const express = require("express");
const ytdl = require("ytdl-core");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: "Missing URL" });

    const info = await ytdl.getInfo(url);
    const details = info.videoDetails;

    res.json({
      title: details.title,
      channel: details.author.name,
      views: details.viewCount,
      duration: details.lengthSeconds,
      uploaded: details.uploadDate,
      url: details.video_url
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch video info", details: err.message });
  }
});

module.exports = router;
