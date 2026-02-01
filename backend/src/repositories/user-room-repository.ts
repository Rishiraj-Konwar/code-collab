import { UserRoom } from "../models";
import type { UserRoomInstance } from "../types";
import { CrudRepository } from "./crud-repository";

export class UserRoomRepository extends CrudRepository<UserRoomInstance>{
  constructor() {
    super(UserRoom);
  }
  async getByUserId(userId: string, roomId: string): Promise<UserRoomInstance | null> {
    const response = await this.model.findOne({
      where:{
        userId: userId,
        roomId: roomId
      }
    })
    return response
  }
}
