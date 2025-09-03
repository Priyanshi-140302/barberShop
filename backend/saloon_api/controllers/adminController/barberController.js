const e = require('express');
const Barber = require('../../models/barberModel');

exports.createBarber = async (req, res) => {
  try {
    const { name, experience, specialization, phone, email, timeSlots } = req.body;

    const barberExist = await Barber.findOne({ email });
    if (barberExist) {
      return res.status(400).json({ message: "Barber already exists" });
    }

    const newBarber = new Barber({
      name,
      experience,
      specialization,
      phone,
      email,
      timeSlots: timeSlots || [] // default empty array if not provided
    });

    await newBarber.save();
    res.status(201).json({ message: "Barber added successfully", barber: newBarber });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add barber", error: error.message });
  }
};


exports.getAllBarbers = async (req, res) => {
    try {
        const barbers = await Barber.find();
        res.status(200).json({ barbers });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch barbers', error: error.message });
    }
}

exports.getBarberById = async (req, res) => {
    try {
        const barberId = req.params.id;
        const barber = await Barber.findById(barberId);
        if (!barber) {
            return res.status(404).json({ message: 'Barber not found' });
        }
        res.status(200).json({ barber });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch barber', error: error.message });
    }
}

exports.updateBarber = async (req, res) => {
  try {
    const barberId = req.params.id;
    const updates = req.body; // may contain `timeSlots`

    const updatedBarber = await Barber.findByIdAndUpdate(barberId, updates, { new: true });
    if (!updatedBarber) {
      return res.status(404).json({ message: "Barber not found" });
    }

    res.status(200).json({ message: "Barber updated successfully", barber: updatedBarber });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update barber", error: error.message });
  }
};


exports.deleteBarber = async (req, res) => {
    try {
        const barberId = req.params.id;
        const deletedBarber = await Barber.findByIdAndDelete(barberId);
        if (!deletedBarber) {
            return res.status(404).json({ message: 'Barber not found' });
        }
        res.status(200).json({ message: 'Barber deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to delete barber', error: error.message });
    }
}   