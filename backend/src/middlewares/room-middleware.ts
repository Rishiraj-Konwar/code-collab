import type { RequestObj } from "../types";
import type { NextFunction, Response }  from 'express';
import jwt from 'jsonwebtoken';
export function roleMiddleware(req: RequestObj, res: Response, next: NextFunction){
  const roomToken = req.cookies["room-token"]
  const decoded: any = jwt.verify(roomToken, process.env.JWT_TOKEN as string)
  req.room = {
    hostId: decoded.hostId,
    userId: decoded.userId,
    role: decoded.role
  }
  next()
}