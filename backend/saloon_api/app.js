const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const adminRouter = require('./router/adminRoutes');
const userRouter = require('./router/userRoutes');


const app = express();
require('dotenv').config();
require('./db/conn');

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // handle JSON
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users',userRouter);
app.use('/api/v1/admin', adminRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
