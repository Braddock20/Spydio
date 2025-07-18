const express = require("express");
const router = express.Router();
const play = require("play-dl");

router.get("/", async (req, res) => {
  const id = req.query.id;
  if (!id) return res.status(400).json({ error: "Missing YouTube ID" });

  try {
    const url = `https://www.youtube.com/watch?v=${id}`;
    const stream = await play.stream(url); // Best video+audio stream

    res.setHeader("Content-Type", "video/mp4");
    stream.stream.pipe(res);
  } catch (err) {
    console.error("Video Stream Error:", err);
    res.status(500).json({ error: "Failed to stream video" });
  }
});

module.exports = router;
