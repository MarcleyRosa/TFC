import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';
import Matche from '../database/models/Matche.model';

export interface Iuser {
  username: string
  email: string
  role: string
  password?: string
}

export interface Ilogin {
  email: string
  password: string
}

export interface ConfigJwt {
  expiresIn: string;
  algorithm: string;
}

export interface IResponse {
  type: number | null
  message: string | Iuser
}

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export interface ITeam {
  teamName: string
  homeTeam?: Matche[]
}
