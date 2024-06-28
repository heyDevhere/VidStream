import express from "express";
import {
  update,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
  getClickedVideos,
  updateWatchLater,
  getWatchLaterVideos,
  updateUploadVideos,
  getUploadedVideos,
  getUsersWithVideos,
  getSubUser,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.mjs";

const router = express.Router();

//update user
router.put("/:id", verifyToken, update);

router.put("/updatewatch/:id", verifyToken , updateWatchLater);

router.put("/userInfo/:id", verifyToken , updateUploadVideos);
router.get("/get/userInfo/:id",getUploadedVideos);

router.get("/getuserswithuvideos",getUsersWithVideos);


router.get("/history",verifyToken,getClickedVideos);

router.get("/watchLater",verifyToken,getWatchLaterVideos);

router.get("/subscribers",verifyToken,getSubUser);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get a user
router.get("/find/:id", getUser);

//subscribe a user
router.put("/sub/:id", verifyToken, subscribe);

//unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubscribe);

//like a video
router.put("/like/:videoId", verifyToken, like);

//dislike a video
router.put("/dislike/:videoId", verifyToken, dislike);

export default router;