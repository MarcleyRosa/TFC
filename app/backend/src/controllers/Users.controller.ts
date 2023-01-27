import { Request, Response, NextFunction } from 'express';
import { isUser } from '../middlewares/schame';
import { tokenUser, verifyToken } from '../middlewares/jwtFunctions';
import UserService from '../services/Users.service';
import { Itoken, Iuser } from '../interfaces';

class UserController {
  static async findByUser(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const { error } = isUser.validate(req.body);

      if (error) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }
      const token = tokenUser(req.body);
      await UserService.findByUser(req.body);

      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  static async findAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { authorization } = req.headers;

      if (authorization) {
        const token = verifyToken(authorization) as Itoken;

        const { email } = token;

        if (token) {
          const { role } = await UserService.findOne(email) as Iuser;
          return res.status(200).json({ role });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
