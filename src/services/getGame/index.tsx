import { getDataFetch } from "@/services/getDataFetch";
import { document } from "./helpers";

const getGame = async (id: string) => {
  const data = await getDataFetch({
    document,
    variables: {
      id,
    },
    tags: ["get-games"],
  });
  if (!data.game?.acf) return {};

  return {
    game: data.game.acf,
  };
};

export default getGame;
