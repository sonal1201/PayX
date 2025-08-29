import express from "express"
import { registerUser, signInUser, updateProfile } from "../../controllers/user"
import { authMiddleware } from "../../middlewares/auth-middleware";




export const userRouter = express.Router()

userRouter.post('/register', registerUser);
userRouter.post('/signin', signInUser);
userRouter.put('/updateprofile/:userId', authMiddleware, updateProfile)
