// import { NextFunction, Request, Response } from 'express';
// import LoginService from '../services/Users.service';
// import { isUser } from './schame';

// export default class LoginMiddle {
//   constructor(private service = new LoginService()) {}

//   public middleUser = async (req: Request, res: Response, next: NextFunction) => {
//     const infoUser = req.body;
//     const { error } = isUser.validate(infoUser);

//     if (error) return res.status(400).json({ message: 'All fields must be filled' });

//     return next();
//   };
// }
