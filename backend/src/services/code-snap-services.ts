import { StatusCodes } from "http-status-codes";
import { CodeSnapRepository } from "../repositories";
import type { CodeSnapInstance } from "../types";
import { AppError } from "../utils";
const piston = require("piston-client")

const codeSnapRespository = new CodeSnapRepository()

export async function sendOutput(language: string, data:{
  hostId: string,
  slug: any,
  code: string
}): Promise<CodeSnapInstance>{
  try{
  const client = piston()
  const result = await client.execute(language, data.code, {
    version: "*"
  })
  if (!result || !result.run){
    throw new AppError("Cannot get the output", StatusCodes.INTERNAL_SERVER_ERROR)
  }
  const output = result.run.output
  const slugParts = data.slug.split("-")
  const roomId = slugParts.pop()
  const response = await codeSnapRespository.create({
    hostId: data.hostId,
    roomId: roomId,
    code: data.code,
    language: language,
    output: output
  })
  return response
  }catch(err: any){
    if (err instanceof AppError){
      throw err
    }
    throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR)
  }
}