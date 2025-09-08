// const express = require('express');
// const cors = require('cors');
// const http = require('http');   
// const { Server } = require('socket.io');
// const path = require('path');
// const bcrypt = require('bcryptjs');
// const adminRouter = require('./router/adminRoutes');
// const userRouter = require('./router/userRoutes');


// const app = express();
// require('dotenv').config();
// require('./db/conn');

// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(express.json({ limit: '50mb' })); // handle JSON
// app.use(express.urlencoded({ extended: true }));

// app.use('/api/v1/users',userRouter);
// app.use('/api/v1/admin', adminRouter);

// // ✅ Create HTTP + Socket.IO server
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });

// // ✅ Socket.IO connection check
// io.on("connection", (socket) => {
//   console.log("⚡ New client connected:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("❌ Client disconnected:", socket.id);
//   });
// });

// // Make io available in routes
// app.set("io", io);


// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const bcrypt = require('bcryptjs');
const adminRouter = require('./router/adminRoutes');
const userRouter = require('./router/userRoutes');

const app = express();
require('dotenv').config();
require('./db/conn');

const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/admin', adminRouter);

// ✅ Create HTTP + Socket.IO server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// ✅ Socket.IO connection check
io.on("connection", (socket) => {
  console.log("⚡ New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// Make io available in routes
app.set("io", io);

// ✅ Use server.listen, not app.listen
server.listen(PORT, () => {
  console.log(`🚀 Server running with Socket.IO on port ${PORT}`);
});
