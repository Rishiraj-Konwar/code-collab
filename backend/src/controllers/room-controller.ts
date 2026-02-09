import type { Response } from "express";
import { RoomService } from "../services";
import { ErrorResponse, SuccessResponse } from "../utils";
import { StatusCodes } from "http-status-codes";

export async function createRoom(req: any, res: Response){
  try{
    const userId = req.user.id
    const roomData = {... req.body}
    const room = await RoomService.createRoom(roomData, userId)
    SuccessResponse.data = room
    return res.status(StatusCodes.CREATED).json(SuccessResponse)
  }catch(err: any){
    ErrorResponse.error = err
    return res.status(err.statusCode).json(ErrorResponse)
  }
}

export async function updateRoom(req: any, res: Response){
  try{
    const { slug } = req.params
    const data = {... req.body}
    const room = await RoomService.updateRoom(data, slug)
    SuccessResponse.data = room
    return res.status(StatusCodes.OK).json(SuccessResponse)
  }catch(err: any){
    ErrorResponse.error = err
    return res.status(err.statusCode).json(ErrorResponse)
  }
}

export async function deleteRoom(req: any, res: Response){
  try{
    const { slug } = req.params
    const {userId, hostId } = req.user
    const response = await RoomService.deleteRoom(slug, userId, hostId)
    SuccessResponse.data = response
    return res.status(StatusCodes.NO_CONTENT).json(SuccessResponse)
  }catch(err: any){
    ErrorResponse.error = err
    return res.status(err.statusCode).json(ErrorResponse)
  }
}