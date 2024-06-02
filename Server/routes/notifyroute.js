import express from "express";
import { getUserNotifications , deleteNotification } from "../controllers/notify.js";
import {verifyToken} from "../verifyToken.js"
const router = express.Router();

router.get("/getNotifications",verifyToken, getUserNotifications);

router.delete("/delete/:id",deleteNotification)

export default router;