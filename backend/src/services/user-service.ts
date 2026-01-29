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
  const hashedPassword = await bcrypt.hash(data.password, 10)
  const newUser = await userRepository.create({
    username: data.username,
    email: data.email,
    hashedPassword: hashedPassword
  })
  return newUser
}