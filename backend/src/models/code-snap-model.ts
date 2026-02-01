import {DataTypes, type ModelStatic} from "sequelize"
import {DbConfig} from "../db"
import type { CodeSnapInstance } from "../types"

export const CodeSnap: ModelStatic<CodeSnapInstance> = DbConfig.sequelize.define("CodeSnap", {
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
  },
  output: {
    type: DataTypes.TEXT,
    allowNull: false
  }
},{
  timestamps: true
})