import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { Suspense } from "react";
import MyButton from "./my-button";
import MyIcon from "./my-icon";
import Search from "./search";

export default function HelloWorldPage() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-8">Hello World!</div>
        <MyButton>
          <MyIcon />
          <span className="ml-2">Refresh</span>
        </MyButton>
        <Suspense fallback={<div className="mt-8 text-muted">Loading...</div>}>
          <Search />
        </Suspense>
      </CardContent>
    </Card>
  );
}
