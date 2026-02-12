import { UserRepository } from "../repositories";
import { AppError } from "../utils";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import type { UserInstance } from "../types";

const userRepository = new UserRepository();

export async function createUser(data: {
  username: string;
  email: string;
  password: string;
}): Promise<UserInstance> {
  const existingUser = await userRepository.getByEmail(data.email);
  if (existingUser) {
    throw new AppError("User already exists", StatusCodes.BAD_REQUEST);
  }
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await userRepository.create({
      username: data.username,
      email: data.email,
      hashedPassword: hashedPassword,
    });
    return newUser;
  } catch (err: any) {
    if (err.name == "SequelizeValidationError") {
      let errorInfo: string[] = [];
      err.errors.forEach((val: any) => {
        errorInfo.push(val.message);
      });
      throw new AppError(errorInfo, StatusCodes.BAD_REQUEST);
    }
    throw new AppError("Something went wrong", StatusCodes.BAD_REQUEST);
  }
}

export async function loginUser(data: {email: string, password: string}): Promise<UserInstance>{
  try{
    const user = await userRepository.getByEmail(data.email)
    if (!user){
      throw new AppError("Inavlid email or password", StatusCodes.UNAUTHORIZED)
    }
    const isMatch = await bcrypt.compare(data.password, user.dataValues.hashedPassword)
    if (!isMatch){
      throw new AppError("Invalid email or password", StatusCodes.UNAUTHORIZED)
    }
    return user
  }catch(err: any){
    if (err instanceof AppError){
      throw err
    }
    throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR)
  }
}