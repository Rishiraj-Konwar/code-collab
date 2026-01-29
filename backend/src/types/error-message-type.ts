export type ErrorInfo = {
  message: string;
  statusCode: number
}

export type ErrorMessages = {
  [key: string]: ErrorInfo
}