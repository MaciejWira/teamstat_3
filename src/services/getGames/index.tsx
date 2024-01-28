import { getDataFetch } from "@/services/getDataFetch";
import { document } from "./helpers";

export type GameProps = {
  date?: {
    year: number;
    month?: number;
  };
};

const getGames = async ({ date }: GameProps = {}) => {
  const data = await getDataFetch({
    document,
    variables: {
      year: date?.year,
      month: date?.month,
    },
    tags: ["get-games"],
  });
  if (!data.games || !data.games.nodes) return {};

  return {
    games: data.games.nodes,
    lastGameDate: data.games.nodes[0]?.acf?.gameDate,
  };
};

export default getGames;

export type GamesNodesType = NonNullable<Awaited<ReturnType<typeof getGames>>>;
