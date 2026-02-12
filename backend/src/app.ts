import express from "express"
import type {Request, Response} from "express"
import {DbConfig} from "./db/index"
import {router} from "./routes"
import cookieParser from "cookie-parser"

const app = express()

app.use(cookieParser())
app.use(express.json())

await DbConfig.connectDb()

app.get("/", (req: Request, res: Response) => {
  res.send("This is code Collab")
})

app.use("/api", router)

export default app