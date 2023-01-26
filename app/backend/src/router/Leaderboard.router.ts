import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const LeaderboardRouter = Router();

LeaderboardRouter.get('/home', (req, res, next) => LeaderboardController
  .findAll(req, res, next));

export default LeaderboardRouter;
