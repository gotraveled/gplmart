/**
 * Theme compatibility catalog. "os2" themes support Online Store 2.0 (JSON
 * templates + sections everywhere); "vintage" themes predate it and need the
 * direct-code path. File paths are the ones in the theme code editor.
 */
export interface ThemeEntry {
  name: string;
  aliases: string[];
  os2: boolean;
  /** File that renders the product page's main section. */
  productSection: string;
  /** Product template file (OS2 JSON vs vintage Liquid). */
  productTemplate: string;
  /** Section folder the editor adds new sections to. Always "sections/". */
  note?: string;
}

const OS2_FREE_NOTE = "Shopify free theme - standard Dawn-style structure. Sections can be added on any template from the theme editor.";
const OS2_PAID_NOTE = "Online Store 2.0 theme - sections are addable on any template from the editor.";

export const themes: ThemeEntry[] = [
  // Shopify free OS 2.0 themes (Dawn family - identical structure)
  { name: "Dawn", aliases: ["dawn"], os2: true, productSection: "sections/main-product.liquid", productTemplate: "templates/product.json", note: OS2_FREE_NOTE },
  { name: "Refresh", aliases: ["refresh"], os2: true, productSection: "sections/main-product.liquid", productTemplate: "templates/product.json", note: OS2_FREE_NOTE },
  { name: "Craft", aliases: ["craft"], os2: true, productSection: "sections/main-product.liquid", productTemplate: "templates/product.json", note: OS2_FREE_NOTE },
  { name: "Sense", aliases: ["sense"], os2: true, productSection: "sections/main-product.liquid", productTemplate: "templates/product.json", note: OS2_FREE_NOTE },
  { name: "Studio", aliases: ["studio"], os2: true, productSection: "sections/main-product.liquid", productTemplate: "templates/product.json", note: OS2_FREE_NOTE },
  { name: "Taste", aliases: ["taste"], os2: true, productSection: "sections/main-product.liquid", productTemplate: "templates/product.json", note: OS2_FREE_NOTE },
  { name: "Colorbook", aliases: ["colorbook"], os2: true, productSection: "sections/main-product.liquid", productTemplate: "templates/product.json", note: OS2_FREE_NOTE },
  { name: "Origin", aliases: ["origin"], os2: true, productSection: "sections/main-product.liquid", productTemplate: "templates/product.json", note: OS2_FREE_NOTE },
  { name: "Publisher", aliases: ["publisher"], os2: true, productSection: "sections/main-product.liquid", productTemplate: "templates/product.json", note: OS2_FREE_NOTE },
  { name: "Spotlight", aliases: ["spotlight"], os2: true, productSection: "sections/main-product.liquid", productTemplate: "templates/product.json", note: OS2_FREE_NOTE },
  { name: "Crave", aliases: ["crave"], os2: true, productSection: "sections/main-product.liquid", productTemplate: "templates/product.json", note: OS2_FREE_NOTE },
  { name: "Ride", aliases: ["ride"], os2: true, productSection: "sections/main-product.liquid", productTemplate: "templates/product.json", note: OS2_FREE_NOTE },

  // Popular paid OS 2.0 themes
  { name: "Impulse", aliases: ["impulse"], os2: true, productSection: "sections/main-product.liquid", productTemplate: "templates/product.json", note: OS2_PAID_NOTE },
  { name: "Prestige", aliases: ["prestige"], os2: true, productSection: "sections/main-product.liquid", productTemplate: "templates/product.json", note: `${OS2_PAID_NOTE} Add the Custom Liquid block above the add-to-cart area - the sticky buy bar in Prestige can cover it near the bottom.` },
  { name: "Motion", aliases: ["motion"], os2: true, productSection: "sections/main-product.liquid", productTemplate: "templates/product.json", note: OS2_PAID_NOTE },
  { name: "Turbo", aliases: ["turbo"], os2: true, productSection: "sections/main-product.liquid", productTemplate: "templates/product.json", note: `${OS2_PAID_NOTE} Some Turbo layouts render the buy area in a sidebar - place blocks inside the Product information section, not the template bottom.` },
  { name: "Broadcast", aliases: ["broadcast"], os2: true, productSection: "sections/main-product.liquid", productTemplate: "templates/product.json", note: OS2_PAID_NOTE },
  { name: "Pipeline", aliases: ["pipeline"], os2: true, productSection: "sections/main-product.liquid", productTemplate: "templates/product.json", note: OS2_PAID_NOTE },
  { name: "Empire", aliases: ["empire"], os2: true, productSection: "sections/main-product.liquid", productTemplate: "templates/product.json", note: OS2_PAID_NOTE },
  { name: "Symmetry", aliases: ["symmetry"], os2: true, productSection: "sections/main-product.liquid", productTemplate: "templates/product.json", note: OS2_PAID_NOTE },
  { name: "Icon", aliases: ["icon"], os2: true, productSection: "sections/main-product.liquid", productTemplate: "templates/product.json", note: OS2_PAID_NOTE },
  { name: "Envy", aliases: ["envy"], os2: true, productSection: "sections/main-product.liquid", productTemplate: "templates/product.json", note: OS2_PAID_NOTE },

  // Vintage (non-OS2) - the direct-code path
  { name: "Debut", aliases: ["debut"], os2: false, productSection: "sections/product-template.liquid", productTemplate: "templates/product.liquid", note: "Vintage theme - no sections on product templates. Render the snippet inside sections/product-template.liquid after the product form, or paste the markup directly." },
  { name: "Brooklyn", aliases: ["brooklyn"], os2: false, productSection: "sections/product-template.liquid", productTemplate: "templates/product.liquid", note: "Vintage theme - same approach as Debut." },
  { name: "Narrative", aliases: ["narrative"], os2: false, productSection: "sections/product-template.liquid", productTemplate: "templates/product.liquid", note: "Vintage theme - same approach as Debut." },
  { name: "Supply", aliases: ["supply"], os2: false, productSection: "sections/product-template.liquid", productTemplate: "templates/product.liquid", note: "Vintage theme - same approach as Debut." },
  { name: "Minimal", aliases: ["minimal"], os2: false, productSection: "sections/product-template.liquid", productTemplate: "templates/product.liquid", note: "Vintage theme - same approach as Debut." },
  { name: "Pop", aliases: ["pop"], os2: false, productSection: "sections/product-template.liquid", productTemplate: "templates/product.liquid", note: "Vintage theme - same approach as Debut." },
  { name: "Simple", aliases: ["simple"], os2: false, productSection: "sections/product-template.liquid", productTemplate: "templates/product.liquid", note: "Vintage theme - same approach as Debut." },
  { name: "Venture", aliases: ["venture"], os2: false, productSection: "sections/product-template.liquid", productTemplate: "templates/product.liquid", note: "Vintage theme - same approach as Debut." },
  { name: "Boundless", aliases: ["boundless"], os2: false, productSection: "sections/product-template.liquid", productTemplate: "templates/product.liquid", note: "Vintage theme - same approach as Debut." },
];

