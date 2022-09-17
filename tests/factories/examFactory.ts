import { faker } from "@faker-js/faker";

export default function newExam() {
  return {
    name: faker.lorem.words(3),
    pdf: faker.internet.url(),
    categoryId: faker.datatype.number({ min: 1, max: 3 }),
    disciplineId: 1,
    teacherId: 1,
  };
}
