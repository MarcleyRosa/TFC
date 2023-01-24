import { Router } from 'express';
// import LoginMiddle from '../middlewares/login.middleware';
import UserController from '../controllers/Users.controller';

const UserRouter = Router();

// const logii = new LoginMiddle();

UserRouter.post('/', (req, res, next) => UserController
  .findByUser(req, res, next));
UserRouter.get('/validate', (req, res, next) => UserController
  .findAll(req, res, next));

export default UserRouter;
