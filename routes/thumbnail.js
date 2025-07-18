const express = require("express");
const ytdl = require("ytdl-core");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: "Missing URL" });

    const info = await ytdl.getInfo(url);
    const thumbs = info.videoDetails.thumbnails;

    res.json({
      default: thumbs[0]?.url,
      medium: thumbs[Math.floor(thumbs.length / 2)]?.url,
      high: thumbs[thumbs.length - 1]?.url
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to get thumbnail", details: err.message });
  }
});

module.exports = router;
