import { getDataFetch } from "@/services/getDataFetch";
import { document } from "./helpers";

export type GameProps = {
  date?: {
    year: number;
    month?: number;
  };
  playerId?: number;
};

const getGames = async ({ date, playerId }: GameProps = {}) => {
  const data = await getDataFetch({
    document,
    variables: {
      year: date?.year,
      month: date?.month,
    },
    tags: ["get-games"],
  });
  if (!data.games || !data.games.nodes) return {};

  const games = (() => {
    if (playerId) {
      return data.games.nodes.filter(
        (node) =>
          node.acf?.gameTeam1?.players?.find(
            (player) => player?.databaseId === playerId
          ) ||
          node.acf?.gameTeam2?.players?.find(
            (player) => player?.databaseId === playerId
          )
      );
    }

    return data.games.nodes;
  })();

  return {
    games,
    lastGameDate: data.games.nodes[0]?.acf?.gameDate,
  };
};

export default getGames;

export type GamesNodesType = NonNullable<Awaited<ReturnType<typeof getGames>>>;
