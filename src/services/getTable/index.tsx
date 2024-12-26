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
  pointsPerGame: number;
};

const initialArr: PlayerStats[] = [];

type TableProps = GameProps & {
  onlyCaptains?: boolean;
};

const getTable = async ({ date, onlyCaptains }: TableProps = {}) => {
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
    // gql returns null for 0
    const teamOneGoals = teamOne.goals || 0;
    const teamTwoGoals = teamTwo.goals || 0;
    const goals: [number, number] = [teamOneGoals, teamTwoGoals];

    const teamOneStats = teamHandler({
      team: teamOne,
      teamNo: 1,
      currStats: prev,
      goals,
      onlyCaptains,
    });

    // teamTwoStats receive teamOneStats as param
    const teamTwoStats = teamHandler({
      team: teamTwo,
      teamNo: 2,
      currStats: teamOneStats,
      goals,
      onlyCaptains,
    });

    return teamTwoStats.filter(
      (player) => !(excludedPlayers || []).includes(player.id)
    );
  }, initialArr);

  return {
    table: playersWithStats,
    rounds: games.length,
  };
};

export type GetTableReturnType = Awaited<ReturnType<typeof getTable>>;

export const getCaptainsTable = async ({
  date,
}: Omit<TableProps, "onlyCaptains"> = {}) =>
  getTable({ date, onlyCaptains: true });

export type SortProps = keyof Pick<
  PlayerStats,
  | "games"
  | "wins"
  | "games"
  | "goalsAgainst"
  | "goalsDifference"
  | "goalsFor"
  | "losses"
  | "points"
  | "pointsPerGame"
>;

const sortOrder: SortProps[] = [
  "points",
  "goalsDifference",
  "pointsPerGame",
  "wins",
];

export const sortTable = ({
  table,
  rounds,
  factor = "points",
}: GetTableReturnType & {
  factor?: SortProps;
}) => {
  const sortedTable = [...table].sort((a, b) => {
    if (b[factor] === a[factor]) {
      let returnVal: null | number = null;
      sortOrder.forEach((prop) => {
        if (!returnVal && b[prop] !== a[prop]) {
          returnVal = b[prop] - a[prop];
        }
      });
      if (returnVal) return returnVal;
    }
    return b[factor] - a[factor];
  });

  if (rounds < 5 || factor === "points" || factor === "games")
    return sortedTable;
  if (rounds < 10)
    return sortedTable.filter((player) => player.games >= (rounds * 1) / 3);
  return sortedTable.filter((player) => player.games >= (rounds * 1) / 10);
};

export default getTable;
