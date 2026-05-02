import prisma from '../../prisma';

export const submissionRepository = {
  create: (data: { taskId: string; userId: string; filename: string; url: string; status?: string }) =>
    prisma.submission.create({ data }),
  findByUser: (userId: string) => prisma.submission.findMany({ where: { userId } }),
  findByTask: (taskId: string) => prisma.submission.findMany({ where: { taskId } }),
  updateStatus: (id: string, status: string) => prisma.submission.update({ where: { id }, data: { status } }),
};
