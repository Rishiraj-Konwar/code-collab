import { DataTypes, type ModelStatic } from "sequelize";
import { DbConfig } from "../db";
import type { MessageInstance } from "../types";

export const Message: ModelStatic<MessageInstance> = DbConfig.sequelize.define("Message", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('text', 'system'), 
    defaultValue: 'text'
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  roomId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Rooms',
      key: 'roomId'
    }
  }
}, {
  timestamps: true
});