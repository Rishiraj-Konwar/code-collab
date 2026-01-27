import express from "express"
import type {Request, Response} from "express"
import {DbConfig} from "./db/index"

const app = express()

await DbConfig.connectDb()

app.get("/", (req: Request, res: Response) => {
  res.send("This is code Collab")
})

export default app