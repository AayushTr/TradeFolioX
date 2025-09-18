// backend/routes/data.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const Holdings = require('../model/HoldingsModel');
const Orders = require('../model/OrdersModel');
const Positions = require('../model/PositionsModel');

// GET /api/data/holdings
router.get('/holdings', auth, async (req, res) => {
  try {
    const holdings = await Holdings.find({ userId: req.user.id });
    res.json({ holdings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// GET /api/data/orders
router.get('/orders', auth, async (req, res) => {
  try {
    const orders = await Orders.find({ userId: req.user.id });
    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// GET /api/data/positions
router.get('/positions', auth, async (req, res) => {
  try {
    const positions = await Positions.find({ userId: req.user.id });
    res.json({ positions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
