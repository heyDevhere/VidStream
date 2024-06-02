import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
      default: "https://videopromotion.club/assets/images/default-video-thumbnail.jpg",
    },
    videoUrl: {
      type: String,
      required: true,
      default: "https://videopromotion.club/assets/images/default-video-thumbnail.jpg",

    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
    dislikes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);


// timestamps: true in Mongoose schema automatically adds two fields, createdAt and updatedAt, to the documents stored in the collection.

export default mongoose.model("Video", VideoSchema);