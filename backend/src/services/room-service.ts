import { sequelize } from "../db/connect-db";
import { RoomRepository } from "../repositories";
import type { RoomIstance } from "../types";

const roomRepository = new RoomRepository()

export async function createRoom(data: {name: string, description?: string}): Promise<RoomIstance> {
  try{
    const result = await sequelize.transaction(async t => {
      const tempRoom = await roomRepository.create({
        name: data.name,
        description: data.description,
        slug: "temp"
      })
      const slug: string = temp
      const room = await roomRepository.update({
        slug
      }, tempRoom.dataValues.roomId)
    })
  }catch(err)
}