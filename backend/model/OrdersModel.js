const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  symbol: { type: String, required: true },
  name: { type: String },
  side: { type: String, enum: ['BUY', 'SELL'], required: true },
  orderType: { type: String, enum: ['LIMIT', 'MARKET', 'SL', 'SL-M'], default: 'MARKET' },
  quantity: { type: Number, required: true },
  price: { type: Number },
  filledQuantity: { type: Number, default: 0 },
  status: { type: String, default: 'OPEN' },
  exchange: { type: String },
  placedAt: { type: Date, default: Date.now },
  executedAt: { type: Date },
  meta: { type: Object }
});

module.exports = mongoose.models.Orders || mongoose.model('Orders', OrdersSchema);
