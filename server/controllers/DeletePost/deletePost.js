import postCol from "../../models/postModel.mjs";
import { userCol } from "../../models/userModel.mjs";

export default async (req, res) => {
  try {
    const { id, userId } = req.query;

    const userResponse = await userCol.updateOne(
      { _id: userId },
      {
        $pull: {
          postList: { postId: id },
        },
      }
    );

    if (userResponse.modifiedCount === 0)
      return res
        .status(200)
        .json({ status: false, message: "Post not deleted" });

    const responsePost = await postCol.findByIdAndDelete(id);

    if (!responsePost) {
      await userCol.findByIdAndUpdate(userId, {
        $push: {
          postList: { postId: id },
        },
      });
      return res
        .status(200)
        .json({ status: false, message: "Post not deleted" });
    }

    res.status(200).json({ status: true, message: "Post Deleted" });
  } catch (error) {
    console.error(`Error at delet post --> ${error}`);
  }
};
