import { CodeSnapService } from "../services"
import type {Response} from 'express';
import { ErrorResponse, SuccessResponse } from "../utils";
import { StatusCodes } from "http-status-codes";

export async function sendOutput(req: any, res: Response){
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