const express = require('express');
const cors = require('cors');
const app = express();
const videoInfo = require('./routes/videoInfo');
const audio = require('./routes/audio');
const stream = require('./routes/stream');
const download = require('./routes/download');

app.use(cors());
app.use(express.json());

// Routes
app.use('/videoInfo', videoInfo);
app.use('/audio', audio);
app.use('/stream', stream);
app.use('/download', download);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
