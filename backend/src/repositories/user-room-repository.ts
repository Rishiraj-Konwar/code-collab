import { StatusCodes } from "http-status-codes";
import { UserRoom } from "../models";
import type { UserRoomInstance } from "../types";
import { AppError } from "../utils";
import { CrudRepository } from "./crud-repository";

export class UserRoomRepository extends CrudRepository<UserRoomInstance>{
  constructor() {
    super(UserRoom);
  }
  async getByUserId(data: {userId: string, roomId: string}): Promise<UserRoomInstance | null> {
    const response = await this.model.findOne({
      where:{
        userId: data.userId,
        roomId: data.roomId
      }
    })
    return response
  }
  override async delete(data: {roomId: string, userId: string}): Promise<number> {
    const response = await this.model.destroy({
      where: {
        userId: data.userId,
        roomId: data.roomId
      }
    })
    if (!response){
      throw new AppError("Cannot find any resource to delete", StatusCodes.NOT_FOUND)
    }
    return response
  }
}
