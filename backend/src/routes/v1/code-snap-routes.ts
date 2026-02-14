import express from "express"
import { authMiddleware, roomMiddleware } from "../../middlewares"
import { codeSnapController } from "../../controllers"

export const codeSnapRouter = express.Router()

codeSnapRouter.post("/", authMiddleware.authenticateUser, roomMiddleware.roleMiddleware, codeSnapController.sendOutput)