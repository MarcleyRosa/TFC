import { Request, Response, NextFunction } from 'express';
import Leaderboard from '../utils/Leaderboard';
import LeaderboardService from '../services/Leaderboard.service';

export default class MatchesController {
  static async findAll(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const allMatches = await LeaderboardService.findAll();

      const newObj = Leaderboard(allMatches);

      const ordeOwn = newObj.sort((a: any, b: any) => b.goalsOwn - a.goalsOwn);
      const ordeFavor = ordeOwn.sort((a: any, b: any) => b.goalsFavor - a.goalsFavor);
      const ordeBalance = ordeFavor.sort((a: any, b: any) => b.goalsBalance - a.goalsBalance);

      const ordeTotalPoints = ordeBalance.sort((a: any, b: any) => b.totalPoints - a.totalPoints);

      return res.status(200).json(ordeTotalPoints);
    } catch (error) {
      next(error);
    }
  }
}
