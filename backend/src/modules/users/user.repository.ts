import prisma from '../../prisma';

export const userRepository = {
  create: (data: { email: string; name: string; password: string; role: string; competitionId?: string | null }) =>
    prisma.user.create({ data }),
  findById: (id: string) => prisma.user.findUnique({ where: { id } }),
  findAll: () => prisma.user.findMany({ include: { competition: true } }),
  update: (id: string, data: { role?: string; competitionId?: string | null }) =>
    prisma.user.update({ where: { id }, data }),
};
