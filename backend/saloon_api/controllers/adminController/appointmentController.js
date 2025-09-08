const Appointment = require('../../models/appointmentModel');

exports.approveAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    res.json({ message: "Appointment approved", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error approving appointment", error });
  }
};

exports.rejectAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    res.json({ message: "Appointment rejected", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error rejecting appointment", error });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting appointment", error });
  }
};

exports.completeAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "completed" },
      { new: true }
    );

    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    res.json({ message: "Appointment marked as completed", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error completing appointment", error });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("barberId", "name email")       
       .populate("serviceIds", "name price");   

    res.json({
      message: "Appointments fetched successfully",
      count: appointments.length,
      appointments
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error: error.message });
  }
};


exports.getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id)
      .populate("barberId", "name email")
       .populate("serviceIds", "name price");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({
      message: "Appointment fetched successfully",
      appointment
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointment", error: error.message });
  }
};
