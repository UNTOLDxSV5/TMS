import { taskRepository } from './task.repository';

export const taskService = {
  createTask: async (data: { competitionId: string; title: string; description: string; type: string; weight: number; meta?: any }) => {
    const total = await taskRepository.totalWeightForCompetition(data.competitionId);
    const currentWeight = total._sum.weight ?? 0;
    if (currentWeight + data.weight > 100) {
      throw { status: 400, message: 'Total task weight cannot exceed 100%' };
    }
    return taskRepository.create(data);
  },
  listByCompetition: taskRepository.findByCompetition,
  getTask: taskRepository.findById,
  updateTask: async (id: string, payload: { title?: string; description?: string; weight?: number; meta?: any }) => {
    const task = await taskRepository.findById(id);
    if (!task) throw { status: 404, message: 'Task not found' };
    if (payload.weight !== undefined && payload.weight !== task.weight) {
      const total = await taskRepository.totalWeightForCompetition(task.competitionId);
      const currentWeight = total._sum.weight ?? 0;
      if (currentWeight - task.weight + payload.weight > 100) {
        throw { status: 400, message: 'Total task weight cannot exceed 100%' };
      }
    }
    return taskRepository.update(id, payload);
  },
};
