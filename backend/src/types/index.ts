import type { Model } from "sequelize";

interface UserAttributes {
  id?: string;
  username: string;
  email: string;
  hashedPassword: string;
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes {}

interface RoomAttributes {
  roomId?: string;
  name: string;
  description?: string;
  slug: string;
}

export interface RoomIstance extends Model<RoomAttributes>, RoomAttributes {}

enum role {
  HOST = "host",
  USER = "user",
}
interface UserRoomAttributes {
  id?: string;
  userId: string;
  roomId: string;
  role: role;
}

export interface UserRoomInstance
  extends Model<UserRoomAttributes>, RoomAttributes {}

interface MessageAttributes {
  id?: string;
  content: string;
  type: string;
  userId: string;
  roomId: string;
}

export interface MessageInstance
  extends Model<MessageAttributes>, MessageAttributes {}

interface CodeSnapAttributes {
  id?: string;
  hostId: string;
  roomId: string;
  code: string;
  language: string;
}

export interface CodeSnapInstance
  extends Model<CodeSnapAttributes>, CodeSnapAttributes {}
