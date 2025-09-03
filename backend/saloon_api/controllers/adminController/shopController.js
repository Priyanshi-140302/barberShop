const ShopSetting = require("../../models/shopModel");

exports.setWorkingHours = async (req, res) => {
  try {
    const { workingHours, holidays } = req.body;
    let settings = await ShopSetting.findOne();
    if (!settings) {
      settings = new ShopSetting({ workingHours, holidays });
    } else {
      settings.workingHours = workingHours || settings.workingHours;
      settings.holidays = holidays || settings.holidays;
    }
    await settings.save();
    res.json({ message: "Shop settings updated successfully", settings });
  } catch (error) {
    res.status(500).json({ message: "Error updating settings", error: error.message });
  }
};

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
