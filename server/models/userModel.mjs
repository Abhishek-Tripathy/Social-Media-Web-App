import mongoose from "mongoose";

const userSchema = mongoose.Schema({
   userDetails: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      profilePic: String,
      gender: { type: String, required: true },
      bio: { type: String, required: false },
      email: { type: String, required: true, unique: true },
      mobileNo: { type: String, required: false, default: "NA" },
      password: { type: String, required: true },
      username: { type: String, required: true, unique: true }
  },
  creationDateAndTime: {
      time: String,
      date: String
  },
  postList: [
      { postId: mongoose.Schema.Types.ObjectId }
  ],
  followers: [{
      username: String,
      profilePic: String
  }],
  followings: [{
      username: String,
      profilePic: String
  }],
  notifications: [{ // later
      message: String,
      dateAndTime: {
          date: String,
          time: String
      }
  }]
}, {timestamps: true})

export const userCol = mongoose.model("UserCollection", userSchema)