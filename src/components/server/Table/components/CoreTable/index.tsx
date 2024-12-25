"use client";

import { GetTableReturnType, SortProps, sortTable } from "@/services/getTable";
import classNames from "@/services/classNames";
import TextC, { TextSpan } from "@/components/server/TextC";
import LinkC from "@/components/server/LinkC";
import playerUrl from "@/services/playerUrl";

import { columns } from "../../utils";
import styles from "../../Table.module.scss";
import { useState } from "react";

type CoreTableProps = GetTableReturnType;

const CoreTable: React.FC<CoreTableProps> = ({ table, rounds }) => {
  const [sortFactor, setSortFactor] = useState<SortProps>("points");

  return (
    <>
      <table className={styles.Table}>
        <tbody>
          <tr>
            {columns.map(
              ({
                short,
                long,
                isLong,
                theme,
                additionalClassesCell,
                sortProp,
              }) => {
                const handler = sortProp
                  ? () => {
                      setSortFactor(sortProp);
                    }
                  : undefined;

                const text = isLong ? long : short;

                return (
                  <th
                    className={classNames(
                      styles.Td,
                      styles.Th,
                      ...(additionalClassesCell || [])
                    )}
                    key={short}
                  >
                    <TextSpan theme={theme}>
                      {handler ? (
                        <button
                          className={classNames(
                            styles.SortButton,
                            sortProp === sortFactor &&
                              styles["SortButton--active"]
                          )}
                          onClick={handler}
                        >
                          {text}
                        </button>
                      ) : (
                        text
                      )}
                    </TextSpan>
                  </th>
                );
              }
            )}
          </tr>
          {sortTable({
            table,
            rounds,
            factor: sortFactor,
          }).map((row, indexTr) => {
            const values = [
              indexTr + 1,
              row.slug
                ? { name: row.title, href: playerUrl(row.slug) }
                : row.title,
              row.games,
              row.points,
              row.pointsPerGame,
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
                        indexTr === 0 && indexTd === 0 && styles["Td--first"],
                        indexTr === 1 && indexTd === 0 && styles["Td--second"],
                        indexTr === 2 && indexTd === 0 && styles["Td--third"],
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
  );
};

export default CoreTable;
