import prisma from '../../prisma';

export const dashboardService = {
  teamDashboard: async (userId: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { competition: true } });
    if (!user || !user.competitionId) throw { status: 404, message: 'User or competition not found' };

    const tasks = await prisma.task.findMany({ where: { competitionId: user.competitionId } }) as Array<{ id: string; title: string; description: string; type: string; weight: number }>;
    const submissions = await prisma.submission.findMany({ where: { userId } }) as Array<{ taskId: string; status: string }>;
    const trackEvents = await prisma.trackEvent.findMany({ where: { userId, approved: true } }) as Array<{ taskId: string }>;
    const payments = await prisma.paymentStatus.findMany({ where: { userId } });

    const totalWeight = tasks.reduce((sum: number, task) => sum + task.weight, 0);
    const completedWeight = submissions.reduce((sum: number, sub) => {
      const task = tasks.find((task) => task.id === sub.taskId);
      return task ? sum + task.weight : sum;
    }, 0);
    const progress = totalWeight > 0 ? Math.min(100, Math.round((completedWeight / totalWeight) * 100)) : 0;

    const taskStatuses = tasks.map((task) => {
      const submission = submissions.find((sub) => sub.taskId === task.id);
      const event = trackEvents.find((evt) => evt.taskId === task.id);
      return {
        taskId: task.id,
        title: task.title,
        type: task.type,
        weight: task.weight,
        status: submission?.status ?? (event ? 'TRACKED' : 'PENDING'),
      };
    });

    return {
      user: { id: user.id, name: user.name, email: user.email, competitionId: user.competitionId },
      competition: { id: user.competition?.id, name: user.competition?.name },
      progress,
      taskStatuses,
      payments,
    };
  },
};
