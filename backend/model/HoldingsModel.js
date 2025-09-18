// backend/model/HoldingsModel.js
const mongoose = require('mongoose');

const HoldingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  symbol: { type: String, required: true },
  name: { type: String },
  quantity: { type: Number, required: true, default: 0 },
  avgPrice: { type: Number, default: 0 },
  currentPrice: { type: Number, default: 0 },
  marketValue: { type: Number, default: 0 },
  realizedPL: { type: Number, default: 0 },
  unrealizedPL: { type: Number, default: 0 },
  exchange: { type: String },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

HoldingsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Export model safely for dev hot-reload
module.exports = mongoose.models.Holdings || mongoose.model('Holdings', HoldingsSchema);
