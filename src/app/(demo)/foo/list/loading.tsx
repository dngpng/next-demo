import { Loader2 } from "lucide-react";
import React from "react";

export default function FooLoading() {
  return (
    <div className="py-8">
      <Loader2 className="mx-auto w-10 h-10 text-primary animate-spin" />
    </div>
  );
}
