import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const update = async (req, res, next) => {

  try {
    const video = await Video.findById(req.params.id);
    const userId = req.user.id;
    if (!video) return next(createError(404, "Video not found!"));
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { clickedVideos: video._id }
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  }
  catch (error) {
    console.log(error);
  }

};

export const updateUploadVideos = async (req, res, next) => {

  try {
    const video = await Video.findById(req.params.id);
    const userId = req.user.id;
    if (!video) return next(createError(404, "Video not found!"));
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { UploadedVideos: video._id }
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  }
  catch (error) {
    console.log(error);
  }

};



export const updateWatchLater = async (req, res, next) => {

  try {
    console.log(req.data);
    const video = await Video.findById(req.params.id);
    const userId = req.user.id;
    if (!video) return next(createError(404, "Video not found!"));
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { WatchLaterVideos: video._id }
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  }
  catch (error) {
    console.log(error);
  }

};









// jwt se jo token mila h
// if (req.params.id === req.user.id) {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       // updated dikhane ke liye !
//       { new: true }
//     );
//     res.status(200).json(updatedUser);
//   } catch (err) {
//     next(err);
//   }
// } else {
//   return next(createError(403, "You can update only your account!"));
// }
// };

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can delete only your account!"));
  }
};

export const getClickedVideos = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const Clickedvideos = user.clickedVideos;

    const list = await Promise.all(
      Clickedvideos.map(async (_id) => {
        return await Video.find({
          _id: _id,
        });
      })
    );
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));

  } catch (err) {
    next(err);
  }

};

export const getWatchLaterVideos = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const WatchLatervideos = user.WatchLaterVideos;

    const list = await Promise.all(
      WatchLatervideos.map(async (_id) => {
        return await Video.find({
          _id: _id,
        });
      })
    );
    res.status(200).json(list.flat());

  } catch (err) {
    next(err);
  }

};


export const getUsersWithVideos = async (req, res) => {
  try {
    // Find users whose uploadedVideos array is not empty
    const users = await User.find({ uploadedVideos: { $ne: [] } })
    
    // For each user, fetch their videos
    const usersWithVideos = await Promise.all(
      users.map(async (user) => {
        // Fetch videos for each user
        const videos = await Promise.all(
          user.UploadedVideos.map(async (videoId) => {
            return await Video.findById(videoId);
          })
        );

        // Return user along with their videos
        // return {
        //   ...user.toObject(), // Convert Mongoose document to plain object
        //   uploadedVideos: videos,
        // };
        return videos.sort((a, b) => b.createdAt - a.createdAt);
      })
    );

    res.status(200).json(usersWithVideos);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getUploadedVideos = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const Uploadedvideos = user.UploadedVideos;

    if(Uploadedvideos.length>0){
    const list = await Promise.all(
     Uploadedvideos.map(async (_id) => {
        return await Video.find({
          _id: _id,
        });
      }) 
    );
    res.status(200).json(list.flat());
  }
  else{
    res.status(200).json([]);

  }

  } catch (err) {
    next(err);
  }

};

export const getSubUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id);
    const subscribedUsers = user.subscribedUsers;
    res.status(200).json(subscribedUsers);
  } catch (err) {
    next(err);
  }
};




export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
      $push: { subscriberUser: req.user.id },

    });
    res.status(200).json("Subscription successfull.")
  } catch (err) {
    next(err);
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedUsers: req.params.id },
      });
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 },
      });
      res.status(200).json("Unsubscription successfull.")
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};


export const like = async (req, res, next) => {
  console.log("wowowow");
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id }
    })
    res.status(200).json("The video has been liked.");
    console.log("video liked");
  } catch (err) {
    next(err);
  }
};

export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id }
    })
    res.status(200).json("The video has been disliked.")
  } catch (err) {
    next(err);
  }
};