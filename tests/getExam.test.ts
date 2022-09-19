import supertest from "supertest";
import app from "../src/index";
import { prisma } from "../src/utils/database";
import newExam from "./factories/examFactory";
import newUser from "./factories/userFactory";
beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "tests"`;
  await prisma.$executeRaw`TRUNCATE TABLE "users"`;
});

describe("Testing /GET on discipline showing exams", () => {
  it("Must return 200 and an array from the exam with discipline", async () => {
    const user = newUser();
    const exam = newExam();

    const loginUser = {
      email: user.email,
      password: user.password,
    };
    await supertest(app).post("/signup").send(user);
    const getToken = await supertest(app).post("/signin").send(loginUser);

    await supertest(app)
      .post("/exam")
      .send(exam)
      .set({ Authorization: `Bearer ${getToken.body.token}` });

    const getExams = await supertest(app)
      .get("/discipline")
      .send()
      .set({ Authorization: `Bearer ${getToken.body.token}` });

    console.log(getExams.body);
    expect(getExams.status).toBe(200);
    expect(getExams.body).toBeInstanceOf(Array);
    expect(getExams.body[0]).toHaveProperty("discipline");
  });

  it("Must return 401 if it doesn't have authorization", async () => {
    const user = newUser();
    const exam = newExam();

    const loginUser = {
      email: user.email,
      password: user.password,
    };
    await supertest(app).post("/signup").send(user);
    const getToken = await supertest(app).post("/signin").send(loginUser);

    await supertest(app)
      .post("/exam")
      .send(exam)
      .set({ Authorization: `Bearer ${getToken.body.token}` });
    const getExams = await supertest(app).get("/discipline").send();
    expect(getExams.status).toBe(401);
  });

  it("Must not have discipline on the body if the db is empty", async () => {
    const user = newUser();

    const loginUser = {
      email: user.email,
      password: user.password,
    };
    await supertest(app).post("/signup").send(user);
    const getToken = await supertest(app).post("/signin").send(loginUser);

    const getExams = await supertest(app)
      .get("/discipline")
      .send()
      .set({ Authorization: `Bearer ${getToken.body.token}` });

    expect(getExams.body[0].discipline.categories).toBeNull;
  });
});

describe("Testing /GET on teacher to show exams", () => {
  it("Must return 200 and an array with all the exams by teacher", async () => {
    const user = newUser();
    const exam = newExam();

    const loginUser = {
      email: user.email,
      password: user.password,
    };
    await supertest(app).post("/signup").send(user);
    const getToken = await supertest(app).post("/signin").send(loginUser);

    await supertest(app)
      .post("/exam")
      .send(exam)
      .set({ Authorization: `Bearer ${getToken.body.token}` });

    const getExams = await supertest(app)
      .get("/teacher")
      .send()
      .set({ Authorization: `Bearer ${getToken.body.token}` });

    console.log(getExams.body);
    expect(getExams.status).toBe(200);
    expect(getExams.body).toBeInstanceOf(Array);
    expect(getExams.body[0].categories.category).not.toBeNull;
  });

  it("Must return 401 if it doesn't have authorization", async () => {
    const user = newUser();
    const exam = newExam();

    const loginUser = {
      email: user.email,
      password: user.password,
    };
    await supertest(app).post("/signup").send(user);
    const getToken = await supertest(app).post("/signin").send(loginUser);

    await supertest(app)
      .post("/exam")
      .send(exam)
      .set({ Authorization: `Bearer ${getToken.body.token}` });
    const getExams = await supertest(app).get("/teacher").send();
    expect(getExams.status).toBe(401);
  });

  it("Must not have exams on the body if the db is empty", async () => {
    const user = newUser();

    const loginUser = {
      email: user.email,
      password: user.password,
    };
    await supertest(app).post("/signup").send(user);
    const getToken = await supertest(app).post("/signin").send(loginUser);

    const getExams = await supertest(app)
      .get("/teacher")
      .send()
      .set({ Authorization: `Bearer ${getToken.body.token}` });

    expect(getExams.body[0].categories.category).toBeNull;
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
