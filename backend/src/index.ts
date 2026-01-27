import {ServerConfig} from "./config"
import app from "./app"

app.listen(ServerConfig.Port, () => {
  console.log(`Server running on http://localhost:${ServerConfig.Port}`)
})