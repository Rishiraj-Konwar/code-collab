import { StatusCodes } from "http-status-codes";
import { RoomRepository, UserRoomRepository } from "../repositories";
import { AppError } from "../utils";
import type { UserRoomInstance } from "../types";

const userRoomRepository = new UserRoomRepository();
const roomRepository = new RoomRepository();

export async function joinRoom(
  userId: string,
  slug: string,
): Promise<UserRoomInstance> {
  const slugParts = slug.split("-");
  const roomId = slugParts.pop()
  const room = await roomRepository.get({
    roomId: roomId
  });
  if (!room) {
    throw new AppError("Room not found", StatusCodes.NOT_FOUND);
  }
  const response = await userRoomRepository.create({
    data:{
      userId: userId,
      roomId: roomId
    }
  })
  if (!response){
    throw new AppError("Cannot join the room", StatusCodes.INTERNAL_SERVER_ERROR);
  }
  return response
}

export async function leaveRoom(userId: string, hostId: string) {
  if (userId === hostId){
    
  }
}