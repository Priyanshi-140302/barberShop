const express = require('express');
const adminRouter = express.Router();


adminRouter.use('/admin', require('./adminRoutes'));
adminRouter.use('/services', require('./serviceRoutes'));
adminRouter.use('/barbers',require('./barberRoutes'));
adminRouter.use('/appointments',require('./appointmentRoutes'));
adminRouter.use('/shop',require('./shopRoutes'));


module.exports = adminRouter;