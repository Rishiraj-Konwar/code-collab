import { StatusCodes } from "http-status-codes";
import type { ErrorTypes } from "../../types";

export const ErrorMessages: ErrorTypes = {
  notFound: {
    message: "Cannot find any resource",
    statusCode : StatusCodes.NOT_FOUND
  }
}
  