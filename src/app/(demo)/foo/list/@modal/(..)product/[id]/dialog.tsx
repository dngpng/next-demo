"use client";

import { Dialog as RadixDialog, DialogProps } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

import React from "react";

export default function Dialog(props: Omit<DialogProps, "onOpenChange">) {
  const router = useRouter();

  return (
    <RadixDialog
      {...props}
      onOpenChange={(open) => {
        if (!open) router.back();
      }}
    />
  );
}
