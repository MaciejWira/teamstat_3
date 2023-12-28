import getGames, { GameProps } from "@/services/getGames";

export type PlayerStats = {
  id: number;
  title: string;
  games: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalsDifference: number;
  points: number;
};

const getTable = async ({ date }: GameProps = {}) => {
  const games = await getGames({ date });
  if (!games) return [];

  const playersWithStats = games.reduce((prev, curr) => {
    const updatedStats = [...prev];
    const teamOne = curr.acf?.gameTeam1 ?? false;
    const teamTwo = curr.acf?.gameTeam2 ?? false;
    if (
      teamOne === false ||
      teamTwo === false ||
      !teamOne.players ||
      !teamTwo.players
    )
      return prev;
    const teamOneGoals = teamOne.goals ?? false;
    const teamTwoGoals = teamTwo.goals ?? false;
    if (teamOneGoals === false || teamTwoGoals === false) return prev;
    const score =
      teamOneGoals > teamTwoGoals ? 1 : teamTwoGoals > teamOneGoals ? 2 : 0;

    teamOne.players.forEach((player) => {
      if (!player) return;
      const existingPlayerIndex = updatedStats.findIndex(
        (_player) => _player.id === player.databaseId
      );
      if (existingPlayerIndex >= 0) {
        const prevStats = updatedStats[existingPlayerIndex];
        const updatedPlayerStats: PlayerStats = {
          ...prevStats,
          games: prevStats.games + 1,
          wins: score === 1 ? prevStats.wins + 1 : prevStats.wins,
          draws: score === 0 ? prevStats.draws + 1 : prevStats.draws,
          losses: score === 2 ? prevStats.losses + 1 : prevStats.losses,
          goalsFor: prevStats.goalsFor + teamOneGoals,
          goalsAgainst: prevStats.goalsAgainst + teamTwoGoals,
          goalsDifference:
            prevStats.goalsFor +
            teamOneGoals -
            (prevStats.goalsAgainst + teamTwoGoals),
          points: prevStats.points + (score === 1 ? 3 : score === 2 ? 0 : 1),
        };
        updatedStats[existingPlayerIndex] = updatedPlayerStats;
      } else {
        updatedStats.push({
          id: player.databaseId,
          title: player.title || "noName",
          games: 1,
          wins: score === 1 ? 1 : 0,
          draws: score === 0 ? 1 : 0,
          losses: score === 2 ? 1 : 0,
          goalsFor: teamOneGoals,
          goalsAgainst: teamTwoGoals,
          goalsDifference: teamOneGoals - teamTwoGoals,
          points: score === 1 ? 3 : score === 2 ? 0 : 1,
        });
      }
    });

    teamTwo.players.forEach((player) => {
      if (!player) return;
      const existingPlayerIndex = updatedStats.findIndex(
        (_player) => _player.id === player.databaseId
      );
      if (existingPlayerIndex >= 0) {
        const prevStats = updatedStats[existingPlayerIndex];
        const updatedPlayerStats: PlayerStats = {
          ...prevStats,
          games: prevStats.games + 1,
          wins: score === 2 ? prevStats.wins + 1 : prevStats.wins,
          draws: score === 0 ? prevStats.draws + 1 : prevStats.draws,
          losses: score === 1 ? prevStats.losses + 1 : prevStats.losses,
          goalsFor: prevStats.goalsFor + teamTwoGoals,
          goalsAgainst: prevStats.goalsAgainst + teamOneGoals,
          goalsDifference:
            prevStats.goalsFor +
            teamTwoGoals -
            (prevStats.goalsAgainst + teamOneGoals),
          points: prevStats.points + (score === 2 ? 3 : score === 1 ? 0 : 1),
        };
        updatedStats[existingPlayerIndex] = updatedPlayerStats;
      } else {
        updatedStats.push({
          id: player.databaseId,
          title: player.title || "noName",
          games: 1,
          wins: score === 2 ? 1 : 0,
          draws: score === 0 ? 1 : 0,
          losses: score === 1 ? 1 : 0,
          goalsFor: teamTwoGoals,
          goalsAgainst: teamOneGoals,
          goalsDifference: teamTwoGoals - teamOneGoals,
          points: score === 2 ? 3 : score === 1 ? 0 : 1,
        });
      }
    });

    return updatedStats;
  }, [] as PlayerStats[]);

  return playersWithStats;
};

export const sortTable = (table: PlayerStats[]) => {
  const _table = [...table];
  _table.sort((a, b) => {
    if (b.points === a.points) return b.goalsDifference - a.goalsDifference;
    return b.points - a.points;
  });
  return _table;
};

export default getTable;
