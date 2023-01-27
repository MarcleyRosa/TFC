import { IgoalsBalance, IgoalsFavor, IgoalsOwn, Ileaderboard, ItotalPoints } from '../interfaces';

const RatingsLeaderboard = (newObj: Ileaderboard[]) => {
  const ordeOwn = newObj
    .sort((a: IgoalsOwn, b: IgoalsOwn) => b.goalsOwn - a.goalsOwn);
  const ordeFavor = ordeOwn
    .sort((a: IgoalsFavor, b: IgoalsFavor) => b.goalsFavor - a.goalsFavor);
  const ordeBalance = ordeFavor
    .sort((a: IgoalsBalance, b: IgoalsBalance) => b.goalsBalance - a.goalsBalance);

  const ordeTotalPoints = ordeBalance
    .sort((a: ItotalPoints, b: ItotalPoints) => b.totalPoints - a.totalPoints);

  return ordeTotalPoints;
};

export default RatingsLeaderboard;
