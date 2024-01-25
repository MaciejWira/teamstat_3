import getTable from "@/services/getTable";
import Table from "@/components/server/Table";

export default async function TablePage() {
  const table = await getTable();

  return <Table heading="Cała tabela" table={table} />;
}
