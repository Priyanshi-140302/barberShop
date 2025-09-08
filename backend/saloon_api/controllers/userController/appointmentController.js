const Appointment = require('../../models/appointmentModel');
const Barber = require('../../models/barberModel');
const Service = require('../../models/serviceModel');

// exports.bookAppointment = async (req, res) => {
//   try {
//     let { barberId, serviceIds, adults = 0, date, time, name, mobile } = req.body;

//     // ✅ Default to 1 if not provided
//     adults = adults || 1;

//     // Basic validation
//     if (!barberId || !serviceIds || !date || !time || !name || !mobile) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     if (adults < 0) {
//       return res.status(400).json({ message: "Adults cannot be negative" });
//     }

//     // ✅ Check if barber exists
//     const barber = await Barber.findById(barberId);
//     if (!barber) {
//       return res.status(404).json({ message: "Barber not found" });
//     }

//     const addMinutes = (time, minutesToAdd) => {
//       let [h, m] = time.split(":").map(Number);
//       m += minutesToAdd;
//       h += Math.floor(m / 60);
//       m = m % 60;
//       return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
//     };

//     // ✅ Calculate total service duration
//     const services = await Service.find({ _id: { $in: serviceIds } });
//     const totalServiceDuration = services.reduce((sum, s) => {
//       const dur = s.duration.match(/\d+/) ? parseInt(s.duration.match(/\d+/)[0]) : 0;
//       return sum + dur;
//     }, 0);

//     // ✅ Find a slot that has enough minutes
//     const slotIndex = barber.timeSlots.findIndex(slot => {
//       const [sh, sm] = slot.start.split(":").map(Number);
//       const [eh, em] = slot.end.split(":").map(Number);
//       const slotMinutes = (eh * 60 + em) - (sh * 60 + sm);
//       return slotMinutes >= totalServiceDuration;
//     });

//     if (slotIndex === -1) {
//       return res.status(400).json({ message: "No slot fits the service duration" });
//     }

//     const slot = barber.timeSlots[slotIndex];

//     // ✅ Calculate actual end time for this booking
//     const bookingEnd = addMinutes(slot.start, totalServiceDuration);

//     // ✅ Check if slot already booked (ignore cancelled)
//     const existing = await Appointment.findOne({
//       barberId,
//       date,
//       time: `${slot.start} - ${bookingEnd}`,
//       status: { $ne: "cancelled" }
//     });

//     if (existing) {
//       return res.status(400).json({ message: "This time slot is already booked" });
//     }

//     // ✅ If there is leftover, create a new slot
//     const [eh, em] = slot.end.split(":").map(Number);
//     const slotEndTotalMinutes = eh * 60 + em;

//     const [bh, bm] = bookingEnd.split(":").map(Number);
//     const bookingEndTotalMinutes = bh * 60 + bm;

//     const leftoverMinutes = slotEndTotalMinutes - bookingEndTotalMinutes;
//     const newSlots = [];

//     if (leftoverMinutes > 0) {
//       newSlots.push({ start: bookingEnd, end: slot.end });
//     }

//     // Replace old slot with leftover (or remove if fully used)
//     barber.timeSlots.splice(slotIndex, 1, ...newSlots);
//     await barber.save();

//     // ✅ Save appointment
//     const newAppointment = new Appointment({
//       barberId,
//       serviceIds,
//       date,
//       time: `${slot.start} - ${bookingEnd}`,
//       name,
//       mobile,
//       adults,
//       status: "pending",
//     });

//     await newAppointment.save();

//     // ✅ Populate barber + services before sending response or socket emit
//     const populatedAppointment = await Appointment.findById(newAppointment._id)
//       .populate("barberId", "name")
//       .populate("serviceIds", "name duration");

//     // ✅ Emit socket event to all connected clients
//     const io = req.app.get("io");
//     if (io) {
//       io.emit("newAppointment", populatedAppointment);
//     }

//     res.status(201).json({
//       message: "Appointment booked successfully",
//       appointment: populatedAppointment,
//     });

//   } catch (error) {
//     console.error("❌ Error booking appointment:", error);
//     res.status(500).json({ message: "Error booking appointment", error: error.message });
//   }
// };


