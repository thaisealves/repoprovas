import joi from "joi";
import { ReceivingExam } from "../types/examTypes";

export const examSchema = joi.object<ReceivingExam>({
  name: joi.string().required(),
  pdf: joi.string().uri().required(),
  categoryId: joi.number().required(),
  disciplineId: joi.number().required(),
  teacherId: joi.number().required(),
});
