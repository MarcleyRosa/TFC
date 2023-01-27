import { Request, Response, NextFunction } from 'express';
import LeaderboardHome from '../utils/LeaderboardHome';
import LeaderboardService from '../services/Leaderboard.service';
import LeaderboardAways from '../utils/LeaderboardAway';
import Leaderboard from '../utils/Leaderboard';
import RatingsLeaderboard from '../utils/RatingsLeaderboard';
import { Ileaderboard } from '../interfaces';

export default class LeaderboardController {
  static async findAll(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const allMatches = await LeaderboardService.findAllBoard();

      const newObj = Leaderboard(allMatches) as unknown as Ileaderboard[];

      const response = RatingsLeaderboard(newObj);

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async findAllHome(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const allMatches = await LeaderboardService.findAll('homeTeam');

      const newObj = LeaderboardHome(allMatches) as unknown as Ileaderboard[];

      const response = RatingsLeaderboard(newObj);

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async findAllAways(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const allMatches = await LeaderboardService.findAll('awayTeam');

      const newObj = LeaderboardAways(allMatches) as unknown as Ileaderboard[];

      const response = RatingsLeaderboard(newObj);

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
