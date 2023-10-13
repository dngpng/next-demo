import { getFooList } from "@/lib/db";
import { Metadata } from "next";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export const metadata: Metadata = {
  title: "Page Foo",
};

export default async function FooPage() {
  const data = await getFooList();

  return (
    <div className="mx-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
