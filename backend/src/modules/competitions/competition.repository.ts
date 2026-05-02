import prisma from '../../prisma';

export const competitionRepository = {
  create: (data: { name: string; description: string; deadline: Date; status: string }) =>
    prisma.competition.create({ data }),
  findAll: () => prisma.competition.findMany({ include: { tasks: true, users: true, registrations: true } }),
  findById: (id: string) =>
    prisma.competition.findUnique({ where: { id }, include: { tasks: true, users: true, registrations: true } }),
  update: (id: string, data: { name?: string; description?: string; deadline?: Date; status?: string }) =>
    prisma.competition.update({ where: { id }, data }),
};
