import bcrypt from 'bcryptjs';
import { userRepository } from './user.repository';

export const userService = {
  createUser: async (payload: { email: string; name: string; password: string; role: string; competitionId?: string | null }) => {
    const hashed = await bcrypt.hash(payload.password, 10);
    return userRepository.create({ ...payload, password: hashed });
  },
  listUsers: userRepository.findAll,
  assignRoleAndCompetition: (id: string, data: { role?: string; competitionId?: string | null }) =>
    userRepository.update(id, data),
};
