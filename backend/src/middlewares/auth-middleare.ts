import type {Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.token;
    const decoded: any = jwt.verify(token, process.env.JWT_KEY as string)
    req.user = {
      id: decoded.id,
      email: decoded.email
    }
    next()
}
