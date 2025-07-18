const express = require("express");
const router = express.Router();
const play = require("play-dl");

router.get("/", async (req, res) => {
  const id = req.query.id;
  if (!id) return res.status(400).json({ error: "Missing YouTube ID" });

  try {
    const url = `https://www.youtube.com/watch?v=${id}`;
    const stream = await play.stream(url, { quality: 0 }); // 0 = best audio

    res.setHeader("Content-Type", "audio/mp4");
    stream.stream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to stream audio" });
  }
});

module.exports = router;
