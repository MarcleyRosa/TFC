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

const calc = (team: any) => {
  let points = 0; let vic = 0; let draw = 0; let lose = 0; let golFavor = 0; let goalOwn = 0;

  team.homeTeam?.forEach((match: any) => {
    const { homeTeamGoals, awayTeamGoals } = match;
    points += pointsGame(homeTeamGoals, awayTeamGoals);
    vic += returnVictory(homeTeamGoals, awayTeamGoals);
    draw += returnDraw(homeTeamGoals, awayTeamGoals);
    lose += returnLose(homeTeamGoals, awayTeamGoals);
    golFavor += homeTeamGoals; goalOwn += awayTeamGoals;
  });
  team.awayTeam?.forEach((match: any) => {
    const { homeTeamGoals, awayTeamGoals } = match;
    points += pointsGame(awayTeamGoals, homeTeamGoals);
    vic += returnVictory(awayTeamGoals, homeTeamGoals);
    draw += returnDraw(awayTeamGoals, homeTeamGoals);
    lose += returnLose(awayTeamGoals, homeTeamGoals);
    golFavor += awayTeamGoals; goalOwn += homeTeamGoals;
  });
  return { points, vic, draw, lose, golFavor, goalOwn };
};

const Leaderboard = (allMatches: any) => {
  const allMat = allMatches.map((team: any) => {
    const values = calc(team);
    const totGames = team.homeTeam.length + team.awayTeam.length;
    const newObj = ({
      name: team.teamName,
      totalPoints: values.points,
      totalGames: totGames,
      totalVictories: values.vic,
      totalDraws: values.draw,
      totalLosses: values.lose,
      goalsFavor: values.golFavor,
      goalsOwn: values.goalOwn,
      goalsBalance: values.golFavor - values.goalOwn,
      efficiency: ((values.points / (totGames * 3)) * 100).toFixed(2),
    });
    return newObj;
  });
  return allMat;
};

export default Leaderboard;
