import {DataTypes} from "sequelize"
import {DbConfig} from "../db"

export const UserRoom = DbConfig.sequelize.define("UserRoom", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users",
      key: "id"
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
  role: {
    type: DataTypes.ENUM("host", "user"),
    defaultValue: "user"
  }
},{
  timestamps: true
})