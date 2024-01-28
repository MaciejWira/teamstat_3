import { getDataFetch } from "@/services/getDataFetch";
import { document } from "./helpers";

const getPlayers = async () => {
  const data = await getDataFetch({
    document,
  });

  if (!data?.players || !data?.players.nodes) return {};

  const excludedPlayers = data.players.nodes.flatMap((player) =>
    player.custom_fields?.excludeFromTables ? [player.databaseId] : []
  );

  return {
    players: data.players.nodes,
    excludedPlayers,
  };
};

export default getPlayers;
