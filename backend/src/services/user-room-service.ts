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
  try {
    const slugParts = slug.split("-");
    const roomId: string = slugParts.pop() as string;
    const roomExist = await roomRepository.get(roomId);
    if (!roomExist) {
      throw new AppError("Cannot find any such room", StatusCodes.NOT_FOUND);
    }
    const userExist = await userRoomRepository.getByUserId(userId, roomId);
    if (userExist) {
      throw new AppError(
        "User already exists in this room",
        StatusCodes.BAD_REQUEST,
      );
    }
    const response = await userRoomRepository.create({
      roomId: roomId,
      userId: userId,
      role: "user",
    });
    return response;
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }
    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}
