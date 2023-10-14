"use client";

import { Foo } from "@/lib/db";
import { Column, ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface ColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function ColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: ColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn(className)}>
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {title}
        {column.getIsSorted() === false && (
          <ArrowUpDown className="ml-2 h-4 w-4 text-accent-foreground/20" />
        )}
        {column.getIsSorted() === "asc" && (
          <ArrowUp className="ml-2 h-4 w-4 text-primary" />
        )}
        {column.getIsSorted() === "desc" && (
          <ArrowDown className="ml-2 h-4 w-4 text-primary" />
        )}
      </Button>
    </div>
  );
}

export const columns: ColumnDef<Foo>[] = [
  {
    id: "select",
    size: 20,
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "product",
    size: 120,
    header: ({ column }) => (
      <ColumnHeader
        title="Product"
        column={column}
        className="-translate-x-4"
      />
    ),
  },
  {
    accessorKey: "price",
    size: 60,
    header: ({ column }) => (
      <ColumnHeader
        title="Price"
        column={column}
        className="flex justify-end translate-x-4"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-right">
          {currencyFormatter.format(row.getValue("price"))}
        </div>
      );
    },
  },
  {
    accessorKey: "company",
    size: 120,
    header: ({ column }) => (
      <ColumnHeader
        title="Company"
        column={column}
        className="-translate-x-4"
      />
    ),
  },
  {
    accessorKey: "createdAt",
    size: 80,
    cell: ({ row }) => {
      return (
        <div>
          {formatDistanceToNow(row.getValue("createdAt"), { addSuffix: true })}
        </div>
      );
    },
    header: ({ column }) => (
      <ColumnHeader title="Date" column={column} className="-translate-x-4" />
    ),
  },
  {
    accessorKey: "createdBy",
    size: 60,
    header: ({ column }) => (
      <ColumnHeader
        title="Creator"
        column={column}
        className="-translate-x-4"
      />
    ),
  },
  {
    id: "actions",
    size: 40,
    cell: ({ row }) => {
      const foo = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => void navigator.clipboard.writeText(foo.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Product</DropdownMenuItem>
            <DropdownMenuItem>View Company</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
