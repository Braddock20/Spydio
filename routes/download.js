const express = require("express");
const ytdl = require("ytdl-core");
const router = express.Router();

router.get("/", async (req, res) => {
  const { url } = req.query;
  if (!url || !ytdl.validateURL(url)) {
    return res.status(400).json({ error: "Invalid YouTube URL" });
  }

  try {
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title.replace(/[^a-z0-9]/gi, "_").toLowerCase();

    res.header("Content-Disposition", `attachment; filename="${title}.mp4"`);
    ytdl(url, { quality: "highestvideo", filter: "videoandaudio" }).pipe(res);
  } catch (err) {
    res.status(500).json({ error: "Download failed", message: err.message });
  }
});

module.exports = router;
