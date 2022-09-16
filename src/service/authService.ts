import { createNewUser, getUserByEmail } from "../repositories/authRepository";
import { CreateUserType } from "../types/authTypes";
import bcrypt from "bcrypt";
import jwt from "../utils/jwt";

export async function signUpService(newUser: CreateUserType) {
  const findUser = await getUserByEmail(newUser.email);

  const passwordHash = bcrypt.hashSync(newUser.password, 10);
  const creatingUser: CreateUserType = {
    email: newUser.email,
    password: passwordHash,
  };
  if (findUser) {
    throw { code: "Conflict", message: "Email already used" };
  }

  await createNewUser(creatingUser);
}

export async function signInService(loginUser: CreateUserType) {
  const findUser = await getUserByEmail(loginUser.email);

  if (!findUser) {
    throw { code: "NotFound", message: "User not found!" };
  }
  verifyUser(loginUser.password, findUser.password);
  const token = jwt.createToken({ id: findUser.id });
  return { token };
}

function verifyUser(givenPassword: string, password: string) {
  if (!bcrypt.compareSync(givenPassword, password)) {
    throw { code: "Unauthorized", message: "Data doesn't match!" };
  }
}
