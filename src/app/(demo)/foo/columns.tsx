"use client";

import { Foo } from "@/lib/db";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<Foo>[] = [
  {
    accessorKey: "product",
    header: "Product",
    size: 150,
  },
  {
    accessorKey: "price",
    size: 50,
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      return <div className="text-right">${row.getValue("price")}</div>;
    },
  },
  {
    accessorKey: "company",
    size: 150,
    header: "Company",
  },
  {
    accessorKey: "createdAt",
    size: 100,
    header: "Created At",
    cell: ({ row }) => {
      return (
        <div>
          {formatDistanceToNow(row.getValue("createdAt"), { addSuffix: true })}
        </div>
      );
    },
  },
  {
    accessorKey: "createdBy",
    size: 100,
    header: "Created By",
  },
  {
    id: "actions",
    size: 10,
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
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
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
