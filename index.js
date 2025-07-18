const express = require("express");
const app = express();
const videoInfoRoute = require("./routes/videoInfo");

app.use(express.json());

// Route
app.use("/videoInfo", videoInfoRoute);

// Default route
app.get("/", (req, res) => {
  res.send("✅ YouTube Proxy API is Live");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
