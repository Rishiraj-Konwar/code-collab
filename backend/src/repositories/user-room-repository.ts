import { UserRoom } from "../models";
import type { UserRoomInstance } from "../types";
import { CrudRepository } from "./crud-repository";

export class UserRoomRepository extends CrudRepository<UserRoomInstance>{
  constructor() {
    super(UserRoom);
  }
}
