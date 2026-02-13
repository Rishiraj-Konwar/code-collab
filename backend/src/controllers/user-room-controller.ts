import type {Request, Response } from "express";
import { UserRoomService } from "../services";
import { ErrorResponse, SuccessResponse } from "../utils";
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';

export async function joinRoom(req: Request, res: Response) {
  try{
  const userId = req.user.id;
  const { slug } = req.params;

  const response = await UserRoomService.joinRoom(userId, slug);

  const roomToken = jwt.sign({
    hostId: response.hostId,
    userId: userId,
    role: "user"
  }, process.env.JWT_KEY as string)

  res.cookie("room-token", roomToken)

  SuccessResponse.data = {response, roomToken};

  return res.status(StatusCodes.OK).json(SuccessResponse);

  }catch(err: any){
    ErrorResponse.error = err
    return res.status(err.statusCode).json(ErrorResponse)
  }
}

export async function leaveRoom(req: Request, res: Response){
  try{
    const {slug} = req.params
    const userId = req.user.id
    const response = await UserRoomService.leaveRoom(slug, userId)
    SuccessResponse.data = response
    return res.status(StatusCodes.NO_CONTENT).json(SuccessResponse)
  }catch(err: any){
    ErrorResponse.error = err
    return res.status(err.statusCode).json(ErrorResponse)
  }
}
