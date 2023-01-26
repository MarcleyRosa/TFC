import { Request, Response, NextFunction } from 'express';
import { isUser } from '../middlewares/schame';
import { tokenUser, verifyToken } from '../middlewares/jwtFunctions';
import UserService from '../services/Users.service';

class UserController {
  static async findByUser(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const { error } = isUser.validate(req.body);

      if (error) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }
      const token = tokenUser(req.body);
      const { message, type }: any = await UserService.findByUser(req.body);

      if (type) return res.status(type).json({ message });

      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  static async findAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { authorization } = req.headers;

      if (authorization) {
        const token = verifyToken(authorization);

        const { email }: any = token;

        if (token) {
          const { role }: any = await UserService.findOne(email);
          return res.status(200).json({ role });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
