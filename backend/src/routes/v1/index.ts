import express from "express"
import { userRouter } from "./user-router";

export const v1Router = express.Router();


v1Router.use('/user',userRouter)
// v1Router.use('./payment',)
