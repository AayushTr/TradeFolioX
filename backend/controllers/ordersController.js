// backend/controllers/ordersController.js
const mongoose = require('mongoose');
const Orders = require('../model/OrdersModel');
const Holdings = require('../model/HoldingsModel');
const Positions = require('../model/PositionsModel');
const User = require('../model/UserModel');

async function placeOrder(req, res) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const userId = req.user.id; // set by your auth middleware
    const { symbol, qty, price, side } = req.body;

    if (!symbol || !qty || !price || !side) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const quantity = Number(qty);
    const px = Number(price);
    if (quantity <= 0 || px <= 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Quantity and price must be positive' });
    }

    const user = await User.findById(userId).session(session);
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'User not found' });
    }

    const required = quantity * px;

    if (side === 'BUY') {
      if ((user.funds?.available || 0) < required) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: 'Insufficient funds' });
      }
      // deduct funds
      user.funds.available -= required;
      user.funds.used = (user.funds.used || 0) + required;
      await user.save({ session });
    }

    // For SELL we check holdings/position existence below before allowing sell

    // Create an order object (status FILLED for demo; adapt for real matching)
    const order = await Orders.create([{
      userId,
      symbol,
      side,
      quantity,
      price: px,
      status: 'FILLED',
      createdAt: new Date()
    }], { session });

    // Update holdings
    if (side === 'BUY') {
      const existingHolding = await Holdings.findOne({ userId, symbol }).session(session);
      if (existingHolding) {
        const totalQty = existingHolding.quantity + quantity;
        const newAvg = ((existingHolding.avgPrice * existingHolding.quantity) + (px * quantity)) / totalQty;
        existingHolding.quantity = totalQty;
        existingHolding.avgPrice = newAvg;
        existingHolding.currentPrice = px;
        await existingHolding.save({ session });
      } else {
        await Holdings.create([{
          userId,
          symbol,
          quantity,
          avgPrice: px,
          currentPrice: px
        }], { session });
      }
    } else if (side === 'SELL') {
      // Ensure user has enough holdings
      const existingHolding = await Holdings.findOne({ userId, symbol }).session(session);
      if (!existingHolding || existingHolding.quantity < quantity) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: 'Not enough holdings to sell' });
      }
      existingHolding.quantity -= quantity;
      existingHolding.currentPrice = px;
      if (existingHolding.quantity === 0) {
        await existingHolding.deleteOne({ session });
      } else {
        await existingHolding.save({ session });
      }
      // Add proceeds to user funds
      const proceeds = quantity * px;
      user.funds.available = (user.funds.available || 0) + proceeds;
      // Optional: reduce used funds if you track reserved margin
      await user.save({ session });
    }

    // --- Update Positions collection so Positions.js can show live positions ---
    // We'll treat positions similar to holdings but include avgPrice & currentPrice and P&L
    if (side === 'BUY') {
      const pos = await Positions.findOne({ userId, symbol }).session(session);
      if (pos) {
        // update average price and qty
        const totalQty = pos.quantity + quantity;
        const newAvg = ((pos.avgPrice * pos.quantity) + (px * quantity)) / totalQty;
        pos.quantity = totalQty;
        pos.avgPrice = newAvg;
        pos.currentPrice = px;
        await pos.save({ session });
      } else {
        await Positions.create([{
          userId,
          symbol,
          quantity,
          avgPrice: px,
          currentPrice: px
        }], { session });
      }
    } else if (side === 'SELL') {
      const pos = await Positions.findOne({ userId, symbol }).session(session);
      if (pos) {
        pos.quantity -= quantity;
        pos.currentPrice = px;
        if (pos.quantity <= 0) {
          await pos.deleteOne({ session });
        } else {
          await pos.save({ session });
        }
      } else {
        // If no position but SELL passed (shouldn't happen due to holdings check), ignore or error
      }
    }

    await session.commitTransaction();
    session.endSession();

    // return updated app state to frontend
    const [updatedHoldings, updatedPositions, updatedUser] = await Promise.all([
      Holdings.find({ userId }),
      Positions.find({ userId }),
      User.findById(userId)
    ]);

    return res.json({
      success: true,
      order: order[0],
      funds: updatedUser.funds,
      holdings: updatedHoldings,
      positions: updatedPositions
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error('placeOrder err', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { placeOrder };
