import { IHomeOrAway, ITeamInfo } from '../interfaces';

const pointsGame = (teamHome: number, teamAway: number) => {
  if (teamHome > teamAway) return 3;

  if (teamHome === teamAway) return 1;
  return 0;
};

const returnVictory = (teamHome: number, teamAway: number) => {
  if (teamHome > teamAway) return 1;
  return 0;
};

const returnDraw = (teamHome: number, teamAway: number) => {
  if (teamHome === teamAway) return 1;
  return 0;
};

const returnLose = (teamHome: number, teamAway: number) => {
  if (teamHome < teamAway) return 1;
  return 0;
};

const calc = (team: ITeamInfo) => {
  let points = 0;
  let vic = 0;
  let draw = 0;
  let lose = 0;
  let golFavor = 0;
  let goalOwn = 0;

  team.awayTeam?.forEach((match: IHomeOrAway) => {
    const { homeTeamGoals, awayTeamGoals } = match;
    points += pointsGame(awayTeamGoals, homeTeamGoals);
    vic += returnVictory(awayTeamGoals, homeTeamGoals);
    draw += returnDraw(awayTeamGoals, homeTeamGoals);
    lose += returnLose(awayTeamGoals, homeTeamGoals);
    golFavor += awayTeamGoals;
    goalOwn += homeTeamGoals;
  });
  return { points, vic, draw, lose, golFavor, goalOwn };
};

const LeaderboardAways = (allMatches: ITeamInfo[]) => {
  const allMat = allMatches.map((team: ITeamInfo) => {
    const values = calc(team);
    const newObj = ({
      name: team.teamName,
      totalPoints: values.points,
      totalGames: team.awayTeam.length,
      totalVictories: values.vic,
      totalDraws: values.draw,
      totalLosses: values.lose,
      goalsFavor: values.golFavor,
      goalsOwn: values.goalOwn,
      goalsBalance: values.golFavor - values.goalOwn,
      efficiency: ((values.points / (team.awayTeam.length * 3)) * 100).toFixed(2),
    });
    return newObj;
  });
  return allMat;
};

export default LeaderboardAways;
