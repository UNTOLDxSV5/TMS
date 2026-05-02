import prisma from '../../prisma';

export const paymentRepository = {
  findByUser: (userId: string) => prisma.paymentStatus.findMany({ where: { userId } }),
  findAll: () => prisma.paymentStatus.findMany({ include: { user: true } }),
  upsert: (userId: string, amount: number, paid: boolean) =>
    prisma.paymentStatus.upsert({
      where: { userId },
      create: { userId, amount, paid },
      update: { amount, paid },
    }),
};
