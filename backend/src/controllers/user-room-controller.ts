import type { Response } from "express";
import { UserRoomService } from "../services";
import { ErrorResponse, SuccessResponse } from "../utils";
import { StatusCodes } from "http-status-codes";

export async function joinRoom(req: any, res: Response) {
  try{
  const userId = req.user.id;
  const { slug } = req.params;
  const response = await UserRoomService.joinRoom(userId, slug);
  SuccessResponse.data = response;
  return res.status(StatusCodes.OK).json(SuccessResponse);
  }catch(err: any){
    ErrorResponse.error = err
    return res.status(err.statusCode).json(ErrorResponse)
  }
}

export async function leaveRoom(req: any, res: Response){
  try{
    const {slug} = req.params
    const {userId, hostId} = req.user
    const response = await UserRoomService.leaveRoom(slug, userId, hostId)
    SuccessResponse.data = response
    return res.status(StatusCodes.NO_CONTENT).json(SuccessResponse)
  }catch(err: any){
    ErrorResponse.error = err
    return res.status(err.statusCode).json(ErrorResponse)
  }
}
