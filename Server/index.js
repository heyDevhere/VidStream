import express from "express";
import mongoose from "mongoose";
import Dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import notifyRoutes from "./routes/notifyroute.js";
import commentRoutes from "./routes/comments.js";
import videoRoutes from "./routes/videos.js";
import authRoutes from "./routes/auth.js";

import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();


// Use CORS middleware
app.use(cors({
  origin: [
    "https://666351e5ca7ec3192dede89e--chimerical-churros-d71ead.netlify.app",
    "https://video-8c3ca.firebaseapp.com/__/auth/handler?apiKey=AIzaSyBc77MlQNQbhU4v-HPVyrV5SE79qD3EsAU&appName=%5BDEFAULT%5D&authType=signInViaPopup&redirectUrl=http%3A%2F%2Flocalhost%3A3000%2Fsignin&v=10.12.0&eventId=3604638201&providerId=google.com&scopes=profile"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}
));




// const corsOptions = {
//   origin: 'https://video-8c3ca.firebaseapp.com/__/auth/handler?apiKey=AIzaSyBc77MlQNQbhU4v-HPVyrV5SE79qD3EsAU&appName=%5BDEFAULT%5D&authType=signInViaPopup&redirectUrl=http%3A%2F%2Flocalhost%3A3000%2Fsignin&v=10.12.0&eventId=3604638201&providerId=google.com&scopes=profile', 
  
// };  

Dotenv.config();

const connect = () => {
  mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to DB");
  }).catch(err=>{
    throw err;
  });  
};  

app.use(express.json());

app.use(cookieParser());

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });  
});  

app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notify", notifyRoutes);

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');  
    next();
});



app.listen(8800,()=>{
  connect();
  console.log("listening on 8800");
});
