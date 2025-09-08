const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  barberId: { type: mongoose.Schema.Types.ObjectId, ref: "Barber", required: true },
  serviceIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true }],
  name: { type: String, required: true }, 
  mobile: { type: String, required: true },
  adults: { type: Number, default:1 },
  // children: { type: Number, default: 0, min: 0 },
  date: { type: Date, required: true },
  time: { type: String, required: true }, 
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "completed", "cancelled"],
    default: "pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
