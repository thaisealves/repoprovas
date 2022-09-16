import { Request, Response } from "express";
import { signInService, signUpService } from "../service/authService";
import { CreateUserType, SignUpUserType } from "../types/authTypes";

export async function signUpController(req: Request, res: Response) {
  const newUser: SignUpUserType = req.body;
  const formatedUser = {
    email: newUser.email,
    password: newUser.password,
  };
  await signUpService(formatedUser);
  res.sendStatus(201);
}

export async function signInController(req: Request, res: Response) {
  const loginUser: CreateUserType = req.body;
  const token = await signInService(loginUser);
  res.status(200).send(token);
}
