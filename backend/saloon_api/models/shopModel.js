const mongoose = require("mongoose");

const shopSettingSchema = new mongoose.Schema({
  workingHours: {
    start: { type: String, required: true }, // e.g., "09:00"
    end: { type: String, required: true },   // e.g., "18:00"
  },
  holidays: [
    {
      date: { type: Date, required: true }, // specific holiday
      reason: { type: String }              // optional description
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model("ShopSetting", shopSettingSchema);
