import { Router } from "express";
import { createExam, getExamByDiscipline } from "../controllers/examController";
import validateSchema from "../middlewares/validateSchema";
import { examSchema } from "../schemas/examSchema";

const route = Router();

route.post("/exam", validateSchema(examSchema), createExam);
route.get("/discipline", getExamByDiscipline);
export default route;
