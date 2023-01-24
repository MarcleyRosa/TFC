import { Request, Response, NextFunction } from 'express';
import TeamsService from '../services/Teams.service';

class TeamsController {
  static async findAll(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const allTeams = await TeamsService.findAll();

      return res.status(200).json(allTeams);
    } catch (error) {
      next(error);
    }
  }

  static async findById(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const { id } = req.params;
      const findById = await TeamsService.findById(+id);

      return res.status(200).json(findById);
    } catch (error) {
      next(error);
    }
  }
}

export default TeamsController;
