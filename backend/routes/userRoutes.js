import express from "express"
import { fetchUser, login, signup } from "../controllers/userController.js"
import authUser from "../middleware/auth.js"

const userRouter = express.Router()

userRouter.post('/signup',signup)
userRouter.post('/login',login)
userRouter.post('/user',authUser,fetchUser)

export default userRouter