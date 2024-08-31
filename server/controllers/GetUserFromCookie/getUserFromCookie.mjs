import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { userCol } from "../../models/userModel.mjs"

dotenv.config()
const privateKey = process.env.JWT_TOKEN


export default async (req, res) =>  {
   try {
      const token = req.cookies.socialMediaApp;

      if(!token) return res.status(200).json({
         status: false, message: null
      })

      const tokenVerified = jwt.verify(token, privateKey)
      const user = await userCol.findOne({_id: tokenVerified.useId})

      res.status(200).json({
         status: user ? true : false, message: user 
      })

   } catch (error) {
      console.error ("Error at get user from cookie", error)
      res.status(500).send()
   }
}