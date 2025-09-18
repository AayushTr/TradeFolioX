// backend/schemas/PositionsSchema.js
const mongoose = require('mongoose');

const PositionsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // example position fields (net exposure for a symbol)
  symbol: { type: String, required: true },
  name: { type: String },
  netQuantity: { type: Number, required: true, default: 0 },
  avgEntryPrice: { type: Number, default: 0 },
  currentPrice: { type: Number, default: 0 },
  pnl: { type: Number, default: 0 }, // (currentPrice - avgEntryPrice) * netQuantity
  leverage: { type: Number, default: 1 },

  asOf: { type: Date, default: Date.now }, // snapshot time

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

PositionsSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Positions', PositionsSchema);
