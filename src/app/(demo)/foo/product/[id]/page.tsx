import { Button } from "@/components/ui/button";
import { getFoo } from "@/lib/db";
import Link from "next/link";
import React from "react";

export default async function FooProductPage({
  params,
}: {
  params: { id: string };
}) {
  const foo = await getFoo(params.id);

  return (
    <div className="w-full">
      <div>
        <Link href="/foo/list" passHref legacyBehavior>
          <Button variant={"outline"}>Back to List</Button>
        </Link>
      </div>
      {!foo && (
        <div className="py-12 text-center tracking-tight text-2xl font-bold text-foreground">
          Product not found
        </div>
      )}
      {foo && <h1 className="text-lg text-foreground">{foo.product}</h1>}
    </div>
  );
}
