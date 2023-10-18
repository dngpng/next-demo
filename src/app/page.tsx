import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <nav className="flex gap-4">
        <Link href="/foo" passHref legacyBehavior>
          <Button size="lg" variant="outline">
            Foo
          </Button>
        </Link>
        <Link href="/bar" passHref legacyBehavior>
          <Button size="lg" variant="outline">
            Bar
          </Button>
        </Link>
        <Link href="/hello-world" passHref legacyBehavior>
          <Button size="lg" variant="outline">
            Hello World
          </Button>
        </Link>
      </nav>
    </main>
  );
}
