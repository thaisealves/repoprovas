import { CreateExam } from "../types/examTypes";
import { prisma } from "../utils/database";

export async function teacherDisciplineRelation(
  teacherId: number,
  disciplineId: number
) {
  const relation = await prisma.teachersDisciplines.findFirst({
    where: { disciplineId, teacherId },
  });

  return relation;
}

export async function createExam(newExam: CreateExam) {
  await prisma.tests.create({ data: newExam });
}

export async function seeExistence(
  teacherId: number,
  categoryId: number,
  disciplineId: number
) {
  const teacher = await prisma.teachers.findUnique({
    where: { id: teacherId },
  });
  const discipline = await prisma.disciplines.findUnique({
    where: { id: disciplineId },
  });
  const category = await prisma.categories.findUnique({
    where: { id: categoryId },
  });
  return { teacher, discipline, category };
}
