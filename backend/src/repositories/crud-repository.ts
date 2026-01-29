import {StatusCodes} from "http-status-codes"
import type { Model, ModelStatic } from "sequelize"
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
    return response
  }
}