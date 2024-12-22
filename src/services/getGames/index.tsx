import { getDataFetch } from "@/services/getDataFetch";
import { document } from "./helpers";

type GameDate = {
  date?: {
    year: number;
    month?: number;
  };
};

export type GameProps = GameDate & {
  playerId?: number;
};

type FetchGamesType = GameDate & {
  endCursor?: string | null;
};

type RecurringFetchGamesType = FetchGamesType & {
  hasNextPage?: boolean;
  nodes?: Awaited<ReturnType<typeof fetchGames>>["nodes"];
};

const fetchGames = async ({ date, endCursor = null }: FetchGamesType) => {
  const data = await getDataFetch({
    document,
    variables: {
      year: date?.year,
      month: date?.month,
      after: endCursor || null,
    },
    tags: ["get-games"],
  });

  const { nodes, pageInfo } = data.games || {};

  return {
    nodes,
    hasNextPage: pageInfo?.hasNextPage,
    endCursor: pageInfo?.endCursor,
  };
};

const recurringFetchGames = async ({
  date,
  hasNextPage = true,
  endCursor = null,
  nodes = [],
}: RecurringFetchGamesType) => {
  if (!hasNextPage) return nodes;
  const {
    nodes: newNodes,
    endCursor: newEndCursor,
    hasNextPage: newHasNextPage,
  } = await fetchGames({
    date,
    endCursor,
  });
  return recurringFetchGames({
    date,
    nodes: [...nodes, ...(newNodes || [])],
    endCursor: newEndCursor || null,
    hasNextPage: !!newHasNextPage,
  });
};

const getGames = async ({ date, playerId }: GameProps = {}) => {
  const nodes = await recurringFetchGames({
    date,
  });

  const games = (() => {
    if (!nodes) return undefined;
    if (playerId) {
      return nodes.filter(
        (node) =>
          node.acf?.gameTeam1?.players?.find(
            (player) => player?.databaseId === playerId
          ) ||
          node.acf?.gameTeam2?.players?.find(
            (player) => player?.databaseId === playerId
          )
      );
    }

    return nodes;
  })();

  return nodes && games
    ? {
        games,
        lastGameDate: nodes[0]?.acf?.gameDate,
      }
    : {};
};

export default getGames;

export type GamesNodesType = NonNullable<Awaited<ReturnType<typeof getGames>>>;
