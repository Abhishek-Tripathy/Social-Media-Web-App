import postCol from "../../models/postModel.mjs"

export default async (req, res) => {
   try {
      const post = await postCol.find()

      res.status(200).json({
         status: post.length > 0 ? true : false, message: post
      })
   } catch (error) {
      console.error(error)
   }
}