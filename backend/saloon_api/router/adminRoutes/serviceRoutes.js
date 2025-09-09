const express = require('express');
const router = express.Router();
const ServiceController = require('../../controllers/adminController/serviceController');
// const { authenticate } = require('../middleware/authMiddleware');

router.post('/create-service', ServiceController.createService);
router.get('/getAllService', ServiceController.getAllServices);
router.get('/getServiceById/:id', ServiceController.getServiceById);
router.put('/updateService/:id', ServiceController.updateService);
router.delete('/deleteService/:id', ServiceController.deleteService);
router.get('/total-services', ServiceController.getTotalServices);


module.exports = router;