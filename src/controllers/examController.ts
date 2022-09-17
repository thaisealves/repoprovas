import { Request, Response } from "express";
import {
  createExamService,
  getByDisciplineService,
} from "../service/examService";
import { ReceivingExam } from "../types/examTypes";

export async function createExam(req: Request, res: Response) {
  const newExam: ReceivingExam = req.body;
  await createExamService(newExam);

  res.sendStatus(201);
}

export async function getExamByDiscipline(req: Request, res: Response) {
  const allExams = await getByDisciplineService();
  res.status(200).send(allExams);
}
