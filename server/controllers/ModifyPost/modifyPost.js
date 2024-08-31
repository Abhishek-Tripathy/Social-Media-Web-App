import postCol from "../../models/postModel.mjs";
import { userCol } from "../../models/userModel.mjs";

export default async (req, res) => {
   try {
      const { id, userId, updatedContent } = req.body;

      
      const updatedPost = await postCol.findOneAndUpdate(
         { _id: id, userId },
         { $set: { content: updatedContent } },
         { new: true } 
      );

      
      if (!updatedPost)
         return res.status(404).json({ status: false, message: "Post not found or unauthorized" });

      res.status(200).json({ status: true, message: "Post updated successfully", updatedPost });

   } catch (error) {
      console.error(`Error at modify post --> ${error}`);
      res.status(500).json({ status: false, message: "Internal Server Error" });
   }
};
