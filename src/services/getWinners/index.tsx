import { getMonthsObj } from "@/services/getMonths";
import getTable, { sortTable } from "@/services/getTable";

export const getWinners = async () => {
  const allMonths = getMonthsObj(true);
  const fullYears: number[] = allMonths.reduce((prev, curr, index) => {
    if (
      !prev.includes(curr.year) &&
      curr.month === 12 &&
      allMonths[index + 11]?.year === curr.year
    ) {
      return [...prev, curr.year];
    }
    return prev;
  }, [] as number[]);

  const yearWinners = await Promise.all(
    fullYears.map(async (year) => {
      const { table, rounds } = await getTable({
        date: {
          year: +year,
        },
      });

      return {
        winner: sortTable({
          table,
          rounds,
          factor: "points",
        })[0],
        year,
      };
    })
  );

  const monthWinners = await Promise.all(
    allMonths.map(async ({ month, year }) => {
      const { rounds, table } = await getTable({ date: { month, year } });
      const winner = sortTable({
        rounds,
        table,
      })[0];

      const dateString = `${new Date(`${year}-${month}`).toLocaleString(
        "pl-PL",
        {
          month: "long",
        }
      )} ${year}`;

      return {
        winner,
        dateString,
        month,
        year,
      };
    })
  );

  return {
    monthWinners,
    yearWinners,
  };
};

type MonthWinners = Awaited<ReturnType<typeof getWinners>>[`monthWinners`];
type YearWinners = Awaited<ReturnType<typeof getWinners>>[`yearWinners`];

// check how many times did a player win Player of The Month
export const getWinnersAmount = (winners: MonthWinners | YearWinners) => {
  const winnersAmount: { [key: string]: number } = {};
  winners.forEach(({ winner }) => {
    if (!winner?.slug) return undefined;
    winnersAmount[winner?.slug] = (winnersAmount[winner?.slug] || 0) + 1;
  });
  return winnersAmount;
};
