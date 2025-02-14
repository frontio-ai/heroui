import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";

function generateRows(count) {
  return Array.from({length: count}, (_, index) => ({
    key: index.toString(),
    name: `Item ${index + 1}`,
    value: `Value ${index + 1}`,
  }));
}

export default function App() {
  const rows = generateRows(500);
  const columns = [
    {key: "name", label: "Name"},
    {key: "value", label: "Value"},
  ];

  return (
    <Table
      isVirtualized
      aria-label="Example of virtualized table with a large dataset"
      maxTableHeight={500}
      rowHeight={70}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{item[columnKey]}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
