import { ArrowRight, BookOpen, Download, FileCode2, Grid2x2, Package, PanelTop, ShieldAlert, Store, Upload } from "lucide-react";
import { InfoPage, infoMetadata } from "@/components/ui/info-page";
import { ButtonLink } from "@/components/ui/button";
import { ThemeChecker } from "@/components/install/theme-checker";

export const metadata = infoMetadata(
  "How to install - free instructions",
  "Free step-by-step install guides for Shopify snippets, sections, WordPress plugins, themes and Drive bundle downloads.",
  "/install",
);

const shopifySteps = [
  {
    icon: ShieldAlert,
    title: "Duplicate your theme first",
    text: "Online Store > Themes > your live theme > Actions > Duplicate. Work on the copy - you can always roll back. This is the single most important habit.",
  },
  {
    icon: FileCode2,
    title: "Create the snippet or section",
    text: "Actions > Edit code > open the snippets (or sections) folder > 'Add a new snippet' > name it exactly like the file in the library > paste the full code and save.",
  },
  {
    icon: Store,
    title: "Render it in your template",
    text: "For snippets: add {% render 'snippet-name' %} where you want it, or use the theme editor's Custom Liquid block. For sections: they appear directly in the theme editor's section picker.",
  },
  {
    icon: Download,
    title: "Add the CSS",
    text: "Paste the stylesheet into your theme's main CSS file (assets/base.css or theme.css) at the bottom. GPLMart snippets use gpl- prefixes so they can't fight your theme.",
  },
  {
    icon: BookOpen,
    title: "Preview on mobile + desktop",
    text: "Open the theme preview on your phone and desktop before publishing. Check the install notes shipped with each snippet - they call out the specific thing to verify.",
  },
];

const wpSteps = [
  {
    icon: Upload,
    title: "Upload the plugin zip",
    text: "WordPress admin > Plugins > Add New > Upload Plugin > choose the .zip from the bundle > Install Now > Activate.",
  },
  {
    icon: Upload,
    title: "Upload a theme",
    text: "Appearance > Themes > Add New > Upload Theme > choose the theme .zip > Install > Activate (or use Appearance > Customize to preview first).",
  },
  {
    icon: BookOpen,
    title: "Import templates",
    text: "For starter-template packs, most ship as theme customiser presets or block-pattern files - the included readme in the bundle explains the import for that specific pack.",
  },
  {
    icon: ShieldAlert,
    title: "No keys, no problem",
    text: "GPL items work without vendor licence keys for their core features. Cloud/phone-home features (premium template libraries, license-gated APIs) may need a key from the vendor - the bundle listing says which.",
  },
];

const driveSteps = [
  "Open the members page and click the Google Drive link - it opens in a new tab.",
  "Browse the folder structure by category - plugins, themes, templates, snippets.",
  "To download a file or folder, select it, click the three-dot menu or right-click, choose Download.",
  "Large folders are zipped by Google and may download in parts - allow multiple downloads if your browser asks.",
  "If Drive shows a quota message, wait and retry, or use 'Add shortcut to Drive' and download from your own account.",
];

export default function InstallPage() {
  return (
    <InfoPage
      title="Free install guide"
      description="Every resource installs the same way - no app, no developer needed. Check your theme below, then follow the steps."
    >
      {/* Theme-specific checker */}
      <div className="not-prose mb-10">
        <ThemeChecker />
      </div>

      <h2>Where to place a snippet - choose by goal</h2>
      <p className="mt-2 text-sm text-muted">
        The same component works in different spots; pick by what it needs to do.
      </p>
      <div className="not-prose mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { icon: Store, title: "Product page", text: "Buy bars, countdowns, trust, delivery ETA, cross-sells - open the Product template, add to the Product information section above or below the buy buttons." },
          { icon: Package, title: "Cart", text: "Free-shipping bars, upsells, cart notes - add to the Cart template. Cart snippets work best directly under the items list." },
          { icon: PanelTop, title: "Header & footer", text: "Announcement bars, nav links, cookie consent - header snippets go in sections/header-group.json or the layout file; footer ones in the footer section." },
          { icon: Grid2x2, title: "Collection pages", text: "Promo banners, sort helpers, badge strips - add to the Collection template, usually above the product grid." },
          { icon: FileCode2, title: "Everywhere (global)", text: "Scroll progress, back-to-top, site-wide notices - these go in layout/theme.liquid just before </body> so they render on every page." },
          { icon: BookOpen, title: "If your theme has no section", text: "Any Liquid block can be pasted directly into the template file that renders the area - the 'vintage' path in the checker explains it for older themes." },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl border border-line bg-ink-900/60 p-5">
            <Icon aria-hidden className="size-5 text-mint" />
            <h3 className="mt-3 font-display text-sm font-semibold">{title}</h3>
            <p className="mt-1.5 text-xs text-muted">{text}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12">Shopify Liquid snippets &amp; sections - the general path</h2>
      <div className="not-prose mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shopifySteps.map(({ icon: Icon, title, text }, i) => (
          <div key={title} className="relative rounded-2xl border border-line bg-ink-900/60 p-5">
            <span aria-hidden className="absolute right-4 top-4 font-display text-2xl font-semibold text-white/10">
              {i + 1}
            </span>
            <Icon aria-hidden className="size-5 text-accent" />
            <h3 className="mt-3 font-display text-sm font-semibold">{title}</h3>
            <p className="mt-1.5 text-xs text-muted">{text}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12">WordPress plugins &amp; themes</h2>
      <div className="not-prose mt-5 grid gap-4 sm:grid-cols-2">
        {wpSteps.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl border border-line bg-ink-900/60 p-5">
            <Icon aria-hidden className="size-5 text-mint" />
            <h3 className="mt-3 font-display text-sm font-semibold">{title}</h3>
            <p className="mt-1.5 text-xs text-muted">{text}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12">Downloading the Drive bundle</h2>
      <ol className="not-prose mt-5 space-y-3">
        {driveSteps.map((s, i) => (
          <li key={s} className="flex gap-3 rounded-xl border border-line bg-ink-900/60 p-4 text-sm text-muted">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent/20 text-xs font-semibold text-fg">
              {i + 1}
            </span>
            {s}
          </li>
        ))}
      </ol>

      <div className="not-prose mt-10 flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-100">
        <Package aria-hidden className="mt-0.5 size-5 shrink-0" />
        <p>
          Stuck mid-install? The library item&apos;s install notes cover its specific quirks, and members can reach
          support on WhatsApp from the resource hub. For anything else, the FAQ covers the common cases.
        </p>
      </div>

      <div className="not-prose mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/playground" variant="secondary">
          Try the free playground <ArrowRight aria-hidden className="size-4" />
        </ButtonLink>
        <ButtonLink href="/guides">
          Read the tutorials <ArrowRight aria-hidden className="size-4" />
        </ButtonLink>
      </div>
    </InfoPage>
  );
}
