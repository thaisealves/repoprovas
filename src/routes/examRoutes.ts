import { Router } from "express";
import { createExam, getExamByDiscipline, getExamByTeacher } from "../controllers/examController";
import validateSchema from "../middlewares/validateSchema";
import { examSchema } from "../schemas/examSchema";

const route = Router();

route.post("/exam", validateSchema(examSchema), createExam);
route.get("/discipline", getExamByDiscipline);
route.get("/teacher", getExamByTeacher);
export default route;
