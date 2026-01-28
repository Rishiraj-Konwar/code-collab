import {DataTypes} from "sequelize"
import {DbConfig} from "../db"

export const Room = DbConfig.sequelize.define("Room",{
  roomId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
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