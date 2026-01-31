import {DataTypes, type ModelStatic} from "sequelize"
import {DbConfig} from "../db"
import type { UserInstance } from "../types"

export const User: ModelStatic<UserInstance> = DbConfig.sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  hashedPassword: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {timestamps: true})