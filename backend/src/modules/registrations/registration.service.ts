import { registrationRepository } from './registration.repository';
import { emailService } from '../email/mockEmail';

export const registrationService = {
  submitRegistration: async (payload: { teamName: string; email: string; phone: string; country: string; competitionId: string }) => {
    const registration = await registrationRepository.create(payload);
    await emailService.send(payload.email, 'Registration received', `Team ${payload.teamName} submitted registration for competition ${payload.competitionId}.`);
    return registration;
  },
  listPending: registrationRepository.listPending,
  approve: async (id: string, notes?: string) => {
    const registration = await registrationRepository.updateStatus(id, { status: 'APPROVED', approvedAt: new Date(), rejectedAt: null, notes: notes ?? null });
    await emailService.send(registration.email, 'Registration approved', `Your team ${registration.teamName} has been approved.`);
    return registration;
  },
  reject: async (id: string, notes?: string) => {
    const registration = await registrationRepository.updateStatus(id, { status: 'REJECTED', approvedAt: null, rejectedAt: new Date(), notes: notes ?? null });
    await emailService.send(registration.email, 'Registration rejected', `Your team ${registration.teamName} has been rejected.`);
    return registration;
  },
};
