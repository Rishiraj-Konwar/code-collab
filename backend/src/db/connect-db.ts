import {Sequelize} from "sequelize"
import {ServerConfig} from "../config"

const sequelize = new Sequelize(ServerConfig.Db_url as string)

export const connectDb = async () => {
  try{
    await sequelize.authenticate()
    console.log("Connection to database was successfull")
  }catch(err){
    console.error("Unable to connect to database:", err)
    process.exit(1)
  }
}