import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Download, FileCode2, LockKeyhole } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { getCatalog, getProduct } from "@/lib/products";
import { catalogProductJsonLd, jsonLdPayload } from "@/lib/seo";
import { formatOfferPrice } from "@/lib/offer";

export function generateStaticParams() {
  return getCatalog().items.map((p) => ({ slug: p.slug }));
}

const categoryLabel: Record<string, string> = {
  "php-script": "PHP script",
  ebook: "Ebook",
  "skill-pack": "AI skill pack",
  "spreadsheet-pack": "Spreadsheet system",
  "swipe-file": "Swipe file",
  "template-pack": "Template pack",
  "planner-pack": "Printable planner",
  bundle: "Mega bundle",
  "html-template": "HTML template",
};

const label = (c: string) => categoryLabel[c] ?? c;
const resellCategories = new Set(["ebook", "spreadsheet-pack", "swipe-file", "template-pack", "planner-pack", "bundle"]);

const categoryKeywords: Record<string, string[]> = {
  ebook: ["ebook", "guide", "playbook", "pdf download", "resell rights"],
  "skill-pack": ["ai skill", "agent skill", "claude skill", "ai agent", "ecommerce automation"],
  "spreadsheet-pack": ["spreadsheet template", "excel template", "google sheets", "business spreadsheet", "xlsx"],
  "swipe-file": ["swipe file", "copywriting templates", "ad copy", "marketing templates"],
  "template-pack": ["template pack", "business templates", "document templates", "printable templates"],
  "planner-pack": ["printable planner", "planner pdf", "digital planner", "habit tracker", "printable"],
  bundle: ["bundle", "mega bundle", "digital product bundle", "value bundle"],
  "html-template": ["html template", "landing page template"],
  "php-script": ["php script", "php tool"],
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Product" };
  return {
    title: `${p.title} - ${label(p.category)} | GPLMart`,
    description: p.description.slice(0, 155),
    keywords: [p.title, label(p.category), "gplmart", "digital product", "resell rights", ...(categoryKeywords[p.category] ?? [])],
    alternates: { canonical: `/products/${p.slug}` },
  };
}

