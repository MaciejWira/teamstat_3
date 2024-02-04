import getGames, { GameProps } from "@/services/getGames";
import getPlayers from "@/services/getPlayers";
import { teamHandler } from "@/services/getTable/utils";

export type PlayerStats = {
  id: number;
  slug?: string;
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
  const { games } = await getGames({ date });
  const { excludedPlayers } = await getPlayers();
  if (!games)
    return {
      table: [],
      rounds: 0,
    };

  const playersWithStats = games.reduce((prev, curr) => {
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
    const goals: [number, number] = [teamOneGoals, teamTwoGoals];

    // TODO: combine those two

    const teamOneStats = teamHandler({
      team: teamOne,
      teamNo: 1,
      currStats: prev,
      goals,
    });

    // teamTwoStats receive teamOneStats as param
    const teamTwoStats = teamHandler({
      team: teamTwo,
      teamNo: 2,
      currStats: teamOneStats,
      goals,
    });

    return teamTwoStats.filter(
      (player) => !(excludedPlayers || []).includes(player.id)
    );
  }, [] as PlayerStats[]);

  return {
    table: playersWithStats,
    rounds: games.length,
  };
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
