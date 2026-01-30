import { User } from "../models";
import { CrudRepository } from "./crud-repository";
import type { UserInstance } from "../types";

export class UserRepository extends CrudRepository<UserInstance>{
  constructor(){
    super(User)
  }
  async getByEmail(email: string): Promise<UserInstance | null>{
    const response = await this.model.findOne({
      where: {
        email: email
      }
    })
    return response
  }
}