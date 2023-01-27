import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';
import Matche from '../database/models/Matche.model';

export interface Iuser {
  id?: number | string
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

export interface Itoken {
  email: string,
  password: string,
  iat: number,
  exp: number
}

export interface ITeam {
  teamName: string
  homeTeam?: Matche[]
  awayTeam?: Matche[]
}

export interface IHomeOrAway {
  homeTeamId: number
  homeTeamGoals: number
  awayTeamId: number
  awayTeamGoals: number
}

export interface ITeamInfo {
  teamName: string,
  homeTeam: [
    {
      homeTeamId: number,
      homeTeamGoals: number,
      awayTeamId: number,
      awayTeamGoals: number
    },
  ],
  awayTeam: [
    {
      homeTeamId: number,
      homeTeamGoals: number,
      awayTeamId: number,
      awayTeamGoals: number
    },
  ]
}

export interface Ileaderboard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number
}

export interface IgoalsOwn {
  goalsOwn: number,
}

export interface IgoalsBalance {
  goalsBalance: number,
}

export interface IgoalsFavor {
  goalsFavor: number,
}

export interface ItotalPoints {
  totalPoints: number,
}
