const mongoose = require("mongoose");

const barberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  experience: { type: Number, required: true }, // in years
  specialization: { type: String },
  phone: { type: String },
  email: { type: String, unique: true },
  
  // ✅ Add slots (admin defines these once)
  timeSlots: { 
    type: [String], 
    default: [] // Example: ["10:00", "11:00", "12:30", "15:00"]
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Barber", barberSchema);
