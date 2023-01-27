import bcrypt = require('bcryptjs');
import HttpException from '../middlewareError/httpExceptions';

import User from '../database/models/User.model';
import { Iuser } from '../interfaces';

export default class UserService {
  static async findOne(email: string): Promise<Iuser | []> {
    const getAllUsers = await User.findOne({ where: { email } });

    return getAllUsers as unknown as Iuser;
  }

  static async findByUser(user: Record<string, string>) {
    const { email, password } = user;
    const findUser = await User.findOne({ where: { email } });

    const isPassword = findUser && bcrypt
      .compareSync(password, findUser.password as unknown as string);
    if (!isPassword || !findUser) throw new HttpException(401, 'Incorrect email or password');

    return findUser;
  }
}
