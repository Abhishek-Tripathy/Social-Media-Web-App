import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const web = express()
const PORT = process.env.PORT || 8000

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
   .then(() => console.log("DB connection successful"))
   .catch((err) => console.error(`DB connection error --> ${err}`))

web.listen(PORT, () => {
   console.log(`Server is listening at ${PORT}`);
})