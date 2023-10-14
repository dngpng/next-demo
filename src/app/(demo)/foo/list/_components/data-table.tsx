"use client";

import {
  ColumnDef,
  ColumnSort,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { DataTablePagination } from "./pagination";
import { DataTableViewOptions } from "./view-options";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  search?: string;
  sort?: ColumnSort;
  pagination?: PaginationState;
  totalPages: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  search = "",
  sort = { id: "createdAt", desc: true },
  pagination = { pageIndex: 0, pageSize: 10 },
  totalPages,
}: DataTableProps<TData, TValue>) {
  const path = usePathname();
  const router = useRouter();

  const [searchInner, setSearchInner] = useState(search);
  const setSearch = (text: string) => {
    setSearchInner(text);
    router.push(
      `${path}?search=${text}&sort=${sort.id},${
        sort.desc ? "desc" : "asc"
      }&page=${pagination.pageIndex + 1}&size=${pagination.pageSize}`
    );
  };

  const setSorting = (sortingState: SortingState) => {
    router.push(
      `${path}?search=${search}&sort=${sortingState[0].id},${
        sortingState[0].desc ? "desc" : "asc"
      }&page=${pagination.pageIndex + 1}&size=${pagination.pageSize}`
    );
  };

  const setPagination = (paginationState: PaginationState) => {
    router.push(
      `${path}?search=${search}&sort=${sort.id},${
        sort.desc ? "desc" : "asc"
      }&page=${paginationState.pageIndex + 1}&size=${paginationState.pageSize}`
    );
  };

  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    pageCount: totalPages,
    state: {
      pagination,
      sorting: [sort],
      rowSelection,
    },
    onSortingChange: (updater) => {
      if (typeof updater === "function") {
        setSorting(updater([sort]));
      } else {
        setSorting(updater);
      }
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        setPagination(updater(pagination));
      } else {
        setPagination(updater);
      }
    },
    onRowSelectionChange: setRowSelection,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter products or company ..."
          className="max-w-xs focus:max-w-sm transition-all"
          onChange={(e) => setSearch(e.target.value)}
          value={searchInner}
        />
        <DataTableViewOptions table={table} />
      </div>

      <div className="rounded-md border">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: header.column.getSize() ?? "auto" }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
