const express = require("express");
const router = express.Router();
const play = require("play-dl");

router.get("/", async (req, res) => {
  const id = req.query.id;
  if (!id) return res.status(400).json({ error: "Missing YouTube ID" });

  try {
    const url = `https://www.youtube.com/watch?v=${id}`;
    const stream = await play.stream(url, { quality: 0 });

    res.setHeader("Content-Disposition", `attachment; filename="${id}.mp3"`);
    res.setHeader("Content-Type", "audio/mp3");

    stream.stream.pipe(res);
  } catch (err) {
    console.error("Download Error:", err);
    res.status(500).json({ error: "Failed to download audio" });
  }
});

module.exports = router;
