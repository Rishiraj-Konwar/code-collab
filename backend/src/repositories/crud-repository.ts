import {StatusCodes} from "http-status-codes"
import type { Model, ModelStatic } from "sequelize"
import { AppError } from "../utils"
export class CrudRepository {
  public model: ModelStatic<Model>
  constructor(model: ModelStatic<Model>){
    this.model = model
  }
  async create(data: any): Promise<Model>{
      const response = await this.model.create(data)
      return response
  }
  async get(data: any) {
    const response = await this.model.findByPk(data)
    if (!response){
      throw new AppError.AppError("ashdfb1", 232)

    }
    return response
  }
}