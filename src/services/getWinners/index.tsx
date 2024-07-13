import { getMonthsObj } from "@/services/getMonths";
import getTable, { sortTable } from "@/services/getTable";

export const getWinners = async () => {
  return Promise.all(
    getMonthsObj(true).map(async ({ month, year }) => {
      const winner = sortTable(
        (await getTable({ date: { month, year } })).table
      )[0];

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
  console.log({ winners });
  winners.forEach(({ winner: { slug } }) => {
    console.log({ slug });
    if (!slug) return undefined;
    winnersAmount[slug] = (winnersAmount[slug] || 0) + 1;
  });
  return winnersAmount;
};
