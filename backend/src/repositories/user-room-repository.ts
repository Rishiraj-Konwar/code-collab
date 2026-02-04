import { StatusCodes } from "http-status-codes";
import { UserRoom } from "../models";
import type { UserRoomInstance } from "../types";
import { AppError } from "../utils";
import { CrudRepository } from "./crud-repository";

export class UserRoomRepository extends CrudRepository<UserRoomInstance>{
  constructor() {
    super(UserRoom);
  }
}
