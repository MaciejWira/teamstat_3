import getGames from "@/services/getGames";
import LinkC from "@/components/server/LinkC";
import Heading from "@/components/server/Heading";

import style from "./GamesPage.module.scss";
import Separator from "@/components/server/Separator";

export default async function GamesPage() {
  const { games } = await getGames();

  return (
    <div className={style.Container}>
      <Heading>Mecze</Heading>
      <ul>
        {(games || []).map((game) => (
          <div key={game.slug} className={style.Row}>
            <LinkC
              href={`/game/${game.slug}`}
              key={game.acf?.gameDate}
              theme={["large"]}
              classNameText={style.LinkText}
            >
              {game.acf?.gameDate}
              <Separator />
              {game?.acf?.gameTeam1?.captain?.[0]?.title || "x"}{" "}
              {game.acf?.gameTeam1?.goals}:{game.acf?.gameTeam2?.goals}{" "}
              {game?.acf?.gameTeam2?.captain?.[0]?.title || "x"}
            </LinkC>
          </div>
        ))}
      </ul>
    </div>
  );
}
