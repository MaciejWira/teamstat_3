import LinkC from "@/components/server/LinkC";
import Separator from "@/components/server/Separator";
import { GamesType } from "@/services/getGames";
import classNames from "@/services/classNames";
import TextC from "@/components/server/TextC";

import style from "./ListingGames.module.scss";

type Props = {
  games: GamesType;
};

const ListingGames: React.FC<Props> = ({ games }) => (
  <div>
    {(games || []).map((game, index) => (
      <div key={game.slug}>
        <LinkC
          href={`/game/${game.slug}`}
          key={game.acf?.gameDate}
          theme={["large", "margin-bottom"]}
          classNameText={style.LinkText}
        >
          <TextC theme={["white", "large"]}>
            {(games || []).length - index}
          </TextC>
          <div
            className={classNames(
              style.Result,
              game.result && style[`Result--${game.result}`]
            )}
          />
          <Separator />
          {game.acf?.gameDate}
          <Separator />
          {game?.acf?.gameTeam1?.captain?.[0]?.title || "x"}{" "}
          {game.acf?.gameTeam1?.goals || 0}:{game.acf?.gameTeam2?.goals || 0}{" "}
          {game?.acf?.gameTeam2?.captain?.[0]?.title || "x"}
        </LinkC>
      </div>
    ))}
  </div>
);

export default ListingGames;
