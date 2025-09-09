const express = require('express');
const router = express.Router();
const appointmentController = require('../../controllers/adminController/appointmentController');
// const { authenticate } = require('../middleware/authMiddleware');

// router.post('/book-appointment', appointmentController.bookAppointment);
router.put('/approve-appointment/:id', appointmentController.approveAppointment);
router.put('/reject-appointment/:id', appointmentController.rejectAppointment);
router.delete('/delete-appointment/:id', appointmentController.deleteAppointment);
router.put('/complete-appointment/:id', appointmentController.completeAppointment);
router.get('/get-appointments', appointmentController.getAllAppointments);
router.get('/get-appointment/:id', appointmentController.getAppointmentById);
router.get('/total-appointments',appointmentController.getTotalCustomers);

module.exports = router;