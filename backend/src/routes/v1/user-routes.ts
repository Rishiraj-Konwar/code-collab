import express from "express"
import { authMiddleware } from "../../middlewares"
import { userController } from "../../controllers"

export const userRouter = express.Router()

userRouter.get("/", authMiddleware.authenticateUser, userController.getUser)