import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        // required: true,
    },
 
    img: {
        type: String,
        default:"https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
    },
    // mere channel ke subscribers ka count
    subscribers: {
        type: Number,
        default: 0
    },


    subscriberUser: {
        type: [String]

    },
    // channels whom u have subcribbed
    subscribedUsers: {
        type: [String]
    },
    fromGoogle: {
        type: Boolean,
        default: false
    },
    clickedVideos: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Video',
        default: [],
    },
    WatchLaterVideos: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Video',
        default: [],
    },
    UploadedVideos:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Video',
        default: [],
    },

    tokens:[
        {
            token:{
                type: String,
            }
        }
    ]

}, { timestamps: true });

// New Collection = > UserSchema
export default mongoose.model("User", UserSchema);
