const mongoose = require('mongoose');

const PositionsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  symbol: { type: String, required: true },
  name: { type: String },
  netQuantity: { type: Number, required: true, default: 0 },
  avgEntryPrice: { type: Number, default: 0 },
  currentPrice: { type: Number, default: 0 },
  pnl: { type: Number, default: 0 },
  leverage: { type: Number, default: 1 },
  asOf: { type: Date, default: Date.now },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

PositionsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.models.Positions || mongoose.model('Positions', PositionsSchema);
