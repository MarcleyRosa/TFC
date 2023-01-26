import Teams from '../database/models/Team.model';
import Matches from '../database/models/Matche.model';
import { ITeam } from '../interfaces';

export default class MatchesService {
  static async findAll(team: string): Promise<ITeam[]> {
    const getAllMatches = await Teams
      .findAll({ where: { },
        attributes: { exclude: ['id'] },
        include: [
          { model: Matches,
            as: team,
            attributes: { exclude: ['id', 'inProgress'] },
            where: { inProgress: false } },
        ] });

    return getAllMatches;
  }
}

// { where: { inProgress: false },
//         attributes: { exclude: ['id'] },
//         include: [
//           { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
//           { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
//         ] }
