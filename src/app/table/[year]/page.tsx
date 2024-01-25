import getTable from "@/services/getTable";
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

  const { table, rounds } = await getTable({
    date: {
      year: +year,
    },
  });

  return (
    <Table heading={`Tabela za rok ${year}`} table={table} rounds={rounds} />
  );
}
