import { headers } from "next/headers";
import Link from "next/link";

export default function Layout({
  children,
  desktop,
  mobile,
}: {
  children: React.ReactNode;
  desktop: React.ReactNode;
  mobile: React.ReactNode;
}) {
  const userAgent = headers().get("user-agent") ?? "";

  const isMobile = Boolean(
    userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  const content = isMobile ? mobile : desktop;

  return (
    <div className="p-8 w-full max-w-5xl mx-auto space-y-10">
      <div className="border-b border-gray-100 space-x-8">
        <Link href="/test1" className="py-3 inline-block hover:text-slate-500">
          Test1
        </Link>
        <Link href="/test2" className="py-3 inline-block hover:text-slate-500">
          Test2
        </Link>
      </div>
      <div className="space-y-10">
        {content}
        {children}
      </div>
    </div>
  );
}
