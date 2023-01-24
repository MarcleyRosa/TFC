import bcrypt = require('bcryptjs');

import User from '../database/models/User.model';

export default class UserService {
  static async findOne(email: string): Promise<User | null> {
    const getAllUsers = await User.findOne({ where: { email } });

    return getAllUsers;
  }

  static async findByUser(user: Record<string, string>) {
    const { email, password } = user;
    const findUser = await User.findOne({ where: { email } });

    const isPassword = findUser && bcrypt
      .compareSync(password, findUser.password as unknown as string);
    if (!isPassword || !findUser) return { type: 401, message: 'Incorrect email or password' };
    return { type: null, message: findUser };
  }
}
