import express from "express"
import { authMiddleware } from "../../middlewares"
import { roomController, userRoomController } from "../../controllers"

export const roomRouter = express.Router()

roomRouter.post("/", authMiddleware.authenticateUser, roomController.createRoom)
roomRouter.patch("/:slug", authMiddleware.authenticateUser, roomController.updateRoom)
roomRouter.delete("/:slug", authMiddleware.authenticateUser, roomController.deleteRoom)
roomRouter.post("/:slug/join", authMiddleware.authenticateUser, userRoomController.joinRoom)
roomRouter.delete("/:slug/leave", authMiddleware.authenticateUser, userRoomController.leaveRoom)
