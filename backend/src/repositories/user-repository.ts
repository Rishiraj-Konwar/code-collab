import type { Model } from "sequelize";
import { User } from "../models";
import { CrudRepository } from "./crud-repository";

export class UserRepository extends CrudRepository{
  constructor(){
    super(User)
  }
  async getByEmail(email: string): Promise<Model | null>{
    const response = await this.model.findOne({
      where: {
        email: email
      }
    })
    return response
  }
}