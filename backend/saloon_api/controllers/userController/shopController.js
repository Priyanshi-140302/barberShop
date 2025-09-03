const ShopSetting = require("../../models/shopModel");


exports.getSettings = async (req, res) => {
  try {
    const settings = await ShopSetting.findOne();
    if (!settings) {
      return res.status(404).json({ message: "No settings found" });
    }
    res.json({ message: "Shop settings fetched successfully", settings });
  } catch (error) {
    res.status(500).json({ message: "Error fetching settings", error: error.message });
  }
};
