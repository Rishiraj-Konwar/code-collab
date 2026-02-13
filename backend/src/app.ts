import express from "express"
import type {Request, Response} from "express"
import {DbConfig} from "./db/index"
import {router} from "./routes"
import cookieParser from "cookie-parser"

const app = express()
await DbConfig.connectDb()

app.use(cookieParser())
app.use(express.json())

app.use("/api", router)

app.get("/", (req: Request, res: Response) => {
  res.send("This is code Collab")
})


export default app