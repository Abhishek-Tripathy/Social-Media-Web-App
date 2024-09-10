import { userCol } from "../../models/userModel.mjs";
import bcryptjs from "bcryptjs"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config() 
const privateKey = process.env.JWT_TOKEN

export default async (req, res) => {
   try {
      const {emailOrUsername, password} = req.body

      if(!emailOrUsername || !password) return res
      .status(400)
      .json({status: false, message: "Email/Username or Password needed"})

      const user = await userCol.findOne({
         $or: [
            {"userDetails.username" : emailOrUsername},
            {"userDetails.email" : emailOrUsername}
         ]
      }) 

      if(!user) return res
      .status(400)
      .json({status: false, message: "User doesnt exist, Please sign up"})

      const isPasswordValid = bcryptjs.compareSync(password, user.userDetails.password)

      if(!isPasswordValid) return res
      .status(400)
      .json({status: false, message: "Wrong Credentials"})

      const createToken = jwt.sign({ userId: user._id }, privateKey);

      res.cookie("socialMediaApp", createToken, {
         httpOnly: true,
         maxAge: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 days in milliseconds
       });
   
       return res.status(200).json({
         status: true,
         message: user,
       });

   } catch (error) {
      console.error(`The error at Signin --> ${error}`)
   }
}