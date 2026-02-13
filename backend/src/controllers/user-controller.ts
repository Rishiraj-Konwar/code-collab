import type { Request, Response } from "express";
import { UserService } from "../services";
import { ErrorResponse, SuccessResponse } from "../utils";
import { StatusCodes } from "http-status-codes";

export async function getUser(req: Request, res: Response){
  try{
    const userId = req.user.id
    const user = await UserService.getUser(userId)
    SuccessResponse.data = user
    return res.status(StatusCodes.OK).json(SuccessResponse)
  }catch(err: any){
    ErrorResponse.error = err
    return res.status(err.statusCode).json(ErrorResponse)
  }
}

export async function updateUser(req: Request, res: Response){
  try{
    const id = req.user.id
    const newData = {... req.body}
    const updatedUser = await UserService.updateUser(newData, id)
    SuccessResponse.data = updatedUser
    return res.status(StatusCodes.OK).json(SuccessResponse)
  }catch(err: any){
    ErrorResponse.error = err
    return res.status(err.statusCode).json(ErrorResponse)
  }
}

export async function changePassword(req: Request, res: Response){
  try{
    const id = req.user.id
    const {oldPass, newPass} = req.body
    const response = await UserService.updatePassword({oldPass, newPass}, id)
    SuccessResponse.data = response
    return res.status(StatusCodes.OK).json(SuccessResponse)
  }catch(err: any){
    ErrorResponse.error = err
    return res.status(err.statusCode).json(ErrorResponse)
  }
}

export async function deleteUser(req: Request, res: Response){
  try{
    const id = req.user.id
    const response = await UserService.deleteUser(id)
    SuccessResponse.data = response
    return res.status(StatusCodes.NO_CONTENT).json(SuccessResponse)
  }catch(err: any){
    ErrorResponse.error = err
    return res.status(err.statusCode).json(ErrorResponse)
  }
}