import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getFoo } from "@/lib/db";
import CloseButton from "./close-button";
import Dialog from "./dialog";
import ExpandButton from "./expand-button";

export default async function FooProductModal({
  params: { id },
}: {
  params: { id: string };
}) {
  const foo = await getFoo(id);

  return (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{foo ? foo.product : "Product Not Found"}</DialogTitle>
        </DialogHeader>
        {!foo && (
          <div className="text-sm text-muted-foreground">
            No product with the given id{" "}
            <span className="text-foreground font-mono">{id}</span> was found.
          </div>
        )}
        {foo && (
          <div className="space-y-2">
            <div className="font-medium text-xs text-foreground">
              Description
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed">
              {foo.description}
            </div>
          </div>
        )}
        <DialogFooter>
          {foo && <ExpandButton />}
          <CloseButton />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
