const Appointment = require('../../models/appointmentModel');
const Barber = require('../../models/barberModel');


exports.bookAppointment = async (req, res) => {
  try {
    let { barberId, serviceId, adults, children, date, time, name, mobile } = req.body;

    // Default to 0 if not provided
    adults = adults || 0;
    children = children || 0;

    // Basic validation
    if (!barberId || !serviceId || !date || !time || !name || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (adults === 0 && children === 0) {
      return res.status(400).json({ message: "At least one of adults or children must be greater than 0" });
    }

    if (adults < 0 || children < 0) {
      return res.status(400).json({ message: "Adults and children cannot be negative" });
    }

    // ✅ Check if barber exists
    const barber = await Barber.findById(barberId);
    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }

    // ✅ Check if chosen time is in barber’s allowed slots
    if (!barber.timeSlots.includes(time)) {
      return res.status(400).json({ message: "Invalid time slot for this barber" });
    }

    // ✅ Check if slot already booked
    const existing = await Appointment.findOne({ barberId, date, time });
    if (existing) {
      return res.status(400).json({ message: "This time slot is already booked" });
    }

    // Save appointment
    const newAppointment = new Appointment({
      barberId,
      serviceId,
      adults,
      children,
      date,
      time,
      name,
      mobile,
      status: "pending",
    });

    await newAppointment.save();

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Error booking appointment", error: error.message });
  }
};


exports.getAvailableSlots = async (req, res) => {
  try {
    const { barberId, date } = req.body;

    // Validate inputs
    if (!barberId || !date) {
      return res.status(400).json({ message: "barberId and date are required" });
    }

    // Find barber
    const barber = await Barber.findById(barberId);
    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }

    // Normalize date (only YYYY-MM-DD, no time)
    const selectedDate = new Date(date);
    const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));

    // Find appointments for that barber on that date
    const bookedAppointments = await Appointment.find({
      barberId,
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    const bookedTimes = bookedAppointments.map(a => a.time);

    // Filter out booked slots
    const availableSlots = barber.timeSlots.filter(
      slot => !bookedTimes.includes(slot)
    );

    res.json({
      barberId,
      date,
      availableSlots,
      message: availableSlots.length > 0 ? "Slots available" : "No slots available"
    });
  } catch (error) {
    console.error("Error fetching slots:", error);
    res.status(500).json({ message: "Error fetching slots", error: error.message });
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
