"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ArrowUp,
  Check,
  Loader2,
  RotateCcw,
  Save,
} from "lucide-react";
import { ReactElement, useState, useTransition } from "react";

export default function ListSorter({
  children,
  updater,
}: {
  children: ReactElement[];
  updater: (newOrder: string[]) => Promise<void>;
}) {
  const initialOrder = children
    .map((item) => item.key)
    .filter((item) => item !== null) as string[];

  const [order, setOrder] = useState(initialOrder);
  const [selected, setSelected] = useState<string>();

  const isFirstSelected = selected === order[0];
  const isLastSelected = selected === order[order.length - 1];

  const moveUp = () => {
    if (!selected) return;

    const index = order.indexOf(selected);
    if (index === 0) return;

    const newOrder = [...order];
    newOrder.splice(index, 1);
    newOrder.splice(index - 1, 0, selected);

    setOrder(newOrder);
  };

  const moveDown = () => {
    if (!selected) return;

    const index = order.indexOf(selected);
    if (index === order.length - 1) return;

    const newOrder = [...order];
    newOrder.splice(index, 1);
    newOrder.splice(index + 1, 0, selected);

    setOrder(newOrder);
  };

  const [isSaving, startSaving] = useTransition();

  return (
    <div className="flex flex-col gap-2 max-w-sm mx-auto">
      {/* Action Bar */}
      <div className="flex gap-2 border border-border rounded-lg p-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={moveUp}
          disabled={!selected || isFirstSelected}
        >
          <ArrowUp />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={moveDown}
          disabled={!selected || isLastSelected}
        >
          <ArrowDown />
        </Button>
        <span className="grow" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setSelected("");
            setOrder(initialOrder);
          }}
          disabled={!selected}
        >
          <RotateCcw />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          disabled={!selected}
          onClick={() => {
            setSelected("");
            startSaving(() => updater(order));
          }}
        >
          {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
        </Button>
      </div>

      {/* List */}
      {[...children]
        .sort((a, b) => order.indexOf(a.key ?? "") - order.indexOf(b.key ?? ""))
        .map((item) => (
          <button
            key={item.key}
            className={cn(
              "rounded-lg relative mx-auto w-full py-6 text-xl uppercase bg-primary/30 text-foreground ring-1 ring-transparent hover:ring-ring ring-offset-2",
              selected === item.key && "bg-primary text-primary-foreground"
            )}
            onClick={() => {
              setSelected(selected === item.key ? "" : item.key ?? "");
            }}
          >
            {item}
            {selected === item.key && (
              <Check className="absolute right-4 top-1/2 -translate-y-1/2" />
            )}
          </button>
        ))}
    </div>
  );
}
