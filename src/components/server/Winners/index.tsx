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
  const { monthWinners, yearWinners } = await getWinners();
  const monthWinnersAmount = getWinnersAmount(monthWinners);
  const yearWinnersAmount = getWinnersAmount(yearWinners);

  return (
    <div>
      <Heading>Galeria chwały</Heading>

      <section className={style.Section}>
        <Heading as="h2">Gracz roku</Heading>
        {yearWinners.map((_winner) => {
          const { winner, year } = _winner;
          const winsAmount = winner?.slug ? yearWinnersAmount[winner.slug] : 0;

          if (!winsAmount) return null;

          return (
            <TextC
              key={year}
              theme={["x-large", "bold", "margin-bottom", "flex"]}
            >
              {year}
              <Separator />
              <LinkC
                theme={["x-large", "bold", "white"]}
                href={`/player/${winner?.slug}`}
              >
                {winner.title}
              </LinkC>
              {new Array(winsAmount).fill(0).map((el) => (
                <Image
                  key={star.src}
                  src={star.src}
                  width={18}
                  height={18}
                  alt=""
                  className={style.BigStar}
                />
              ))}
            </TextC>
          );
        })}
      </section>

      <section className={style.Section}>
        <Heading as="h2">Gracz miesiąca</Heading>
        {monthWinners.map((_winner) => {
          const { winner, dateString, month, year } = _winner;
          const winsAmount = winner?.slug ? monthWinnersAmount[winner.slug] : 0;

          if (!winsAmount) return null;

          return (
            <TextC
              key={`${year}-${month}`}
              theme={["large", "margin-bottom", "flex"]}
            >
              {firstLetterUpperCase(dateString)}
              <Separator />
              <LinkC
                theme={["large", "white"]}
                href={`/player/${winner?.slug}`}
              >
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
      </section>
    </div>
  );
};

export default Winners;
