import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <Card>
      <CardHeader className="relative">
        <CardTitle>{foo ? foo.product : "Product Not Found"}</CardTitle>
        <CardDescription>{foo ? foo.description : ""}</CardDescription>
        <div className="absolute right-4 top-4">
          <Link href="/foo/list" passHref legacyBehavior>
            <Button variant={"outline"}>Back to List</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div></div>
      </CardContent>
    </Card>
  );
}
