import express from "express"
import {authRouter} from "./auth-routes"
import { userRouter } from "./user-routes"

export const v1Routes = express.Router()

v1Routes.use("/auth", authRouter)
v1Routes.use("/users", userRouter)