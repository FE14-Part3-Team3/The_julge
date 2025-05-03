import { Column } from "./Table";
import Table from "./Table";

interface TableSectionProps<T> {
  data: T[];
  columns: Column<T>[];
}

export function TableSection<T extends { id: string | number }>({
  data,
  columns,
}: TableSectionProps<T>) {
  return <Table<T> data={data} columns={columns} />;
}
