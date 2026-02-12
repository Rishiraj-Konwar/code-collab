import { StatusCodes } from "http-status-codes";
import type { RequestObj } from "../types";
import type { NextFunction, Response }  from 'express';
import { AppError } from "../utils";
import jwt from 'jsonwebtoken';
export function roleMiddleware(req: RequestObj, res: Response, next: NextFunction){
  const roomToken = req.cookies.token
  if(!roomToken){
    return next(new AppError("No room token found", StatusCodes.NOT_FOUND))
  }
  try{
  const decoded: any = jwt.verify(roomToken, process.env.JWT_TOKEN as string)
  req.room = {
    hostId: decoded.hostId,
    userId: decoded.userId,
    role: decoded.role
  }
  next()
  }catch(err: any){
    next(new AppError("Inavlid room token", StatusCodes.UNAUTHORIZED))
  }
}