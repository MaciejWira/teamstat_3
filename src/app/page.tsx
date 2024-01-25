import getTable from "@/services/getTable";
import Table from "@/components/server/Table";

export default async function Home() {
  const { table, rounds } = await getTable();

  return <Table table={table} rounds={rounds} />;
}
