import { getCaptainsTable } from "@/services/getTable";
import Table from "@/components/server/Table";
import { notFound } from "next/navigation";

export default async function TablePage({
  params: { year },
}: {
  params: {
    year: string;
  };
}) {
  if (isNaN(+year)) notFound();

  const { table, rounds } = await getCaptainsTable({
    date: {
      year: +year,
    },
  });

  return (
    <Table
      heading={`Tabela (kapitanowie) za rok ${year}`}
      table={table}
      rounds={rounds}
      isCaptains
    />
  );
}
