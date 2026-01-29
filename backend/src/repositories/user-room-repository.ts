import { UserRoom } from "../models";
import { CrudRepository } from "./crud-repository";

export class UserRoomRepository extends CrudRepository {
  constructor() {
    super(UserRoom);
  }
}
