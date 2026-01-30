import type { Model } from "sequelize";

interface UserAttributes {
  id? : string,
  username: string,
  email: string,
  hashedPassword: string
}

export interface UserInstance extends Model<UserAttributes>{}

interface RoomAttributes{}