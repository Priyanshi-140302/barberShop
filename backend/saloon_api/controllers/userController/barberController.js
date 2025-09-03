const e = require('express');
const Barber = require('../../models/barberModel');

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
