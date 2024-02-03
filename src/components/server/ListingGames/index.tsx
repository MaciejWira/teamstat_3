import LinkC from "@/components/server/LinkC";
import Separator from "@/components/server/Separator";
import getGames from "@/services/getGames";

import style from "./ListingGames.module.scss";

type Props = {
  games: Awaited<ReturnType<typeof getGames>>["games"];
};

const ListingGames: React.FC<Props> = ({ games }) => (
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
);

export default ListingGames;
