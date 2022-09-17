import {
  createExam,
  getByDisciplineRepository,
  seeExistence,
  teacherDisciplineRelation,
} from "../repositories/examRepository";
import { CreateExam, ReceivingExam } from "../types/examTypes";

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

export async function getByDisciplineService() {
  const allExams = await getByDisciplineRepository();

  return allExams;
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
