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

  static async update(match: Matches) {
    const { homeTeamGoals, awayTeamGoals, homeTeamId, awayTeamId } = match;
    await Matches
      .update(
        { homeTeamGoals, awayTeamGoals, inProgress: true },
        { where: { homeTeamId, awayTeamId } },
      );
    const findUpdate = await Matches.findAll({ where: { homeTeamId, awayTeamId } });

    return findUpdate;
  }

  static async updateInProgress(id: string) {
    const updateMatch = await Matches
      .update(
        { inProgress: false },
        { where: { id } },
      );

    return updateMatch;
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
