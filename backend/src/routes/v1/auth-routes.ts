import express from "express"
import type {Request, Response} from "express"

export const authRouter = express.Router()

authRouter.get("/", (req: Request, res: Response) => {
  res.send("This is the auth route")
})