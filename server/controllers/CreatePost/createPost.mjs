import postCol from "../../models/postModel.mjs"
import { userCol } from "../../models/userModel.mjs";
import { generateTime } from "../../utils/generateTime.mjs";

export default async (req, res) => {
   try {
      const {username, profilePic, caption, location, images} = req.body

      if(!username || !profilePic || !caption || !location || images.length !== 0) {
         return res
            .status(400)
            .json({ status: false, message: "All fields must be filled" });
      }

      const post = new postCol({
         userDetails: {
            username,
            profilePic
         },
         creationDateAndTime: {
            time: generateTime(),
            date: generateDate(),
          },
          postContent: {
            caption,
            location,
            images
          }
      })

      const saveInDB = await post.save();

      if(!saveInDB) return res.status(400).json({statur: false, message: "post not created"})

      
      const userResponse = await userCol.findOneAndUpdate(
         {"useDetails.username" : username},
         {$push: {
            postList: {postId: saveInDB._id}
         }},
         {new: true}
      )

      if(!userResponse) {
         await postCol.findByIdAndDelete(saveInDB._id)
         return  res.status(400).json({statur: false, message: "find and update not done properly "})
      }

      res.status(200).json({
         status: true,
         message: saveInDB
      })

   } catch (error) {
      console.error ("Error at create post", error)
      res.status(500).send()
   }
}