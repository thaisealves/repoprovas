import jwt from "../utils/jwt";
import { NextFunction, Request, Response } from "express";

export function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    throw {
      code: "Unauthorized",
      message: "You have to provide an authorizaton token",
    };
  }
  const token: string = authorization.replace("Bearer ", "");

  const verified = jwt.verifyToken(token);
  if (!verified) {
    throw { code: "Unauthorized", message: "Please, provid a valid token" };
  }
  res.locals.userId = verified;
  next();
}
