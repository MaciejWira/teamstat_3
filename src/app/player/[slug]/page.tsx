import getGames from "@/services/getGames";
import Heading from "@/components/server/Heading";
import ListingGames from "@/components/server/ListingGames";
import { StaticPageProps } from "@/types/page";
import getPlayer from "@/services/getPlayer";
import TextC, { TextSpan } from "@/components/server/TextC";

import style from "./GamesPage.module.scss";

export default async function GamesPage({ params: { slug } }: StaticPageProps) {
  const { player } = await getPlayer(slug);
  const { games, maxWinningStreak, maxLosingStreak } = await getGames({
    playerId: player?.databaseId,
  });

  return (
    <div>
      <div className={style.Header}>
        <Heading>{player?.title}</Heading>
        <TextC theme={["large", "margin-bottom"]}>
          Najdłuższa seria wygranych:{" "}
          <TextSpan theme={["white"]}>{maxWinningStreak}</TextSpan>
        </TextC>
        <TextC theme={["large", "margin-bottom"]}>
          Najdłuższa seria przegranych:{" "}
          <TextSpan theme={["white"]}>{maxLosingStreak}</TextSpan>
        </TextC>
      </div>
      <ListingGames games={games || []} />
    </div>
  );
}
