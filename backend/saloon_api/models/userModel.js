const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: { type: String, unique: true },
  password: String,
  otp: String,
  otpVerified: { type: Boolean, default: false },
  isActive:{ type: Boolean, default: true },
});

module.exports = mongoose.model('User', userSchema);
