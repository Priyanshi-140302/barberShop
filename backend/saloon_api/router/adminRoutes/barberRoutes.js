const express = require('express');
const router = express.Router();
const BarberController = require('../../controllers/adminController/barberController');
// const { authenticate } = require('../middleware/authMiddleware');

router.post('/create-barber', BarberController.createBarber);
router.get('/all-barbers', BarberController.getAllBarbers);
router.get('/barber/:id', BarberController.getBarberById);
router.put('/update-barber/:id', BarberController.updateBarber);
router.delete('/delete-barber/:id', BarberController.deleteBarber);
router.post('/set-barber-slots', BarberController.setBarberSlotsByDate);

module.exports = router;