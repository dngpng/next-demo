"use client";

import { Button } from "@/components/ui/button";

export default function ExpandButton() {
  return (
    <Button variant="secondary" onClick={() => window.location.reload()}>
      Full Version
    </Button>
  );
}
