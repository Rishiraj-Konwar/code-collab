import express from "express"
import { authMiddleware } from "../../middlewares"
import { userController } from "../../controllers"

export const userRouter = express.Router()

userRouter.get("/", authMiddleware.authenticateUser, userController.getUser)
userRouter.patch("/", authMiddleware.authenticateUser, userController.updateUser)
userRouter.patch("/change-password", authMiddleware.authenticateUser, userController.changePassword)
userRouter.delete("/", authMiddleware.authenticateUser, userController.deleteUser)
