import express from "express"
import signin from "../controllers/SignIn/signin.mjs"
import signup from "../controllers/SignUp/signup.mjs"
import signOut from "../controllers/SignOut/signOut.mjs"
import getUserFromCookie from "../controllers/GetUserFromCookie/getUserFromCookie.mjs"
import getAllPosts from "../controllers/GetAllPosts/getAllPosts.mjs"
import createPost from "../controllers/CreatePost/createPost.mjs"
import deletePost from "../controllers/DeletePost/deletePost.mjs"
import modifyPost from "../controllers/ModifyPost/modifyPost.mjs"

const router = express.Router()

router.post("/signin", signin) //checked

router.post("/signup", signup) //checked

router.get("/signout", signOut) //checked

router.get("/getUser", getUserFromCookie) //

router.get("/getAllPost", getAllPosts)

router.post("/createPost", createPost) //

router.delete("/deletePost" , deletePost)

router.put("/modifyPost", modifyPost)

export {router} 