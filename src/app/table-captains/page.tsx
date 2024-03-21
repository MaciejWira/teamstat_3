import { getCaptainsTable } from "@/services/getTable";
import Table from "@/components/server/Table";

export default async function TablePage() {
  const { table, rounds } = await getCaptainsTable();

  return (
    <Table
      heading="Cała tabela (kapitanowie)"
      table={table}
      rounds={rounds}
      isCaptains
    />
  );
}
