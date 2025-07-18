const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use("/videoInfo", require("./routes/videoInfo"));
app.use("/stream", require("./routes/stream"));
app.use("/audio", require("./routes/audio"));
app.use("/download", require("./routes/download"));

app.get("/", (req, res) => {
  res.send("🟢 YouTube API is running");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
