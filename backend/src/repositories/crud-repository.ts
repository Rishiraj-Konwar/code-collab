import { StatusCodes } from "http-status-codes";
import type { Model, ModelStatic } from "sequelize";
import { AppError, ErrorMessages } from "../utils";
import type { ErrorInfo } from "../types";
export class CrudRepository {
  public model: ModelStatic<Model>;
  constructor(model: ModelStatic<Model>) {
    this.model = model;
  }
  async create(data: any): Promise<Model> {
    const response = await this.model.create(data);
    return response;
  }
  async get(data: any): Promise<Model> {
    const response = await this.model.findByPk(data);
    if (!response) {
      throw new AppError(ErrorMessages.notFound as ErrorInfo);
    }
    return response;
  }
  async getAll(): Promise<Model[]> {
    const response = await this.model.findAll();
    return response;
  }
  async update(data: any, id: string): Promise<Model> {
    const response = await this.model.update(data, {
      where: {
        id: id,
      },
    });
    if (response[0] == 0) {
      throw new AppError(ErrorMessages.notFound as ErrorInfo);
    }
    const updatedResponse = await this.model.findByPk(id);
    if (!updatedResponse) {
      throw new AppError(ErrorMessages.notFound as ErrorInfo);
    }
    return updatedResponse;
  }
  async delete(id: string) {
    const response = await this.model.destroy({
      where: {
        id: id,
      },
    });
    if (!response) {
      throw new AppError(ErrorMessages.notFound as ErrorInfo);
    }
    return response;
  }
}
