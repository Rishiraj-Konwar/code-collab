export class AppError extends Error{
  public statusCode: number
  public errorInfo: string
  constructor(message: string, statusCode: number){
    super(message)
    this.statusCode = statusCode
    this.errorInfo = message
  }
}