import prisma from '../../prisma';

export const trackEventRepository = {
  create: (data: { taskId: string; userId: string; value: number }) =>
    prisma.trackEvent.create({ data }),
  findByTask: (taskId: string) => prisma.trackEvent.findMany({ where: { taskId }, include: { task: true, user: true } }),
  findByUser: (userId: string) => prisma.trackEvent.findMany({ where: { userId }, include: { task: true } }),
  approve: (id: string) =>
    prisma.trackEvent.update({ where: { id }, data: { approved: true, approvedAt: new Date() } }),
  findTaskTotals: (competitionId: string) =>
    prisma.trackEvent.groupBy({ by: ['taskId'], where: { task: { competitionId } }, _avg: { value: true } }),
};
