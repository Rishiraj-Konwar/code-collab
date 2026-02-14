import express from "express"
import {authRouter} from "./auth-routes"
import { userRouter } from "./user-routes"
import { roomRouter } from "./room-routes"
import { codeSnapRouter } from "./code-snap-routes"

export const v1Routes = express.Router()

v1Routes.use("/auth", authRouter)
v1Routes.use("/users", userRouter)
v1Routes.use("/rooms", roomRouter)
v1Routes.use("/rooms/:slug/output", codeSnapRouter)