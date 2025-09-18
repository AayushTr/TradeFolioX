// backend/routes/orders.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Orders = require('../model/OrdersModel');
const Holdings = require('../model/HoldingsModel');
const User = require('../model/UserModel');

// Place order
router.post('/', auth, async (req, res) => {
  try {
    const { symbol, qty, price, side } = req.body;
    const user = await User.findById(req.user.id);
    if (!symbol || !qty || !price) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const required = qty * price;
    if (side === 'BUY') {
      if (user.funds.available < required) {
        return res.status(400).json({ message: 'Insufficient funds' });
      }
      user.funds.available -= required;
      user.funds.used += required;
    } else if (side === 'SELL') {
      const holding = await Holdings.findOne({ userId: user._id, symbol });
      if (!holding || holding.quantity < qty) {
        return res.status(400).json({ message: 'Not enough holdings' });
      }
      holding.quantity -= qty;
      if (holding.quantity === 0) await holding.deleteOne(); else await holding.save();
      user.funds.available += required;
    }

    const order = await Orders.create({
      userId: user._id,
      symbol,
      side,
      quantity: qty,
      price,
      status: 'FILLED'
    });

    // Update or create holding for BUY
    if (side === 'BUY') {
      const holding = await Holdings.findOne({ userId: user._id, symbol });
      if (holding) {
        const totalQty = holding.quantity + qty;
        const newAvg = ((holding.avgPrice * holding.quantity) + (price * qty)) / totalQty;
        holding.quantity = totalQty;
        holding.avgPrice = newAvg;
        await holding.save();
      } else {
        await Holdings.create({ userId: user._id, symbol, quantity: qty, avgPrice: price });
      }
    }

    await user.save();
    const holdings = await Holdings.find({ userId: user._id });
    res.json({ success: true, order, funds: user.funds, holdings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
