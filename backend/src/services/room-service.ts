import { StatusCodes } from "http-status-codes";
import { sequelize } from "../db/connect-db";
import { RoomRepository } from "../repositories";
import type { RoomIstance } from "../types";
import { AppError } from "../utils";

const roomRepository = new RoomRepository();

export async function createRoom(data: {
  name: string;
  description?: string;
}): Promise<RoomIstance> {
  try {
    const room = await sequelize.transaction(async (t) => {
      const response = await roomRepository.create(
        {
          name: data.name,
          description: data.description,
          slug: "temp",
        },
        t,
      );
      if (!response) {
        throw new AppError(
          "Could not create room",
          StatusCodes.INTERNAL_SERVER_ERROR,
        );
      }
      const slug: string = `${response.dataValues.name.toLowerCase().replace(/ /g, "-")}-${response.dataValues.roomId}`;
      await response.update(
        { slug: slug },
        {
          transaction: t,
        },
      );
      return response;
    });
    return room;
  } catch (err: any) {
    if (err instanceof AppError) {
      throw err;
    }
    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

export async function updateRoom(
  data: {
    name?: string;
    description?: string;
  },
  roomId: string,
): Promise<RoomIstance> {
  const updateData: any = {... data}
  try {
    if (data.name){
      updateData.slug = `${data.name.toLocaleLowerCase().replace(/ /g, "-")}-${roomId}`
    }
    const updatedRoom = await roomRepository.update(updateData, roomId)
    return updatedRoom
    } catch (err: any) {
    if (err instanceof AppError) {
      throw err;
    }
    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}
export async function deleteRoom(id: string): Promise<number> {
  try{
    const response = await roomRepository.delete(id)
    return response
  }catch(err){
    if (err instanceof AppError){
      throw err
    }
    throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR)
  }
}