import FilterNav from "@/components/client/FilterNav";
import { PlayerStats, sortTable } from "@/services/getTable";
import classNames from "@/services/classNames";
import getGames from "@/services/getGames";

import styles from "./Table.module.scss";

type Props = {
  heading?: string;
  roundsText?: string;
  table: PlayerStats[];
  rounds?: number;
};

const columns = [
  { short: "#" },
  {
    long: "Zawodnik",
    short: "Zawodnik",
    isLong: true,
    additionalClasses: [
      styles["Td--left"],
      styles["Td--white"],
      styles["Td--wide"],
    ],
  },
  { long: "Mecze", short: "M" },
  { long: "Punkty", short: "Pkt" },
  { long: "Gole", short: "G" },
  { long: "Wygrane", short: "W" },
  { long: "Remisy", short: "R" },
  { long: "Przegrane", short: "P" },
  { long: "Gole strzelone", short: "G+" },
  { long: "Gole stracone", short: "G-" },
];

const Table: React.FC<Props> = async ({
  heading,
  table,
  rounds,
  roundsText = "Ilość kolejek",
}) => {
  const { lastGameDate } = await getGames();
  return (
    <div className={styles.Container}>
      <FilterNav />
      <div className={styles.Header}>
        {heading && <h2 className={styles.Heading}>{heading}</h2>}
        <p>
          {rounds && (
            <>
              {roundsText}: <span className={styles.Strong}>{rounds}</span>
              <span className={styles.Break}>|</span>
            </>
          )}
          Ostatni mecz: <span className={styles.Strong}>{lastGameDate}</span>
        </p>
      </div>
      <table>
        <tbody>
          <tr>
            {columns.map((column) => (
              <th
                className={classNames(
                  styles.Td,
                  styles.Th,
                  ...(column.additionalClasses || [])
                )}
                key={column.short}
              >
                {column.isLong ? column.long : column.short}
              </th>
            ))}
          </tr>
          {sortTable(table).map((row, indexTr) => {
            const values = [
              indexTr + 1,
              row.title,
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
              <tr key={row.id}>
                {values.map((el, indexTd) => (
                  <td
                    className={classNames(
                      styles.Td,
                      indexTr === 0 && indexTd === 0 && styles["Td--first"],
                      indexTr === 1 && indexTd === 0 && styles["Td--second"],
                      indexTr === 2 && indexTd === 0 && styles["Td--third"],
                      ...(columns[indexTd].additionalClasses || [])
                    )}
                    key={indexTd}
                  >
                    {el}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.Legend}>
        {columns.map((column) =>
          column.long && column.long !== column.short ? (
            <p key={column.short} className={styles.Text}>
              {column.short} - {column.long}
            </p>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Table;
