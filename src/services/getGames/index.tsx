import { getDataFetch } from "@/services/getDataFetch";
import { document } from "./helpers";

const getGames = async () => {
  const data = await getDataFetch({
    document,
  });
  if (!data.games) return;
  if (!data.games.nodes) return;
  return data.games.nodes;
};

export default getGames;

export type GamesNodesType = NonNullable<Awaited<ReturnType<typeof getGames>>>;
