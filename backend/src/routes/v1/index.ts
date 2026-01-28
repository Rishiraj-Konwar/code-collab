import express from "express"
import {authRouter} from "./auth-routes"

export const v1Routes = express.Router()

v1Routes.use("/auth", authRouter)