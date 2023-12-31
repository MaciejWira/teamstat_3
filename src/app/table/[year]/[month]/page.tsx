import getTable from "@/services/getTable";
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

  const table = await getTable({
    date: {
      year: +year,
      month: +month,
    },
  });

  return (
    <Table
      heading={`Tabela za ${new Date(month).toLocaleString("pl-PL", {
        month: "long",
      })} ${year}`}
      table={table}
    />
  );
}
