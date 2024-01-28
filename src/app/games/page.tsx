import Link from "next/link";
import getGames from "@/services/getGames";
import style from "./GamesPage.module.scss";

export default async function GamesPage() {
  const { games } = await getGames();

  return (
    <div className={style.Container}>
      <h2>Mecze</h2>
      <ul>
        {(games || []).map((game) => (
          <div key={game.slug}>
            <div key={game.acf?.gameDate}>
              {game.acf?.gameDate} |{" "}
              {game?.acf?.gameTeam1?.captain?.[0]?.title || "x"}{" "}
              {game.acf?.gameTeam1?.goals}:{game.acf?.gameTeam2?.goals}{" "}
              {game?.acf?.gameTeam2?.captain?.[0]?.title || "x"}
            </div>
            {/* <Link href={`/game/${game.slug}`} key={game.acf?.gameDate}>
              {game.acf?.gameDate} |{" "}
              {game?.acf?.gameTeam1?.captain?.[0]?.title || "x"}{" "}
              {game.acf?.gameTeam1?.goals}:{game.acf?.gameTeam2?.goals}{" "}
              {game?.acf?.gameTeam2?.captain?.[0]?.title || "x"}
            </Link> */}
          </div>
        ))}
      </ul>
    </div>
  );
}
