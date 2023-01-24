import jwt = require('jsonwebtoken');
import { ConfigJwt } from '../interfaces';

const secret = process.env.JWT_SECRET || 'secret';

const jwtConfig: ConfigJwt = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

console.log(jwtConfig);

export function tokenUser(newUser: object | string): string {
  const token = jwt.sign(newUser, secret, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });
  return token;
}

export const verifyToken = (token: string) => {
  const decod = jwt.verify(token, secret);
  return decod;
};
