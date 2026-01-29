import type { ErrorInfo } from "../../types"
export class AppError extends Error{
  public statusCode: number
  public errorInfo: string
  constructor(erroInfo: ErrorInfo){
    super(erroInfo.message)
    this.statusCode = erroInfo.statusCode
    this.errorInfo = erroInfo.message
  }
}