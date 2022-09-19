export default function termFactory(number: number) {
  return {
    where: { number },
    update: {},
    create: {
      number,
    },
  };
}
