import prisma from '../../prisma';

export const leaderboardService = {
  compute: async (competitionId: string) => {
    const tasks = await prisma.task.findMany({ where: { competitionId }, select: { id: true, weight: true, type: true } });
    const averages = await prisma.trackEvent.groupBy({
      by: ['taskId', 'userId'],
      where: { task: { competitionId }, approved: true },
      _avg: { value: true },
    });

    const scoreByUser = new Map<string, number>();
    averages.forEach((row) => {
      const task = tasks.find((taskItem) => taskItem.id === row.taskId);
      if (!task || task.type !== 'TRACK_EVENT') return;
      const weighted = (row._avg.value ?? 0) * (task.weight / 100);
      scoreByUser.set(row.userId, (scoreByUser.get(row.userId) ?? 0) + weighted);
    });

    const results = Array.from(scoreByUser.entries())
      .map(([userId, score]) => ({ userId, score }))
      .sort((a, b) => b.score - a.score);

    return results;
  },
};
