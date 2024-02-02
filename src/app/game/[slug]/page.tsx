import getGame from "@/services/getGame";
import TextC, { TextSpan } from "@/components/server/TextC";
import HeadingWrapper from "@/components/server/HeadingWrapper";
import Heading from "@/components/server/Heading";
import style from "./GamePage.module.scss";
import { Fragment } from "react";

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

  const captainOne = gameTeam1?.captain?.[0];
  const captainTwo = gameTeam2?.captain?.[0];
  const playersOne = (gameTeam1?.players || []).filter(
    (el) => el?.databaseId !== captainOne?.databaseId
  );
  const playersTwo = (gameTeam2?.players || []).filter(
    (el) => el?.databaseId !== captainTwo?.databaseId
  );
  const max = Math.max(playersOne.length, playersTwo.length);

  const playersPaired = Array.from({ length: max }).map((el, index) => [
    playersOne[index]?.title || null,
    playersTwo[index]?.title || null,
  ]);

  console.log(playersPaired);

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
              <td>
                <TextSpan>{captainOne?.title}</TextSpan>{" "}
                <TextSpan theme={["white"]}>(k)</TextSpan>
              </td>
              <td>
                <TextSpan>{captainTwo?.title}</TextSpan>{" "}
                <TextSpan theme={["white"]}>(k)</TextSpan>
              </td>
            </tr>
          )}
          {playersPaired.map((pair) => (
            <tr className={style.Tr} key={pair[0] || pair[1]}>
              <td>
                <TextSpan>{pair[0]}</TextSpan>
              </td>
              <td>
                <TextSpan>{pair[1]}</TextSpan>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
