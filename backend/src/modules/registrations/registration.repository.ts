import prisma from '../../prisma';

export const registrationRepository = {
  create: (data: { teamName: string; email: string; phone: string; country: string; competitionId: string }) =>
    prisma.registration.create({ data }),
  listPending: () =>
    prisma.registration.findMany({ where: { status: 'PENDING' }, orderBy: { submittedAt: 'desc' } }),
  findById: (id: string) => prisma.registration.findUnique({ where: { id } }),
  updateStatus: (id: string, data: { status: string; approvedAt?: Date | null; rejectedAt?: Date | null; notes?: string | null }) =>
    prisma.registration.update({ where: { id }, data }),
};
