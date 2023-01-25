import { Router } from 'express';
import MatchesController from '../controllers/Matches.controller';

const MatchesRouter = Router();

// MatchesRouter.get('/', (req, res, next) => MatchesController
//   .findByInProgress(req, res, next));

MatchesRouter.get('/', (req, res, next) => MatchesController
  .findAll(req, res, next));

export default MatchesRouter;
