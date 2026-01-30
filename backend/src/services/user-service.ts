import { Model } from "sequelize";
import { UserRepository } from "../repositories";
import { AppError } from "../utils";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt"

const userRepository = new UserRepository()

export async function createUser(data: {username: string, email: string, password: string}): Promise<Model>{
  const existingUser = await userRepository.getByEmail(data.email)
  if (existingUser){
    throw new AppError("User already exists", StatusCodes.BAD_REQUEST)
  }
  try{
  const hashedPassword = await bcrypt.hash(data.password, 10)
  const newUser = await userRepository.create({
    username: data.username,
    email: data.email,
    hashedPassword: hashedPassword
  })
  return newUser
  }catch(err: any){
    if (err.name == "SequelizeValidationError"){
      let errorInfo: string[] = []
      err.errors.forEach((val : any) => {
        errorInfo.push(val.message)
      })
      throw new AppError(errorInfo, StatusCodes.BAD_REQUEST)
    }
    throw new AppError("Something went wrong", StatusCodes.BAD_REQUEST)
  }
}

export async function getUser(id: string): Promise<Model>{
  try{
    const user = await userRepository.get(id)
    return user
  }catch(err: any){
    if (err.statusCode == StatusCodes.NOT_FOUND){
      throw new AppError("Cannot find any such user", StatusCodes.NOT_FOUND)
    }
    throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

export async function updateUser(data: any, id: string): Promise<Model>{
  try{
    const updatedUser = await userRepository.update(data, id)
    return updatedUser
  }catch(err: any){
    if (err.name == "SequelizeValidationError"){
      let errorInfo: string[] = []
      err.errors.forEach((val: any) => {
        errorInfo.push(val.message)
      })
      throw new AppError(errorInfo, StatusCodes.BAD_REQUEST)
    }
    if (err.statusCode == StatusCodes.NOT_FOUND){
      throw new AppError("Cannot find any such user to update", StatusCodes.NOT_FOUND)
    }
    throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

export async function updatePassword(data: {id: string, oldPass: string, newPass: string}){
  const user = await userRepository.get(data.id)
  if (!user){
    throw new AppError("Cannot find any such user", StatusCodes.NOT_FOUND)
  }
  try{
    const isMatch = await bcrypt.compare(data.oldPass, user.dataValues.hashedPassword)
    if (!isMatch) {
      throw new AppError("Old password is incorrect", StatusCodes.UNAUTHORIZED)
    }
    const newHashedPassword = await bcrypt.hash(data.newPass, 10)
    const response = await userRepository.update({hashedPassword: newHashedPassword}, data.id)
    return response
  }catch(err:any){
    throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR)
  }
}