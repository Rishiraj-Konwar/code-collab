import { StatusCodes } from "http-status-codes";
import { RoomRepository, UserRoomRepository } from "../repositories";
import { AppError } from "../utils";
import type { UserRoomInstance } from "../types";

const userRoomRepository = new UserRoomRepository();
const roomRepository = new RoomRepository();

export async function joinRoom(
  userId: string,
  slug: any,
): Promise<{ userRoom: UserRoomInstance; hostId: string }> {
  const slugParts = slug.split("-");
  const roomId = slugParts.pop();

  const room = await roomRepository.get({
    roomId: roomId,
  });

  if (!room) {
    throw new AppError("Room not found", StatusCodes.NOT_FOUND);
  }
  const response = await userRoomRepository.create({
    data: {
      userId: userId,
      roomId: roomId,
    },
  });
  if (!response) {
    throw new AppError(
      "Cannot join the room",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
  return { userRoom: response, hostId: room.dataValues.hostId };
}

export async function leaveRoom(slug: any, userId: string) {
  const slugParts = slug.split("-");
  const roomId = slugParts.pop();

  const room = await roomRepository.get({
    where: {
      roomId: roomId,
    },
  });

  if (userId === room.dataValues.hostId) {
    const response = await roomRepository.delete(roomId);
    return response;
  }
  const response = await userRoomRepository.delete(userId);
  if (!response) {
    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
  return response;
}
