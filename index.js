const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ Root route (to test if API is live)
app.get('/', (req, res) => {
  res.json({
    status: '✅ API is running',
    poweredBy: 'Braddock 🔥',
    usage: {
      videoInfo: '/videoInfo?url=https://youtube.com/watch?v=...',
    },
  });
});

// ✅ Import routes
const videoInfoRoute = require('./routes/videoInfo');
// Add more routes here as needed (e.g., download, stream, etc.)

// ✅ Route mounting
app.use('/videoInfo', videoInfoRoute);

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
