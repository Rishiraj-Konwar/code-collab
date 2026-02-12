import type { Request, Response } from "express";
import { AuthService } from "../services";
import { ErrorResponse, SuccessResponse } from "../utils";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken"

export async function signUp(req: Request, res: Response) {
  const { username, email, password } = req.body;
  try {
    const user = await AuthService.createUser({
      username: username,
      email: email,
      password: password,
    });

    const token = jwt.sign({
      id: user.dataValues.id,
      email: user.dataValues.email
    }, process.env.JWT_KEY as string)

    res.cookie("token", token, {
      httpOnly: true
    })

    SuccessResponse.data = { user, token };
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (err: any) {
    ErrorResponse.error = err
    return res.status(err.statusCode).json(ErrorResponse)
  }
}

export async function login(req: Request, res: Response){
  const {email, password} = req.body
  try{
    const user = await AuthService.loginUser({
      email: email,
      password: password
    })
    const token = jwt.sign({
      id: user.dataValues.id,
      email: user.dataValues.email
    }, process.env.JWT_KEY as string)

    res.cookie("token", token, {
      httpOnly: true
    })

    SuccessResponse.data = { user, token }    
    return res.status(StatusCodes.OK).json(SuccessResponse)
  }catch(err: any){
    ErrorResponse.error = err
    return res.status(err.statusCode).json(ErrorResponse)
  }
}