import prisma from '../../prisma';

export const taskRepository = {
  create: (data: { competitionId: string; title: string; description: string; type: string; weight: number; meta?: any }) =>
    prisma.task.create({ data }),
  findByCompetition: (competitionId: string) => prisma.task.findMany({ where: { competitionId } }),
  findById: (id: string) => prisma.task.findUnique({ where: { id } }),
  update: (id: string, data: { title?: string; description?: string; weight?: number; meta?: any }) =>
    prisma.task.update({ where: { id }, data }),
  totalWeightForCompetition: (competitionId: string) =>
    prisma.task.aggregate({ where: { competitionId }, _sum: { weight: true } }),
};
