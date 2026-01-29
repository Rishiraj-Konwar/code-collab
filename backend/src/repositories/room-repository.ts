import { Room } from "../models";
import { CrudRepository } from "./crud-repository";

export class RoomRepository extends CrudRepository{
  constructor(){
    super(Room)
  }
}