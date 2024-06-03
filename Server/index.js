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

const corsOptions = {
  origin: 'https://video-8c3ca.firebaseapp.com/__/auth/handler?apiKey=AIzaSyBc77MlQNQbhU4v-HPVyrV5SE79qD3EsAU&appName=%5BDEFAULT%5D&authType=signInViaPopup&redirectUrl=http%3A%2F%2Flocalhost%3A3000%2Fsignin&v=10.12.0&eventId=3604638201&providerId=google.com&scopes=profile', 
 
};

const app = express();
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

// app.use((req, res, next) => {
//   res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
//   next();
// });

app.use(cors({
     origin:["https://deploy-mern-1whq.vercel.app"],
     methods:["POST","GET"],
     credentials:true
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notify", notifyRoutes);

app.listen(8800,()=>{
  connect();
  console.log("listening on 8800");
});
