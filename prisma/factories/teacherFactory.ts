export default function teacherFactory(name: string) {
    return {
      where: { name },
      update: {},
      create: {
        name,
      },
    };
  }
  