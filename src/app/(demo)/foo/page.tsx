import { getFooList } from "@/lib/db";
import { Metadata } from "next";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export const metadata: Metadata = {
  title: "Page Foo",
};

export default async function FooPage({
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

  const { data, totalPages } = await getFooList({
    search,
    sort: sortObj,
    pageIndex,
    pageSize,
  });

  return (
    <div className="mx-auto">
      <DataTable
        columns={columns}
        data={data}
        search={search}
        sort={sortObj}
        pagination={{
          pageIndex,
          pageSize,
        }}
        totalPages={totalPages}
      />
    </div>
  );
}
