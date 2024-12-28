import { getDataFetch } from "@/services/getDataFetch";
import { ResultType } from "@/types/results";
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

export type GameNodeType = NonNullable<
  Awaited<ReturnType<typeof fetchGames>>["nodes"]
>[0];

export type GamesType = (GameNodeType & {
  result?: ResultType;
})[];

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
  let currResult: ResultType | undefined = undefined;
  let maxWinningStreak: number | undefined = undefined;
  let currWinningStreak = 0;
  let maxLosingStreak: number | undefined = undefined;
  let currLosingStreak = 0;

  const games: GamesType = playerId
    ? nodes.flatMap((node) => {
        const { gameTeam1, gameTeam2 } = node.acf || {};
        const isTeam1 = gameTeam1?.players?.some(
          (player) => player?.databaseId === playerId
        );
        const isTeam2 =
          !isTeam1 &&
          gameTeam2?.players?.some((player) => player?.databaseId === playerId);

        // return isTeam1 || isTeam2;

        if (!isTeam1 && !isTeam2) return [];
        const result: ResultType = (() => {
          if (gameTeam1?.goals === gameTeam2?.goals) return "draw";
          if ((gameTeam1?.goals || 0) > (gameTeam2?.goals || 0)) {
            if (isTeam1) return "win";
            return "lose";
          }
          if (isTeam2) return "win";
          return "lose";
        })();

        if (currResult === result) {
          if (result === "win") {
            currWinningStreak += 1;
            maxWinningStreak = Math.max(
              maxWinningStreak || 0,
              currWinningStreak
            );
          } else if (result === "lose") {
            currLosingStreak += 1;
            maxLosingStreak = Math.max(maxLosingStreak || 0, currLosingStreak);
          }
        } else {
          currResult = result;
          currWinningStreak = result === "win" ? 1 : 0;
          currLosingStreak = result === "lose" ? 1 : 0;
        }

        return [
          {
            ...node,
            result,
          },
        ];
      })
    : nodes;

  return nodes && games
    ? {
        games,
        lastGameDate: nodes[0]?.acf?.gameDate,
        maxWinningStreak,
        maxLosingStreak,
      }
    : {};
};

export default getGames;
