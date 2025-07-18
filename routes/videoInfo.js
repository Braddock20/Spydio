const express = require("express");
const router = express.Router();
const play = require("play-dl");

router.get("/", async (req, res) => {
  const id = req.query.id;
  if (!id) return res.status(400).json({ error: "Missing YouTube ID" });

  try {
    const url = `https://www.youtube.com/watch?v=${id}`;
    const info = await play.video_basic_info(url);

    res.json({
      title: info.video_details.title,
      description: info.video_details.description,
      channel: info.video_details.channel.name,
      duration: info.video_details.durationRaw,
      views: info.video_details.views,
      thumbnails: info.video_details.thumbnails,
      url: url
    });
  } catch (error) {
    console.error("Video Info Error:", error);
    res.status(500).json({ error: "Failed to fetch video info" });
  }
});

module.exports = router;
