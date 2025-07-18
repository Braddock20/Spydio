const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/video-info", require("./routes/videoInfo"));
app.use("/api/thumbnail", require("./routes/thumbnail"));
app.use("/api/download", require("./routes/download"));
app.use("/api/stream", require("./routes/stream"));
app.use("/api/embed", require("./routes/embed"));

app.get("/", (req, res) => res.send("YouTube API is running!"));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
