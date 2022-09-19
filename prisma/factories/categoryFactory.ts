export default function categoryFactory(name: string) {
  return {
    where: { name },
    update: {},
    create: {
      name,
    },
  };
}
