import { GameNodeType } from "@/services/getGames";
import { PlayerStats } from "@/services/getTable";
import { ResultType } from "@/types/results";

type GameType = NonNullable<GameNodeType["acf"]>;
type TeamType = GameType["gameTeam1"] | GameType["gameTeam2"];
type PlayerType = NonNullable<NonNullable<TeamType>["players"]>[number];

type Props = {
  team: TeamType;
  teamNo: 1 | 2;
  currStats: PlayerStats[];
  goals: [number, number];
  onlyCaptains?: boolean;
};

const playerHandler = ({
  player,
  stats,
  teamMainGoals,
  teamAgainstGoals,
  result,
}: {
  player: PlayerType;
  stats: PlayerStats[];
  teamMainGoals: number;
  teamAgainstGoals: number;
  result: ResultType;
}) => {
  if (!player) return stats;
  const existingPlayerIndex = stats.findIndex(
    (_player) => _player.id === player.databaseId
  );
  const updatedStats = [...stats];
  if (existingPlayerIndex >= 0) {
    const prevStats = updatedStats[existingPlayerIndex];
    const games = prevStats.games + 1;
    const currPoints = result === "win" ? 3 : result === "lose" ? 0 : 1;
    const updatedPlayerStats: PlayerStats = {
      ...prevStats,
      games,
      wins: result === "win" ? prevStats.wins + 1 : prevStats.wins,
      draws: result === "draw" ? prevStats.draws + 1 : prevStats.draws,
      losses: result === "lose" ? prevStats.losses + 1 : prevStats.losses,
      goalsFor: prevStats.goalsFor + teamMainGoals,
      goalsAgainst: prevStats.goalsAgainst + teamAgainstGoals,
      goalsDifference:
        prevStats.goalsFor +
        teamMainGoals -
        (prevStats.goalsAgainst + teamAgainstGoals),
      points: prevStats.points + currPoints,
      pointsPerGame: parseFloat(
        ((prevStats.pointsPerGame * (games - 1) + currPoints) / games).toFixed(
          3
        )
      ),
    };
    updatedStats[existingPlayerIndex] = updatedPlayerStats;
  } else {
    const points = result === "win" ? 3 : result === "lose" ? 0 : 1;
    updatedStats.push({
      id: player.databaseId,
      slug: player.slug || undefined,
      title: player.title || "noName",
      games: 1,
      wins: result === "win" ? 1 : 0,
      draws: result === "draw" ? 1 : 0,
      losses: result === "lose" ? 1 : 0,
      goalsFor: teamMainGoals,
      goalsAgainst: teamAgainstGoals,
      goalsDifference: teamMainGoals - teamAgainstGoals,
      points,
      pointsPerGame: points,
    });
  }
  return updatedStats;
};

export const teamHandler = ({
  team,
  teamNo,
  currStats,
  goals,
  onlyCaptains,
}: Props) => {
  let updatedStats = [...currStats];
  const mainIndex = teamNo - 1;
  const againstIndex = mainIndex === 0 ? 1 : 0;
  const teamMainGoals = goals[mainIndex];
  const teamAgainstGoals = goals[againstIndex];

  const result =
    teamMainGoals > teamAgainstGoals
      ? "win"
      : teamAgainstGoals > teamMainGoals
      ? "lose"
      : "draw";

  if (!team?.players) return updatedStats;

  if (onlyCaptains) {
    const player = team?.captain?.[0] || null;
    updatedStats = playerHandler({
      player,
      stats: updatedStats,
      teamMainGoals,
      teamAgainstGoals,
      result,
    });
  } else {
    team.players.forEach((player) => {
      updatedStats = playerHandler({
        player,
        stats: updatedStats,
        teamMainGoals,
        teamAgainstGoals,
        result,
      });
    });
  }

  return updatedStats;
};
