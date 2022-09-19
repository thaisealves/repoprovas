import supertest from "supertest";
import app from "../src/index";
import { prisma } from "../src/utils/database";
import { createExamFactory } from "./factories/createExamFactory";
import newExam from "./factories/examFactory";
import { tokenFactory } from "./factories/tokenFactory";
import newUser from "./factories/userFactory";
beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "tests"`;
  await prisma.$executeRaw`TRUNCATE TABLE "users"`;
});

describe("Testing /POST on exam", () => {
  it("Must return 201 with right body, with authorization", async () => {
    const exam = newExam();

    const getToken = await tokenFactory();

    const creatingExam = await createExamFactory(getToken.body.token);

    const createdExam = await prisma.tests.findFirst({
      where: {
        pdfUrl: exam.pdf,
      },
    });
    expect(creatingExam.status).toBe(201);
    expect(createdExam).not.toBeNull;
  });

  it("Must return 401 without authorization", async () => {
    const exam = newExam();
    const creatingExam = await supertest(app).post("/exam").send(exam);
    expect(creatingExam.status).toBe(401);
  });

  it("Must return 404 if teacher, category or discipline doesn't exists", async () => {
    const exam = newExam();

    const teachers = await prisma.teachers.findMany();
    const categories = await prisma.categories.findMany();
    const disciplines = await prisma.disciplines.findMany();
    const wrongTeacherId = teachers[teachers.length - 1].id + 1;
    const wrongCategoryId = categories[categories.length - 1].id + 1;
    const wrongDisciplineId = disciplines[disciplines.length - 1].id + 1;

    const wrongExam = {
      ...exam,
      categoryId: wrongCategoryId,
      teacherId: wrongTeacherId,
      disciplineId: wrongDisciplineId,
    };
    const getToken = await tokenFactory();

    const creatingExam = await supertest(app)
      .post("/exam")
      .send(wrongExam)
      .set({ Authorization: `Bearer ${getToken.body.token}` });

    const createdExam = await prisma.tests.findFirst({
      where: {
        pdfUrl: exam.pdf,
      },
    });
    expect(creatingExam.status).toBe(404);
    expect(createdExam).toBeNull;
  });

  it("Must return 404 if relation between teacher and discipline doesn't exists", async () => {
    const relation = await prisma.teachersDisciplines.findMany();
    const exam = newExam();

    const wrongExam = {
      ...exam,
      teacherId: relation[0].teacherId + 1,
      disciplineId: relation[0].disciplineId,
    };

    const getToken = await tokenFactory();

    const creatingExam = await supertest(app)
      .post("/exam")
      .send(wrongExam)
      .set({ Authorization: `Bearer ${getToken.body.token}` });

    const createdExam = await prisma.tests.findFirst({
      where: {
        pdfUrl: exam.pdf,
      },
    });
    expect(creatingExam.status).toBe(404);
    expect(createdExam).toBeNull;
  });

  it("Must return 422 with the wrong body", async () => {
    const exam = newExam();

    const wrongExam = {
      teacherId: 1,
      disciplineId: 1,
    };

    const getToken = await tokenFactory()

    const creatingExam = await supertest(app)
      .post("/exam")
      .send(wrongExam)
      .set({ Authorization: `Bearer ${getToken.body.token}` });

    const createdExam = await prisma.tests.findFirst({
      where: {
        pdfUrl: exam.pdf,
      },
    });
    expect(creatingExam.status).toBe(422);
    expect(createdExam).toBeNull;
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
