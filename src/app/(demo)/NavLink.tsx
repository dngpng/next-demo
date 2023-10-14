"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "px-8 py-3 block border-b-2 -mb-0.5",
        path.startsWith(href) ? "border-primary" : "border-transparent"
      )}
    >
      {children}
    </Link>
  );
}
