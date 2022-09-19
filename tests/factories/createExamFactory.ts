import newExam from "./examFactory";
import supertest from "supertest";
import app from "../../src";
export async function createExamFactory(getToken: string) {
  const exam = newExam();

  const createdExam = await supertest(app)
    .post("/exam")
    .send(exam)
    .set({ Authorization: `Bearer ${getToken}` });
  return createdExam;
}
