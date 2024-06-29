import Notification from "../models/Notification.js";
import { createError } from "../error.js";

// Fetch notifications for a particular user
export const getUserNotifications = async (req, res, next) => {
  try {
    // Fetch notifications where the current user is the recipient
    const notifications = await Notification.find({ recipient: req.user.id })
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .populate('videoId', 'title') // Populate videoId field with title from Video model
      .exec();

    res.status(200).json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
    next(createError(500, "Failed to fetch notifications"));
  }
};


export const deleteNotification = async (req, res, next) => {
  const vId = req.params.videoId;

  try {
    // Find and delete the notification by videoId
    const result = await Notification.deleteOne({ "videoId._id": vId});

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: 'Notification not found' });
    }

    res.send({ message: 'Notification deleted successfully' });
  } catch (error) {
    next(createError(500, 'Failed to delete notification'));
  }
  
};