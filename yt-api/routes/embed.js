const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const url = req.query.url;
  const autoplay = req.query.autoplay === "1" ? 1 : 0;
  const loop = req.query.loop === "1" ? 1 : 0;

  if (!url) return res.status(400).json({ error: "Missing URL" });

  const videoId = url.split("v=")[1]?.split("&")[0];
  if (!videoId) return res.status(400).json({ error: "Invalid YouTube URL" });

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay}&loop=${loop}&playlist=${loop ? videoId : ""}`;
  res.json({ embed: embedUrl });
});

module.exports = router;
