import { Request, Response } from "express";
import { createExamService } from "../service/examService";
import { ReceivingExam } from "../types/examTypes";

export async function createExam(req: Request, res: Response) {
  const newExam: ReceivingExam = req.body;
  await createExamService(newExam);
  res.sendStatus(201);
}