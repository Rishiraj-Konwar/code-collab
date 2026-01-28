import express from "express"
import type {Request, Response} from "express"
import {DbConfig} from "./db/index"
import {router} from "./routes"

const app = express()
app.use(express.json())

await DbConfig.connectDb()

app.get("/", (req: Request, res: Response) => {
  res.send("This is code Collab")
})

app.use("/api", router)

export default app