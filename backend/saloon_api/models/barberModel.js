// const mongoose = require("mongoose");

// const barberSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   experience: { type: Number, required: true }, // in years
//   specialization: { type: String },
//   phone: { type: String },
//   email: { type: String, unique: true },

//   // ✅ Slots with start and end time
//   timeSlots: [
//     {
//       start: { type: String, required: true }, // e.g. "10:00"
//       end: { type: String, required: true }    // e.g. "12:00"
//     }
//   ],

//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Barber", barberSchema);


const mongoose = require("mongoose");

const barberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  experience: { type: Number, required: true },
  specialization: { type: String },
  phone: { type: String },
  email: { type: String, unique: true },

  // Slots by date
  timeSlots: [
    {
      date: { type: String, required: true }, // e.g. "2025-09-08"
      slots: [
        {
          start: { type: String, required: true }, // e.g. "10:00"
          end: { type: String, required: true }    // e.g. "11:00"
        }
      ]
    }
  ],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Barber", barberSchema);
