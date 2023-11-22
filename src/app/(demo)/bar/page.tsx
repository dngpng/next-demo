import { Metadata } from "next";
import { Suspense } from "react";
import DataTable, { DataTableFallback } from "./_components/data-table";
import SearchInput from "./_components/search-input";

export const metadata: Metadata = {
  title: "Page Bar",
};

export default function BarPage({
  searchParams: { search, sort, page = 1, size = 10 },
}: {
  searchParams: {
    search?: string;
    sort?: string;
    page?: number;
    size?: number;
  };
}) {
  const sortParsed = sort?.split(",") ?? [];
  const sortObj = sortParsed[0]
    ? { id: sortParsed[0], desc: sortParsed[1] === "desc" }
    : undefined;

  const pageIndex = page - 1;
  const pageSize = size;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SearchInput search={search ?? ""} />
      </div>

      <div className="rounded-md border border-border">
        <Suspense fallback={<DataTableFallback />}>
          <DataTable
            search={search}
            sort={sortObj}
            pageIndex={pageIndex}
            pageSize={pageSize}
          />
        </Suspense>
      </div>
    </div>
  );
}
