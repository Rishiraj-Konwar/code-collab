import { Room } from "../models";
import { CrudRepository } from "./crud-repository";
import type { RoomIstance } from "../types";

export class RoomRepository extends CrudRepository<RoomIstance>{
  constructor(){
    super(Room)
  }
}