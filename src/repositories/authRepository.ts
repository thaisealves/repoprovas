import { CreateUserType } from "../types/authTypes";
import { prisma } from "../utils/database";

export async function getUserByEmail(email: string) {
  const user = await prisma.users.findUnique({
    where: { email },
  });
  return user;
}

export async function createNewUser(newUser: CreateUserType) {
  await prisma.users.create({
    data: newUser,
  });
}
