interface IExam {
  id: number;
  name: string;
  pdf: string;
  categoryId: number;
  disciplineId: number;
  teacherId: number;
}

interface CreateExam {
  name: string;
  pdfUrl: string;
  categoryId: number;
  teacherDisciplineId: number;
}

type ReceivingExam = Omit<IExam, "id">;

export { IExam, ReceivingExam, CreateExam };
