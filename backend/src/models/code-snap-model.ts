import {DataTypes} from "sequelize"
import {DbConfig} from "../db"

export const CodeSnap = DbConfig.sequelize.define("CodeSnap", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  hostId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "UserRooms",
      key: "userId"
    }
  },
  roomId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Rooms",
      key: "roomId"
    }
  },
  code: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  timestamps: true
})