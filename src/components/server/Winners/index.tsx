import Image from "next/image";
import star from "public/assets/icons/star.svg";
import LinkC from "@/components/server/LinkC";
import Heading from "@/components/server/Heading";
import Separator from "@/components/server/Separator";
import TextC from "@/components/server/TextC";
import firstLetterUpperCase from "@/services/firstLetterUpperCase";
import { getWinners, getWinnersAmount } from "@/services/getWinners";

import style from "./Winners.module.scss";

const Winners = async () => {
  const winners = await getWinners();
  const winnersAmount = getWinnersAmount(winners);

  return (
    <div>
      <Heading>Galeria chwały</Heading>
      {winners.map(async (_winner) => {
        const { winner, dateString, month, year } = await _winner;
        const winsAmount = winner.slug ? winnersAmount[winner.slug] : 0;

        return (
          <TextC
            key={`${year}-${month}`}
            theme={["large", "margin-bottom", "flex"]}
          >
            {firstLetterUpperCase(dateString)}
            <Separator />
            <LinkC theme={["large", "white"]} href={`/player/${winner.slug}`}>
              {winner.title}
            </LinkC>
            {new Array(winsAmount).fill(0).map((el) => (
              <Image
                key={star.src}
                src={star.src}
                width={13}
                height={13}
                alt=""
                className={style.Star}
              />
            ))}
          </TextC>
        );
      })}
    </div>
  );
};

export default Winners;
