import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFooList } from "@/lib/db";
import FooLoading from "../../foo/list/loading";

export default async function DataTable({
  search,
  sort,
  pageIndex,
  pageSize,
}: {
  search?: string;
  sort?: { id: string; desc: boolean };
  pageIndex: number;
  pageSize: number;
}) {
  const { data } = await getFooList({
    search,
    sort,
    pageIndex,
    pageSize,
  });

  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow className="text-xs">
          <TableHead>Product</TableHead>
          <TableHead>Company</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="text-foreground">{item.product}</TableCell>
            <TableCell className="text-muted-foreground">
              {item.company}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function DataTableFallback() {
  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow className="text-xs">
          <TableHead>Product</TableHead>
          <TableHead>Company</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={2}>
            <FooLoading />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
