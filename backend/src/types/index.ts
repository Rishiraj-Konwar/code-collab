import type { Model } from "sequelize";

interface UserAttributes {
  id?: string;
  username: string;
  email: string;
  hashedPassword: string;
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes {}

interface RoomAttributes {
  roomId: string;
  name: string;
  description: string;
  slug: string;
}

export interface RoomIstance extends Model<RoomAttributes> {}

enum role {
  HOST = "host",
  USER = "user"
}
interface UserRoomAttributes {
  id?: string;
  userId: string,
  roomId: string,
  role: role
}

export interface UserRoomInstance extends Model<UserRoomAttributes>{}