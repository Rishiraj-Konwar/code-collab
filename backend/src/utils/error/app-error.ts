export class AppError extends Error{
  public statusCode: number
  public errorInfo: string | string[]
  constructor(message: string | string[], statusCode: number){
    const messages = Array.isArray(message) ? message.join(". ") : message
    super(messages)
    this.statusCode = statusCode
    this.errorInfo = message
  }
}