const express = require('express');
const router = express.Router();
const BarberController = require('../../controllers/userController/barberController');
// const { authenticate } = require('../middleware/authMiddleware');

router.get('/all-barbers', BarberController.getAllBarbers);
router.get('/barber/:id', BarberController.getBarberById);

module.exports = router;