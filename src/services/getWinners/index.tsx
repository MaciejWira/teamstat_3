import { getMonthsObj } from "@/services/getMonths";
import getTable, { sortTable } from "@/services/getTable";

export const getWinners = async () => {
  return Promise.all(
    getMonthsObj(true).map(async ({ month, year }) => {
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
};

type Winners = Awaited<ReturnType<typeof getWinners>>;

// check how many times did a player win Player of The Month
export const getWinnersAmount = (winners: Winners) => {
  const winnersAmount: { [key: string]: number } = {};
  winners.forEach(({ winner }) => {
    if (!winner?.slug) return undefined;
    winnersAmount[winner?.slug] = (winnersAmount[winner?.slug] || 0) + 1;
  });
  return winnersAmount;
};