const usageSteps: Record<string, string[]> = {
  "skill-pack": [
    "Download the zip from the members download box (right side).",
    "Unzip it - inside you'll find a skill folder with SKILL.md and USAGE.md.",
    "Upload the skill folder to your AI agent - Claude Code Desktop/CLI, Devin, Cursor or any skill-compatible agent.",
    "Open USAGE.md inside the skill - it walks you through every step for your first run.",
    "Text skills need nothing extra. Video and image skills need a free Higgsfield or fal.ai account for generation.",
  ],
  ebook: [
    "Click Download PDF above - the file is generated fresh, always the latest version.",
    "Open it in any PDF reader (Adobe, browser, phone) - works fully offline.",
    "Work through the chapters in order; each ends with checklists and templates you can copy.",
    "Re-download anytime from your dashboard - updates are free.",
  ],
  "html-template": [
    "Download the zip and unzip it on your computer.",
    "Upload the folder to your store host or web server (cPanel, Netlify, GitHub Pages - any static host works).",
    "Open the page in a browser to preview, then customise the HTML/CSS inside the files.",
    "Link it from your store navigation, ads or email campaigns.",
  ],
  "php-script": [
    "Download the zip and unzip it.",
    "Upload the .php file to your web server (public_html or your app's scripts folder).",
    "Configure the settings at the top of the file (API keys, prices, store URL) as described in the README inside the zip.",
    "Test it on a staging page before pointing real traffic at it.",
  ],
  "spreadsheet-pack": [
    "Download the zip and open the .xlsx in Excel, Google Sheets (File > Import) or Numbers.",
    "Yellow cells are inputs - type your numbers, formulas and dashboards update automatically.",
    "Start with the calculator tab to price your first product, then log activity in the tracker tabs weekly.",
    "Make a copy for each store or client - never edit the original.",
  ],
  "swipe-file": [
    "Download the zip - you'll get the swipe file (PDF + CSV + Markdown).",
    "Open the PDF for the full guide, or the CSV to import hooks into your own sheets/Notion.",
    "Pick a swipe, swap the [BRACKETED] placeholders for your product and audience, deploy.",
    "Track what converts and build your own swipe vault over time.",
  ],
  bundle: [
    "Download the zip - it contains every included product in its own folder.",
    "Start with the bundle guide (book.pdf) for the recommended order and quick wins.",
    "Each included product has its own README with setup steps.",
    "Use the products together - the swipe files feed the spreadsheets, the planners keep the business on track.",
  ],
  "planner-pack": [
    "Download the zip and open the PDF on any device.",
    "Print at 100% / Actual Size for correct sizing - any paper works.",
    "Start with the cover and how-to pages, then use the pages in order or jump to what you need.",
    "Re-print pages anytime - the PDF is yours permanently.",
  ],
  "template-pack": [
    "Download the zip and unzip it - each template is a ready-to-fill Markdown file.",
    "Copy a template into Google Docs, Word or Notion and replace every [BRACKETED] placeholder.",
    "For store pages: paste the final text into Shopify admin (Settings > Policies or Online Store > Pages).",
    "Export or publish - most templates work as-is once placeholders are filled.",
  ],
};

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const steps = usageSteps[p.category] ?? usageSteps["template-pack"]!;

  return (
    <>
      <PageHeader
        title={p.title}
        description={p.description}
        crumbs={[{ label: "Products", href: "/products" }, { label: p.title }]}
      />
      <Container className="py-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdPayload(catalogProductJsonLd(p)) }}
        />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <Badge>{label(p.category)}</Badge>
              {resellCategories.has(p.category) && <Badge className="border-mint/40 bg-mint/10 text-mint">Resell rights</Badge>}
              <Badge>v{p.version}</Badge>
              <Badge className="border-mint/40 bg-mint/10 text-mint">{p.license}</Badge>
            </div>
            <h2 className="mt-8 font-display text-xl font-semibold">What&apos;s in the zip</h2>
            {p.includes && p.includes.length > 0 && (
              <p className="mt-3 rounded-lg border border-accent/30 bg-accent/[0.06] px-4 py-3 text-sm text-muted">
                <span className="font-semibold text-fg">Mega bundle:</span> this zip also contains{" "}
                {p.includes.map((s, i) => {
                  const inc = getProduct(s);
                  return inc ? (
                    <span key={s}>
                      {i > 0 && (i === p.includes!.length - 1 ? " and " : ", ")}
                      <Link href={`/products/${s}`} className="text-accent underline">{inc.title}</Link>
                    </span>
                  ) : null;
                })}
                {" "}- every file from each product, organized in its own folder.
              </p>
            )}
            <ul className="mt-4 space-y-2">
              {p.files.map((f) => (
                <li key={f} className="flex items-center gap-2 rounded-lg border border-line bg-ink-900/60 px-4 py-2.5 font-mono text-sm">
                  <FileCode2 aria-hidden className="size-4 shrink-0 text-accent" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              Original GPLMart code - use it, modify it, ship it in client work. No license keys, no
              subscriptions, no phone-home. Added {p.added}.
            </p>
            <h2 className="mt-10 font-display text-xl font-semibold">How to use it</h2>
            <ol className="mt-4 space-y-3">
              {steps.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent/15 font-display text-xs font-semibold text-accent">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{s}</span>
                </li>
              ))}
            </ol>
          </div>
          <aside className="h-fit rounded-2xl border border-line-strong bg-ink-900 p-6 lg:sticky lg:top-24">
            <LockKeyhole aria-hidden className="size-6 text-accent" />
            <h2 className="mt-3 font-display text-lg font-semibold">Members download</h2>
            <p className="mt-2 text-sm text-muted">
              Included in all-access - one payment unlocks every product, snippet and guide.
            </p>
            {p.category === "ebook" && p.files.includes("book.pdf") ? (
              <ButtonLink href={`/access/products/${p.slug}/download?file=book.pdf`} className="mt-5 w-full">
                <Download aria-hidden className="size-4" /> Download PDF
              </ButtonLink>
            ) : (
              <ButtonLink href={`/access/products/${p.slug}/download`} className="mt-5 w-full">
                <Download aria-hidden className="size-4" /> Download zip
              </ButtonLink>
            )}
            <ButtonLink href="/checkout" variant="secondary" className="mt-2.5 w-full">
              Get all-access - {formatOfferPrice()}
            </ButtonLink>
          </aside>
        </div>
      </Container>
    </>
  );
}
