import NavLink from "./NavLink";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex gap-4 max-w-7xl mx-auto min-h-screen flex-col items-center justify-between p-12">
      <nav className="flex border-b-2 border-secondary w-full">
        <NavLink href="/foo">Foo</NavLink>
        <NavLink href="/bar">Bar</NavLink>
      </nav>
      <div className="grow">{children}</div>
    </main>
  );
}
