import LinkC from "@/components/server/LinkC";
import Separator from "@/components/server/Separator";
import getGames from "@/services/getGames";

import style from "./ListingGames.module.scss";
import TextC from "@/components/server/TextC";

type Props = {
  games: Awaited<ReturnType<typeof getGames>>["games"];
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
