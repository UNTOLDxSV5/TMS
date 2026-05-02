import { paymentRepository } from './payment.repository';

export const paymentService = {
  listByUser: paymentRepository.findByUser,
  listAll: paymentRepository.findAll,
  markPayment: (userId: string, amount: number, paid: boolean) => paymentRepository.upsert(userId, amount, paid),
};
