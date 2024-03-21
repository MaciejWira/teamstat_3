import { getCaptainsTable } from "@/services/getTable";
import Table from "@/components/server/Table";
import { notFound } from "next/navigation";

export default async function TablePage({
  params: { year, month },
}: {
  params: {
    year: string;
    month: string;
  };
}) {
  if (isNaN(+year) || isNaN(+month)) notFound();

  const { table, rounds } = await getCaptainsTable({
    date: {
      year: +year,
      month: +month,
    },
  });

  return (
    <Table
      heading={`Tabela (kapitanowie) za ${new Date(month).toLocaleString(
        "pl-PL",
        {
          month: "long",
        }
      )} ${year}`}
      table={table}
      rounds={rounds}
      isCaptains
    />
  );
}
