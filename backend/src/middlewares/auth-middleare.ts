import type { Response, NextFunction } from "express";
import type { RequestObj } from "../types";
import { AppError } from "../utils";
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';

export function authenticateUser(
  req: RequestObj,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.token;
  if (!token)
    return next(new AppError("No token found", StatusCodes.NOT_FOUND));
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_KEY as string)
    req.user = {
      id: decoded.id,
      email: decoded.email
    }
    next()
  } catch (err: any) {
    next(new AppError("Invalid token", StatusCodes.UNAUTHORIZED))
  }
}
