// backend/schemas/HoldingsSchema.js
const mongoose = require('mongoose');

const HoldingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // example holding fields
  symbol: { type: String, required: true },        // e.g. "AAPL"
  name: { type: String },                          // e.g. "Apple Inc."
  quantity: { type: Number, required: true, default: 0 },
  avgPrice: { type: Number, default: 0 },          // average purchase price
  currentPrice: { type: Number, default: 0 },      // optional live price
  marketValue: { type: Number, default: 0 },       // quantity * currentPrice
  realizedPL: { type: Number, default: 0 },        // realized profit/loss
  unrealizedPL: { type: Number, default: 0 },      // unrealized
  exchange: { type: String },                      // e.g. "NSE" or "BSE"

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// optional: update updatedAt on save
HoldingsSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Holdings', HoldingsSchema);
