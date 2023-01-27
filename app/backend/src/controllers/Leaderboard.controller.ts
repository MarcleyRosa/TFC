import { Request, Response, NextFunction } from 'express';
import LeaderboardHome from '../utils/LeaderboardHome';
import LeaderboardService from '../services/Leaderboard.service';
import LeaderboardAways from '../utils/LeaderboardAway';
import Leaderboard from '../utils/Leaderboard';

export default class LeaderboardController {
  static async findAll(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const allMatches = await LeaderboardService.findAllBoard();

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

  static async findAllHome(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const allMatches = await LeaderboardService.findAll('homeTeam');

      const newObj = LeaderboardHome(allMatches);

      const ordeOwn = newObj.sort((a: any, b: any) => b.goalsOwn - a.goalsOwn);
      const ordeFavor = ordeOwn.sort((a: any, b: any) => b.goalsFavor - a.goalsFavor);
      const ordeBalance = ordeFavor.sort((a: any, b: any) => b.goalsBalance - a.goalsBalance);

      const ordeTotalPoints = ordeBalance.sort((a: any, b: any) => b.totalPoints - a.totalPoints);

      return res.status(200).json(ordeTotalPoints);
    } catch (error) {
      next(error);
    }
  }

  static async findAllAways(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const allMatches = await LeaderboardService.findAll('awayTeam');

      const newObj = LeaderboardAways(allMatches);

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
