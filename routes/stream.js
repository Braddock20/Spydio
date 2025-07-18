const express = require("express");
const ytdl = require("ytdl-core");
const router = express.Router();

router.get("/", (req, res) => {
  const { url } = req.query;
  if (!url || !ytdl.validateURL(url)) {
    return res.status(400).json({ error: "Invalid YouTube URL" });
  }

  res.setHeader("Content-Disposition", 'inline; filename="video.mp4"');
  ytdl(url, { quality: "highestvideo", filter: "videoandaudio" }).pipe(res);
});

module.exports = router;
