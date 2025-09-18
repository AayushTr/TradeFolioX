// backend/schemas/OrdersSchema.js
const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // example order fields
  symbol: { type: String, required: true },
  name: { type: String },
  side: { type: String, enum: ['BUY', 'SELL'], required: true },
  orderType: { type: String, enum: ['LIMIT', 'MARKET', 'SL', 'SL-M'], default: 'MARKET' },
  quantity: { type: Number, required: true },
  price: { type: Number },             // price for limit orders
  filledQuantity: { type: Number, default: 0 },
  status: { type: String, default: 'OPEN' }, // OPEN, PARTIALLY_FILLED, FILLED, CANCELLED
  exchange: { type: String },

  placedAt: { type: Date, default: Date.now },
  executedAt: { type: Date },

  meta: { type: Object } // free-form metadata (order id from broker, etc.)
});

module.exports = mongoose.model('Orders', OrdersSchema);
