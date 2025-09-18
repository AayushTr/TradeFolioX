// backend/model/UserModel.js
const mongoose = require('mongoose');

const FundsSchema = new mongoose.Schema({
  available: { type: Number, default: 100000 }, // give some starting cash
  used: { type: Number, default: 0 }
});

const UserSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  funds: { type: FundsSchema, default: () => ({}) },   // <-- add this
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
