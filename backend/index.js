// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet'); // optional but recommended
require('dotenv').config();

const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data'); // mount data routes here
const orderRoutes = require('./routes/orders');
const fundsRoutes = require('./routes/funds');

const app = express();
app.use(helmet()); // optional: basic security headers
app.use(express.json());
app.use(cookieParser());

// allow both landing + dashboard during dev/prod via env
const CLIENT_URLS = [
  process.env.LANDING_URL || 'http://localhost:3001',
  process.env.DASHBOARD_URL || 'http://localhost:3002'
];

// Use a function for origin so we can check allowed list dynamically
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);

    if (CLIENT_URLS.includes(origin)) {
      return callback(null, true);
    } else {
      // For debugging you can log origin here:
      console.warn(`CORS blocked origin: ${origin}`);
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Mongo connected')).catch(err => console.error('Mongo connection error', err));

// mount routes BEFORE starting server
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/funds', fundsRoutes);

// optional simple health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// example protected route (auth middleware)
const authMiddleware = require('./middlewares/auth');
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ msg: 'This is protected', user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
