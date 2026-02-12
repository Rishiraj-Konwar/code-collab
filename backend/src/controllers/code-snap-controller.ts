import { CodeSnapService } from "../services"
import type {Response} from 'express';
import { ErrorResponse, SuccessResponse } from "../utils";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../utils";
import type { RequestObj } from "../types";

export async function sendOutput(req: RequestObj, res: Response){
  const role = req.room!.role
  if (role !== "host"){
    ErrorResponse.error = new AppError("Only the host can submit", StatusCodes.UNAUTHORIZED)
    return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse)
  }
  try{
  const {code, language} = req.body
  const hostId = req.user.id
  const {slug} = req.params
  const response = await CodeSnapService.sendOutput(language, {hostId, slug, code})
  SuccessResponse.data = response
  return res.status(StatusCodes.OK).json(SuccessResponse)
  }catch(err: any){
    ErrorResponse.error = err
    return res.status(err.statusCode).json(ErrorResponse)
  }
}