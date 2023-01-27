import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const LeaderboardRouter = Router();

LeaderboardRouter.get('/home', (req, res, next) => LeaderboardController
  .findAllHome(req, res, next));

LeaderboardRouter.get('/away', (req, res, next) => LeaderboardController
  .findAllAways(req, res, next));

LeaderboardRouter.get('/', (req, res, next) => LeaderboardController
  .findAll(req, res, next));

export default LeaderboardRouter;
