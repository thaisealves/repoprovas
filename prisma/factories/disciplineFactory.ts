export default function disciplineFactory(name: string, termId: number) {
  return {
    where: { name },
    update: {},
    create: {
      name,
      termId,
    },
  };
}
