import { prisma } from "../utils/database";

export async function getUsersEmail() {
  const allEmails = await prisma.users.findMany({
    select: {
      email: true,
    },
  });
  return allEmails;
}

export async function getTeacherById(id: number) {
  const teacher = await prisma.teachers.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
    },
  });
  return teacher;
}


export async function getCategoryById(id: number) {
  const category = await prisma.categories.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
    },
  });
  return category;
}


export async function getDisciplineById(id: number) {
  const discipline = await prisma.disciplines.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
    },
  });
  return discipline;
}
