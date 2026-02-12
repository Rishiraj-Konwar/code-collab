import {DataTypes, type ModelStatic} from "sequelize"
import {DbConfig} from "../db"
import type { RoomIstance } from "../types"

export const Room: ModelStatic<RoomIstance> = DbConfig.sequelize.define("Room",{
  roomId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  hostId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [5, 50]
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
}, {
  timestamps: true
})