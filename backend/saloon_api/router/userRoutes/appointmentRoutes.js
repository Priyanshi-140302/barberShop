const express = require('express');
const router = express.Router();
const appointmentController = require('../../controllers/userController/appointmentController');
// const { authenticate } = require('../middleware/authMiddleware');

router.post('/book-appointment', appointmentController.bookAppointment);
router.post('/get-timeslots', appointmentController.getAvailableSlots);
router.put('/cancel-appointment', appointmentController.cancelAppointment);

module.exports = router;