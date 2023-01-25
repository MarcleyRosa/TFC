import { Request, Response, NextFunction } from 'express';
import MatchesService from '../services/Matches.service';

export default class MatchesController {
  static async findAll(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const { inProgress }: any = req.query;

      const isBoolean = inProgress && JSON.parse(inProgress);
      const inProg = { inProgress: isBoolean };
      const getAll = { };

      const searchs = inProgress ? inProg : getAll;

      const allMatches = await MatchesService.findAll(searchs);

      return res.status(200).json(allMatches);
    } catch (error) {
      next(error);
    }
  }

  static async findByInProgress(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const allMatches = await MatchesService.findByInProgress();

      return res.status(200).json(allMatches);
    } catch (error) {
      next(error);
    }
  }
}
