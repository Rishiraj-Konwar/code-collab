import { UserRepository } from "../repositories";
import { AppError } from "../utils";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import type { UserInstance } from "../types";

const userRepository = new UserRepository();

export async function getUser(id: string): Promise<UserInstance> {
  try {
    const user = await userRepository.get(id);
    return user;
  } catch (err: any) {
    if (err.statusCode == StatusCodes.NOT_FOUND) {
      throw err
    }
    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

export async function updateUser(
  data: { userName?: string; email?: string },
  id: string,
): Promise<UserInstance> {
  try {
    const updatedUser = await userRepository.update(data, id);
    return updatedUser;
  } catch (err: any) {
    if (
      err.name == "SequelizeValidationError" ||
      err.name == "SequelizeUniqueConstraintError"
    ) {
      let errorInfo: string[] = [];
      err.errors.forEach((val: any) => {
        errorInfo.push(val.message);
      });
      throw new AppError(errorInfo, StatusCodes.BAD_REQUEST);
    }
    if (err.statusCode == StatusCodes.NOT_FOUND || StatusCodes.INTERNAL_SERVER_ERROR) {
      throw err
    }
    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

export async function updatePassword(data: {
  oldPass: string;
  newPass: string;
}, id: string): Promise<UserInstance> {
  const user = await userRepository.get(id);
  if (!user) {
    throw new AppError("Cannot find any such user", StatusCodes.NOT_FOUND);
  }
  try {
    const isMatch = await bcrypt.compare(
      data.oldPass,
      user.dataValues.hashedPassword,
    );
    if (!isMatch) {
      throw new AppError("Old password is incorrect", StatusCodes.UNAUTHORIZED);
    }
    const newHashedPassword = await bcrypt.hash(data.newPass, 10);
    const response = await userRepository.update(
      { hashedPassword: newHashedPassword }, id
    );
    return response;
  } catch (err: any) {
    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

export async function deleteUser(id: string): Promise<number> {
  try {
    const response = await userRepository.delete(id);
    return response;
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }
    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}
