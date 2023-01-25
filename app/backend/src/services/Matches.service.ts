import { WhereOptions } from 'sequelize';
import Teams from '../database/models/Team.model';
import Matches from '../database/models/Matche.model';

export default class MatchesService {
  static async findAll(search: WhereOptions | undefined): Promise<Matches[]> {
    const getAllMatches = await Matches
      .findAll({ where: search,
        include: [
          { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
          { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
        ] });

    return getAllMatches;
  }

  static async findByInProgress() {
    const findMatch = await Matches
      .findAll();

    // if (!isPassword || !findUser) return { type: 401, message: 'Incorrect email or password' };
    return findMatch;
  }
}
