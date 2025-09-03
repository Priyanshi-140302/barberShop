const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: { type: String, unique: true },
  password: String,
});

module.exports = mongoose.model('Admin', adminSchema);
