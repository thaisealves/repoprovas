export default function teacherDisciplineFactory(
  teacherId: number,
  disciplineId: number
) {
  return {
    where: {
      teacherId_disciplineId: {
        teacherId,
        disciplineId,
      },
    },
    update: {},
    create: {
      teacherId,
      disciplineId,
    },
  };
}
