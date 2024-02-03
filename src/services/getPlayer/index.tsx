import { getDataFetch } from "@/services/getDataFetch";
import { document } from "./helpers";

const getPlayer = async (slug: string) => {
  const data = await getDataFetch({
    document,
    variables: {
      id: slug,
    },
  });

  if (!data?.player) return {};

  return {
    player: data.player,
  };
};

export default getPlayer;
