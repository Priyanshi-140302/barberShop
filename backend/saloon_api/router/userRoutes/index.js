const express = require('express');
const userRouter = express.Router();


// userRouter.use('/users', require('./userRoutes'));
userRouter.use('/services', require('./serviceRoutes'));
userRouter.use('/barbers',require('./barberRoutes'));
userRouter.use('/appointments',require('./appointmentRoutes'));
userRouter.use('/shop',require('./shopRoutes'));
userRouter.use('/notifications',require('./notificationRoutes'));


module.exports = userRouter;