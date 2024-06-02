import express from "express";
import { addVideo, addView, getByTag, getVideo, random, search, sub, trend, updateVideo,getVideobyId,deleteVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";


const router = express.Router();

// create a video
router.post("/", verifyToken, addVideo)

// 
router.post("/:id",verifyToken,updateVideo)
// 

router.put("/:id", verifyToken, addVideo)
router.delete("/:id", verifyToken, addVideo)
router.delete("/:id", verifyToken,deleteVideo )
router.get("/find/:id", getVideo)
router.get("/find",verifyToken,getVideobyId)

router.put("/view/:id", addView)
router.get("/trend", trend)
router.get("/random", random)
router.get("/sub",verifyToken, sub)
router.get("/tags", getByTag)
router.get("/search", search)

// router.get("/history",verifyToken, getClickedVideos);

export default router;      