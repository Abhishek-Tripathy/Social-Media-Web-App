import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    userDetails: {
        username: String,
        profilePic: String
    },
    creationDateAndTime: {
        date: String,
        time: String
    },
    postContent: {
        caption: String,
        location: { type: String, required: false },
        images: [],
        likes: [{
            userId: mongoose.Schema.Types.ObjectId // It will hold the user _ids of the users those have liked the post
        }],
        comments: [
            {
                username: String,
                profilePic: String,
                creationDateAndTime: {
                    date: String,
                    time: String
                },
                comment: String
            }
        ]
    }
}, { timestamps: true })


const postCol = new mongoose.model("postCollection", postSchema)

export default postCol;