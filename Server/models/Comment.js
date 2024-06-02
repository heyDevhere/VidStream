import mongoose from "mongoose";

  const CommentSchema = new mongoose.Schema(
  {
    userId:{
        type: String,
        required: true,
    },
    videoId:{
        type: String,
        required: true,
    },
    desc:{
        type: String,
        required: true,
    },


  },
  
// timestamps: true ki madad se Mongoose automatically createdAt aur updatedAt fields ko schema mein add karta hai 
  { timestamps: true }
);

// New Collection = > UserSchema
export default mongoose.model("Comment", CommentSchema);
