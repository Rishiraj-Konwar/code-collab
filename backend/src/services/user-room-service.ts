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
}
