import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { requireAdmin } from "@/lib/auth";

export const metadata: Metadata = { title: { default: "Admin", template: "%s | Admin" }, robots: { index: false, follow: false } };

export const dynamic = "force-dynamic";

const links = [
  ["/admin", "Overview"],
  ["/admin/settings", "Settings"],
  ["/admin/snippets", "Snippets"],
  ["/admin/customers", "Customers"],
  ["/admin/payments", "Payments"],
  ["/admin/audit", "Audit log"],
] as const;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <Container className="py-8">
      <nav aria-label="Admin" className="mb-8 flex flex-wrap gap-2 border-b border-line pb-4">
        {links.map(([href, label]) => (
          <Link key={href} href={href} className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted hover:bg-white/[0.06] hover:text-fg">
            {label}
          </Link>
        ))}
      </nav>
      {children}
    </Container>
  );
}
