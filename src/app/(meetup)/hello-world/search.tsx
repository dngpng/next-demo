"use client";

import { useSearchParams } from "next/navigation";

export default function Search() {
  const search = useSearchParams();

  return <div className="mt-8">Search Param (q): {search.get("q")}</div>;
}
