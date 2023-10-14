"use client";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import React from "react";

export default function CloseButton() {
  return (
    <DialogClose asChild>
      <Button>Close</Button>
    </DialogClose>
  );
}
