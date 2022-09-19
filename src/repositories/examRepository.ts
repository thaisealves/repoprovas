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
  // const allExams = await prisma.$queryRaw`SELECT terms.id, terms.number AS "termNumber",
  // json_agg(json_build_object(	categories.name,json_build_object( 'teachersName',teachers.name,'disciplineName',disciplines.name,
  //                'disciplineId',disciplines.id,'testName',tests.name,
  //                'pdfUrl',tests."pdfUrl"))) as tests
  // FROM terms
  // JOIN disciplines ON terms.id = disciplines."termId"
  // JOIN "teachersDisciplines" ON "teachersDisciplines"."disciplineId" = disciplines.id
  // JOIN teachers ON "teachersDisciplines"."teacherId" = teachers.id
  // JOIN tests ON "teachersDisciplines".id = tests."teacherDisciplineId"
  // JOIN categories ON categories.id = tests."categoryId"
  // GROUP BY terms.id`

  //trying to do without SQL query
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
