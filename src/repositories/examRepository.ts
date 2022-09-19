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

export async function getByDisciplineRepository() {
  const allExams = await prisma.terms.findMany({
    select: {
      id: true,
      number: true,
      discipline: {
        select: {
          id: true,
          name: true,
          teacherDiscipline: {
            select: {
              tests: {
                distinct: ["categoryId"],
                select: {
                  categories: {
                    select: {
                      id: true,
                      name: true,
                      tests: {
                        select: {
                          id: true,
                          name: true,
                          pdfUrl: true,
                          teacherDisciplines: {
                            select: {
                              disciplineId: true,
                              teachers: { select: { id: true, name: true } },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  return allExams;
}
