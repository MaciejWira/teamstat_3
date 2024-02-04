import FilterNav from "@/components/client/FilterNav";
import { PlayerStats, sortTable } from "@/services/getTable";
import classNames from "@/services/classNames";
import getGames from "@/services/getGames";
import HeadingWrapper from "@/components/server/HeadingWrapper";
import Heading from "@/components/server/Heading";
import TextC, { TextSpan } from "@/components/server/TextC";
import Separator from "@/components/server/Separator";
import LinkC from "@/components/server/LinkC";
import playerUrl from "@/services/playerUrl";

import { columns } from "./utils";
import styles from "./Table.module.scss";

type Props = {
  heading?: string;
  roundsText?: string;
  table: PlayerStats[];
  rounds?: number;
};

const Table: React.FC<Props> = async ({
  heading,
  table,
  rounds = 0,
  roundsText = "Ilość kolejek",
}) => {
  const { lastGameDate } = await getGames();
  return (
    <div className={styles.Container}>
      <FilterNav />
      <HeadingWrapper>
        {heading && <Heading className={styles.Heading}>{heading}</Heading>}
        <TextC className={styles.SubHeading}>
          {
            <>
              <span>
                {roundsText}: <TextSpan theme={["white"]}>{rounds}</TextSpan>
              </span>
              <Separator />
            </>
          }
          <span>
            Ostatni mecz: <TextSpan theme={["white"]}>{lastGameDate}</TextSpan>
          </span>
        </TextC>
      </HeadingWrapper>
      {!rounds ? (
        <TextC theme={["white", "large"]}>Brak meczów</TextC>
      ) : (
        <>
          <table className={styles.Table}>
            <tbody>
              <tr>
                {columns.map((column) => (
                  <th
                    className={classNames(
                      styles.Td,
                      styles.Th,
                      ...(column.additionalClassesCell || [])
                    )}
                    key={column.short}
                  >
                    <TextSpan theme={column.theme}>
                      {column.isLong ? column.long : column.short}
                    </TextSpan>
                  </th>
                ))}
              </tr>
              {sortTable(table).map((row, indexTr) => {
                const values = [
                  indexTr + 1,
                  row.slug
                    ? { name: row.title, href: playerUrl(row.slug) }
                    : row.title,
                  row.games,
                  row.points,
                  row.goalsDifference,
                  row.wins,
                  row.draws,
                  row.losses,
                  row.goalsFor,
                  row.goalsAgainst,
                ];

                return (
                  <tr key={row.id} className={styles.Tr}>
                    {values.map((el, indexTd) => {
                      const _el =
                        typeof el === "string" || typeof el === "number" ? (
                          <TextSpan theme={columns[indexTd].theme || []}>
                            {el}
                          </TextSpan>
                        ) : (
                          <LinkC
                            href={el.href}
                            theme={columns[indexTd].theme || []}
                          >
                            {el.name}
                          </LinkC>
                        );

                      return (
                        <td
                          className={classNames(
                            styles.Td,
                            indexTr === 0 &&
                              indexTd === 0 &&
                              styles["Td--first"],
                            indexTr === 1 &&
                              indexTd === 0 &&
                              styles["Td--second"],
                            indexTr === 2 &&
                              indexTd === 0 &&
                              styles["Td--third"],
                            ...(columns[indexTd].additionalClassesCell || [])
                          )}
                          key={indexTd}
                        >
                          {_el}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={styles.Legend}>
            {columns.map((column) =>
              column.long && column.long !== column.short ? (
                <TextC key={column.short} className={styles.Text}>
                  {column.short} - {column.long}
                </TextC>
              ) : null
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Table;