exports.bookAppointment = async (req, res) => {
  try {
    let { barberId, serviceIds, adults = 1, date, time, name, mobile } = req.body;

    if (!barberId || !serviceIds || !date || !time || !name || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const barber = await Barber.findById(barberId);
    if (!barber) return res.status(404).json({ message: "Barber not found" });

    // Find slots for the date
    const dateSlotIndex = barber.timeSlots.findIndex(ts => ts.date === date);
    if (dateSlotIndex < 0) return res.status(400).json({ message: "No slots set for this date" });

    const dateSlot = barber.timeSlots[dateSlotIndex];

    // Calculate total service duration
    const services = await Service.find({ _id: { $in: serviceIds } });
    const totalServiceDuration = services.reduce((sum, s) => {
      const match = s.duration.match(/\d+/);
      return sum + (match ? parseInt(match[0], 10) : 0);
    }, 0);

    // Find a matching slot
    const slotIndex = dateSlot.slots.findIndex(slot => {
      const [sh, sm] = slot.start.split(":").map(Number);
      const [eh, em] = slot.end.split(":").map(Number);
      return (eh * 60 + em) - (sh * 60 + sm) >= totalServiceDuration;
    });

    if (slotIndex === -1) {
      return res.status(400).json({ message: "No slot fits the service duration" });
    }

    const slot = dateSlot.slots[slotIndex];

    // Compute booking end time
    const addMinutes = (time, mins) => {
      let [h, m] = time.split(":").map(Number);
      m += mins;
      h += Math.floor(m / 60);
      m %= 60;
      return `${h.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}`;
    };
    const bookingEnd = addMinutes(slot.start, totalServiceDuration);

    // Check if slot already booked
    const existing = await Appointment.findOne({
      barberId,
      date,
      time: `${slot.start} - ${bookingEnd}`,
      status: { $ne: "cancelled" }
    });

    if (existing) return res.status(400).json({ message: "This time slot is already booked" });

    // Update barber slots: replace booked portion
    const [sh, sm] = slot.start.split(":").map(Number);
    const [eh, em] = slot.end.split(":").map(Number);
    const slotEndMinutes = eh*60 + em;
    const bookingEndMinutes = bookingEnd.split(":").reduce((a,b,i)=> i===0 ? parseInt(b)*60 : a+parseInt(b), 0);
    const leftoverMinutes = slotEndMinutes - bookingEndMinutes;

    const newSlots = [];
    if (leftoverMinutes > 0) newSlots.push({ start: bookingEnd, end: slot.end });

    // Replace old slot with leftover
    dateSlot.slots.splice(slotIndex, 1, ...newSlots);
    await barber.save();

    // Save appointment
    const newAppointment = new Appointment({
      barberId,
      serviceIds,
      date,
      time: `${slot.start} - ${bookingEnd}`,
      name,
      mobile,
      adults,
      status: "pending",
    });
    await newAppointment.save();

    const populatedAppointment = await Appointment.findById(newAppointment._id)
      .populate("barberId", "name")
      .populate("serviceIds", "name duration");

    // Socket emit
    const io = req.app.get("io");
    if (io) io.emit("newAppointment", populatedAppointment);

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: populatedAppointment
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error booking appointment", error: err.message });
  }
};


// exports.getAvailableSlots = async (req, res) => {
//   try {
//     const { barberId, date, serviceIds } = req.body;

//     console.log("➡️ Request Data:", { barberId, date, serviceIds });

//     // 1. Barber find
//     const barber = await Barber.findById(barberId);
//     if (!barber) {
//       return res.status(404).json({ message: "Barber not found" });
//     }

//     console.log("➡️ Barber Slots:", barber.timeSlots);

//     // 2. Services find
//     const services = await Service.find({ _id: { $in: serviceIds } });
//     if (!services || services.length === 0) {
//       return res.status(404).json({ message: "Services not found" });
//     }

//     // 3. Total duration calculate
//     // 3. Total duration calculate
//     const totalServiceDuration = services.reduce((sum, s) => {
//       let dur = s.duration;

//       if (typeof dur === "string") {
//         // extract number from "30 minutes"
//         const match = dur.match(/\d+/);
//         dur = match ? parseInt(match[0], 10) : 0;
//       }

//       return sum + dur;
//     }, 0);

//     console.log("➡️ Selected Services:", services.map(s => ({
//       name: s.name,
//       duration: s.duration
//     })));
//     console.log("➡️ Total Service Duration:", totalServiceDuration, "minutes");

//     // 4. Slot filter
//     const matchingSlots = barber.timeSlots.filter(slot => {
//       if (!slot.start || !slot.end) return false;

//       const [sh, sm] = slot.start.split(":").map(Number);
//       const [eh, em] = slot.end.split(":").map(Number);

//       const startMinutes = sh * 60 + sm;
//       const endMinutes = eh * 60 + em;
//       const slotDuration = endMinutes - startMinutes;

//       console.log(`➡️ Slot ${slot.start}-${slot.end} = ${slotDuration} minutes`);

//       return slotDuration >= totalServiceDuration;
//     });

//     // 5. Response
//     if (matchingSlots.length === 0) {
//       return res.json({
//         barberId,
//         date,
//         availableSlots: [],
//         message: "No matching slot available for selected services"
//       });
//     }

//     res.json({
//       barberId,
//       date,
//       availableSlots: matchingSlots,
//       message: "Slots available"
//     });

//   } catch (err) {
//     console.error("❌ Error fetching slots:", err);
//     res.status(500).json({ message: "Error fetching slots", error: err.message });
//   }
// };

exports.getAvailableSlots = async (req, res) => {
  try {
    const { barberId, date, serviceIds } = req.body;

    if (!barberId || !date || !serviceIds || !serviceIds.length) {
      return res.status(400).json({ message: "barberId, date, and serviceIds are required" });
    }

    const barber = await Barber.findById(barberId);
    if (!barber) return res.status(404).json({ message: "Barber not found" });

    // Find slots for that date
    const dateSlot = barber.timeSlots.find(ts => ts.date === date);
    if (!dateSlot || !dateSlot.slots.length) {
      return res.json({ availableSlots: [], message: "No slots for this date" });
    }

    // Calculate total service duration
    const services = await Service.find({ _id: { $in: serviceIds } });
    const totalServiceDuration = services.reduce((sum, s) => {
      const match = s.duration.match(/\d+/);
      return sum + (match ? parseInt(match[0], 10) : 0);
    }, 0);

    // Filter slots that can accommodate the service duration
    const matchingSlots = dateSlot.slots.filter(slot => {
      const [sh, sm] = slot.start.split(":").map(Number);
      const [eh, em] = slot.end.split(":").map(Number);
      return (eh * 60 + em) - (sh * 60 + sm) >= totalServiceDuration;
    });

    res.json({
      barberId,
      date,
      availableSlots: matchingSlots,
      message: matchingSlots.length ? "Slots available" : "No matching slots for selected services"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching slots", error: err.message });
  }
};


exports.cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({ message: "appointmentId is required" });
    }

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Mark appointment as cancelled (soft delete, better than removing doc)
    appointment.status = "cancelled";
    await appointment.save();

    res.json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({ message: "Error cancelling appointment", error: error.message });
  }
};
