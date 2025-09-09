const express = require("express");
const router = express.Router();
const shopController = require("../../controllers/adminController/shopController");
// const { authenticate } = require("../middleware/authMiddleware");

router.put("/working-hours", shopController.setWorkingHours);
router.get("/getShopSettings", shopController.getSettings);
router.get("/get-total-monthly-holidays", shopController.getMonthlyHolidays);

module.exports = router;
