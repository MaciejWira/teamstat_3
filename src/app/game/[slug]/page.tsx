import getGame from "@/services/getGame";
import TextC, { TextSpan } from "@/components/server/TextC";
import HeadingWrapper from "@/components/server/HeadingWrapper";
import Heading from "@/components/server/Heading";
import LinkC from "@/components/server/LinkC";
import playerUrl from "@/services/playerUrl";
import style from "./GamePage.module.scss";

export default async function GamePage({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) {
  const { game } = await getGame(slug);

  if (!game) return null;

  const { gameDate, gameTeam1, gameTeam2 } = game;

  const teams = ([gameTeam1, gameTeam2] as const).map((team) => ({
    captain: team?.captain?.[0],
    players: (team?.players || []).filter(
      (el) => el?.databaseId !== team?.captain?.[0]?.databaseId
    ),
  }));

  const captainOne = teams[0]?.captain;
  const captainTwo = teams[1]?.captain;

  const max = Math.max(teams[0].players.length, teams[1].players.length);

  const playersPaired = Array.from({ length: max }).map((el, index) => [
    teams[0].players[index] || null,
    teams[1].players[index] || null,
  ]);

  return (
    <div className={style.Container}>
      <HeadingWrapper>
        <Heading>Mecz nr {slug}</Heading>
        <TextC theme={["white", "large"]}>
          <TextSpan theme={["large"]}>Data: </TextSpan>
          {gameDate}
        </TextC>
      </HeadingWrapper>
      <table>
        <tbody>
          <tr className={style.Tr}>
            <td>
              <TextSpan theme={["large", "white"]}>{gameTeam1?.goals}</TextSpan>
            </td>
            <td>
              <TextSpan theme={["large", "white"]}>{gameTeam2?.goals}</TextSpan>
            </td>
          </tr>
          {captainOne && captainTwo && (
            <tr className={style.Tr}>
              {[captainOne, captainTwo].map((c) => (
                <td key={c.databaseId}>
                  <LinkC href={playerUrl(c?.slug || "")}>{c?.title}</LinkC>{" "}
                  <TextSpan theme={["white"]}>(k)</TextSpan>
                </td>
              ))}
            </tr>
          )}
          {playersPaired.map((pair) => (
            <tr className={style.Tr} key={pair[0]?.slug || pair[1]?.slug}>
              {(pair || []).map((el) => (
                <td key={el?.databaseId}>
                  <LinkC href={playerUrl(el?.slug || "")}>{el?.title}</LinkC>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
