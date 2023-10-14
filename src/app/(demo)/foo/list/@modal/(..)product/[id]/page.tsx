import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getFoo } from "@/lib/db";
import CloseButton from "./close-button";
import Dialog from "./dialog";

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
        <div className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          condimentum sapien quis justo finibus, ut interdum nulla ullamcorper.
          Fusce varius, sem id vulputate cursus, velit lacus bibendum turpis,
          quis congue odio ipsum in augue. Suspendisse mauris lacus, sodales id
          facilisis eu, dictum ut lacus. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia Curae; Sed ultricies,
          nulla nec viverra hendrerit, nisl lectus dignissim massa, vel viverra
          ante augue quis orci. Sed id nisl a sem consequat laoreet mattis ut
          neque. Nullam ipsum purus, finibus in ex in, efficitur volutpat lacus.
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Fusce a eleifend ante, ut lacinia ipsum.
          Nullam sagittis odio vel feugiat bibendum.
        </div>
        <DialogFooter>
          <CloseButton />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
