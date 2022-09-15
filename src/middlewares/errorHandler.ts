import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error);
  if (error.code) {
    return res.status(setStatusCode(error.code)).send(error.message);
  }

  return res.sendStatus(500);
}

function setStatusCode(errorCode: string) {
  if (errorCode === "NotFound") return 404;
  if (errorCode === "Unauthorized") return 401;
  if (errorCode === "InvalidBody") return 422;
  if (errorCode === "Conflict") return 409;

  return 400;
}
