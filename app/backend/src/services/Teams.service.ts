import Teams from '../database/models/Team.model';

export default class TeamsService {
  static async findAll(): Promise<Teams[]> {
    const getAllTeams = await Teams.findAll();

    return getAllTeams;
  }

  static async findById(id: number) {
    const findUser = await Teams.findOne({ where: { id } });

    return findUser;
  }
}
