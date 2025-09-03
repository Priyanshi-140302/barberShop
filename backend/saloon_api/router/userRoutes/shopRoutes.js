const express = require("express");
const router = express.Router();
const shopController = require("../../controllers/userController/shopController");
// const { authenticate } = require("../middleware/authMiddleware");

router.get("/getShopSettings", shopController.getSettings);

module.exports = router;
