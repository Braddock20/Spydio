const express = require("express");
const ytdl = require("ytdl-core");
const router = express.Router();

router.get("/", async (req, res) => {
  const url = req.query.url;
  const type = req.query.type || "mp4";

  if (!url) return res.status(400).json({ error: "Missing URL" });

  try {
    const info = await ytdl.getInfo(url);
    res.header("Content-Disposition", `attachment; filename="video.${type}"`);

    if (type === "mp3") {
      ytdl(url, { filter: "audioonly", quality: "highestaudio" }).pipe(res);
    } else {
      ytdl(url, { quality: "highestvideo" }).pipe(res);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to download", details: err.message });
  }
});

module.exports = router;
