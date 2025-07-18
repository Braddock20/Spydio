const express = require('express');
const app = express();

// Import all your route files
const videoInfoRoute = require('./routes/videoInfo');
const downloadRoute = require('./routes/download');
const streamRoute = require('./routes/stream');
const embedRoute = require('./routes/embed');
const thumbRoute = require('./routes/thumbnail');

// Test base route
app.get('/', (req, res) => {
  res.send('✅ Spydio API is live');
});

// Register routes
app.use('/videoInfo', videoInfoRoute);
app.use('/download', downloadRoute);
app.use('/stream', streamRoute);
app.use('/embed', embedRoute);
app.use('/thumbnail', thumbRoute);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
