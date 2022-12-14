import newUser from "./factories/userFactory";
import supertest from "supertest";
import app from "../src/index";
import { prisma } from "../src/utils/database";
import { faker } from "@faker-js/faker";
beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "users"`;
});

describe("Testing /POST on signUp", () => {
  it("Must return 201 when the user has the right format", async () => {
    const user = newUser();
    const creating = await supertest(app).post("/signup").send(user);
    const userCreated = await prisma.users.findUnique({
      where: { email: user.email },
    });

    expect(creating.status).toBe(201);
    expect(userCreated).not.toBeNull;
  });

  it("Must return 409 when there's an existing account with the email", async () => {
    const user = newUser();
    await supertest(app).post("/signup").send(user);
    const creating = await supertest(app).post("/signup").send(user);

    expect(creating.status).toBe(409);
  });
  it("Must return 422 with the wrong body", async () => {
    const wrongSignUp = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const signUp = await supertest(app).post("/signup").send(wrongSignUp);
    expect(signUp.status).toBe(422);
  });
});

describe("Testing /POST on signIn", () => {
  it("Must return 200 and the token when its the right format", async () => {
    const user = newUser();
    const loginUser = {
      email: user.email,
      password: user.password,
    };
    await supertest(app).post("/signup").send(user);
    const loggedIn = await supertest(app).post("/signin").send(loginUser);
    expect(loggedIn.status).toBe(200);
    expect(loggedIn.body).toBeInstanceOf(Object);
    expect(loggedIn.body).toHaveProperty("token");
  });

  it("Must return 401 when the password is incorrect", async () => {
    const user = newUser();
    const loginUser = {
      email: user.email,
      password: faker.internet.password(),
    };
    await supertest(app).post("/signup").send(user);
    const loggedIn = await supertest(app).post("/signin").send(loginUser);
    expect(loggedIn.status).toBe(401);
  });

  it("Must return 404 when theres no user with that email", async () => {
    const { email, password } = newUser();
    const loginUser = {
      email,
      password,
    };
    const loggedIn = await supertest(app).post("/signin").send(loginUser);
    expect(loggedIn.status).toBe(404);
  });

  it("Must return 422 with the wrong body", async () => {
    const user = newUser();
    const loginUser = {
      email: user.email,
    };
    await supertest(app).post("/signup").send(user);
    const loggedIn = await supertest(app).post("/signin").send(loginUser);
    expect(loggedIn.status).toBe(422);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
