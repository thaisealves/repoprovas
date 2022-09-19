import {
  createExam,
  getByDisciplineRepository,
  getByTeacherRepository,
  seeExistence,
  teacherDisciplineRelation,
} from "../repositories/examRepository";
import { CreateExam, ReceivingExam } from "../types/examTypes";
import sgMail from "@sendgrid/mail";
import {
  getCategoryById,
  getDisciplineById,
  getTeacherById,
  getUsersEmail,
} from "../repositories/emailRepository";

export async function createExamService(newExam: ReceivingExam) {
  await gettingExistence(
    newExam.teacherId,
    newExam.categoryId,
    newExam.disciplineId
  );
  const teacherDisciplineId = await getRelation(
    newExam.teacherId,
    newExam.disciplineId
  );

  const formatedExam: CreateExam = {
    name: newExam.name,
    pdfUrl: newExam.pdf,
    categoryId: newExam.categoryId,
    teacherDisciplineId,
  };
  await createExam(formatedExam);
}

export async function sendEmail(newExam: ReceivingExam) {
  const allEmails = await getUsersEmail();
  const teacher = await getTeacherById(newExam.teacherId);
  console.log(teacher);
  const discipline = await getDisciplineById(newExam.disciplineId);
  const category = await getCategoryById(newExam.categoryId);
  sgMail.setApiKey(String(process.env.SENDGRID_API_KEY));
  const msg = {
    to: allEmails,
    from: "alves.thaisesilva@gmail.com",
    subject: "Prova adicionada",
    text: `A seguinte prova foi adicionada: ${teacher?.name} ${category?.name} ${newExam.name} (${discipline?.name})`,
    html: `A seguinte prova foi adicionada: ${teacher?.name} ${category?.name} ${newExam.name} (${discipline?.name})`,
  };

  const sended = await sgMail.send(msg);

  if (!sended) {
    throw { code: "Unauthorized", message: "Not possible to post email" };
  }
}

export async function getByDisciplineService() {
  const allExams = await getByDisciplineRepository();

  const formatedByDiscipline = allExams.map((el) => {
    return {
      termId: el.id,
      termNumber: el.number,
      discipline: el.disciplines.map((discipline) => {
        return {
          disciplineId: discipline.id,
          disciplineName: discipline.name,
          categories: discipline.teacherDiscipline[0].tests.map((category) => {
            return {
              categoryId: category.categories.id,
              categoryName: category.categories.name,
              tests: category.categories.tests
                .map((test) => {
                  if (test.teacherDisciplines.disciplineId === discipline.id) {
                    return {
                      testId: test.id,
                      testName: test.name,
                      testPdf: test.pdfUrl,
                      teacherName: test.teacherDisciplines.teachers.name,
                      teacherId: test.teacherDisciplines.teachers.id,
                    };
                  }
                })
                .filter((notNull) => notNull),
            };
          }),
        };
      }),
    };
  });
  return formatedByDiscipline;
}

export async function getByTeacherService() {
  const allExams = await getByTeacherRepository();
  const formatedByTeacher = allExams.map((each) => {
    return {
      teacherId: each.id,
      teacherName: each.name,
      categories: each.teacherDiscipline
        .map((el) => {
          if (el.tests.length !== 0) {
            return {
              category: el.tests.map((category) => {
                return {
                  categoryId: category.categories.id,
                  categoryName: category.categories.name,
                  tests: category.categories.tests
                    .map((test) => {
                      if (
                        test.teacherDisciplines.disciplines.id ===
                        el.disciplineId
                      )
                        return {
                          testId: test.id,
                          testName: test.name,
                          disciplineId: test.teacherDisciplines.disciplines.id,
                          disciplineName:
                            test.teacherDisciplines.disciplines.name,
                        };
                    })
                    .filter((notNull) => notNull),
                };
              }),
            };
          }
        })
        .filter((notNull) => notNull),
    };
  });
  return formatedByTeacher;
}

//function to validate on creating an exam
async function getRelation(teacherId: number, disciplineId: number) {
  const teacherDiscipline = await teacherDisciplineRelation(
    teacherId,
    disciplineId
  );
  if (!teacherDiscipline) {
    throw {
      code: "NotFound",
      message: "Relation between teacher and discipline doesn't exist",
    };
  }
  return teacherDiscipline.id;
}

async function gettingExistence(
  teacherId: number,
  categoryId: number,
  disciplineId: number
) {
  const existes = await seeExistence(teacherId, categoryId, disciplineId);
  if (!existes.teacher) {
    throw { code: "NotFound", message: "Teacher doesn't exists" };
  }
  if (!existes.category) {
    throw { code: "NotFound", message: "Category doesn't exists" };
  }
  if (!existes.discipline) {
    throw { code: "NotFound", message: "Discipline doesn't exists" };
  }
}