export interface ThemeResult {
  status: "os2" | "vintage" | "unknown";
  theme?: ThemeEntry;
}

/** Match a typed theme name or a theme-store URL against the catalog. */
export function checkTheme(raw: string): ThemeResult {
  const input = raw.trim().toLowerCase();
  if (!input) return { status: "unknown" };

  // Pull the slug out of URLs like themes.shopify.com/themes/dawn
  const slugMatch = input.match(/themes?\/([\w-]+)/);
  const slug = slugMatch?.[1] ?? "";
  const candidate = (slug || input)
    .replace(/^https?:\/\//, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\b(theme|shopify|com|www|themes)\b/g, "")
    .trim();

  if (!candidate) return { status: "unknown" };

  const theme = themes.find(
    (t) => t.name.toLowerCase() === candidate || t.aliases.some((a) => candidate === a || candidate.includes(a)),
  );
  if (!theme) return { status: "unknown" };
  return { status: theme.os2 ? "os2" : "vintage", theme };
}

/** Steps rendered in the checker for an OS2 theme. */
export function os2Steps(t: ThemeEntry): string[] {
  return [
    `Duplicate the theme first: Online Store > Themes > ${t.name} > Actions > Duplicate.`,
    `Create the file in the code editor: Themes > ${t.name} > Actions > Edit code > ${t.os2 ? "sections" : "snippets"} folder > 'Add a new file' > name it gpl-your-snippet.liquid > paste the code > Save.`,
    `Open the theme editor (Customise) and go to the template where you want it - e.g. Products > Default product for the product page.`,
    `Click 'Add section' (or add a Custom Liquid block inside ${t.productSection}) - your new section appears in the list.`,
    `Drag it to position - above the buy buttons for urgency, below the product form for trust badges, or at the template bottom for full-width blocks.`,
    `Save, preview on mobile and desktop, then publish the duplicated theme.`,
  ];
}

/** Steps for a vintage (non-OS2) theme. */
export function vintageSteps(t: ThemeEntry): string[] {
  return [
    `Duplicate the theme first: Online Store > Themes > ${t.name} > Actions > Duplicate.`,
    `Open Themes > ${t.name} > Actions > Edit code > snippets folder > 'Add a new snippet' > name it gpl-your-snippet.liquid > paste the code.`,
    `Open ${t.productSection} - this is where the product page renders in ${t.name} (no theme-editor sections on vintage themes).`,
    `Find where the add-to-cart form ends (search for 'product-form' or the buy button block) and add {% render 'gpl-your-snippet' %} after it.`,
    `Paste the snippet's CSS into assets/theme.scss.liquid (or theme.css) at the bottom.`,
    `Save, preview on mobile and desktop, then publish.`,
  ];
}
