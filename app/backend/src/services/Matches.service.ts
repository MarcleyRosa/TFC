import { WhereOptions } from 'sequelize';
import Teams from '../database/models/Team.model';
import Matches from '../database/models/Matche.model';
import HttpException from '../middlewareError/httpExceptions';

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

  static async create(match: Matches) {
    const { homeTeamId, awayTeamId } = match;
    const findTeamHome = await Matches.findOne({ where: { id: homeTeamId } });
    const findTeamAway = await Matches.findOne({ where: { id: awayTeamId } });

    const message = 'It is not possible to create a match with two equal teams';

    if (homeTeamId === awayTeamId) throw new HttpException(422, message);

    if (!findTeamAway || !findTeamHome) {
      throw new HttpException(404, 'There is no team with such id!');
    }

    const insertId = await Matches
      .create({ ...match, inProgress: true });

    return insertId;
  }

  static async updateInProgress(id: string) {
    const updateMatch = await Matches
      .update(
        { inProgress: false },
        { where: { id } },
      );

    return updateMatch;
  }

  static async updateMatchInProgress(match: Matches) {
    const { homeTeamGoals, awayTeamGoals, homeTeamId, awayTeamId } = match;
    await Matches
      .update(
        { homeTeamGoals, awayTeamGoals, inProgress: true },
        { where: { homeTeamId, awayTeamId } },
      );
    const findUpdate = await Matches.findAll({ where: { homeTeamId, awayTeamId } });

    return findUpdate;
  }
}
// {
//   "id": 1,
//   "homeTeamId": 16,
//   "homeTeamGoals": 1,
//   "awayTeamId": 8,
//   "awayTeamGoals": 1,
//   "inProgress": false,
//   "homeTeam": {
//     "teamName": "São Paulo"
//   },
//   "awayTeam": {
//     "teamName": "Grêmio"
//   }
// }
