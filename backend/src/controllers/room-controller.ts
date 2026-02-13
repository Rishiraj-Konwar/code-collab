import type { Request, Response } from "express";
import { RoomService } from "../services";
import { AppError, ErrorResponse, SuccessResponse } from "../utils";
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';

export async function createRoom(req: Request, res: Response){
  try{
    const userId = req.user.id
    const roomData = {... req.body}
    const room = await RoomService.createRoom(roomData, userId)
    const roomToken = jwt.sign({
      hostId: userId,
      userId: userId,
      role: "host"
    }, process.env.JWT_KEY as string)

    res.cookie("room-token", roomToken)

    SuccessResponse.data = { room, roomToken }

    return res.status(StatusCodes.CREATED).json(SuccessResponse)
  }catch(err: any){
    ErrorResponse.error = err
    return res.status(err.statusCode).json(ErrorResponse)
  }
}

export async function updateRoom(req: Request, res: Response){
  const role = req.room!.role
  if (role !== "host"){
    ErrorResponse.error = new AppError("Only the host can edit a room", StatusCodes.UNAUTHORIZED)
    return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse)
  }
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

export async function deleteRoom(req: Request, res: Response){
  const role = req.room!.role
  if (role !== "host"){
    ErrorResponse.error = new AppError("Only the host can delete a room", StatusCodes.UNAUTHORIZED)
    return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse)
  }
  try{
    const { slug } = req.params
    const response = await RoomService.deleteRoom(slug)
    SuccessResponse.data = response
    return res.status(StatusCodes.NO_CONTENT).json(SuccessResponse)
  }catch(err: any){
    ErrorResponse.error = err
    return res.status(err.statusCode).json(ErrorResponse)
  }
}