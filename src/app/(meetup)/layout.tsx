export default function MeetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex gap-4 max-w-7xl mx-auto min-h-screen flex-col items-center justify-between p-12">
      {children}
    </main>
  );
}
