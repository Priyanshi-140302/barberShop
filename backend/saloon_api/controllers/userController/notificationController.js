const User = require("../../models/userModel"); 
const Notification = require("../../models/notificationModel"); 

exports.sendNotification = async (req, res) => {
  try {
    const { userId, title, message } = req.body;

    if (!userId || !title || !message) {
      return res.status(400).json({ message: "userId, title, and message are required" });
    }
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const notification = new Notification({
      userId,
      title,
      message,
      createdAt: new Date(),
    });
    await notification.save();
    res.status(200).json({
      message: "Notification sent successfully",
      notification,
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ message: "Error sending notification", error });
  }
};
