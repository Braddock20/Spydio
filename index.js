
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const videoInfo = require('./routes/videoInfo');
const stream = require('./routes/stream');
const audio = require('./routes/audio');
const download = require('./routes/download');

app.use('/videoInfo', videoInfo);
app.use('/stream', stream);
app.use('/audio', audio);
app.use('/download', download);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ API running on port ${PORT}`);
});
