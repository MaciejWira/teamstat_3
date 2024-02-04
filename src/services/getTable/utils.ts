import getGames from "@/services/getGames";
import { PlayerStats } from "@/services/getTable";

type GameType = NonNullable<
  NonNullable<Awaited<ReturnType<typeof getGames>>["games"]>[number]["acf"]
>;
type TeamType = GameType["gameTeam1"] | GameType["gameTeam2"];

export const teamHandler = ({
  team,
  teamNo,
  currStats,
  goals,
}: {
  team: TeamType;
  teamNo: 1 | 2;
  currStats: PlayerStats[];
  goals: [number, number];
}) => {
  const updatedStats = [...currStats];
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

  team.players.forEach((player) => {
    if (!player) return;
    const existingPlayerIndex = updatedStats.findIndex(
      (_player) => _player.id === player.databaseId
    );
    if (existingPlayerIndex >= 0) {
      const prevStats = updatedStats[existingPlayerIndex];
      const updatedPlayerStats: PlayerStats = {
        ...prevStats,
        games: prevStats.games + 1,
        wins: result === "win" ? prevStats.wins + 1 : prevStats.wins,
        draws: result === "draw" ? prevStats.draws + 1 : prevStats.draws,
        losses: result === "lose" ? prevStats.losses + 1 : prevStats.losses,
        goalsFor: prevStats.goalsFor + teamMainGoals,
        goalsAgainst: prevStats.goalsAgainst + teamAgainstGoals,
        goalsDifference:
          prevStats.goalsFor +
          teamMainGoals -
          (prevStats.goalsAgainst + teamAgainstGoals),
        points:
          prevStats.points + (result === "win" ? 3 : result === "lose" ? 0 : 1),
      };
      updatedStats[existingPlayerIndex] = updatedPlayerStats;
    } else {
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
        points: result === "win" ? 3 : result === "lose" ? 0 : 1,
      });
    }
  });

  return updatedStats;
};
