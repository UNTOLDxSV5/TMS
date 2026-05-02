import { trackEventRepository } from './trackEvent.repository';
import { taskRepository } from '../tasks/task.repository';

export const trackEventService = {
  createValue: async (data: { taskId: string; userId: string; value: number }) => {
    const task = await taskRepository.findById(data.taskId);
    if (!task) throw { status: 404, message: 'Task not found' };
    if (task.type !== 'TRACK_EVENT') throw { status: 400, message: 'Task does not accept track values' };
    return trackEventRepository.create(data);
  },
  listByTask: trackEventRepository.findByTask,
  listByUser: trackEventRepository.findByUser,
  approveValue: async (id: string) => {
    const value = await trackEventRepository.approve(id);
    return value;
  },
  computeLeaderboard: async (competitionId: string) => {
    const taskAverages = await trackEventRepository.findTaskTotals(competitionId) as Array<{ taskId: string; _avg: { value: number | null } }>;
    const taskMap = new Map(taskAverages.map((entry) => [entry.taskId, entry._avg.value ?? 0]));
    return taskMap;
  },
};
