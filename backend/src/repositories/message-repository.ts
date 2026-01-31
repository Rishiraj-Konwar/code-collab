import { Message } from "../models";
import type { MessageInstance } from "../types";
import { CrudRepository } from "./crud-repository";

export class MessageRepository extends CrudRepository<MessageInstance>{
  constructor(){
    super(Message)
  }
}