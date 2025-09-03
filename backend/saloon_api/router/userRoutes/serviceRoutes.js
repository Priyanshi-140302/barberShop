const express = require('express');
const router = express.Router();
const ServiceController = require('../../controllers/userController/serviceController');
// const { authenticate } = require('../middleware/authMiddleware');

router.get('/getAllService', ServiceController.getAllServices);
router.get('/getServiceById/:id', ServiceController.getServiceById);


module.exports = router;