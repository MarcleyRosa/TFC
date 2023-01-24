import { Router } from 'express';
import TeamsController from '../controllers/Teams.controlle';

const TeamsRouter = Router();

TeamsRouter.get('/', (req, res, next) => TeamsController
  .findAll(req, res, next));

TeamsRouter.get('/:id', (req, res, next) => TeamsController
  .findById(req, res, next));

export default TeamsRouter;
