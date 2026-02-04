import {User} from "./user-model"
import {Room} from "./room-model"
import {UserRoom} from "./user-room-model"
import {CodeSnap} from "./code-snap-model"

User.belongsToMany(Room,{ //many:many relationship
  through: UserRoom,
  foreignKey: "userId"
})
Room.belongsToMany(User, { //many:many relationship
  through: UserRoom,
  foreignKey: "roomId"
})

User.hasMany(CodeSnap, { //1:many relationship
  foreignKey: "userId",
  onDelete: "CASCADE"
})
CodeSnap.belongsTo(User, {
  foreignKey: "userId",
})

Room.hasMany(CodeSnap, { //1:many relationship
  foreignKey: "roomId",
  onDelete: "CASCADE"
})
CodeSnap.belongsTo(Room, {
  foreignKey: "roomId",
})

export {
  User,
  Room,
  UserRoom,
  CodeSnap
}