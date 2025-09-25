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

// Build allowed origins from env (must be exact, include protocol)
const allowedOrigins = [
  process.env.LANDING_URL || 'http://localhost:3001',
  process.env.DASHBOARD_URL || 'http://localhost:3002'
];

// CORS: allow requests from allowedOrigins and enable credentials (cookies)
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman, curl, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // <-- important so browser will accept cookies
}));

// Optional debug middleware: set DEBUG_AUTH=true in environment to log origin/cookie on each request
if (process.env.DEBUG_AUTH === 'true') {
  app.use((req, res, next) => {
    console.log('--- DEBUG_AUTH ---');
    console.log('Request URL:', req.originalUrl);
    console.log('Origin header:', req.headers.origin);
    console.log('Cookie header:', req.headers.cookie);
    console.log('-------------------');
    next();
  });
}

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
