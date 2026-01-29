import { Message } from "../models";
import { CrudRepository } from "./crud-repository";

export class MessageRepository extends CrudRepository{
  constructor(){
    super(Message)
  }
}