import { Router } from 'express';
import MatchesController from '../controllers/Matches.controller';

const MatchesRouter = Router();

MatchesRouter.get('/', (req, res, next) => MatchesController
  .findAll(req, res, next));

MatchesRouter.patch('/:id/finish', (req, res, next) => MatchesController
  .updateInProgress(req, res, next));

MatchesRouter.post('/', (req, res, next) => MatchesController
  .create(req, res, next));

export default MatchesRouter;
