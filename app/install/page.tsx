import { ArrowRight, BookOpen, Download, FileCode2, Grid2x2, Package, PanelTop, ShieldAlert, Store } from "lucide-react";
import { InfoPage, infoMetadata } from "@/components/ui/info-page";
import { ButtonLink } from "@/components/ui/button";
import { ThemeChecker } from "@/components/install/theme-checker";

export const metadata = infoMetadata(
  "How to Install Shopify Liquid Snippets - Step-by-Step Guide",
  "Step-by-step install guides for Shopify Liquid snippets and sections, plus how to deploy the digital products - no developer needed.",
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
    title: "Create the snippet or section file",
    text: "Actions > Edit code > open the snippets (or sections) folder > 'Add a new snippet' > name it exactly like the file in the library > paste the complete code and save.",
  },
  {
    icon: Store,
    title: "Render it in your template",
    text: "For snippets: add {% render 'snippet-name' %} where you want it, or use the theme editor's Custom Liquid block. For sections: they appear directly in the theme editor's section picker (OS 2.0 themes).",
  },
  {
    icon: Download,
    title: "Nothing else to install",
    text: "Every GPLMart file is self-contained - the markup, CSS and JavaScript ship inside the single .liquid file via {% stylesheet %} and {% javascript %} tags. No separate assets to upload, no stylesheet to edit.",
  },
  {
    icon: BookOpen,
    title: "Preview on mobile + desktop",
    text: "Open the theme preview on your phone and desktop before publishing. Check the install notes shipped with each snippet - they call out the specific thing to verify.",
  },
];

const productSteps = [
  {
    icon: Download,
    title: "Download the zip",
    text: "Members area > Digital products > pick an item > Download zip. The archive contains the complete product - every file it needs.",
  },
  {
    icon: FileCode2,
    title: "HTML templates",
    text: "Unzip and open index.html in a browser to preview. Upload the folder to any static host (Netlify Drop, Vercel, GitHub Pages, your own server) - no build step, no dependencies beyond optional Google Fonts.",
  },
  {
    icon: FileCode2,
    title: "PHP scripts",
    text: "Unzip and upload the .php file to any PHP 8.1+ host (shared hosting, VPS, cPanel). Most scripts run with zero configuration - the README inside explains each one.",
  },
  {
    icon: BookOpen,
    title: "Ebooks & guides",
    text: "Ebooks download as Markdown - open in any Markdown viewer or convert to PDF. Guides are readable right on the site, no download needed.",
  },
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

      <h2 className="mt-12">Digital products, ebooks &amp; guides</h2>
      <div className="not-prose mt-5 grid gap-4 sm:grid-cols-2">
        {productSteps.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl border border-line bg-ink-900/60 p-5">
            <Icon aria-hidden className="size-5 text-mint" />
            <h3 className="mt-3 font-display text-sm font-semibold">{title}</h3>
            <p className="mt-1.5 text-xs text-muted">{text}</p>
          </div>
        ))}
      </div>

      <div className="not-prose mt-10 flex items-start gap-3 rounded-xl border border-line bg-ink-900/60 p-4 text-sm text-muted">
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
