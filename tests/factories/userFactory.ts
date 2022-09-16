import { faker } from "@faker-js/faker";

export default function newUser() {
  const newPassword = faker.internet.password();
  return {
    email: faker.internet.email(),
    password: newPassword,
    confirmPassword: newPassword,
  };
}
