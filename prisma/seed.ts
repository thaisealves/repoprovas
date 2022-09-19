import { prisma } from "../src/utils/database";
import termFactory from "./factories/termFactory";
import categoryFactory from "./factories/categoryFactory";
import teacherFactory from "./factories/teacherFactory";
import disciplineFactory from "./factories/disciplineFactory";
import teacherDisciplineFactory from "./factories/teacherDisciplineFactory";
async function main() {
  await prisma.terms.upsert(termFactory(1));
  await prisma.terms.upsert(termFactory(2));
  await prisma.terms.upsert(termFactory(3));
  await prisma.terms.upsert(termFactory(4));
  await prisma.terms.upsert(termFactory(5));
  await prisma.terms.upsert(termFactory(6));

  await prisma.categories.upsert(categoryFactory("Projeto"));
  await prisma.categories.upsert(categoryFactory("Prática"));
  await prisma.categories.upsert(categoryFactory("Recuperação"));

  await prisma.teachers.upsert(teacherFactory("Diego Pinho"));
  await prisma.teachers.upsert(teacherFactory("Bruna Hamori"));

  await prisma.disciplines.upsert(disciplineFactory("HTML e CSS", 1));
  await prisma.disciplines.upsert(disciplineFactory("JavaScript", 2));
  await prisma.disciplines.upsert(disciplineFactory("React", 3));
  await prisma.disciplines.upsert(disciplineFactory("Humildade", 1));
  await prisma.disciplines.upsert(disciplineFactory("Planejamento", 2));
  await prisma.disciplines.upsert(disciplineFactory("Autoconfiança", 3));

  await prisma.teachersDisciplines.upsert(teacherDisciplineFactory(1, 1));
  await prisma.teachersDisciplines.upsert(teacherDisciplineFactory(1, 2));
  await prisma.teachersDisciplines.upsert(teacherDisciplineFactory(1, 3));
  await prisma.teachersDisciplines.upsert(teacherDisciplineFactory(2, 4));
  await prisma.teachersDisciplines.upsert(teacherDisciplineFactory(2, 5));
  await prisma.teachersDisciplines.upsert(teacherDisciplineFactory(2, 6));
}

main()
  .then()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
