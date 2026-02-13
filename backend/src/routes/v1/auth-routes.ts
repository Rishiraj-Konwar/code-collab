import express from "express"
import { authController } from "../../controllers"

export const authRouter = express.Router()

authRouter.post("/signup", authController.signUp)
authRouter.post("/login", authController.login)