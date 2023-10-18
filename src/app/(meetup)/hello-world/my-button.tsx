"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function MyButton({ children }: { children: React.ReactNode }) {
  console.log("MyButton renders");
  return <Button onClick={() => toast.success("Hello")}>{children}</Button>;
}
