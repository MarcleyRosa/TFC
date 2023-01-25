import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../middlewares/jwtFunctions';
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

  static async update(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const { authorization } = req.headers;
      const { body } = req;

      if (authorization) {
        const token = verifyToken(authorization);
        if (token) {
          const allMatches = await MatchesService.update(body);
          return res.status(201).json(allMatches);
        }
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateInProgress(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const { id } = req.params;
      await MatchesService.updateInProgress(id);
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }
}
