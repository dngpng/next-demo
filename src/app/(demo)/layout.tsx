import { ModeToggle } from "@/components/mode-toggle";
import NavLink from "./NavLink";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex gap-4 max-w-7xl mx-auto min-h-screen flex-col items-center justify-between p-12">
      <nav className="flex justify-between border-b-2 border-border w-full">
        <div className="flex justify-between">
          <NavLink href="/foo">Foo</NavLink>
          <NavLink href="/bar">Bar</NavLink>
          <NavLink href="/baz">Baz</NavLink>
        </div>
        <div>
          <ModeToggle />
        </div>
      </nav>
      <div className="grow w-full">{children}</div>
    </main>
  );
}
