// backend/routes/funds.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const User = require('../model/UserModel');

// Get funds
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ funds: user.funds });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add funds
router.post('/add', auth, async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.user.id);
    user.funds.available += Number(amount);
    await user.save();
    res.json({ success: true, funds: user.funds });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Withdraw funds
router.post('/withdraw', auth, async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.user.id);
    if (user.funds.available < amount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }
    user.funds.available -= Number(amount);
    await user.save();
    res.json({ success: true, funds: user.funds });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
