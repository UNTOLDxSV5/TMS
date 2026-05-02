import { submissionRepository } from './submission.repository';
import { storageService } from '../storage/mockS3';

export const submissionService = {
  uploadSubmission: async (data: { taskId: string; userId: string; filename: string; fileContent: string }) => {
    const upload = await storageService.upload(data.filename, data.fileContent);
    return submissionRepository.create({ taskId: data.taskId, userId: data.userId, filename: data.filename, url: upload.url, status: 'SUBMITTED' });
  },
  listByUser: submissionRepository.findByUser,
  listByTask: submissionRepository.findByTask,
  updateStatus: submissionRepository.updateStatus,
};
