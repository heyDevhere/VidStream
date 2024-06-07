import User from "../models/User.js";
import Video from "../models/Video.js";
import Notification from "../models/Notification.js";
import { createError } from "../error.js";

// export const addVideo = async (req, res, next) => {
//   console.log(req.data);
//   const newVideo = new Video({ userId: req.user.id, ...req.body });
//   try {
//     const savedVideo = await newVideo.save();
//     res.status(200).json(savedVideo);
//   } catch (err) {
//     console.log(err);
//     next(createError(403, "hjhj"));
//   }
// };

export const addVideo = async (req, res, next) => {
  try {
    // Create a new video instance
    const newVideo = new Video({ userId: req.user.id, ...req.body });

    // Save the new video
    const savedVideo = await newVideo.save();

    // Find the user who uploaded the video
    const uploader = await User.findById(req.user.id);

    // Get the list of subscribers of the uploader
    const subscriberUser = uploader.subscriberUser;

    // Create notifications for each subscriber
    if(subscriberUser.length>0){
    const notifications = subscriberUser.map(subscriberId => {
      return new Notification({
        recipient: subscriberId,
        type: 'video',
        videoId: savedVideo._id,
        message: `New video uploaded by ${uploader.name}: ${savedVideo.title}`
      });
    });
    // Save all notifications to the database
    const res = await Notification.insertMany(notifications);
    console.log(res.data);
  }

    // Respond with the saved video
    res.status(200).json(savedVideo);
  } catch (err) {
    console.error(err);
    next(createError(403, "Failed to upload video"));
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    
  } catch (err) {
    next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("The video has been deleted.");
    } else {
      return next(createError(403, "You can delete only your video!"));
    }
  } catch (err) {
    next(err);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

export const getVideobyId = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const video = await Video.findById(user.userId);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("The view has been increased.");
  } catch (err) {
    next(err);
  }
};

export const random = async (req, res, next) => {
  try {
    
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

// export const getClickedVideos = async (req, res, next) => {
//   try {
//     // Find all videos where clicked is true
//     const clickedVideos = await Video.find({ Clicked: true });

//     res.status(200).json(clickedVideos); // Respond with the fetched videos
//   } catch (error) {
//     console.log(error);
//     next(error); // Pass any errors to the error handling middleware
//   }
// };

export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map(async (channelId) => {
        return await Video.find({ 
          userId: channelId,
         });
      })
    ); 

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    // it looks inside arrays and check whether the specific eleement is present in tags or not
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};  
