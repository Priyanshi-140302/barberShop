const express = require("express");
const router = express.Router();
const notificationController = require("../../controllers/userController/notificationController");
// const { authenticate } = require("../middleware/authMiddleware");

router.post("/notifications-send", notificationController.sendNotification);

module.exports = router;
