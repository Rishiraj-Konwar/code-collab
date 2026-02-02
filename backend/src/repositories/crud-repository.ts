import type { Model, ModelStatic } from "sequelize";
import { AppError } from "../utils";
import { StatusCodes } from "http-status-codes";
export class CrudRepository<T extends Model> {

  public model: ModelStatic<T>;
  constructor(model: ModelStatic<T>) {
    this.model = model;
  }
  async create(data: any, transaction?: any): Promise<T> {
    const response = await this.model.create(data, {
      transaction: transaction,
    });
    return response;
  }
  async get(data: any): Promise<T> {
    const response = await this.model.findByPk(data);
    if (!response) {
      throw new AppError("Cannot find any resource", StatusCodes.NOT_FOUND);
    }
    return response;
  }
  async getAll(): Promise<T[]> {
    const response = await this.model.findAll();
    return response;
  }
  async update(data: Partial<T>, id: any): Promise<T> {
    const response = await this.model.update(data, {
      where: {
        id: id,
      },
    });
    if (response[0] == 0) {
      throw new AppError("Cannot find any resource", StatusCodes.NOT_FOUND);
    }
    const updatedResponse = await this.model.findByPk(id);
    if (!updatedResponse) {
      throw new AppError("Cannot find any resource", StatusCodes.NOT_FOUND);
    }
    return updatedResponse;
  }
  async delete(id: any): Promise<number> {
    const response = await this.model.destroy({
      where: {
        id: id,
      },
    });
    if (!response) {
      throw new AppError("Cannot find any resource", StatusCodes.NOT_FOUND);
    }
    return response;
  }
}
