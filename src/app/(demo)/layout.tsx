import NavLink from "./NavLink";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex gap-8 max-w-7xl min-h-screen flex-col items-center justify-between p-12">
      <nav className="flex border-b border-secondary w-full">
        <NavLink href="/foo">Foo</NavLink>
        <NavLink href="/bar">Bar</NavLink>
      </nav>
      <div className="grow">{children}</div>
    </main>
  );
}
