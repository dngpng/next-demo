"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchInput({ search }: { search: string }) {
  const [searchText, setSearchText] = useState(search);
  const router = useRouter();
  const path = usePathname();

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    router.push(`${path}?search=${text}`);
  };

  return (
    <Input
      placeholder="Filter products or company ..."
      className="max-w-xs focus:max-w-sm transition-all"
      onChange={(e) => handleSearchChange(e.target.value)}
      value={searchText}
    />
  );
}
