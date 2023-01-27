import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../middlewares/jwtFunctions';
import MatchesService from '../services/Matches.service';

export default class MatchesController {
  static async findAll(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const { inProgress } = req.query;

      // const rss = inProgress === 'true';
      // const isBoolean = inProgress && JSON.parse(inProgress);

      const isBoolean = inProgress === 'true';
      const inProg = { inProgress: isBoolean };
      const getAll = { };

      const searchs = inProgress ? inProg : getAll;

      const allMatches = await MatchesService.findAll(searchs);

      return res.status(200).json(allMatches);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const { authorization } = req.headers;
      const { body } = req;

      if (authorization) {
        const message = 'Token must be a valid token';
        if (authorization.length < 193) return res.status(401).json({ message });
        const token = verifyToken(authorization);
        if (!token) {
          return res.status(401).json({ message: 'Token must be a valid token' });
        }
        const createMatch = await MatchesService.create(body);
        return res.status(201).json(createMatch);
      }
    } catch (error) {
      // const message = 'Token must be a valid token';
      // const mess = 'jwt malformed';
      // if (error.message === mess) return res.status(401).json({ message });
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

  static async updateMatchInProgress(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const { id } = req.params;
      await MatchesService.updateMatchInProgress(id, req.body);
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }
}
