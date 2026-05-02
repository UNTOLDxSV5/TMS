import { competitionRepository } from './competition.repository';

export const competitionService = {
  createCompetition: competitionRepository.create,
  listCompetitions: competitionRepository.findAll,
  getCompetition: competitionRepository.findById,
  updateCompetition: competitionRepository.update,
};
