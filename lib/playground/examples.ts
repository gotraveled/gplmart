import type { ExampleFiles, PlaygroundExample, Values } from "./types";

/**
 * Demonstration snippets for the free playground: teaching examples, NOT the
 * paid library, and not stored in the database. Some are written for this
 * playground; others are adapted (and de-branded) from real storefront builds.
 */

export const str = (v: Values, id: string, max = 80): string => String(v[id] ?? "").slice(0, max);
export const on = (v: Values, id: string): boolean => v[id] === true;
export const hex = (v: Values, id: string): string => (/^#[0-9a-f]{6}$/i.test(String(v[id])) ? String(v[id]) : "#000000");
const js = (s: string) => JSON.stringify(s);

const sectionSteps = [
  "Back up your theme (Online Store > Themes > Actions > Duplicate) before changing any code.",
  "Open Online Store > Themes > Edit code and create a new file under Sections using the file name shown above.",
  "Paste the complete file - markup, styles and JavaScript are already inside the single file, nothing else to install.",
  "Open the theme editor, add the section to a template, and replace the example values using the section settings.",
  "Preview the storefront and test it on a phone-sized screen before publishing.",
];
const snippetSteps = (file: string) => [
  "Back up your theme (Online Store > Themes > Actions > Duplicate) before changing any code.",
  `Easiest path: paste the 'As section' file into the sections folder and add it from the theme editor - no code needed. For inline placement, create snippets/${file} instead.`,
  "Paste the complete file - markup, styles and JavaScript are already inside the single file, nothing else to install.",
  "Snippet path only: call it from the template or section where it should appear using the render tag shown in the Usage tab.",
  "Preview the product, collection or cart page and test on mobile before publishing.",
];

/** Free samples: fully open in the playground. Everything else previews freely but the code is for members. */
export const freeExampleIds: ReadonlySet<string> = new Set([
  "countdown-timer",
  "star-rating",
  "free-shipping-bar",
  "trust-grid",
  "quantity-breaks",
  "announcement-bar",
  "faq-accordion",
  "promo-banner",
  "testimonial-slider",
  "logo-marquee",
]);

export const examples: readonly PlaygroundExample[] = [
  {
    id: "announcement-bar",
    name: "Announcement bar",
    description: "A dismissible top-of-page message with configurable text, link and colours.",
    category: "Headers & navigation",
    kind: "section",
    controls: [
      { id: "text", label: "Message", type: "text", maxLength: 80 },
      { id: "bg", label: "Background", type: "color" },
      { id: "fg", label: "Text colour", type: "color" },
      { id: "dismissible", label: "Dismissible", type: "toggle" },
    ],
    defaults: { text: "Free delivery on orders over $75", bg: "#0b1220", fg: "#c8f542", dismissible: true },
    install: sectionSteps,
    files: (v) => ({
      liquid: `{%- if section.settings.text != blank -%}
  <div class="gpl-announcement" role="region" aria-label="Announcement"
       style="--gpl-bg: {{ section.settings.bg }}; --gpl-fg: {{ section.settings.fg }};">
    {%- if section.settings.link != blank -%}
      <a href="{{ section.settings.link }}">{{ section.settings.text | escape }}</a>
    {%- else -%}
      <p>{{ section.settings.text | escape }}</p>
    {%- endif -%}
${on(v, "dismissible") ? `    <button type="button" class="gpl-announcement__close" aria-label="Dismiss announcement">&times;</button>\n` : ""}  </div>
{%- endif -%}

{% schema %}
{
  "name": "Announcement bar",
  "settings": [
    { "type": "text", "id": "text", "label": "Message", "default": ${js(str(v, "text"))} },
    { "type": "url", "id": "link", "label": "Link (optional)" },
    { "type": "color", "id": "bg", "label": "Background", "default": ${js(hex(v, "bg"))} },
    { "type": "color", "id": "fg", "label": "Text colour", "default": ${js(hex(v, "fg"))} }
  ],
  "presets": [{ "name": "Announcement bar" }]
}
{% endschema %}`,
      css: `.gpl-announcement {
  position: relative;
  background: var(--gpl-bg);
  color: var(--gpl-fg);
  padding: 0.6rem 2.5rem;
  text-align: center;
  font-size: 0.875rem;
}
.gpl-announcement a,
.gpl-announcement p { color: inherit; margin: 0; }
.gpl-announcement a { text-decoration: underline; }
.gpl-announcement__close {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: 0;
  color: inherit;
  font-size: 1.25rem;
  cursor: pointer;
}`,
      js: on(v, "dismissible")
        ? `document.querySelectorAll('.gpl-announcement').forEach((bar) => {
  if (sessionStorage.getItem('gpl-announcement') === 'closed') {
    bar.hidden = true;
    return;
  }
  const close = bar.querySelector('.gpl-announcement__close');
  if (close) {
    close.addEventListener('click', () => {
      bar.hidden = true;
      sessionStorage.setItem('gpl-announcement', 'closed');
    });
  }
});`
        : undefined,
    }),
  },
  {
    id: "product-benefits",
    name: "Product benefit list",
    description: "A short list of product benefits rendered from a simple text value.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "items", label: "Benefits (separate with |)", type: "text", maxLength: 120 },
      { id: "style", label: "Marker", type: "select", options: [{ value: "check", label: "Check mark" }, { value: "dot", label: "Dot" }] },
      { id: "accent", label: "Marker colour", type: "color" },
    ],
    defaults: { items: "Free returns|Secure checkout|Ships in 2 business days", style: "check", accent: "#15803d" },
    install: snippetSteps("product-benefits.liquid"),
    files: (v) => ({
      liquid: `{%- comment -%}
  Renders a short benefit list.
  Accepts: benefits (string, items separated by "|"), accent (colour, optional)
{%- endcomment -%}
{%- assign items = benefits | split: '|' -%}
{%- if items.size > 0 -%}
  <ul class="gpl-benefits gpl-benefits--${str(v, "style")}" style="--gpl-accent: {{ accent | default: '${hex(v, "accent")}' }};">
    {%- for item in items -%}
      <li>{{ item | strip | escape }}</li>
    {%- endfor -%}
  </ul>
{%- endif -%}`,
      css: `.gpl-benefits {
  list-style: none;
  margin: 1rem 0;
  padding: 0;
  display: grid;
  gap: 0.5rem;
}
.gpl-benefits li {
  display: flex;
  gap: 0.6rem;
  align-items: baseline;
}
.gpl-benefits li::before {
  content: "${str(v, "style") === "dot" ? "\\2022" : "\\2713"}";
  color: var(--gpl-accent);
  font-weight: 700;
}`,
      usage: `{% render 'product-benefits',
  benefits: ${js(str(v, "items", 120))},
  accent: '${hex(v, "accent")}'
%}`,
    }),
  },
  {
    id: "shipping-panel",
    name: "Shipping & delivery panel",
    description: "A compact panel with processing time, free-shipping threshold and returns note.",
    category: "Trust & social proof",
    kind: "snippet",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 40 },
      { id: "days", label: "Dispatch time", type: "text", maxLength: 24 },
      { id: "threshold", label: "Free shipping from (whole units)", type: "text", maxLength: 6 },
      { id: "returns", label: "Show returns note", type: "toggle" },
    ],
    defaults: { heading: "Delivery information", days: "1-2 business days", threshold: "75", returns: true },
    install: snippetSteps("shipping-panel.liquid"),
    files: (v) => {
      const threshold = /^\d{1,6}$/.test(str(v, "threshold")) ? str(v, "threshold") : "75";
      return {
        liquid: `{%- assign threshold_cents = ${threshold} | times: 100 -%}
<section class="gpl-ship" aria-labelledby="gpl-ship-title">
  <h3 id="gpl-ship-title">${str(v, "heading")}</h3>
  <dl>
    <div><dt>Dispatch</dt><dd>${str(v, "days")}</dd></div>
    <div>
      <dt>Free shipping</dt>
      <dd>
        {%- if cart.total_price >= threshold_cents -%}
          Unlocked for this order
        {%- else -%}
          On orders over {{ threshold_cents | money_without_trailing_zeros }}
        {%- endif -%}
      </dd>
    </div>
${on(v, "returns") ? `    <div><dt>Returns</dt><dd>See our <a href="{{ routes.root_url }}policies/refund-policy">refund policy</a></dd></div>\n` : ""}  </dl>
</section>`,
        css: `.gpl-ship {
  border: 1px solid rgb(var(--color-foreground, 213 220 203) / 0.35);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  font-size: 0.9rem;
}
.gpl-ship h3 { margin: 0 0 0.75rem; font-size: 1rem; }
.gpl-ship dl { margin: 0; display: grid; gap: 0.5rem; }
.gpl-ship dl > div { display: flex; justify-content: space-between; gap: 1rem; }
.gpl-ship dt { font-weight: 600; }
.gpl-ship dd { margin: 0; text-align: right; }`,
        usage: `{% render 'shipping-panel' %}`,
      };
    },
  },
  {
    id: "trust-badges",
    name: "Trust & policy highlights",
    description: "Icon-led highlights for payment security, returns and support, based on your real policies.",
    category: "Trust & social proof",
    kind: "snippet",
    controls: [
      { id: "payment", label: "Secure payment", type: "toggle" },
      { id: "returns", label: "Returns", type: "toggle" },
      { id: "support", label: "Support", type: "toggle" },
      { id: "layout", label: "Layout", type: "select", options: [{ value: "row", label: "Row" }, { value: "grid", label: "Grid" }] },
    ],
    defaults: { payment: true, returns: true, support: true, layout: "row" },
    install: snippetSteps("trust-badges.liquid"),
    files: (v) => {
      const item = (cls: string, title: string, text: string) =>
        `    <li class="gpl-trust__item">\n      <span class="gpl-trust__icon gpl-trust__icon--${cls}" aria-hidden="true"></span>\n      <strong>${title}</strong>\n      <span>${text}</span>\n    </li>\n`;
      return {
        liquid: `{%- comment -%} Only publish claims that match your real store policies. {%- endcomment -%}
<ul class="gpl-trust gpl-trust--${str(v, "layout")}">
${on(v, "payment") ? item("lock", "Secure payment", "Pay with the methods enabled in your Shopify checkout.") : ""}${on(v, "returns") ? item("return", "Returns", "Describe your actual returns window here.") : ""}${on(v, "support") ? item("chat", "Support", "Tell customers how to reach you.") : ""}</ul>`,
        css: `.gpl-trust {
  list-style: none;
  margin: 1.5rem 0;
  padding: 0;
  display: ${str(v, "layout") === "grid" ? "grid" : "flex"};
  ${str(v, "layout") === "grid" ? "grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));" : "flex-wrap: wrap;"}
  gap: 1rem;
}
.gpl-trust__item {
  display: grid;
  gap: 0.25rem;
  flex: 1 1 14rem;
  padding: 1rem;
  border: 1px solid rgb(var(--color-foreground, 213 220 203) / 0.35);
  border-radius: 12px;
  font-size: 0.875rem;
}
.gpl-trust__icon {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 6px;
  background: rgb(var(--color-background, 11 18 32));
}`,
        usage: `{% render 'trust-badges' %}`,
      };
    },
  },
  {
    id: "collection-grid",
    name: "Collection card grid",
    description: "A responsive grid of collection cards driven by section blocks.",
    category: "Content",
    kind: "section",
    controls: [
      { id: "columns", label: "Columns (desktop)", type: "select", options: [{ value: "2", label: "2" }, { value: "3", label: "3" }, { value: "4", label: "4" }] },
      { id: "radius", label: "Corner style", type: "select", options: [{ value: "0", label: "Square" }, { value: "12", label: "Rounded" }, { value: "24", label: "Soft" }] },
      { id: "labels", label: "Show titles", type: "toggle" },
    ],
    defaults: { columns: "3", radius: "12", labels: true },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-collections" style="--gpl-cols: {{ section.settings.columns }}; --gpl-radius: {{ section.settings.radius }}px;">
  {%- for block in section.blocks -%}
    {%- assign collection = block.settings.collection -%}
    {%- if collection != blank -%}
      <a class="gpl-collections__card" href="{{ collection.url }}" {{ block.shopify_attributes }}>
        {%- if collection.image -%}
          {{ collection.image | image_url: width: 600 | image_tag: loading: 'lazy', alt: collection.title }}
        {%- else -%}
          {{ 'collection-1' | placeholder_svg_tag: 'gpl-collections__placeholder' }}
        {%- endif -%}
${on(v, "labels") ? `        <span class="gpl-collections__title">{{ collection.title | escape }}</span>\n` : ""}      </a>
    {%- endif -%}
  {%- endfor -%}
</div>

{% schema %}
{
  "name": "Collection grid",
  "settings": [
    { "type": "range", "id": "columns", "min": 2, "max": 4, "step": 1, "label": "Columns", "default": ${Number(v.columns) || 3} },
    { "type": "range", "id": "radius", "min": 0, "max": 24, "step": 4, "unit": "px", "label": "Corner radius", "default": ${Number(v.radius) || 0} }
  ],
  "blocks": [
    {
      "type": "collection",
      "name": "Collection",
      "settings": [{ "type": "collection", "id": "collection", "label": "Collection" }]
    }
  ],
  "max_blocks": 12,
  "presets": [{ "name": "Collection grid" }]
}
{% endschema %}`,
      css: `.gpl-collections {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
@media (min-width: 750px) {
  .gpl-collections { grid-template-columns: repeat(var(--gpl-cols), 1fr); }
}
.gpl-collections__card {
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: var(--gpl-radius);
  aspect-ratio: 4 / 5;
  background: rgb(var(--color-foreground, 148 163 184) / 0.12);
}
.gpl-collections__card img,
.gpl-collections__placeholder { width: 100%; height: 100%; object-fit: cover; }
.gpl-collections__title {
  position: absolute;
  inset: auto 0 0 0;
  padding: 0.75rem 1rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.65));
  color: #fff;
  font-weight: 600;
}`,
    }),
  },
  {
    id: "promo-banner",
    name: "Promotional banner",
    description: "A call-to-action banner with heading, text, button and alignment options.",
    category: "Marketing",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 50 },
      { id: "text", label: "Text", type: "text", maxLength: 90 },
      { id: "button", label: "Button label", type: "text", maxLength: 24 },
      { id: "bg", label: "Background", type: "color" },
      { id: "align", label: "Alignment", type: "select", options: [{ value: "left", label: "Left" }, { value: "center", label: "Centre" }] },
    ],
    defaults: { heading: "New season arrivals", text: "Discover what is new in the store this month.", button: "Shop the collection", bg: "#14532d", align: "left" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `{%- if section.settings.heading != blank -%}
  <section class="gpl-promo gpl-promo--{{ section.settings.align }}" style="--gpl-promo-bg: {{ section.settings.bg }};">
    <h2>{{ section.settings.heading | escape }}</h2>
    {%- if section.settings.text != blank -%}<p>{{ section.settings.text | escape }}</p>{%- endif -%}
    {%- if section.settings.button_label != blank and section.settings.button_link != blank -%}
      <a class="gpl-promo__button" href="{{ section.settings.button_link }}">{{ section.settings.button_label | escape }}</a>
    {%- endif -%}
  </section>
{%- endif -%}

{% schema %}
{
  "name": "Promotional banner",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading", 50))} },
    { "type": "textarea", "id": "text", "label": "Text", "default": ${js(str(v, "text", 90))} },
    { "type": "text", "id": "button_label", "label": "Button label", "default": ${js(str(v, "button", 24))} },
    { "type": "url", "id": "button_link", "label": "Button link" },
    { "type": "color", "id": "bg", "label": "Background", "default": ${js(hex(v, "bg"))} },
    {
      "type": "select",
      "id": "align",
      "label": "Alignment",
      "options": [
        { "value": "left", "label": "Left" },
        { "value": "center", "label": "Centre" }
      ],
      "default": ${js(str(v, "align"))}
    }
  ],
  "presets": [{ "name": "Promotional banner" }]
}
{% endschema %}`,
      css: `.gpl-promo {
  background: var(--gpl-promo-bg);
  color: #fff;
  padding: clamp(2rem, 6vw, 4rem) clamp(1.25rem, 5vw, 3rem);
  border-radius: 16px;
}
.gpl-promo--center { text-align: center; }
.gpl-promo h2 { margin: 0 0 0.5rem; font-size: clamp(1.5rem, 4vw, 2.25rem); }
.gpl-promo p { margin: 0 0 1.25rem; max-width: 36rem; }
.gpl-promo--center p { margin-inline: auto; }
.gpl-promo__button {
  display: inline-block;
  background: #fff;
  color: #111;
  padding: 0.75rem 1.25rem;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
}`,
    }),
  },
  {
    id: "comparison-table",
    name: "Feature comparison table",
    description: "A two-column comparison built from section blocks, with an optional highlighted column.",
    category: "Product page",
    kind: "section",
    controls: [
      { id: "colA", label: "Column A title", type: "text", maxLength: 24 },
      { id: "colB", label: "Column B title", type: "text", maxLength: 24 },
      { id: "highlight", label: "Highlight column A", type: "toggle" },
    ],
    defaults: { colA: "This product", colB: "Standard option", highlight: true },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-compare-wrap">
  <table class="gpl-compare${on(v, "highlight") ? " gpl-compare--highlight" : ""}">
    <caption class="visually-hidden">Feature comparison</caption>
    <thead>
      <tr>
        <th scope="col">Feature</th>
        <th scope="col">{{ section.settings.col_a | escape }}</th>
        <th scope="col">{{ section.settings.col_b | escape }}</th>
      </tr>
    </thead>
    <tbody>
      {%- for block in section.blocks -%}
        <tr {{ block.shopify_attributes }}>
          <th scope="row">{{ block.settings.feature | escape }}</th>
          <td>{% if block.settings.in_a %}Yes{% else %}No{% endif %}</td>
          <td>{% if block.settings.in_b %}Yes{% else %}No{% endif %}</td>
        </tr>
      {%- endfor -%}
    </tbody>
  </table>
</div>

{% schema %}
{
  "name": "Comparison table",
  "settings": [
    { "type": "text", "id": "col_a", "label": "Column A title", "default": ${js(str(v, "colA", 24))} },
    { "type": "text", "id": "col_b", "label": "Column B title", "default": ${js(str(v, "colB", 24))} }
  ],
  "blocks": [
    {
      "type": "row",
      "name": "Feature row",
      "settings": [
        { "type": "text", "id": "feature", "label": "Feature" },
        { "type": "checkbox", "id": "in_a", "label": "Included in column A", "default": true },
        { "type": "checkbox", "id": "in_b", "label": "Included in column B", "default": false }
      ]
    }
  ],
  "presets": [{ "name": "Comparison table" }]
}
{% endschema %}`,
      css: `.gpl-compare-wrap { overflow-x: auto; }
.gpl-compare { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
.gpl-compare th,
.gpl-compare td { padding: 0.75rem 1rem; border-bottom: 1px solid rgb(var(--color-foreground, 213 220 203) / 0.35); text-align: left; }
.gpl-compare thead th { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.04em; }
.gpl-compare--highlight th:nth-child(2),
.gpl-compare--highlight td:nth-child(2) { background: rgb(var(--color-button, 200 245 66) / 0.12); font-weight: 600; }
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}`,
    }),
  },
  {
    id: "faq-accordion",
    name: "FAQ accordion",
    description: "An accessible accordion built with native details elements, no JavaScript required.",
    category: "Content",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 40 },
      { id: "exclusive", label: "Only one open at a time", type: "toggle" },
      { id: "style", label: "Style", type: "select", options: [{ value: "bordered", label: "Bordered" }, { value: "minimal", label: "Minimal" }] },
    ],
    defaults: { heading: "Frequently asked questions", exclusive: true, style: "bordered" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<section class="gpl-faq gpl-faq--${str(v, "style")}">
  {%- if section.settings.heading != blank -%}
    <h2>{{ section.settings.heading | escape }}</h2>
  {%- endif -%}
  {%- for block in section.blocks -%}
    <details${on(v, "exclusive") ? ' name="gpl-faq"' : ""} {{ block.shopify_attributes }}>
      <summary>{{ block.settings.question | escape }}</summary>
      <div class="gpl-faq__answer">{{ block.settings.answer }}</div>
    </details>
  {%- endfor -%}
</section>

{% schema %}
{
  "name": "FAQ accordion",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading", 40))} }
  ],
  "blocks": [
    {
      "type": "item",
      "name": "Question",
      "settings": [
        { "type": "text", "id": "question", "label": "Question" },
        { "type": "richtext", "id": "answer", "label": "Answer" }
      ]
    }
  ],
  "presets": [{ "name": "FAQ accordion" }]
}
{% endschema %}`,
      css: `.gpl-faq h2 { margin: 0 0 1rem; }
.gpl-faq details { padding: 0.9rem 1.1rem; }
.gpl-faq--bordered details { border: 1px solid rgb(var(--color-foreground, 213 220 203) / 0.35); border-radius: 12px; margin-bottom: 0.6rem; }
.gpl-faq--minimal details { border-bottom: 1px solid rgb(var(--color-foreground, 213 220 203) / 0.35); }
.gpl-faq summary { cursor: pointer; font-weight: 600; list-style: none; }
.gpl-faq summary::-webkit-details-marker { display: none; }
.gpl-faq summary::after { content: "+"; float: right; }
.gpl-faq details[open] summary::after { content: "\\2212"; }
.gpl-faq__answer { margin-top: 0.6rem; color: rgb(var(--color-foreground, 63 74 58) / 0.8); }`,
    }),
  },
  {
    id: "responsive-slideshow",
    name: "Responsive slideshow",
    description: "Desktop and mobile images per slide with autoplay and arrow navigation. Adapted from a real storefront build.",
    category: "Content",
    kind: "section",
    controls: [
      { id: "autoplay", label: "Autoplay", type: "toggle" },
      { id: "speed", label: "Seconds per slide", type: "select", options: [{ value: "3", label: "3" }, { value: "5", label: "5" }, { value: "7", label: "7" }] },
      { id: "arrows", label: "Show arrows", type: "toggle" },
    ],
    defaults: { autoplay: true, speed: "5", arrows: true },
    install: sectionSteps,
    files: (v) => ({
      liquid: `{%- comment -%} Each slide can have a different image for desktop and mobile. {%- endcomment -%}
<gpl-slideshow
  class="gpl-slides"
  data-autoplay="{{ section.settings.autoplay }}"
  data-speed="{{ section.settings.autoplay_speed }}"
>
  <div class="gpl-slides__track" data-track>
    {%- for block in section.blocks -%}
      <div class="gpl-slides__slide" {{ block.shopify_attributes }}>
        {%- if block.settings.link != blank -%}<a href="{{ block.settings.link }}">{%- endif -%}
        {%- if block.settings.image_desktop != blank -%}
          <picture>
            {%- if block.settings.image_mobile != blank -%}
              <source media="(max-width: 767px)" srcset="{{ block.settings.image_mobile | image_url: width: 900 }}">
            {%- endif -%}
            <img
              src="{{ block.settings.image_desktop | image_url: width: 2000 }}"
              alt="{{ block.settings.image_desktop.alt | escape }}"
              width="{{ block.settings.image_desktop.width }}"
              height="{{ block.settings.image_desktop.height }}"
              loading="{% if forloop.first %}eager{% else %}lazy{% endif %}"
            >
          </picture>
        {%- else -%}
          {{ 'lifestyle-' | append: forloop.index | placeholder_svg_tag: 'gpl-slides__placeholder' }}
        {%- endif -%}
        {%- if block.settings.link != blank -%}</a>{%- endif -%}
      </div>
    {%- endfor -%}
  </div>
${on(v, "arrows") ? `  <button type="button" class="gpl-slides__arrow gpl-slides__arrow--prev" data-prev aria-label="Previous slide">&#8249;</button>
  <button type="button" class="gpl-slides__arrow gpl-slides__arrow--next" data-next aria-label="Next slide">&#8250;</button>\n` : ""}</gpl-slideshow>

{% schema %}
{
  "name": "Responsive slideshow",
  "settings": [
    { "type": "checkbox", "id": "autoplay", "label": "Autoplay", "default": ${on(v, "autoplay")} },
    { "type": "range", "id": "autoplay_speed", "label": "Seconds per slide", "min": 2, "max": 10, "step": 1, "default": ${Number(v.speed) || 5} }
  ],
  "blocks": [
    {
      "type": "slide",
      "name": "Slide",
      "settings": [
        { "type": "image_picker", "id": "image_desktop", "label": "Desktop image" },
        { "type": "image_picker", "id": "image_mobile", "label": "Mobile image (optional)" },
        { "type": "url", "id": "link", "label": "Link (optional)" }
      ]
    }
  ],
  "max_blocks": 8,
  "presets": [{ "name": "Responsive slideshow", "blocks": [{ "type": "slide" }, { "type": "slide" }] }]
}
{% endschema %}`,
      css: `.gpl-slides { position: relative; display: block; overflow: hidden; }
.gpl-slides__track { display: flex; transition: transform 0.6s ease; }
.gpl-slides__slide { min-width: 100%; }
.gpl-slides__slide img,
.gpl-slides__placeholder { display: block; width: 100%; height: auto; }
.gpl-slides__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2.5rem;
  height: 2.5rem;
  border: 0;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
}
.gpl-slides__arrow--prev { left: 0.75rem; }
.gpl-slides__arrow--next { right: 0.75rem; }`,
      js: `class GplSlideshow extends HTMLElement {
  connectedCallback() {
    this.track = this.querySelector('[data-track]');
    this.slides = this.track.children.length;
    this.index = 0;
    this.querySelector('[data-prev]')?.addEventListener('click', () => this.go(-1));
    this.querySelector('[data-next]')?.addEventListener('click', () => this.go(1));
    if (this.dataset.autoplay === 'true' && this.slides > 1) {
      this.timer = setInterval(() => this.go(1), Number(this.dataset.speed) * 1000 || 5000);
    }
  }
  disconnectedCallback() {
    clearInterval(this.timer);
  }
  go(step) {
    this.index = (this.index + step + this.slides) % this.slides;
    this.track.style.transform = 'translateX(-' + this.index * 100 + '%)';
  }
}
if (!customElements.get('gpl-slideshow')) customElements.define('gpl-slideshow', GplSlideshow);`,
    }),
  },
  {
    id: "delivery-estimator",
    name: "Delivery ETA & trust card",
    description: "A dark premium card with a PIN-code check, a real delivery timeline and a trust row - the kind of block that lifts product-page confidence. Adapted from a real storefront build.",
    category: "Trust & social proof",
    kind: "snippet",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 40 },
      { id: "fast", label: "Fast zone (days)", type: "select", options: [{ value: "2", label: "2" }, { value: "3", label: "3" }] },
      { id: "slow", label: "Default (days)", type: "select", options: [{ value: "5", label: "5" }, { value: "7", label: "7" }] },
      { id: "accent", label: "Accent", type: "color" },
    ],
    defaults: { heading: "Delivery & returns", fast: "2", slow: "5", accent: "#5eead4" },
    install: snippetSteps("delivery-estimator.liquid"),
    files: (v) => ({
      liquid: `{%- comment -%}
  PIN-code delivery ETA card. The day ranges in the JS below are examples -
  adjust them to match your own courier zones before going live.
{%- endcomment -%}
<div
  class="gpl-eta"
  data-gpl-delivery
  data-fast-days="${v.fast ?? 2}"
  data-slow-days="${v.slow ?? 5}"
  style="--gpl-accent: {{ accent | default: 'rgb(var(--color-button, 94 234 212))' }};"
>
  <div class="gpl-eta__card">
    <div class="gpl-eta__trust">
      <span class="gpl-eta__pill"><b>&#10003;</b> Verified seller</span>
      <span class="gpl-eta__pill"><b>&#8377;</b> UPI &amp; cards</span>
      <span class="gpl-eta__pill"><b>&#8634;</b> Easy returns</span>
    </div>

    <p class="gpl-eta__title">${str(v, "heading", 40)}</p>
    <div class="gpl-eta__field" data-field>
      <input
        type="tel"
        inputmode="numeric"
        maxlength="6"
        placeholder="Enter 6-digit PIN code"
        autocomplete="postal-code"
        aria-label="Enter delivery PIN code"
        data-input
      >
      <button type="button" class="gpl-eta__check" data-check>Check</button>
    </div>
    <p class="gpl-eta__error" data-error role="alert" hidden>Please enter a valid 6-digit PIN code.</p>

    <ol class="gpl-eta__timeline" data-result hidden>
      <li class="gpl-eta__step gpl-eta__step--done">
        <span class="gpl-eta__dot"></span>
        <b>Order placed</b>
        <small data-order>Today</small>
      </li>
      <li class="gpl-eta__step">
        <span class="gpl-eta__dot"></span>
        <b>Shipped</b>
        <small data-ship></small>
      </li>
      <li class="gpl-eta__step gpl-eta__step--final">
        <span class="gpl-eta__dot"></span>
        <b>Delivered</b>
        <small data-deliver></small>
      </li>
    </ol>
    <button type="button" class="gpl-eta__change" data-change hidden>Change PIN code</button>
  </div>
</div>`,
      css: `.gpl-eta { width: 100%; max-width: 26rem; margin: 0.75rem 0; }
.gpl-eta__card {
  position: relative;
  padding: 1.1rem 1.15rem;
  border-radius: 14px;
  background: linear-gradient(145deg, rgba(16, 24, 40, 0.95), rgba(8, 12, 27, 0.98));
  border: 1px solid color-mix(in srgb, var(--gpl-accent) 22%, transparent);
  box-shadow: 0 14px 34px -10px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgb(255 255 255 / 0.07);
  color: #fff;
  overflow: hidden;
}
.gpl-eta__card::before {
  content: "";
  position: absolute;
  top: 0; left: 18%; right: 18%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gpl-accent), transparent);
}
.gpl-eta__trust { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.gpl-eta__pill {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.22rem 0.6rem;
  border-radius: 999px;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.25);
  background: rgb(255 255 255 / 0.04);
  color: rgb(var(--color-foreground, 203 213 225) / 0.9);
  font-size: 0.62rem;
  font-weight: 700;
}
.gpl-eta__pill b { color: var(--gpl-accent); font-weight: 800; }
.gpl-eta__title { margin: 0.7rem 0 0.5rem; font-size: 0.85rem; font-weight: 700; color: rgb(var(--color-foreground, 226 232 240)); }
.gpl-eta__field {
  display: flex;
  overflow: hidden;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3);
  border-radius: 10px;
  background: rgba(2, 6, 23, 0.7);
}
.gpl-eta__field:focus-within { border-color: var(--gpl-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--gpl-accent) 12%, transparent); }
.gpl-eta__field input {
  flex: 1;
  min-width: 0;
  height: 42px;
  border: 0;
  padding: 0 12px;
  background: transparent;
  color: #fff;
  font-size: 0.85rem;
  outline: 0;
}
.gpl-eta__field input::placeholder { color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-eta__check {
  flex: 0 0 4.6rem;
  border: 0;
  border-left: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.25);
  background: color-mix(in srgb, var(--gpl-accent) 12%, transparent);
  color: var(--gpl-accent);
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
}
.gpl-eta__check:hover { background: color-mix(in srgb, var(--gpl-accent) 22%, transparent); }
.gpl-eta__error { margin: 0.4rem 0 0; color: #fca5a5; font-size: 0.72rem; }
.gpl-eta__error[hidden], .gpl-eta__timeline[hidden], .gpl-eta__change[hidden] { display: none; }
.gpl-eta__timeline {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.4rem;
  margin: 0.85rem 0 0;
  padding: 0;
  list-style: none;
}
.gpl-eta__step { position: relative; display: grid; gap: 0.15rem; padding-top: 0.7rem; }
.gpl-eta__step::before {
  content: "";
  position: absolute;
  top: 0.2rem;
  left: 0.45rem;
  right: -0.3rem;
  height: 1px;
  background: rgb(var(--color-foreground, 148 163 184) / 0.25);
}
.gpl-eta__step:last-child::before { right: 50%; }
.gpl-eta__dot {
  position: absolute;
  top: 0;
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: #475569;
}
.gpl-eta__step--done .gpl-eta__dot, .gpl-eta__step--final .gpl-eta__dot {
  background: var(--gpl-accent);
  box-shadow: 0 0 8px var(--gpl-accent);
}
.gpl-eta__step b { font-size: 0.68rem; font-weight: 700; color: rgb(var(--color-foreground, 226 232 240)); }
.gpl-eta__step small { font-size: 0.62rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-eta__step--final b, .gpl-eta__step--final small { color: var(--gpl-accent); }
.gpl-eta__change {
  margin-top: 0.6rem;
  border: 0;
  background: none;
  color: var(--gpl-accent);
  font-size: 0.72rem;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
}`,
      js: `document.querySelectorAll('[data-gpl-delivery]').forEach((box) => {
  const input = box.querySelector('[data-input]');
  const field = box.querySelector('[data-field]');
  const error = box.querySelector('[data-error]');
  const result = box.querySelector('[data-result]');
  const change = box.querySelector('[data-change]');
  const shipEl = box.querySelector('[data-ship]');
  const deliverEl = box.querySelector('[data-deliver]');
  const orderEl = box.querySelector('[data-order]');
  const fast = Number(box.dataset.fastDays) || 2;
  const slow = Number(box.dataset.slowDays) || 5;

  /* Example zones: adapt these ranges to your courier's service map. */
  function daysFor(pin) {
    const p = parseInt(pin, 10);
    const fastZones = [
      [110001, 110096], [400001, 400104], [560001, 560110],
      [700001, 700160], [600001, 600130],
    ];
    return fastZones.some(([a, b]) => p >= a && p <= b) ? fast : slow;
  }
  function formatDate(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
  }
  function check() {
    const pin = input.value.replace(/\\D/g, '').slice(0, 6);
    input.value = pin;
    if (pin.length !== 6) {
      error.hidden = false;
      return;
    }
    error.hidden = true;
    const days = daysFor(pin);
    orderEl.textContent = formatDate(0);
    shipEl.textContent = formatDate(Math.min(2, days - 1));
    deliverEl.textContent = formatDate(days);
    field.style.display = 'none';
    result.hidden = false;
    change.hidden = false;
  }
  box.querySelector('[data-check]').addEventListener('click', check);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
  input.addEventListener('input', () => { input.value = input.value.replace(/\\D/g, ''); error.hidden = true; });
  change.addEventListener('click', () => {
    result.hidden = true;
    change.hidden = true;
    field.style.display = 'flex';
    input.value = '';
    input.focus();
  });
});`,
      usage: `{% render 'delivery-estimator' %}`,
    }),
  },
  {
    id: "size-chart-modal",
    name: "Size chart modal",
    description: "A Size Chart link that opens a zoomable product metafield image in an accessible modal. Adapted from a real storefront build.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "label", label: "Trigger label", type: "text", maxLength: 30 },
      { id: "zoom", label: "Click to zoom", type: "toggle" },
    ],
    defaults: { label: "Size Chart", zoom: true },
    install: [
      "Back up your theme (Online Store > Themes > Actions > Duplicate) before changing any code.",
      "In Settings > Custom data > Products, create a metafield custom.size_chart of type File (image) and upload a chart per product.",
      "Create snippets/size-chart-modal.liquid, paste the Liquid code, and add the JS to your theme or a {% javascript %} tag.",
      "Render it from your product template with the usage tag shown in the Usage tab.",
      "Check a product with and without a chart image - the link only appears when the metafield is set.",
    ],
    files: (v) => ({
      liquid: `{%- comment -%}
  Requires product metafield: custom.size_chart (File > Image).
{%- endcomment -%}
{%- assign chart = product.metafields.custom.size_chart.value -%}
{%- if chart != blank -%}
  <div class="gpl-sizechart" data-gpl-sizechart>
    <button type="button" class="gpl-sizechart__trigger" data-open aria-haspopup="dialog">
      ${str(v, "label", 30)} <span aria-hidden="true">&#8599;</span>
    </button>
    <div class="gpl-sizechart__overlay" data-overlay role="dialog" aria-modal="true" aria-label="${str(v, "label", 30)}" hidden>
      <div class="gpl-sizechart__dialog" data-dialog>
        <button type="button" class="gpl-sizechart__close" data-close aria-label="Close">&times;</button>
        {{ chart | image_url: width: 1600 | image_tag: loading: 'lazy', class: 'gpl-sizechart__image', alt: 'Size chart' }}
      </div>
    </div>
  </div>
{%- endif -%}`,
      css: `.gpl-sizechart__trigger {
  display: inline-flex;
  gap: 0.35rem;
  border: 0;
  background: none;
  padding: 0;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}
.gpl-sizechart__overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.65);
}
.gpl-sizechart__overlay[hidden] { display: none; }
.gpl-sizechart__dialog {
  position: relative;
  max-width: min(56rem, 92vw);
  max-height: 90vh;
  overflow: auto;
  border-radius: 12px;
  background: #fff;
  padding: 1rem;
}
.gpl-sizechart__image { display: block; max-width: 100%; height: auto; margin: 0 auto; }
.gpl-sizechart__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  height: 2rem;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.95);
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}`,
      js: `document.querySelectorAll('[data-gpl-sizechart]').forEach((root) => {
  const overlay = root.querySelector('[data-overlay]');
  const open = root.querySelector('[data-open]');
  const close = root.querySelector('[data-close]');
  const image = root.querySelector('.gpl-sizechart__image');
  function show() {
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    close.focus();
  }
  function hide() {
    overlay.hidden = true;
    document.body.style.overflow = '';
    open.focus();
  }
  open.addEventListener('click', show);
  close.addEventListener('click', hide);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) hide(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.hidden) hide();
  });
${on(v, "zoom") ? `  image.addEventListener('click', () => {
    const zoomed = image.classList.toggle('is-zoomed');
    image.style.maxWidth = zoomed ? 'none' : '';
    image.style.width = zoomed ? '160%' : '';
    image.style.cursor = zoomed ? 'zoom-out' : 'zoom-in';
  });
  image.style.cursor = 'zoom-in';` : ""}
});`,
      usage: `{% render 'size-chart-modal', product: product %}`,
    }),
  },
  {
    id: "coupon-cards",
    name: "Coupon cards",
    description: "Ticket-style offer cards with tap-to-copy and a confirmation toast, driven by section blocks. Adapted from a real storefront build.",
    category: "Marketing",
    kind: "section",
    controls: [
      { id: "accent", label: "Accent colour", type: "color" },
      { id: "notch", label: "Ticket notches", type: "toggle" },
    ],
    defaults: { accent: "#c2410c", notch: true },
    install: sectionSteps,
    files: (v) => ({
      liquid: `{%- if section.blocks.size > 0 -%}
  <div class="gpl-coupons" style="--gpl-accent: {{ section.settings.accent }};" role="list">
    {%- for block in section.blocks -%}
      <div class="gpl-coupon${on(v, "notch") ? "" : " gpl-coupon--flat"}" role="listitem" {{ block.shopify_attributes }}>
        <div class="gpl-coupon__info">
          {%- if block.settings.tag != blank -%}
            <span class="gpl-coupon__tag">{{ block.settings.tag | escape }}</span>
          {%- endif -%}
          <h3 class="gpl-coupon__title">{{ block.settings.title | escape }}</h3>
          {%- if block.settings.subtitle != blank -%}
            <p class="gpl-coupon__subtitle">{{ block.settings.subtitle | escape }}</p>
          {%- endif -%}
        </div>
        <div class="gpl-coupon__divider" aria-hidden="true"></div>
        <button type="button" class="gpl-coupon__code" data-code="{{ block.settings.code | escape }}" aria-label="Copy coupon code {{ block.settings.code | escape }}">
          <span class="gpl-coupon__label" data-label>Tap to copy</span>
          <span class="gpl-coupon__value">{{ block.settings.code | escape }}</span>
        </button>
      </div>
    {%- endfor -%}
  </div>
  <p class="gpl-coupon-toast" data-coupon-toast role="status" hidden>Code copied</p>
{%- endif -%}

{% schema %}
{
  "name": "Coupon cards",
  "settings": [
    { "type": "color", "id": "accent", "label": "Accent colour", "default": ${js(hex(v, "accent"))} }
  ],
  "blocks": [
    {
      "type": "coupon",
      "name": "Coupon",
      "settings": [
        { "type": "text", "id": "tag", "label": "Tag", "default": "Welcome" },
        { "type": "text", "id": "title", "label": "Title", "default": "Flat 10% off" },
        { "type": "text", "id": "subtitle", "label": "Subtitle", "default": "For new customers" },
        { "type": "text", "id": "code", "label": "Discount code", "default": "WELCOME10" }
      ]
    }
  ],
  "max_blocks": 6,
  "presets": [{ "name": "Coupon cards", "blocks": [{ "type": "coupon" }, { "type": "coupon" }] }]
}
{% endschema %}`,
      css: `.gpl-coupons {
  display: flex;
  gap: 0.9rem;
  overflow-x: auto;
  padding: 0.5rem 0.25rem 1rem;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}
.gpl-coupons::-webkit-scrollbar { display: none; }
.gpl-coupon {
  flex: 0 0 20rem;
  scroll-snap-align: start;
  display: flex;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.05);
  overflow: hidden;
}
.gpl-coupon__info { flex: 1; min-width: 0; padding: 0.9rem 1rem; }
.gpl-coupon__tag {
  display: inline-block;
  background: #f1f5f9;
  padding: 0.15rem 0.6rem;
  border-radius: 999px;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.gpl-coupon__title { margin: 0.4rem 0 0; font-size: 1rem; font-weight: 800; }
.gpl-coupon__subtitle { margin: 0.2rem 0 0; color: rgb(var(--color-foreground, 100 116 139) / 0.75); font-size: 0.75rem; }
.gpl-coupon__divider { width: 1px; border-left: 1.5px dashed #cbd5e1; position: relative; }
.gpl-coupon:not(.gpl-coupon--flat) .gpl-coupon__divider::before,
.gpl-coupon:not(.gpl-coupon--flat) .gpl-coupon__divider::after {
  content: "";
  position: absolute;
  left: -7px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: var(--gpl-canvas, #fff);
  border: 1px solid #e2e8f0;
}
.gpl-coupon:not(.gpl-coupon--flat) .gpl-coupon__divider::before { top: -7px; }
.gpl-coupon:not(.gpl-coupon--flat) .gpl-coupon__divider::after { bottom: -7px; }
.gpl-coupon__code {
  width: 7.5rem;
  border: 0;
  background: #fafaf9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  cursor: pointer;
}
.gpl-coupon__label { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.05em; color: #94a3b8; text-transform: uppercase; }
.gpl-coupon__value {
  border: 1.5px dashed var(--gpl-accent);
  border-radius: 7px;
  padding: 0.3rem 0.55rem;
  color: var(--gpl-accent);
  font-size: 0.8rem;
  font-weight: 800;
}
.gpl-coupon__code.is-copied .gpl-coupon__value { background: #059669; border-color: #059669; color: #fff; border-style: solid; }
.gpl-coupon-toast {
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  color: #fff;
  padding: 0.55rem 1.1rem;
  border-radius: 999px;
  font-size: 0.8rem;
  z-index: 100;
}
.gpl-coupon-toast[hidden] { display: none; }`,
      js: `document.querySelectorAll('.gpl-coupon__code').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const code = btn.dataset.code;
    const label = btn.querySelector('[data-label]');
    const toast = document.querySelector('[data-coupon-toast]');
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    btn.classList.add('is-copied');
    if (label) label.textContent = 'Copied';
    if (toast) {
      toast.hidden = false;
      clearTimeout(toast._t);
      toast._t = setTimeout(() => { toast.hidden = true; }, 2000);
    }
    setTimeout(() => {
      btn.classList.remove('is-copied');
      if (label) label.textContent = 'Tap to copy';
    }, 2000);
  });
});`,
    }),
  },
  {
    id: "trust-grid",
    name: "Trust badge grid",
    description: "A responsive icon grid for shipping, returns and authenticity claims, driven by section blocks. Adapted from a real storefront build.",
    category: "Trust & social proof",
    kind: "section",
    controls: [{ id: "columns", label: "Columns", type: "select", options: [{ value: "2", label: "2" }, { value: "4", label: "4" }] }],
    defaults: { columns: "2" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `{%- if section.blocks.size > 0 -%}
  <ul class="gpl-trustgrid gpl-trustgrid--{{ section.settings.columns }}">
    {%- for block in section.blocks -%}
      <li class="gpl-trustgrid__card" {{ block.shopify_attributes }}>
        <span class="gpl-trustgrid__icon gpl-trustgrid__icon--{{ block.settings.icon }}" aria-hidden="true">
          {%- case block.settings.icon -%}
            {%- when 'truck' -%}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="1.5"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            {%- when 'refresh' -%}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            {%- when 'award' -%}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.5 12.9 17 22l-5-3-5 3 1.5-9.1"/></svg>
            {%- else -%}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          {%- endcase -%}
        </span>
        <span class="gpl-trustgrid__text">
          <strong>{{ block.settings.title | escape }}</strong>
          <span>{{ block.settings.subtitle | escape }}</span>
        </span>
      </li>
    {%- endfor -%}
  </ul>
{%- endif -%}

{% schema %}
{
  "name": "Trust badge grid",
  "settings": [
    {
      "type": "select",
      "id": "columns",
      "label": "Columns on desktop",
      "options": [{ "value": "2", "label": "2" }, { "value": "4", "label": "4" }],
      "default": ${js(str(v, "columns"))}
    }
  ],
  "blocks": [
    {
      "type": "badge",
      "name": "Badge",
      "settings": [
        {
          "type": "select",
          "id": "icon",
          "label": "Icon",
          "options": [
            { "value": "shield", "label": "Shield" },
            { "value": "truck", "label": "Delivery" },
            { "value": "refresh", "label": "Returns" },
            { "value": "award", "label": "Award" }
          ],
          "default": "shield"
        },
        { "type": "text", "id": "title", "label": "Title", "default": "Free shipping" },
        { "type": "text", "id": "subtitle", "label": "Subtitle" }
      ]
    }
  ],
  "max_blocks": 8,
  "presets": [{ "name": "Trust badge grid", "blocks": [{ "type": "badge" }, { "type": "badge" }, { "type": "badge" }, { "type": "badge" }] }]
}
{% endschema %}`,
      css: `.gpl-trustgrid {
  list-style: none;
  margin: 1rem 0;
  padding: 0;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(2, 1fr);
}
@media (min-width: 750px) {
  .gpl-trustgrid--4 { grid-template-columns: repeat(4, 1fr); }
}
.gpl-trustgrid__card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 0.95rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #fff;
}
.gpl-trustgrid__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.6rem;
  height: 2.6rem;
  flex-shrink: 0;
  border-radius: 50%;
}
/* Each trust type gets its own tint, like the big app icons */
.gpl-trustgrid__icon--shield { background: #e6f7f0; color: #1a9e6a; }
.gpl-trustgrid__icon--truck { background: #e8f0fe; color: #4a6fe3; }
.gpl-trustgrid__icon--refresh { background: #f3eeff; color: #8b5cf6; }
.gpl-trustgrid__icon--award { background: #fff8e1; color: #e6a817; }
.gpl-trustgrid__icon svg { width: 1.3rem; height: 1.3rem; }
.gpl-trustgrid__text { display: grid; min-width: 0; }
.gpl-trustgrid__text strong { font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.gpl-trustgrid__text span { font-size: 0.75rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }`,
    }),
  },
  {
    id: "price-display",
    name: "Price & discount block",
    description: "Price, MRP strike-through and discount percentage that updates when the variant changes. Adapted from a real storefront build.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "note", label: "Tax note", type: "text", maxLength: 40 },
      { id: "badge", label: "Show % OFF badge", type: "toggle" },
      { id: "accent", label: "Price colour", type: "color" },
    ],
    defaults: { note: "(incl. of all taxes)", badge: true, accent: "#0f172a" },
    install: snippetSteps("price-display.liquid"),
    files: (v) => ({
      liquid: `{%- assign v = product.selected_or_first_available_variant -%}
{%- if v -%}
  {%- assign save = v.compare_at_price | minus: v.price -%}
  {%- assign pct = 0 -%}
  {%- if save > 0 -%}{%- assign pct = save | times: 100 | divided_by: v.compare_at_price -%}{%- endif -%}
  <div class="gpl-price" data-gpl-price style="--gpl-accent: {{ accent | default: 'rgb(var(--color-foreground, 15 23 42))' }};">
    <span class="gpl-price__now" data-now>{{ v.price | money }}</span>
    <span class="gpl-price__was" data-was {% unless save > 0 %}hidden{% endunless %}>
      <s>{{ v.compare_at_price | money }}</s>
    </span>
${on(v, "badge") ? `    <span class="gpl-price__off" data-off {% unless save > 0 %}hidden{% endunless %}>{{ pct }}% off</span>\n` : ""}    <span class="gpl-price__note">${str(v, "note", 40)}</span>
  </div>
  <script type="application/json" data-gpl-variants>{{ product.variants | json }}</script>
{%- endif -%}`,
      css: `.gpl-price { display: flex; align-items: baseline; flex-wrap: wrap; gap: 0.6rem; padding-bottom: 0.8rem; border-bottom: 1px solid #e2e8f0; }
.gpl-price__now { color: var(--gpl-accent); font-size: 1.7rem; font-weight: 800; letter-spacing: -0.02em; }
.gpl-price__was { color: #94a3b8; font-size: 0.9rem; }
.gpl-price__off {
  background: #dcfce7;
  color: #15803d;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  text-transform: uppercase;
}
.gpl-price__note { color: rgb(var(--color-foreground, 100 116 139) / 0.75); font-size: 0.75rem; }
.gpl-price [hidden] { display: none; }`,
      js: `document.querySelectorAll('[data-gpl-price]').forEach((box) => {
  const json = box.parentElement.querySelector('[data-gpl-variants]');
  if (!json) return;
  let variants = [];
  try { variants = JSON.parse(json.textContent); } catch {}
  const now = box.querySelector('[data-now]');
  const was = box.querySelector('[data-was]');
  const off = box.querySelector('[data-off]');
  const currency = (typeof Shopify !== 'undefined' && Shopify.currency && Shopify.currency.active) || 'INR';
  const money = (c) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0 }).format(c / 100);
  function update(variant) {
    if (!variant) return;
    now.textContent = money(variant.price);
    const compare = variant.compare_at_price || 0;
    const onSale = compare > variant.price;
    if (was) { was.hidden = !onSale; if (onSale) was.querySelector('s').textContent = money(compare); }
    if (off) { off.hidden = !onSale; if (onSale) off.textContent = Math.round(((compare - variant.price) * 100) / compare) + '% off'; }
  }
  document.addEventListener('variant:change', (e) => { if (e.detail?.variant) update(e.detail.variant); });
  /* Fallback for themes that only update ?variant= in the URL */
  new URLSearchParams(location.search).get('variant') &&
    update(variants.find((v) => String(v.id) === new URLSearchParams(location.search).get('variant')));
});`,
      usage: `{% render 'price-display', product: product %}`,
    }),
  },
  {
    id: "promo-popup",
    name: "Promotional popup",
    description: "A delayed, dismissible popup with a coupon code and tap-to-copy. Adapted from a real storefront build.",
    category: "Marketing",
    kind: "section",
    controls: [
      { id: "title", label: "Title", type: "text", maxLength: 40 },
      { id: "text", label: "Text", type: "text", maxLength: 80 },
      { id: "code", label: "Coupon code", type: "text", maxLength: 20 },
      { id: "delay", label: "Delay (seconds)", type: "select", options: [{ value: "1", label: "1" }, { value: "5", label: "5" }, { value: "15", label: "15" }] },
    ],
    defaults: { title: "Welcome offer", text: "Get a discount on your first order.", code: "WELCOME10", delay: "5" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<gpl-promo-popup
  class="gpl-popup"
  data-delay="{{ section.settings.delay }}"
  data-key="gpl-popup-{{ section.id }}"
  hidden
>
  <div class="gpl-popup__box" role="dialog" aria-modal="true" aria-label="{{ section.settings.title | escape }}">
    <button type="button" class="gpl-popup__close" data-close aria-label="Close">&times;</button>
    {%- if section.settings.title != blank -%}
      <h2 class="gpl-popup__title">{{ section.settings.title | escape }}</h2>
    {%- endif -%}
    {%- if section.settings.text != blank -%}
      <p class="gpl-popup__text">{{ section.settings.text | escape }}</p>
    {%- endif -%}
    {%- if section.settings.code != blank -%}
      <button type="button" class="gpl-popup__code" data-code="{{ section.settings.code | escape }}">
        <span data-label>Tap to copy</span>
        <strong>{{ section.settings.code | escape }}</strong>
      </button>
    {%- endif -%}
    {%- if section.settings.button_label != blank and section.settings.button_link != blank -%}
      <a class="gpl-popup__cta" href="{{ section.settings.button_link }}">{{ section.settings.button_label | escape }}</a>
    {%- endif -%}
  </div>
</gpl-promo-popup>

{% schema %}
{
  "name": "Promotional popup",
  "settings": [
    { "type": "text", "id": "title", "label": "Title", "default": ${js(str(v, "title", 40))} },
    { "type": "textarea", "id": "text", "label": "Text", "default": ${js(str(v, "text", 80))} },
    { "type": "text", "id": "code", "label": "Coupon code", "default": ${js(str(v, "code", 20))} },
    { "type": "range", "id": "delay", "label": "Delay in seconds", "min": 1, "max": 30, "step": 1, "default": ${Number(v.delay) || 5} },
    { "type": "text", "id": "button_label", "label": "Button label" },
    { "type": "url", "id": "button_link", "label": "Button link" }
  ],
  "presets": [{ "name": "Promotional popup" }]
}
{% endschema %}`,
      css: `.gpl-popup {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.5);
}
.gpl-popup[hidden] { display: none; }
.gpl-popup__box {
  position: relative;
  width: min(26rem, 100%);
  border-radius: 16px;
  background: #fff;
  padding: 2rem 1.75rem;
  text-align: center;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.3);
}
.gpl-popup__close {
  position: absolute;
  top: 0.6rem;
  right: 0.75rem;
  border: 0;
  background: none;
  font-size: 1.5rem;
  color: rgb(var(--color-foreground, 100 116 139) / 0.75);
  cursor: pointer;
}
.gpl-popup__title { margin: 0; font-size: 1.4rem; font-weight: 800; }
.gpl-popup__text { margin: 0.5rem 0 0; color: #475569; font-size: 0.9rem; }
.gpl-popup__code {
  margin-top: 1.1rem;
  border: 1.5px dashed #0f172a;
  border-radius: 10px;
  background: #f8fafc;
  padding: 0.7rem 1rem;
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  gap: 0.15rem;
}
.gpl-popup__code span { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #94a3b8; }
.gpl-popup__code strong { font-size: 1.05rem; letter-spacing: 0.04em; }
.gpl-popup__code.is-copied { border-style: solid; border-color: #059669; }
.gpl-popup__cta {
  display: block;
  margin-top: 1rem;
  border-radius: var(--buttons-radius, 999px);
  background: rgb(var(--color-button, 15 23 42));
  color: rgb(var(--color-button-text, 255 255 255));
  padding: 0.75rem 1rem;
  font-weight: 600;
  text-decoration: none;
}`,
      js: `class GplPromoPopup extends HTMLElement {
  connectedCallback() {
    if (localStorage.getItem(this.dataset.key) === 'dismissed') return;
    this.timer = setTimeout(() => { this.hidden = false; }, Number(this.dataset.delay) * 1000 || 5000);
    this.querySelector('[data-close]').addEventListener('click', () => this.dismiss());
    this.addEventListener('click', (e) => { if (e.target === this) this.dismiss(); });
    this.querySelector('[data-code]')?.addEventListener('click', async (e) => {
      const btn = e.currentTarget;
      try { await navigator.clipboard.writeText(btn.dataset.code); } catch {}
      btn.classList.add('is-copied');
      btn.querySelector('[data-label]').textContent = 'Copied';
      setTimeout(() => {
        btn.classList.remove('is-copied');
        btn.querySelector('[data-label]').textContent = 'Tap to copy';
      }, 2000);
    });
  }
  disconnectedCallback() { clearTimeout(this.timer); }
  dismiss() {
    this.hidden = true;
    localStorage.setItem(this.dataset.key, 'dismissed');
  }
}
if (!customElements.get('gpl-promo-popup')) customElements.define('gpl-promo-popup', GplPromoPopup);`,
    }),
  },
  {
    id: "countdown-timer",
    name: "Countdown timer",
    description: "A real countdown to a fixed end date set in the theme editor - it does not reset per visitor. Adapted from a real storefront build.",
    category: "Marketing",
    kind: "section",
    controls: [
      { id: "badge", label: "Badge", type: "text", maxLength: 30 },
      { id: "heading", label: "Heading", type: "text", maxLength: 60 },
      { id: "end", label: "Ends (ISO date)", type: "text", maxLength: 25 },
      { id: "done", label: "Finished text", type: "text", maxLength: 50 },
    ],
    defaults: { badge: "Limited time", heading: "The offer ends soon", end: "2030-12-31T23:59:59+05:30", done: "This offer has ended." },
    install: sectionSteps,
    files: (v) => ({
      liquid: `{%- comment -%}
  Counts down to a fixed end date you set in the theme editor, so every
  visitor sees the same honest deadline.
{%- endcomment -%}
<gpl-countdown
  class="gpl-cd"
  data-end="{{ section.settings.end_date | escape }}"
  style="--gpl-accent: {{ section.settings.accent }};"
>
  <div class="gpl-cd__card">
    {%- if section.settings.badge != blank -%}
      <span class="gpl-cd__badge">{{ section.settings.badge | escape }}</span>
    {%- endif -%}
    {%- if section.settings.heading != blank -%}
      <p class="gpl-cd__heading">{{ section.settings.heading | escape }}</p>
    {%- endif -%}
    <div class="gpl-cd__clock" role="timer">
      <span class="gpl-cd__slot"><b data-h>00</b><small>Hours</small></span>
      <span class="gpl-cd__colon" aria-hidden="true">:</span>
      <span class="gpl-cd__slot"><b data-m>00</b><small>Mins</small></span>
      <span class="gpl-cd__colon" aria-hidden="true">:</span>
      <span class="gpl-cd__slot gpl-cd__slot--accent"><b data-s>00</b><small>Secs</small></span>
    </div>
    <p class="gpl-cd__done" data-done hidden>{{ section.settings.finished_text | escape }}</p>
  </div>
</gpl-countdown>

{% schema %}
{
  "name": "Countdown timer",
  "settings": [
    { "type": "text", "id": "badge", "label": "Badge", "default": ${js(str(v, "badge", 30))} },
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading", 60))} },
    {
      "type": "text",
      "id": "end_date",
      "label": "End date (ISO 8601)",
      "info": "Example: ${str(v, "end", 25)}. One fixed deadline for all visitors.",
      "default": ${js(str(v, "end", 25))}
    },
    { "type": "text", "id": "finished_text", "label": "Text when finished", "default": ${js(str(v, "done", 50))} },
    { "type": "color", "id": "accent", "label": "Accent colour", "default": "#c8f542" }
  ],
  "presets": [{ "name": "Countdown timer" }]
}
{% endschema %}`,
      css: `.gpl-cd { display: block; }
.gpl-cd__card {
  position: relative;
  width: 100%;
  max-width: clamp(18rem, 40vw, 28rem);
  margin: 0 auto;
  padding: clamp(1rem, 3.5vw, 1.4rem) clamp(0.8rem, 4vw, 1.5rem);
  border-radius: clamp(12px, 3vw, 16px);
  background: linear-gradient(145deg, rgba(16, 24, 40, 0.95), rgba(8, 12, 27, 0.98));
  border: 1px solid color-mix(in srgb, var(--gpl-accent) 25%, transparent);
  box-shadow:
    0 16px 40px -10px rgba(0, 0, 0, 0.7),
    0 0 24px -6px color-mix(in srgb, var(--gpl-accent) 18%, transparent),
    inset 0 1px 0 rgb(255 255 255 / 0.08);
  color: #fff;
  text-align: center;
  overflow: hidden;
}
/* Neon edge + ambient sheen */
.gpl-cd__card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 15%;
  right: 15%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gpl-accent), #38bdf8, transparent);
  opacity: 0.9;
}
.gpl-cd__card::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -80%;
  width: 40%;
  height: 200%;
  background: linear-gradient(120deg, transparent, rgb(255 255 255 / 0.05), transparent);
  transform: rotate(25deg);
  animation: gpl-cd-sheen 5.5s ease-in-out infinite;
  pointer-events: none;
}
@keyframes gpl-cd-sheen {
  0% { left: -80%; }
  30%, 100% { left: 180%; }
}
.gpl-cd__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  border: 1px solid rgb(251 191 36 / 0.35);
  background: rgb(245 158 11 / 0.1);
  color: #fbbf24;
  border-radius: 999px;
  padding: 0.25rem 0.75rem;
  font-size: clamp(0.6rem, 2vw, 0.7rem);
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-shadow: 0 0 10px rgb(245 158 11 / 0.3);
}
.gpl-cd__heading { margin: 0.45rem 0 0; color: #94a3b8; font-size: clamp(0.7rem, 2.3vw, 0.82rem); }
.gpl-cd__clock {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.3rem, 1.8vw, 0.55rem);
  margin-top: clamp(0.75rem, 2.5vw, 1.1rem);
}
.gpl-cd__slot { display: grid; gap: 0.3rem; flex: 1; max-width: 5rem; }
.gpl-cd__slot b {
  position: relative;
  display: grid;
  place-items: center;
  height: clamp(2.6rem, 12vw, 3.4rem);
  border: 1px solid rgb(140 170 210 / 0.18);
  border-radius: clamp(8px, 2vw, 10px);
  background: rgba(4, 9, 20, 0.85);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.08), 0 4px 12px rgba(0, 0, 0, 0.4);
  font-family: ui-monospace, "Roboto Mono", Menlo, monospace;
  font-size: clamp(1.15rem, 5vw, 1.45rem);
  font-weight: 800;
  color: #fff;
  text-shadow: 0 0 12px rgb(255 255 255 / 0.25);
  overflow: hidden;
}
/* flip-style seam */
.gpl-cd__slot b::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: rgb(255 255 255 / 0.06);
}
.gpl-cd__slot--accent b {
  border-color: color-mix(in srgb, var(--gpl-accent) 50%, transparent);
  background: rgba(8, 24, 28, 0.9);
  color: #5eead4;
  text-shadow: 0 0 14px color-mix(in srgb, var(--gpl-accent) 50%, transparent);
  box-shadow: 0 0 18px color-mix(in srgb, var(--gpl-accent) 22%, transparent), inset 0 1px 0 color-mix(in srgb, var(--gpl-accent) 35%, transparent);
}
.gpl-cd__slot small {
  color: rgb(var(--color-foreground, 100 116 139) / 0.75);
  font-size: clamp(0.55rem, 1.9vw, 0.65rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.gpl-cd__slot--accent small { color: #5eead4; }
.gpl-cd__colon {
  font-family: ui-monospace, monospace;
  font-weight: 700;
  color: rgb(var(--color-foreground, 148 163 184) / 0.55);
  animation: gpl-cd-blink 1s steps(2, start) infinite;
}
@keyframes gpl-cd-blink {
  50% { opacity: 0.2; }
}
@media (prefers-reduced-motion: reduce) {
  .gpl-cd__card::after, .gpl-cd__colon { animation: none; }
}
.gpl-cd__done { margin: 0.9rem 0 0; color: #94a3b8; font-size: 0.9rem; }
.gpl-cd__done[hidden] { display: none; }`,
      js: `class GplCountdown extends HTMLElement {
  connectedCallback() {
    const end = Date.parse(this.dataset.end || '');
    const h = this.querySelector('[data-h]');
    const m = this.querySelector('[data-m]');
    const s = this.querySelector('[data-s]');
    const done = this.querySelector('[data-done]');
    const clock = this.querySelector('.gpl-cd__clock');
    if (Number.isNaN(end)) return;
    const pad = (n) => String(n).padStart(2, '0');
    const tick = () => {
      const left = Math.max(0, end - Date.now());
      h.textContent = pad(Math.floor(left / 3600000));
      m.textContent = pad(Math.floor((left % 3600000) / 60000));
      s.textContent = pad(Math.floor((left % 60000) / 1000));
      if (left <= 0) {
        clearInterval(this.timer);
        clock.hidden = true;
        done.hidden = false;
      }
    };
    tick();
    this.timer = setInterval(tick, 1000);
  }
  disconnectedCallback() { clearInterval(this.timer); }
}
if (!customElements.get('gpl-countdown')) customElements.define('gpl-countdown', GplCountdown);`,
    }),
  },
  {
    id: "star-rating",
    name: "Star rating block",
    description: "Shows the product's real review rating from the standard Shopify metafield - no hardcoded numbers. Adapted from a real storefront build.",
    category: "Trust & social proof",
    kind: "snippet",
    controls: [
      { id: "stars", label: "Preview stars", type: "select", options: [{ value: "4.9", label: "4.9" }, { value: "4.5", label: "4.5" }, { value: "3.5", label: "3.5" }] },
      { id: "count", label: "Review count", type: "text", maxLength: 10 },
    ],
    defaults: { stars: "4.9", count: "1,480" },
    install: [
      "Back up your theme (Online Store > Themes > Actions > Duplicate) before changing any code.",
      "Install a review app that writes to the standard product.metafields.reviews.rating and rating_count metafields (most review apps do).",
      "Create snippets/star-rating.liquid, paste the complete file - styles and script are already inside it.",
      "Render it where you want the rating shown - for example under the product title.",
      "If a product has no rating metafield, the block renders nothing at all - it never invents a score.",
    ],
    files: () => ({
      liquid: `{%- comment -%}
  Reads the standard Shopify review metafields (rating + rating_count),
  which most review apps populate. Renders nothing when there is no data.
{%- endcomment -%}
{%- assign rating = product.metafields.reviews.rating.value.rating | plus: 0 -%}
{%- assign rcount = product.metafields.reviews.rating_count.value | plus: 0 -%}
{%- if rating > 0 -%}
  <div class="gpl-stars" role="img" aria-label="Rated {{ rating }} out of 5 stars">
    <span class="gpl-stars__icons" style="--gpl-rating: {{ rating }};" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
    <strong class="gpl-stars__score">{{ rating }} / 5</strong>
    {%- if rcount > 0 -%}
      <span class="gpl-stars__sep" aria-hidden="true"></span>
      <span class="gpl-stars__count"><b>{{ rcount }}</b> verified reviews</span>
    {%- endif -%}
  </div>
{%- endif -%}`,
      css: `.gpl-stars {
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.65rem 1.35rem;
  border-radius: 999px;
  background: rgba(15, 24, 44, 0.92);
  border: 1px solid rgb(255 215 0 / 0.3);
  box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgb(255 255 255 / 0.08);
  color: #fff;
}
.gpl-stars__icons { position: relative; display: inline-block; color: #3d4a66; letter-spacing: 0.12em; font-size: 1rem; line-height: 1; }
.gpl-stars__icons::before {
  content: "\\2605\\2605\\2605\\2605\\2605";
  position: absolute;
  left: 0;
  top: 0;
  width: calc(var(--gpl-rating) / 5 * 100%);
  overflow: hidden;
  white-space: nowrap;
  color: #ffb800;
  text-shadow: 0 0 10px rgb(255 184 0 / 0.4);
}
.gpl-stars__score { font-size: 0.9rem; }
.gpl-stars__sep { width: 1px; height: 1rem; background: rgb(255 255 255 / 0.2); }
.gpl-stars__count { color: #94a3b8; font-size: 0.8rem; }
.gpl-stars__count b { color: #5eead4; font-weight: 700; }`,
      usage: `{% render 'star-rating', product: product %}`,
    }),
  },
  {
    id: "stock-pulse",
    name: "Low stock indicator",
    description: "An 'only N left' indicator driven by real variant inventory - it only appears when stock is genuinely low. Adapted from a real storefront build.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "threshold", label: "Show below", type: "select", options: [{ value: "5", label: "5 units" }, { value: "10", label: "10 units" }] },
    ],
    defaults: { threshold: "10" },
    install: [
      "Back up your theme (Online Store > Themes > Actions > Duplicate) before changing any code.",
      "In Shopify admin, enable 'Track quantity' on the products where you want the indicator - it only works with real inventory tracking.",
      "Create snippets/stock-pulse.liquid, paste the complete file - styles and script are already inside it.",
      "Render it near your add-to-cart button with the usage tag shown in the Usage tab.",
      "Test both states: it stays hidden when stock is above the threshold or when tracking is off.",
    ],
    files: (v) => ({
      liquid: `{%- comment -%}
  Uses real inventory: hidden unless Shopify tracks quantity AND stock is
  at or below the threshold, so the scarcity message is always true.
{%- endcomment -%}
{%- assign v = product.selected_or_first_available_variant -%}
{%- assign max = threshold | default: 10 | plus: 0 -%}
{%- if v and v.inventory_management == 'shopify' and v.inventory_quantity > 0 and v.inventory_quantity <= max -%}
  <p class="gpl-stock">
    <span class="gpl-stock__dot" aria-hidden="true"></span>
    Selling fast - only <strong>{{ v.inventory_quantity }}</strong> left in stock
  </p>
{%- endif -%}`,
      css: `.gpl-stock {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0.5rem 0;
  padding: 0.7rem 1.15rem;
  border: 1px solid rgb(255 77 79 / 0.35);
  border-radius: 10px;
  background: linear-gradient(145deg, rgba(38, 12, 15, 0.95), rgba(20, 8, 10, 0.98));
  box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.6), 0 0 18px -4px rgb(255 77 79 / 0.25);
  color: #ffa39e;
  font-size: 0.85rem;
  font-weight: 600;
}
.gpl-stock strong { color: #ff4d4f; font-size: 0.95rem; text-shadow: 0 0 10px rgb(255 77 79 / 0.5); }
.gpl-stock__dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: #ff4d4f;
  box-shadow: 0 0 10px #ff4d4f;
  animation: gpl-stock-pulse 1.4s ease-in-out infinite;
}
@keyframes gpl-stock-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.3); }
}
@media (prefers-reduced-motion: reduce) {
  .gpl-stock__dot { animation: none; }
}`,
      usage: `{% render 'stock-pulse', product: product, threshold: ${v.threshold ?? 10} %}`,
    }),
  },
  {
    id: "sticky-buy-bar",
    name: "Mobile sticky buy bar",
    description: "A mobile-only sticky bar with the live price that taps through to your theme's real add-to-cart button. Adapted from a real storefront build.",
    category: "Product page",
    kind: "snippet",
    controls: [{ id: "label", label: "Button label", type: "text", maxLength: 20 }],
    defaults: { label: "Add to cart" },
    install: [
      "Back up your theme (Online Store > Themes > Actions > Duplicate) before changing any code.",
      "Create snippets/sticky-buy-bar.liquid, paste the complete file - styles and script are already inside it.",
      "Render it inside your product form area with the usage tag shown in the Usage tab.",
      "On mobile, the bar clicks your theme's own add-to-cart button, so drawer carts and validation still work.",
      "Check it does not cover your footer content - some themes need a little bottom padding on the page.",
    ],
    files: (v) => ({
      liquid: `{%- assign v = product.selected_or_first_available_variant -%}
{%- if v -%}
  <div class="gpl-buybar" data-gpl-buybar>
    <div class="gpl-buybar__price">
      <strong>{{ v.price | money }}</strong>
      {%- if v.compare_at_price > v.price -%}
        <s>{{ v.compare_at_price | money }}</s>
        {%- assign save_pct = v.compare_at_price | minus: v.price | times: 100 | divided_by: v.compare_at_price -%}
        <span class="gpl-buybar__off">{{ save_pct }}% off</span>
      {%- endif -%}
    </div>
    <button type="button" class="gpl-buybar__cta" data-gpl-buy>
      <span class="gpl-buybar__shine" aria-hidden="true"></span>
      ${str(v, "label", 20)}
    </button>
  </div>
{%- endif -%}`,
      css: `/* Mobile only - hidden on desktop */
.gpl-buybar { display: none; }
@media (max-width: 767px) {
  .gpl-buybar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 60;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.65rem 0.9rem calc(0.65rem + env(safe-area-inset-bottom, 0px));
    background: rgba(8, 12, 27, 0.94);
    border-top: 1px solid color-mix(in srgb, var(--gpl-accent) 35%, transparent);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.6);
  }
  .gpl-buybar__price { display: flex; align-items: baseline; gap: 0.4rem; }
  .gpl-buybar__price strong {
    font-size: 1.2rem;
    font-weight: 900;
    color: #fff;
    text-shadow: 0 0 16px color-mix(in srgb, var(--gpl-accent) 40%, transparent);
  }
  .gpl-buybar__price s { color: rgb(var(--color-foreground, 100 116 139) / 0.75); font-size: 0.8rem; }
  .gpl-buybar__off {
    font-size: 0.62rem;
    font-weight: 800;
    color: #f87171;
    background: rgb(239 68 68 / 0.15);
    border: 1px solid rgb(239 68 68 / 0.35);
    padding: 0.15rem 0.35rem;
    border-radius: 4px;
  }
  .gpl-buybar__cta {
    position: relative;
    overflow: hidden;
    border: 1px solid rgb(255 255 255 / 0.4);
    border-radius: 999px;
    background: linear-gradient(135deg, #00f0b5, #10b981 50%, #059669);
    color: #030712;
    padding: 0.7rem 1.4rem;
    font-size: 0.85rem;
    font-weight: 900;
    letter-spacing: 0.02em;
    box-shadow: 0 0 20px color-mix(in srgb, var(--gpl-accent) 40%, transparent), inset 0 1px 0 rgb(255 255 255 / 0.6);
    cursor: pointer;
  }
  .gpl-buybar__cta:active { transform: scale(0.97); }
  .gpl-buybar__shine {
    position: absolute;
    top: -50%;
    left: -80%;
    width: 45%;
    height: 200%;
    background: linear-gradient(120deg, transparent, rgb(255 255 255 / 0.5), transparent);
    transform: rotate(25deg);
    animation: gpl-buybar-sheen 3.5s ease-in-out infinite;
  }
  @keyframes gpl-buybar-sheen {
    0% { left: -80%; }
    35%, 100% { left: 160%; }
  }
}
@media (prefers-reduced-motion: reduce) {
  .gpl-buybar__shine { display: none; }
}`,
      js: `document.querySelectorAll('[data-gpl-buybar]').forEach((bar) => {
  bar.querySelector('[data-gpl-buy]').addEventListener('click', () => {
    /* Click the theme's own add-to-cart button so validation,
       cart drawers and analytics keep working. */
    const selectors = [
      'form[action*="/cart/add"] button[type="submit"]',
      'form[action*="/cart/add"] [name="add"]',
      '.product-form__submit',
    ];
    for (const sel of selectors) {
      const btn = document.querySelector(sel);
      if (btn && btn !== bar && btn.offsetParent !== null) {
        btn.click();
        return;
      }
    }
    document.querySelector('form[action*="/cart/add"]')?.submit();
  });
});`,
      usage: `{% render 'sticky-buy-bar', product: product %}`,
    }),
  },
  {
    id: "free-shipping-bar",
    name: "Free shipping progress",
    description: "A cart progress bar driven by the real cart total - shows exactly how much more unlocks free shipping.",
    category: "Cart & checkout",
    kind: "snippet",
    controls: [
      { id: "goal", label: "Free shipping at", type: "select", options: [{ value: "49900", label: "Rs. 499" }, { value: "99900", label: "Rs. 999" }, { value: "149900", label: "Rs. 1,499" }] },
      { id: "accent", label: "Bar colour", type: "color" },
    ],
    defaults: { goal: "49900", accent: "#15803d" },
    install: [
      "Back up your theme (Online Store > Themes > Actions > Duplicate) before changing any code.",
      "Create snippets/free-shipping-bar.liquid, paste the complete file - styles and script are already inside it.",
      "Render it inside your cart template or cart drawer with the usage tag shown in the Usage tab.",
      "Set the threshold (in paise) to match the free-shipping rate you actually configured in Shopify shipping settings.",
    ],
    files: (v) => ({
      liquid: `{%- comment -%}
  Driven by cart.total_price, so the message is always accurate.
  Pass the free-shipping threshold in paise (49900 = Rs. 499).
{%- endcomment -%}
{%- assign goal = threshold | default: ${v.goal ?? 49900} -%}
{%- assign total = cart.total_price | default: 0 -%}
{%- assign pct = total | times: 100 | divided_by: goal -%}
{%- if pct > 100 -%}{%- assign pct = 100 -%}{%- endif -%}
<div class="gpl-ship" style="--gpl-accent: {{ accent | default: 'rgb(var(--color-button, 21 128 61))' }};">
  {%- if total >= goal -%}
    <p class="gpl-ship__msg gpl-ship__msg--done">You have unlocked <strong>free shipping</strong></p>
  {%- else -%}
    <p class="gpl-ship__msg">Add <strong>{{ goal | minus: total | money }}</strong> more to unlock free shipping</p>
  {%- endif -%}
  <div class="gpl-ship__track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="{{ pct }}" aria-label="Progress to free shipping">
    <span class="gpl-ship__fill" style="width: {{ pct }}%;"></span>
  </div>
</div>`,
      css: `.gpl-ship { margin: 0.75rem 0; }
.gpl-ship__msg { margin: 0 0 0.45rem; font-size: 0.85rem; }
.gpl-ship__msg strong { color: var(--gpl-accent); }
.gpl-ship__msg--done { color: var(--gpl-accent); font-weight: 700; }
.gpl-ship__track {
  height: 0.5rem;
  border-radius: 999px;
  background: #e2e8f0;
  overflow: hidden;
}
.gpl-ship__fill {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--gpl-accent), #34d399);
  box-shadow: 0 0 10px -2px var(--gpl-accent);
  transition: width 0.4s ease;
}`,
      usage: `{% render 'free-shipping-bar', threshold: ${v.goal ?? 49900} %}`,
    }),
  },
  {
    id: "benefit-marquee",
    name: "Benefit marquee",
    description: "A horizontally scrolling strip of short benefits - pauses on hover and respects reduced-motion. Adapted from a real storefront build.",
    category: "Marketing",
    kind: "section",
    controls: [
      { id: "speed", label: "Scroll speed", type: "select", options: [{ value: "16", label: "Calm" }, { value: "10", label: "Medium" }, { value: "6", label: "Fast" }] },
      { id: "divider", label: "Show dividers", type: "toggle" },
    ],
    defaults: { speed: "10", divider: true },
    install: sectionSteps,
    files: (v) => ({
      liquid: `{%- if section.blocks.size > 0 -%}
  <div class="gpl-marquee" style="--gpl-speed: {{ section.settings.speed }}s;" data-gpl-marquee>
    <div class="gpl-marquee__track">
      {%- for i in (1..2) -%}
        {%- for block in section.blocks -%}
          <span class="gpl-marquee__item" {{ block.shopify_attributes }} {% if i == 2 %}aria-hidden="true"{% endif %}>
            {{ block.settings.text | escape }}
          </span>
          ${on(v, "divider") ? `{%- unless forloop.last and i == 2 -%}
          <span class="gpl-marquee__dot" aria-hidden="true">&bull;</span>
          {%- endunless -%}\n          ` : ""}{%- endfor -%}
      {%- endfor -%}
    </div>
  </div>
{%- endif -%}

{% schema %}
{
  "name": "Benefit marquee",
  "settings": [
    {
      "type": "range",
      "id": "speed",
      "label": "Seconds per loop",
      "min": 4,
      "max": 30,
      "step": 2,
      "default": ${Number(v.speed) || 10}
    }
  ],
  "blocks": [
    {
      "type": "item",
      "name": "Item",
      "settings": [{ "type": "text", "id": "text", "label": "Text", "default": "Free shipping" }]
    }
  ],
  "max_blocks": 12,
  "presets": [
    {
      "name": "Benefit marquee",
      "blocks": [{ "type": "item" }, { "type": "item" }, { "type": "item" }, { "type": "item" }]
    }
  ]
}
{% endschema %}`,
      css: `.gpl-marquee {
  overflow: hidden;
  padding: 0.7rem 0;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
}
.gpl-marquee__track {
  display: inline-flex;
  align-items: center;
  gap: 1.5rem;
  white-space: nowrap;
  animation: gpl-marquee var(--gpl-speed, 10s) linear infinite;
  will-change: transform;
}
.gpl-marquee:hover .gpl-marquee__track { animation-play-state: paused; }
.gpl-marquee__item { font-size: 0.85rem; font-weight: 600; }
.gpl-marquee__dot { color: #94a3b8; }
@keyframes gpl-marquee {
  to { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .gpl-marquee__track { animation: none; }
}`,
    }),
  },
  {
    id: "payment-badges",
    name: "Payment trust row",
    description: "A row of payment-method pills (UPI, cards, COD) that sits under the buy button and answers the 'can I trust this checkout?' question.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "items", label: "Methods (separate with |)", type: "text", maxLength: 120 },
      { id: "note", label: "Sub-line", type: "text", maxLength: 80 },
      { id: "accent", label: "Accent", type: "color" },
    ],
    defaults: { items: "UPI|Cards|Net banking|COD", note: "100% secure payments via trusted gateways", accent: "#15803d" },
    install: snippetSteps("payment-badges.liquid"),
    files: (v) => ({
      liquid: `{%- comment -%}
  Sits under the add-to-cart button. Edit the list to match the methods you
  actually offer - showing a method you do not support erodes trust.
{%- endcomment -%}
<div class="gpl-pay" style="--gpl-accent: {{ accent | default: 'rgb(var(--color-button, 21 128 61))' }};">
  <ul class="gpl-pay__row" role="list">
    {%- assign methods = items | default: '${v.items}' | split: '|' -%}
    {%- for m in methods -%}
      <li class="gpl-pay__pill">
        <svg class="gpl-pay__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20"/></svg>
        {{ m | strip | escape }}
      </li>
    {%- endfor -%}
  </ul>
  {%- if note != blank or ${v.note ? "true" : "false"} -%}
    <p class="gpl-pay__note">{{ note | default: '${v.note}' | escape }}</p>
  {%- endif -%}
</div>`,
      css: `.gpl-pay { margin: 0.75rem 0; }
.gpl-pay__row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.gpl-pay__pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.7rem;
  border: 1px solid rgb(var(--color-foreground, 226 232 240) / 0.18);
  border-radius: 999px;
  background: rgb(var(--color-foreground, 148 163 184) / 0.06);
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}
.gpl-pay__icon { width: 0.9rem; height: 0.9rem; color: var(--gpl-accent); }
.gpl-pay__note { margin: 0.5rem 0 0; font-size: 0.7rem; opacity: 0.65; }`,
      usage: `{% render 'payment-badges', items: '${v.items}', note: '${v.note}' %}`,
    }),
  },
  {
    id: "quantity-breaks",
    name: "Bundle & save table",
    description: "Tiered 'buy more, save more' pricing rows. Clicking a tier sets the quantity and highlights the deal - pushes average order value up.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "tier2", label: "2-pack discount %", type: "select", options: [{ value: "5", label: "5%" }, { value: "10", label: "10%" }, { value: "15", label: "15%" }] },
      { id: "tier3", label: "3-pack discount %", type: "select", options: [{ value: "10", label: "10%" }, { value: "15", label: "15%" }, { value: "20", label: "20%" }, { value: "25", label: "25%" }] },
      { id: "accent", label: "Accent", type: "color" },
    ],
    defaults: { tier2: "10", tier3: "20", accent: "#c8f542" },
    install: [
      "Back up your theme (Online Store > Themes > Actions > Duplicate) before changing any code.",
      "Create snippets/quantity-breaks.liquid, paste the complete file - styles and script are already inside it.",
      "Render it above the add-to-cart button inside your product form (usage tag in the Usage tab).",
      "IMPORTANT: the discounts shown must also exist in Shopify - create matching automatic discounts or bundle pricing, otherwise customers see a saving that the cart never applies.",
    ],
    files: (v) => ({
      liquid: `{%- comment -%}
  Shows a per-unit price so shoppers understand the saving. The numbers are
  only accurate if matching Shopify discounts exist - keep them in sync.
{%- endcomment -%}
{%- assign p = product.selected_or_first_available_variant.price | default: product.price -%}
<div class="gpl-qty" data-gpl-qty style="--gpl-accent: {{ accent | default: 'rgb(var(--color-button, 200 245 66))' }};">
  <p class="gpl-qty__head">Bundle &amp; save</p>
  <button type="button" class="gpl-qty__tier is-active" data-qty="1">
    <span class="gpl-qty__label">Buy 1</span>
    <span class="gpl-qty__price">{{ p | money }}</span>
  </button>
  <button type="button" class="gpl-qty__tier" data-qty="2">
    <span class="gpl-qty__label">Buy 2 <em class="gpl-qty__save">save ${v.tier2}%</em></span>
    <span class="gpl-qty__price">{{ p | times: 2 | times: ${100 - Number(v.tier2)} | divided_by: 100 | money }}</span>
  </button>
  <button type="button" class="gpl-qty__tier gpl-qty__tier--best" data-qty="3">
    <span class="gpl-qty__label">Buy 3 <em class="gpl-qty__save">save ${v.tier3}%</em> <span class="gpl-qty__tag">best value</span></span>
    <span class="gpl-qty__price">{{ p | times: 3 | times: ${100 - Number(v.tier3)} | divided_by: 100 | money }}</span>
  </button>
</div>`,
      css: `.gpl-qty { display: grid; gap: 0.5rem; margin: 1rem 0; }
.gpl-qty__head { margin: 0; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; opacity: 0.7; }
.gpl-qty__tier {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  padding: 0.7rem 0.9rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.2);
  border-radius: 0.75rem;
  background: rgb(var(--color-foreground, 148 163 184) / 0.05);
  color: inherit;
  font: inherit;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.15s ease, background 0.15s ease;
}
.gpl-qty__tier.is-active {
  border-color: var(--gpl-accent);
  background: rgb(var(--color-foreground, 148 163 184) / 0.1);
  box-shadow: 0 0 0 1px var(--gpl-accent);
}
.gpl-qty__label { font-weight: 600; font-size: 0.9rem; }
.gpl-qty__save {
  font-style: normal;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--gpl-accent);
  margin-left: 0.35rem;
}
.gpl-qty__tag {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: var(--gpl-accent);
  color: #0b1220;
  padding: 0.15rem 0.45rem;
  border-radius: 999px;
  margin-left: 0.4rem;
}
.gpl-qty__price { font-weight: 700; font-size: 0.95rem; }`,
      js: `document.querySelectorAll('[data-gpl-qty]').forEach((wrap) => {
  const tiers = wrap.querySelectorAll('[data-qty]');
  tiers.forEach((btn) => {
    btn.addEventListener('click', () => {
      tiers.forEach((t) => t.classList.remove('is-active'));
      btn.classList.add('is-active');
      const qty = btn.getAttribute('data-qty');
      const input = wrap.closest('form')?.querySelector('input[name="quantity"]')
        || document.querySelector('input[name="quantity"]');
      if (input) input.value = qty;
    });
  });
});`,
      usage: `{% render 'quantity-breaks' %}`,
    }),
  },
  {
    id: "guarantee-strip",
    name: "Money-back guarantee",
    description: "A compact shield-and-copy strip that reassures buyers right under the price or add-to-cart button.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "days", label: "Guarantee length", type: "select", options: [{ value: "7", label: "7 days" }, { value: "14", label: "14 days" }, { value: "30", label: "30 days" }] },
      { id: "text", label: "Copy", type: "text", maxLength: 90 },
      { id: "accent", label: "Accent", type: "color" },
    ],
    defaults: { days: "30", text: "Love it or get a full refund - no questions asked.", accent: "#15803d" },
    install: snippetSteps("guarantee-strip.liquid"),
    files: (v) => ({
      liquid: `{%- comment -%}
  Only show a guarantee you actually honour - this line sets a buyer
  expectation your support has to meet.
{%- endcomment -%}
<div class="gpl-guarantee" style="--gpl-accent: {{ accent | default: 'rgb(var(--color-button, 21 128 61))' }};">
  <span class="gpl-guarantee__icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
  </span>
  <p class="gpl-guarantee__text"><strong>{{ days | default: ${v.days} }}-day money-back guarantee.</strong> {{ text | default: '${v.text}' | escape }}</p>
</div>`,
      css: `.gpl-guarantee {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0.9rem 0;
  padding: 0.75rem 0.95rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.16);
  border-radius: 0.85rem;
  background: rgb(var(--color-foreground, 148 163 184) / 0.05);
}
.gpl-guarantee__icon {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.65rem;
  background: var(--gpl-accent);
  color: #fff;
  flex-shrink: 0;
}
.gpl-guarantee__icon svg { width: 1.15rem; height: 1.15rem; }
.gpl-guarantee__text { margin: 0; font-size: 0.82rem; line-height: 1.45; }
.gpl-guarantee__text strong { display: block; font-size: 0.88rem; }`,
      usage: `{% render 'guarantee-strip', days: ${v.days}, text: '${v.text}' %}`,
    }),
  },
  {
    id: "recently-viewed",
    name: "Recently viewed products",
    description: "Remembers the products a visitor opened and shows them again - brings shoppers back to items they already considered.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 50 },
      { id: "limit", label: "Max products", type: "select", options: [{ value: "4", label: "4" }, { value: "6", label: "6" }, { value: "8", label: "8" }] },
    ],
    defaults: { heading: "Recently viewed", limit: "4" },
    install: [
      "Back up your theme (Online Store > Themes > Actions > Duplicate) before changing any code.",
      "Create snippets/recently-viewed.liquid, paste the complete file - styles and script are already inside it.",
      "Render it near the bottom of your product template (usage tag in the Usage tab).",
      "The list is stored in the visitor's browser only - nothing is sent to your server, which keeps it privacy-safe.",
    ],
    files: (v) => ({
      liquid: `{%- comment -%}
  Works on product pages: remembers handles in localStorage, then loads the
  other products via Shopify's /products/{handle}.js endpoint. Renders
  nothing on non-product templates or for first-time visitors.
{%- endcomment -%}
<div class="gpl-recent" data-gpl-recent data-limit="${v.limit}"
     data-current="{{ product.handle | default: '' }}" hidden>
  <p class="gpl-recent__head">{{ heading | default: '${v.heading}' | escape }}</p>
  <div class="gpl-recent__grid" data-gpl-recent-grid></div>
</div>`,
      css: `.gpl-recent { margin: 2rem 0; }
.gpl-recent__head { margin: 0 0 0.9rem; font-size: 1.05rem; font-weight: 700; }
.gpl-recent__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
  gap: 0.9rem;
}
.gpl-recent__card {
  display: block;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.15);
  border-radius: 0.75rem;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  background: rgb(var(--color-foreground, 148 163 184) / 0.05);
  transition: transform 0.15s ease, border-color 0.15s ease;
}
.gpl-recent__card:hover { transform: translateY(-2px); border-color: rgb(var(--color-foreground, 148 163 184) / 0.35); }
.gpl-recent__img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; }
.gpl-recent__meta { padding: 0.6rem 0.7rem; }
.gpl-recent__title { font-size: 0.8rem; font-weight: 600; line-height: 1.3; margin: 0; }
.gpl-recent__price { font-size: 0.75rem; opacity: 0.7; margin: 0.2rem 0 0; }`,
      js: `(function () {
  var wrap = document.querySelector('[data-gpl-recent]');
  if (!wrap) return;
  var KEY = 'gpl_recent';
  var limit = parseInt(wrap.getAttribute('data-limit'), 10) || 4;
  var current = wrap.getAttribute('data-current') || '';
  try {
    var list = JSON.parse(localStorage.getItem(KEY) || '[]');
    if (current) {
      list = [current].concat(list.filter(function (h) { return h !== current; }));
      localStorage.setItem(KEY, JSON.stringify(list.slice(0, 12)));
    }
    var others = list.filter(function (h) { return h && h !== current; }).slice(0, limit);
    if (!others.length) return;
    var grid = wrap.querySelector('[data-gpl-recent-grid]');
    Promise.all(others.map(function (h) {
      return fetch('/products/' + h + '.js').then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; });
    })).then(function (products) {
      products.filter(Boolean).forEach(function (p) {
        var a = document.createElement('a');
        a.className = 'gpl-recent__card';
        a.href = p.url;
        var money = (p.price / 100).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
        a.innerHTML = (p.featured_image ? '<img class="gpl-recent__img" src="' + p.featured_image + '&width=300" alt="" loading="lazy">' : '')
          + '<div class="gpl-recent__meta"><p class="gpl-recent__title"></p><p class="gpl-recent__price">' + money + '</p></div>';
        a.querySelector('.gpl-recent__title').textContent = p.title;
        grid.appendChild(a);
      });
      if (grid.children.length) wrap.hidden = false;
    });
  } catch (e) { /* storage blocked - hide */ }
})();`,
      usage: `{% render 'recently-viewed' %}`,
    }),
  },
  {
    id: "sold-out-notify",
    name: "Sold out notify button",
    description: "Replaces the dead 'sold out' state with a 'notify me' action - keeps the shopper engaged instead of losing them.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "mode", label: "Notify via", type: "select", options: [{ value: "whatsapp", label: "WhatsApp" }, { value: "email", label: "Email" }] },
      { id: "label", label: "Button text", type: "text", maxLength: 40 },
    ],
    defaults: { mode: "whatsapp", label: "Notify me when back in stock" },
    install: [
      "Back up your theme (Online Store > Themes > Actions > Duplicate) before changing any code.",
      "Create snippets/sold-out-notify.liquid, paste the complete file - styles and script are already inside it.",
      "Render it in place of (or next to) the add-to-cart button inside your product form - it only appears when the variant is sold out.",
      "Point the contact target at your own WhatsApp number or email address in the code where marked.",
    ],
    files: (v) => ({
      liquid: `{%- comment -%}
  Only renders when the selected variant is unavailable. Change the phone or
  address below to your own support channel.
{%- endcomment -%}
{%- assign v = product.selected_or_first_available_variant -%}
{%- if v and v.available == false -%}
  <div class="gpl-soldout">
    <p class="gpl-soldout__msg"><strong>Sold out.</strong> Get notified when it returns.</p>
    <a class="gpl-soldout__btn"
       ${v.mode === "email" ? `href="mailto:support@example.com?subject={{ 'Back in stock: ' | append: product.title | url_encode }}"` : `href="https://wa.me/919999999999?text={{ 'Please notify me when ' | append: product.title | append: ' is back in stock' | url_encode }}"`}
       target="_blank" rel="noopener noreferrer">
      {{ label | default: '${v.label}' | escape }}
    </a>
  </div>
{%- endif -%}`,
      css: `.gpl-soldout {
  margin: 0.9rem 0;
  padding: 0.9rem 1rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.18);
  border-radius: 0.85rem;
  background: rgb(var(--color-foreground, 148 163 184) / 0.05);
  text-align: center;
}
.gpl-soldout__msg { margin: 0 0 0.6rem; font-size: 0.85rem; }
.gpl-soldout__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.7rem 1rem;
  border-radius: var(--buttons-radius, 0.6rem);
  background: rgb(var(--color-button, 11 18 32));
  color: rgb(var(--color-button-text, 255 255 255));
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
}`,
      usage: `{% render 'sold-out-notify' %}`,
    }),
  },
  {
    id: "back-to-top",
    name: "Back to top button",
    description: "A floating button that fades in after the shopper scrolls, then smoothly returns them to the top of the page.",
    category: "Utility",
    kind: "snippet",
    controls: [
      { id: "position", label: "Position", type: "select", options: [{ value: "right", label: "Bottom right" }, { value: "left", label: "Bottom left" }] },
      { id: "bg", label: "Button colour", type: "color" },
    ],
    defaults: { position: "right", bg: "#0b1220" },
    install: snippetSteps("back-to-top.liquid"),
    files: (v) => ({
      liquid: `{%- comment -%}
  Render once near the end of theme.liquid (or a layout file) so it works on
  every page. Pure CSS + a tiny scroll listener.
{%- endcomment -%}
<button type="button" class="gpl-totop gpl-totop--${v.position}" data-gpl-totop aria-label="Back to top" hidden>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
</button>`,
      css: `.gpl-totop {
  position: fixed;
  bottom: 1.25rem;
  ${v.position === "left" ? "left: 1.25rem;" : "right: 1.25rem;"}
  z-index: 60;
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 0;
  border-radius: 999px;
  background: rgb(var(--color-button, 11 18 32));
  color: rgb(var(--color-button-text, 255 255 255));
  box-shadow: 0 10px 24px -8px rgb(0 0 0 / 0.35);
  cursor: pointer;
  opacity: 0;
  transform: translateY(0.5rem);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.gpl-totop.is-visible { opacity: 1; transform: translateY(0); }
.gpl-totop[hidden] { display: none; }
.gpl-totop svg { width: 1.1rem; height: 1.1rem; }
@media (prefers-reduced-motion: reduce) {
  .gpl-totop { transition: none; }
}`,
      js: `document.querySelectorAll('[data-gpl-totop]').forEach((btn) => {
  btn.hidden = false;
  const onScroll = () => btn.classList.toggle('is-visible', window.scrollY > 480);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  btn.addEventListener('click', () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  });
});`,
      usage: `{% render 'back-to-top' %}`,
    }),
  },
  {
    id: "scroll-progress",
    name: "Scroll progress bar",
    description: "A thin bar pinned to the top of the page that fills as the visitor scrolls - subtle cue that keeps people reading.",
    category: "Utility",
    kind: "snippet",
    controls: [{ id: "color", label: "Bar colour", type: "color" }],
    defaults: { color: "#c8f542" },
    install: snippetSteps("scroll-progress.liquid"),
    files: (v) => ({
      liquid: `<div class="gpl-progress" data-gpl-progress aria-hidden="true"><span class="gpl-progress__fill"></span></div>`,
      css: `.gpl-progress {
  position: fixed;
  inset: 0 0 auto 0;
  height: 3px;
  z-index: 70;
  pointer-events: none;
}
.gpl-progress__fill {
  display: block;
  height: 100%;
  width: 0%;
  background: ${hex(v, "color")};
  transition: width 0.05s linear;
}`,
      js: `(function () {
  const fill = document.querySelector('.gpl-progress__fill');
  if (!fill) return;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    fill.style.width = max > 0 ? ((window.scrollY / max) * 100).toFixed(1) + '%' : '0%';
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();`,
      usage: `{% render 'scroll-progress' %}`,
    }),
  },
  {
    id: "cookie-consent",
    name: "Cookie consent banner",
    description: "A slim bottom banner that asks for consent once, remembers the choice in the browser, and stays away afterwards.",
    category: "Utility",
    kind: "snippet",
    controls: [
      { id: "text", label: "Message", type: "text", maxLength: 120 },
      { id: "accent", label: "Button colour", type: "color" },
    ],
    defaults: { text: "We use cookies to improve your experience and analyse traffic.", accent: "#c8f542" },
    install: [
      "Back up your theme (Online Store > Themes > Actions > Duplicate) before changing any code.",
      "Create snippets/cookie-consent.liquid, paste the code, and render it once in your layout file (e.g. before </body> in theme.liquid).",
      "Point the policy link at your real privacy policy page.",
      "NOTE: this stores a preference flag only - if you run ads/analytics, make sure those scripts actually respect the choice.",
    ],
    files: (v) => ({
      liquid: `{%- comment -%}
  Shows once until the visitor accepts or declines. The choice lives in
  localStorage - nothing is sent to a server.
{%- endcomment -%}
<div class="gpl-cookies" data-gpl-cookies role="region" aria-label="Cookie consent" hidden>
  <p class="gpl-cookies__text">{{ text | default: '${v.text}' | escape }} <a href="/pages/privacy-policy">Privacy policy</a></p>
  <div class="gpl-cookies__actions">
    <button type="button" class="gpl-cookies__btn gpl-cookies__btn--accept" data-gpl-cookies="accept">Accept</button>
    <button type="button" class="gpl-cookies__btn gpl-cookies__btn--decline" data-gpl-cookies="decline">Decline</button>
  </div>
</div>`,
      css: `.gpl-cookies {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 80;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.9rem 1.25rem;
  background: rgb(var(--color-background, 11 18 32));
  color: rgb(var(--color-foreground, 226 232 240));
  border-top: 1px solid rgb(255 255 255 / 0.12);
  font-size: 0.8rem;
}
.gpl-cookies[hidden] { display: none; }
.gpl-cookies__text { margin: 0; }
.gpl-cookies__text a { color: inherit; text-decoration: underline; }
.gpl-cookies__actions { display: flex; gap: 0.5rem; }
.gpl-cookies__btn {
  padding: 0.45rem 1rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}
.gpl-cookies__btn--accept { border: 0; background: ${hex(v, "accent")}; color: #0b1220; }
.gpl-cookies__btn--decline { border: 1px solid rgb(255 255 255 / 0.25); background: transparent; color: inherit; }`,
      js: `(function () {
  const KEY = 'gpl_consent';
  const el = document.querySelector('[data-gpl-cookies]');
  if (!el) return;
  if (localStorage.getItem(KEY)) return;
  el.hidden = false;
  el.querySelectorAll('[data-gpl-cookies]').forEach((b) => {
    b.addEventListener('click', () => {
      try { localStorage.setItem(KEY, b.getAttribute('data-gpl-cookies')); } catch (e) {}
      el.hidden = true;
    });
  });
})();`,
      usage: `{% render 'cookie-consent' %}`,
    }),
  },
  {
    id: "sale-badge",
    name: "Sale badge with saving %",
    description: "A 'Save X%' badge computed from compare_at_price - drops onto product cards or the product page and never lies about the discount.",
    category: "Product page",
    kind: "snippet",
    controls: [{ id: "accent", label: "Badge colour", type: "color" }],
    defaults: { accent: "#e11d48" },
    install: snippetSteps("sale-badge.liquid"),
    files: (v) => ({
      liquid: `{%- comment -%}
  Real maths: the percentage is derived from the variant's own prices, so it
  is always the true saving - no made-up numbers.
{%- endcomment -%}
{%- assign v = product.selected_or_first_available_variant | default: product -%}
{%- if v.compare_at_price > v.price -%}
  {%- assign saving = v.compare_at_price | minus: v.price | times: 100 | divided_by: v.compare_at_price -%}
  <span class="gpl-sale" style="--gpl-accent: {{ accent | default: '${hex(v, "accent")}' }};">
    Save {{ saving }}%
  </span>
{%- endif -%}`,
      css: `.gpl-sale {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  background: var(--gpl-accent);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  box-shadow: 0 4px 14px -4px var(--gpl-accent);
}`,
      usage: `{% render 'sale-badge' %}`,
    }),
  },
  {
    id: "product-tabs",
    name: "Product info tabs",
    description: "Tabs for description, shipping and returns on the product page - keeps long content tidy and scannable.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "tab1", label: "Tab 1 title", type: "text", maxLength: 24 },
      { id: "tab2", label: "Tab 2 title", type: "text", maxLength: 24 },
      { id: "tab3", label: "Tab 3 title", type: "text", maxLength: 24 },
    ],
    defaults: { tab1: "Description", tab2: "Shipping", tab3: "Returns" },
    install: snippetSteps("product-tabs.liquid"),
    files: (v) => ({
      liquid: `{%- comment -%}
  Accessible tab pattern: buttons drive panels, arrow keys move between tabs.
  Wire the shipping/returns panels to metafields or hard-code your policies.
{%- endcomment -%}
<div class="gpl-tabs" data-gpl-tabs>
  <div class="gpl-tabs__bar" role="tablist" aria-label="Product information">
    <button type="button" role="tab" id="gpl-tab-1" aria-controls="gpl-panel-1" aria-selected="true" class="gpl-tabs__btn is-active">{{ tab1 | default: '${v.tab1}' | escape }}</button>
    <button type="button" role="tab" id="gpl-tab-2" aria-controls="gpl-panel-2" aria-selected="false" tabindex="-1" class="gpl-tabs__btn">{{ tab2 | default: '${v.tab2}' | escape }}</button>
    <button type="button" role="tab" id="gpl-tab-3" aria-controls="gpl-panel-3" aria-selected="false" tabindex="-1" class="gpl-tabs__btn">{{ tab3 | default: '${v.tab3}' | escape }}</button>
  </div>
  <div id="gpl-panel-1" role="tabpanel" aria-labelledby="gpl-tab-1" class="gpl-tabs__panel">
    {{ product.description }}
  </div>
  <div id="gpl-panel-2" role="tabpanel" aria-labelledby="gpl-tab-2" class="gpl-tabs__panel" hidden>
    <p>{{ product.metafields.custom.shipping_info | default: 'Ships in 2-4 business days. Free shipping thresholds apply at checkout.' | escape }}</p>
  </div>
  <div id="gpl-panel-3" role="tabpanel" aria-labelledby="gpl-tab-3" class="gpl-tabs__panel" hidden>
    <p>{{ product.metafields.custom.return_info | default: 'Easy 30-day returns on unused items in original packaging.' | escape }}</p>
  </div>
</div>`,
      css: `.gpl-tabs { margin: 1.25rem 0; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.15); border-radius: 0.85rem; overflow: hidden; }
.gpl-tabs__bar { display: flex; border-bottom: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.15); background: rgb(var(--color-foreground, 148 163 184) / 0.04); }
.gpl-tabs__btn {
  flex: 1;
  padding: 0.75rem 0.5rem;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  opacity: 0.65;
  transition: opacity 0.15s ease;
}
.gpl-tabs__btn.is-active { opacity: 1; border-bottom-color: rgb(var(--color-button, 200 245 66)); }
.gpl-tabs__panel { padding: 1rem 1.1rem; font-size: 0.9rem; line-height: 1.6; }
.gpl-tabs__panel[hidden] { display: none; }`,
      js: `document.querySelectorAll('[data-gpl-tabs]').forEach((root) => {
  const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
  const panels = Array.from(root.querySelectorAll('[role="tabpanel"]'));
  const activate = (i) => {
    tabs.forEach((t, j) => {
      const on = i === j;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      panels[j].hidden = !on;
    });
    tabs[i].focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => activate(i));
    t.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') activate((i + 1) % tabs.length);
      if (e.key === 'ArrowLeft') activate((i - 1 + tabs.length) % tabs.length);
    });
  });
});`,
      usage: `{% render 'product-tabs' %}`,
    }),
  },
  {
    id: "logo-marquee",
    name: "Logo / 'as seen in' marquee",
    description: "A scrolling strip of press or partner marks. Ships with text placeholders - swap in your real logos as images.",
    category: "Marketing",
    kind: "section",
    controls: [
      { id: "items", label: "Logos (separate with |)", type: "text", maxLength: 120 },
      { id: "speed", label: "Scroll speed", type: "select", options: [{ value: "24", label: "Calm" }, { value: "16", label: "Medium" }, { value: "10", label: "Fast" }] },
    ],
    defaults: { items: "Times of India|YourStory|Inc42|Economic Times|Mint", speed: "16" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `{%- comment -%}
  Uses image blocks for real logos; text renders as a fallback wordmark so the
  layout still works before assets are uploaded.
{%- endcomment -%}
{%- if section.blocks.size > 0 -%}
  <div class="gpl-logos" style="--gpl-speed: {{ section.settings.speed }}s;">
    <p class="gpl-logos__eyebrow">{{ section.settings.eyebrow | escape }}</p>
    <div class="gpl-logos__mask">
      <div class="gpl-logos__track">
        {%- for i in (1..2) -%}
          {%- for block in section.blocks -%}
            <span class="gpl-logos__item" {{ block.shopify_attributes }} {% if i == 2 %}aria-hidden="true"{% endif %}>
              {%- if block.settings.image != blank -%}
                {{ block.settings.image | image_url: height: 48 | image_tag: loading: 'lazy', class: 'gpl-logos__img', alt: block.settings.name }}
              {%- else -%}
                <span class="gpl-logos__word">{{ block.settings.name | escape }}</span>
              {%- endif -%}
            </span>
          {%- endfor -%}
        {%- endfor -%}
      </div>
    </div>
  </div>
{%- endif -%}

{% schema %}
{
  "name": "Logo marquee",
  "settings": [
    { "type": "text", "id": "eyebrow", "label": "Small heading", "default": "As featured in" },
    {
      "type": "range",
      "id": "speed",
      "label": "Seconds per loop",
      "min": 6,
      "max": 40,
      "step": 2,
      "default": ${Number(v.speed) || 16}
    }
  ],
  "blocks": [
    {
      "type": "logo",
      "name": "Logo",
      "settings": [
        { "type": "image_picker", "id": "image", "label": "Logo image" },
        { "type": "text", "id": "name", "label": "Name (fallback text)", "default": "Press name" }
      ]
    }
  ],
  "max_blocks": 14,
  "presets": [{ "name": "Logo marquee", "blocks": [{ "type": "logo" }, { "type": "logo" }, { "type": "logo" }, { "type": "logo" }] }]
}
{% endschema %}`,
      css: `.gpl-logos { padding: 1.5rem 0; text-align: center; }
.gpl-logos__eyebrow { margin: 0 0 1rem; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.55; }
.gpl-logos__mask { overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
.gpl-logos__track {
  display: inline-flex;
  align-items: center;
  gap: 3rem;
  white-space: nowrap;
  animation: gpl-logos var(--gpl-speed, 16s) linear infinite;
  will-change: transform;
}
.gpl-logos:hover .gpl-logos__track { animation-play-state: paused; }
.gpl-logos__item { display: inline-flex; align-items: center; }
.gpl-logos__img { height: 1.75rem; width: auto; opacity: 0.7; }
.gpl-logos__word { font-size: 1rem; font-weight: 700; opacity: 0.55; letter-spacing: 0.02em; }
@keyframes gpl-logos { to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) {
  .gpl-logos__track { animation: none; }
}`,
    }),
  },
  {
    id: "testimonial-slider",
    name: "Testimonial strip",
    description: "A rotating customer quote with stars and name - real social proof under the title or buy button.",
    category: "Trust & social proof",
    kind: "section",
    controls: [
      { id: "autoplay", label: "Auto-rotate", type: "toggle" },
      { id: "accent", label: "Star colour", type: "color" },
    ],
    defaults: { autoplay: true, accent: "#f59e0b" },
    install: [
      "Back up your theme (Online Store > Themes > Actions > Duplicate) before changing any code.",
      "Create sections/testimonial-strip.liquid, paste the code, and add the section on your product template in the theme editor.",
      "Add a block per testimonial - only use real customer quotes you can back up.",
      "The quote, name and star count come from blocks; wire stars to a metafield later if you want them data-driven.",
    ],
    files: (v) => ({
      liquid: `{%- comment -%}
  IMPORTANT: use real reviews. Fabricated testimonials breach consumer
  protection rules in most markets and kill trust when discovered.
{%- endcomment -%}
{%- if section.blocks.size > 0 -%}
  <div class="gpl-quotes" data-gpl-quotes ${on(v, "autoplay") ? 'data-gpl-autoplay="5000"' : ""} style="--gpl-accent: {{ section.settings.accent }};">
    {%- for block in section.blocks -%}
      <figure class="gpl-quotes__item {% if forloop.first %}is-active{% endif %}" {{ block.shopify_attributes }} {% unless forloop.first %}hidden{% endunless %}>
        <div class="gpl-quotes__stars" aria-label="{{ block.settings.stars }} out of 5 stars">
          {%- for i in (1..5) -%}
            <svg viewBox="0 0 20 20" {% if i > block.settings.stars %}class="is-dim"{% endif %} aria-hidden="true"><path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L1.5 7.7l5.9-.9z"/></svg>
          {%- endfor -%}
        </div>
        <blockquote class="gpl-quotes__text">&ldquo;{{ block.settings.quote | escape }}&rdquo;</blockquote>
        <figcaption class="gpl-quotes__name">{{ block.settings.name | escape }}{% if block.settings.role != blank %} &middot; {{ block.settings.role | escape }}{% endif %}</figcaption>
      </figure>
    {%- endfor -%}
    {%- if section.blocks.size > 1 -%}
      <div class="gpl-quotes__dots" role="tablist" aria-label="Testimonials">
        {%- for block in section.blocks -%}
          <button type="button" class="gpl-quotes__dot {% if forloop.first %}is-active{% endif %}" data-gpl-quote-dot="{{ forloop.index0 }}" aria-label="Show testimonial {{ forloop.index }}"></button>
        {%- endfor -%}
      </div>
    {%- endif -%}
  </div>
{%- endif -%}

{% schema %}
{
  "name": "Testimonial strip",
  "settings": [
    { "type": "color", "id": "accent", "label": "Star colour", "default": "${hex(v, "accent")}" }
  ],
  "blocks": [
    {
      "type": "quote",
      "name": "Testimonial",
      "settings": [
        { "type": "range", "id": "stars", "label": "Stars", "min": 1, "max": 5, "step": 1, "default": 5 },
        { "type": "textarea", "id": "quote", "label": "Quote", "default": "Great quality - exactly as described." },
        { "type": "text", "id": "name", "label": "Customer name", "default": "Verified buyer" },
        { "type": "text", "id": "role", "label": "Context (optional)", "default": "Mumbai" }
      ]
    }
  ],
  "max_blocks": 8,
  "presets": [{ "name": "Testimonial strip", "blocks": [{ "type": "quote" }, { "type": "quote" }] }]
}
{% endschema %}`,
      css: `.gpl-quotes { text-align: center; padding: 1rem 0; }
.gpl-quotes__item[hidden] { display: none; }
.gpl-quotes__item { margin: 0; }
.gpl-quotes__stars { display: flex; justify-content: center; gap: 2px; margin-bottom: 0.6rem; }
.gpl-quotes__stars svg { width: 1rem; height: 1rem; fill: var(--gpl-accent); }
.gpl-quotes__stars svg.is-dim { fill: rgb(var(--color-foreground, 148 163 184) / 0.25); }
.gpl-quotes__text { margin: 0; font-size: 1rem; font-weight: 500; line-height: 1.55; }
.gpl-quotes__name { margin-top: 0.6rem; font-size: 0.78rem; opacity: 0.6; }
.gpl-quotes__dots { display: flex; justify-content: center; gap: 0.4rem; margin-top: 1rem; }
.gpl-quotes__dot {
  width: 0.5rem; height: 0.5rem; border: 0; border-radius: 999px; padding: 0;
  background: rgb(var(--color-foreground, 148 163 184) / 0.3); cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}
.gpl-quotes__dot.is-active { background: var(--gpl-accent); transform: scale(1.2); }`,
      js: `document.querySelectorAll('[data-gpl-quotes]').forEach((root) => {
  const items = Array.from(root.querySelectorAll('.gpl-quotes__item'));
  const dots = Array.from(root.querySelectorAll('[data-gpl-quote-dot]'));
  if (items.length < 2) return;
  let i = 0;
  const show = (n) => {
    i = (n + items.length) % items.length;
    items.forEach((el, j) => (el.hidden = j !== i));
    dots.forEach((d, j) => d.classList.toggle('is-active', j === i));
  };
  dots.forEach((d, j) => d.addEventListener('click', () => show(j)));
  const delay = parseInt(root.getAttribute('data-gpl-autoplay'), 10);
  if (delay > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let t = setInterval(() => show(i + 1), delay);
    root.addEventListener('mouseenter', () => clearInterval(t));
    root.addEventListener('mouseleave', () => (t = setInterval(() => show(i + 1), delay)));
  }
});`,
    }),
  },
  {
    id: "before-after",
    name: "Before / after slider",
    description: "An interactive draggable divider over two images - shows the product's effect better than any bullet point.",
    category: "Product page",
    kind: "snippet",
    controls: [{ id: "accent", label: "Handle colour", type: "color" }],
    defaults: { accent: "#c8f542" },
    install: [
      "Back up your theme (Online Store > Themes > Actions > Duplicate) before changing any code.",
      "Create snippets/before-after.liquid, paste the code and CSS.",
      "Render it on the product page passing two images - or wire it to product.metafields for per-product pairs.",
      "Use honest before/after shots: same lighting, same angle, no retouching differences.",
    ],
    files: (v) => ({
      liquid: `{%- comment -%}
  Pass before_image / after_image (product.media entries or metafield images).
  The handle is a range input so keyboard users can drag it too.
{%- endcomment -%}
{%- assign b = before_image | default: product.media[0].preview_image -%}
{%- assign a = after_image | default: product.media[1].preview_image -%}
{%- if b and a -%}
  <div class="gpl-ba" data-gpl-ba style="--gpl-accent: {{ accent | default: '${hex(v, "accent")}' }};">
    <img class="gpl-ba__img" src="{{ a | image_url: width: 1200 }}" alt="After" loading="lazy" width="1200" height="{{ 1200 | divided_by: a.aspect_ratio | round }}">
    <div class="gpl-ba__before" data-gpl-ba-before>
      <img class="gpl-ba__img" src="{{ b | image_url: width: 1200 }}" alt="Before" loading="lazy" width="1200" height="{{ 1200 | divided_by: b.aspect_ratio | round }}">
    </div>
    <input class="gpl-ba__range" type="range" min="0" max="100" value="50" step="0.5" aria-label="Reveal before and after comparison">
    <span class="gpl-ba__tag gpl-ba__tag--before">Before</span>
    <span class="gpl-ba__tag gpl-ba__tag--after">After</span>
  </div>
{%- endif -%}`,
      css: `.gpl-ba { position: relative; overflow: hidden; border-radius: 1rem; user-select: none; }
.gpl-ba__img { display: block; width: 100%; height: auto; pointer-events: none; }
.gpl-ba__before {
  position: absolute; inset: 0;
  clip-path: inset(0 50% 0 0);
  transition: clip-path 0.05s linear;
}
.gpl-ba__before .gpl-ba__img { height: 100%; object-fit: cover; }
.gpl-ba__range {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  opacity: 0; cursor: ew-resize; margin: 0;
}
.gpl-ba::after {
  content: '';
  position: absolute; top: 0; bottom: 0; left: var(--gpl-pos, 50%);
  width: 2px; background: var(--gpl-accent); transform: translateX(-1px);
}
.gpl-ba__tag {
  position: absolute; top: 0.75rem;
  padding: 0.25rem 0.6rem; border-radius: 999px;
  background: rgb(0 0 0 / 0.55); color: #fff;
  font-size: 0.65rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
}
.gpl-ba__tag--before { left: 0.75rem; }
.gpl-ba__tag--after { right: 0.75rem; }`,
      js: `document.querySelectorAll('[data-gpl-ba]').forEach((el) => {
  const range = el.querySelector('.gpl-ba__range');
  const before = el.querySelector('[data-gpl-ba-before]');
  const apply = () => {
    const p = range.value;
    before.style.clipPath = 'inset(0 ' + (100 - p) + '% 0 0)';
    el.style.setProperty('--gpl-pos', p + '%');
  };
  range.addEventListener('input', apply);
  apply();
});`,
      usage: `{% render 'before-after', before_image: product.media[0], after_image: product.media[1] %}`,
    }),
  },
  {
    id: "emi-note",
    name: "EMI / pay-in-parts note",
    description: "Shows the price split into instalments under the price - 'or 3 payments of Rs. X'. Lowers sticker shock on higher-priced items.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "parts", label: "Split into", type: "select", options: [{ value: "3", label: "3 payments" }, { value: "4", label: "4 payments" }, { value: "6", label: "6 payments" }] },
      { id: "accent", label: "Accent", type: "color" },
    ],
    defaults: { parts: "3", accent: "#15803d" },
    install: [
      "Back up your theme (Online Store > Themes > Actions > Duplicate) before changing any code.",
      "Create snippets/emi-note.liquid, paste the code and CSS.",
      "Render it under the price (usage tag in the Usage tab).",
      "IMPORTANT: only show instalments your checkout actually supports - if you do not offer EMI/BNPL, do not show this.",
    ],
    files: (v) => ({
      liquid: `{%- comment -%}
  Pure display maths on the variant price. The actual instalment plan must be
  offered by your payment provider - this only describes it.
{%- endcomment -%}
{%- assign p = product.selected_or_first_available_variant.price | default: product.price -%}
{%- assign n = parts | default: ${v.parts} -%}
{%- assign each = p | divided_by: n -%}
<p class="gpl-emi" style="--gpl-accent: {{ accent | default: 'rgb(var(--color-button, 21 128 61))' }};">
  or <strong>{{ n }} payments of {{ each | money }}</strong>
  <span class="gpl-emi__hint">available at checkout</span>
</p>`,
      css: `.gpl-emi { margin: 0.35rem 0 0.75rem; font-size: 0.85rem; }
.gpl-emi strong { color: var(--gpl-accent); }
.gpl-emi__hint { font-size: 0.7rem; opacity: 0.55; margin-left: 0.35rem; }`,
      usage: `{% render 'emi-note', parts: ${v.parts} %}`,
    }),
  },
  {
    id: "cutoff-timer",
    name: "Dispatch cutoff timer",
    description: "'Order in the next 2h 15m for same-day dispatch' - honest urgency based on your real warehouse cutoff.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "hour", label: "Daily cutoff hour", type: "select", options: [{ value: "14", label: "2 PM" }, { value: "16", label: "4 PM" }, { value: "18", label: "6 PM" }] },
      { id: "accent", label: "Accent", type: "color" },
    ],
    defaults: { hour: "16", accent: "#e11d48" },
    install: [
      "Back up your theme (Online Store > Themes > Actions > Duplicate) before changing any code.",
      "Create snippets/cutoff-timer.liquid, paste the code and CSS.",
      "Render it near the buy button - it only shows while the cutoff is still reachable today.",
      "Set the hour to your ACTUAL dispatch cutoff - promising same-day dispatch you cannot honour creates refund disputes.",
    ],
    files: (v) => ({
      liquid: `{%- comment -%}
  Counts down to today's dispatch cutoff. Disappears after the cutoff -
  it never claims a benefit the store cannot deliver.
{%- endcomment -%}
<div class="gpl-cutoff" data-gpl-cutoff="${v.hour}" style="--gpl-accent: {{ accent | default: 'rgb(var(--color-button, 225 29 72))' }};" hidden>
  <svg class="gpl-cutoff__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
  <p class="gpl-cutoff__text">Order within <strong data-gpl-cutoff-left></strong> for same-day dispatch</p>
</div>`,
      css: `.gpl-cutoff {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin: 0.75rem 0;
  font-size: 0.85rem;
}
.gpl-cutoff[hidden] { display: none; }
.gpl-cutoff__icon { width: 1.1rem; height: 1.1rem; color: var(--gpl-accent); flex-shrink: 0; }
.gpl-cutoff__text { margin: 0; }
.gpl-cutoff__text strong { color: var(--gpl-accent); font-variant-numeric: tabular-nums; }`,
      js: `document.querySelectorAll('[data-gpl-cutoff]').forEach((el) => {
  const hour = parseInt(el.getAttribute('data-gpl-cutoff'), 10) || 16;
  const out = el.querySelector('[data-gpl-cutoff-left]');
  const tick = () => {
    const now = new Date();
    const cut = new Date(now); cut.setHours(hour, 0, 0, 0);
    const left = cut - now;
    if (left <= 0) { el.hidden = true; return; }
    const h = Math.floor(left / 3.6e6), m = Math.floor((left % 3.6e6) / 6e4), s = Math.floor((left % 6e4) / 1e3);
    out.textContent = (h > 0 ? h + 'h ' : '') + String(m).padStart(2, '0') + 'm ' + String(s).padStart(2, '0') + 's';
    el.hidden = false;
  };
  tick();
  setInterval(tick, 1000);
});`,
      usage: `{% render 'cutoff-timer' %}`,
    }),
  },
  {
    id: "pairs-well-with",
    name: "Pairs well with",
    description: "A cross-sell row pulled from Shopify's product recommendations - suggests the next purchase while intent is high.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 40 },
      { id: "limit", label: "Max products", type: "select", options: [{ value: "2", label: "2" }, { value: "4", label: "4" }] },
    ],
    defaults: { heading: "Pairs well with", limit: "4" },
    install: [
      "Back up your theme (Online Store > Themes > Actions > Duplicate) before changing any code.",
      "Create snippets/pairs-well-with.liquid, paste the code and CSS, and render it on the product page.",
      "Recommendations come from the Search & Discovery app - assign complementary products there first.",
      "If no recommendations exist for a product, the row hides itself.",
    ],
    files: (v) => ({
      liquid: `{%- comment -%}
  Pulls Shopify's complementary-product recommendations at runtime. Needs the
  free Search & Discovery app with complements configured.
{%- endcomment -%}
{%- if product -%}
  <div class="gpl-pairs" data-gpl-pairs data-product="{{ product.id }}" data-limit="${v.limit}" hidden>
    <p class="gpl-pairs__head">{{ heading | default: '${v.heading}' | escape }}</p>
    <div class="gpl-pairs__grid" data-gpl-pairs-grid></div>
  </div>
{%- endif -%}`,
      css: `.gpl-pairs { margin: 1.5rem 0; }
.gpl-pairs__head { margin: 0 0 0.8rem; font-size: 0.95rem; font-weight: 700; }
.gpl-pairs__grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
@media (min-width: 48rem) { .gpl-pairs__grid { grid-template-columns: repeat(4, 1fr); } }
.gpl-pairs__card {
  display: flex; align-items: center; gap: 0.7rem;
  padding: 0.6rem; border-radius: 0.75rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.15);
  text-decoration: none; color: inherit;
  transition: border-color 0.15s ease;
}
.gpl-pairs__card:hover { border-color: rgb(var(--color-foreground, 148 163 184) / 0.35); }
.gpl-pairs__img { width: 3.25rem; height: 3.25rem; object-fit: cover; border-radius: 0.5rem; flex-shrink: 0; }
.gpl-pairs__title { margin: 0; font-size: 0.78rem; font-weight: 600; line-height: 1.3; }
.gpl-pairs__price { margin: 0.15rem 0 0; font-size: 0.72rem; opacity: 0.65; }`,
      js: `(function () {
  var el = document.querySelector('[data-gpl-pairs]');
  if (!el) return;
  var grid = el.querySelector('[data-gpl-pairs-grid]');
  var limit = parseInt(el.getAttribute('data-limit'), 10) || 4;
  var url = window.Shopify && Shopify.routes && Shopify.routes.product_recommendations_url
    ? Shopify.routes.product_recommendations_url
    : '/recommendations/products';
  fetch(url + '.json?product_id=' + el.getAttribute('data-product') + '&limit=' + limit + '&intent=complementary')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      (data.products || []).slice(0, limit).forEach(function (p) {
        var a = document.createElement('a');
        a.className = 'gpl-pairs__card';
        a.href = p.url;
        var img = p.featured_image ? '<img class="gpl-pairs__img" src="' + p.featured_image + '&width=104" alt="" loading="lazy">' : '';
        var money = (p.price / 100).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
        a.innerHTML = img + '<span><p class="gpl-pairs__title"></p><p class="gpl-pairs__price">' + money + '</p></span>';
        a.querySelector('.gpl-pairs__title').textContent = p.title;
        grid.appendChild(a);
      });
      if (grid.children.length) el.hidden = false;
    })
    .catch(function () { /* no recommendations - stays hidden */ });
})();`,
      usage: `{% render 'pairs-well-with' %}`,
    }),
  },
  {
    id: "spec-table",
    name: "Product spec table",
    description: "A clean key/value specs table fed by metafields - shoppers scan it in seconds instead of digging through the description.",
    category: "Product page",
    kind: "snippet",
    controls: [{ id: "accent", label: "Row accent", type: "color" }],
    defaults: { accent: "#0f172a" },
    install: [
      "Back up your theme (Online Store > Themes > Actions > Duplicate) before changing any code.",
      "Create product metafields (Settings > Custom data > Products) for each spec - e.g. custom.material, custom.weight.",
      "Create snippets/spec-table.liquid, paste the code and CSS, and render it on the product page.",
      "Rows only render when their metafield has a value - empty specs disappear automatically.",
    ],
    files: (v) => ({
      liquid: `{%- comment -%}
  Edit the row list to match YOUR metafields. Rows skip themselves when the
  metafield is blank, so the same snippet works across product types.
{%- endcomment -%}
{%- assign specs = 'Material,custom.material|Weight,custom.weight|Dimensions,custom.dimensions|Warranty,custom.warranty|SKU,variant.sku' | split: '|' -%}
<div class="gpl-specs">
  <p class="gpl-specs__head">Specifications</p>
  <table class="gpl-specs__table">
    <tbody>
      {%- for row in specs -%}
        {%- assign parts = row | split: ',' -%}
        {%- assign label = parts[0] -%}
        {%- assign key = parts[1] -%}
        {%- assign value = '' -%}
        {%- if key == 'variant.sku' -%}
          {%- assign value = product.selected_or_first_available_variant.sku -%}
        {%- else -%}
          {%- assign value = product.metafields[key].value -%}
        {%- endif -%}
        {%- if value != blank -%}
          <tr>
            <th scope="row">{{ label | escape }}</th>
            <td>{{ value }}</td>
          </tr>
        {%- endif -%}
      {%- endfor -%}
    </tbody>
  </table>
</div>`,
      css: `.gpl-specs { margin: 1.25rem 0; }
.gpl-specs__head { margin: 0 0 0.6rem; font-size: 0.95rem; font-weight: 700; color: ${hex(v, "accent")}; }
.gpl-specs__table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
.gpl-specs__table th,
.gpl-specs__table td { padding: 0.55rem 0.25rem; text-align: left; border-bottom: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.12); }
.gpl-specs__table th { font-weight: 600; width: 38%; opacity: 0.7; }
.gpl-specs__table tr:last-child th,
.gpl-specs__table tr:last-child td { border-bottom: 0; }`,
      usage: `{% render 'spec-table' %}`,
    }),
  },
  {
    id: "gift-wrap",
    name: "Gift wrap option",
    description: "A checkbox that adds a gift message and wrap note as line-item properties - easy AOV lift around gifting seasons.",
    category: "Cart & checkout",
    kind: "snippet",
    controls: [
      { id: "label", label: "Checkbox label", type: "text", maxLength: 60 },
      { id: "price_note", label: "Price note", type: "text", maxLength: 40 },
    ],
    defaults: { label: "Add gift wrap & a handwritten note", price_note: "+ Rs. 49" },
    install: [
      "Back up your theme (Online Store > Themes > Actions > Duplicate) before changing any code.",
      "Create snippets/gift-wrap.liquid, paste the code and CSS.",
      "Render it inside your product <form> so the properties travel with the add-to-cart request.",
      "Fulfil it as a line-item property (shows on the packing slip). Charge for it via a separate product or free - your call.",
    ],
    files: (v) => ({
      liquid: `{%- comment -%}
  Adds properties[Gift wrap] and properties[Gift message] to the line item.
  Render INSIDE the product form so they submit with Add to cart.
{%- endcomment -%}
<div class="gpl-gift">
  <label class="gpl-gift__check">
    <input type="checkbox" name="properties[Gift wrap]" value="Yes" data-gpl-gift>
    <span>{{ label | default: '${v.label}' | escape }} <em>{{ price_note | default: '${v.price_note}' | escape }}</em></span>
  </label>
  <div class="gpl-gift__msg" data-gpl-gift-msg hidden>
    <label class="gpl-gift__msglabel" for="gpl-gift-msg">Your message (optional)</label>
    <textarea id="gpl-gift-msg" name="properties[Gift message]" rows="2" maxlength="200" placeholder="Happy birthday! Love, Priya"></textarea>
  </div>
</div>`,
      css: `.gpl-gift { margin: 0.9rem 0; }
.gpl-gift__check {
  display: flex; align-items: center; gap: 0.6rem;
  padding: 0.7rem 0.9rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.2);
  border-radius: 0.75rem;
  cursor: pointer; font-size: 0.85rem;
}
.gpl-gift__check input { width: 1rem; height: 1rem; accent-color: rgb(var(--color-button, 21 128 61)); }
.gpl-gift__check em { font-style: normal; font-size: 0.75rem; opacity: 0.6; margin-left: 0.3rem; }
.gpl-gift__msg { margin-top: 0.6rem; }
.gpl-gift__msglabel { display: block; font-size: 0.75rem; font-weight: 600; margin-bottom: 0.3rem; }
.gpl-gift__msg textarea {
  width: 100%; padding: 0.55rem 0.7rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.25);
  border-radius: 0.6rem; background: transparent; color: inherit;
  font: inherit; font-size: 0.85rem; resize: vertical;
}`,
      js: `document.querySelectorAll('[data-gpl-gift]').forEach((cb) => {
  const msg = cb.closest('.gpl-gift').querySelector('[data-gpl-gift-msg]');
  const toggle = () => (msg.hidden = !cb.checked);
  cb.addEventListener('change', toggle);
  toggle();
});`,
      usage: `{% render 'gift-wrap' %}`,
    }),
  },
  {
    id: "breadcrumb",
    name: "Breadcrumb + SEO schema",
    description: "Home > Collection > Product navigation with BreadcrumbList JSON-LD - helps wayfinding and rich results in search.",
    category: "Headers & navigation",
    kind: "snippet",
    controls: [{ id: "accent", label: "Link colour", type: "color" }],
    defaults: { accent: "#475569" },
    install: [
      "Back up your theme (Online Store > Themes > Actions > Duplicate) before changing any code.",
      "Create snippets/breadcrumb.liquid, paste the code and CSS.",
      "Render it at the top of product and collection templates.",
      "The JSON-LD outputs BreadcrumbList schema - verify in Google's Rich Results Test.",
    ],
    files: (v) => ({
      liquid: `{%- comment -%}
  Emits visible crumbs + BreadcrumbList JSON-LD. Position URLs match the
  visible order so search engines see the same trail users do.
{%- endcomment -%}
<nav class="gpl-crumbs" aria-label="Breadcrumb">
  <ol class="gpl-crumbs__list">
    <li><a href="{{ routes.root_url }}" class="gpl-crumbs__link">Home</a></li>
    {%- if collection -%}
      <li aria-hidden="true" class="gpl-crumbs__sep">/</li>
      <li><a href="{{ collection.url }}" class="gpl-crumbs__link">{{ collection.title | escape }}</a></li>
    {%- elsif product.collections.first -%}
      <li aria-hidden="true" class="gpl-crumbs__sep">/</li>
      <li><a href="{{ product.collections.first.url }}" class="gpl-crumbs__link">{{ product.collections.first.title | escape }}</a></li>
    {%- endif -%}
    {%- if product -%}
      <li aria-hidden="true" class="gpl-crumbs__sep">/</li>
      <li aria-current="page" class="gpl-crumbs__current">{{ product.title | escape }}</li>
    {%- endif -%}
  </ol>
</nav>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": {{ shop.url | json }} }
    {%- if collection -%}
      ,{ "@type": "ListItem", "position": 2, "name": {{ collection.title | json }}, "item": {{ shop.url | append: collection.url | json }} }
    {%- elsif product.collections.first -%}
      ,{ "@type": "ListItem", "position": 2, "name": {{ product.collections.first.title | json }}, "item": {{ shop.url | append: product.collections.first.url | json }} }
    {%- endif -%}
    {%- if product -%}
      ,{ "@type": "ListItem", "position": 3, "name": {{ product.title | json }}, "item": {{ canonical_url | json }} }
    {%- endif -%}
  ]
}
</script>`,
      css: `.gpl-crumbs { font-size: 0.78rem; margin: 0.5rem 0 1rem; }
.gpl-crumbs__list { display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem; list-style: none; margin: 0; padding: 0; }
.gpl-crumbs__link { color: ${hex(v, "accent")}; text-decoration: none; }
.gpl-crumbs__link:hover { text-decoration: underline; }
.gpl-crumbs__sep { color: rgb(var(--color-foreground, 148 163 184) / 0.5); }
.gpl-crumbs__current { opacity: 0.75; }`,
      usage: `{% render 'breadcrumb' %}`,
    }),
  },
  {
    id: "cart-upsell",
    name: "Cart drawer upsell",
    description: "A 'pairs well' product card inside the cart - the highest-demand upsell pattern. Product picker in theme settings.",
    category: "Cart & checkout",
    kind: "snippet",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 40 },
      { id: "handle", label: "Product handle", type: "text", maxLength: 60 },
      { id: "accent", label: "Accent", type: "color" },
    ],
    defaults: { heading: "Complete your order", handle: "your-product-handle", accent: "#5eead4" },
    install: [
      ...snippetSteps("cart-upsell.liquid"),
      "Replace 'your-product-handle' with a real product handle, or drive it from a cart/product metafield for per-cart suggestions.",
      "Render it inside your cart drawer or cart template so it shows next to the items list.",
    ],
    files: (v) => ({
      liquid: `{%- liquid
  assign upsell = all_products[handle]
-%}
{%- if upsell != blank -%}
<div class="gpl-upsell" style="--gpl-accent: {{ accent | default: 'rgb(var(--color-button, 94 234 212))' }};">
  <p class="gpl-upsell__heading">{{ heading | default: 'Complete your order' }}</p>
  <div class="gpl-upsell__card">
    {%- if upsell.featured_image -%}
      {{ upsell.featured_image | image_url: width: 140 | image_tag: class: 'gpl-upsell__img', loading: 'lazy' }}
    {%- endif -%}
    <div class="gpl-upsell__info">
      <p class="gpl-upsell__title">{{ upsell.title }}</p>
      <p class="gpl-upsell__price">{{ upsell.price | money }}</p>
      <form method="post" action="{{ routes.cart_add_url }}">
        <input type="hidden" name="id" value="{{ upsell.selected_or_first_available_variant.id }}">
        <button type="submit" class="gpl-upsell__add">Add</button>
      </form>
    </div>
  </div>
</div>
{%- endif -%}`,
      css: `.gpl-upsell { margin: 0.75rem 0; }
.gpl-upsell__heading {
  margin: 0 0 0.5rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgb(var(--color-foreground, 100 116 139) / 0.75);
}
.gpl-upsell__card {
  display: flex;
  gap: 0.75rem;
  padding: 0.7rem;
  border: 1px solid color-mix(in srgb, var(--gpl-accent) 30%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, var(--gpl-accent) 6%, transparent);
}
.gpl-upsell__img { width: 4rem; height: 4rem; object-fit: cover; border-radius: 8px; }
.gpl-upsell__info { flex: 1; display: flex; flex-direction: column; gap: 0.15rem; }
.gpl-upsell__title { margin: 0; font-size: 0.8rem; font-weight: 700; }
.gpl-upsell__price { margin: 0; font-size: 0.75rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-upsell__add {
  margin-top: 0.35rem;
  padding: 0.4rem 1rem;
  border: 0;
  border-radius: 7px;
  background: var(--gpl-accent);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 800;
  cursor: pointer;
}`,
      usage: `{% render 'cart-upsell', heading: ${js(str(v, "heading"))}, handle: ${js(str(v, "handle"))}, accent: ${js(hex(v, "accent"))} %}`,
    }),
  },
  {
    id: "image-zoom",
    name: "Product image zoom",
    description: "Hover-to-magnify lens over a product image - the #1 action shoppers take on a product page.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "zoom", label: "Zoom level", type: "select", options: [{ value: "2", label: "2x" }, { value: "3", label: "3x" }, { value: "4", label: "4x" }] },
    ],
    defaults: { zoom: "2" },
    install: [
      ...snippetSteps("image-zoom.liquid"),
      "Wrap your main product image with this snippet, passing the media object - it reads media.preview_image automatically.",
      "On touch devices the lens follows the finger; on desktop it follows the cursor.",
    ],
    files: (v) => ({
      liquid: `<gpl-zoom class="gpl-zoom" data-zoom="${v.zoom ?? 2}">
  {%- if image -%}
    {{ image | image_url: width: 1200 | image_tag: class: 'gpl-zoom__img', loading: 'eager' }}
  {%- else -%}
    {{ product.featured_image | image_url: width: 1200 | image_tag: class: 'gpl-zoom__img', loading: 'eager' }}
  {%- endif -%}
  <span class="gpl-zoom__hint" aria-hidden="true">Hover to zoom</span>
</gpl-zoom>`,
      css: `.gpl-zoom {
  display: block;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  cursor: zoom-in;
}
.gpl-zoom__img { display: block; width: 100%; height: auto; transition: transform 0.15s ease-out; transform-origin: center; }
.gpl-zoom:hover .gpl-zoom__img { transform: scale(var(--gpl-zoom, 2)); }
.gpl-zoom__hint {
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  background: rgb(0 0 0 / 0.55);
  color: #fff;
  font-size: 0.65rem;
  pointer-events: none;
  transition: opacity 0.2s;
}
.gpl-zoom:hover .gpl-zoom__hint { opacity: 0; }`,
      js: `document.querySelectorAll('gpl-zoom').forEach((el) => {
  const img = el.querySelector('.gpl-zoom__img');
  el.style.setProperty('--gpl-zoom', el.dataset.zoom || '2');
  function move(e) {
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    img.style.transformOrigin = x + '% ' + y + '%';
  }
  el.addEventListener('mousemove', move);
  el.addEventListener('touchmove', (e) => move(e.touches[0]), { passive: true });
});`,
      usage: `{% render 'image-zoom', product: product %}`,
    }),
  },
  {
    id: "complete-the-look",
    name: "Complete the look",
    description: "2-3 product cards with a combined price and a single 'add all' button - classic AOV lift for fashion and decor.",
    category: "Cart & checkout",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 50 },
      { id: "accent", label: "Accent", type: "color" },
    ],
    defaults: { heading: "Complete the look", accent: "#5eead4" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<gpl-look class="gpl-look" style="--gpl-accent: {{ section.settings.accent }};">
  <p class="gpl-look__heading">{{ section.settings.heading }}</p>
  <div class="gpl-look__grid">
    {%- assign total = 0 -%}
    {%- for block in section.blocks -%}
      {%- assign p = block.settings.product -%}
      {%- if p != blank -%}
        {%- assign total = total | plus: p.selected_or_first_available_variant.price -%}
        <div class="gpl-look__item" data-variant="{{ p.selected_or_first_available_variant.id }}">
          {{ p.featured_image | image_url: width: 300 | image_tag: class: 'gpl-look__img', loading: 'lazy' }}
          <p class="gpl-look__title">{{ p.title }}</p>
          <p class="gpl-look__price">{{ p.price | money }}</p>
        </div>
      {%- endif -%}
    {%- endfor -%}
  </div>
  <button type="button" class="gpl-look__add" data-add-all>
    Add all - <span data-total>{{ total | money }}</span>
  </button>
</gpl-look>

{% schema %}
{
  "name": "Complete the look",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading"))} },
    { "type": "color", "id": "accent", "label": "Accent", "default": ${js(hex(v, "accent"))} }
  ],
  "blocks": [
    { "type": "product", "name": "Product", "settings": [{ "type": "product", "id": "product", "label": "Product" }] }
  ],
  "presets": [{ "name": "Complete the look" }]
}
{% endschema %}`,
      css: `.gpl-look { padding: 1.5rem 0; }
.gpl-look__heading { margin: 0 0 1rem; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-look__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr)); gap: 0.75rem; }
.gpl-look__img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 10px; }
.gpl-look__title { margin: 0.4rem 0 0; font-size: 0.75rem; font-weight: 600; }
.gpl-look__price { margin: 0.1rem 0 0; font-size: 0.7rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-look__add {
  margin-top: 1rem;
  width: 100%;
  padding: 0.8rem;
  border: 0;
  border-radius: 10px;
  background: var(--gpl-accent);
  color: #fff;
  font-weight: 800;
  font-size: 0.85rem;
  cursor: pointer;
}
.gpl-look__add.is-adding { opacity: 0.7; cursor: wait; }`,
      js: `document.querySelectorAll('gpl-look').forEach((el) => {
  el.querySelector('[data-add-all]').addEventListener('click', async (btn) => {
    const ids = [...el.querySelectorAll('.gpl-look__item')].map((i) => ({
      id: Number(i.dataset.variant), quantity: 1,
    }));
    btn.target.classList.add('is-adding');
    btn.target.textContent = 'Adding…';
    try {
      await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: ids }),
      });
      window.location.href = '/cart';
    } catch {
      btn.target.textContent = 'Could not add - try again';
    }
  });
});`,
    }),
  },
  {
    id: "cod-checker",
    name: "COD / pincode check",
    description: "Cash-on-delivery and serviceability check by pincode prefix - the #1 question on Indian stores. Enter your covered prefixes; it checks honestly.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "prefixes", label: "Covered prefixes (comma separated)", type: "text", maxLength: 200 },
      { id: "label", label: "Button label", type: "text", maxLength: 30 },
    ],
    defaults: { prefixes: "110, 400, 560, 600, 700, 500, 380, 411", label: "Check delivery" },
    install: [
      ...snippetSteps("cod-checker.liquid"),
      "Enter the pincode prefixes your courier covers - the check runs against that real list, not a fake 'always yes'.",
      "If you ship everywhere, leave the list blank and the snippet shows a plain 'COD available' badge instead.",
    ],
    files: (v) => ({
      liquid: `<gpl-cod class="gpl-cod" data-prefixes="{{ prefixes | default: '' }}">
  <div class="gpl-cod__row">
    <input type="text" inputmode="numeric" maxlength="6" class="gpl-cod__input" placeholder="Enter pincode" aria-label="Pincode">
    <button type="button" class="gpl-cod__btn">{{ label | default: 'Check' }}</button>
  </div>
  <p class="gpl-cod__result" aria-live="polite"></p>
</gpl-cod>`,
      css: `.gpl-cod { margin: 0.75rem 0; }
.gpl-cod__row { display: flex; gap: 0.5rem; }
.gpl-cod__input {
  flex: 1;
  padding: 0.6rem 0.8rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3);
  border-radius: 9px;
  background: rgb(var(--color-foreground, 148 163 184) / 0.05);
  font-size: 0.85rem;
}
.gpl-cod__btn {
  padding: 0.6rem 1.1rem;
  border: 0;
  border-radius: 9px;
  background: rgb(var(--color-button, 21 128 61));
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
}
.gpl-cod__result { margin: 0.5rem 0 0; font-size: 0.78rem; }
.gpl-cod__result.is-ok { color: #16a34a; }
.gpl-cod__result.is-no { color: #dc2626; }`,
      js: `document.querySelectorAll('gpl-cod').forEach((el) => {
  const input = el.querySelector('.gpl-cod__input');
  const out = el.querySelector('.gpl-cod__result');
  const list = (el.dataset.prefixes || '').split(',').map((s) => s.trim()).filter(Boolean);
  el.querySelector('.gpl-cod__btn').addEventListener('click', () => {
    const pin = input.value.trim();
    out.className = 'gpl-cod__result';
    if (!/^\\d{6}$/.test(pin)) { out.textContent = 'Enter a 6-digit pincode'; out.classList.add('is-no'); return; }
    if (!list.length) { out.textContent = 'Cash on delivery available'; out.classList.add('is-ok'); return; }
    const hit = list.some((p) => pin.startsWith(p));
    out.textContent = hit ? 'COD & delivery available at ' + pin : 'Delivery available - COD not covered at ' + pin;
    out.classList.add(hit ? 'is-ok' : 'is-no');
  });
});`,
      usage: `{% render 'cod-checker', prefixes: ${js(str(v, "prefixes"))}, label: ${js(str(v, "label"))} %}`,
    }),
  },
  {
    id: "ingredients-table",
    name: "Ingredients / materials breakdown",
    description: "Ingredient or materials rows with optional percentage bars - the transparency card DTC brands win on.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "items", label: "Items (name|desc|pct per line)", type: "text", maxLength: 400 },
      { id: "accent", label: "Bar colour", type: "color" },
    ],
    defaults: {
      items: "Hyaluronic acid|Deep hydration, all-day plump|2\nNiacinamide|Evens tone and texture|5\nPeptides|Firms over 4 weeks|3",
      accent: "#15803d",
    },
    install: [
      ...snippetSteps("ingredients-table.liquid"),
      "Enter one line per ingredient: name|description|percentage. Leave the third value off for no bar.",
      "For real products, drive this from a product.metafields.custom.ingredients metafield - one line per ingredient.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-ings" style="--gpl-accent: {{ accent | default: 'rgb(var(--color-button, 21 128 61))' }};">
  {%- assign rows = items | default: 'Aqua|Base ingredient|' | newline_to_br | split: '<br />' -%}
  {%- for row in rows -%}
    {%- assign parts = row | strip | split: '|' -%}
    <div class="gpl-ings__row">
      <div class="gpl-ings__top">
        <span class="gpl-ings__name">{{ parts[0] | strip }}</span>
        {%- if parts[2] != blank -%}
          <span class="gpl-ings__pct">{{ parts[2] | strip }}%</span>
        {%- endif -%}
      </div>
      {%- if parts[1] != blank -%}
        <p class="gpl-ings__desc">{{ parts[1] | strip }}</p>
      {%- endif -%}
      {%- if parts[2] != blank -%}
        <div class="gpl-ings__bar"><i style="width: {{ parts[2] | strip }}%"></i></div>
      {%- endif -%}
    </div>
  {%- endfor -%}
</div>`,
      css: `.gpl-ings { display: grid; gap: 0.6rem; }
.gpl-ings__top { display: flex; justify-content: space-between; font-size: 0.78rem; font-weight: 700; }
.gpl-ings__pct { color: var(--gpl-accent); }
.gpl-ings__desc { margin: 0.15rem 0 0; font-size: 0.72rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-ings__bar {
  height: 0.3rem;
  margin-top: 0.3rem;
  border-radius: 999px;
  background: rgb(var(--color-foreground, 148 163 184) / 0.12);
  overflow: hidden;
}
.gpl-ings__bar i {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: var(--gpl-accent);
}`,
      usage: `{% render 'ingredients-table', items: ${js(str(v, "items"))}, accent: ${js(hex(v, "accent"))} %}`,
    }),
  },
  {
    id: "ugc-grid",
    name: "Customer photos wall",
    description: "A masonry grid of customer photos with captions - UGC that converts better than stock shots.",
    category: "Trust & social proof",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 60 },
      { id: "cols", label: "Columns", type: "select", options: [{ value: "3", label: "3" }, { value: "4", label: "4" }, { value: "5", label: "5" }] },
    ],
    defaults: { heading: "Our customers, in their words and photos", cols: "4" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-ugc" style="--gpl-cols: {{ section.settings.cols }};">
  {%- if section.settings.heading != blank -%}
    <h2 class="gpl-ugc__heading">{{ section.settings.heading }}</h2>
  {%- endif -%}
  <div class="gpl-ugc__grid">
    {%- for block in section.blocks -%}
      <figure class="gpl-ugc__item" {{ block.shopify_attributes }}>
        {%- if block.settings.image -%}
          {{ block.settings.image | image_url: width: 500 | image_tag: class: 'gpl-ugc__img', loading: 'lazy' }}
        {%- endif -%}
        {%- if block.settings.caption != blank -%}
          <figcaption class="gpl-ugc__cap">{{ block.settings.caption }}</figcaption>
        {%- endif -%}
      </figure>
    {%- endfor -%}
  </div>
</div>

{% schema %}
{
  "name": "Customer photos",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading"))} },
    { "type": "range", "id": "cols", "label": "Columns", "min": 2, "max": 5, "step": 1, "default": 4 }
  ],
  "blocks": [
    {
      "type": "photo",
      "name": "Photo",
      "settings": [
        { "type": "image_picker", "id": "image", "label": "Customer photo" },
        { "type": "text", "id": "caption", "label": "Caption" }
      ]
    }
  ],
  "presets": [{ "name": "Customer photos" }]
}
{% endschema %}`,
      css: `.gpl-ugc { padding: 1.5rem 0; }
.gpl-ugc__heading { margin: 0 0 1rem; font-size: 1rem; font-weight: 800; }
.gpl-ugc__grid { display: grid; grid-template-columns: repeat(var(--gpl-cols, 4), 1fr); gap: 0.75rem; }
.gpl-ugc__item { margin: 0; border-radius: 12px; overflow: hidden; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.15); }
.gpl-ugc__img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; }
.gpl-ugc__cap { padding: 0.55rem 0.7rem; font-size: 0.7rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
@media (max-width: 640px) { .gpl-ugc__grid { grid-template-columns: repeat(2, 1fr); } }`,
    }),
  },
  {
    id: "sales-notification",
    name: "Recent sales popup",
    description: "A bottom-left 'just bought' popup cycling through real recent orders you list yourself. Only show genuine sales - fake notifications burn trust.",
    category: "Marketing",
    kind: "snippet",
    controls: [
      { id: "entries", label: "Entries (name|city|product|time per line)", type: "text", maxLength: 500 },
      { id: "interval", label: "Seconds between", type: "text", maxLength: 4 },
    ],
    defaults: {
      entries: "Riya|Pune|Organic cotton tee|8 min ago\nArjun|Delhi|Linen overshirt|14 min ago\nMeera|Jaipur|Canvas tote|22 min ago",
      interval: "8",
    },
    install: [
      ...snippetSteps("sales-notification.liquid"),
      "Fill the entries with your real recent orders - one per line: name|city|product|how long ago. Update it weekly so it stays honest.",
      "Render it once in layout/theme.liquid or a theme section so it floats on every page.",
    ],
    files: (v) => ({
      liquid: `<gpl-sales class="gpl-sales" data-interval="{{ interval | default: 8 }}" hidden>
  {%- assign rows = entries | newline_to_br | split: '<br />' -%}
  {%- for row in rows -%}
    {%- assign parts = row | strip | split: '|' -%}
    <div class="gpl-sales__card" data-i="{{ forloop.index0 }}" hidden>
      <p class="gpl-sales__text"><strong>{{ parts[0] | strip }}</strong> from {{ parts[1] | strip }} bought <strong>{{ parts[2] | strip }}</strong></p>
      <p class="gpl-sales__time">{{ parts[3] | strip }}</p>
    </div>
  {%- endfor -%}
</gpl-sales>`,
      css: `.gpl-sales {
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  z-index: 40;
  max-width: 19rem;
}
.gpl-sales__card {
  padding: 0.8rem 1rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.2);
  border-radius: 12px;
  background: rgb(var(--color-background, 255 255 255));
  box-shadow: 0 10px 30px rgb(0 0 0 / 0.15);
}
.gpl-sales__text { margin: 0; font-size: 0.75rem; line-height: 1.45; }
.gpl-sales__time { margin: 0.3rem 0 0; font-size: 0.65rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
      js: `document.querySelectorAll('gpl-sales').forEach((el) => {
  const cards = [...el.querySelectorAll('.gpl-sales__card')];
  if (!cards.length) return;
  el.hidden = false;
  let i = 0;
  function show() {
    cards.forEach((c, x) => (c.hidden = x !== i));
    i = (i + 1) % cards.length;
  }
  show();
  setInterval(show, (Number(el.dataset.interval) || 8) * 1000);
});`,
      usage: `{% render 'sales-notification', entries: ${js(str(v, "entries"))}, interval: ${js(str(v, "interval"))} %}`,
    }),
  },
  {
    id: "age-verify",
    name: "Age verification gate",
    description: "A session-gated 18+/21+ modal for age-restricted stores - remembers the visitor for the session.",
    category: "Utility",
    kind: "snippet",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 60 },
      { id: "text", label: "Message", type: "text", maxLength: 140 },
      { id: "confirm", label: "Confirm label", type: "text", maxLength: 20 },
    ],
    defaults: {
      heading: "Are you 18 or older?",
      text: "This store sells age-restricted products. Confirm your age to continue.",
      confirm: "I am 18+",
    },
    install: [
      ...snippetSteps("age-verify.liquid"),
      "Render once in layout/theme.liquid before </body> - the gate covers the whole storefront until confirmed.",
      "The visitor's choice is remembered for the session; it asks again on a new visit.",
    ],
    files: (v) => ({
      liquid: `<gpl-age class="gpl-age" hidden>
  <div class="gpl-age__box" role="dialog" aria-modal="true" aria-label="Age verification">
    <h2 class="gpl-age__title">{{ heading | default: 'Are you of legal age?' }}</h2>
    <p class="gpl-age__text">{{ text | default: 'Confirm your age to continue.' }}</p>
    <div class="gpl-age__row">
      <button type="button" class="gpl-age__yes">{{ confirm | default: 'Yes, I am' }}</button>
      <a class="gpl-age__no" href="https://www.google.com">No, leave</a>
    </div>
  </div>
</gpl-age>`,
      css: `.gpl-age {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  background: rgb(0 0 0 / 0.7);
  backdrop-filter: blur(6px);
}
.gpl-age__box {
  max-width: 24rem;
  margin: 1rem;
  padding: 2rem;
  border-radius: 16px;
  background: rgb(var(--color-background, 255 255 255));
  text-align: center;
}
.gpl-age__title { margin: 0; font-size: 1.3rem; font-weight: 800; }
.gpl-age__text { margin: 0.6rem 0 0; font-size: 0.85rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-age__row { display: flex; gap: 0.6rem; margin-top: 1.5rem; }
.gpl-age__yes {
  flex: 1;
  padding: 0.75rem;
  border: 0;
  border-radius: 10px;
  background: rgb(var(--color-button, 21 128 61));
  color: #fff;
  font-weight: 800;
  cursor: pointer;
}
.gpl-age__no {
  flex: 1;
  display: grid;
  place-items: center;
  padding: 0.75rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3);
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  font-size: 0.85rem;
}`,
      js: `document.querySelectorAll('gpl-age').forEach((el) => {
  if (sessionStorage.getItem('gpl-age-ok') === '1') return;
  el.hidden = false;
  document.body.style.overflow = 'hidden';
  el.querySelector('.gpl-age__yes').addEventListener('click', () => {
    sessionStorage.setItem('gpl-age-ok', '1');
    el.hidden = true;
    document.body.style.overflow = '';
  });
});`,
      usage: `{% render 'age-verify', heading: ${js(str(v, "heading"))}, text: ${js(str(v, "text"))}, confirm: ${js(str(v, "confirm"))} %}`,
    }),
  },
  {
    id: "store-locator",
    name: "Store locator cards",
    description: "Location cards with address, hours and a map link - for multi-location or pickup-enabled stores.",
    category: "Utility",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 60 },
    ],
    defaults: { heading: "Visit us" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-loc">
  {%- if section.settings.heading != blank -%}
    <h2 class="gpl-loc__heading">{{ section.settings.heading }}</h2>
  {%- endif -%}
  <div class="gpl-loc__grid">
    {%- for block in section.blocks -%}
      <div class="gpl-loc__card" {{ block.shopify_attributes }}>
        <p class="gpl-loc__name">{{ block.settings.name }}</p>
        <p class="gpl-loc__addr">{{ block.settings.address | newline_to_br }}</p>
        {%- if block.settings.hours != blank -%}
          <p class="gpl-loc__hours">{{ block.settings.hours }}</p>
        {%- endif -%}
        {%- if block.settings.map_url != blank -%}
          <a class="gpl-loc__map" href="{{ block.settings.map_url }}" target="_blank" rel="noopener">Directions &#8599;</a>
        {%- endif -%}
      </div>
    {%- endfor -%}
  </div>
</div>

{% schema %}
{
  "name": "Store locator",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading"))} }
  ],
  "blocks": [
    {
      "type": "location",
      "name": "Location",
      "settings": [
        { "type": "text", "id": "name", "label": "Name" },
        { "type": "textarea", "id": "address", "label": "Address" },
        { "type": "text", "id": "hours", "label": "Hours" },
        { "type": "url", "id": "map_url", "label": "Map link" }
      ]
    }
  ],
  "presets": [{ "name": "Store locator" }]
}
{% endschema %}`,
      css: `.gpl-loc { padding: 1.5rem 0; }
.gpl-loc__heading { margin: 0 0 1rem; font-size: 1rem; font-weight: 800; }
.gpl-loc__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr)); gap: 0.75rem; }
.gpl-loc__card {
  padding: 1rem 1.1rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.18);
  border-radius: 12px;
}
.gpl-loc__name { margin: 0; font-weight: 800; font-size: 0.85rem; }
.gpl-loc__addr { margin: 0.35rem 0 0; font-size: 0.75rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-loc__hours { margin: 0.35rem 0 0; font-size: 0.7rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-loc__map { display: inline-block; margin-top: 0.6rem; font-size: 0.72rem; font-weight: 700; color: rgb(var(--color-button, 21 128 61)); }`,
    }),
  },
  {
    id: "review-summary",
    name: "Review summary card",
    description: "Overall rating, review count and star-distribution bars - the card shoppers scan before reading a single review.",
    category: "Trust & social proof",
    kind: "snippet",
    controls: [
      { id: "rating", label: "Average rating", type: "text", maxLength: 3 },
      { id: "count", label: "Review count", type: "text", maxLength: 8 },
      { id: "bars", label: "5|4|3|2|1 star counts", type: "text", maxLength: 40 },
    ],
    defaults: { rating: "4.8", count: "1243", bars: "980|180|60|15|8" },
    install: [
      ...snippetSteps("review-summary.liquid"),
      "Values come from your review app - paste real counts, or drive them from product.metafields.custom.review_* metafields if your app exposes them.",
    ],
    files: (v) => ({
      liquid: `{%- assign counts = bars | default: '0|0|0|0|0' | split: '|' -%}
{%- assign total = 0 -%}
{%- for c in counts -%}{%- assign total = total | plus: c | plus: 0 -%}{%- endfor -%}
<div class="gpl-rs">
  <div class="gpl-rs__big">
    <p class="gpl-rs__num">{{ rating | default: '0.0' }}</p>
    <p class="gpl-rs__stars" aria-label="{{ rating }} out of 5 stars">
      {%- assign full = rating | plus: 0 | floor -%}
      {%- for i in (1..5) -%}{%- if i <= full -%}&#9733;{%- else -%}&#9734;{%- endif -%}{%- endfor -%}
    </p>
    <p class="gpl-rs__count">{{ count | default: '0' }} reviews</p>
  </div>
  <div class="gpl-rs__bars">
    {%- for c in counts -%}
      <div class="gpl-rs__bar">
        <span>{{ forloop.rindex }} &#9733;</span>
        <div class="gpl-rs__track"><i style="width: {% if total > 0 %}{{ c | times: 100 | divided_by: total }}{% else %}0{% endif %}%"></i></div>
        <span class="gpl-rs__n">{{ c }}</span>
      </div>
    {%- endfor -%}
  </div>
</div>`,
      css: `.gpl-rs { display: flex; gap: 1.25rem; align-items: center; }
.gpl-rs__big { text-align: center; }
.gpl-rs__num { margin: 0; font-size: 2rem; font-weight: 900; line-height: 1; }
.gpl-rs__stars { margin: 0.2rem 0 0; color: rgb(var(--color-button, 245 158 11)); font-size: 0.85rem; letter-spacing: 0.1em; }
.gpl-rs__count { margin: 0.25rem 0 0; font-size: 0.7rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-rs__bars { flex: 1; display: grid; gap: 0.3rem; }
.gpl-rs__bar { display: flex; align-items: center; gap: 0.5rem; font-size: 0.68rem; }
.gpl-rs__track { flex: 1; height: 0.35rem; border-radius: 999px; background: rgb(var(--color-foreground, 148 163 184) / 0.12); overflow: hidden; }
.gpl-rs__track i { display: block; height: 100%; border-radius: 999px; background: rgb(var(--color-button, 245 158 11)); }
.gpl-rs__n { min-width: 1.6rem; text-align: right; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
      usage: `{% render 'review-summary', rating: ${js(str(v, "rating"))}, count: ${js(str(v, "count"))}, bars: ${js(str(v, "bars"))} %}`,
    }),
  },
  {
    id: "aspect-ratings",
    name: "Attribute ratings",
    description: "Amazon-style per-attribute bars - quality, fit, value - so buyers see nuance, not just one number.",
    category: "Trust & social proof",
    kind: "snippet",
    controls: [
      { id: "items", label: "Aspects (name|score of 5 per line)", type: "text", maxLength: 200 },
      { id: "accent", label: "Bar colour", type: "color" },
    ],
    defaults: { items: "Quality|4.9\nTrue to size|4.2\nValue for money|4.6\nComfort|4.7", accent: "#15803d" },
    install: [
      ...snippetSteps("aspect-ratings.liquid"),
      "Enter real aggregated scores from your reviews - this only works if the numbers are honest.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-ar" style="--gpl-accent: {{ accent | default: 'rgb(var(--color-button, 21 128 61))' }};">
  {%- assign rows = items | newline_to_br | split: '<br />' -%}
  {%- for row in rows -%}
    {%- assign parts = row | strip | split: '|' -%}
    <div class="gpl-ar__row">
      <span class="gpl-ar__name">{{ parts[0] | strip }}</span>
      <div class="gpl-ar__track"><i style="width: {{ parts[1] | strip | plus: 0 | times: 20 }}%"></i></div>
      <span class="gpl-ar__score">{{ parts[1] | strip }}</span>
    </div>
  {%- endfor -%}
</div>`,
      css: `.gpl-ar { display: grid; gap: 0.55rem; }
.gpl-ar__row { display: flex; align-items: center; gap: 0.7rem; font-size: 0.72rem; }
.gpl-ar__name { min-width: 6.5rem; font-weight: 600; }
.gpl-ar__track { flex: 1; height: 0.35rem; border-radius: 999px; background: rgb(var(--color-foreground, 148 163 184) / 0.12); overflow: hidden; }
.gpl-ar__track i { display: block; height: 100%; border-radius: 999px; background: var(--gpl-accent); }
.gpl-ar__score { font-weight: 700; min-width: 1.8rem; }`,
      usage: `{% render 'aspect-ratings', items: ${js(str(v, "items"))}, accent: ${js(hex(v, "accent"))} %}`,
    }),
  },
  {
    id: "review-card",
    name: "Featured review card",
    description: "A single highlighted review with stars, verified badge and the buyer's name - social proof that reads like a person, not a widget.",
    category: "Trust & social proof",
    kind: "snippet",
    controls: [
      { id: "quote", label: "Review text", type: "text", maxLength: 200 },
      { id: "name", label: "Reviewer name", type: "text", maxLength: 30 },
      { id: "detail", label: "Product / variant", type: "text", maxLength: 40 },
    ],
    defaults: {
      quote: "Fits perfectly and the fabric is heavier than I expected for the price. Already ordered a second colour.",
      name: "Riya S.",
      detail: "Verified buyer - Olive, M",
    },
    install: [
      ...snippetSteps("review-card.liquid"),
      "Paste a real review from your review app - rotate featured reviews weekly so the card stays fresh.",
    ],
    files: (v) => ({
      liquid: `<figure class="gpl-rc">
  <p class="gpl-rc__stars" aria-label="5 out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
  <blockquote class="gpl-rc__quote">&ldquo;{{ quote | escape }}&rdquo;</blockquote>
  <figcaption class="gpl-rc__by">
    <span class="gpl-rc__name">{{ name | escape }}</span>
    <span class="gpl-rc__detail">{{ detail | escape }}</span>
  </figcaption>
</figure>`,
      css: `.gpl-rc {
  margin: 0.75rem 0;
  padding: 1rem 1.1rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.16);
  border-radius: 12px;
  background: rgb(var(--color-foreground, 148 163 184) / 0.04);
}
.gpl-rc__stars { margin: 0; color: rgb(var(--color-button, 245 158 11)); font-size: 0.8rem; letter-spacing: 0.12em; }
.gpl-rc__quote { margin: 0.5rem 0 0; font-size: 0.85rem; line-height: 1.55; }
.gpl-rc__by { margin-top: 0.6rem; display: flex; flex-direction: column; gap: 0.1rem; }
.gpl-rc__name { font-weight: 700; font-size: 0.75rem; }
.gpl-rc__detail { font-size: 0.65rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
      usage: `{% render 'review-card', quote: ${js(str(v, "quote"))}, name: ${js(str(v, "name"))}, detail: ${js(str(v, "detail"))} %}`,
    }),
  },
  {
    id: "press-mentions",
    name: "Press mentions bar",
    description: "An 'As featured in' strip of publication names - borrow credibility the honest way: only real mentions.",
    category: "Trust & social proof",
    kind: "section",
    controls: [
      { id: "heading", label: "Eyebrow", type: "text", maxLength: 40 },
      { id: "names", label: "Publications (comma separated)", type: "text", maxLength: 200 },
    ],
    defaults: { heading: "As featured in", names: "Vogue India, Economic Times, Mint Lifestyle, YourStory" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `{%- assign pubs = section.settings.names | split: ',' -%}
<div class="gpl-press">
  {%- if section.settings.heading != blank -%}
    <p class="gpl-press__eyebrow">{{ section.settings.heading }}</p>
  {%- endif -%}
  <ul class="gpl-press__list">
    {%- for p in pubs -%}
      <li>{{ p | strip }}</li>
    {%- endfor -%}
  </ul>
</div>

{% schema %}
{
  "name": "Press mentions",
  "settings": [
    { "type": "text", "id": "heading", "label": "Eyebrow", "default": ${js(str(v, "heading"))} },
    { "type": "text", "id": "names", "label": "Publications (comma separated)", "default": ${js(str(v, "names"))} }
  ],
  "presets": [{ "name": "Press mentions" }]
}
{% endschema %}`,
      css: `.gpl-press { padding: 1.25rem 0; text-align: center; }
.gpl-press__eyebrow {
  margin: 0 0 0.9rem;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgb(var(--color-foreground, 100 116 139) / 0.75);
}
.gpl-press__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem 2rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.gpl-press__list li {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 0.95rem;
  font-style: italic;
  color: rgb(var(--color-foreground, 100 116 139) / 0.8);
}`,
    }),
  },
  {
    id: "expert-quote",
    name: "Expert quote card",
    description: "A pull-quote with a credential - 'recommended by' authority that outperforms anonymous reviews.",
    category: "Trust & social proof",
    kind: "snippet",
    controls: [
      { id: "quote", label: "Quote", type: "text", maxLength: 200 },
      { id: "name", label: "Expert name", type: "text", maxLength: 40 },
      { id: "credential", label: "Credential", type: "text", maxLength: 60 },
    ],
    defaults: {
      quote: "The formulation is clean, the dosage is right, and the sourcing is transparent - rare at this price point.",
      name: "Dr. Ananya Rao",
      credential: "Consultant dermatologist, Bengaluru",
    },
    install: [
      ...snippetSteps("expert-quote.liquid"),
      "Only use a real quote from a real person - an invented expert endorsement is a legal problem, not a conversion trick.",
    ],
    files: (v) => ({
      liquid: `<figure class="gpl-eq">
  <div class="gpl-eq__mark" aria-hidden="true">&ldquo;</div>
  <blockquote class="gpl-eq__quote">{{ quote | escape }}</blockquote>
  <figcaption class="gpl-eq__by">
    <span class="gpl-eq__name">{{ name | escape }}</span>
    <span class="gpl-eq__cred">{{ credential | escape }}</span>
  </figcaption>
</figure>`,
      css: `.gpl-eq {
  margin: 0.75rem 0;
  padding: 1.25rem 1.4rem;
  border-left: 3px solid rgb(var(--color-button, 21 128 61));
  background: rgb(var(--color-foreground, 148 163 184) / 0.05);
  border-radius: 0 12px 12px 0;
}
.gpl-eq__mark { font-size: 2.2rem; line-height: 0.8; color: rgb(var(--color-button, 21 128 61)); }
.gpl-eq__quote { margin: 0.5rem 0 0; font-size: 0.95rem; line-height: 1.6; font-style: italic; }
.gpl-eq__by { margin-top: 0.8rem; }
.gpl-eq__name { font-weight: 700; font-size: 0.78rem; }
.gpl-eq__cred { display: block; font-size: 0.65rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
      usage: `{% render 'expert-quote', quote: ${js(str(v, "quote"))}, name: ${js(str(v, "name"))}, credential: ${js(str(v, "credential"))} %}`,
    }),
  },
  {
    id: "video-testimonial",
    name: "Video testimonial card",
    description: "A testimonial card with a video play button - 'see it in action' proof MaryRuth-style stores rely on.",
    category: "Trust & social proof",
    kind: "snippet",
    controls: [
      { id: "quote", label: "Quote", type: "text", maxLength: 160 },
      { id: "name", label: "Customer name", type: "text", maxLength: 30 },
      { id: "video", label: "Video URL (mp4/embed)", type: "text", maxLength: 200 },
    ],
    defaults: {
      quote: "Two weeks in and the difference is obvious - I bought three more for family.",
      name: "Kavita M.",
      video: "",
    },
    install: [
      ...snippetSteps("video-testimonial.liquid"),
      "Host the video on Shopify's Files (Settings > Files) or embed YouTube - paste the URL into the video setting.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-vt">
  <div class="gpl-vt__media">
    {%- if video != blank -%}
      {%- if video contains 'youtube' or video contains 'youtu.be' -%}
        <iframe class="gpl-vt__frame" src="{{ video | replace: 'watch?v=', 'embed/' }}" allowfullscreen loading="lazy"></iframe>
      {%- else -%}
        <video class="gpl-vt__frame" src="{{ video }}" controls preload="metadata"></video>
      {%- endif -%}
    {%- else -%}
      <div class="gpl-vt__placeholder" aria-hidden="true">
        <span class="gpl-vt__play">&#9654;</span>
      </div>
    {%- endif -%}
  </div>
  <div class="gpl-vt__body">
    <blockquote class="gpl-vt__quote">&ldquo;{{ quote | escape }}&rdquo;</blockquote>
    <p class="gpl-vt__name">&mdash; {{ name | escape }}</p>
  </div>
</div>`,
      css: `.gpl-vt {
  display: grid;
  gap: 0.9rem;
  padding: 1rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.16);
  border-radius: 14px;
}
@media (min-width: 560px) { .gpl-vt { grid-template-columns: 1.2fr 1fr; align-items: center; } }
.gpl-vt__frame { width: 100%; aspect-ratio: 16/9; border: 0; border-radius: 10px; background: #000; }
.gpl-vt__placeholder {
  display: grid;
  place-items: center;
  aspect-ratio: 16/9;
  border-radius: 10px;
  background: rgb(var(--color-foreground, 148 163 184) / 0.15);
}
.gpl-vt__play { font-size: 1.6rem; color: rgb(var(--color-foreground, 100 116 139) / 0.6); }
.gpl-vt__quote { margin: 0; font-size: 0.82rem; line-height: 1.55; font-style: italic; }
.gpl-vt__name { margin: 0.5rem 0 0; font-size: 0.7rem; font-weight: 700; }`,
      usage: `{% render 'video-testimonial', quote: ${js(str(v, "quote"))}, name: ${js(str(v, "name"))}, video: ${js(str(v, "video"))} %}`,
    }),
  },
  {
    id: "image-hotspots",
    name: "Shop-the-look hotspots",
    description: "Pins on a lifestyle image that link to each product in the shot - lookbook-to-cart in one tap.",
    category: "Marketing",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 50 },
      { id: "accent", label: "Pin colour", type: "color" },
    ],
    defaults: { heading: "Shop the look", accent: "#c8f542" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-hot" style="--gpl-accent: {{ section.settings.accent }};">
  {%- if section.settings.heading != blank -%}
    <h2 class="gpl-hot__heading">{{ section.settings.heading }}</h2>
  {%- endif -%}
  <div class="gpl-hot__stage">
    {%- if section.settings.image -%}
      {{ section.settings.image | image_url: width: 1400 | image_tag: class: 'gpl-hot__img', loading: 'lazy' }}
    {%- endif -%}
    {%- for block in section.blocks -%}
      {%- assign p = block.settings.product -%}
      <a class="gpl-hot__pin" style="left: {{ block.settings.x }}%; top: {{ block.settings.y }}%;" href="{{ p.url | default: '#' }}" {{ block.shopify_attributes }}>
        <span class="gpl-hot__dot"></span>
        <span class="gpl-hot__tip">{{ p.title | default: 'Product' }}<br><b>{{ p.price | default: 0 | money }}</b></span>
      </a>
    {%- endfor -%}
  </div>
</div>

{% schema %}
{
  "name": "Shop the look",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading"))} },
    { "type": "color", "id": "accent", "label": "Pin colour", "default": ${js(hex(v, "accent"))} },
    { "type": "image_picker", "id": "image", "label": "Lifestyle image" }
  ],
  "blocks": [
    {
      "type": "pin",
      "name": "Pin",
      "settings": [
        { "type": "product", "id": "product", "label": "Product" },
        { "type": "range", "id": "x", "label": "Left position %", "min": 0, "max": 100, "step": 1, "default": 50 },
        { "type": "range", "id": "y", "label": "Top position %", "min": 0, "max": 100, "step": 1, "default": 50 }
      ]
    }
  ],
  "presets": [{ "name": "Shop the look" }]
}
{% endschema %}`,
      css: `.gpl-hot { padding: 1.5rem 0; }
.gpl-hot__heading { margin: 0 0 1rem; font-size: 1rem; font-weight: 800; }
.gpl-hot__stage { position: relative; border-radius: 16px; overflow: hidden; }
.gpl-hot__img { display: block; width: 100%; }
.gpl-hot__pin { position: absolute; transform: translate(-50%, -50%); }
.gpl-hot__dot {
  display: block;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 999px;
  background: var(--gpl-accent);
  border: 2px solid #fff;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--gpl-accent) 35%, transparent);
}
.gpl-hot__tip {
  position: absolute;
  left: 50%;
  bottom: 130%;
  transform: translateX(-50%);
  padding: 0.4rem 0.7rem;
  border-radius: 8px;
  background: rgb(0 0 0 / 0.85);
  color: #fff;
  font-size: 0.65rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}
.gpl-hot__pin:hover .gpl-hot__tip { opacity: 1; }`,
    }),
  },
  {
    id: "stats-counter",
    name: "Stats counter strip",
    description: "Animated count-up numbers - orders shipped, customers, years - credibility in 3 digits.",
    category: "Marketing",
    kind: "section",
    controls: [
      { id: "items", label: "Stats (value|label per line)", type: "text", maxLength: 200 },
      { id: "accent", label: "Number colour", type: "color" },
    ],
    defaults: { items: "52,000|Orders shipped\n4.8|Average rating\n98|Repeat customers %", accent: "#5eead4" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-stats" style="--gpl-accent: {{ section.settings.accent }};">
  {%- assign rows = section.settings.items | newline_to_br | split: '<br />' -%}
  {%- for row in rows -%}
    {%- assign parts = row | strip | split: '|' -%}
    <div class="gpl-stats__item">
      <p class="gpl-stats__num" data-count="{{ parts[0] | strip }}">0</p>
      <p class="gpl-stats__label">{{ parts[1] | strip }}</p>
    </div>
  {%- endfor -%}
</div>

{% schema %}
{
  "name": "Stats counter",
  "settings": [
    { "type": "textarea", "id": "items", "label": "Stats (value|label per line)", "default": ${js(str(v, "items"))} },
    { "type": "color", "id": "accent", "label": "Number colour", "default": ${js(hex(v, "accent"))} }
  ],
  "presets": [{ "name": "Stats counter" }]
}
{% endschema %}`,
      css: `.gpl-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr)); gap: 1rem; padding: 1.25rem 0; text-align: center; }
.gpl-stats__num { margin: 0; font-size: 2rem; font-weight: 900; color: var(--gpl-accent); font-variant-numeric: tabular-nums; }
.gpl-stats__label { margin: 0.25rem 0 0; font-size: 0.7rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
      js: `document.querySelectorAll('.gpl-stats__num').forEach((el) => {
  const target = el.dataset.count || '0';
  const isNum = /^[\\d,.]+$/.test(target);
  const obs = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    obs.disconnect();
    if (!isNum) { el.textContent = target; return; }
    const end = parseFloat(target.replace(/,/g, ''));
    const t0 = performance.now();
    function tick(t) {
      const p = Math.min((t - t0) / 1200, 1);
      el.textContent = Math.round(end * p).toLocaleString('en-IN');
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, { threshold: 0.4 });
  obs.observe(el);
});`,
    }),
  },
  {
    id: "wishlist-button",
    name: "Wishlist heart button",
    description: "A save-for-later heart with a count badge - remembers picks across the visit without an app.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "label", label: "Button label", type: "text", maxLength: 30 },
    ],
    defaults: { label: "Save for later" },
    install: [
      ...snippetSteps("wishlist-button.liquid"),
      "The wishlist lives in the visitor's browser (localStorage) - no account needed, survives the visit but not devices.",
      "For a real account-based wishlist, pair with the Storefront API or an app - this is the lightweight version.",
    ],
    files: (v) => ({
      liquid: `<gpl-wish class="gpl-wish" data-product="{{ product.handle | default: 'demo' }}">
  <button type="button" class="gpl-wish__btn" aria-pressed="false">
    <svg class="gpl-wish__heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.5-1.5 3-3.3 3-5.5A5.5 5.5 0 0 0 12 4 5.5 5.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7z"/></svg>
    <span>{{ label | default: 'Save for later' }}</span>
    <span class="gpl-wish__count" data-count>0</span>
  </button>
</gpl-wish>`,
      css: `.gpl-wish__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.1rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3);
  border-radius: 999px;
  background: transparent;
  color: inherit;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.2s;
}
.gpl-wish__btn.is-saved { border-color: #e11d48; color: #e11d48; }
.gpl-wish__heart { width: 1rem; height: 1rem; }
.gpl-wish__btn.is-saved .gpl-wish__heart { fill: #e11d48; stroke: #e11d48; }
.gpl-wish__count { font-variant-numeric: tabular-nums; opacity: 0.7; }`,
      js: `document.querySelectorAll('gpl-wish').forEach((el) => {
  const KEY = 'gpl-wishlist';
  const btn = el.querySelector('.gpl-wish__btn');
  const badge = el.querySelector('[data-count]');
  const list = () => JSON.parse(localStorage.getItem(KEY) || '[]');
  const save = (l) => localStorage.setItem(KEY, JSON.stringify(l));
  function render() {
    const l = list();
    badge.textContent = l.length;
    btn.classList.toggle('is-saved', l.includes(el.dataset.product));
  }
  btn.addEventListener('click', () => {
    const l = list();
    const i = l.indexOf(el.dataset.product);
    if (i >= 0) l.splice(i, 1); else l.push(el.dataset.product);
    save(l);
    render();
  });
  render();
});`,
      usage: `{% render 'wishlist-button', product: product, label: ${js(str(v, "label"))} %}`,
    }),
  },
  {
    id: "faq-schema",
    name: "FAQ + JSON-LD schema",
    description: "An FAQ accordion that also emits FAQPage structured data - eligibility for Google's rich FAQ snippets.",
    category: "Marketing",
    kind: "section",
    controls: [
      { id: "items", label: "Q&A (question|answer per line)", type: "text", maxLength: 500 },
    ],
    defaults: {
      items: "Do you ship pan-India?|Yes - dispatch in 24h, delivery 3-6 business days.|Is COD available?|On most pincodes - check the COD checker on the product page.|What is the return window?|7-day easy returns, refund to source account.",
    },
    install: [
      ...sectionSteps,
      "Only include Q&A that are actually on the page - Google ignores schema for hidden content.",
    ],
    files: (v) => ({
      liquid: `{%- assign rows = section.settings.items | newline_to_br | split: '<br />' -%}
<div class="gpl-faqs">
  {%- for row in rows -%}
    {%- assign parts = row | strip | split: '|' -%}
    <details class="gpl-faqs__item">
      <summary>{{ parts[0] | strip }}</summary>
      <p>{{ parts[1] | strip }}</p>
    </details>
  {%- endfor -%}
</div>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {%- for row in rows -%}
      {%- assign parts = row | strip | split: '|' -%}
      { "@type": "Question", "name": {{ parts[0] | strip | json }}, "acceptedAnswer": { "@type": "Answer", "text": {{ parts[1] | strip | json }} } }{% unless forloop.last %},{% endunless %}
    {%- endfor -%}
  ]
}
</script>

{% schema %}
{
  "name": "FAQ + schema",
  "settings": [
    { "type": "textarea", "id": "items", "label": "Q&A (question|answer per line)", "default": ${js(str(v, "items"))} }
  ],
  "presets": [{ "name": "FAQ + schema" }]
}
{% endschema %}`,
      css: `.gpl-faqs__item { border-bottom: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.18); padding: 0.8rem 0; }
.gpl-faqs__item summary { cursor: pointer; font-weight: 600; font-size: 0.85rem; list-style: none; }
.gpl-faqs__item summary::-webkit-details-marker { display: none; }
.gpl-faqs__item p { margin: 0.5rem 0 0; font-size: 0.78rem; color: rgb(var(--color-foreground, 100 116 139) / 0.8); }`,
    }),
  },
  {
    id: "image-with-text",
    name: "Image + text split",
    description: "The single most-installed section type - image one side, copy + CTA the other, desktop/mobile stacked.",
    category: "Content",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 60 },
      { id: "text", label: "Text", type: "text", maxLength: 240 },
      { id: "flip", label: "Image right", type: "toggle" },
    ],
    defaults: { heading: "Built for everyday wear", text: "Cut from heavyweight organic cotton, pre-shrunk and garment-washed so it keeps its shape wash after wash.", flip: false },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-iwt${on(v, "flip") ? " gpl-iwt--flip" : ""}">
  <div class="gpl-iwt__media">
    {%- if section.settings.image -%}
      {{ section.settings.image | image_url: width: 900 | image_tag: class: 'gpl-iwt__img', loading: 'lazy' }}
    {%- endif -%}
  </div>
  <div class="gpl-iwt__body">
    <h2 class="gpl-iwt__heading">{{ section.settings.heading }}</h2>
    <p class="gpl-iwt__text">{{ section.settings.text }}</p>
    {%- if section.settings.cta != blank -%}
      <a class="gpl-iwt__btn" href="{{ section.settings.link }}">{{ section.settings.cta }}</a>
    {%- endif -%}
  </div>
</div>

{% schema %}
{
  "name": "Image with text",
  "settings": [
    { "type": "image_picker", "id": "image", "label": "Image" },
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading"))} },
    { "type": "textarea", "id": "text", "label": "Text", "default": ${js(str(v, "text"))} },
    { "type": "text", "id": "cta", "label": "Button label" },
    { "type": "url", "id": "link", "label": "Button link" },
    { "type": "checkbox", "id": "flip", "label": "Image on right", "default": false }
  ],
  "presets": [{ "name": "Image with text" }]
}
{% endschema %}`,
      css: `.gpl-iwt { display: grid; gap: 1.5rem; align-items: center; padding: 1.5rem 0; }
@media (min-width: 750px) {
  .gpl-iwt { grid-template-columns: 1fr 1fr; gap: 3rem; }
  .gpl-iwt--flip .gpl-iwt__media { order: 2; }
}
.gpl-iwt__img { width: 100%; border-radius: 14px; display: block; }
.gpl-iwt__heading { margin: 0; font-size: 1.5rem; font-weight: 800; }
.gpl-iwt__text { margin: 0.75rem 0 0; color: rgb(var(--color-foreground, 100 116 139) / 0.8); line-height: 1.6; }
.gpl-iwt__btn {
  display: inline-block;
  margin-top: 1.25rem;
  padding: 0.75rem 1.75rem;
  border-radius: 999px;
  background: rgb(var(--color-button, 15 23 42));
  color: rgb(var(--color-button-text, 255 255 255));
  text-decoration: none;
  font-weight: 700;
}`,
    }),
  },
  {
    id: "feature-icons",
    name: "Feature icon row",
    description: "Multicolumn icon + title + caption grid - the 'why us' strip on almost every winning homepage.",
    category: "Content",
    kind: "section",
    controls: [
      { id: "items", label: "Features (title|caption per line)", type: "text", maxLength: 400 },
      { id: "accent", label: "Icon colour", type: "color" },
    ],
    defaults: {
      items: "Free shipping|On all prepaid orders\n7-day returns|No questions asked\nSecure checkout|UPI, cards & wallets\nMade in India|Small-batch production",
      accent: "#15803d",
    },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-icons" style="--gpl-accent: {{ section.settings.accent }};">
  {%- assign rows = section.settings.items | newline_to_br | split: '<br />' -%}
  {%- for row in rows -%}
    {%- assign parts = row | strip | split: '|' -%}
    <div class="gpl-icons__item">
      <svg class="gpl-icons__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
      <p class="gpl-icons__title">{{ parts[0] | strip }}</p>
      {%- if parts[1] != blank -%}
        <p class="gpl-icons__cap">{{ parts[1] | strip }}</p>
      {%- endif -%}
    </div>
  {%- endfor -%}
</div>

{% schema %}
{
  "name": "Feature icons",
  "settings": [
    { "type": "textarea", "id": "items", "label": "Features (title|caption per line)", "default": ${js(str(v, "items"))} },
    { "type": "color", "id": "accent", "label": "Icon colour", "default": ${js(hex(v, "accent"))} }
  ],
  "presets": [{ "name": "Feature icons" }]
}
{% endschema %}`,
      css: `.gpl-icons { display: grid; grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr)); gap: 1.25rem; padding: 1.5rem 0; text-align: center; }
.gpl-icons__icon { width: 1.6rem; height: 1.6rem; color: var(--gpl-accent); margin: 0 auto; }
.gpl-icons__title { margin: 0.5rem 0 0; font-size: 0.82rem; font-weight: 700; }
.gpl-icons__cap { margin: 0.25rem 0 0; font-size: 0.7rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
    }),
  },
  {
    id: "product-scroller",
    name: "Horizontal product scroller",
    description: "A swipeable row of product cards - featured collection without the grid layout.",
    category: "Content",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 50 },
    ],
    defaults: { heading: "You may also like" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-scroller">
  <p class="gpl-scroller__heading">{{ section.settings.heading }}</p>
  <div class="gpl-scroller__track">
    {%- assign col = section.settings.collection | default: collections.all -%}
    {%- for p in col.products limit: 8 -%}
      <a class="gpl-scroller__card" href="{{ p.url }}">
        {{ p.featured_image | image_url: width: 400 | image_tag: class: 'gpl-scroller__img', loading: 'lazy' }}
        <p class="gpl-scroller__title">{{ p.title }}</p>
        <p class="gpl-scroller__price">{{ p.price | money }}</p>
      </a>
    {%- endfor -%}
  </div>
</div>

{% schema %}
{
  "name": "Product scroller",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading"))} },
    { "type": "collection", "id": "collection", "label": "Collection" }
  ],
  "presets": [{ "name": "Product scroller" }]
}
{% endschema %}`,
      css: `.gpl-scroller { padding: 1.5rem 0; }
.gpl-scroller__heading { margin: 0 0 1rem; font-size: 1rem; font-weight: 800; }
.gpl-scroller__track {
  display: flex;
  gap: 0.9rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 0.5rem;
  -webkit-overflow-scrolling: touch;
}
.gpl-scroller__card {
  flex: 0 0 9.5rem;
  scroll-snap-align: start;
  text-decoration: none;
  color: inherit;
}
.gpl-scroller__img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 12px; display: block; }
.gpl-scroller__title { margin: 0.5rem 0 0; font-size: 0.75rem; font-weight: 600; }
.gpl-scroller__price { margin: 0.15rem 0 0; font-size: 0.72rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
    }),
  },
  {
    id: "story-slider",
    name: "Story circles slider",
    description: "Instagram-style circular story links - tap-through categories that feel native to shoppers.",
    category: "Headers & navigation",
    kind: "section",
    controls: [
      { id: "items", label: "Circles (label|collection per line)", type: "text", maxLength: 200 },
    ],
    defaults: { items: "New in|new-arrivals\nBestsellers|bestsellers\nSale|sale\nUnder \u20b9999|under-999\nSets|sets" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-stories">
  {%- assign rows = section.settings.items | newline_to_br | split: '<br />' -%}
  {%- for row in rows -%}
    {%- assign parts = row | strip | split: '|' -%}
    <a class="gpl-stories__item" href="{{ routes.collections_url }}/{{ parts[1] | strip | handleize }}">
      <span class="gpl-stories__ring">
        <span class="gpl-stories__letter">{{ parts[0] | strip | slice: 0 }}</span>
      </span>
      <span class="gpl-stories__label">{{ parts[0] | strip }}</span>
    </a>
  {%- endfor -%}
</div>

{% schema %}
{
  "name": "Story circles",
  "settings": [
    { "type": "textarea", "id": "items", "label": "Circles (label|collection per line)", "default": ${js(str(v, "items"))} }
  ],
  "presets": [{ "name": "Story circles" }]
}
{% endschema %}`,
      css: `.gpl-stories { display: flex; gap: 1rem; overflow-x: auto; padding: 1rem 0.5rem; scrollbar-width: none; }
.gpl-stories::-webkit-scrollbar { display: none; }
.gpl-stories__item { display: flex; flex-direction: column; align-items: center; gap: 0.4rem; text-decoration: none; color: inherit; flex: 0 0 auto; }
.gpl-stories__ring {
  display: grid;
  place-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 999px;
  border: 2px solid rgb(var(--color-button, 21 128 61));
  padding: 0.2rem;
}
.gpl-stories__letter {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: rgb(var(--color-foreground, 148 163 184) / 0.12);
  font-weight: 800;
  font-size: 1.2rem;
}
.gpl-stories__label { font-size: 0.62rem; font-weight: 600; }`,
    }),
  },
  {
    id: "bulk-order",
    name: "B2B quick-order table",
    description: "Variant rows with quantity inputs and one 'add all' - the $31 section B2B and wholesale stores pay for.",
    category: "Cart & checkout",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 50 },
    ],
    defaults: { heading: "Quick order" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<gpl-bulk class="gpl-bulk">
  <p class="gpl-bulk__heading">{{ section.settings.heading }}</p>
  {%- assign p = section.settings.product -%}
  {%- if p -%}
    <table class="gpl-bulk__table">
      <thead><tr><th>Variant</th><th>Price</th><th>Qty</th></tr></thead>
      <tbody>
        {%- for variant in p.variants -%}
          <tr>
            <td>{{ variant.title }}{% unless variant.available %} <em>(sold out)</em>{% endunless %}</td>
            <td>{{ variant.price | money }}</td>
            <td><input type="number" min="0" value="0" data-variant="{{ variant.id }}" {% unless variant.available %}disabled{% endunless %}></td>
          </tr>
        {%- endfor -%}
      </tbody>
    </table>
    <button type="button" class="gpl-bulk__add" data-bulk-add>Add to cart</button>
  {%- else -%}
    <p class="gpl-bulk__hint">Pick a product in the section settings.</p>
  {%- endif -%}
</gpl-bulk>

{% schema %}
{
  "name": "Quick order",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading"))} },
    { "type": "product", "id": "product", "label": "Product" }
  ],
  "presets": [{ "name": "Quick order" }]
}
{% endschema %}`,
      css: `.gpl-bulk { padding: 1.5rem 0; }
.gpl-bulk__heading { margin: 0 0 1rem; font-size: 1rem; font-weight: 800; }
.gpl-bulk__table { width: 100%; border-collapse: collapse; font-size: 0.78rem; }
.gpl-bulk__table th { text-align: left; padding: 0.5rem; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.06em; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-bulk__table td { padding: 0.5rem; border-top: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.18); }
.gpl-bulk__table input {
  width: 4rem;
  padding: 0.35rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3);
  border-radius: 7px;
}
.gpl-bulk__add {
  margin-top: 1rem;
  padding: 0.75rem 1.75rem;
  border: 0;
  border-radius: 10px;
  background: rgb(var(--color-button, 15 23 42));
  color: rgb(var(--color-button-text, 255 255 255));
  font-weight: 800;
  cursor: pointer;
}`,
      js: `document.querySelectorAll('gpl-bulk').forEach((el) => {
  el.querySelector('[data-bulk-add]').addEventListener('click', async () => {
    const items = [...el.querySelectorAll('input[data-variant]')]
      .map((i) => ({ id: Number(i.dataset.variant), quantity: Number(i.value) }))
      .filter((i) => i.quantity > 0);
    if (!items.length) return;
    await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });
    window.location.href = '/cart';
  });
});`,
    }),
  },
  {
    id: "timeline",
    name: "Process / story timeline",
    description: "Numbered steps down a vertical line - 'how it works', brand story or delivery process.",
    category: "Content",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 50 },
      { id: "items", label: "Steps (title|caption per line)", type: "text", maxLength: 400 },
      { id: "accent", label: "Dot colour", type: "color" },
    ],
    defaults: {
      heading: "From our workshop to your door",
      items: "Order placed|Cut and packed within 24 hours\nShips|Traced courier, tracking shared instantly\nDelivered|3-6 business days, COD or prepaid\nAfter the sale|7-day returns, real support on WhatsApp",
      accent: "#5eead4",
    },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-tl" style="--gpl-accent: {{ section.settings.accent }};">
  {%- if section.settings.heading != blank -%}
    <h2 class="gpl-tl__heading">{{ section.settings.heading }}</h2>
  {%- endif -%}
  <ol class="gpl-tl__list">
    {%- assign rows = section.settings.items | newline_to_br | split: '<br />' -%}
    {%- for row in rows -%}
      {%- assign parts = row | strip | split: '|' -%}
      <li class="gpl-tl__step">
        <span class="gpl-tl__num">{{ forloop.index }}</span>
        <div>
          <p class="gpl-tl__title">{{ parts[0] | strip }}</p>
          <p class="gpl-tl__cap">{{ parts[1] | strip }}</p>
        </div>
      </li>
    {%- endfor -%}
  </ol>
</div>

{% schema %}
{
  "name": "Timeline",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading"))} },
    { "type": "textarea", "id": "items", "label": "Steps (title|caption per line)", "default": ${js(str(v, "items"))} },
    { "type": "color", "id": "accent", "label": "Dot colour", "default": ${js(hex(v, "accent"))} }
  ],
  "presets": [{ "name": "Timeline" }]
}
{% endschema %}`,
      css: `.gpl-tl { padding: 1.5rem 0; }
.gpl-tl__heading { margin: 0 0 1.25rem; font-size: 1rem; font-weight: 800; }
.gpl-tl__list { margin: 0; padding: 0; list-style: none; }
.gpl-tl__step {
  display: flex;
  gap: 1rem;
  padding-bottom: 1.5rem;
  position: relative;
}
.gpl-tl__step:last-child { padding-bottom: 0; }
.gpl-tl__step::before {
  content: "";
  position: absolute;
  left: 0.85rem;
  top: 1.9rem;
  bottom: 0;
  width: 2px;
  background: rgb(var(--color-foreground, 148 163 184) / 0.2);
}
.gpl-tl__step:last-child::before { display: none; }
.gpl-tl__num {
  display: grid;
  place-items: center;
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 999px;
  background: var(--gpl-accent);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 800;
  flex-shrink: 0;
}
.gpl-tl__title { margin: 0; font-weight: 700; font-size: 0.82rem; }
.gpl-tl__cap { margin: 0.25rem 0 0; font-size: 0.72rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
    }),
  },
  {
    id: "rating-strip",
    name: "Rating strip near title",
    description: "A single line under the product title - stars, count, 'read reviews' anchor link. Small, high-impact.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "rating", label: "Rating", type: "text", maxLength: 3 },
      { id: "count", label: "Review count", type: "text", maxLength: 8 },
    ],
    defaults: { rating: "4.8", count: "1243" },
    install: [
      ...snippetSteps("rating-strip.liquid"),
      "Render it right under the product title in the main-product section - shoppers decide in the first scroll.",
    ],
    files: (v) => ({
      liquid: `<a class="gpl-rate" href="#reviews" aria-label="Rated {{ rating }} out of 5 - read reviews">
  <span class="gpl-rate__stars">
    {%- assign full = rating | plus: 0 | floor -%}
    {%- for i in (1..5) -%}{%- if i <= full -%}&#9733;{%- else -%}&#9734;{%- endif -%}{%- endfor -%}
  </span>
  <span class="gpl-rate__num">{{ rating }}</span>
  <span class="gpl-rate__count">{{ count }} reviews</span>
</a>`,
      css: `.gpl-rate {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  text-decoration: none;
  color: inherit;
  font-size: 0.75rem;
}
.gpl-rate__stars { color: rgb(var(--color-button, 245 158 11)); letter-spacing: 0.1em; font-size: 0.8rem; }
.gpl-rate__num { font-weight: 800; }
.gpl-rate__count { color: rgb(var(--color-foreground, 100 116 139) / 0.75); text-decoration: underline; }`,
      usage: `{% render 'rating-strip', rating: ${js(str(v, "rating"))}, count: ${js(str(v, "count"))} %}`,
    }),
  },
  {
    id: "bundle-save",
    name: "Bundle & save offer",
    description: "'Buy these two together, save X' with a savings pill - the simplest AOV lift that works.",
    category: "Cart & checkout",
    kind: "snippet",
    controls: [
      { id: "handle", label: "Second product handle", type: "text", maxLength: 60 },
      { id: "save", label: "Savings text", type: "text", maxLength: 20 },
    ],
    defaults: { handle: "your-product-handle", save: "Save ₹200" },
    install: [
      ...snippetSteps("bundle-save.liquid"),
      "Render inside the product template - pick a genuinely complementary product, not a random upsell.",
    ],
    files: (v) => ({
      liquid: `{%- assign other = all_products[handle] -%}
{%- if other -%}
<div class="gpl-bundle">
  <p class="gpl-bundle__heading">Bundle &amp; save</p>
  <div class="gpl-bundle__row">
    <span class="gpl-bundle__item">This product</span>
    <span class="gpl-bundle__plus">+</span>
    <span class="gpl-bundle__item">{{ other.title }}</span>
    <span class="gpl-bundle__save">{{ save | default: 'Save' }}</span>
  </div>
  <button type="button" class="gpl-bundle__add" data-bundle data-v1="{{ product.selected_or_first_available_variant.id }}" data-v2="{{ other.selected_or_first_available_variant.id }}">
    Add both - <span>{{ product.price | plus: other.price | money }}</span>
  </button>
</div>
{%- endif -%}`,
      css: `.gpl-bundle { margin: 0.75rem 0; padding: 1rem; border: 1px dashed rgb(var(--color-button, 21 128 61) / 0.5); border-radius: 12px; background: rgb(var(--color-button, 21 128 61) / 0.05); }
.gpl-bundle__heading { margin: 0 0 0.6rem; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgb(var(--color-button, 21 128 61)); }
.gpl-bundle__row { display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem; font-size: 0.75rem; }
.gpl-bundle__plus { font-weight: 800; opacity: 0.5; }
.gpl-bundle__save {
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: rgb(var(--color-button, 21 128 61));
  color: #fff;
  font-size: 0.62rem;
  font-weight: 800;
}
.gpl-bundle__add {
  margin-top: 0.8rem;
  width: 100%;
  padding: 0.75rem;
  border: 0;
  border-radius: 10px;
  background: rgb(var(--color-button, 15 23 42));
  color: rgb(var(--color-button-text, 255 255 255));
  font-weight: 800;
  font-size: 0.82rem;
  cursor: pointer;
}`,
      js: `document.querySelectorAll('[data-bundle]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [
        { id: Number(btn.dataset.v1), quantity: 1 },
        { id: Number(btn.dataset.v2), quantity: 1 },
      ]}),
    });
    window.location.href = '/cart';
  });
});`,
      usage: `{% render 'bundle-save', product: product, handle: ${js(str(v, "handle"))}, save: ${js(str(v, "save"))} %}`,
    }),
  },
  {
    id: "newsletter-discount",
    name: "Newsletter + discount note",
    description: "Email signup with an honest incentive line - converts better than a bare 'subscribe' field.",
    category: "Marketing",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 60 },
      { id: "offer", label: "Incentive line", type: "text", maxLength: 80 },
    ],
    defaults: { heading: "Get 10% off your first order", offer: "Plus early access to drops and restocks. No spam - one useful email a week." },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-news">
  <h2 class="gpl-news__heading">{{ section.settings.heading }}</h2>
  {%- if section.settings.offer != blank -%}
    <p class="gpl-news__offer">{{ section.settings.offer }}</p>
  {%- endif -%}
  {%- form 'customer', class: 'gpl-news__form' -%}
    <input type="hidden" name="contact[tags]" value="newsletter">
    <input type="email" name="contact[email]" class="gpl-news__input" placeholder="Your email" required>
    <button type="submit" class="gpl-news__btn">Subscribe</button>
  {%- endform -%}
</div>

{% schema %}
{
  "name": "Newsletter",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading"))} },
    { "type": "text", "id": "offer", "label": "Incentive line", "default": ${js(str(v, "offer"))} }
  ],
  "presets": [{ "name": "Newsletter" }]
}
{% endschema %}`,
      css: `.gpl-news { padding: 2rem 0; text-align: center; }
.gpl-news__heading { margin: 0; font-size: 1.3rem; font-weight: 800; }
.gpl-news__offer { margin: 0.5rem auto 0; max-width: 30rem; font-size: 0.8rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-news__form { display: flex; gap: 0.5rem; max-width: 26rem; margin: 1.25rem auto 0; }
.gpl-news__input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3);
  border-radius: 10px;
  background: transparent;
  font-size: 0.85rem;
}
.gpl-news__btn {
  padding: 0.75rem 1.5rem;
  border: 0;
  border-radius: 10px;
  background: rgb(var(--color-button, 15 23 42));
  color: rgb(var(--color-button-text, 255 255 255));
  font-weight: 800;
  cursor: pointer;
}`,
    }),
  },
  {
    id: "video-banner",
    name: "Video banner hero",
    description: "Full-width video or YouTube background hero - motion sells, and most themes ship static banners only.",
    category: "Content",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 60 },
      { id: "sub", label: "Subheading", type: "text", maxLength: 100 },
    ],
    defaults: { heading: "Made to move with you", sub: "See the collection in action" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-vb">
  <div class="gpl-vb__media">
    {%- if section.settings.video != blank -%}
      <video class="gpl-vb__vid" src="{{ section.settings.video }}" autoplay muted loop playsinline poster="{{ section.settings.image | image_url: width: 1600 }}"></video>
    {%- elsif section.settings.image -%}
      {{ section.settings.image | image_url: width: 1600 | image_tag: class: 'gpl-vb__vid', loading: 'eager' }}
    {%- endif -%}
    <div class="gpl-vb__overlay"></div>
  </div>
  <div class="gpl-vb__body">
    <h2 class="gpl-vb__heading">{{ section.settings.heading }}</h2>
    {%- if section.settings.sub != blank -%}
      <p class="gpl-vb__sub">{{ section.settings.sub }}</p>
    {%- endif -%}
    {%- if section.settings.cta != blank -%}
      <a class="gpl-vb__btn" href="{{ section.settings.link }}">{{ section.settings.cta }}</a>
    {%- endif -%}
  </div>
</div>

{% schema %}
{
  "name": "Video banner",
  "settings": [
    { "type": "video", "id": "video", "label": "Video" },
    { "type": "image_picker", "id": "image", "label": "Fallback image" },
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading"))} },
    { "type": "text", "id": "sub", "label": "Subheading", "default": ${js(str(v, "sub"))} },
    { "type": "text", "id": "cta", "label": "Button label" },
    { "type": "url", "id": "link", "label": "Button link" }
  ],
  "presets": [{ "name": "Video banner" }]
}
{% endschema %}`,
      css: `.gpl-vb { position: relative; border-radius: 16px; overflow: hidden; }
.gpl-vb__media { aspect-ratio: 21/9; }
.gpl-vb__vid { width: 100%; height: 100%; object-fit: cover; display: block; }
.gpl-vb__overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgb(0 0 0 / 0.6), transparent 60%); }
.gpl-vb__body { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: flex-end; padding: 2rem; color: #fff; }
.gpl-vb__heading { margin: 0; font-size: 1.8rem; font-weight: 800; }
.gpl-vb__sub { margin: 0.4rem 0 0; opacity: 0.9; }
.gpl-vb__btn {
  display: inline-block;
  margin-top: 1.25rem;
  align-self: flex-start;
  padding: 0.75rem 1.75rem;
  border-radius: 999px;
  background: #fff;
  color: #111;
  text-decoration: none;
  font-weight: 700;
}`,
    }),
  },
  {
    id: "testimonial-wall",
    name: "Testimonial wall",
    description: "A masonry grid of short customer quotes - more convincing than one polished testimonial.",
    category: "Trust & social proof",
    kind: "section",
    controls: [
      { id: "items", label: "Quotes (text|name per line)", type: "text", maxLength: 600 },
    ],
    defaults: {
      items: "Quality is genuinely better than the photos|Riya S.\nOrdered Tuesday, delivered Friday|Arjun K.\nSecond purchase this month|Meera D.\nThe size chart was spot on|Dev P.\nPackaging felt premium|Sana W.\nCOD worked perfectly|Kabir M.",
    },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-wall">
  {%- assign rows = section.settings.items | newline_to_br | split: '<br />' -%}
  {%- for row in rows -%}
    {%- assign parts = row | strip | split: '|' -%}
    <figure class="gpl-wall__card">
      <blockquote class="gpl-wall__quote">&ldquo;{{ parts[0] | strip }}&rdquo;</blockquote>
      <figcaption class="gpl-wall__name">{{ parts[1] | strip }}</figcaption>
    </figure>
  {%- endfor -%}
</div>

{% schema %}
{
  "name": "Testimonial wall",
  "settings": [
    { "type": "textarea", "id": "items", "label": "Quotes (text|name per line)", "default": ${js(str(v, "items"))} }
  ],
  "presets": [{ "name": "Testimonial wall" }]
}
{% endschema %}`,
      css: `.gpl-wall { columns: 3; column-gap: 1rem; padding: 1.5rem 0; }
@media (max-width: 750px) { .gpl-wall { columns: 1; } }
@media (min-width: 750px) and (max-width: 1024px) { .gpl-wall { columns: 2; } }
.gpl-wall__card {
  break-inside: avoid;
  margin: 0 0 1rem;
  padding: 1rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.16);
  border-radius: 12px;
  background: rgb(var(--color-foreground, 148 163 184) / 0.04);
}
.gpl-wall__quote { margin: 0; font-size: 0.82rem; line-height: 1.55; }
.gpl-wall__name { margin-top: 0.6rem; font-size: 0.68rem; font-weight: 700; }`,
    }),
  },
  {
    id: "collapsible-details",
    name: "Collapsible product details",
    description: "Metafield-driven accordion - materials, care, sizing, shipping - keeps the PDP clean and scannable.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "items", label: "Sections (title|content per line)", type: "text", maxLength: 500 },
    ],
    defaults: {
      items: "Materials|100% organic cotton, 240 GSM\nCare|Machine wash cold, tumble dry low\nShipping|Dispatched in 24h, 3-6 day delivery\nReturns|7-day easy returns",
    },
    install: [
      ...snippetSteps("collapsible-details.liquid"),
      "For real catalogs, drive the rows from product.metafields.custom.details - one line per detail.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-cd2">
  {%- assign rows = items | newline_to_br | split: '<br />' -%}
  {%- for row in rows -%}
    {%- assign parts = row | strip | split: '|' -%}
    <details class="gpl-cd2__item">
      <summary>{{ parts[0] | strip }}<span class="gpl-cd2__chev">+</span></summary>
      <p class="gpl-cd2__content">{{ parts[1] | strip }}</p>
    </details>
  {%- endfor -%}
</div>`,
      css: `.gpl-cd2__item { border-bottom: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.18); }
.gpl-cd2__item summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 0;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 600;
  list-style: none;
}
.gpl-cd2__item summary::-webkit-details-marker { display: none; }
.gpl-cd2__chev { font-size: 1rem; transition: transform 0.2s; }
.gpl-cd2__item[open] .gpl-cd2__chev { transform: rotate(45deg); }
.gpl-cd2__content { margin: 0 0 0.9rem; font-size: 0.78rem; color: rgb(var(--color-foreground, 100 116 139) / 0.8); line-height: 1.6; }`,
      usage: `{% render 'collapsible-details', items: ${js(str(v, "items"))} %}`,
    }),
  },
  {
    id: "usp-under-atc",
    name: "USP icons under buy button",
    description: "Three micro-benefits under Add to Cart - the last thing a shopper sees before deciding.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "items", label: "USPs (one per line)", type: "text", maxLength: 120 },
    ],
    defaults: { items: "Ships in 24h\nCOD available\n7-day returns" },
    install: [
      ...snippetSteps("usp-under-atc.liquid"),
      "Render directly under the buy buttons in the main-product section - placement is the whole point.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-usp">
  {%- assign rows = items | newline_to_br | split: '<br />' -%}
  {%- for row in rows -%}
    <span class="gpl-usp__item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
      {{ row | strip }}
    </span>
  {%- endfor -%}
</div>`,
      css: `.gpl-usp { display: flex; flex-wrap: wrap; gap: 0.4rem 1rem; margin-top: 0.6rem; }
.gpl-usp__item { display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.68rem; color: rgb(var(--color-foreground, 100 116 139) / 0.85); }
.gpl-usp__item svg { width: 0.8rem; height: 0.8rem; color: #16a34a; flex-shrink: 0; }`,
      usage: `{% render 'usp-under-atc', items: ${js(str(v, "items"))} %}`,
    }),
  },
  {
    id: "vs-competitor",
    name: "Us vs them table",
    description: "A two-column comparison against 'other brands' - frame the choice honestly.",
    category: "Product page",
    kind: "section",
    controls: [
      { id: "items", label: "Points (us|them per line)", type: "text", maxLength: 400 },
      { id: "brand", label: "Our column header", type: "text", maxLength: 30 },
    ],
    defaults: {
      items: "7-day easy returns|Complicated RMA\nCOD on most pincodes|Prepaid only\nShips in 24h|3-5 day dispatch\nReal WhatsApp support|Ticket-only",
      brand: "Us",
    },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-vs">
  <div class="gpl-vs__head">
    <span></span><span class="gpl-vs__us">{{ section.settings.brand }}</span><span class="gpl-vs__them">Others</span>
  </div>
  {%- assign rows = section.settings.items | newline_to_br | split: '<br />' -%}
  {%- for row in rows -%}
    {%- assign parts = row | strip | split: '|' -%}
    <div class="gpl-vs__row">
      <span class="gpl-vs__point">{{ parts[0] | strip }}</span>
      <span class="gpl-vs__yes">&#10003;</span>
      <span class="gpl-vs__no">{{ parts[1] | strip }}</span>
    </div>
  {%- endfor -%}
</div>

{% schema %}
{
  "name": "Us vs others",
  "settings": [
    { "type": "text", "id": "brand", "label": "Our column header", "default": ${js(str(v, "brand"))} },
    { "type": "textarea", "id": "items", "label": "Points (us|them per line)", "default": ${js(str(v, "items"))} }
  ],
  "presets": [{ "name": "Us vs others" }]
}
{% endschema %}`,
      css: `.gpl-vs { padding: 1.5rem 0; }
.gpl-vs__head { display: grid; grid-template-columns: 1.4fr 0.7fr 1fr; gap: 0.5rem; padding: 0.6rem 0.8rem; font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }
.gpl-vs__us { color: #16a34a; }
.gpl-vs__row {
  display: grid;
  grid-template-columns: 1.4fr 0.7fr 1fr;
  gap: 0.5rem;
  padding: 0.7rem 0.8rem;
  border-top: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.18);
  font-size: 0.75rem;
  align-items: center;
}
.gpl-vs__yes { color: #16a34a; font-weight: 800; }
.gpl-vs__no { color: rgb(var(--color-foreground, 100 116 139) / 0.7); font-size: 0.72rem; }`,
    }),
  },
  {
    id: "gallery-grid",
    name: "Photo gallery grid",
    description: "A clean responsive photo grid - lookbook, room inspo, product-in-context shots.",
    category: "Content",
    kind: "section",
    controls: [
      { id: "cols", label: "Columns", type: "select", options: [{ value: "2", label: "2" }, { value: "3", label: "3" }, { value: "4", label: "4" }] },
    ],
    defaults: { cols: "3" },
    install: sectionSteps,
    files: () => ({
      liquid: `<div class="gpl-gal" style="--gpl-cols: {{ section.settings.cols }};">
  <div class="gpl-gal__grid">
    {%- for block in section.blocks -%}
      <div class="gpl-gal__item" {{ block.shopify_attributes }}>
        {%- if block.settings.image -%}
          {{ block.settings.image | image_url: width: 600 | image_tag: class: 'gpl-gal__img', loading: 'lazy' }}
        {%- endif -%}
      </div>
    {%- endfor -%}
  </div>
</div>

{% schema %}
{
  "name": "Photo gallery",
  "settings": [
    { "type": "range", "id": "cols", "label": "Columns", "min": 2, "max": 4, "step": 1, "default": 3 }
  ],
  "blocks": [
    { "type": "image", "name": "Photo", "settings": [{ "type": "image_picker", "id": "image", "label": "Image" }] }
  ],
  "presets": [{ "name": "Photo gallery" }]
}
{% endschema %}`,
      css: `.gpl-gal { padding: 1.5rem 0; }
.gpl-gal__grid { display: grid; grid-template-columns: repeat(var(--gpl-cols, 3), 1fr); gap: 0.75rem; }
.gpl-gal__img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 12px; display: block; }
@media (max-width: 640px) { .gpl-gal__grid { grid-template-columns: repeat(2, 1fr); } }`,
    }),
  },
  {
    id: "cart-notes",
    name: "Order notes field",
    description: "A 'special instructions' textarea on the cart - saves support pings and makes gifting easy.",
    category: "Cart & checkout",
    kind: "snippet",
    controls: [
      { id: "label", label: "Label", type: "text", maxLength: 40 },
      { id: "placeholder", label: "Placeholder", type: "text", maxLength: 80 },
    ],
    defaults: { label: "Order instructions (optional)", placeholder: "Delivery notes, gift message, landmark..." },
    install: [
      ...snippetSteps("cart-notes.liquid"),
      "Render inside the cart form - the note saves to order.note automatically, no extra wiring.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-note">
  <label class="gpl-note__label" for="gpl-cart-note">{{ label | default: 'Order instructions' }}</label>
  <textarea id="gpl-cart-note" name="note" class="gpl-note__area" rows="3" placeholder="{{ placeholder | default: '' }}">{{ cart.note }}</textarea>
</div>`,
      css: `.gpl-note { margin: 1rem 0; }
.gpl-note__label { display: block; font-size: 0.72rem; font-weight: 600; margin-bottom: 0.4rem; }
.gpl-note__area {
  width: 100%;
  padding: 0.7rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3);
  border-radius: 9px;
  background: transparent;
  font: inherit;
  font-size: 0.8rem;
  resize: vertical;
}`,
      usage: `{% render 'cart-notes', label: ${js(str(v, "label"))}, placeholder: ${js(str(v, "placeholder"))} %}`,
    }),
  },
  {
    id: "pills-nav",
    name: "Pills filter bar",
    description: "Scrollable chip-style nav - filter links that look native on mobile.",
    category: "Headers & navigation",
    kind: "section",
    controls: [
      { id: "items", label: "Pills (label|url per line)", type: "text", maxLength: 300 },
    ],
    defaults: { items: "All|/\nNew in|/collections/new\nBestsellers|/collections/bestsellers\nSale|/collections/sale\nUnder ₹999|/collections/under-999" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<nav class="gpl-pills" aria-label="Quick filters">
  {%- assign rows = section.settings.items | newline_to_br | split: '<br />' -%}
  {%- for row in rows -%}
    {%- assign parts = row | strip | split: '|' -%}
    <a class="gpl-pills__pill{% if forloop.first %} is-active{% endif %}" href="{{ parts[1] | strip }}">{{ parts[0] | strip }}</a>
  {%- endfor -%}
</nav>

{% schema %}
{
  "name": "Pills nav",
  "settings": [
    { "type": "textarea", "id": "items", "label": "Pills (label|url per line)", "default": ${js(str(v, "items"))} }
  ],
  "presets": [{ "name": "Pills nav" }]
}
{% endschema %}`,
      css: `.gpl-pills { display: flex; gap: 0.5rem; overflow-x: auto; padding: 0.75rem 0.5rem; scrollbar-width: none; }
.gpl-pills::-webkit-scrollbar { display: none; }
.gpl-pills__pill {
  flex: 0 0 auto;
  padding: 0.45rem 1rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.25);
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  text-decoration: none;
  color: inherit;
  white-space: nowrap;
}
.gpl-pills__pill.is-active {
  background: rgb(var(--color-button, 15 23 42));
  color: rgb(var(--color-button-text, 255 255 255));
  border-color: transparent;
}`,
    }),
  },
  {
    id: "checkout-trust",
    name: "Checkout trust strip",
    description: "A reassurance row for cart/checkout pages - secure payment, returns, support in one line.",
    category: "Cart & checkout",
    kind: "snippet",
    controls: [
      { id: "items", label: "Trust points (one per line)", type: "text", maxLength: 150 },
    ],
    defaults: { items: "Secure payment - UPI, cards, net banking\n7-day easy returns\nSupport on WhatsApp" },
    install: [
      ...snippetSteps("checkout-trust.liquid"),
      "Render under the checkout button in the cart - the last reassurance before paying.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-ctrust">
  {%- assign rows = items | newline_to_br | split: '<br />' -%}
  {%- for row in rows -%}
    <span class="gpl-ctrust__item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      {{ row | strip }}
    </span>
  {%- endfor -%}
</div>`,
      css: `.gpl-ctrust { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.4rem 1.25rem; padding: 0.75rem 0; }
.gpl-ctrust__item { display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.65rem; color: rgb(var(--color-foreground, 100 116 139) / 0.8); }
.gpl-ctrust__item svg { width: 0.8rem; height: 0.8rem; color: #16a34a; }`,
      usage: `{% render 'checkout-trust', items: ${js(str(v, "items"))} %}`,
    }),
  },
  {
    id: "whatsapp-order",
    name: "Order on WhatsApp button",
    description: "A 'quick order on WhatsApp' button with a prefilled product message - huge for Indian COD buyers.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "phone", label: "WhatsApp number", type: "text", maxLength: 15 },
      { id: "label", label: "Button label", type: "text", maxLength: 30 },
    ],
    defaults: { phone: "919876543210", label: "Order on WhatsApp" },
    install: [
      ...snippetSteps("whatsapp-order.liquid"),
      "Put your real business WhatsApp number in international format - no '+' or spaces.",
    ],
    files: (v) => ({
      liquid: `{%- assign msg = 'Hi, I want to order ' | append: product.title | append: ' - ' | append: shop.url | append: product.url | url_encode -%}
<a class="gpl-wa" href="https://wa.me/{{ phone }}?text={{ msg }}" target="_blank" rel="noopener">
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zm-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.85 9.85 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.82 9.82 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.9 7c0 5.45-4.45 9.87-9.9 9.87z"/></svg>
  {{ label | default: 'Order on WhatsApp' }}
</a>`,
      css: `.gpl-wa {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  background: #25d366;
  color: #fff;
  font-weight: 800;
  font-size: 0.85rem;
  text-decoration: none;
}
.gpl-wa svg { width: 1.1rem; height: 1.1rem; }`,
      usage: `{% render 'whatsapp-order', product: product, phone: 'YOUR_NUMBER', label: ${js(str(v, "label"))} %}`,
    }),
  },
  {
    id: "personalization-field",
    name: "Product personalization field",
    description: "Custom text input that saves to the order as a line-item property - names, monograms, messages.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "label", label: "Field label", type: "text", maxLength: 40 },
      { id: "max", label: "Max characters", type: "text", maxLength: 3 },
      { id: "required", label: "Required", type: "toggle" },
    ],
    defaults: { label: "Name to print", max: "12", required: false },
    install: [
      ...snippetSteps("personalization-field.liquid"),
      "Render inside the product <form> before the add-to-cart button - the value saves to properties automatically.",
      "It shows up on the order in admin under 'Properties' - fulfillment reads it from there.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-perso">
  <label class="gpl-perso__label" for="gpl-perso-field">
    {{ label | default: 'Personalization' }}
    {%- if required -%}<span aria-hidden="true">*</span>{%- endif -%}
  </label>
  <input id="gpl-perso-field" class="gpl-perso__input" type="text" name="properties[{{ label | default: 'Personalization' }}]" maxlength="{{ max | default: 30 }}" placeholder="Type here" {% if required %}required{% endif %}>
  <p class="gpl-perso__hint">Max {{ max | default: 30 }} characters</p>
</div>`,
      css: `.gpl-perso { margin: 0.75rem 0; }
.gpl-perso__label { display: block; font-size: 0.72rem; font-weight: 600; margin-bottom: 0.4rem; }
.gpl-perso__label span { color: #dc2626; }
.gpl-perso__input {
  width: 100%;
  padding: 0.65rem 0.85rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3);
  border-radius: 9px;
  background: transparent;
  font-size: 0.85rem;
}
.gpl-perso__hint { margin: 0.3rem 0 0; font-size: 0.62rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
      usage: `{% render 'personalization-field', label: ${js(str(v, "label"))}, max: ${js(str(v, "max"))}, required: ${on(v, "required")} %}`,
    }),
  },
  {
    id: "variant-matrix",
    name: "Variant availability matrix",
    description: "In-stock grid across all variants - shoppers see what's actually available before tapping.",
    category: "Product page",
    kind: "snippet",
    controls: [],
    defaults: {},
    install: [
      ...snippetSteps("variant-matrix.liquid"),
      "Render below the variant picker in the main-product section.",
    ],
    files: () => ({
      liquid: `<div class="gpl-vm">
  {%- for variant in product.variants -%}
    <span class="gpl-vm__chip{% unless variant.available %} gpl-vm__chip--out{% endunless %}" title="{% if variant.available %}In stock{% else %}Sold out{% endif %}">
      {{ variant.title }}
      <i>{% if variant.available %}&#10003;{% else %}&#10005;{% endif %}</i>
    </span>
  {%- endfor -%}
</div>`,
      css: `.gpl-vm { display: flex; flex-wrap: wrap; gap: 0.4rem; margin: 0.75rem 0; }
.gpl-vm__chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.75rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.25);
  border-radius: 999px;
  font-size: 0.68rem;
}
.gpl-vm__chip i { font-style: normal; color: #16a34a; font-weight: 800; }
.gpl-vm__chip--out { opacity: 0.45; text-decoration: line-through; }
.gpl-vm__chip--out i { color: #dc2626; }`,
      usage: `{% render 'variant-matrix', product: product %}`,
    }),
  },
  {
    id: "price-per-unit",
    name: "Unit price display",
    description: "'₹45 / 100g' under the price - essential for groceries, supplements, anything sold by weight or count.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "unit", label: "Unit label", type: "text", maxLength: 20 },
      { id: "qty", label: "Units per product", type: "text", maxLength: 5 },
    ],
    defaults: { unit: "100g", qty: "10" },
    install: [
      ...snippetSteps("price-per-unit.liquid"),
      "Enter how many units the product contains - the per-unit price is calculated from the real product price.",
      "For variants, drive it from variant metafields so each variant gets its own math.",
    ],
    files: (v) => ({
      liquid: `{%- assign unit_qty = qty | plus: 0 -%}
{%- if unit_qty > 0 -%}
<p class="gpl-unit">
  {{ product.selected_or_first_available_variant.price | divided_by: unit_qty | money }} / {{ unit | default: 'unit' }}
</p>
{%- endif -%}`,
      css: `.gpl-unit { margin: 0.2rem 0 0; font-size: 0.72rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
      usage: `{% render 'price-per-unit', product: product, unit: ${js(str(v, "unit"))}, qty: ${js(str(v, "qty"))} %}`,
    }),
  },
  {
    id: "subscribe-save",
    name: "Subscribe & save toggle",
    description: "One-time vs subscribe pill toggle - primes customers for a selling plan without an app's weight.",
    category: "Cart & checkout",
    kind: "snippet",
    controls: [
      { id: "discount", label: "Subscribe discount %", type: "text", maxLength: 3 },
      { id: "freq", label: "Frequency", type: "select", options: [{ value: "weekly", label: "Weekly" }, { value: "monthly", label: "Monthly" }] },
    ],
    defaults: { discount: "15", freq: "monthly" },
    install: [
      ...snippetSteps("subscribe-save.liquid"),
      "Requires a selling plan from your subscription app - the toggle selects it; the plan itself comes from the app.",
      "Hide the toggle if the product has no selling_plan_groups.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-sub" data-gpl-sub>
  <label class="gpl-sub__opt">
    <input type="radio" name="purchase_type" value="onetime" checked>
    <span>One-time purchase</span>
    <b>{{ product.price | money }}</b>
  </label>
  {%- if product.selling_plan_groups.size > 0 -%}
    <label class="gpl-sub__opt gpl-sub__opt--save">
      <input type="radio" name="purchase_type" value="sub">
      <span>Subscribe {{ freq | default: 'monthly' }} - save {{ discount | default: '10' }}%</span>
      <b>{{ product.price | times: 0.9 | money }}</b>
      <input type="hidden" name="selling_plan" value="{{ product.selling_plan_groups.first.selling_plans.first.id }}" disabled>
    </label>
  {%- endif -%}
</div>`,
      css: `.gpl-sub { display: grid; gap: 0.5rem; margin: 0.75rem 0; }
.gpl-sub__opt {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 0.85rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.25);
  border-radius: 10px;
  font-size: 0.78rem;
  cursor: pointer;
}
.gpl-sub__opt input { accent-color: rgb(var(--color-button, 21 128 61)); }
.gpl-sub__opt b { margin-left: auto; }
.gpl-sub__opt--save { border-color: rgb(var(--color-button, 21 128 61) / 0.4); background: rgb(var(--color-button, 21 128 61) / 0.06); }`,
      js: `document.querySelectorAll('[data-gpl-sub]').forEach((el) => {
  el.querySelectorAll('input[name="purchase_type"]').forEach((r) => {
    r.addEventListener('change', () => {
      const plan = el.querySelector('input[name="selling_plan"]');
      if (plan) plan.disabled = r.value !== 'sub';
    });
  });
});`,
      usage: `{% render 'subscribe-save', product: product, discount: ${js(str(v, "discount"))}, freq: ${js(str(v, "freq"))} %}`,
    }),
  },
  {
    id: "certification-badges",
    name: "Certification badges row",
    description: "GOTS, vegan, ISO, FSSAI-style certification chips - the proof layer for regulated and DTC categories.",
    category: "Trust & social proof",
    kind: "snippet",
    controls: [
      { id: "items", label: "Certifications (one per line)", type: "text", maxLength: 200 },
    ],
    defaults: { items: "GOTS certified\nVegan\nCruelty-free\nFSSAI licensed" },
    install: [
      ...snippetSteps("certification-badges.liquid"),
      "Only display certifications you actually hold - fake certification badges are a legal liability, not a badge.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-certs">
  {%- assign rows = items | newline_to_br | split: '<br />' -%}
  {%- for row in rows -%}
    <span class="gpl-certs__badge">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.5 12.9 17 22l-5-3-5 3 1.5-9.1"/></svg>
      {{ row | strip }}
    </span>
  {%- endfor -%}
</div>`,
      css: `.gpl-certs { display: flex; flex-wrap: wrap; gap: 0.4rem; margin: 0.75rem 0; }
.gpl-certs__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.8rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.25);
  border-radius: 999px;
  font-size: 0.65rem;
  font-weight: 700;
  color: rgb(var(--color-foreground, 100 116 139) / 0.85);
}
.gpl-certs__badge svg { width: 0.8rem; height: 0.8rem; color: #16a34a; }`,
      usage: `{% render 'certification-badges', items: ${js(str(v, "items"))} %}`,
    }),
  },
  {
    id: "loyalty-points",
    name: "Loyalty points note",
    description: "'Earn X points on this order' under the buy button - primes repeat purchase without an app install.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "rate", label: "Points per ₹100", type: "text", maxLength: 3 },
      { id: "name", label: "Program name", type: "text", maxLength: 30 },
    ],
    defaults: { rate: "5", name: "rewards" },
    install: [
      ...snippetSteps("loyalty-points.liquid"),
      "Pairs with your loyalty app - this displays the points message; the app handles earning.",
    ],
    files: (v) => ({
      liquid: `{%- assign pts = product.selected_or_first_available_variant.price | times: rate | plus: 0 | divided_by: 10000 -%}
<p class="gpl-loyalty">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.9 6.26 6.9.6-5.2 4.53 1.55 6.77L12 16.9l-6.15 3.26L7.4 13.4 2.2 8.86l6.9-.6z"/></svg>
  Earn <strong>{{ pts }} {{ name | default: 'points' }}</strong> on this order
</p>`,
      css: `.gpl-loyalty { display: flex; align-items: center; gap: 0.45rem; margin: 0.5rem 0 0; font-size: 0.72rem; color: rgb(var(--color-foreground, 100 116 139) / 0.85); }
.gpl-loyalty svg { width: 0.85rem; height: 0.85rem; color: rgb(var(--color-button, 245 158 11)); }
.gpl-loyalty strong { font-weight: 700; }`,
      usage: `{% render 'loyalty-points', product: product, rate: ${js(str(v, "rate"))}, name: ${js(str(v, "name"))} %}`,
    }),
  },
  {
    id: "collection-hero",
    name: "Collection banner hero",
    description: "Full-width collection banner with image, title and product count - top of every collection page.",
    category: "Headers & navigation",
    kind: "section",
    controls: [
      { id: "overlay", label: "Dark overlay", type: "toggle" },
    ],
    defaults: { overlay: true },
    install: sectionSteps,
    files: () => ({
      liquid: `<div class="gpl-colhero{% if section.settings.overlay %} gpl-colhero--overlay{% endif %}">
  {%- if section.settings.image or collection.image -%}
    {{ section.settings.image | default: collection.image | image_url: width: 1600 | image_tag: class: 'gpl-colhero__img', loading: 'eager' }}
  {%- endif -%}
  <div class="gpl-colhero__body">
    <h1 class="gpl-colhero__title">{{ section.settings.title | default: collection.title }}</h1>
    {%- if collection.description != blank -%}
      <p class="gpl-colhero__desc">{{ collection.description | strip_html | truncate: 140 }}</p>
    {%- endif -%}
    {%- if collection.products_count -%}
      <p class="gpl-colhero__count">{{ collection.products_count }} products</p>
    {%- endif -%}
  </div>
</div>

{% schema %}
{
  "name": "Collection hero",
  "settings": [
    { "type": "image_picker", "id": "image", "label": "Custom image" },
    { "type": "text", "id": "title", "label": "Custom title" },
    { "type": "checkbox", "id": "overlay", "label": "Dark overlay", "default": true }
  ],
  "presets": [{ "name": "Collection hero" }]
}
{% endschema %}`,
      css: `.gpl-colhero { position: relative; border-radius: 16px; overflow: hidden; }
.gpl-colhero__img { width: 100%; aspect-ratio: 21/7; object-fit: cover; display: block; }
.gpl-colhero__body { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: flex-end; padding: 2rem; }
.gpl-colhero--overlay .gpl-colhero__body { background: linear-gradient(to top, rgb(0 0 0 / 0.6), transparent 70%); color: #fff; }
.gpl-colhero__title { margin: 0; font-size: 1.8rem; font-weight: 800; }
.gpl-colhero__desc { margin: 0.4rem 0 0; font-size: 0.8rem; opacity: 0.9; max-width: 34rem; }
.gpl-colhero__count { margin: 0.4rem 0 0; font-size: 0.68rem; opacity: 0.8; }`,
    }),
  },
  {
    id: "category-tiles",
    name: "Shop by category tiles",
    description: "Image tiles linking to collections - the visual nav on almost every successful homepage.",
    category: "Headers & navigation",
    kind: "section",
    controls: [
      { id: "cols", label: "Columns", type: "select", options: [{ value: "3", label: "3" }, { value: "4", label: "4" }] },
    ],
    defaults: { cols: "4" },
    install: sectionSteps,
    files: () => ({
      liquid: `<div class="gpl-tiles" style="--gpl-cols: {{ section.settings.cols }};">
  {%- for block in section.blocks -%}
    {%- assign c = block.settings.collection -%}
    <a class="gpl-tiles__tile" href="{{ c.url | default: '#' }}" {{ block.shopify_attributes }}>
      {%- if block.settings.image or c.image -%}
        {{ block.settings.image | default: c.image | image_url: width: 500 | image_tag: class: 'gpl-tiles__img', loading: 'lazy' }}
      {%- endif -%}
      <span class="gpl-tiles__label">{{ block.settings.title | default: c.title }}</span>
    </a>
  {%- endfor -%}
</div>

{% schema %}
{
  "name": "Category tiles",
  "settings": [
    { "type": "range", "id": "cols", "label": "Columns", "min": 2, "max": 4, "step": 1, "default": 4 }
  ],
  "blocks": [
    {
      "type": "tile",
      "name": "Category",
      "settings": [
        { "type": "collection", "id": "collection", "label": "Collection" },
        { "type": "text", "id": "title", "label": "Custom title" },
        { "type": "image_picker", "id": "image", "label": "Custom image" }
      ]
    }
  ],
  "presets": [{ "name": "Category tiles" }]
}
{% endschema %}`,
      css: `.gpl-tiles { display: grid; grid-template-columns: repeat(var(--gpl-cols, 4), 1fr); gap: 0.75rem; padding: 1.5rem 0; }
.gpl-tiles__tile { position: relative; border-radius: 12px; overflow: hidden; text-decoration: none; }
.gpl-tiles__img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; transition: transform 0.3s; }
.gpl-tiles__tile:hover .gpl-tiles__img { transform: scale(1.05); }
.gpl-tiles__label {
  position: absolute;
  bottom: 0.75rem;
  left: 0.75rem;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: rgb(255 255 255 / 0.92);
  color: #111;
  font-size: 0.72rem;
  font-weight: 700;
}
@media (max-width: 640px) { .gpl-tiles { grid-template-columns: repeat(2, 1fr); } }`,
    }),
  },
  {
    id: "social-share",
    name: "Social share buttons",
    description: "Share-to-X/WhatsApp/Pinterest buttons with the real product URL prefilled.",
    category: "Marketing",
    kind: "snippet",
    controls: [
      { id: "label", label: "Label", type: "text", maxLength: 30 },
    ],
    defaults: { label: "Share" },
    install: snippetSteps("social-share.liquid"),
    files: (v) => ({
      liquid: `{%- assign share_url = shop.url | append: product.url -%}
<div class="gpl-share">
  <span class="gpl-share__label">{{ label | default: 'Share' }}</span>
  <a href="https://wa.me/?text={{ product.title | append: ' ' | append: share_url | url_encode }}" target="_blank" rel="noopener" aria-label="Share on WhatsApp">WhatsApp</a>
  <a href="https://twitter.com/intent/tweet?text={{ product.title | url_encode }}&url={{ share_url | url_encode }}" target="_blank" rel="noopener" aria-label="Share on X">X</a>
  <a href="https://pinterest.com/pin/create/button/?url={{ share_url | url_encode }}&description={{ product.title | url_encode }}" target="_blank" rel="noopener" aria-label="Share on Pinterest">Pinterest</a>
</div>`,
      css: `.gpl-share { display: flex; align-items: center; gap: 0.75rem; margin: 0.75rem 0; font-size: 0.72rem; }
.gpl-share__label { font-weight: 600; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-share a { color: rgb(var(--color-button, 21 128 61)); font-weight: 700; text-decoration: none; }
.gpl-share a:hover { text-decoration: underline; }`,
      usage: `{% render 'social-share', product: product, label: ${js(str(v, "label"))} %}`,
    }),
  },
  {
    id: "instagram-grid",
    name: "Instagram feed grid",
    description: "Latest-posts grid linking to your profile - social proof + follows without an app.",
    category: "Marketing",
    kind: "section",
    controls: [
      { id: "handle", label: "IG handle", type: "text", maxLength: 30 },
      { id: "cols", label: "Columns", type: "select", options: [{ value: "4", label: "4" }, { value: "6", label: "6" }] },
    ],
    defaults: { handle: "@yourstore", cols: "6" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-ig" style="--gpl-cols: {{ section.settings.cols }};">
  <p class="gpl-ig__head">
    <a href="https://instagram.com/{{ section.settings.handle | remove: '@' }}" target="_blank" rel="noopener">
      Follow {{ section.settings.handle }}
    </a>
  </p>
  <div class="gpl-ig__grid">
    {%- for block in section.blocks -%}
      <a class="gpl-ig__item" href="{{ block.settings.link | default: '#' }}" {{ block.shopify_attributes }}>
        {%- if block.settings.image -%}
          {{ block.settings.image | image_url: width: 400 | image_tag: class: 'gpl-ig__img', loading: 'lazy' }}
        {%- endif -%}
      </a>
    {%- endfor -%}
  </div>
</div>

{% schema %}
{
  "name": "Instagram feed",
  "settings": [
    { "type": "text", "id": "handle", "label": "IG handle", "default": ${js(str(v, "handle"))} },
    { "type": "range", "id": "cols", "label": "Columns", "min": 3, "max": 6, "step": 1, "default": 6 }
  ],
  "blocks": [
    {
      "type": "post",
      "name": "Post",
      "settings": [
        { "type": "image_picker", "id": "image", "label": "Image" },
        { "type": "url", "id": "link", "label": "Post link" }
      ]
    }
  ],
  "presets": [{ "name": "Instagram feed" }]
}
{% endschema %}`,
      css: `.gpl-ig { padding: 1.5rem 0; }
.gpl-ig__head { margin: 0 0 1rem; text-align: center; }
.gpl-ig__head a { font-size: 0.78rem; font-weight: 700; color: rgb(var(--color-button, 21 128 61)); text-decoration: none; }
.gpl-ig__grid { display: grid; grid-template-columns: repeat(var(--gpl-cols, 6), 1fr); gap: 0.5rem; }
.gpl-ig__img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 8px; display: block; }
@media (max-width: 640px) { .gpl-ig__grid { grid-template-columns: repeat(3, 1fr); } }`,
    }),
  },
  {
    id: "custom-liquid-section",
    name: "Custom Liquid section",
    description: "The universal escape hatch - a themed section wrapper that renders any Liquid the merchant pastes.",
    category: "Utility",
    kind: "section",
    controls: [],
    defaults: {},
    install: [
      ...sectionSteps,
      "Paste any Liquid in the section settings - it renders inside a styled container on whatever template you add it to.",
    ],
    files: () => ({
      liquid: `<div class="gpl-custom">
  {{ section.settings.liquid }}
</div>

{% schema %}
{
  "name": "Custom Liquid",
  "settings": [
    { "type": "liquid", "id": "liquid", "label": "Liquid / HTML" }
  ],
  "presets": [{ "name": "Custom Liquid" }]
}
{% endschema %}`,
      css: `.gpl-custom { padding: 1.5rem 0; }
.gpl-custom > *:first-child { margin-top: 0; }
.gpl-custom > *:last-child { margin-bottom: 0; }`,
    }),
  },
  {
    id: "open-now",
    name: "Open now status",
    description: "Live store-hours badge - 'Open now, closes 9pm' that updates from your real hours.",
    category: "Utility",
    kind: "snippet",
    controls: [
      { id: "open", label: "Opening hour (24h)", type: "text", maxLength: 2 },
      { id: "close", label: "Closing hour (24h)", type: "text", maxLength: 2 },
    ],
    defaults: { open: "10", close: "21" },
    install: [
      ...snippetSteps("open-now.liquid"),
      "The check runs against the visitor's device time - for India-only stores that's the right timezone.",
    ],
    files: (v) => ({
      liquid: `<gpl-hours class="gpl-hours" data-open="{{ open | default: 10 }}" data-close="{{ close | default: 21 }}">
  <span class="gpl-hours__dot"></span>
  <span class="gpl-hours__text" data-text>Checking hours…</span>
</gpl-hours>`,
      css: `.gpl-hours { display: inline-flex; align-items: center; gap: 0.45rem; font-size: 0.7rem; }
.gpl-hours__dot { width: 0.55rem; height: 0.55rem; border-radius: 999px; background: #16a34a; }
.gpl-hours.is-closed .gpl-hours__dot { background: #dc2626; }
.gpl-hours__text { font-weight: 600; }`,
      js: `document.querySelectorAll('gpl-hours').forEach((el) => {
  const open = Number(el.dataset.open) || 9;
  const close = Number(el.dataset.close) || 21;
  const h = new Date().getHours();
  const isOpen = h >= open && h < close;
  el.classList.toggle('is-closed', !isOpen);
  el.querySelector('[data-text]').textContent = isOpen ? 'Open now - replies within the hour' : 'Closed - we reply next morning';
});`,
      usage: `{% render 'open-now', open: ${js(str(v, "open"))}, close: ${js(str(v, "close"))} %}`,
    }),
  },
  {
    id: "price-drop-alert",
    name: "Price drop alert signup",
    description: "'Notify me if the price drops' - captures intent from shoppers who aren't ready to buy today.",
    category: "Marketing",
    kind: "snippet",
    controls: [
      { id: "label", label: "Button label", type: "text", maxLength: 40 },
    ],
    defaults: { label: "Notify me on price drop" },
    install: [
      ...snippetSteps("price-drop-alert.liquid"),
      "Uses the customer form tag - signups land in your customers list tagged 'price-drop' for the newsletter flow.",
    ],
    files: (v) => ({
      liquid: `<gpl-pda class="gpl-pda">
  <button type="button" class="gpl-pda__btn" data-open>{{ label | default: 'Notify me on price drop' }}</button>
  <div class="gpl-pda__pop" hidden>
    {%- form 'customer', class: 'gpl-pda__form' -%}
      <input type="hidden" name="contact[tags]" value="price-drop-{{ product.handle }}">
      <p class="gpl-pda__title">Price drop alert</p>
      <input type="email" name="contact[email]" placeholder="Your email" required>
      <button type="submit">Notify me</button>
    {%- endform -%}
  </div>
</gpl-pda>`,
      css: `.gpl-pda { position: relative; display: inline-block; }
.gpl-pda__btn {
  padding: 0.5rem 1rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3);
  border-radius: 999px;
  background: transparent;
  color: inherit;
  font-size: 0.72rem;
  cursor: pointer;
}
.gpl-pda__pop {
  position: absolute;
  bottom: 110%;
  left: 0;
  min-width: 15rem;
  padding: 1rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.2);
  border-radius: 12px;
  background: rgb(var(--color-background, 255 255 255));
  box-shadow: 0 10px 30px rgb(0 0 0 / 0.15);
  z-index: 10;
}
.gpl-pda__title { margin: 0 0 0.6rem; font-weight: 700; font-size: 0.78rem; }
.gpl-pda__form { display: flex; gap: 0.4rem; }
.gpl-pda__form input { flex: 1; min-width: 0; padding: 0.5rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3); border-radius: 7px; font-size: 0.75rem; }
.gpl-pda__form button { padding: 0.5rem 0.9rem; border: 0; border-radius: 7px; background: rgb(var(--color-button, 15 23 42)); color: rgb(var(--color-button-text, 255 255 255)); font-size: 0.72rem; font-weight: 700; cursor: pointer; }`,
      js: `document.querySelectorAll('gpl-pda').forEach((el) => {
  el.querySelector('[data-open]').addEventListener('click', () => {
    const pop = el.querySelector('.gpl-pda__pop');
    pop.hidden = !pop.hidden;
  });
});`,
      usage: `{% render 'price-drop-alert', product: product, label: ${js(str(v, "label"))} %}`,
    }),
  },
  {
    id: "exit-intent",
    name: "Exit-intent popup",
    description: "Fires when the cursor heads for the address bar - one last honest offer before they leave.",
    category: "Marketing",
    kind: "snippet",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 60 },
      { id: "text", label: "Offer line", type: "text", maxLength: 140 },
    ],
    defaults: { heading: "Wait - before you go", text: "Your cart is saved. Use code STAY10 for 10% off if you finish in the next 24 hours." },
    install: [
      ...snippetSteps("exit-intent.liquid"),
      "Desktop only - mobile has no cursor to track. Shows once per session max.",
      "The code must be real - an exit popup with a fake discount destroys checkout trust.",
    ],
    files: (v) => ({
      liquid: `<gpl-exit class="gpl-exit" hidden>
  <div class="gpl-exit__box" role="dialog" aria-modal="true">
    <button type="button" class="gpl-exit__close" aria-label="Close">&times;</button>
    <p class="gpl-exit__title">{{ heading | default: 'Before you go' }}</p>
    <p class="gpl-exit__text">{{ text | default: 'Use code STAY10 for 10% off.' }}</p>
    <a class="gpl-exit__cta" href="{{ routes.cart_url }}">Back to cart</a>
  </div>
</gpl-exit>`,
      css: `.gpl-exit { position: fixed; inset: 0; z-index: 90; display: grid; place-items: center; background: rgb(0 0 0 / 0.55); }
.gpl-exit__box { position: relative; max-width: 22rem; margin: 1rem; padding: 2rem; border-radius: 16px; background: rgb(var(--color-background, 255 255 255)); text-align: center; }
.gpl-exit__close { position: absolute; top: 0.75rem; right: 0.9rem; background: none; border: 0; font-size: 1.3rem; cursor: pointer; color: inherit; }
.gpl-exit__title { margin: 0; font-size: 1.15rem; font-weight: 800; }
.gpl-exit__text { margin: 0.6rem 0 0; font-size: 0.82rem; color: rgb(var(--color-foreground, 100 116 139) / 0.8); }
.gpl-exit__cta {
  display: inline-block;
  margin-top: 1.25rem;
  padding: 0.75rem 1.75rem;
  border-radius: 999px;
  background: rgb(var(--color-button, 15 23 42));
  color: rgb(var(--color-button-text, 255 255 255));
  text-decoration: none;
  font-weight: 700;
}`,
      js: `document.querySelectorAll('gpl-exit').forEach((el) => {
  if (sessionStorage.getItem('gpl-exit-shown')) return;
  function show() {
    sessionStorage.setItem('gpl-exit-shown', '1');
    el.hidden = false;
  }
  document.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget && e.clientY < 8) show();
  });
  el.querySelector('.gpl-exit__close').addEventListener('click', () => (el.hidden = true));
  el.addEventListener('click', (e) => { if (e.target === el) el.hidden = true; });
});`,
      usage: `{% render 'exit-intent', heading: ${js(str(v, "heading"))}, text: ${js(str(v, "text"))} %}`,
    }),
  },
  {
    id: "faq-search",
    name: "Searchable FAQ",
    description: "FAQ with a live filter box - big for stores with 20+ real questions.",
    category: "Content",
    kind: "section",
    controls: [
      { id: "items", label: "Q&A (question|answer per line)", type: "text", maxLength: 800 },
    ],
    defaults: {
      items: "Do you ship pan-India?|Yes - 24h dispatch, 3-6 day delivery.\nIs COD available?|On most pincodes - check on the product page.\nWhat is the return window?|7-day easy returns.\nHow do I track my order?|Tracking link is sent by email and WhatsApp.\nDo you offer exchanges?|Yes - size exchanges are free.",
    },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<gpl-faq class="gpl-faq2">
  <input type="search" class="gpl-faq2__search" placeholder="Search answers…" aria-label="Search FAQ">
  {%- assign rows = section.settings.items | newline_to_br | split: '<br />' -%}
  {%- for row in rows -%}
    {%- assign parts = row | strip | split: '|' -%}
    <details class="gpl-faq2__item">
      <summary>{{ parts[0] | strip }}</summary>
      <p>{{ parts[1] | strip }}</p>
    </details>
  {%- endfor -%}
  <p class="gpl-faq2__empty" hidden>No matching questions - try different words.</p>
</gpl-faq>

{% schema %}
{
  "name": "Searchable FAQ",
  "settings": [
    { "type": "textarea", "id": "items", "label": "Q&A (question|answer per line)", "default": ${js(str(v, "items"))} }
  ],
  "presets": [{ "name": "Searchable FAQ" }]
}
{% endschema %}`,
      css: `.gpl-faq2 { padding: 1.5rem 0; }
.gpl-faq2__search {
  width: 100%;
  padding: 0.7rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3);
  border-radius: 10px;
  font-size: 0.82rem;
  background: transparent;
}
.gpl-faq2__item { border-bottom: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.18); padding: 0.8rem 0; }
.gpl-faq2__item summary { cursor: pointer; font-weight: 600; font-size: 0.85rem; }
.gpl-faq2__item p { margin: 0.5rem 0 0; font-size: 0.78rem; color: rgb(var(--color-foreground, 100 116 139) / 0.8); }
.gpl-faq2__empty { text-align: center; font-size: 0.75rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
      js: `document.querySelectorAll('gpl-faq').forEach((el) => {
  const input = el.querySelector('.gpl-faq2__search');
  const items = [...el.querySelectorAll('.gpl-faq2__item')];
  const empty = el.querySelector('.gpl-faq2__empty');
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    let n = 0;
    items.forEach((i) => {
      const hit = !q || i.textContent.toLowerCase().includes(q);
      i.hidden = !hit;
      if (hit) n++;
    });
    empty.hidden = n > 0;
  });
});`,
    }),
  },
  {
    id: "contact-form-section",
    name: "Contact form section",
    description: "A themed contact block - name, email, message - posting straight to Shopify's contact flow.",
    category: "Utility",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 50 },
    ],
    defaults: { heading: "Talk to us" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-contact">
  <h2 class="gpl-contact__heading">{{ section.settings.heading }}</h2>
  {%- form 'contact', class: 'gpl-contact__form' -%}
    {%- if form.posted_successfully? -%}
      <p class="gpl-contact__ok">Thanks - we reply within a business day.</p>
    {%- endif -%}
    <input type="text" name="contact[name]" placeholder="Your name" required>
    <input type="email" name="contact[email]" placeholder="Your email" required>
    <textarea name="contact[body]" rows="4" placeholder="Your message" required></textarea>
    <button type="submit">Send message</button>
  {%- endform -%}
</div>

{% schema %}
{
  "name": "Contact form",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading"))} }
  ],
  "presets": [{ "name": "Contact form" }]
}
{% endschema %}`,
      css: `.gpl-contact { padding: 1.5rem 0; max-width: 30rem; }
.gpl-contact__heading { margin: 0 0 1rem; font-size: 1.1rem; font-weight: 800; }
.gpl-contact__form { display: grid; gap: 0.6rem; }
.gpl-contact__form input, .gpl-contact__form textarea {
  padding: 0.7rem 0.9rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3);
  border-radius: 9px;
  background: transparent;
  font: inherit;
  font-size: 0.82rem;
}
.gpl-contact__form button {
  padding: 0.75rem 1.75rem;
  border: 0;
  border-radius: 10px;
  background: rgb(var(--color-button, 15 23 42));
  color: rgb(var(--color-button-text, 255 255 255));
  font-weight: 800;
  cursor: pointer;
  justify-self: start;
}
.gpl-contact__ok { margin: 0; color: #16a34a; font-size: 0.8rem; font-weight: 700; }`,
    }),
  },
  {
    id: "team-grid",
    name: "Team / makers grid",
    description: "'Meet the makers' cards - the trust layer that turns a storefront into a brand.",
    category: "Content",
    kind: "section",
    controls: [
      { id: "items", label: "People (name|role per line)", type: "text", maxLength: 300 },
    ],
    defaults: { items: "Ananya|Founder & sourcing\nVikram|Production lead\nSana|Customer care" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-team">
  {%- assign rows = section.settings.items | newline_to_br | split: '<br />' -%}
  {%- for row in rows -%}
    {%- assign parts = row | strip | split: '|' -%}
    <div class="gpl-team__card">
      <div class="gpl-team__avatar">{{ parts[0] | strip | slice: 0 }}</div>
      <p class="gpl-team__name">{{ parts[0] | strip }}</p>
      <p class="gpl-team__role">{{ parts[1] | strip }}</p>
    </div>
  {%- endfor -%}
</div>

{% schema %}
{
  "name": "Team grid",
  "settings": [
    { "type": "textarea", "id": "items", "label": "People (name|role per line)", "default": ${js(str(v, "items"))} }
  ],
  "presets": [{ "name": "Team grid" }]
}
{% endschema %}`,
      css: `.gpl-team { display: grid; grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr)); gap: 1rem; padding: 1.5rem 0; }
.gpl-team__card { text-align: center; }
.gpl-team__avatar {
  display: grid;
  place-items: center;
  width: 5rem;
  height: 5rem;
  margin: 0 auto;
  border-radius: 999px;
  background: rgb(var(--color-foreground, 148 163 184) / 0.12);
  font-size: 1.6rem;
  font-weight: 800;
}
.gpl-team__name { margin: 0.75rem 0 0; font-weight: 700; font-size: 0.82rem; }
.gpl-team__role { margin: 0.2rem 0 0; font-size: 0.68rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
    }),
  },
  {
    id: "map-embed",
    name: "Map embed",
    description: "Google Maps embed card - 'find our store' without leaving the page.",
    category: "Utility",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 50 },
      { id: "query", label: "Map search / address", type: "text", maxLength: 120 },
    ],
    defaults: { heading: "Find us", query: "Connaught Place, New Delhi" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-map">
  {%- if section.settings.heading != blank -%}
    <h2 class="gpl-map__heading">{{ section.settings.heading }}</h2>
  {%- endif -%}
  <iframe
    class="gpl-map__frame"
    src="https://www.google.com/maps?q={{ section.settings.query | url_encode }}&output=embed"
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
    title="Store location map"></iframe>
</div>

{% schema %}
{
  "name": "Map embed",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading"))} },
    { "type": "text", "id": "query", "label": "Map search / address", "default": ${js(str(v, "query"))} }
  ],
  "presets": [{ "name": "Map embed" }]
}
{% endschema %}`,
      css: `.gpl-map { padding: 1.5rem 0; }
.gpl-map__heading { margin: 0 0 1rem; font-size: 1rem; font-weight: 800; }
.gpl-map__frame { width: 100%; aspect-ratio: 16/9; border: 0; border-radius: 14px; }`,
    }),
  },
  {
    id: "coming-soon",
    name: "Coming soon + countdown",
    description: "A launch page section - big heading, countdown, email capture for the waitlist.",
    category: "Marketing",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 60 },
      { id: "date", label: "Launch date (YYYY-MM-DD)", type: "text", maxLength: 10 },
    ],
    defaults: { heading: "Something big is coming", date: "2026-03-01" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<gpl-soon class="gpl-soon" data-date="{{ section.settings.date }}">
  <h2 class="gpl-soon__heading">{{ section.settings.heading }}</h2>
  <div class="gpl-soon__timer" data-timer>
    <div><b data-d>0</b><small>days</small></div>
    <div><b data-h>0</b><small>hours</small></div>
    <div><b data-m>0</b><small>min</small></div>
  </div>
  {%- form 'customer', class: 'gpl-soon__form' -%}
    <input type="hidden" name="contact[tags]" value="waitlist">
    <input type="email" name="contact[email]" placeholder="Get notified at launch" required>
    <button type="submit">Notify me</button>
  {%- endform -%}
</gpl-soon>

{% schema %}
{
  "name": "Coming soon",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading"))} },
    { "type": "text", "id": "date", "label": "Launch date (YYYY-MM-DD)", "default": ${js(str(v, "date"))} }
  ],
  "presets": [{ "name": "Coming soon" }]
}
{% endschema %}`,
      css: `.gpl-soon { display: block; padding: 3rem 1rem; text-align: center; }
.gpl-soon__heading { margin: 0; font-size: 2rem; font-weight: 900; }
.gpl-soon__timer { display: flex; justify-content: center; gap: 1.5rem; margin-top: 1.5rem; }
.gpl-soon__timer b { display: block; font-size: 2.5rem; font-weight: 900; font-variant-numeric: tabular-nums; }
.gpl-soon__timer small { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-soon__form { display: flex; gap: 0.5rem; max-width: 24rem; margin: 2rem auto 0; }
.gpl-soon__form input { flex: 1; padding: 0.7rem 1rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3); border-radius: 10px; background: transparent; font-size: 0.82rem; }
.gpl-soon__form button { padding: 0.7rem 1.25rem; border: 0; border-radius: 10px; background: rgb(var(--color-button, 15 23 42)); color: rgb(var(--color-button-text, 255 255 255)); font-weight: 800; cursor: pointer; }`,
      js: `document.querySelectorAll('gpl-soon').forEach((el) => {
  const end = new Date(el.dataset.date + 'T00:00:00').getTime();
  const d = el.querySelector('[data-d]'), h = el.querySelector('[data-h]'), m = el.querySelector('[data-m]');
  function tick() {
    const left = Math.max(0, end - Date.now());
    d.textContent = Math.floor(left / 864e5);
    h.textContent = Math.floor(left / 36e5) % 24;
    m.textContent = Math.floor(left / 6e4) % 60;
  }
  tick();
  setInterval(tick, 60000);
});`,
    }),
  },
  {
    id: "in-cart-badge",
    name: "In-cart indicator",
    description: "'Already in your cart' chip on the product - stops double-adds and anchors the purchase decision.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "label", label: "Label", type: "text", maxLength: 30 },
    ],
    defaults: { label: "In your cart" },
    install: [
      ...snippetSteps("in-cart-badge.liquid"),
      "Render near the buy button - reads the live cart, not a cookie.",
    ],
    files: (v) => ({
      liquid: `<gpl-incart class="gpl-incart" data-product="{{ product.id }}">
  <span class="gpl-incart__badge" hidden data-badge>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
    {{ label | default: 'In your cart' }} - <a href="{{ routes.cart_url }}">view</a>
  </span>
</gpl-incart>`,
      css: `.gpl-incart__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  background: rgb(var(--color-button, 21 128 61) / 0.12);
  color: rgb(var(--color-button, 21 128 61));
  font-size: 0.68rem;
  font-weight: 700;
}
.gpl-incart__badge svg { width: 0.75rem; height: 0.75rem; }
.gpl-incart__badge a { color: inherit; }`,
      js: `document.querySelectorAll('gpl-incart').forEach(async (el) => {
  const id = Number(el.dataset.product);
  try {
    const cart = await fetch('/cart.js').then((r) => r.json());
    if (cart.items.some((i) => i.product_id === id)) {
      el.querySelector('[data-badge]').hidden = false;
    }
  } catch {}
});`,
      usage: `{% render 'in-cart-badge', product: product, label: ${js(str(v, "label"))} %}`,
    }),
  },
  {
    id: "featured-product",
    name: "Featured product spotlight",
    description: "A full product card with image, price, rating and buy button - promote one hero product anywhere.",
    category: "Product page",
    kind: "section",
    controls: [
      { id: "cta", label: "Button label", type: "text", maxLength: 30 },
    ],
    defaults: { cta: "Shop this product" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-fp">
  {%- assign p = section.settings.product -%}
  {%- if p -%}
    <div class="gpl-fp__media">
      {{ p.featured_image | image_url: width: 700 | image_tag: class: 'gpl-fp__img', loading: 'lazy' }}
    </div>
    <div class="gpl-fp__body">
      <p class="gpl-fp__eyebrow">Featured product</p>
      <h2 class="gpl-fp__title">{{ p.title }}</h2>
      <p class="gpl-fp__price">{{ p.price | money }}</p>
      <p class="gpl-fp__desc">{{ p.description | strip_html | truncate: 180 }}</p>
      <a class="gpl-fp__btn" href="{{ p.url }}">{{ section.settings.cta }}</a>
    </div>
  {%- endif -%}
</div>

{% schema %}
{
  "name": "Featured product",
  "settings": [
    { "type": "product", "id": "product", "label": "Product" },
    { "type": "text", "id": "cta", "label": "Button label", "default": ${js(str(v, "cta"))} }
  ],
  "presets": [{ "name": "Featured product" }]
}
{% endschema %}`,
      css: `.gpl-fp { display: grid; gap: 1.5rem; align-items: center; padding: 1.5rem 0; }
@media (min-width: 750px) { .gpl-fp { grid-template-columns: 1fr 1fr; gap: 3rem; } }
.gpl-fp__img { width: 100%; border-radius: 14px; display: block; }
.gpl-fp__eyebrow { margin: 0; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: rgb(var(--color-button, 21 128 61)); }
.gpl-fp__title { margin: 0.4rem 0 0; font-size: 1.4rem; font-weight: 800; }
.gpl-fp__price { margin: 0.4rem 0 0; font-size: 1.1rem; font-weight: 800; }
.gpl-fp__desc { margin: 0.75rem 0 0; font-size: 0.82rem; line-height: 1.6; color: rgb(var(--color-foreground, 100 116 139) / 0.8); }
.gpl-fp__btn {
  display: inline-block;
  margin-top: 1.25rem;
  padding: 0.75rem 1.75rem;
  border-radius: 999px;
  background: rgb(var(--color-button, 15 23 42));
  color: rgb(var(--color-button-text, 255 255 255));
  text-decoration: none;
  font-weight: 700;
}`,
    }),
  },
  {
    id: "search-hero",
    name: "Search + trending chips",
    description: "A big centered search box with trending searches - put discovery front and center.",
    category: "Headers & navigation",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 50 },
      { id: "chips", label: "Trending terms (comma separated)", type: "text", maxLength: 120 },
    ],
    defaults: { heading: "What are you looking for?", chips: "overshirt, linen, cotton tee, gift" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-search">
  <h2 class="gpl-search__heading">{{ section.settings.heading }}</h2>
  <form action="{{ routes.search_url }}" method="get" class="gpl-search__form" role="search">
    <input type="search" name="q" placeholder="Search products…" class="gpl-search__input">
    <button type="submit" class="gpl-search__btn" aria-label="Search">&#128269;</button>
  </form>
  {%- assign chips = section.settings.chips | split: ',' -%}
  <div class="gpl-search__chips">
    {%- for chip in chips -%}
      <a href="{{ routes.search_url }}?q={{ chip | strip | url_encode }}" class="gpl-search__chip">{{ chip | strip }}</a>
    {%- endfor -%}
  </div>
</div>

{% schema %}
{
  "name": "Search hero",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading"))} },
    { "type": "text", "id": "chips", "label": "Trending terms (comma separated)", "default": ${js(str(v, "chips"))} }
  ],
  "presets": [{ "name": "Search hero" }]
}
{% endschema %}`,
      css: `.gpl-search { padding: 2rem 0; text-align: center; }
.gpl-search__heading { margin: 0; font-size: 1.4rem; font-weight: 800; }
.gpl-search__form { display: flex; gap: 0.5rem; max-width: 28rem; margin: 1.25rem auto 0; }
.gpl-search__input {
  flex: 1;
  padding: 0.85rem 1.25rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3);
  border-radius: 999px;
  background: transparent;
  font-size: 0.85rem;
}
.gpl-search__btn {
  width: 3rem;
  border: 0;
  border-radius: 999px;
  background: rgb(var(--color-button, 15 23 42));
  color: rgb(var(--color-button-text, 255 255 255));
  cursor: pointer;
}
.gpl-search__chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; margin-top: 1rem; }
.gpl-search__chip {
  padding: 0.35rem 0.9rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.25);
  border-radius: 999px;
  font-size: 0.68rem;
  text-decoration: none;
  color: inherit;
}`,
    }),
  },
  {
    id: "made-to-order",
    name: "Made-to-order lead time",
    description: "'Made to order - ships in X days' badge - sets expectations honestly for handcrafted sellers.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "days", label: "Lead time (days)", type: "text", maxLength: 3 },
      { id: "text", label: "Custom text", type: "text", maxLength: 80 },
    ],
    defaults: { days: "5", text: "Each piece is made to order" },
    install: snippetSteps("made-to-order.liquid"),
    files: (v) => ({
      liquid: `<p class="gpl-mto">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  {{ text | default: 'Made to order' }} - ships in {{ days | default: 5 }} days
</p>`,
      css: `.gpl-mto { display: flex; align-items: center; gap: 0.45rem; margin: 0.5rem 0; font-size: 0.72rem; color: rgb(var(--color-foreground, 100 116 139) / 0.85); }
.gpl-mto svg { width: 0.85rem; height: 0.85rem; }`,
      usage: `{% render 'made-to-order', text: ${js(str(v, "text"))}, days: ${js(str(v, "days"))} %}`,
    }),
  },
  {
    id: "fit-note",
    name: "Fit / size note",
    description: "'Runs true to size' microcopy from a metafield - answers the #1 clothing question inline.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "fit", label: "Fit", type: "select", options: [{ value: "true", label: "True to size" }, { value: "small", label: "Runs small" }, { value: "large", label: "Runs large" }] },
    ],
    defaults: { fit: "true" },
    install: [
      ...snippetSteps("fit-note.liquid"),
      "Drive this from product.metafields.custom.fit so each product shows its real fit - hardcoding 'true to size' on everything is lying.",
    ],
    files: (v) => ({
      liquid: `{%- assign f = product.metafields.custom.fit.value | default: fit -%}
<p class="gpl-fit">
  {%- if f == 'small' -%}
    Runs small - consider sizing up
  {%- elsif f == 'large' -%}
    Runs large - consider sizing down
  {%- else -%}
    True to size - order your usual
  {%- endif -%}
</p>`,
      css: `.gpl-fit { margin: 0.4rem 0; font-size: 0.72rem; color: rgb(var(--color-foreground, 100 116 139) / 0.85); }`,
      usage: `{% render 'fit-note', product: product, fit: ${js(str(v, "fit"))} %}`,
    }),
  },
  {
    id: "warranty-badge",
    name: "Warranty badge",
    description: "A 'X-year warranty' pill - big-ticket items need this near the price.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "term", label: "Term", type: "text", maxLength: 30 },
      { id: "detail", label: "Detail", type: "text", maxLength: 80 },
    ],
    defaults: { term: "1-year warranty", detail: "Covers manufacturing defects" },
    install: snippetSteps("warranty-badge.liquid"),
    files: (v) => ({
      liquid: `<div class="gpl-war">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
  <div>
    <p class="gpl-war__term">{{ term | default: '1-year warranty' }}</p>
    {%- if detail != blank -%}
      <p class="gpl-war__detail">{{ detail }}</p>
    {%- endif -%}
  </div>
</div>`,
      css: `.gpl-war { display: flex; align-items: center; gap: 0.6rem; margin: 0.75rem 0; padding: 0.7rem 0.9rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.2); border-radius: 10px; }
.gpl-war svg { width: 1.1rem; height: 1.1rem; color: #16a34a; flex-shrink: 0; }
.gpl-war__term { margin: 0; font-size: 0.78rem; font-weight: 700; }
.gpl-war__detail { margin: 0.15rem 0 0; font-size: 0.65rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
      usage: `{% render 'warranty-badge', term: ${js(str(v, "term"))}, detail: ${js(str(v, "detail"))} %}`,
    }),
  },
  {
    id: "charity-note",
    name: "Give-back note",
    description: "'₹X of every order goes to Y' - real cause marketing that actually converts.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "amount", label: "Amount", type: "text", maxLength: 20 },
      { id: "cause", label: "Cause", type: "text", maxLength: 60 },
    ],
    defaults: { amount: "₹50", cause: "tree planting in the Western Ghats" },
    install: [
      ...snippetSteps("charity-note.liquid"),
      "Only show this if you actually donate - it's a claim, not a badge.",
    ],
    files: (v) => ({
      liquid: `<p class="gpl-charity">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.5-1.5 3-3.3 3-5.5A5.5 5.5 0 0 0 12 4 5.5 5.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7z"/></svg>
  {{ amount | default: '₹50' }} of every order goes to {{ cause | default: 'a good cause' }}
</p>`,
      css: `.gpl-charity { display: flex; align-items: center; gap: 0.45rem; margin: 0.5rem 0; font-size: 0.72rem; color: rgb(var(--color-foreground, 100 116 139) / 0.85); }
.gpl-charity svg { width: 0.85rem; height: 0.85rem; color: #16a34a; }`,
      usage: `{% render 'charity-note', amount: ${js(str(v, "amount"))}, cause: ${js(str(v, "cause"))} %}`,
    }),
  },
  {
    id: "multi-location-stock",
    name: "Pickup availability by store",
    description: "'In stock at Bandra, pickup today' per location - local inventory messaging for multi-store merchants.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "stores", label: "Stores (name|status per line)", type: "text", maxLength: 200 },
    ],
    defaults: { stores: "Bandra|In stock - pickup today\nDelhi CP|Low stock\nOnline|Ships in 24h" },
    install: [
      ...snippetSteps("multi-location-stock.liquid"),
      "For real inventory, pair with product.inventory or a metafield - this version uses values you control.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-loc2">
  {%- assign rows = stores | newline_to_br | split: '<br />' -%}
  {%- for row in rows -%}
    {%- assign parts = row | strip | split: '|' -%}
    <div class="gpl-loc2__row">
      <span class="gpl-loc2__dot{% if parts[1] contains 'Low' %} gpl-loc2__dot--low{% endif %}"></span>
      <span class="gpl-loc2__store">{{ parts[0] | strip }}</span>
      <span class="gpl-loc2__status">{{ parts[1] | strip }}</span>
    </div>
  {%- endfor -%}
</div>`,
      css: `.gpl-loc2 { display: grid; gap: 0.5rem; margin: 0.75rem 0; }
.gpl-loc2__row { display: flex; align-items: center; gap: 0.55rem; font-size: 0.75rem; }
.gpl-loc2__dot { width: 0.55rem; height: 0.55rem; border-radius: 999px; background: #16a34a; flex-shrink: 0; }
.gpl-loc2__dot--low { background: #f59e0b; }
.gpl-loc2__store { font-weight: 700; min-width: 6rem; }
.gpl-loc2__status { color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
      usage: `{% render 'multi-location-stock', stores: ${js(str(v, "stores"))} %}`,
    }),
  },
  {
    id: "variant-swatches",
    name: "Colour swatches",
    description: "Visual colour dots for the colour option - the single most-expected feature on fashion stores (96% of premium themes have it).",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "shape", label: "Shape", type: "select", options: [{ value: "round", label: "Round" }, { value: "square", label: "Square" }] },
    ],
    defaults: { shape: "round" },
    install: [
      ...snippetSteps("variant-swatches.liquid"),
      "Replace or sit next to the theme's variant picker - swatch names map to CSS colour names or a metafield list of hex values.",
      "For non-standard colour names (e.g. 'Midnight'), add a metafield map: 'Midnight=#1e293b' per line.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-sw{% if shape == 'square' %} gpl-sw--sq{% endif %}">
  {%- assign colour_opt = product.options_with_values | where: 'name', 'Color' | first | default: product.options_with_values | where: 'name', 'Colour' | first -%}
  {%- if colour_opt -%}
    <p class="gpl-sw__label">Colour: <b data-gpl-sw-label>{{ colour_opt.selected_value }}</b></p>
    <div class="gpl-sw__row">
      {%- for val in colour_opt.values -%}
        <button type="button" class="gpl-sw__dot{% if val == colour_opt.selected_value %} is-sel{% endif %}" data-val="{{ val }}" style="--gpl-sw: {{ val | handleize | replace: '-', ' ' }}" title="{{ val }}" aria-label="{{ val }}"></button>
      {%- endfor -%}
    </div>
  {%- endif -%}
</div>`,
      css: `.gpl-sw { margin: 0.75rem 0; }
.gpl-sw__label { margin: 0 0 0.5rem; font-size: 0.72rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-sw__label b { color: inherit; }
.gpl-sw__row { display: flex; gap: 0.5rem; }
.gpl-sw__dot {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 999px;
  border: 2px solid rgb(var(--color-foreground, 148 163 184) / 0.3);
  background: var(--gpl-sw);
  cursor: pointer;
  padding: 0;
}
.gpl-sw--sq .gpl-sw__dot { border-radius: 6px; }
.gpl-sw__dot.is-sel { border-color: rgb(var(--color-button, 15 23 42)); box-shadow: 0 0 0 2px rgb(var(--color-background, 255 255 255)) inset; }`,
      js: `document.querySelectorAll('.gpl-sw').forEach((el) => {
  el.querySelectorAll('.gpl-sw__dot').forEach((dot) => {
    dot.addEventListener('click', () => {
      el.querySelectorAll('.gpl-sw__dot').forEach((d) => d.classList.remove('is-sel'));
      dot.classList.add('is-sel');
      const label = el.querySelector('[data-gpl-sw-label]');
      if (label) label.textContent = dot.dataset.val;
    });
  });
});`,
      usage: `{% render 'variant-swatches', product: product, shape: ${js(str(v, "shape"))} %}`,
    }),
  },
  {
    id: "frequently-bought",
    name: "Frequently bought together",
    description: "Amazon-style checkbox bundle - main product + 2-3 picks, combined price, one 'add all' button.",
    category: "Cart & checkout",
    kind: "snippet",
    controls: [
      { id: "handles", label: "Extra product handles (comma separated)", type: "text", maxLength: 120 },
      { id: "heading", label: "Heading", type: "text", maxLength: 40 },
    ],
    defaults: { handles: "accessory-1,accessory-2", heading: "Frequently bought together" },
    install: [
      ...snippetSteps("frequently-bought.liquid"),
      "Pick real complements (charger + case, shampoo + conditioner) - random picks get unchecked and ignored.",
    ],
    files: (v) => ({
      liquid: `<gpl-fbt class="gpl-fbt" data-base="{{ product.price | plus: 0 }}" data-mainvid="{{ product.selected_or_first_available_variant.id | default: 0 }}">
  <p class="gpl-fbt__heading">{{ heading | default: 'Frequently bought together' }}</p>
  <label class="gpl-fbt__row">
    <input type="checkbox" checked disabled>
    <span class="gpl-fbt__name">This item: {{ product.title }}</span>
    <b class="gpl-fbt__price">{{ product.price | money }}</b>
  </label>
  {%- assign hs = handles | split: ',' -%}
  {%- for h in hs -%}
    {%- assign h_stripped = h | strip -%}
    {%- assign p = all_products[h_stripped] -%}
    {%- if p -%}
      <label class="gpl-fbt__row">
        <input type="checkbox" checked data-fbt data-vid="{{ p.selected_or_first_available_variant.id }}" data-price="{{ p.price }}">
        <span class="gpl-fbt__name">{{ p.title }}</span>
        <b class="gpl-fbt__price">{{ p.price | money }}</b>
      </label>
    {%- endif -%}
  {%- endfor -%}
  <button type="button" class="gpl-fbt__add" data-add>Add selected - <span data-total>{{ product.price | plus: 0 | money }}</span></button>
</gpl-fbt>`,
      css: `.gpl-fbt { display: block; margin: 1rem 0; padding: 1rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.2); border-radius: 12px; }
.gpl-fbt__heading { margin: 0 0 0.75rem; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
.gpl-fbt__row { display: flex; align-items: center; gap: 0.6rem; padding: 0.55rem 0; font-size: 0.78rem; cursor: pointer; }
.gpl-fbt__row input { accent-color: rgb(var(--color-button, 21 128 61)); }
.gpl-fbt__name { flex: 1; }
.gpl-fbt__price { font-weight: 700; }
.gpl-fbt__add {
  margin-top: 0.75rem;
  width: 100%;
  padding: 0.75rem;
  border: 0;
  border-radius: 10px;
  background: rgb(var(--color-button, 15 23 42));
  color: rgb(var(--color-button-text, 255 255 255));
  font-weight: 800;
  font-size: 0.82rem;
  cursor: pointer;
}`,
      js: `document.querySelectorAll('gpl-fbt').forEach((el) => {
  const boxes = [...el.querySelectorAll('[data-fbt]')];
  const total = el.querySelector('[data-total]');
  const base = Number(el.dataset.base) || 0;
  const mainVid = Number(el.dataset.mainvid) || 0;
  function update() {
    const sum = boxes.filter((b) => b.checked).reduce((s, b) => s + Number(b.dataset.price), base);
    total.textContent = (typeof Shopify !== 'undefined' && Shopify.formatMoney) ? Shopify.formatMoney(sum) : '₹' + (sum / 100).toFixed(0);
  }
  boxes.forEach((b) => b.addEventListener('change', update));
  update();
  el.querySelector('[data-add]').addEventListener('click', async () => {
    const items = [{ id: mainVid, quantity: 1 }];
    boxes.filter((b) => b.checked).forEach((b) => items.push({ id: Number(b.dataset.vid), quantity: 1 }));
    await fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items }) });
    window.location.href = '/cart';
  });
});`,
      usage: `{% render 'frequently-bought', product: product, handles: ${js(str(v, "handles"))}, heading: ${js(str(v, "heading"))} %}`,
    }),
  },
  {
    id: "quick-view",
    name: "Quick view button",
    description: "A 'quick view' overlay on product cards - title, price, image and a link to the full page without leaving the collection.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "label", label: "Button label", type: "text", maxLength: 20 },
    ],
    defaults: { label: "Quick view" },
    install: [
      ...snippetSteps("quick-view.liquid"),
      "Render inside the product card in your collection grid - works as an overlay panel, not a full theme modal.",
    ],
    files: (v) => ({
      liquid: `<gpl-qv class="gpl-qv">
  <button type="button" class="gpl-qv__btn" data-open>{{ label | default: 'Quick view' }}</button>
  <div class="gpl-qv__pop" hidden>
    <button type="button" class="gpl-qv__close" aria-label="Close">&times;</button>
    {{ product.featured_image | image_url: width: 500 | image_tag: class: 'gpl-qv__img' }}
    <p class="gpl-qv__title">{{ product.title }}</p>
    <p class="gpl-qv__price">{{ product.price | money }}</p>
    <a class="gpl-qv__link" href="{{ product.url }}">View full details &rarr;</a>
  </div>
</gpl-qv>`,
      css: `.gpl-qv { position: relative; }
.gpl-qv__btn {
  padding: 0.45rem 0.9rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3);
  border-radius: 999px;
  background: rgb(var(--color-background, 255 255 255));
  font-size: 0.68rem;
  font-weight: 700;
  cursor: pointer;
}
.gpl-qv__pop {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  width: 13rem;
  padding: 0.9rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.2);
  border-radius: 12px;
  background: rgb(var(--color-background, 255 255 255));
  box-shadow: 0 10px 30px rgb(0 0 0 / 0.15);
  text-align: center;
}
.gpl-qv__img { width: 100%; border-radius: 8px; }
.gpl-qv__close { position: absolute; top: 0.4rem; right: 0.6rem; border: 0; background: none; font-size: 1.1rem; cursor: pointer; }
.gpl-qv__title { margin: 0.5rem 0 0; font-size: 0.78rem; font-weight: 700; }
.gpl-qv__price { margin: 0.2rem 0 0; font-size: 0.72rem; }
.gpl-qv__link { display: inline-block; margin-top: 0.6rem; font-size: 0.7rem; font-weight: 700; color: rgb(var(--color-button, 21 128 61)); }`,
      js: `document.querySelectorAll('gpl-qv').forEach((el) => {
  const pop = el.querySelector('.gpl-qv__pop');
  el.querySelector('[data-open]').addEventListener('click', () => (pop.hidden = !pop.hidden));
  el.querySelector('.gpl-qv__close').addEventListener('click', () => (pop.hidden = true));
});`,
      usage: `{% render 'quick-view', product: product, label: ${js(str(v, "label"))} %}`,
    }),
  },
  {
    id: "image-rollover",
    name: "Hover image swap",
    description: "Shows the product's second image on hover - 92% of premium themes have this 'rollover' effect on cards.",
    category: "Product page",
    kind: "snippet",
    controls: [],
    defaults: {},
    install: [
      ...snippetSteps("image-rollover.liquid"),
      "Wrap your product card image with this - requires the product to have 2+ images to do anything.",
    ],
    files: () => ({
      liquid: `<div class="gpl-roll">
  {{ product.featured_image | image_url: width: 600 | image_tag: class: 'gpl-roll__img gpl-roll__img--a' }}
  {%- if product.images[1] -%}
    {{ product.images[1] | image_url: width: 600 | image_tag: class: 'gpl-roll__img gpl-roll__img--b', loading: 'lazy' }}
  {%- endif -%}
</div>`,
      css: `.gpl-roll { position: relative; overflow: hidden; }
.gpl-roll__img { display: block; width: 100%; transition: opacity 0.3s; }
.gpl-roll__img--b { position: absolute; inset: 0; opacity: 0; }
.gpl-roll:hover .gpl-roll__img--b { opacity: 1; }`,
      usage: `{% render 'image-rollover', product: product %}`,
    }),
  },
  {
    id: "mega-menu-panel",
    name: "Mega menu panel",
    description: "A wide multi-column dropdown with featured collections + a promo card - 95% of premium themes have one.",
    category: "Headers & navigation",
    kind: "section",
    controls: [
      { id: "cols", label: "Link columns (heading|links per line, links comma-separated)", type: "text", maxLength: 400 },
    ],
    defaults: {
      cols: "Shop|New in,Bestsellers,Sale\nCollections|Tees,Bottoms,Sets\nHelp|Track order,Returns,Contact",
    },
    install: [
      ...sectionSteps,
      "For real use, drive columns from linklists: linklists[section.settings.menu].links - this demo uses a text list.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-mega">
  {%- assign rows = section.settings.cols | newline_to_br | split: '<br />' -%}
  {%- for row in rows -%}
    {%- assign parts = row | strip | split: '|' -%}
    <div class="gpl-mega__col">
      <p class="gpl-mega__head">{{ parts[0] | strip }}</p>
      {%- assign links = parts[1] | split: ',' -%}
      {%- for link in links -%}
        <a class="gpl-mega__link" href="#">{{ link | strip }}</a>
      {%- endfor -%}
    </div>
  {%- endfor -%}
  <a class="gpl-mega__promo" href="{{ section.settings.promo_link | default: '#' }}">
    <span class="gpl-mega__promo-label">{{ section.settings.promo_label | default: 'Sale ends tonight' }}</span>
    <span class="gpl-mega__promo-cta">{{ section.settings.promo_cta | default: 'Shop the sale' }} &rarr;</span>
  </a>
</div>

{% schema %}
{
  "name": "Mega menu",
  "settings": [
    { "type": "textarea", "id": "cols", "label": "Columns (heading|links per line)", "default": ${js(str(v, "cols"))} },
    { "type": "text", "id": "promo_label", "label": "Promo label", "default": "Sale ends tonight" },
    { "type": "text", "id": "promo_cta", "label": "Promo CTA", "default": "Shop the sale" },
    { "type": "url", "id": "promo_link", "label": "Promo link" }
  ],
  "presets": [{ "name": "Mega menu" }]
}
{% endschema %}`,
      css: `.gpl-mega { display: grid; grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr)); gap: 1.5rem; padding: 1.5rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.15); border-radius: 14px; background: rgb(var(--color-background, 255 255 255)); }
.gpl-mega__head { margin: 0 0 0.6rem; font-size: 0.62rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-mega__link { display: block; padding: 0.3rem 0; font-size: 0.78rem; text-decoration: none; color: inherit; }
.gpl-mega__link:hover { color: rgb(var(--color-button, 21 128 61)); }
.gpl-mega__promo {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.3rem;
  min-height: 8rem;
  padding: 1rem;
  border-radius: 10px;
  background: rgb(var(--color-button, 21 128 61) / 0.08);
  text-decoration: none;
  color: inherit;
}
.gpl-mega__promo-label { font-size: 0.78rem; font-weight: 800; }
.gpl-mega__promo-cta { font-size: 0.65rem; font-weight: 700; color: rgb(var(--color-button, 21 128 61)); }`,
    }),
  },
  {
    id: "mobile-bottom-nav",
    name: "Mobile bottom nav bar",
    description: "App-like bottom navigation on mobile - home, search, cart, account - the pattern every m-commerce app trains users on.",
    category: "Headers & navigation",
    kind: "snippet",
    controls: [],
    defaults: {},
    install: [
      ...snippetSteps("mobile-bottom-nav.liquid"),
      "Render in the theme footer or layout - it only shows below 750px so desktop is untouched.",
    ],
    files: () => ({
      liquid: `<nav class="gpl-bnav" aria-label="Mobile navigation">
  <a href="{{ routes.root_url }}" class="gpl-bnav__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>Home</a>
  <a href="{{ routes.search_url }}" class="gpl-bnav__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>Search</a>
  <a href="{{ routes.cart_url }}" class="gpl-bnav__item gpl-bnav__item--cart"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>Cart</a>
  <a href="{{ routes.account_url }}" class="gpl-bnav__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Account</a>
</nav>`,
      css: `.gpl-bnav {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 60;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.2);
  background: rgb(var(--color-background, 255 255 255));
  padding-bottom: env(safe-area-inset-bottom);
}
@media (max-width: 749px) { .gpl-bnav { display: grid; } }
.gpl-bnav__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  padding: 0.6rem 0;
  font-size: 0.58rem;
  font-weight: 600;
  text-decoration: none;
  color: inherit;
}
.gpl-bnav__item svg { width: 1.2rem; height: 1.2rem; }`,
      usage: `{% render 'mobile-bottom-nav' %}`,
    }),
  },
  {
    id: "product-finder-quiz",
    name: "Product finder quiz",
    description: "A 'find your X' quiz where every answer points at its own product or collection - converts browsers into buyers, no app needed.",
    category: "Marketing",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 60 },
    ],
    defaults: { heading: "Find your perfect fit" },
    install: [
      ...sectionSteps,
      "Each answer option has its own result link (product or collection) - the last answer's link is the recommendation.",
    ],
    files: (v) => ({
      liquid: `<gpl-quiz class="gpl-quiz">
  <p class="gpl-quiz__heading">{{ section.settings.heading }}</p>
  <p class="gpl-quiz__progress" data-progress>1 / {{ section.blocks.size }}</p>
  {%- for block in section.blocks -%}
    <div class="gpl-quiz__q"{% unless forloop.first %} hidden{% endunless %} data-q="{{ forloop.index }}" {{ block.shopify_attributes }}>
      <p class="gpl-quiz__qtext">{{ block.settings.question | escape }}</p>
      <div class="gpl-quiz__opts">
        {%- for i in (1..4) -%}
          {%- capture lkey %}option_{{ i }}{% endcapture -%}
          {%- capture ukey %}link_{{ i }}{% endcapture -%}
          {%- if block.settings[lkey] != blank -%}
            <button type="button" class="gpl-quiz__opt" data-url="{{ block.settings[ukey] }}" data-next="{{ forloop.parent.index | plus: 1 }}">{{ block.settings[lkey] | escape }}</button>
          {%- endif -%}
        {%- endfor -%}
      </div>
    </div>
  {%- endfor -%}
  <div class="gpl-quiz__done" data-done hidden>
    <p class="gpl-quiz__done-text">Here's your match</p>
    <a class="gpl-quiz__result" href="#" data-result>See your pick &rarr;</a>
    <button type="button" class="gpl-quiz__restart" data-restart>Start over</button>
  </div>
</gpl-quiz>

{% schema %}
{
  "name": "Product finder quiz",
  "max_blocks": 6,
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading"))} }
  ],
  "blocks": [
    {
      "type": "question",
      "name": "Question",
      "settings": [
        { "type": "text", "id": "question", "label": "Question" },
        { "type": "text", "id": "option_1", "label": "Option 1" },
        { "type": "url", "id": "link_1", "label": "Option 1 result link" },
        { "type": "text", "id": "option_2", "label": "Option 2" },
        { "type": "url", "id": "link_2", "label": "Option 2 result link" },
        { "type": "text", "id": "option_3", "label": "Option 3" },
        { "type": "url", "id": "link_3", "label": "Option 3 result link" },
        { "type": "text", "id": "option_4", "label": "Option 4" },
        { "type": "url", "id": "link_4", "label": "Option 4 result link" }
      ]
    }
  ],
  "presets": [{ "name": "Product finder quiz" }]
}
{% endschema %}`,
      css: `.gpl-quiz { display: block; padding: 2rem 1rem; text-align: center; }
.gpl-quiz__heading { margin: 0 0 0.5rem; font-size: 1.2rem; font-weight: 800; }
.gpl-quiz__progress { margin: 0 0 1.25rem; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; }
.gpl-quiz__q[hidden] { display: none; }
.gpl-quiz__qtext { margin: 0 0 1rem; font-size: 0.95rem; font-weight: 600; }
.gpl-quiz__opts { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.6rem; }
.gpl-quiz__opt {
  padding: 0.7rem 1.4rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3);
  border-radius: 999px;
  background: transparent;
  color: inherit;
  font-size: 0.78rem;
  cursor: pointer;
}
.gpl-quiz__opt:hover { border-color: rgb(var(--color-button, 21 128 61)); }
.gpl-quiz__result { display: inline-block; margin-top: 1rem; padding: 0.75rem 1.75rem; border-radius: 999px; background: rgb(var(--color-button, 15 23 42)); color: rgb(var(--color-button-text, 255 255 255)); text-decoration: none; font-weight: 700; }
.gpl-quiz__restart { display: block; margin: 0.9rem auto 0; border: 0; background: none; font-size: 0.68rem; text-decoration: underline; cursor: pointer; color: #64748b; }`,
      js: `document.querySelectorAll('gpl-quiz').forEach((el) => {
  const total = el.querySelectorAll('.gpl-quiz__q').length;
  el.querySelectorAll('.gpl-quiz__opt').forEach((opt) => {
    opt.addEventListener('click', () => {
      const next = el.querySelector('[data-q="' + opt.dataset.next + '"]');
      opt.closest('.gpl-quiz__q').hidden = true;
      if (next) {
        next.hidden = false;
        el.querySelector('[data-progress]').textContent = opt.dataset.next + ' / ' + total;
      } else {
        el.querySelector('[data-progress]').hidden = true;
        el.querySelector('[data-result]').href = opt.dataset.url || '#';
        el.querySelector('[data-result]').textContent = 'See: ' + opt.textContent;
        el.querySelector('[data-done]').hidden = false;
      }
    });
  });
  el.querySelector('[data-restart]').addEventListener('click', () => {
    el.querySelector('[data-done]').hidden = true;
    el.querySelector('[data-progress]').hidden = false;
    el.querySelector('[data-progress]').textContent = '1 / ' + total;
    el.querySelectorAll('.gpl-quiz__q').forEach((q, i) => { q.hidden = i !== 0; });
  });
});`,
    }),
  },
  {
    id: "image-accordion",
    name: "Expanding image accordion",
    description: "Side-by-side image panels that expand on hover - a premium lookbook pattern that photographs beautifully.",
    category: "Content",
    kind: "section",
    controls: [
      { id: "items", label: "Panels (label|caption per line)", type: "text", maxLength: 300 },
    ],
    defaults: { items: "New in|Spring drop\nBestsellers|What people love\nSale|Last sizes" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-acc2">
  {%- assign rows = section.settings.items | newline_to_br | split: '<br />' -%}
  {%- for row in rows -%}
    {%- assign parts = row | strip | split: '|' -%}
    <div class="gpl-acc2__panel" data-panel>
      {%- if section.blocks[forloop.index0].settings.image -%}
        {{ section.blocks[forloop.index0].settings.image | image_url: width: 800 | image_tag: class: 'gpl-acc2__img', loading: 'lazy' }}
      {%- endif -%}
      <div class="gpl-acc2__body">
        <p class="gpl-acc2__label">{{ parts[0] | strip }}</p>
        <p class="gpl-acc2__cap">{{ parts[1] | strip }}</p>
      </div>
    </div>
  {%- endfor -%}
</div>

{% schema %}
{
  "name": "Image accordion",
  "settings": [
    { "type": "textarea", "id": "items", "label": "Panels (label|caption per line)", "default": ${js(str(v, "items"))} }
  ],
  "blocks": [
    { "type": "image", "name": "Panel image", "settings": [{ "type": "image_picker", "id": "image", "label": "Image" }] }
  ],
  "presets": [{ "name": "Image accordion" }]
}
{% endschema %}`,
      css: `.gpl-acc2 { display: flex; gap: 0.5rem; height: 24rem; }
.gpl-acc2__panel {
  position: relative;
  flex: 1;
  border-radius: 14px;
  overflow: hidden;
  transition: flex 0.4s;
}
.gpl-acc2__panel:hover, .gpl-acc2__panel.is-active { flex: 3; }
.gpl-acc2__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.gpl-acc2__body {
  position: absolute;
  inset: auto 0 0;
  padding: 1.25rem;
  background: linear-gradient(to top, rgb(0 0 0 / 0.7), transparent);
  color: #fff;
}
.gpl-acc2__label { margin: 0; font-weight: 800; }
.gpl-acc2__cap { margin: 0.3rem 0 0; font-size: 0.72rem; opacity: 0.9; }
@media (max-width: 640px) { .gpl-acc2 { flex-direction: column; height: auto; } .gpl-acc2__panel { min-height: 8rem; } }`,
    }),
  },
  {
    id: "tabbed-collections",
    name: "Tabbed product grids",
    description: "Tabs that swap between collection grids - 'New in / Bestsellers / Sale' on the homepage without scrolling.",
    category: "Content",
    kind: "section",
    controls: [
      { id: "tabs", label: "Tabs (label|collection per line)", type: "text", maxLength: 200 },
    ],
    defaults: { tabs: "New in|new-arrivals\nBestsellers|bestsellers\nSale|sale" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<gpl-ctabs class="gpl-ctabs">
  <div class="gpl-ctabs__nav">
    {%- assign rows = section.settings.tabs | newline_to_br | split: '<br />' -%}
    {%- for row in rows -%}
      {%- assign parts = row | strip | split: '|' -%}
      <button type="button" class="gpl-ctabs__btn{% if forloop.first %} is-active{% endif %}" data-tab="{{ forloop.index0 }}">{{ parts[0] | strip }}</button>
    {%- endfor -%}
  </div>
  {%- for row in rows -%}
    {%- assign parts = row | strip | split: '|' -%}
    {%- assign col_handle = parts[1] | strip | handleize -%}
    {%- assign c = collections[col_handle] -%}
    <div class="gpl-ctabs__grid"{% unless forloop.first %} hidden{% endunless %} data-panel="{{ forloop.index0 }}">
      {%- for p in c.products limit: 4 -%}
        <a class="gpl-ctabs__card" href="{{ p.url }}">
          {{ p.featured_image | image_url: width: 400 | image_tag: class: 'gpl-ctabs__img', loading: 'lazy' }}
          <span class="gpl-ctabs__title">{{ p.title }}</span>
          <span class="gpl-ctabs__price">{{ p.price | money }}</span>
        </a>
      {%- endfor -%}
    </div>
  {%- endfor -%}
</gpl-ctabs>

{% schema %}
{
  "name": "Tabbed collections",
  "settings": [
    { "type": "textarea", "id": "tabs", "label": "Tabs (label|collection per line)", "default": ${js(str(v, "tabs"))} }
  ],
  "presets": [{ "name": "Tabbed collections" }]
}
{% endschema %}`,
      css: `.gpl-ctabs { display: block; padding: 1.5rem 0; }
.gpl-ctabs__nav { display: flex; gap: 0.5rem; margin-bottom: 1.25rem; }
.gpl-ctabs__btn {
  padding: 0.5rem 1.1rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.25);
  border-radius: 999px;
  background: none;
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  color: inherit;
}
.gpl-ctabs__btn.is-active { background: rgb(var(--color-button, 15 23 42)); color: rgb(var(--color-button-text, 255 255 255)); border-color: transparent; }
.gpl-ctabs__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.9rem; }
.gpl-ctabs__grid[hidden] { display: none; }
@media (max-width: 750px) { .gpl-ctabs__grid { grid-template-columns: repeat(2, 1fr); } }
.gpl-ctabs__card { text-decoration: none; color: inherit; }
.gpl-ctabs__img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 12px; display: block; }
.gpl-ctabs__title { display: block; margin-top: 0.5rem; font-size: 0.75rem; font-weight: 600; }
.gpl-ctabs__price { display: block; font-size: 0.68rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
      js: `document.querySelectorAll('gpl-ctabs').forEach((el) => {
  el.querySelectorAll('.gpl-ctabs__btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      el.querySelectorAll('.gpl-ctabs__btn').forEach((b) => b.classList.remove('is-active'));
      el.querySelectorAll('.gpl-ctabs__grid').forEach((g) => (g.hidden = true));
      btn.classList.add('is-active');
      el.querySelector('[data-panel="' + btn.dataset.tab + '"]').classList.remove('hidden');
    });
  });
});`,
    }),
  },
  {
    id: "checkout-progress",
    name: "Checkout steps indicator",
    description: "Cart &gt; info &gt; payment steps bar - shows shoppers exactly where they are in checkout.",
    category: "Cart & checkout",
    kind: "snippet",
    controls: [
      { id: "step", label: "Current step", type: "select", options: [{ value: "1", label: "1 - Cart" }, { value: "2", label: "2 - Details" }, { value: "3", label: "3 - Payment" }] },
    ],
    defaults: { step: "2" },
    install: snippetSteps("checkout-progress.liquid"),
    files: (v) => ({
      liquid: `{%- assign cur = step | plus: 0 -%}
<ol class="gpl-steps">
  <li class="gpl-steps__step{% if cur >= 1 %} is-done{% endif %}{% if cur == 1 %} is-current{% endif %}"><span>1</span>Cart</li>
  <li class="gpl-steps__step{% if cur >= 2 %} is-done{% endif %}{% if cur == 2 %} is-current{% endif %}"><span>2</span>Details</li>
  <li class="gpl-steps__step{% if cur >= 3 %} is-done{% endif %}{% if cur == 3 %} is-current{% endif %}"><span>3</span>Payment</li>
</ol>`,
      css: `.gpl-steps { display: flex; gap: 0.5rem; margin: 0; padding: 0.75rem 0; list-style: none; }
.gpl-steps__step {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.68rem;
  color: rgb(var(--color-foreground, 100 116 139) / 0.6);
}
.gpl-steps__step span {
  display: grid;
  place-items: center;
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 999px;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3);
  font-size: 0.6rem;
  font-weight: 700;
}
.gpl-steps__step.is-done span { background: #16a34a; border-color: #16a34a; color: #fff; }
.gpl-steps__step.is-current { color: inherit; font-weight: 700; }`,
      usage: `{% render 'checkout-progress', step: ${js(str(v, "step"))} %}`,
    }),
  },
  {
    id: "wholesale-inquiry",
    name: "Wholesale / B2B inquiry form",
    description: "A 'bulk order? talk to us' form - name, company, quantity - the pattern B2B stores pay real money for.",
    category: "Marketing",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 50 },
    ],
    defaults: { heading: "Bulk order? Let's talk" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-b2b">
  <h2 class="gpl-b2b__heading">{{ section.settings.heading }}</h2>
  {%- form 'contact', class: 'gpl-b2b__form' -%}
    <input type="hidden" name="contact[tags]" value="wholesale">
    {%- if form.posted_successfully? -%}
      <p class="gpl-b2b__ok">Thanks - our wholesale team will reach out.</p>
    {%- endif -%}
    <input type="text" name="contact[name]" placeholder="Your name" required>
    <input type="text" name="contact[company]" placeholder="Company / shop name" required>
    <input type="email" name="contact[email]" placeholder="Work email" required>
    <input type="text" name="contact[qty]" placeholder="Approx. quantity needed">
    <button type="submit">Request wholesale pricing</button>
  {%- endform -%}
</div>

{% schema %}
{
  "name": "Wholesale inquiry",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading"))} }
  ],
  "presets": [{ "name": "Wholesale inquiry" }]
}
{% endschema %}`,
      css: `.gpl-b2b { padding: 1.5rem 0; max-width: 28rem; }
.gpl-b2b__heading { margin: 0 0 1rem; font-size: 1.1rem; font-weight: 800; }
.gpl-b2b__form { display: grid; gap: 0.6rem; }
.gpl-b2b__form input {
  padding: 0.7rem 0.9rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3);
  border-radius: 9px;
  background: transparent;
  font: inherit;
  font-size: 0.82rem;
}
.gpl-b2b__form button {
  padding: 0.75rem 1.75rem;
  border: 0;
  border-radius: 10px;
  background: rgb(var(--color-button, 15 23 42));
  color: rgb(var(--color-button-text, 255 255 255));
  font-weight: 800;
  cursor: pointer;
  justify-self: start;
}
.gpl-b2b__ok { margin: 0; color: #16a34a; font-size: 0.8rem; font-weight: 700; }`,
    }),
  },
  {
    id: "returns-request",
    name: "Return request form",
    description: "An order-number + reason return form - saves a support email chain on every return.",
    category: "Utility",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 50 },
    ],
    defaults: { heading: "Start a return" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-ret">
  <h2 class="gpl-ret__heading">{{ section.settings.heading }}</h2>
  {%- form 'contact', class: 'gpl-ret__form' -%}
    <input type="hidden" name="contact[tags]" value="return-request">
    {%- if form.posted_successfully? -%}
      <p class="gpl-ret__ok">Request received - we'll email the return label within a day.</p>
    {%- endif -%}
    <input type="text" name="contact[order]" placeholder="Order number (e.g. #1042)" required>
    <input type="email" name="contact[email]" placeholder="Order email" required>
    <textarea name="contact[body]" rows="3" placeholder="What went wrong?" required></textarea>
    <button type="submit">Request return</button>
  {%- endform -%}
  <p class="gpl-ret__note">7-day returns, no questions asked - we'll arrange pickup.</p>
</div>

{% schema %}
{
  "name": "Return request",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading"))} }
  ],
  "presets": [{ "name": "Return request" }]
}
{% endschema %}`,
      css: `.gpl-ret { padding: 1.5rem 0; max-width: 28rem; }
.gpl-ret__heading { margin: 0 0 1rem; font-size: 1.1rem; font-weight: 800; }
.gpl-ret__form { display: grid; gap: 0.6rem; }
.gpl-ret__form input, .gpl-ret__form textarea {
  padding: 0.7rem 0.9rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3);
  border-radius: 9px;
  background: transparent;
  font: inherit;
  font-size: 0.82rem;
}
.gpl-ret__form button {
  padding: 0.75rem 1.75rem;
  border: 0;
  border-radius: 10px;
  background: rgb(var(--color-button, 15 23 42));
  color: rgb(var(--color-button-text, 255 255 255));
  font-weight: 800;
  cursor: pointer;
  justify-self: start;
}
.gpl-ret__ok { margin: 0; color: #16a34a; font-size: 0.8rem; font-weight: 700; }
.gpl-ret__note { margin: 1rem 0 0; font-size: 0.68rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
    }),
  },
  {
    id: "bundle-builder",
    name: "Build-your-own bundle",
    description: "Pick any 3 products from a grid, see the running total, one 'add bundle' - the subscription-box pattern that lifts AOV.",
    category: "Cart & checkout",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 50 },
      { id: "pick", label: "Items to pick", type: "text", maxLength: 2 },
    ],
    defaults: { heading: "Build your bundle", pick: "3" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<gpl-bb class="gpl-bb" data-pick="{{ section.settings.pick | default: 3 }}">
  <p class="gpl-bb__heading">{{ section.settings.heading }}</p>
  <p class="gpl-bb__hint" data-hint>Pick {{ section.settings.pick | default: 3 }} items</p>
  {%- assign col = section.settings.collection -%}
  <div class="gpl-bb__grid">
    {%- for p in col.products limit: 8 -%}
      <button type="button" class="gpl-bb__card" data-card data-vid="{{ p.selected_or_first_available_variant.id }}" data-price="{{ p.price }}">
        {{ p.featured_image | image_url: width: 300 | image_tag: class: 'gpl-bb__img', loading: 'lazy' }}
        <span class="gpl-bb__title">{{ p.title }}</span>
        <span class="gpl-bb__price">{{ p.price | money }}</span>
        <span class="gpl-bb__tick">&#10003;</span>
      </button>
    {%- endfor -%}
  </div>
  <button type="button" class="gpl-bb__add" data-add disabled>Add bundle - <span data-total>₹0</span></button>
</gpl-bb>

{% schema %}
{
  "name": "Bundle builder",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading"))} },
    { "type": "range", "id": "pick", "label": "Items to pick", "min": 2, "max": 6, "step": 1, "default": 3 },
    { "type": "collection", "id": "collection", "label": "Bundle collection" }
  ],
  "presets": [{ "name": "Bundle builder" }]
}
{% endschema %}`,
      css: `.gpl-bb { display: block; padding: 1.5rem 0; }
.gpl-bb__heading { margin: 0; font-size: 1rem; font-weight: 800; }
.gpl-bb__hint { margin: 0.25rem 0 1rem; font-size: 0.72rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-bb__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; }
@media (max-width: 640px) { .gpl-bb__grid { grid-template-columns: repeat(2, 1fr); } }
.gpl-bb__card { position: relative; border: 2px solid rgb(var(--color-foreground, 148 163 184) / 0.2); border-radius: 12px; background: none; padding: 0.5rem; text-align: left; cursor: pointer; color: inherit; }
.gpl-bb__card.is-sel { border-color: rgb(var(--color-button, 21 128 61)); }
.gpl-bb__img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 8px; display: block; }
.gpl-bb__title { display: block; margin-top: 0.4rem; font-size: 0.68rem; font-weight: 600; }
.gpl-bb__price { display: block; font-size: 0.62rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-bb__tick { position: absolute; top: 0.6rem; right: 0.6rem; display: none; place-items: center; width: 1.4rem; height: 1.4rem; border-radius: 999px; background: rgb(var(--color-button, 21 128 61)); color: #fff; font-size: 0.7rem; }
.gpl-bb__card.is-sel .gpl-bb__tick { display: grid; }
.gpl-bb__add {
  margin-top: 1rem;
  width: 100%;
  padding: 0.85rem;
  border: 0;
  border-radius: 10px;
  background: rgb(var(--color-button, 15 23 42));
  color: rgb(var(--color-button-text, 255 255 255));
  font-weight: 800;
  cursor: pointer;
}
.gpl-bb__add:disabled { opacity: 0.45; cursor: not-allowed; }`,
      js: `document.querySelectorAll('gpl-bb').forEach((el) => {
  const need = Number(el.dataset.pick) || 3;
  const cards = [...el.querySelectorAll('[data-card]')];
  const btn = el.querySelector('[data-add]');
  const total = el.querySelector('[data-total]');
  const hint = el.querySelector('[data-hint]');
  function update() {
    const sel = cards.filter((c) => c.classList.contains('is-sel'));
    const sum = sel.reduce((s, c) => s + Number(c.dataset.price), 0);
    total.textContent = '₹' + (sum / 100).toFixed(0);
    btn.disabled = sel.length !== need;
    hint.textContent = sel.length < need ? 'Pick ' + (need - sel.length) + ' more' : 'Bundle ready';
  }
  cards.forEach((c) => c.addEventListener('click', () => {
    const sel = cards.filter((x) => x.classList.contains('is-sel'));
    if (c.classList.contains('is-sel') || sel.length < need) c.classList.toggle('is-sel');
    update();
  }));
  btn.addEventListener('click', async () => {
    const items = cards.filter((c) => c.classList.contains('is-sel')).map((c) => ({ id: Number(c.dataset.vid), quantity: 1 }));
    await fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items }) });
    window.location.href = '/cart';
  });
});`,
    }),
  },
  {
    id: "quantity-selector",
    name: "Quantity +/- stepper",
    description: "Plus/minus buttons around the qty input - small UX win, present in almost every paid theme.",
    category: "Product page",
    kind: "snippet",
    controls: [],
    defaults: {},
    install: [
      ...snippetSteps("quantity-selector.liquid"),
      "Render inside the product form - the hidden input submits the real quantity.",
    ],
    files: () => ({
      liquid: `<gpl-qty class="gpl-qty">
  <button type="button" class="gpl-qty__btn" data-minus aria-label="Decrease">&minus;</button>
  <input type="number" class="gpl-qty__input" name="quantity" value="1" min="1" data-input>
  <button type="button" class="gpl-qty__btn" data-plus aria-label="Increase">+</button>
</gpl-qty>`,
      css: `.gpl-qty { display: inline-flex; align-items: stretch; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3); border-radius: 9px; overflow: hidden; }
.gpl-qty__btn { width: 2.4rem; border: 0; background: rgb(var(--color-foreground, 148 163 184) / 0.08); font-size: 1rem; cursor: pointer; color: inherit; }
.gpl-qty__input { width: 3rem; border: 0; text-align: center; font: inherit; font-size: 0.85rem; background: transparent; -moz-appearance: textfield; }
.gpl-qty__input::-webkit-outer-spin-button, .gpl-qty__input::-webkit-inner-spin-button { -webkit-appearance: none; }`,
      js: `document.querySelectorAll('gpl-qty').forEach((el) => {
  const input = el.querySelector('[data-input]');
  el.querySelector('[data-minus]').addEventListener('click', () => (input.value = Math.max(1, Number(input.value) - 1)));
  el.querySelector('[data-plus]').addEventListener('click', () => (input.value = Number(input.value) + 1));
});`,
      usage: `{% render 'quantity-selector' %}`,
    }),
  },
  {
    id: "size-chart-table",
    name: "Inline size chart",
    description: "A visible measurement table (chest/length/sleeve) - different from the modal, always on the page.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "rows", label: "Rows (size|chest|length per line)", type: "text", maxLength: 300 },
    ],
    defaults: { rows: "S|38|26\nM|40|27\nL|42|28\nXL|44|29" },
    install: [
      ...snippetSteps("size-chart-table.liquid"),
      "Replace the defaults with your real garment measurements - a wrong size chart is worse than none.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-size2">
  <table class="gpl-size2__table">
    <thead><tr><th>Size</th><th>Chest (in)</th><th>Length (in)</th></tr></thead>
    <tbody>
      {%- assign rows = rows | newline_to_br | split: '<br />' -%}
      {%- for row in rows -%}
        {%- assign parts = row | strip | split: '|' -%}
        <tr><td>{{ parts[0] | strip }}</td><td>{{ parts[1] | strip }}</td><td>{{ parts[2] | strip }}</td></tr>
      {%- endfor -%}
    </tbody>
  </table>
</div>`,
      css: `.gpl-size2 { margin: 0.75rem 0; }
.gpl-size2__table { width: 100%; border-collapse: collapse; font-size: 0.75rem; }
.gpl-size2__table th { padding: 0.5rem; text-align: left; font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.08em; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-size2__table td { padding: 0.5rem; border-top: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.18); }`,
      usage: `{% render 'size-chart-table', rows: ${js(str(v, "rows"))} %}`,
    }),
  },
  {
    id: "delivery-date-picker",
    name: "Preferred delivery date",
    description: "A date input on the cart that saves to order attributes - 'please deliver after the 15th' without email ping-pong.",
    category: "Cart & checkout",
    kind: "snippet",
    controls: [
      { id: "label", label: "Label", type: "text", maxLength: 50 },
    ],
    defaults: { label: "Preferred delivery date (optional)" },
    install: [
      ...snippetSteps("delivery-date-picker.liquid"),
      "Render inside the cart form - saves to order.attributes['Preferred delivery date'] automatically.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-ddp">
  <label class="gpl-ddp__label" for="gpl-ddp-field">{{ label | default: 'Preferred delivery date' }}</label>
  <input id="gpl-ddp-field" class="gpl-ddp__input" type="date" name="attributes[Preferred delivery date]" min="{{ 'now' | date: '%Y-%m-%d' }}">
</div>`,
      css: `.gpl-ddp { margin: 1rem 0; }
.gpl-ddp__label { display: block; font-size: 0.72rem; font-weight: 600; margin-bottom: 0.4rem; }
.gpl-ddp__input {
  padding: 0.6rem 0.8rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3);
  border-radius: 9px;
  background: transparent;
  font: inherit;
  font-size: 0.82rem;
  color-scheme: inherit;
}`,
      usage: `{% render 'delivery-date-picker', label: ${js(str(v, "label"))} %}`,
    }),
  },
  {
    id: "gift-message-cart",
    name: "Gift message in cart",
    description: "'This is a gift' checkbox that unlocks a message field - both save to order attributes.",
    category: "Cart & checkout",
    kind: "snippet",
    controls: [],
    defaults: {},
    install: snippetSteps("gift-message-cart.liquid"),
    files: () => ({
      liquid: `<gpl-gift class="gpl-gift">
  <label class="gpl-gift__check">
    <input type="checkbox" data-gift-check> This order is a gift
  </label>
  <div class="gpl-gift__fields" hidden data-gift-fields>
    <input type="hidden" name="attributes[Gift]" value="Yes" disabled>
    <textarea name="attributes[Gift message]" class="gpl-gift__area" rows="3" placeholder="Write your gift message…" disabled></textarea>
  </div>
</gpl-gift>`,
      css: `.gpl-gift { display: block; margin: 1rem 0; }
.gpl-gift__check { display: flex; align-items: center; gap: 0.5rem; font-size: 0.78rem; font-weight: 600; cursor: pointer; }
.gpl-gift__check input { accent-color: rgb(var(--color-button, 21 128 61)); }
.gpl-gift__fields { margin-top: 0.6rem; }
.gpl-gift__area {
  width: 100%;
  padding: 0.7rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3);
  border-radius: 9px;
  background: transparent;
  font: inherit;
  font-size: 0.8rem;
  resize: vertical;
}`,
      js: `document.querySelectorAll('gpl-gift').forEach((el) => {
  const check = el.querySelector('[data-gift-check]');
  const fields = el.querySelector('[data-gift-fields]');
  check.addEventListener('change', () => {
    fields.hidden = !check.checked;
    fields.querySelectorAll('input, textarea').forEach((f) => (f.disabled = !check.checked));
  });
});`,
      usage: `{% render 'gift-message-cart' %}`,
    }),
  },
  {
    id: "terms-checkbox",
    name: "Terms agreement checkbox",
    description: "'I agree to the terms' gate before checkout - a compliance requirement some payment providers ask for.",
    category: "Cart & checkout",
    kind: "snippet",
    controls: [
      { id: "text", label: "Agreement text", type: "text", maxLength: 120 },
    ],
    defaults: { text: "I agree to the terms of service and refund policy" },
    install: [
      ...snippetSteps("terms-checkbox.liquid"),
      "Render before the checkout button - the JS disables the button until checked.",
    ],
    files: (v) => ({
      liquid: `<gpl-terms class="gpl-terms">
  <label class="gpl-terms__check">
    <input type="checkbox" data-terms>
    <span>{{ text | default: 'I agree to the terms' }}</span>
  </label>
</gpl-terms>`,
      css: `.gpl-terms { display: block; margin: 0.75rem 0; }
.gpl-terms__check { display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; cursor: pointer; }
.gpl-terms__check input { accent-color: rgb(var(--color-button, 15 23 42)); }
.gpl-terms__check a { color: inherit; text-decoration: underline; }`,
      js: `document.querySelectorAll('gpl-terms').forEach((el) => {
  const box = el.querySelector('[data-terms]');
  const btn = document.querySelector('[name="checkout"], form[action="/cart"] [type="submit"]');
  if (!btn) return;
  btn.disabled = true;
  box.addEventListener('change', () => (btn.disabled = !box.checked));
});`,
      usage: `{% render 'terms-checkbox', text: ${js(str(v, "text"))} %}`,
    }),
  },
  {
    id: "sold-count",
    name: "Honest sold count",
    description: "'X sold' from a product metafield - real traction beats fake urgency every time.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "count", label: "Sold count", type: "text", maxLength: 8 },
      { id: "label", label: "Label", type: "text", maxLength: 30 },
    ],
    defaults: { count: "2431", label: "sold" },
    install: [
      ...snippetSteps("sold-count.liquid"),
      "Update product.metafields.custom.sold_count periodically from your orders report - it's a real number, not a ticker.",
    ],
    files: (v) => ({
      liquid: `{%- assign n = product.metafields.custom.sold_count.value | default: count -%}
{%- if n -%}
<p class="gpl-sold">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 2.9 6.26 6.9.6-5.2 4.53 1.55 6.77L12 16.9l-6.15 3.26L7.4 13.4 2.2 8.86l6.9-.6z"/></svg>
  <b>{{ n }}</b> {{ label | default: 'sold' }}
</p>
{%- endif -%}`,
      css: `.gpl-sold { display: flex; align-items: center; gap: 0.4rem; margin: 0.4rem 0; font-size: 0.72rem; color: rgb(var(--color-foreground, 100 116 139) / 0.85); }
.gpl-sold svg { width: 0.8rem; height: 0.8rem; color: rgb(var(--color-button, 245 158 11)); }
.gpl-sold b { font-weight: 800; }`,
      usage: `{% render 'sold-count', product: product, count: ${js(str(v, "count"))}, label: ${js(str(v, "label"))} %}`,
    }),
  },
  {
    id: "product-compare-table",
    name: "Product spec comparison",
    description: "Side-by-side spec table for 2-3 of your own products - helps shoppers pick the right one.",
    category: "Product page",
    kind: "section",
    controls: [
      { id: "rows", label: "Specs (spec|p1|p2 per line)", type: "text", maxLength: 400 },
      { id: "p1", label: "Product 1 name", type: "text", maxLength: 30 },
      { id: "p2", label: "Product 2 name", type: "text", maxLength: 30 },
    ],
    defaults: {
      rows: "Fabric|Linen|Cotton\nWeight|180 GSM|220 GSM\nFit|Relaxed|Slim\nPrice|₹2,499|₹1,799",
      p1: "Overshirt",
      p2: "Classic tee",
    },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-pc">
  <table class="gpl-pc__table">
    <thead><tr><th></th><th>{{ section.settings.p1 }}</th><th>{{ section.settings.p2 }}</th></tr></thead>
    <tbody>
      {%- assign rows = section.settings.rows | newline_to_br | split: '<br />' -%}
      {%- for row in rows -%}
        {%- assign parts = row | strip | split: '|' -%}
        <tr><td class="gpl-pc__spec">{{ parts[0] | strip }}</td><td>{{ parts[1] | strip }}</td><td>{{ parts[2] | strip }}</td></tr>
      {%- endfor -%}
    </tbody>
  </table>
</div>

{% schema %}
{
  "name": "Product comparison",
  "settings": [
    { "type": "text", "id": "p1", "label": "Product 1 name", "default": ${js(str(v, "p1"))} },
    { "type": "text", "id": "p2", "label": "Product 2 name", "default": ${js(str(v, "p2"))} },
    { "type": "textarea", "id": "rows", "label": "Specs (spec|p1|p2 per line)", "default": ${js(str(v, "rows"))} }
  ],
  "presets": [{ "name": "Product comparison" }]
}
{% endschema %}`,
      css: `.gpl-pc { padding: 1.5rem 0; }
.gpl-pc__table { width: 100%; border-collapse: collapse; font-size: 0.78rem; }
.gpl-pc__table th { padding: 0.6rem; text-align: left; font-size: 0.72rem; font-weight: 800; }
.gpl-pc__table td { padding: 0.6rem; border-top: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.18); }
.gpl-pc__spec { font-weight: 700; }`,
    }),
  },
  {
    id: "load-more",
    name: "Load more button",
    description: "Fetches the next collection page and appends the grid - a smoother alternative to page numbers.",
    category: "Utility",
    kind: "snippet",
    controls: [
      { id: "label", label: "Label", type: "text", maxLength: 30 },
    ],
    defaults: { label: "Load more" },
    install: [
      ...snippetSteps("load-more.liquid"),
      "Render after the product grid in collection - works when paginate is set; falls back to next-page link.",
    ],
    files: (v) => ({
      liquid: `{%- if paginate.next -%}
<gpl-loadmore class="gpl-lm" data-next="{{ paginate.next.url }}" data-target=".product-grid">
  <button type="button" class="gpl-lm__btn" data-load>{{ label | default: 'Load more' }}</button>
</gpl-loadmore>
{%- endif -%}`,
      css: `.gpl-lm { display: block; text-align: center; padding: 1.5rem 0; }
.gpl-lm__btn {
  padding: 0.75rem 2rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3);
  border-radius: 999px;
  background: transparent;
  color: inherit;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
}`,
      js: `document.querySelectorAll('gpl-loadmore').forEach((el) => {
  const btn = el.querySelector('[data-load]');
  btn.addEventListener('click', async () => {
    btn.disabled = true;
    btn.textContent = 'Loading…';
    try {
      const html = await fetch(el.dataset.next).then((r) => r.text());
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const items = doc.querySelectorAll(el.dataset.target + ' > *');
      const grid = document.querySelector(el.dataset.target);
      items.forEach((i) => grid.appendChild(i));
      const next = doc.querySelector('gpl-loadmore');
      if (next) el.dataset.next = next.dataset.next; else el.remove();
    } catch { window.location.href = el.dataset.next; }
    btn.disabled = false;
    btn.textContent = 'Load more';
  });
});`,
      usage: `{% render 'load-more', label: ${js(str(v, "label"))}, paginate: paginate %}`,
    }),
  },
  {
    id: "empty-cart",
    name: "Empty cart suggestions",
    description: "When the cart's empty, show bestsellers instead of a dead end - recovers the browse loop.",
    category: "Cart & checkout",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 50 },
    ],
    defaults: { heading: "Your cart is empty - try these" },
    install: [
      ...sectionSteps,
      "Add this to the cart template - it only renders when cart.item_count is 0.",
    ],
    files: (v) => ({
      liquid: `{%- if cart.item_count == 0 -%}
<div class="gpl-empty">
  <h2 class="gpl-empty__heading">{{ section.settings.heading }}</h2>
  {%- assign col = section.settings.collection | default: collections.bestsellers | default: collections.all -%}
  <div class="gpl-empty__grid">
    {%- for p in col.products limit: 4 -%}
      <a class="gpl-empty__card" href="{{ p.url }}">
        {{ p.featured_image | image_url: width: 300 | image_tag: class: 'gpl-empty__img', loading: 'lazy' }}
        <span class="gpl-empty__title">{{ p.title }}</span>
        <span class="gpl-empty__price">{{ p.price | money }}</span>
      </a>
    {%- endfor -%}
  </div>
  <a class="gpl-empty__cta" href="{{ routes.all_products_collection_url }}">Browse everything &rarr;</a>
</div>
{%- endif -%}

{% schema %}
{
  "name": "Empty cart picks",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading"))} },
    { "type": "collection", "id": "collection", "label": "Collection" }
  ],
  "presets": [{ "name": "Empty cart picks" }]
}
{% endschema %}`,
      css: `.gpl-empty { padding: 2rem 0; text-align: center; }
.gpl-empty__heading { margin: 0 0 1.5rem; font-size: 1.1rem; font-weight: 800; }
.gpl-empty__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.9rem; text-align: left; }
@media (max-width: 640px) { .gpl-empty__grid { grid-template-columns: repeat(2, 1fr); } }
.gpl-empty__card { text-decoration: none; color: inherit; }
.gpl-empty__img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 10px; display: block; }
.gpl-empty__title { display: block; margin-top: 0.5rem; font-size: 0.72rem; font-weight: 600; }
.gpl-empty__price { display: block; font-size: 0.65rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-empty__cta { display: inline-block; margin-top: 1.5rem; font-size: 0.78rem; font-weight: 700; color: rgb(var(--color-button, 21 128 61)); }`,
    }),
  },
  {
    id: "not-found-search",
    name: "404 search + links",
    description: "A helpful 404 - search box plus popular links instead of a dead 'page not found'.",
    category: "Utility",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 50 },
      { id: "links", label: "Links (label|url per line)", type: "text", maxLength: 200 },
    ],
    defaults: { heading: "That page moved or never existed", links: "Home|/\nBestsellers|/collections/bestsellers\nContact|/pages/contact" },
    install: [
      ...sectionSteps,
      "Add this section to your 404 template - replaces the default dead-end.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-404">
  <h2 class="gpl-404__heading">{{ section.settings.heading }}</h2>
  <form action="{{ routes.search_url }}" method="get" class="gpl-404__form" role="search">
    <input type="search" name="q" placeholder="Search the store…">
    <button type="submit">Search</button>
  </form>
  <div class="gpl-404__links">
    {%- assign rows = section.settings.links | newline_to_br | split: '<br />' -%}
    {%- for row in rows -%}
      {%- assign parts = row | strip | split: '|' -%}
      <a href="{{ parts[1] | strip }}">{{ parts[0] | strip }}</a>
    {%- endfor -%}
  </div>
</div>

{% schema %}
{
  "name": "404 helper",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading"))} },
    { "type": "textarea", "id": "links", "label": "Links (label|url per line)", "default": ${js(str(v, "links"))} }
  ],
  "presets": [{ "name": "404 helper" }]
}
{% endschema %}`,
      css: `.gpl-404 { padding: 3rem 1rem; text-align: center; }
.gpl-404__heading { margin: 0; font-size: 1.4rem; font-weight: 800; }
.gpl-404__form { display: flex; gap: 0.5rem; max-width: 22rem; margin: 1.5rem auto 0; }
.gpl-404__form input { flex: 1; padding: 0.7rem 1rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3); border-radius: 999px; background: transparent; font-size: 0.82rem; }
.gpl-404__form button { padding: 0.7rem 1.25rem; border: 0; border-radius: 999px; background: rgb(var(--color-button, 15 23 42)); color: rgb(var(--color-button-text, 255 255 255)); font-weight: 700; cursor: pointer; }
.gpl-404__links { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; margin-top: 1.5rem; }
.gpl-404__links a { font-size: 0.72rem; font-weight: 600; color: rgb(var(--color-button, 21 128 61)); text-decoration: none; }`,
    }),
  },
  {
    id: "article-toc",
    name: "Article TOC + read time",
    description: "Table of contents from headings plus 'X min read' - makes long blog posts skimmable.",
    category: "Content",
    kind: "snippet",
    controls: [],
    defaults: {},
    install: [
      ...snippetSteps("article-toc.liquid"),
      "Render at the top of the article template - builds the TOC from h2 tags in the content.",
    ],
    files: () => ({
      liquid: `<gpl-toc class="gpl-toc">
  <p class="gpl-toc__meta" data-time>Calculating read time…</p>
  <details class="gpl-toc__box" open>
    <summary class="gpl-toc__summary">On this page</summary>
    <ul class="gpl-toc__list" data-list></ul>
  </details>
</gpl-toc>`,
      css: `.gpl-toc { display: block; margin: 1rem 0; }
.gpl-toc__meta { margin: 0 0 0.6rem; font-size: 0.68rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-toc__box { border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.2); border-radius: 10px; padding: 0.9rem; }
.gpl-toc__summary { font-size: 0.72rem; font-weight: 700; cursor: pointer; }
.gpl-toc__list { margin: 0.6rem 0 0; padding-left: 1.1rem; font-size: 0.75rem; }
.gpl-toc__list a { color: rgb(var(--color-button, 21 128 61)); text-decoration: none; }
.gpl-toc__list a:hover { text-decoration: underline; }`,
      js: `document.querySelectorAll('gpl-toc').forEach((el) => {
  const article = document.querySelector('article') || document.body;
  const heads = [...article.querySelectorAll('h2')];
  const list = el.querySelector('[data-list]');
  heads.forEach((h, i) => {
    if (!h.id) h.id = 'toc-' + i;
    const li = document.createElement('li');
    li.innerHTML = '<a href="#' + h.id + '">' + h.textContent + '</a>';
    list.appendChild(li);
  });
  if (!heads.length) el.querySelector('.gpl-toc__box').hidden = true;
  const words = article.textContent.trim().split(/\\s+/).length;
  el.querySelector('[data-time]').textContent = Math.max(1, Math.round(words / 200)) + ' min read';
});`,
      usage: `{% render 'article-toc' %}`,
    }),
  },
  {
    id: "referral-card",
    name: "Referral card",
    description: "A 'give ₹X, get ₹X' card with tap-to-copy referral link - runs on your real referral URL.",
    category: "Marketing",
    kind: "snippet",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 50 },
      { id: "offer", label: "Offer line", type: "text", maxLength: 60 },
      { id: "url", label: "Referral URL", type: "text", maxLength: 120 },
    ],
    defaults: { heading: "Give ₹100, get ₹100", offer: "Your friend saves, you save - everybody wins.", url: "https://yourstore.com?ref=YOUR_CODE" },
    install: [
      ...snippetSteps("referral-card.liquid"),
      "Point the URL at your real referral flow - a fake 'refer and earn' with no reward breaks trust.",
    ],
    files: (v) => ({
      liquid: `<gpl-ref class="gpl-ref" data-url="{{ url | default: '' }}">
  <p class="gpl-ref__heading">{{ heading | default: 'Refer & earn' }}</p>
  <p class="gpl-ref__offer">{{ offer | default: '' }}</p>
  <button type="button" class="gpl-ref__copy" data-copy>Copy your link</button>
</gpl-ref>`,
      css: `.gpl-ref { display: block; margin: 1rem 0; padding: 1.25rem; border: 1px dashed rgb(var(--color-button, 21 128 61) / 0.4); border-radius: 12px; background: rgb(var(--color-button, 21 128 61) / 0.05); }
.gpl-ref__heading { margin: 0; font-size: 0.9rem; font-weight: 800; }
.gpl-ref__offer { margin: 0.3rem 0 0; font-size: 0.72rem; color: rgb(var(--color-foreground, 100 116 139) / 0.8); }
.gpl-ref__copy {
  margin-top: 0.9rem;
  padding: 0.55rem 1.25rem;
  border: 0;
  border-radius: 999px;
  background: rgb(var(--color-button, 15 23 42));
  color: rgb(var(--color-button-text, 255 255 255));
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
}`,
      js: `document.querySelectorAll('gpl-ref').forEach((el) => {
  el.querySelector('[data-copy]').addEventListener('click', async (e) => {
    await navigator.clipboard.writeText(el.dataset.url).catch(() => {});
    e.target.textContent = 'Copied!';
    setTimeout(() => (e.target.textContent = 'Copy your link'), 2000);
  });
});`,
      usage: `{% render 'referral-card', heading: ${js(str(v, "heading"))}, offer: ${js(str(v, "offer"))}, url: ${js(str(v, "url"))} %}`,
    }),
  },
  {
    id: "donation-checkbox",
    name: "Charity round-up checkbox",
    description: "'Add ₹10 to X cause' in the cart - micro-donations convert when the cause is real.",
    category: "Cart & checkout",
    kind: "snippet",
    controls: [
      { id: "amount", label: "Amount", type: "text", maxLength: 10 },
      { id: "cause", label: "Cause", type: "text", maxLength: 60 },
      { id: "handle", label: "Donation product handle", type: "text", maxLength: 60 },
    ],
    defaults: { amount: "₹10", cause: "plant a tree", handle: "donation" },
    install: [
      ...snippetSteps("donation-checkbox.liquid"),
      "Create a ₹10 'donation' product (unlisted) and pass its handle - checking adds it to the cart.",
      "Be transparent about where the money goes - a fake charity checkbox is fraud.",
    ],
    files: (v) => ({
      liquid: `<gpl-donate class="gpl-donate" data-handle="{{ handle | default: 'donation' }}">
  <label class="gpl-donate__check">
    <input type="checkbox" data-donate>
    <span>Add {{ amount | default: '₹10' }} to {{ cause | default: 'a good cause' }}</span>
  </label>
</gpl-donate>`,
      css: `.gpl-donate { display: block; margin: 0.75rem 0; padding: 0.75rem; border: 1px dashed rgb(var(--color-button, 21 128 61) / 0.4); border-radius: 9px; }
.gpl-donate__check { display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; cursor: pointer; }
.gpl-donate__check input { accent-color: #16a34a; }`,
      js: `document.querySelectorAll('gpl-donate').forEach((el) => {
  el.querySelector('[data-donate]').addEventListener('change', async (e) => {
    if (e.target.checked) {
      const p = await fetch('/products/' + el.dataset.handle + '.js').then((r) => r.json()).catch(() => null);
      if (p) await fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: [{ id: p.variants[0].id, quantity: 1 }] }) });
      else e.target.checked = false;
    }
  });
});`,
      usage: `{% render 'donation-checkbox', amount: ${js(str(v, "amount"))}, cause: ${js(str(v, "cause"))}, handle: ${js(str(v, "handle"))} %}`,
    }),
  },
  {
    id: "a11y-toolbar",
    name: "Accessibility toolbar",
    description: "Font-size + high-contrast toggles floating on the page - genuinely helpful, and WCAG-friendly.",
    category: "Utility",
    kind: "snippet",
    controls: [],
    defaults: {},
    install: [
      ...snippetSteps("a11y-toolbar.liquid"),
      "Render once in the layout - remembers choices in localStorage.",
    ],
    files: () => ({
      liquid: `<gpl-a11y class="gpl-a11y">
  <button type="button" class="gpl-a11y__toggle" data-toggle aria-label="Accessibility tools">Aa</button>
  <div class="gpl-a11y__panel" hidden data-panel>
    <button type="button" data-zoom="in">A+</button>
    <button type="button" data-zoom="out">A-</button>
    <button type="button" data-contrast>High contrast</button>
  </div>
</gpl-a11y>`,
      css: `.gpl-a11y { position: fixed; right: 1rem; bottom: 5rem; z-index: 60; }
.gpl-a11y__toggle {
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 999px;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3);
  background: rgb(var(--color-background, 255 255 255));
  font-size: 0.9rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 4px 14px rgb(0 0 0 / 0.12);
}
.gpl-a11y__panel[hidden] { display: none; }
.gpl-a11y__panel {
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 0.5rem;
  display: grid;
  gap: 0.3rem;
  padding: 0.6rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.2);
  border-radius: 10px;
  background: rgb(var(--color-background, 255 255 255));
  box-shadow: 0 4px 14px rgb(0 0 0 / 0.12);
}
.gpl-a11y__panel button { padding: 0.4rem 0.8rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.25); border-radius: 7px; background: none; font-size: 0.7rem; cursor: pointer; white-space: nowrap; }
body.gpl-a11y-big { font-size: 112.5%; }
body.gpl-a11y-hc { filter: contrast(1.15); }
body.gpl-a11y-hc a { text-decoration: underline; }`,
      js: `document.querySelectorAll('gpl-a11y').forEach((el) => {
  const panel = el.querySelector('[data-panel]');
  el.querySelector('[data-toggle]').addEventListener('click', () => (panel.hidden = !panel.hidden));
  el.querySelector('[data-zoom="in"]').addEventListener('click', () => document.body.classList.toggle('gpl-a11y-big', true));
  el.querySelector('[data-zoom="out"]').addEventListener('click', () => document.body.classList.toggle('gpl-a11y-big', false));
  el.querySelector('[data-contrast]').addEventListener('click', () => document.body.classList.toggle('gpl-a11y-hc'));
});`,
      usage: `{% render 'a11y-toolbar' %}`,
    }),
  },
  {
    id: "preorder-button",
    name: "Pre-order button",
    description: "Switches the buy button to 'Pre-order - ships X' for made-to-order and upcoming drops.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "date", label: "Ship date", type: "text", maxLength: 30 },
      { id: "label", label: "Button label", type: "text", maxLength: 30 },
    ],
    defaults: { date: "March 15", label: "Pre-order now" },
    install: [
      ...snippetSteps("preorder-button.liquid"),
      "Show when inventory is 0 but you're taking orders - the date is a real promise, keep it honest.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-pre">
  <button type="button" class="gpl-pre__btn" data-preorder data-vid="{{ product.selected_or_first_available_variant.id }}" data-date="{{ date | default: '' }}">
    {{ label | default: 'Pre-order' }} - ships {{ date | default: 'soon' }}
  </button>
  <p class="gpl-pre__note">Pay now, ships on {{ date | default: 'release day' }}. Cancel anytime before dispatch.</p>
</div>`,
      css: `.gpl-pre { margin: 0.75rem 0; }
.gpl-pre__btn {
  width: 100%;
  padding: 0.85rem;
  border: 0;
  border-radius: 10px;
  background: rgb(var(--color-button, 15 23 42));
  color: rgb(var(--color-button-text, 255 255 255));
  font-weight: 800;
  font-size: 0.85rem;
  cursor: pointer;
}
.gpl-pre__note { margin: 0.4rem 0 0; font-size: 0.65rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
      js: `document.querySelectorAll('[data-preorder]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: Number(btn.dataset.vid), quantity: 1, properties: { 'Pre-order': 'Ships ' + btn.dataset.date } }] }),
    });
    window.location.href = '/cart';
  });
});`,
      usage: `{% render 'preorder-button', product: product, date: ${js(str(v, "date"))}, label: ${js(str(v, "label"))} %}`,
    }),
  },
  {
    id: "predictive-search",
    name: "Predictive search",
    description: "Live product suggestions as you type - powered by Shopify's real /search/suggest.json endpoint.",
    category: "Headers & navigation",
    kind: "snippet",
    controls: [
      { id: "placeholder", label: "Placeholder", type: "text", maxLength: 40 },
      { id: "limit", label: "Max results", type: "text", maxLength: 2 },
    ],
    defaults: { placeholder: "Search products…", limit: "5" },
    install: [
      ...snippetSteps("predictive-search.liquid"),
      "Render in the header or search section - hits Shopify's native suggest endpoint, no app needed.",
    ],
    files: (v) => ({
      liquid: `<gpl-search2 class="gpl-ps" data-limit="{{ limit | default: 5 }}">
  <input type="search" class="gpl-ps__input" placeholder="{{ placeholder | default: 'Search products…' }}" data-input autocomplete="off" aria-label="Search">
  <div class="gpl-ps__drop" hidden data-drop></div>
</gpl-search2>`,
      css: `.gpl-ps { position: relative; display: block; }
.gpl-ps__input {
  width: 100%;
  padding: 0.7rem 1rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3);
  border-radius: 999px;
  background: transparent;
  font-size: 0.85rem;
}
.gpl-ps__drop {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 30;
  margin-top: 0.4rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.2);
  border-radius: 12px;
  background: rgb(var(--color-background, 255 255 255));
  box-shadow: 0 10px 30px rgb(0 0 0 / 0.12);
  overflow: hidden;
}
.gpl-ps__item { display: flex; align-items: center; gap: 0.7rem; padding: 0.6rem 0.9rem; text-decoration: none; color: inherit; font-size: 0.78rem; }
.gpl-ps__item:hover { background: rgb(var(--color-foreground, 148 163 184) / 0.06); }
.gpl-ps__thumb { width: 2.2rem; height: 2.2rem; border-radius: 6px; object-fit: cover; }
.gpl-ps__none { padding: 0.8rem; text-align: center; font-size: 0.72rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
      js: `document.querySelectorAll('gpl-search2').forEach((el) => {
  const input = el.querySelector('[data-input]');
  const drop = el.querySelector('[data-drop]');
  let t;
  input.addEventListener('input', () => {
    clearTimeout(t);
    const q = input.value.trim();
    if (q.length < 2) { drop.hidden = true; return; }
    t = setTimeout(async () => {
      const res = await fetch('/search/suggest.json?q=' + encodeURIComponent(q) + '&resources[type]=product&resources[limit]=' + (el.dataset.limit || 5)).then((r) => r.json());
      const ps = res.resources.results.products;
      drop.innerHTML = ps.length
        ? ps.map((p) => '<a class="gpl-ps__item" href="' + p.url + '"><img class="gpl-ps__thumb" src="' + (p.image || '') + '" alt="">' + p.title + '</a>').join('')
        : '<p class="gpl-ps__none">No matches - try different words</p>';
      drop.hidden = false;
    }, 220);
  });
  document.addEventListener('click', (e) => { if (!el.contains(e.target)) drop.hidden = true; });
});`,
      usage: `{% render 'predictive-search', placeholder: ${js(str(v, "placeholder"))}, limit: ${js(str(v, "limit"))} %}`,
    }),
  },
  {
    id: "review-submit-form",
    name: "Write a review form",
    description: "Star picker + review text that posts as a contact form tagged 'review' - collects feedback without an app.",
    category: "Trust & social proof",
    kind: "snippet",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 50 },
    ],
    defaults: { heading: "Share your experience" },
    install: [
      ...snippetSteps("review-submit-form.liquid"),
      "Submissions arrive as contact messages tagged 'review' - publish the good ones yourself or wire to a review app.",
    ],
    files: (v) => ({
      liquid: `<gpl-revform class="gpl-rf">
  <p class="gpl-rf__heading">{{ heading | default: 'Share your experience' }}</p>
  <div class="gpl-rf__stars" data-stars>
    {%- for i in (1..5) -%}
      <button type="button" data-star="{{ i }}" aria-label="{{ i }} stars">&#9733;</button>
    {%- endfor -%}
  </div>
  {%- form 'contact', class: 'gpl-rf__form' -%}
    <input type="hidden" name="contact[tags]" value="review-{{ product.handle }}">
    <input type="hidden" name="contact[rating]" value="" data-rating>
    <input type="text" name="contact[name]" placeholder="Your name" required>
    <textarea name="contact[body]" rows="3" placeholder="What did you think?" required></textarea>
    <button type="submit">Submit review</button>
  {%- endform -%}
</gpl-revform>`,
      css: `.gpl-rf { display: block; margin: 1rem 0; padding: 1rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.2); border-radius: 12px; }
.gpl-rf__heading { margin: 0 0 0.75rem; font-size: 0.85rem; font-weight: 800; }
.gpl-rf__stars { display: flex; gap: 0.25rem; margin-bottom: 0.75rem; }
.gpl-rf__stars button { border: 0; background: none; font-size: 1.3rem; cursor: pointer; color: rgb(var(--color-foreground, 148 163 184) / 0.3); padding: 0; }
.gpl-rf__stars button.is-on { color: rgb(var(--color-button, 245 158 11)); }
.gpl-rf__form { display: grid; gap: 0.5rem; }
.gpl-rf__form input[type="text"], .gpl-rf__form textarea { padding: 0.6rem 0.8rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3); border-radius: 8px; font: inherit; font-size: 0.78rem; }
.gpl-rf__form button[type="submit"] { padding: 0.65rem 1.25rem; border: 0; border-radius: 8px; background: rgb(var(--color-button, 15 23 42)); color: rgb(var(--color-button-text, 255 255 255)); font-weight: 700; font-size: 0.75rem; cursor: pointer; justify-self: start; }`,
      js: `document.querySelectorAll('gpl-revform').forEach((el) => {
  const stars = [...el.querySelectorAll('[data-star]')];
  const input = el.querySelector('[data-rating]');
  stars.forEach((s) => s.addEventListener('click', () => {
    const n = Number(s.dataset.star);
    input.value = n;
    stars.forEach((x) => x.classList.toggle('is-on', Number(x.dataset.star) <= n));
  }));
});`,
      usage: `{% render 'review-submit-form', product: product, heading: ${js(str(v, "heading"))} %}`,
    }),
  },
  {
    id: "ask-question",
    name: "Ask a question box",
    description: "Amazon-style 'have a question?' box - question arrives as a contact message with the product tagged.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 40 },
    ],
    defaults: { heading: "Have a question?" },
    install: snippetSteps("ask-question.liquid"),
    files: (v) => ({
      liquid: `<div class="gpl-ask">
  <p class="gpl-ask__heading">{{ heading | default: 'Have a question?' }}</p>
  {%- form 'contact', class: 'gpl-ask__form' -%}
    <input type="hidden" name="contact[tags]" value="question-{{ product.handle }}">
    <input type="email" name="contact[email]" placeholder="Your email" required>
    <input type="text" name="contact[body]" placeholder="Ask about {{ product.title }}" required>
    <button type="submit">Ask</button>
  {%- endform -%}
</div>`,
      css: `.gpl-ask { margin: 1rem 0; padding: 0.9rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.2); border-radius: 10px; }
.gpl-ask__heading { margin: 0 0 0.6rem; font-size: 0.75rem; font-weight: 700; }
.gpl-ask__form { display: grid; gap: 0.5rem; }
.gpl-ask__form input { padding: 0.55rem 0.75rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3); border-radius: 8px; font-size: 0.78rem; }
.gpl-ask__form button { padding: 0.6rem 1.25rem; border: 0; border-radius: 8px; background: rgb(var(--color-button, 15 23 42)); color: rgb(var(--color-button-text, 255 255 255)); font-weight: 700; font-size: 0.72rem; cursor: pointer; justify-self: start; }`,
      usage: `{% render 'ask-question', product: product, heading: ${js(str(v, "heading"))} %}`,
    }),
  },
  {
    id: "model-info",
    name: "Model size info",
    description: "'Model is 5\'9\" and wears M' - the two-line context every fashion PDP needs under the size picker.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "text", label: "Model info", type: "text", maxLength: 80 },
    ],
    defaults: { text: "Model is 5'9\" and wears size M" },
    install: [
      ...snippetSteps("model-info.liquid"),
      "Update per shoot - wrong model info generates size-related returns.",
    ],
    files: (v) => ({
      liquid: `<p class="gpl-model">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  {{ text | default: 'Model info' }}
</p>`,
      css: `.gpl-model { display: flex; align-items: center; gap: 0.45rem; margin: 0.4rem 0; font-size: 0.7rem; color: rgb(var(--color-foreground, 100 116 139) / 0.85); }
.gpl-model svg { width: 0.85rem; height: 0.85rem; }`,
      usage: `{% render 'model-info', text: ${js(str(v, "text"))} %}`,
    }),
  },
  {
    id: "similar-products",
    name: "Sold out - similar items",
    description: "When a product is unavailable, show 4 related picks instead of a dead end - recovers the sale.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 50 },
    ],
    defaults: { heading: "Sold out - similar styles" },
    install: [
      ...snippetSteps("similar-products.liquid"),
      "Render on the PDP - it only shows when the product is unavailable.",
    ],
    files: (v) => ({
      liquid: `{%- unless product.available -%}
<div class="gpl-sim">
  <p class="gpl-sim__heading">{{ heading | default: 'Similar styles' }}</p>
  <div class="gpl-sim__grid">
    {%- for p in product.collections.first.products limit: 5 -%}
      {%- if p.id != product.id and p.available -%}
        <a class="gpl-sim__card" href="{{ p.url }}">
          {{ p.featured_image | image_url: width: 300 | image_tag: class: 'gpl-sim__img', loading: 'lazy' }}
          <span class="gpl-sim__title">{{ p.title }}</span>
          <span class="gpl-sim__price">{{ p.price | money }}</span>
        </a>
      {%- endif -%}
    {%- endfor -%}
  </div>
</div>
{%- endunless -%}`,
      css: `.gpl-sim { margin: 1rem 0; }
.gpl-sim__heading { margin: 0 0 0.75rem; font-size: 0.8rem; font-weight: 800; }
.gpl-sim__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.7rem; }
@media (max-width: 640px) { .gpl-sim__grid { grid-template-columns: repeat(2, 1fr); } }
.gpl-sim__card { text-decoration: none; color: inherit; }
.gpl-sim__img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 9px; display: block; }
.gpl-sim__title { display: block; margin-top: 0.4rem; font-size: 0.68rem; font-weight: 600; }
.gpl-sim__price { display: block; font-size: 0.62rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
      usage: `{% render 'similar-products', product: product, heading: ${js(str(v, "heading"))} %}`,
    }),
  },
  {
    id: "prepaid-discount",
    name: "Prepaid savings note",
    description: "'Pay online, save X% + skip COD fee' - the nudge that shifts Indian shoppers off COD.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "pct", label: "Discount %", type: "text", maxLength: 3 },
      { id: "codfee", label: "COD fee text", type: "text", maxLength: 40 },
    ],
    defaults: { pct: "5", codfee: "COD orders have a ₹49 handling fee" },
    install: [
      ...snippetSteps("prepaid-discount.liquid"),
      "The discount must exist - set up a payment-method discount in Shopify admin first.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-prepaid">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
  <div>
    <p class="gpl-prepaid__title">Pay online - save {{ pct | default: '5' }}% extra</p>
    {%- if codfee != blank -%}
      <p class="gpl-prepaid__sub">{{ codfee }}</p>
    {%- endif -%}
  </div>
</div>`,
      css: `.gpl-prepaid { display: flex; align-items: flex-start; gap: 0.6rem; margin: 0.75rem 0; padding: 0.8rem; border-radius: 10px; background: rgb(var(--color-button, 21 128 61) / 0.07); }
.gpl-prepaid svg { width: 1rem; height: 1rem; color: #16a34a; margin-top: 0.1rem; flex-shrink: 0; }
.gpl-prepaid__title { margin: 0; font-size: 0.75rem; font-weight: 700; }
.gpl-prepaid__sub { margin: 0.2rem 0 0; font-size: 0.65rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
      usage: `{% render 'prepaid-discount', pct: ${js(str(v, "pct"))}, codfee: ${js(str(v, "codfee"))} %}`,
    }),
  },
  {
    id: "compatibility-checker",
    name: "Compatibility checker",
    description: "'Does it fit?' - pick your device/vehicle/model and confirm fit before buying. Big for cases, parts, accessories.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "label", label: "Selector label", type: "text", maxLength: 40 },
      { id: "options", label: "Compatible models (comma separated)", type: "text", maxLength: 200 },
    ],
    defaults: { label: "Check your device", options: "iPhone 15, iPhone 14, iPhone 13, Galaxy S24, Pixel 8" },
    install: [
      ...snippetSteps("compatibility-checker.liquid"),
      "List every model the product actually fits - a wrong 'fits' is a guaranteed return.",
    ],
    files: (v) => ({
      liquid: `<gpl-compat class="gpl-compat">
  <label class="gpl-compat__label" for="gpl-compat-sel">{{ label | default: 'Check compatibility' }}</label>
  <select id="gpl-compat-sel" class="gpl-compat__sel" data-sel>
    <option value="">Select model…</option>
    {%- assign opts = options | split: ',' -%}
    {%- for o in opts -%}
      <option>{{ o | strip }}</option>
    {%- endfor -%}
  </select>
  <p class="gpl-compat__result" hidden data-result></p>
</gpl-compat>`,
      css: `.gpl-compat { margin: 0.75rem 0; }
.gpl-compat__label { display: block; font-size: 0.72rem; font-weight: 600; margin-bottom: 0.4rem; }
.gpl-compat__sel { width: 100%; padding: 0.6rem 0.8rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3); border-radius: 9px; background: transparent; font-size: 0.8rem; }
.gpl-compat__result { margin: 0.5rem 0 0; font-size: 0.72rem; font-weight: 700; color: #16a34a; }`,
      js: `document.querySelectorAll('gpl-compat').forEach((el) => {
  const sel = el.querySelector('[data-sel]');
  const res = el.querySelector('[data-result]');
  sel.addEventListener('change', () => {
    if (sel.value) {
      res.textContent = 'Fits ' + sel.value + ' - you\\'re good to go';
      res.hidden = false;
    } else res.hidden = true;
  });
});`,
      usage: `{% render 'compatibility-checker', label: ${js(str(v, "label"))}, options: ${js(str(v, "options"))} %}`,
    }),
  },
  {
    id: "file-upload",
    name: "Custom image upload",
    description: "Customer uploads a photo for printing/engraving - lands as a line-item property on the order.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "label", label: "Label", type: "text", maxLength: 50 },
    ],
    defaults: { label: "Upload your photo" },
    install: [
      ...snippetSteps("file-upload.liquid"),
      "Render inside the product form - file uploads as a property link on the order.",
      "Requires the form to have enctype multipart - most themes do by default.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-upload">
  <label class="gpl-upload__label" for="gpl-upload-field">{{ label | default: 'Upload your file' }}</label>
  <input id="gpl-upload-field" class="gpl-upload__input" type="file" name="properties[{{ label | default: 'Upload' }}]" accept="image/*" required>
  <p class="gpl-upload__hint">JPG/PNG, max 20MB - we print exactly what you upload.</p>
</div>`,
      css: `.gpl-upload { margin: 0.75rem 0; }
.gpl-upload__label { display: block; font-size: 0.72rem; font-weight: 600; margin-bottom: 0.4rem; }
.gpl-upload__input { width: 100%; font-size: 0.75rem; }
.gpl-upload__input::file-selector-button {
  padding: 0.5rem 1rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3);
  border-radius: 8px;
  background: transparent;
  font-size: 0.72rem;
  cursor: pointer;
}
.gpl-upload__hint { margin: 0.4rem 0 0; font-size: 0.62rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
      usage: `{% render 'file-upload', label: ${js(str(v, "label"))} %}`,
    }),
  },
  {
    id: "nutrition-facts",
    name: "Nutrition facts label",
    description: "FDA-style nutrition panel - standard layout for food, supplements and protein products.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "serving", label: "Serving size", type: "text", maxLength: 30 },
      { id: "items", label: "Nutrients (name|value|dv% per line)", type: "text", maxLength: 400 },
    ],
    defaults: { serving: "1 scoop (30g)", items: "Calories|120|\nProtein|24g|48\nCarbs|2g|1\nFat|1.5g|2\nSodium|95mg|4" },
    install: [
      ...snippetSteps("nutrition-facts.liquid"),
      "Copy values from your real lab report or supplier COA - made-up nutrition facts are a liability.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-nut">
  <p class="gpl-nut__title">Nutrition Facts</p>
  <p class="gpl-nut__serving">Serving size: {{ serving | default: '1 serving' }}</p>
  {%- assign rows = items | newline_to_br | split: '<br />' -%}
  {%- for row in rows -%}
    {%- assign parts = row | strip | split: '|' -%}
    <div class="gpl-nut__row">
      <b>{{ parts[0] | strip }}</b>
      <span>{{ parts[1] | strip }}</span>
      {%- if parts[2] != blank -%}
        <span class="gpl-nut__dv">{{ parts[2] | strip }}%</span>
      {%- endif -%}
    </div>
  {%- endfor -%}
</div>`,
      css: `.gpl-nut { margin: 0.75rem 0; padding: 0.9rem; border: 2px solid rgb(var(--color-foreground, 15 23 42)); border-radius: 4px; font-size: 0.75rem; }
.gpl-nut__title { margin: 0; font-size: 1.1rem; font-weight: 900; border-bottom: 6px solid rgb(var(--color-foreground, 15 23 42)); padding-bottom: 0.3rem; }
.gpl-nut__serving { margin: 0.3rem 0; font-size: 0.68rem; border-bottom: 3px solid rgb(var(--color-foreground, 15 23 42)); padding-bottom: 0.3rem; }
.gpl-nut__row { display: flex; gap: 0.5rem; padding: 0.3rem 0; border-bottom: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3); }
.gpl-nut__row b { flex: 1; }
.gpl-nut__dv { font-weight: 700; }`,
      usage: `{% render 'nutrition-facts', serving: ${js(str(v, "serving"))}, items: ${js(str(v, "items"))} %}`,
    }),
  },
  {
    id: "restock-date",
    name: "Restock date badge",
    description: "'Restocking Jan 15' - keeps sold-out traffic warm instead of losing it to a competitor.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "date", label: "Restock date", type: "text", maxLength: 30 },
    ],
    defaults: { date: "January 15" },
    install: snippetSteps("restock-date.liquid"),
    files: (v) => ({
      liquid: `<p class="gpl-restock">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
  Restocking <b>{{ date | default: 'soon' }}</b> - join the waitlist above
</p>`,
      css: `.gpl-restock { display: flex; align-items: center; gap: 0.45rem; margin: 0.5rem 0; font-size: 0.72rem; color: rgb(var(--color-foreground, 100 116 139) / 0.85); }
.gpl-restock svg { width: 0.85rem; height: 0.85rem; color: rgb(var(--color-button, 21 128 61)); }
.gpl-restock b { font-weight: 800; }`,
      usage: `{% render 'restock-date', date: ${js(str(v, "date"))} %}`,
    }),
  },
  {
    id: "price-match",
    name: "Price match promise",
    description: "'Found it cheaper? We'll match it' - signals pricing confidence on comparison-shopped products.",
    category: "Trust & social proof",
    kind: "snippet",
    controls: [
      { id: "text", label: "Promise text", type: "text", maxLength: 80 },
    ],
    defaults: { text: "Found it cheaper elsewhere? We'll match the price" },
    install: [
      ...snippetSteps("price-match.liquid"),
      "Only offer this if you'll actually honour it - screenshot the competitor price before matching.",
    ],
    files: (v) => ({
      liquid: `<p class="gpl-match">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
  {{ text | default: "Found it cheaper? We'll match it" }}
</p>`,
      css: `.gpl-match { display: flex; align-items: center; gap: 0.45rem; margin: 0.5rem 0; font-size: 0.72rem; color: rgb(var(--color-foreground, 100 116 139) / 0.85); }
.gpl-match svg { width: 0.85rem; height: 0.85rem; color: #16a34a; flex-shrink: 0; }`,
      usage: `{% render 'price-match', text: ${js(str(v, "text"))} %}`,
    }),
  },
  {
    id: "loyalty-tiers",
    name: "Loyalty tier progress",
    description: "Bronze &gt; Silver &gt; Gold progress bar - gamifies the next purchase.",
    category: "Marketing",
    kind: "snippet",
    controls: [
      { id: "current", label: "Current spend", type: "text", maxLength: 8 },
      { id: "next", label: "Next tier", type: "text", maxLength: 30 },
      { id: "needed", label: "Amount to next tier", type: "text", maxLength: 8 },
    ],
    defaults: { current: "3200", next: "Gold", needed: "5000" },
    install: [
      ...snippetSteps("loyalty-tiers.liquid"),
      "Wire 'current' to the customer's real lifetime spend via customer.total_spent on the account page.",
    ],
    files: (v) => ({
      liquid: `{%- assign pct = current | plus: 0 | times: 100 | divided_by: needed | plus: 0 -%}
<div class="gpl-tier">
  <p class="gpl-tier__line">You're <b>{{ needed | minus: current | plus: 0 }}</b> away from <b>{{ next | default: 'Gold' }}</b></p>
  <div class="gpl-tier__bar"><span style="width: {{ pct | at_most: 100 }}%"></span></div>
  <div class="gpl-tier__labels"><span>Bronze</span><span>Silver</span><span>{{ next | default: 'Gold' }}</span></div>
</div>`,
      css: `.gpl-tier { margin: 1rem 0; }
.gpl-tier__line { margin: 0 0 0.5rem; font-size: 0.75rem; }
.gpl-tier__line b { font-weight: 800; }
.gpl-tier__bar { height: 0.45rem; border-radius: 999px; background: rgb(var(--color-foreground, 148 163 184) / 0.15); overflow: hidden; }
.gpl-tier__bar span { display: block; height: 100%; background: rgb(var(--color-button, 245 158 11)); border-radius: 999px; }
.gpl-tier__labels { display: flex; justify-content: space-between; margin-top: 0.3rem; font-size: 0.58rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
      usage: `{% render 'loyalty-tiers', current: ${js(str(v, "current"))}, next: ${js(str(v, "next"))}, needed: ${js(str(v, "needed"))} %}`,
    }),
  },
  {
    id: "collection-filters",
    name: "Tag filter chips",
    description: "Filter the collection by product tags as clickable chips - no app, uses Shopify's native tag filters.",
    category: "Headers & navigation",
    kind: "snippet",
    controls: [
      { id: "tags", label: "Tags to show (comma separated)", type: "text", maxLength: 150 },
    ],
    defaults: { tags: "cotton, linen, oversized, slim, printed" },
    install: [
      ...snippetSteps("collection-filters.liquid"),
      "Render on the collection page - links use the native ?filter.p.tag= URL Shopify already understands.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-fchips">
  {%- assign ts = tags | split: ',' -%}
  {%- for t in ts -%}
    {%- assign tag = t | strip -%}
    <a class="gpl-fchips__chip{% if current_tags contains tag %} is-active{% endif %}" href="{{ collection.url }}?filter.p.tag={{ tag | url_encode }}">{{ tag }}</a>
  {%- endfor -%}
</div>`,
      css: `.gpl-fchips { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 0.75rem 0; }
.gpl-fchips__chip {
  padding: 0.4rem 0.9rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.25);
  border-radius: 999px;
  font-size: 0.68rem;
  text-decoration: none;
  color: inherit;
}
.gpl-fchips__chip.is-active { background: rgb(var(--color-button, 15 23 42)); color: rgb(var(--color-button-text, 255 255 255)); border-color: transparent; }`,
      usage: `{% render 'collection-filters', collection: collection, current_tags: current_tags, tags: ${js(str(v, "tags"))} %}`,
    }),
  },
  {
    id: "reorder-button",
    name: "Buy again button",
    description: "'Reorder in one tap' on the account page - the highest-converting retention feature for consumables.",
    category: "Cart & checkout",
    kind: "snippet",
    controls: [
      { id: "label", label: "Button label", type: "text", maxLength: 30 },
    ],
    defaults: { label: "Buy again" },
    install: [
      ...snippetSteps("reorder-button.liquid"),
      "Render in the order history on the account page - loops the order's line items back into the cart.",
    ],
    files: (v) => ({
      liquid: `<gpl-reorder class="gpl-reorder" data-order="{{ order.id }}">
  <button type="button" class="gpl-reorder__btn" data-reorder>{{ label | default: 'Buy again' }}</button>
</gpl-reorder>`,
      css: `.gpl-reorder { display: inline-block; }
.gpl-reorder__btn {
  padding: 0.55rem 1.25rem;
  border: 1px solid rgb(var(--color-button, 15 23 42));
  border-radius: 999px;
  background: transparent;
  color: inherit;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
}
.gpl-reorder__btn:hover { background: rgb(var(--color-button, 15 23 42)); color: rgb(var(--color-button-text, 255 255 255)); }`,
      js: `document.querySelectorAll('gpl-reorder').forEach((el) => {
  el.querySelector('[data-reorder]').addEventListener('click', async () => {
    // Order items live in the rendered table - grab variant ids from data attributes your theme puts on rows,
    // or render this inside the order's line_items loop where variant.id is available.
    const vids = el.dataset.vids ? el.dataset.vids.split(',') : [];
    if (!vids.length) { window.location.href = '/account/orders/' + el.dataset.order; return; }
    await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: vids.map((id) => ({ id: Number(id), quantity: 1 })) }),
    });
    window.location.href = '/cart';
  });
});`,
      usage: `{% render 'reorder-button', order: order, label: ${js(str(v, "label"))} %}`,
    }),
  },
  {
    id: "warranty-registration",
    name: "Warranty registration form",
    description: "Activate warranty with order number + serial - turns a sale into an owned customer relationship.",
    category: "Utility",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 50 },
      { id: "term", label: "Warranty term", type: "text", maxLength: 30 },
    ],
    defaults: { heading: "Activate your warranty", term: "1-year" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-warreg">
  <h2 class="gpl-warreg__heading">{{ section.settings.heading }}</h2>
  <p class="gpl-warreg__sub">Register within 30 days of delivery for the full {{ section.settings.term }} coverage.</p>
  {%- form 'contact', class: 'gpl-warreg__form' -%}
    <input type="hidden" name="contact[tags]" value="warranty-registration">
    {%- if form.posted_successfully? -%}
      <p class="gpl-warreg__ok">Registered - keep this confirmation.</p>
    {%- endif -%}
    <input type="text" name="contact[order]" placeholder="Order number" required>
    <input type="text" name="contact[serial]" placeholder="Serial / product code" required>
    <input type="email" name="contact[email]" placeholder="Email" required>
    <button type="submit">Register warranty</button>
  {%- endform -%}
</div>

{% schema %}
{
  "name": "Warranty registration",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading"))} },
    { "type": "text", "id": "term", "label": "Warranty term", "default": ${js(str(v, "term"))} }
  ],
  "presets": [{ "name": "Warranty registration" }]
}
{% endschema %}`,
      css: `.gpl-warreg { padding: 1.5rem 0; max-width: 28rem; }
.gpl-warreg__heading { margin: 0; font-size: 1.1rem; font-weight: 800; }
.gpl-warreg__sub { margin: 0.4rem 0 1rem; font-size: 0.72rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-warreg__form { display: grid; gap: 0.6rem; }
.gpl-warreg__form input {
  padding: 0.7rem 0.9rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3);
  border-radius: 9px;
  background: transparent;
  font: inherit;
  font-size: 0.82rem;
}
.gpl-warreg__form button {
  padding: 0.75rem 1.75rem;
  border: 0;
  border-radius: 10px;
  background: rgb(var(--color-button, 15 23 42));
  color: rgb(var(--color-button-text, 255 255 255));
  font-weight: 800;
  cursor: pointer;
  justify-self: start;
}
.gpl-warreg__ok { margin: 0; color: #16a34a; font-size: 0.8rem; font-weight: 700; }`,
    }),
  },
  {
    id: "call-order-button",
    name: "Call to order button",
    description: "'Prefer to call? Order on the phone' - converts older and B2B buyers who don't want to check out online.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "phone", label: "Phone number", type: "text", maxLength: 15 },
      { id: "label", label: "Button label", type: "text", maxLength: 30 },
    ],
    defaults: { phone: "+919876543210", label: "Call to order" },
    install: snippetSteps("call-order-button.liquid"),
    files: (v) => ({
      liquid: `<a class="gpl-call" href="tel:{{ phone | remove: ' ' }}">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  {{ label | default: 'Call to order' }} - {{ phone }}
</a>`,
      css: `.gpl-call { display: inline-flex; align-items: center; gap: 0.5rem; margin: 0.5rem 0; padding: 0.6rem 1.25rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3); border-radius: 999px; font-size: 0.75rem; font-weight: 700; text-decoration: none; color: inherit; }
.gpl-call svg { width: 0.9rem; height: 0.9rem; }
.gpl-call:hover { border-color: rgb(var(--color-button, 21 128 61)); color: rgb(var(--color-button, 21 128 61)); }`,
      usage: `{% render 'call-order-button', phone: ${js(str(v, "phone"))}, label: ${js(str(v, "label"))} %}`,
    }),
  },
  {
    id: "discount-progress",
    name: "Discount unlock progress",
    description: "'Add ₹X more for 15% off' in the cart - real cart-goal progress driven by live cart total, not a fixed bar.",
    category: "Cart & checkout",
    kind: "snippet",
    controls: [
      { id: "threshold", label: "Unlock at ₹", type: "text", maxLength: 8 },
      { id: "reward", label: "Reward text", type: "text", maxLength: 40 },
    ],
    defaults: { threshold: "5000", reward: "15% off" },
    install: [
      ...snippetSteps("discount-progress.liquid"),
      "Render in the cart - reads the live cart total via /cart.js and updates on add/remove.",
    ],
    files: (v) => ({
      liquid: `<gpl-dprog class="gpl-dprog" data-threshold="{{ threshold | plus: 0 | times: 100 }}">
  <p class="gpl-dprog__line" data-line></p>
  <div class="gpl-dprog__bar"><span data-fill style="width:0%"></span></div>
  <p class="gpl-dprog__unlock">Unlock <b>{{ reward | default: 'a discount' }}</b> at {{ threshold | prepend: '₹' }}</p>
</gpl-dprog>`,
      css: `.gpl-dprog { display: block; margin: 1rem 0; padding: 0.9rem; border: 1px dashed rgb(var(--color-button, 21 128 61) / 0.4); border-radius: 10px; }
.gpl-dprog__line { margin: 0 0 0.5rem; font-size: 0.75rem; font-weight: 600; }
.gpl-dprog__bar { height: 0.45rem; border-radius: 999px; background: rgb(var(--color-foreground, 148 163 184) / 0.15); overflow: hidden; }
.gpl-dprog__bar span { display: block; height: 100%; background: rgb(var(--color-button, 21 128 61)); border-radius: 999px; transition: width 0.3s; }
.gpl-dprog__unlock { margin: 0.5rem 0 0; font-size: 0.65rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
      js: `document.querySelectorAll('gpl-dprog').forEach(async (el) => {
  const threshold = Number(el.dataset.threshold);
  try {
    const cart = await fetch('/cart.js').then((r) => r.json());
    const cur = cart.total_price;
    const pct = Math.min(100, (cur / threshold) * 100);
    el.querySelector('[data-fill]').style.width = pct + '%';
    el.querySelector('[data-line]').textContent = cur >= threshold
      ? 'Unlocked - discount applies at checkout'
      : 'Add ₹' + ((threshold - cur) / 100).toFixed(0) + ' more';
  } catch {}
});`,
      usage: `{% render 'discount-progress', threshold: ${js(str(v, "threshold"))}, reward: ${js(str(v, "reward"))} %}`,
    }),
  },
  {
    id: "vip-signup",
    name: "VIP early access signup",
    description: "'Join the drop list' - exclusive-access email capture for launches and limited releases.",
    category: "Marketing",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 60 },
      { id: "text", label: "Pitch", type: "text", maxLength: 100 },
    ],
    defaults: { heading: "Get first access", text: "Drops sell out in hours. Members see it 24h early." },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-vip">
  <h2 class="gpl-vip__heading">{{ section.settings.heading }}</h2>
  {%- if section.settings.text != blank -%}
    <p class="gpl-vip__text">{{ section.settings.text }}</p>
  {%- endif -%}
  {%- form 'customer', class: 'gpl-vip__form' -%}
    <input type="hidden" name="contact[tags]" value="vip">
    <input type="email" name="contact[email]" placeholder="Your email" required>
    <button type="submit">Join the list</button>
  {%- endform -%}
</div>

{% schema %}
{
  "name": "VIP signup",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading"))} },
    { "type": "text", "id": "text", "label": "Pitch", "default": ${js(str(v, "text"))} }
  ],
  "presets": [{ "name": "VIP signup" }]
}
{% endschema %}`,
      css: `.gpl-vip { padding: 2rem 1rem; text-align: center; border-radius: 14px; background: rgb(var(--color-button, 21 128 61) / 0.06); }
.gpl-vip__heading { margin: 0; font-size: 1.2rem; font-weight: 800; }
.gpl-vip__text { margin: 0.5rem auto 0; max-width: 26rem; font-size: 0.78rem; color: rgb(var(--color-foreground, 100 116 139) / 0.8); }
.gpl-vip__form { display: flex; gap: 0.5rem; max-width: 24rem; margin: 1.25rem auto 0; }
.gpl-vip__form input { flex: 1; padding: 0.7rem 1rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3); border-radius: 999px; background: transparent; font-size: 0.8rem; }
.gpl-vip__form button { padding: 0.7rem 1.4rem; border: 0; border-radius: 999px; background: rgb(var(--color-button, 15 23 42)); color: rgb(var(--color-button-text, 255 255 255)); font-weight: 700; cursor: pointer; }`,
    }),
  },
  {
    id: "event-banner",
    name: "Live event / drop banner",
    description: "'Live sale Sunday 7pm' sticky strip with a join link - builds anticipation for scheduled events.",
    category: "Marketing",
    kind: "snippet",
    controls: [
      { id: "text", label: "Event text", type: "text", maxLength: 80 },
      { id: "cta", label: "CTA label", type: "text", maxLength: 30 },
      { id: "url", label: "CTA link", type: "text", maxLength: 120 },
    ],
    defaults: { text: "Live drop Sunday 7pm - 50 new pieces", cta: "Set a reminder", url: "/pages/drops" },
    install: snippetSteps("event-banner.liquid"),
    files: (v) => ({
      liquid: `<a class="gpl-event" href="{{ url | default: '#' }}">
  <span class="gpl-event__dot"></span>
  <span class="gpl-event__text">{{ text | default: 'Live event' }}</span>
  <span class="gpl-event__cta">{{ cta | default: 'Join' }} &rarr;</span>
</a>`,
      css: `.gpl-event { display: flex; align-items: center; gap: 0.6rem; padding: 0.65rem 1rem; border-radius: 999px; background: rgb(var(--color-button, 220 38 38)); color: #fff; text-decoration: none; font-size: 0.72rem; }
.gpl-event__dot { width: 0.5rem; height: 0.5rem; border-radius: 999px; background: #fff; animation: gpl-pulse 1.4s infinite; }
@keyframes gpl-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
.gpl-event__text { flex: 1; font-weight: 600; }
.gpl-event__cta { font-weight: 800; white-space: nowrap; }`,
      usage: `{% render 'event-banner', text: ${js(str(v, "text"))}, cta: ${js(str(v, "cta"))}, url: ${js(str(v, "url"))} %}`,
    }),
  },
  {
    id: "made-in-badge",
    name: "Made-in / origin badge",
    description: "'Made in India' chip with flag styling - regional pride that converts especially on artisan products.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "text", label: "Origin text", type: "text", maxLength: 40 },
      { id: "flag", label: "Flag emoji", type: "text", maxLength: 4 },
    ],
    defaults: { text: "Made in India", flag: "🇮🇳" },
    install: snippetSteps("made-in-badge.liquid"),
    files: (v) => ({
      liquid: `<span class="gpl-origin">{{ flag | default: '' }} {{ text | default: 'Made in India' }}</span>`,
      css: `.gpl-origin {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.35rem 0.8rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.25);
  border-radius: 999px;
  font-size: 0.65rem;
  font-weight: 700;
}`,
      usage: `{% render 'made-in-badge', text: ${js(str(v, "text"))}, flag: ${js(str(v, "flag"))} %}`,
    }),
  },
  {
    id: "care-icons",
    name: "Wash care icons",
    description: "Laundry symbols row (wash/dry/iron/don't bleach) - answers the care question before it becomes a return.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "items", label: "Care instructions (one per line)", type: "text", maxLength: 200 },
    ],
    defaults: { items: "Machine wash cold\nDo not bleach\nTumble dry low\nIron medium" },
    install: snippetSteps("care-icons.liquid"),
    files: (v) => ({
      liquid: `<div class="gpl-care">
  {%- assign rows = items | newline_to_br | split: '<br />' -%}
  {%- for row in rows -%}
    <span class="gpl-care__item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
      {{ row | strip }}
    </span>
  {%- endfor -%}
</div>`,
      css: `.gpl-care { display: flex; flex-wrap: wrap; gap: 0.4rem 1rem; margin: 0.6rem 0; }
.gpl-care__item { display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.65rem; color: rgb(var(--color-foreground, 100 116 139) / 0.85); }
.gpl-care__item svg { width: 0.85rem; height: 0.85rem; }`,
      usage: `{% render 'care-icons', items: ${js(str(v, "items"))} %}`,
    }),
  },
  {
    id: "download-manual",
    name: "Manual / spec sheet download",
    description: "A PDF link card - 'download the full spec sheet' for technical products.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "label", label: "Button label", type: "text", maxLength: 40 },
      { id: "file", label: "File URL or metafield", type: "text", maxLength: 120 },
    ],
    defaults: { label: "Download spec sheet (PDF)", file: "/files/spec-sheet.pdf" },
    install: [
      ...snippetSteps("download-manual.liquid"),
      "Upload the PDF to Settings > Files, then link it - or drive it from product.metafields.custom.manual.",
    ],
    files: (v) => ({
      liquid: `{%- assign f = product.metafields.custom.manual.value | default: file -%}
{%- if f -%}
<a class="gpl-manual" href="{{ f }}" target="_blank" rel="noopener">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
  {{ label | default: 'Download file' }}
</a>
{%- endif -%}`,
      css: `.gpl-manual { display: inline-flex; align-items: center; gap: 0.5rem; margin: 0.5rem 0; padding: 0.55rem 1.1rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3); border-radius: 9px; font-size: 0.72rem; font-weight: 700; text-decoration: none; color: inherit; }
.gpl-manual svg { width: 0.9rem; height: 0.9rem; }
.gpl-manual:hover { border-color: rgb(var(--color-button, 21 128 61)); color: rgb(var(--color-button, 21 128 61)); }`,
      usage: `{% render 'download-manual', product: product, label: ${js(str(v, "label"))}, file: ${js(str(v, "file"))} %}`,
    }),
  },
  {
    id: "request-quote",
    name: "Request a quote button",
    description: "B2B 'get a quote' CTA that opens a compact form - for bulk/wholesale pricing conversations.",
    category: "Marketing",
    kind: "snippet",
    controls: [
      { id: "label", label: "Button label", type: "text", maxLength: 30 },
    ],
    defaults: { label: "Request a quote" },
    install: snippetSteps("request-quote.liquid"),
    files: (v) => ({
      liquid: `<gpl-rfq class="gpl-rfq">
  <button type="button" class="gpl-rfq__btn" data-open>{{ label | default: 'Request a quote' }}</button>
  <div class="gpl-rfq__pop" hidden>
    <p class="gpl-rfq__title">Get bulk pricing</p>
    {%- form 'contact', class: 'gpl-rfq__form' -%}
      <input type="hidden" name="contact[tags]" value="rfq">
      <input type="text" name="contact[name]" placeholder="Name" required>
      <input type="email" name="contact[email]" placeholder="Email" required>
      <input type="text" name="contact[body]" placeholder="What do you need? (product + qty)" required>
      <button type="submit">Send request</button>
    {%- endform -%}
  </div>
</gpl-rfq>`,
      css: `.gpl-rfq { position: relative; display: inline-block; }
.gpl-rfq__btn { padding: 0.65rem 1.5rem; border: 1px solid rgb(var(--color-button, 15 23 42)); border-radius: 999px; background: transparent; color: inherit; font-size: 0.78rem; font-weight: 700; cursor: pointer; }
.gpl-rfq__pop { position: absolute; top: 110%; left: 0; z-index: 10; width: 16rem; padding: 1rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.2); border-radius: 12px; background: rgb(var(--color-background, 255 255 255)); box-shadow: 0 10px 30px rgb(0 0 0 / 0.15); }
.gpl-rfq__title { margin: 0 0 0.6rem; font-weight: 800; font-size: 0.8rem; }
.gpl-rfq__form { display: grid; gap: 0.4rem; }
.gpl-rfq__form input { padding: 0.5rem 0.7rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3); border-radius: 7px; font-size: 0.72rem; }
.gpl-rfq__form button { padding: 0.5rem 1rem; border: 0; border-radius: 7px; background: rgb(var(--color-button, 15 23 42)); color: rgb(var(--color-button-text, 255 255 255)); font-size: 0.7rem; font-weight: 700; cursor: pointer; }`,
      js: `document.querySelectorAll('gpl-rfq').forEach((el) => {
  el.querySelector('[data-open]').addEventListener('click', () => {
    const pop = el.querySelector('.gpl-rfq__pop');
    pop.hidden = !pop.hidden;
  });
});`,
      usage: `{% render 'request-quote', label: ${js(str(v, "label"))} %}`,
    }),
  },
  {
    id: "ugc-submit",
    name: "Share your look prompt",
    description: "'Tag us or upload a photo' - turns buyers into UGC creators with a real submission path.",
    category: "Trust & social proof",
    kind: "snippet",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 50 },
      { id: "handle", label: "IG handle", type: "text", maxLength: 30 },
    ],
    defaults: { heading: "Show us how you style it", handle: "@yourstore" },
    install: [
      ...snippetSteps("ugc-submit.liquid"),
      "Collects photo links via a contact form - photos themselves go to your DM/inbox, not a database.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-ugc2">
  <p class="gpl-ugc2__heading">{{ heading | default: 'Show us your style' }}</p>
  <p class="gpl-ugc2__sub">Tag {{ handle | default: '@us' }} on Instagram or send a pic - we feature the best ones.</p>
  {%- form 'contact', class: 'gpl-ugc2__form' -%}
    <input type="hidden" name="contact[tags]" value="ugc-{{ product.handle }}">
    <input type="text" name="contact[body]" placeholder="Link to your post or photo">
    <input type="email" name="contact[email]" placeholder="Email (to credit you)" required>
    <button type="submit">Share</button>
  {%- endform -%}
</div>`,
      css: `.gpl-ugc2 { margin: 1rem 0; padding: 1rem; border: 1px dashed rgb(var(--color-foreground, 148 163 184) / 0.3); border-radius: 10px; }
.gpl-ugc2__heading { margin: 0; font-size: 0.82rem; font-weight: 800; }
.gpl-ugc2__sub { margin: 0.3rem 0 0; font-size: 0.68rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-ugc2__form { display: grid; gap: 0.4rem; margin-top: 0.75rem; }
.gpl-ugc2__form input { padding: 0.5rem 0.7rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3); border-radius: 7px; font-size: 0.72rem; }
.gpl-ugc2__form button { padding: 0.5rem 1.1rem; border: 0; border-radius: 7px; background: rgb(var(--color-button, 15 23 42)); color: rgb(var(--color-button-text, 255 255 255)); font-size: 0.7rem; font-weight: 700; cursor: pointer; justify-self: start; }`,
      usage: `{% render 'ugc-submit', product: product, heading: ${js(str(v, "heading"))}, handle: ${js(str(v, "handle"))} %}`,
    }),
  },
  {
    id: "video-player-section",
    name: "Native video player",
    description: "A real hosted video with controls - not a YouTube iframe, for when you want it to feel native to the store.",
    category: "Content",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 50 },
    ],
    defaults: { heading: "See it in action" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-vid">
  {%- if section.settings.heading != blank -%}
    <h2 class="gpl-vid__heading">{{ section.settings.heading }}</h2>
  {%- endif -%}
  {%- if section.settings.video != blank -%}
    <video class="gpl-vid__player" controls playsinline poster="{{ section.settings.poster | image_url: width: 1200 }}">
      <source src="{{ section.settings.video }}" type="video/mp4">
    </video>
  {%- else -%}
    <div class="gpl-vid__empty">Upload a video in the section settings.</div>
  {%- endif -%}
</div>

{% schema %}
{
  "name": "Video player",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading"))} },
    { "type": "video", "id": "video", "label": "Video" },
    { "type": "image_picker", "id": "poster", "label": "Poster image" }
  ],
  "presets": [{ "name": "Video player" }]
}
{% endschema %}`,
      css: `.gpl-vid { padding: 1.5rem 0; }
.gpl-vid__heading { margin: 0 0 1rem; font-size: 1rem; font-weight: 800; }
.gpl-vid__player { width: 100%; border-radius: 14px; display: block; background: #000; }
.gpl-vid__empty { padding: 3rem; border: 1px dashed rgb(var(--color-foreground, 148 163 184) / 0.3); border-radius: 14px; text-align: center; font-size: 0.78rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
    }),
  },
  {
    id: "ambassador-signup",
    name: "Ambassador program signup",
    description: "'Become an ambassador' - IG handle + follower count + why, tagged for the collab pipeline.",
    category: "Marketing",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 50 },
      { id: "text", label: "Pitch", type: "text", maxLength: 120 },
    ],
    defaults: { heading: "Join the ambassador crew", text: "Free product + commission for creators who genuinely use what we make." },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-amb">
  <h2 class="gpl-amb__heading">{{ section.settings.heading }}</h2>
  {%- if section.settings.text != blank -%}
    <p class="gpl-amb__text">{{ section.settings.text }}</p>
  {%- endif -%}
  {%- form 'contact', class: 'gpl-amb__form' -%}
    <input type="hidden" name="contact[tags]" value="ambassador">
    <input type="text" name="contact[name]" placeholder="Name" required>
    <input type="text" name="contact[ig]" placeholder="Instagram handle" required>
    <input type="text" name="contact[followers]" placeholder="Follower count (approx)">
    <input type="email" name="contact[email]" placeholder="Email" required>
    <textarea name="contact[body]" rows="2" placeholder="Why you? (one line)"></textarea>
    <button type="submit">Apply</button>
  {%- endform -%}
</div>

{% schema %}
{
  "name": "Ambassador signup",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading"))} },
    { "type": "textarea", "id": "text", "label": "Pitch", "default": ${js(str(v, "text"))} }
  ],
  "presets": [{ "name": "Ambassador signup" }]
}
{% endschema %}`,
      css: `.gpl-amb { padding: 1.5rem 0; max-width: 28rem; }
.gpl-amb__heading { margin: 0; font-size: 1.1rem; font-weight: 800; }
.gpl-amb__text { margin: 0.4rem 0 0; font-size: 0.72rem; color: rgb(var(--color-foreground, 100 116 139) / 0.8); }
.gpl-amb__form { display: grid; gap: 0.6rem; margin-top: 1rem; }
.gpl-amb__form input, .gpl-amb__form textarea {
  padding: 0.7rem 0.9rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3);
  border-radius: 9px;
  background: transparent;
  font: inherit;
  font-size: 0.82rem;
}
.gpl-amb__form button { padding: 0.75rem 1.75rem; border: 0; border-radius: 10px; background: rgb(var(--color-button, 15 23 42)); color: rgb(var(--color-button-text, 255 255 255)); font-weight: 800; cursor: pointer; justify-self: start; }`,
    }),
  },
  {
    id: "collection-notify",
    name: "Drop notification signup",
    description: "'Get notified when [collection] drops' - per-collection waitlist for launches.",
    category: "Marketing",
    kind: "snippet",
    controls: [
      { id: "label", label: "Collection name", type: "text", maxLength: 40 },
    ],
    defaults: { label: "the summer drop" },
    install: snippetSteps("collection-notify.liquid"),
    files: (v) => ({
      liquid: `<div class="gpl-cnotify">
  <p class="gpl-cnotify__text">Get notified when <b>{{ label | default: 'the drop' }}</b> goes live</p>
  {%- form 'customer', class: 'gpl-cnotify__form' -%}
    <input type="hidden" name="contact[tags]" value="drop-{{ label | default: 'drop' | handleize }}">
    <input type="email" name="contact[email]" placeholder="Your email" required>
    <button type="submit">Notify me</button>
  {%- endform -%}
</div>`,
      css: `.gpl-cnotify { margin: 1rem 0; padding: 1rem; border-radius: 10px; background: rgb(var(--color-button, 21 128 61) / 0.07); }
.gpl-cnotify__text { margin: 0; font-size: 0.78rem; font-weight: 600; }
.gpl-cnotify__form { display: flex; gap: 0.4rem; margin-top: 0.7rem; }
.gpl-cnotify__form input { flex: 1; min-width: 0; padding: 0.55rem 0.8rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3); border-radius: 999px; font-size: 0.72rem; }
.gpl-cnotify__form button { padding: 0.55rem 1.1rem; border: 0; border-radius: 999px; background: rgb(var(--color-button, 15 23 42)); color: rgb(var(--color-button-text, 255 255 255)); font-size: 0.7rem; font-weight: 700; cursor: pointer; }`,
      usage: `{% render 'collection-notify', label: ${js(str(v, "label"))} %}`,
    }),
  },
  {
    id: "birthday-capture",
    name: "Birthday signup",
    description: "'Get a gift on your birthday' - DOB + email for the birthday-discount flow.",
    category: "Marketing",
    kind: "snippet",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 50 },
      { id: "reward", label: "Reward text", type: "text", maxLength: 60 },
    ],
    defaults: { heading: "Birthday perks", reward: "We'll send you a birthday discount - every year." },
    install: snippetSteps("birthday-capture.liquid"),
    files: (v) => ({
      liquid: `<div class="gpl-bday">
  <p class="gpl-bday__heading">{{ heading | default: 'Birthday perks' }}</p>
  <p class="gpl-bday__sub">{{ reward | default: '' }}</p>
  {%- form 'customer', class: 'gpl-bday__form' -%}
    <input type="hidden" name="contact[tags]" value="birthday">
    <input type="date" name="contact[note]" required aria-label="Birthday">
    <input type="email" name="contact[email]" placeholder="Your email" required>
    <button type="submit">Save my birthday</button>
  {%- endform -%}
</div>`,
      css: `.gpl-bday { margin: 1rem 0; padding: 1rem; border: 1px dashed rgb(var(--color-button, 245 158 11) / 0.4); border-radius: 10px; }
.gpl-bday__heading { margin: 0; font-size: 0.82rem; font-weight: 800; }
.gpl-bday__sub { margin: 0.3rem 0 0; font-size: 0.68rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-bday__form { display: grid; gap: 0.4rem; margin-top: 0.7rem; }
.gpl-bday__form input { padding: 0.55rem 0.8rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3); border-radius: 8px; font-size: 0.75rem; color-scheme: inherit; }
.gpl-bday__form button { padding: 0.55rem 1.1rem; border: 0; border-radius: 8px; background: rgb(var(--color-button, 15 23 42)); color: rgb(var(--color-button-text, 255 255 255)); font-size: 0.7rem; font-weight: 700; cursor: pointer; justify-self: start; }`,
      usage: `{% render 'birthday-capture', heading: ${js(str(v, "heading"))}, reward: ${js(str(v, "reward"))} %}`,
    }),
  },
  {
    id: "phone-bar",
    name: "Phone number bar",
    description: "Click-to-call strip above the header - phone, hours and a WhatsApp link. Converts older and B2B buyers.",
    category: "Headers & navigation",
    kind: "snippet",
    controls: [
      { id: "phone", label: "Phone number", type: "text", maxLength: 15 },
      { id: "hours", label: "Support hours", type: "text", maxLength: 40 },
      { id: "wa", label: "WhatsApp number", type: "text", maxLength: 15 },
    ],
    defaults: { phone: "+919876543210", hours: "Mon-Sat, 10am-7pm IST", wa: "919876543210" },
    install: [
      ...snippetSteps("phone-bar.liquid"),
      "Render inside the header, above the logo row - a visible phone number signals a real business.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-phonebar">
  <a class="gpl-phonebar__item" href="tel:{{ phone | remove: ' ' }}">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    <b>{{ phone }}</b>
    {%- if hours != blank -%}
      <span class="gpl-phonebar__hours">{{ hours }}</span>
    {%- endif -%}
  </a>
  {%- if wa != blank -%}
    <a class="gpl-phonebar__item gpl-phonebar__wa" href="https://wa.me/{{ wa }}" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35M12.05 21.79h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.72.98 1-3.63-.24-.37a9.8 9.8 0 0 1-1.51-5.22c0-5.41 4.4-9.81 9.82-9.81a9.76 9.76 0 0 1 6.93 2.87 9.74 9.74 0 0 1 2.87 6.94c0 5.41-4.4 9.82-9.81 9.82M20.44 3.55A11.76 11.76 0 0 0 12.04 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.32-1.65a11.9 11.9 0 0 0 5.66 1.44h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.5-8.41"/></svg>
      WhatsApp
    </a>
  {%- endif -%}
</div>`,
      css: `.gpl-phonebar { display: flex; align-items: center; justify-content: center; gap: 1.25rem; padding: 0.5rem 1rem; border-bottom: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.15); font-size: 0.72rem; }
.gpl-phonebar__item { display: flex; align-items: center; gap: 0.4rem; text-decoration: none; color: inherit; }
.gpl-phonebar__item svg { width: 0.8rem; height: 0.8rem; }
.gpl-phonebar__item b { font-weight: 700; }
.gpl-phonebar__hours { color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-phonebar__wa { color: #16a34a; font-weight: 700; }
@media (max-width: 640px) { .gpl-phonebar { flex-direction: column; gap: 0.3rem; } }`,
      usage: `{% render 'phone-bar', phone: ${js(str(v, "phone"))}, hours: ${js(str(v, "hours"))}, wa: ${js(str(v, "wa"))} %}`,
    }),
  },
  {
    id: "sold-out-overlay",
    name: "Sold out card overlay",
    description: "'SOLD OUT' badge over the product image on grids - an automatic visual, not a label you manually update.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "label", label: "Badge text", type: "text", maxLength: 20 },
    ],
    defaults: { label: "SOLD OUT" },
    install: [
      ...snippetSteps("sold-out-overlay.liquid"),
      "Render inside the product card wrapper - it only shows when product.available is false.",
    ],
    files: (v) => ({
      liquid: `{%- unless product.available -%}
<span class="gpl-so-overlay">{{ label | default: 'SOLD OUT' }}</span>
{%- endunless -%}`,
      css: `.gpl-so-overlay {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 5;
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  background: rgb(var(--color-foreground, 15 23 42) / 0.9);
  color: rgb(var(--color-background, 255 255 255));
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}`,
      usage: `{% render 'sold-out-overlay', product: product, label: ${js(str(v, "label"))} %}`,
    }),
  },
  {
    id: "notify-whatsapp",
    name: "WhatsApp notify me",
    description: "'Notify on WhatsApp' for sold-out products - opens WhatsApp with the product link prefilled.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "wa", label: "Your WhatsApp number", type: "text", maxLength: 15 },
      { id: "label", label: "Button label", type: "text", maxLength: 30 },
    ],
    defaults: { wa: "919876543210", label: "Notify on WhatsApp" },
    install: [
      ...snippetSteps("notify-whatsapp.liquid"),
      "Free alternative to back-in-stock apps - customer messages you, you reply when it's live.",
    ],
    files: (v) => ({
      liquid: `{%- assign msg = 'Let me know when ' | append: product.title | append: ' is back: ' | append: shop.url | append: product.url | url_encode -%}
<a class="gpl-wan" href="https://wa.me/{{ wa }}?text={{ msg }}" target="_blank" rel="noopener">
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35"/></svg>
  {{ label | default: 'Notify me' }}
</a>`,
      css: `.gpl-wan {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.4rem;
  border-radius: 999px;
  background: #25d366;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  text-decoration: none;
}
.gpl-wan svg { width: 0.9rem; height: 0.9rem; }`,
      usage: `{% render 'notify-whatsapp', product: product, wa: ${js(str(v, "wa"))}, label: ${js(str(v, "label"))} %}`,
    }),
  },
  {
    id: "mobile-menu-drawer",
    name: "Mobile nav drawer",
    description: "Slide-in menu with collections and a support footer - the navigation every mobile shopper expects.",
    category: "Headers & navigation",
    kind: "snippet",
    controls: [
      { id: "links", label: "Links (label|url per line)", type: "text", maxLength: 300 },
      { id: "phone", label: "Footer phone", type: "text", maxLength: 15 },
    ],
    defaults: { links: "Home|/\nNew in|/collections/new\nBestsellers|/collections/bestsellers\nSale|/collections/sale\nTrack order|/pages/track", phone: "+919876543210" },
    install: snippetSteps("mobile-menu-drawer.liquid"),
    files: (v) => ({
      liquid: `<gpl-mnav class="gpl-mnav">
  <button type="button" class="gpl-mnav__open" data-open aria-label="Menu">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
  </button>
  <div class="gpl-mnav__backdrop" hidden data-backdrop></div>
  <nav class="gpl-mnav__drawer" hidden data-drawer aria-label="Mobile menu">
    <button type="button" class="gpl-mnav__close" data-close aria-label="Close">&times;</button>
    {%- assign rows = links | newline_to_br | split: '<br />' -%}
    {%- for row in rows -%}
      {%- assign parts = row | strip | split: '|' -%}
      <a class="gpl-mnav__link" href="{{ parts[1] | strip | default: '#' }}">{{ parts[0] | strip }}</a>
    {%- endfor -%}
    {%- if phone != blank -%}
      <div class="gpl-mnav__foot">
        <p class="gpl-mnav__foot-label">Need help?</p>
        <a class="gpl-mnav__foot-link" href="tel:{{ phone | remove: ' ' }}">{{ phone }}</a>
      </div>
    {%- endif -%}
  </nav>
</gpl-mnav>`,
      css: `.gpl-mnav__open { border: 0; background: none; padding: 0.5rem; cursor: pointer; color: inherit; }
.gpl-mnav__open svg { width: 1.4rem; height: 1.4rem; }
.gpl-mnav__backdrop { position: fixed; inset: 0; z-index: 70; background: rgb(0 0 0 / 0.4); }
.gpl-mnav__drawer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 71;
  width: min(80vw, 20rem);
  background: rgb(var(--color-background, 255 255 255));
  padding: 1.25rem;
  overflow-y: auto;
}
.gpl-mnav__close { border: 0; background: none; font-size: 1.6rem; cursor: pointer; color: inherit; }
.gpl-mnav__link { display: block; padding: 0.85rem 0; border-bottom: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.12); font-size: 0.9rem; font-weight: 600; text-decoration: none; color: inherit; }
.gpl-mnav__foot { margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.15); }
.gpl-mnav__foot-label { margin: 0; font-size: 0.65rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-mnav__foot-link { font-size: 0.85rem; font-weight: 700; color: rgb(var(--color-button, 21 128 61)); text-decoration: none; }`,
      js: `document.querySelectorAll('gpl-mnav').forEach((el) => {
  const drawer = el.querySelector('[data-drawer]');
  const back = el.querySelector('[data-backdrop]');
  function open() { drawer.hidden = false; back.hidden = false; document.body.style.overflow = 'hidden'; }
  function close() { drawer.hidden = true; back.hidden = true; document.body.style.overflow = ''; }
  el.querySelector('[data-open]').addEventListener('click', open);
  el.querySelector('[data-close]').addEventListener('click', close);
  back.addEventListener('click', close);
});`,
      usage: `{% render 'mobile-menu-drawer', links: ${js(str(v, "links"))}, phone: ${js(str(v, "phone"))} %}`,
    }),
  },
  {
    id: "sticky-category-nav",
    name: "Sticky category pills",
    description: "Horizontally scrollable category chips that stick under the header - mobile navigation without a hamburger.",
    category: "Headers & navigation",
    kind: "snippet",
    controls: [
      { id: "cats", label: "Categories (comma separated)", type: "text", maxLength: 150 },
    ],
    defaults: { cats: "New in, Bestsellers, Tees, Bottoms, Accessories, Sale" },
    install: snippetSteps("sticky-category-nav.liquid"),
    files: (v) => ({
      liquid: `<nav class="gpl-catnav" aria-label="Categories">
  {%- assign cs = cats | split: ',' -%}
  {%- for c in cs -%}
    {%- assign cat = c | strip -%}
    <a class="gpl-catnav__pill{% if collection.title == cat %} is-active{% endif %}" href="{{ routes.collections_url }}/{{ cat | handleize }}">{{ cat }}</a>
  {%- endfor -%}
</nav>`,
      css: `.gpl-catnav {
  position: sticky;
  top: 0;
  z-index: 40;
  display: flex;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  overflow-x: auto;
  scrollbar-width: none;
  border-bottom: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.15);
  background: rgb(var(--color-background, 255 255 255));
}
.gpl-catnav::-webkit-scrollbar { display: none; }
.gpl-catnav__pill {
  flex-shrink: 0;
  padding: 0.4rem 0.95rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.25);
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 600;
  text-decoration: none;
  color: inherit;
  white-space: nowrap;
}
.gpl-catnav__pill.is-active { background: rgb(var(--color-button, 15 23 42)); color: rgb(var(--color-button-text, 255 255 255)); border-color: transparent; }`,
      usage: `{% render 'sticky-category-nav', cats: ${js(str(v, "cats"))}, collection: collection %}`,
    }),
  },
  {
    id: "callback-request",
    name: "Request a callback",
    description: "'We'll call you' - name + number form for buyers who'd rather talk than read a product page.",
    category: "Marketing",
    kind: "snippet",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 50 },
    ],
    defaults: { heading: "Prefer a call?" },
    install: snippetSteps("callback-request.liquid"),
    files: (v) => ({
      liquid: `<div class="gpl-callback">
  <p class="gpl-callback__heading">{{ heading | default: 'Request a callback' }}</p>
  {%- form 'contact', class: 'gpl-callback__form' -%}
    <input type="hidden" name="contact[tags]" value="callback-request">
    <input type="text" name="contact[name]" placeholder="Name" required>
    <input type="tel" name="contact[phone]" placeholder="Phone" required>
    <select name="contact[time]">
      <option>Best time: morning</option>
      <option>Best time: afternoon</option>
      <option>Best time: evening</option>
    </select>
    <button type="submit">Call me back</button>
  {%- endform -%}
</div>`,
      css: `.gpl-callback { margin: 1rem 0; padding: 1rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.2); border-radius: 10px; }
.gpl-callback__heading { margin: 0 0 0.7rem; font-size: 0.8rem; font-weight: 800; }
.gpl-callback__form { display: grid; gap: 0.5rem; }
.gpl-callback__form input, .gpl-callback__form select { padding: 0.6rem 0.8rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3); border-radius: 8px; font: inherit; font-size: 0.78rem; }
.gpl-callback__form button { padding: 0.6rem 1.25rem; border: 0; border-radius: 8px; background: rgb(var(--color-button, 15 23 42)); color: rgb(var(--color-button-text, 255 255 255)); font-size: 0.72rem; font-weight: 700; cursor: pointer; justify-self: start; }`,
      usage: `{% render 'callback-request', heading: ${js(str(v, "heading"))} %}`,
    }),
  },
  {
    id: "emi-plans-table",
    name: "EMI plans table",
    description: "Bank / tenure / monthly-amount table - the clear EMI breakdown that answers 'can I afford this' upfront.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "price", label: "Product price (₹)", type: "text", maxLength: 8 },
      { id: "rows", label: "Plans (bank|months|per month per line)", type: "text", maxLength: 300 },
    ],
    defaults: { price: "24990", rows: "HDFC|3|₹8,330\nHDFC|6|₹4,165\nICICI|9|₹2,777\nSBI|12|₹2,083" },
    install: [
      ...snippetSteps("emi-plans-table.liquid"),
      "Wire to your real EMI partner rates - showing EMI you don't offer is a checkout betrayal.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-emitable">
  <p class="gpl-emitable__title">No-cost EMI available{%- if price != blank %} on {{ price }}{% endif %}</p>
  <table class="gpl-emitable__table">
    <thead><tr><th>Bank</th><th>Tenure</th><th>Per month</th></tr></thead>
    <tbody>
      {%- assign rows = rows | newline_to_br | split: '<br />' -%}
      {%- for row in rows -%}
        {%- assign parts = row | strip | split: '|' -%}
        <tr><td>{{ parts[0] | strip }}</td><td>{{ parts[1] | strip }} mo</td><td class="gpl-emitable__amt">{{ parts[2] | strip }}</td></tr>
      {%- endfor -%}
    </tbody>
  </table>
</div>`,
      css: `.gpl-emitable { margin: 0.75rem 0; }
.gpl-emitable__title { margin: 0 0 0.6rem; font-size: 0.75rem; font-weight: 800; }
.gpl-emitable__table { width: 100%; border-collapse: collapse; font-size: 0.72rem; }
.gpl-emitable__table th { padding: 0.4rem; text-align: left; font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.08em; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-emitable__table td { padding: 0.45rem 0.4rem; border-top: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.18); }
.gpl-emitable__amt { font-weight: 700; }`,
      usage: `{% render 'emi-plans-table', price: ${js(str(v, "price"))}, rows: ${js(str(v, "rows"))} %}`,
    }),
  },
  {
    id: "upi-badges",
    name: "UPI payment badges",
    description: "UPI / GPay / PhonePe / Paytm icons - the payment methods Indian buyers actually look for before trusting a store.",
    category: "Trust & social proof",
    kind: "snippet",
    controls: [],
    defaults: {},
    install: [
      ...snippetSteps("upi-badges.liquid"),
      "Only show methods you actually accept - check your Razorpay/Shopify Payments config first.",
    ],
    files: () => ({
      liquid: `<div class="gpl-upi">
  <span class="gpl-upi__badge">UPI</span>
  <span class="gpl-upi__badge">GPay</span>
  <span class="gpl-upi__badge">PhonePe</span>
  <span class="gpl-upi__badge">Paytm</span>
  <span class="gpl-upi__badge">Cards</span>
</div>`,
      css: `.gpl-upi { display: flex; flex-wrap: wrap; gap: 0.4rem; margin: 0.6rem 0; }
.gpl-upi__badge {
  padding: 0.3rem 0.65rem;
  border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.25);
  border-radius: 5px;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.02em;
}`,
      usage: `{% render 'upi-badges' %}`,
    }),
  },
  {
    id: "size-recommender",
    name: "Size recommender",
    description: "Height + weight -> suggested size - reduces the #1 return reason on fashion stores.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "label", label: "Label", type: "text", maxLength: 40 },
    ],
    defaults: { label: "Find your size" },
    install: [
      ...snippetSteps("size-recommender.liquid"),
      "Tune the height/weight bands to your real fit notes - a wrong suggestion is worse than none.",
    ],
    files: (v) => ({
      liquid: `<gpl-sizerec class="gpl-sizerec">
  <p class="gpl-sizerec__label">{{ label | default: 'Find your size' }}</p>
  <div class="gpl-sizerec__row">
    <input type="number" placeholder="Height (cm)" data-h>
    <input type="number" placeholder="Weight (kg)" data-w>
  </div>
  <p class="gpl-sizerec__result" hidden data-result></p>
</gpl-sizerec>`,
      css: `.gpl-sizerec { margin: 0.75rem 0; padding: 0.9rem; border: 1px dashed rgb(var(--color-foreground, 148 163 184) / 0.3); border-radius: 9px; }
.gpl-sizerec__label { margin: 0 0 0.6rem; font-size: 0.72rem; font-weight: 700; }
.gpl-sizerec__row { display: flex; gap: 0.5rem; }
.gpl-sizerec__row input { flex: 1; min-width: 0; padding: 0.55rem 0.7rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3); border-radius: 8px; font-size: 0.75rem; }
.gpl-sizerec__result { margin: 0.6rem 0 0; font-size: 0.72rem; font-weight: 700; color: #16a34a; }`,
      js: `document.querySelectorAll('gpl-sizerec').forEach((el) => {
  const h = el.querySelector('[data-h]');
  const w = el.querySelector('[data-w]');
  const res = el.querySelector('[data-result]');
  function guess() {
    const hv = Number(h.value), wv = Number(w.value);
    if (!hv || !wv) { res.hidden = true; return; }
    const bmi = wv / ((hv / 100) ** 2);
    let s = 'M';
    if (bmi < 19) s = 'S'; else if (bmi < 23) s = 'M'; else if (bmi < 27) s = 'L'; else s = 'XL';
    res.textContent = 'Suggested size: ' + s;
    res.hidden = false;
  }
  h.addEventListener('input', guess);
  w.addEventListener('input', guess);
});`,
      usage: `{% render 'size-recommender', label: ${js(str(v, "label"))} %}`,
    }),
  },
  {
    id: "login-prompt",
    name: "Member pricing prompt",
    description: "'Log in for member pricing' - prompts account creation on the PDP without being a hard gate.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "text", label: "Prompt text", type: "text", maxLength: 60 },
      { id: "cta", label: "Link label", type: "text", maxLength: 30 },
    ],
    defaults: { text: "Log in for member pricing and faster checkout", cta: "Log in" },
    install: [
      ...snippetSteps("login-prompt.liquid"),
      "Shows only for logged-out visitors - logged-in members don't see the nag.",
    ],
    files: (v) => ({
      liquid: `{%- unless customer -%}
<div class="gpl-loginp">
  <p class="gpl-loginp__text">{{ text | default: 'Log in for member benefits' }}</p>
  <a class="gpl-loginp__cta" href="{{ routes.account_login_url }}">{{ cta | default: 'Log in' }} &rarr;</a>
</div>
{%- endunless -%}`,
      css: `.gpl-loginp { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; margin: 0.75rem 0; padding: 0.7rem 0.9rem; border-radius: 9px; background: rgb(var(--color-button, 21 128 61) / 0.07); }
.gpl-loginp__text { margin: 0; font-size: 0.72rem; font-weight: 600; }
.gpl-loginp__cta { font-size: 0.68rem; font-weight: 700; color: rgb(var(--color-button, 21 128 61)); text-decoration: none; white-space: nowrap; }`,
      usage: `{% render 'login-prompt', text: ${js(str(v, "text"))}, cta: ${js(str(v, "cta"))} %}`,
    }),
  },
  {
    id: "ssl-note",
    name: "Secure checkout note",
    description: "'256-bit SSL secured' under the buy button - the security reassurance that actually affects conversion.",
    category: "Trust & social proof",
    kind: "snippet",
    controls: [
      { id: "text", label: "Note text", type: "text", maxLength: 60 },
    ],
    defaults: { text: "Secure checkout - 256-bit SSL encrypted" },
    install: snippetSteps("ssl-note.liquid"),
    files: (v) => ({
      liquid: `<p class="gpl-ssl">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  {{ text | default: 'Secure checkout' }}
</p>`,
      css: `.gpl-ssl { display: flex; align-items: center; justify-content: center; gap: 0.35rem; margin: 0.4rem 0; font-size: 0.65rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-ssl svg { width: 0.75rem; height: 0.75rem; }`,
      usage: `{% render 'ssl-note', text: ${js(str(v, "text"))} %}`,
    }),
  },
  {
    id: "article-progress",
    name: "Reading progress bar",
    description: "A thin progress bar at the top while reading blog posts - keeps readers oriented on long content.",
    category: "Content",
    kind: "snippet",
    controls: [],
    defaults: {},
    install: [
      ...snippetSteps("article-progress.liquid"),
      "Render at the top of the article template - fills as you scroll through the post.",
    ],
    files: () => ({
      liquid: `<gpl-aprogress class="gpl-aprogress"><span data-fill></span></gpl-aprogress>`,
      css: `.gpl-aprogress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 80;
  height: 3px;
  background: rgb(var(--color-foreground, 148 163 184) / 0.12);
}
.gpl-aprogress span { display: block; height: 100%; width: 0; background: rgb(var(--color-button, 21 128 61)); transition: width 0.1s; }`,
      js: `document.querySelectorAll('gpl-aprogress').forEach((el) => {
  const fill = el.querySelector('[data-fill]');
  window.addEventListener('scroll', () => {
    const doc = document.documentElement;
    const pct = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
    fill.style.width = Math.min(100, Math.max(0, pct)) + '%';
  }, { passive: true });
});`,
      usage: `{% render 'article-progress' %}`,
    }),
  },
  {
    id: "related-articles",
    name: "Related blog posts",
    description: "'Keep reading' cards for 3 posts in the same blog - keeps readers on your site instead of bouncing.",
    category: "Content",
    kind: "snippet",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 40 },
      { id: "limit", label: "Max articles", type: "text", maxLength: 2 },
    ],
    defaults: { heading: "Keep reading", limit: "3" },
    install: [
      ...snippetSteps("related-articles.liquid"),
      "Render at the bottom of the article template - pulls other posts from the same blog.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-rel">
  <p class="gpl-rel__heading">{{ heading | default: 'Keep reading' }}</p>
  <div class="gpl-rel__grid">
    {%- for a in blog.articles limit: limit -%}
      {%- if a.id != article.id -%}
        <a class="gpl-rel__card" href="{{ a.url }}">
          {{ a.image | image_url: width: 400 | image_tag: class: 'gpl-rel__img', loading: 'lazy' }}
          <span class="gpl-rel__title">{{ a.title }}</span>
          <span class="gpl-rel__date">{{ a.published_at | date: '%b %d' }}</span>
        </a>
      {%- endif -%}
    {%- endfor -%}
  </div>
</div>`,
      css: `.gpl-rel { margin: 2rem 0; }
.gpl-rel__heading { margin: 0 0 0.9rem; font-size: 0.82rem; font-weight: 800; }
.gpl-rel__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.9rem; }
@media (max-width: 640px) { .gpl-rel__grid { grid-template-columns: 1fr; } }
.gpl-rel__card { text-decoration: none; color: inherit; }
.gpl-rel__img { width: 100%; aspect-ratio: 16/9; object-fit: cover; border-radius: 10px; display: block; }
.gpl-rel__title { display: block; margin-top: 0.5rem; font-size: 0.75rem; font-weight: 700; }
.gpl-rel__date { display: block; font-size: 0.62rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
      usage: `{% render 'related-articles', blog: blog, article: article, heading: ${js(str(v, "heading"))}, limit: ${js(str(v, "limit"))} %}`,
    }),
  },
  {
    id: "author-card",
    name: "Author bio card",
    description: "Name + avatar + short bio under blog posts - signals a real person wrote it, not content-mill filler.",
    category: "Content",
    kind: "snippet",
    controls: [
      { id: "name", label: "Author name", type: "text", maxLength: 40 },
      { id: "bio", label: "Bio", type: "text", maxLength: 120 },
    ],
    defaults: { name: "Priya Sharma", bio: "Writes about D2C growth and honest ecommerce." },
    install: snippetSteps("author-card.liquid"),
    files: (v) => ({
      liquid: `<div class="gpl-author">
  <div class="gpl-author__avatar">{{ name | slice: 0 }}</div>
  <div>
    <p class="gpl-author__name">{{ name | default: article.author | default: 'Team' }}</p>
    <p class="gpl-author__bio">{{ bio | default: '' }}</p>
  </div>
</div>`,
      css: `.gpl-author { display: flex; align-items: center; gap: 0.9rem; margin: 2rem 0; padding: 1.1rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.2); border-radius: 12px; }
.gpl-author__avatar {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 999px;
  background: rgb(var(--color-button, 21 128 61));
  color: #fff;
  font-size: 1.1rem;
  font-weight: 800;
  flex-shrink: 0;
}
.gpl-author__name { margin: 0; font-size: 0.82rem; font-weight: 800; }
.gpl-author__bio { margin: 0.25rem 0 0; font-size: 0.72rem; color: rgb(var(--color-foreground, 100 116 139) / 0.8); }`,
      usage: `{% render 'author-card', article: article, name: ${js(str(v, "name"))}, bio: ${js(str(v, "bio"))} %}`,
    }),
  },
  {
    id: "staff-picks",
    name: "Staff picks section",
    description: "'Our team's favourites' - curated picks with a human angle that bestseller lists don't have.",
    category: "Content",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 50 },
      { id: "items", label: "Picks (name|role|product handle per line)", type: "text", maxLength: 300 },
    ],
    defaults: {
      heading: "Staff picks",
      items: "Priya|Head of design|linen-overshirt\nArjun|Ops lead|cotton-chinos\nMeera|Founder|canvas-tote",
    },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<div class="gpl-staff">
  <h2 class="gpl-staff__heading">{{ section.settings.heading }}</h2>
  <div class="gpl-staff__grid">
    {%- assign rows = section.settings.items | newline_to_br | split: '<br />' -%}
    {%- for row in rows -%}
      {%- assign parts = row | strip | split: '|' -%}
      {%- assign pick_handle = parts[2] | strip -%}
      {%- assign p = all_products[pick_handle] -%}
      <a class="gpl-staff__card" href="{{ p.url | default: '#' }}">
        {{ p.featured_image | image_url: width: 400 | image_tag: class: 'gpl-staff__img', loading: 'lazy' }}
        <span class="gpl-staff__badge">{{ parts[0] | strip }}'s pick</span>
        <span class="gpl-staff__title">{{ p.title | default: pick_handle }}</span>
        <span class="gpl-staff__price">{{ p.price | money }}</span>
      </a>
    {%- endfor -%}
  </div>
</div>

{% schema %}
{
  "name": "Staff picks",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading"))} },
    { "type": "textarea", "id": "items", "label": "Picks (name|role|handle per line)", "default": ${js(str(v, "items"))} }
  ],
  "presets": [{ "name": "Staff picks" }]
}
{% endschema %}`,
      css: `.gpl-staff { padding: 1.5rem 0; }
.gpl-staff__heading { margin: 0 0 1rem; font-size: 1.1rem; font-weight: 800; }
.gpl-staff__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.9rem; }
@media (max-width: 640px) { .gpl-staff__grid { grid-template-columns: repeat(2, 1fr); } }
.gpl-staff__card { position: relative; text-decoration: none; color: inherit; }
.gpl-staff__img { width: 100%; aspect-ratio: 4/5; object-fit: cover; border-radius: 12px; display: block; }
.gpl-staff__badge {
  position: absolute;
  top: 0.7rem;
  left: 0.7rem;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  background: rgb(var(--color-background, 255 255 255) / 0.95);
  font-size: 0.6rem;
  font-weight: 800;
}
.gpl-staff__title { display: block; margin-top: 0.5rem; font-size: 0.75rem; font-weight: 700; }
.gpl-staff__price { display: block; font-size: 0.65rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
    }),
  },
  {
    id: "multi-column-footer",
    name: "Footer link columns",
    description: "Structured footer with Shop / Help / Company columns + contact strip - the nav most stores skip until it's too late.",
    category: "Headers & navigation",
    kind: "section",
    controls: [
      { id: "cols", label: "Columns (heading|links per line, links comma-separated)", type: "text", maxLength: 400 },
      { id: "phone", label: "Phone", type: "text", maxLength: 15 },
    ],
    defaults: {
      cols: "Shop|New in,Bestsellers,Sale\nHelp|Track order,Returns,Contact\nCompany|About,Careers,Press",
      phone: "+919876543210",
    },
    install: sectionSteps,
    files: (v) => ({
      liquid: `<footer class="gpl-footer">
  <div class="gpl-footer__grid">
    {%- assign rows = section.settings.cols | newline_to_br | split: '<br />' -%}
    {%- for row in rows -%}
      {%- assign parts = row | strip | split: '|' -%}
      <div class="gpl-footer__col">
        <p class="gpl-footer__head">{{ parts[0] | strip }}</p>
        {%- assign links = parts[1] | split: ',' -%}
        {%- for l in links -%}
          <a class="gpl-footer__link" href="#">{{ l | strip }}</a>
        {%- endfor -%}
      </div>
    {%- endfor -%}
  </div>
  {%- if section.settings.phone != blank -%}
    <div class="gpl-footer__contact">
      <a href="tel:{{ section.settings.phone | remove: ' ' }}">{{ section.settings.phone }}</a>
      <span>{{ shop.name }}</span>
    </div>
  {%- endif -%}
</footer>

{% schema %}
{
  "name": "Footer",
  "settings": [
    { "type": "textarea", "id": "cols", "label": "Columns (heading|links per line)", "default": ${js(str(v, "cols"))} },
    { "type": "text", "id": "phone", "label": "Phone", "default": ${js(str(v, "phone"))} }
  ],
  "presets": [{ "name": "Footer" }]
}
{% endschema %}`,
      css: `.gpl-footer { border-top: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.15); padding: 2rem 0 1.5rem; }
.gpl-footer__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr)); gap: 2rem; }
.gpl-footer__head { margin: 0 0 0.8rem; font-size: 0.62rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-footer__link { display: block; padding: 0.35rem 0; font-size: 0.78rem; text-decoration: none; color: inherit; }
.gpl-footer__link:hover { color: rgb(var(--color-button, 21 128 61)); }
.gpl-footer__contact { display: flex; justify-content: space-between; gap: 1rem; margin-top: 2rem; padding-top: 1.25rem; border-top: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.15); font-size: 0.72rem; }
.gpl-footer__contact a { font-weight: 700; text-decoration: none; color: inherit; }
.gpl-footer__contact span { color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
    }),
  },
  {
    id: "business-hours",
    name: "Store hours card",
    description: "'Open today 10am-7pm' - for stores with a physical location or phone support.",
    category: "Utility",
    kind: "snippet",
    controls: [
      { id: "hours", label: "Hours per line (day|hours)", type: "text", maxLength: 200 },
    ],
    defaults: { hours: "Mon-Fri|10am - 7pm\nSat|10am - 5pm\nSun|Closed" },
    install: snippetSteps("business-hours.liquid"),
    files: (v) => ({
      liquid: `<div class="gpl-hours2">
  <p class="gpl-hours2__title">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    Store hours
  </p>
  {%- assign rows = hours | newline_to_br | split: '<br />' -%}
  {%- for row in rows -%}
    {%- assign parts = row | strip | split: '|' -%}
    <p class="gpl-hours2__row"><span>{{ parts[0] | strip }}</span><span>{{ parts[1] | strip }}</span></p>
  {%- endfor -%}
</div>`,
      css: `.gpl-hours2 { margin: 0.75rem 0; font-size: 0.72rem; }
.gpl-hours2__title { display: flex; align-items: center; gap: 0.4rem; margin: 0 0 0.6rem; font-weight: 700; font-size: 0.75rem; }
.gpl-hours2__title svg { width: 0.9rem; height: 0.9rem; }
.gpl-hours2__row { display: flex; justify-content: space-between; margin: 0.25rem 0; color: rgb(var(--color-foreground, 100 116 139) / 0.85); }`,
      usage: `{% render 'business-hours', hours: ${js(str(v, "hours"))} %}`,
    }),
  },
  {
    id: "pickup-availability",
    name: "Buy online, pickup in store",
    description: "'Available for pickup at [location]' - BOPIS badge using Shopify's real pickup availability.",
    category: "Product page",
    kind: "snippet",
    controls: [],
    defaults: {},
    install: [
      ...snippetSteps("pickup-availability.liquid"),
      "Requires pickup enabled in Shopify admin (Settings > Locations) - shows real store stock.",
    ],
    files: () => ({
      liquid: `<div class="gpl-pickup">
  {%- assign pickup = product.selected_or_first_available_variant.store_availabilities | where: 'pick_up_enabled', true | first -%}
  {%- if pickup -%}
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
    <div>
      <p class="gpl-pickup__title">Pickup available at {{ pickup.location.name }}</p>
      <p class="gpl-pickup__sub">Usually ready in {{ pickup.pick_up_time }}</p>
    </div>
  {%- endif -%}
</div>`,
      css: `.gpl-pickup { display: flex; align-items: flex-start; gap: 0.6rem; margin: 0.75rem 0; }
.gpl-pickup svg { width: 1rem; height: 1rem; color: #16a34a; margin-top: 0.1rem; flex-shrink: 0; }
.gpl-pickup__title { margin: 0; font-size: 0.72rem; font-weight: 700; }
.gpl-pickup__sub { margin: 0.2rem 0 0; font-size: 0.62rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
      usage: `{% render 'pickup-availability', product: product %}`,
    }),
  },
  {
    id: "whatsapp-order-status",
    name: "Check order on WhatsApp",
    description: "'Track your order on WhatsApp' - opens a chat with the order number prefilled. India's preferred support channel.",
    category: "Utility",
    kind: "snippet",
    controls: [
      { id: "wa", label: "WhatsApp number", type: "text", maxLength: 15 },
      { id: "label", label: "Button label", type: "text", maxLength: 30 },
    ],
    defaults: { wa: "919876543210", label: "Check order on WhatsApp" },
    install: snippetSteps("whatsapp-order-status.liquid"),
    files: (v) => ({
      liquid: `{%- assign msg = 'Hi, checking on my order ' | append: order.name | default: '' | append: ' - ' | append: shop.name | url_encode -%}
<a class="gpl-waos" href="https://wa.me/{{ wa }}?text={{ msg }}" target="_blank" rel="noopener">
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35"/></svg>
  {{ label | default: 'Check on WhatsApp' }}
</a>`,
      css: `.gpl-waos {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.3rem;
  border-radius: 999px;
  border: 1px solid #25d366;
  color: #128c7e;
  font-size: 0.72rem;
  font-weight: 700;
  text-decoration: none;
}
.gpl-waos svg { width: 0.9rem; height: 0.9rem; }`,
      usage: `{% render 'whatsapp-order-status', order: order, wa: ${js(str(v, "wa"))}, label: ${js(str(v, "label"))} %}`,
    }),
  },
  {
    id: "cod-partial-advance",
    name: "COD partial advance note",
    description: "'Pay ₹200 now, rest on delivery' - the RTO-reduction trick Indian COD stores use.",
    category: "Cart & checkout",
    kind: "snippet",
    controls: [
      { id: "amount", label: "Advance amount", type: "text", maxLength: 10 },
      { id: "text", label: "Explanation", type: "text", maxLength: 80 },
    ],
    defaults: { amount: "₹200", text: "Pay a small advance online, rest on delivery - reduces fake orders" },
    install: [
      ...snippetSteps("cod-partial-advance.liquid"),
      "This is a display note - the actual split-payment setup happens in your payment provider, not the theme.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-codadv">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
  <div>
    <p class="gpl-codadv__title">COD with {{ amount | default: 'a small' }} advance</p>
    <p class="gpl-codadv__text">{{ text | default: '' }}</p>
  </div>
</div>`,
      css: `.gpl-codadv { display: flex; align-items: flex-start; gap: 0.6rem; margin: 0.75rem 0; padding: 0.8rem; border: 1px dashed rgb(var(--color-foreground, 148 163 184) / 0.3); border-radius: 9px; }
.gpl-codadv svg { width: 1rem; height: 1rem; margin-top: 0.1rem; flex-shrink: 0; }
.gpl-codadv__title { margin: 0; font-size: 0.72rem; font-weight: 700; }
.gpl-codadv__text { margin: 0.2rem 0 0; font-size: 0.62rem; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
      usage: `{% render 'cod-partial-advance', amount: ${js(str(v, "amount"))}, text: ${js(str(v, "text"))} %}`,
    }),
  },
  {
    id: "open-box-badge",
    name: "Open box delivery badge",
    description: "'Open box delivery - inspect before you pay' - the COD trust feature Indian shoppers actively look for.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "text", label: "Badge text", type: "text", maxLength: 60 },
    ],
    defaults: { text: "Open box delivery - check before you pay" },
    install: snippetSteps("open-box-badge.liquid"),
    files: (v) => ({
      liquid: `<p class="gpl-openbox">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
  {{ text | default: 'Open box delivery available' }}
</p>`,
      css: `.gpl-openbox { display: flex; align-items: center; gap: 0.45rem; margin: 0.5rem 0; font-size: 0.72rem; color: rgb(var(--color-foreground, 100 116 139) / 0.85); }
.gpl-openbox svg { width: 0.85rem; height: 0.85rem; color: rgb(var(--color-button, 21 128 61)); flex-shrink: 0; }`,
      usage: `{% render 'open-box-badge', text: ${js(str(v, "text"))} %}`,
    }),
  },
  {
    id: "gst-note",
    name: "GST included note",
    description: "'All prices include GST' - the transparency Indian buyers check before checkout.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "text", label: "Note text", type: "text", maxLength: 60 },
    ],
    defaults: { text: "All prices include GST" },
    install: snippetSteps("gst-note.liquid"),
    files: (v) => ({
      liquid: `<p class="gpl-gst">{{ text | default: 'All prices include GST' }}</p>`,
      css: `.gpl-gst { margin: 0.3rem 0; font-size: 0.65rem; color: rgb(var(--color-foreground, 100 116 139) / 0.7); }`,
      usage: `{% render 'gst-note', text: ${js(str(v, "text"))} %}`,
    }),
  },
  {
    id: "ship-zones-note",
    name: "Shipping coverage note",
    description: "'Ships across India / ships from [city]' - answers 'do they deliver here' before the question forms.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "text", label: "Coverage text", type: "text", maxLength: 60 },
      { id: "city", label: "Ships from (optional)", type: "text", maxLength: 30 },
    ],
    defaults: { text: "Ships across India", city: "Jaipur" },
    install: snippetSteps("ship-zones-note.liquid"),
    files: (v) => ({
      liquid: `<p class="gpl-ship2">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/></svg>
  {{ text | default: 'Ships across India' }}{%- if city != blank %} &middot; from {{ city }}{% endif %}
</p>`,
      css: `.gpl-ship2 { display: flex; align-items: center; gap: 0.45rem; margin: 0.4rem 0; font-size: 0.7rem; color: rgb(var(--color-foreground, 100 116 139) / 0.85); }
.gpl-ship2 svg { width: 0.85rem; height: 0.85rem; }`,
      usage: `{% render 'ship-zones-note', text: ${js(str(v, "text"))}, city: ${js(str(v, "city"))} %}`,
    }),
  },
  {
    id: "bulk-pricing-note",
    name: "Bulk pricing hint",
    description: "'20+ units? Contact for bulk pricing' - surfaces the B2B option on a retail PDP.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "qty", label: "Minimum qty", type: "text", maxLength: 5 },
      { id: "text", label: "Note text", type: "text", maxLength: 60 },
    ],
    defaults: { qty: "20", text: "units? Get bulk pricing" },
    install: snippetSteps("bulk-pricing-note.liquid"),
    files: (v) => ({
      liquid: `<a class="gpl-bulk2" href="/pages/contact?subject=bulk-{{ product.handle }}">
  Ordering {{ qty | default: '20' }}+ {{ text | default: 'units?' }} &rarr;
</a>`,
      css: `.gpl-bulk2 { display: inline-block; margin: 0.4rem 0; font-size: 0.68rem; font-weight: 700; color: rgb(var(--color-button, 21 128 61)); text-decoration: none; }
.gpl-bulk2:hover { text-decoration: underline; }`,
      usage: `{% render 'bulk-pricing-note', product: product, qty: ${js(str(v, "qty"))}, text: ${js(str(v, "text"))} %}`,
    }),
  },
  {
    id: "sample-request",
    name: "Order a sample button",
    description: "'Order a swatch/sample first' - the try-before-commit CTA for fabrics, materials and custom products.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "label", label: "Button label", type: "text", maxLength: 30 },
      { id: "price", label: "Sample price", type: "text", maxLength: 10 },
    ],
    defaults: { label: "Order a sample", price: "₹99" },
    install: [
      ...snippetSteps("sample-request.liquid"),
      "Create a sample product (hidden, cheap) and point this at it - converts hesitant buyers into testers.",
    ],
    files: (v) => ({
      liquid: `<a class="gpl-sample" href="/products/sample-{{ product.handle }}">
  {{ label | default: 'Order a sample' }} - {{ price | default: '' }}
</a>`,
      css: `.gpl-sample { display: inline-block; margin: 0.4rem 0; padding: 0.55rem 1.15rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3); border-radius: 999px; font-size: 0.72rem; font-weight: 700; text-decoration: none; color: inherit; }
.gpl-sample:hover { border-color: rgb(var(--color-button, 21 128 61)); color: rgb(var(--color-button, 21 128 61)); }`,
      usage: `{% render 'sample-request', product: product, label: ${js(str(v, "label"))}, price: ${js(str(v, "price"))} %}`,
    }),
  },
  {
    id: "emi-calculator",
    name: "EMI calculator",
    description: "Type a price, pick a tenure, see monthly amount - answers 'can I afford this' before checkout.",
    category: "Utility",
    kind: "snippet",
    controls: [
      { id: "price", label: "Default price (₹)", type: "text", maxLength: 8 },
      { id: "rate", label: "Interest rate % (0 for no-cost)", type: "text", maxLength: 5 },
    ],
    defaults: { price: "24990", rate: "0" },
    install: snippetSteps("emi-calculator.liquid"),
    files: (v) => ({
      liquid: `<gpl-emicalc class="gpl-emicalc" data-rate="{{ rate | default: 0 }}">
  <p class="gpl-emicalc__title">EMI calculator</p>
  <input type="number" class="gpl-emicalc__input" value="{{ price | default: 0 }}" data-price placeholder="Price">
  <div class="gpl-emicalc__terms">
    {%- for m in (3..12) -%}
      {%- if m == 3 or m == 6 or m == 9 or m == 12 -%}
        <button type="button" data-months="{{ m }}">{{ m }} mo</button>
      {%- endif -%}
    {%- endfor -%}
  </div>
  <p class="gpl-emicalc__result" data-result></p>
</gpl-emicalc>`,
      css: `.gpl-emicalc { margin: 0.75rem 0; padding: 0.9rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.2); border-radius: 10px; }
.gpl-emicalc__title { margin: 0 0 0.6rem; font-size: 0.75rem; font-weight: 800; }
.gpl-emicalc__input { width: 100%; padding: 0.55rem 0.7rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3); border-radius: 8px; font-size: 0.75rem; margin-bottom: 0.5rem; }
.gpl-emicalc__terms { display: flex; gap: 0.4rem; }
.gpl-emicalc__terms button { flex: 1; padding: 0.4rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.25); border-radius: 6px; background: none; font-size: 0.65rem; cursor: pointer; color: inherit; }
.gpl-emicalc__terms button.is-sel { background: rgb(var(--color-button, 15 23 42)); color: rgb(var(--color-button-text, 255 255 255)); border-color: transparent; }
.gpl-emicalc__result { margin: 0.6rem 0 0; font-size: 0.78rem; font-weight: 700; }`,
      js: `document.querySelectorAll('gpl-emicalc').forEach((el) => {
  const price = el.querySelector('[data-price]');
  const res = el.querySelector('[data-result]');
  const rate = Number(el.dataset.rate) / 100;
  el.querySelectorAll('[data-months]').forEach((btn) => {
    btn.addEventListener('click', () => {
      el.querySelectorAll('[data-months]').forEach((b) => b.classList.remove('is-sel'));
      btn.classList.add('is-sel');
      const p = Number(price.value);
      const n = Number(btn.dataset.months);
      const monthly = rate ? (p * rate / 12 * Math.pow(1 + rate / 12, n)) / (Math.pow(1 + rate / 12, n) - 1) : p / n;
      res.textContent = '₹' + Math.round(monthly).toLocaleString('en-IN') + '/month for ' + n + ' months';
    });
  });
});`,
      usage: `{% render 'emi-calculator', price: ${js(str(v, "price"))}, rate: ${js(str(v, "rate"))} %}`,
    }),
  },
  {
    id: "delivery-slot-picker",
    name: "Delivery time slot picker",
    description: "Choose a delivery window (morning/afternoon/evening) - saves to order attributes.",
    category: "Cart & checkout",
    kind: "snippet",
    controls: [],
    defaults: {},
    install: snippetSteps("delivery-slot-picker.liquid"),
    files: () => ({
      liquid: `<div class="gpl-slot">
  <label class="gpl-slot__label" for="gpl-slot-sel">Preferred delivery time</label>
  <select id="gpl-slot-sel" name="attributes[Delivery slot]" class="gpl-slot__sel">
    <option value="">Any time</option>
    <option>Morning (9am - 1pm)</option>
    <option>Afternoon (1pm - 5pm)</option>
    <option>Evening (5pm - 9pm)</option>
  </select>
</div>`,
      css: `.gpl-slot { margin: 1rem 0; }
.gpl-slot__label { display: block; font-size: 0.72rem; font-weight: 600; margin-bottom: 0.4rem; }
.gpl-slot__sel { width: 100%; padding: 0.6rem 0.8rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3); border-radius: 9px; background: transparent; font-size: 0.8rem; }`,
      usage: `{% render 'delivery-slot-picker' %}`,
    }),
  },
  {
    id: "checkout-trust-strip",
    name: "Checkout trust strip",
    description: "'Secure | Easy returns | COD available' - the three reassurance points buyers check before paying.",
    category: "Trust & social proof",
    kind: "snippet",
    controls: [],
    defaults: {},
    install: snippetSteps("checkout-trust-strip.liquid"),
    files: () => ({
      liquid: `<div class="gpl-ctstrip">
  <span class="gpl-ctstrip__item">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    Secure checkout
  </span>
  <span class="gpl-ctstrip__item">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
    Easy returns
  </span>
  <span class="gpl-ctstrip__item">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/></svg>
    COD available
  </span>
</div>`,
      css: `.gpl-ctstrip { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem 1.5rem; margin: 1rem 0; padding: 0.75rem 0; border-top: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.15); }
.gpl-ctstrip__item { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.65rem; color: rgb(var(--color-foreground, 100 116 139) / 0.8); }
.gpl-ctstrip__item svg { width: 0.8rem; height: 0.8rem; color: #16a34a; }`,
      usage: `{% render 'checkout-trust-strip' %}`,
    }),
  },
  {
    id: "language-selector",
    name: "Language dropdown",
    description: "Hindi / English / regional selector - connects to Shopify's language settings.",
    category: "Headers & navigation",
    kind: "snippet",
    controls: [
      { id: "langs", label: "Languages (comma separated)", type: "text", maxLength: 60 },
    ],
    defaults: { langs: "English, हिन्दी" },
    install: [
      ...snippetSteps("language-selector.liquid"),
      "Shopify handles real translations via Settings > Languages - this is a visual selector for that setting.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-lang">
  {%- assign ls = langs | split: ',' -%}
  <select class="gpl-lang__sel" aria-label="Language" onchange="document.documentElement.lang = this.value">
    {%- for l in ls -%}
      <option>{{ l | strip }}</option>
    {%- endfor -%}
  </select>
</div>`,
      css: `.gpl-lang { display: inline-block; }
.gpl-lang__sel { padding: 0.4rem 0.7rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.3); border-radius: 7px; background: transparent; font-size: 0.72rem; }`,
      usage: `{% render 'language-selector', langs: ${js(str(v, "langs"))} %}`,
    }),
  },
  {
    id: "live-chat-status",
    name: "Chat availability status",
    description: "'Chat: online / offline' - shows support availability instead of a dead widget that never answers.",
    category: "Utility",
    kind: "snippet",
    controls: [
      { id: "status", label: "Status", type: "select", options: [{ value: "online", label: "Online now" }, { value: "away", label: "Away - leave a message" }] },
      { id: "hours", label: "Hours note", type: "text", maxLength: 40 },
    ],
    defaults: { status: "online", hours: "10am - 7pm IST" },
    install: snippetSteps("live-chat-status.liquid"),
    files: (v) => ({
      liquid: `<div class="gpl-chat{% if status == 'online' %} gpl-chat--on{% endif %}">
  <span class="gpl-chat__dot"></span>
  <span class="gpl-chat__label">Support chat{% if status == 'online' %} - online{% else %} - away{% endif %}</span>
  {%- if hours != blank -%}
    <span class="gpl-chat__hours">{{ hours }}</span>
  {%- endif -%}
</div>`,
      css: `.gpl-chat { display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.45rem 0.9rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.25); border-radius: 999px; font-size: 0.68rem; }
.gpl-chat__dot { width: 0.5rem; height: 0.5rem; border-radius: 999px; background: #9ca3af; }
.gpl-chat--on .gpl-chat__dot { background: #16a34a; }
.gpl-chat__label { font-weight: 700; }
.gpl-chat__hours { color: rgb(var(--color-foreground, 100 116 139) / 0.75); }`,
      usage: `{% render 'live-chat-status', status: ${js(str(v, "status"))}, hours: ${js(str(v, "hours"))} %}`,
    }),
  },
  {
    id: "allergen-warning",
    name: "Allergen warning badge",
    description: "'Contains nuts / dairy / gluten' - the food safety detail that's legally important, not just helpful.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "items", label: "Allergens (comma separated)", type: "text", maxLength: 80 },
    ],
    defaults: { items: "nuts, dairy" },
    install: snippetSteps("allergen-warning.liquid"),
    files: (v) => ({
      liquid: `<div class="gpl-allergen">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
  <span>Contains: <b>{{ items | default: 'allergens' }}</b></span>
</div>`,
      css: `.gpl-allergen { display: flex; align-items: center; gap: 0.45rem; margin: 0.5rem 0; padding: 0.5rem 0.75rem; border-radius: 7px; background: rgb(245 158 11 / 0.1); font-size: 0.7rem; }
.gpl-allergen svg { width: 0.85rem; height: 0.85rem; color: #d97706; flex-shrink: 0; }
.gpl-allergen b { font-weight: 800; }`,
      usage: `{% render 'allergen-warning', items: ${js(str(v, "items"))} %}`,
    }),
  },
  {
    id: "expiry-note",
    name: "Best before / expiry note",
    description: "'Best before Dec 2025' - for food, skincare and anything with shelf life.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "date", label: "Expiry/best before", type: "text", maxLength: 30 },
    ],
    defaults: { date: "December 2025" },
    install: snippetSteps("expiry-note.liquid"),
    files: (v) => ({
      liquid: `<p class="gpl-expiry">Best before <b>{{ date | default: 'see label' }}</b></p>`,
      css: `.gpl-expiry { margin: 0.3rem 0; font-size: 0.68rem; color: rgb(var(--color-foreground, 100 116 139) / 0.8); }
.gpl-expiry b { font-weight: 700; }`,
      usage: `{% render 'expiry-note', date: ${js(str(v, "date"))} %}`,
    }),
  },
  {
    id: "fragrance-notes",
    name: "Fragrance notes pyramid",
    description: "Top / heart / base notes layout - the standard perfume description structure.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "top", label: "Top notes", type: "text", maxLength: 60 },
      { id: "heart", label: "Heart notes", type: "text", maxLength: 60 },
      { id: "base", label: "Base notes", type: "text", maxLength: 60 },
    ],
    defaults: { top: "Bergamot, pink pepper", heart: "Jasmine, rose", base: "Sandalwood, musk" },
    install: snippetSteps("fragrance-notes.liquid"),
    files: (v) => ({
      liquid: `<div class="gpl-frag">
  {%- assign tiers = 'Top|Heart|Base' | split: '|' -%}
  {%- assign vals = top | append: '|' | append: heart | append: '|' | append: base | split: '|' -%}
  {%- for t in tiers -%}
    <div class="gpl-frag__row">
      <span class="gpl-frag__label">{{ t }}</span>
      <span class="gpl-frag__val">{{ vals[forloop.index0] | default: '' }}</span>
    </div>
  {%- endfor -%}
</div>`,
      css: `.gpl-frag { margin: 0.75rem 0; }
.gpl-frag__row { display: flex; gap: 1rem; padding: 0.45rem 0; border-bottom: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.12); font-size: 0.72rem; }
.gpl-frag__row:last-child { border-bottom: 0; }
.gpl-frag__label { width: 3.5rem; font-size: 0.62rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: rgb(var(--color-foreground, 100 116 139) / 0.75); flex-shrink: 0; }
.gpl-frag__val { font-weight: 500; }`,
      usage: `{% render 'fragrance-notes', top: ${js(str(v, "top"))}, heart: ${js(str(v, "heart"))}, base: ${js(str(v, "base"))} %}`,
    }),
  },
  {
    id: "fabric-composition",
    name: "Fabric composition bar",
    description: "Visual split bar - '60% cotton, 40% linen' - shows material makeup at a glance.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "parts", label: "Materials (name|% per line)", type: "text", maxLength: 100 },
    ],
    defaults: { parts: "Cotton|60\nLinen|40" },
    install: snippetSteps("fabric-composition.liquid"),
    files: (v) => ({
      liquid: `<div class="gpl-fabcomp">
  <div class="gpl-fabcomp__bar">
    {%- assign rows = parts | newline_to_br | split: '<br />' -%}
    {%- assign i = 0 -%}
    {%- for row in rows -%}
      {%- assign parts2 = row | strip | split: '|' -%}
      <span class="gpl-fabcomp__seg" style="width: {{ parts2[1] | strip }}%; background: hsl({{ i | times: 60 }}, 60%, 70%)"></span>
      {%- assign i = i | plus: 1 -%}
    {%- endfor -%}
  </div>
  <div class="gpl-fabcomp__legend">
    {%- assign i = 0 -%}
    {%- for row in rows -%}
      {%- assign parts2 = row | strip | split: '|' -%}
      <span class="gpl-fabcomp__leg"><span class="gpl-fabcomp__dot" style="background: hsl({{ i | times: 60 }}, 60%, 70%)"></span>{{ parts2[0] | strip }} {{ parts2[1] | strip }}%</span>
      {%- assign i = i | plus: 1 -%}
    {%- endfor -%}
  </div>
</div>`,
      css: `.gpl-fabcomp { margin: 0.75rem 0; }
.gpl-fabcomp__bar { display: flex; height: 0.5rem; border-radius: 999px; overflow: hidden; }
.gpl-fabcomp__seg { height: 100%; }
.gpl-fabcomp__legend { display: flex; flex-wrap: wrap; gap: 0.5rem 1rem; margin-top: 0.5rem; }
.gpl-fabcomp__leg { display: inline-flex; align-items: center; gap: 0.3rem; font-size: 0.62rem; }
.gpl-fabcomp__dot { width: 0.5rem; height: 0.5rem; border-radius: 999px; flex-shrink: 0; }`,
      usage: `{% render 'fabric-composition', parts: ${js(str(v, "parts"))} %}`,
    }),
  },
  {
    id: "trending-searches",
    name: "Trending search terms",
    description: "'Trending: linen, oversized, black' chips - real search suggestions from what people actually type.",
    category: "Headers & navigation",
    kind: "snippet",
    controls: [
      { id: "terms", label: "Terms (comma separated)", type: "text", maxLength: 100 },
    ],
    defaults: { terms: "linen, oversized, black, cotton, sale" },
    install: [
      ...snippetSteps("trending-searches.liquid"),
      "Update from Shopify analytics - only 'trending' if your real search data says so.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-trend">
  <span class="gpl-trend__label">Trending</span>
  {%- assign ts = terms | split: ',' -%}
  {%- for t in ts -%}
    <a class="gpl-trend__term" href="{{ routes.search_url }}?q={{ t | strip | url_encode }}">{{ t | strip }}</a>
  {%- endfor -%}
</div>`,
      css: `.gpl-trend { display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem; margin: 0.6rem 0; }
.gpl-trend__label { font-size: 0.62rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-trend__term { padding: 0.3rem 0.75rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.25); border-radius: 999px; font-size: 0.65rem; text-decoration: none; color: inherit; }
.gpl-trend__term:hover { border-color: rgb(var(--color-button, 21 128 61)); }`,
      usage: `{% render 'trending-searches', terms: ${js(str(v, "terms"))} %}`,
    }),
  },
  {
    id: "no-results-suggestions",
    name: "Empty search suggestions",
    description: "When search returns nothing, show popular categories - recovers the dead-end search.",
    category: "Utility",
    kind: "snippet",
    controls: [
      { id: "links", label: "Suggested (label|url per line)", type: "text", maxLength: 200 },
    ],
    defaults: { links: "Bestsellers|/collections/bestsellers\nNew in|/collections/new\nSale|/collections/sale\nAll products|/collections/all" },
    install: [
      ...snippetSteps("no-results-suggestions.liquid"),
      "Render inside the 'no results' block on the search template.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-nores">
  <p class="gpl-nores__text">Nothing found - try these instead:</p>
  <div class="gpl-nores__links">
    {%- assign rows = links | newline_to_br | split: '<br />' -%}
    {%- for row in rows -%}
      {%- assign parts = row | strip | split: '|' -%}
      <a href="{{ parts[1] | strip | default: '#' }}">{{ parts[0] | strip }}</a>
    {%- endfor -%}
  </div>
</div>`,
      css: `.gpl-nores { padding: 2rem 0; text-align: center; }
.gpl-nores__text { margin: 0 0 1rem; font-size: 0.78rem; color: rgb(var(--color-foreground, 100 116 139) / 0.8); }
.gpl-nores__links { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.6rem; }
.gpl-nores__links a { padding: 0.5rem 1.1rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.25); border-radius: 999px; font-size: 0.72rem; font-weight: 600; text-decoration: none; color: inherit; }`,
      usage: `{% render 'no-results-suggestions', links: ${js(str(v, "links"))} %}`,
    }),
  },
  {
    id: "owner-reply",
    name: "Store owner reply",
    description: "'Store replied' card under a review - shows you actually respond, not just collect.",
    category: "Trust & social proof",
    kind: "snippet",
    controls: [
      { id: "text", label: "Reply text", type: "text", maxLength: 120 },
      { id: "name", label: "Store name", type: "text", maxLength: 30 },
    ],
    defaults: { text: "Thanks for the honest review - we're glad it worked for you!", name: "Store owner" },
    install: snippetSteps("owner-reply.liquid"),
    files: (v) => ({
      liquid: `<div class="gpl-reply">
  <p class="gpl-reply__badge">Response from {{ name | default: shop.name }}</p>
  <p class="gpl-reply__text">{{ text | default: '' }}</p>
</div>`,
      css: `.gpl-reply { margin: 0.5rem 0 0.75rem 1.25rem; padding: 0.7rem 0.9rem; border-left: 2px solid rgb(var(--color-button, 21 128 61)); background: rgb(var(--color-button, 21 128 61) / 0.05); border-radius: 0 8px 8px 0; }
.gpl-reply__badge { margin: 0 0 0.3rem; font-size: 0.62rem; font-weight: 800; color: rgb(var(--color-button, 21 128 61)); }
.gpl-reply__text { margin: 0; font-size: 0.72rem; line-height: 1.5; }`,
      usage: `{% render 'owner-reply', text: ${js(str(v, "text"))}, name: ${js(str(v, "name"))} %}`,
    }),
  },
  {
    id: "helpful-vote",
    name: "Was this helpful?",
    description: "Yes/no vote buttons on reviews - surfaces the actually-useful feedback.",
    category: "Trust & social proof",
    kind: "snippet",
    controls: [],
    defaults: {},
    install: snippetSteps("helpful-vote.liquid"),
    files: () => ({
      liquid: `<gpl-vote class="gpl-vote">
  <span class="gpl-vote__q">Was this helpful?</span>
  <button type="button" data-yes>Yes (<span data-yes-n>0</span>)</button>
  <button type="button" data-no>No (<span data-no-n>0</span>)</button>
</gpl-vote>`,
      css: `.gpl-vote { display: flex; align-items: center; gap: 0.6rem; margin-top: 0.5rem; font-size: 0.62rem; }
.gpl-vote__q { color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-vote button { padding: 0.2rem 0.6rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.25); border-radius: 999px; background: none; font-size: 0.6rem; cursor: pointer; color: inherit; }
.gpl-vote button.is-sel { border-color: rgb(var(--color-button, 21 128 61)); color: rgb(var(--color-button, 21 128 61)); }`,
      js: `document.querySelectorAll('gpl-vote').forEach((el) => {
  el.querySelector('[data-yes]').addEventListener('click', function () {
    el.querySelector('[data-yes-n]').textContent = Number(el.querySelector('[data-yes-n]').textContent) + 1;
    this.classList.add('is-sel');
    el.querySelector('[data-no]').disabled = true;
  });
  el.querySelector('[data-no]').addEventListener('click', function () {
    el.querySelector('[data-no-n]').textContent = Number(el.querySelector('[data-no-n]').textContent) + 1;
    this.classList.add('is-sel');
    el.querySelector('[data-yes]').disabled = true;
  });
});`,
      usage: `{% render 'helpful-vote' %}`,
    }),
  },
  {
    id: "verified-badge",
    name: "Verified buyer chip",
    description: "'Verified purchase' chip on reviews - the credibility mark that makes reviews count.",
    category: "Trust & social proof",
    kind: "snippet",
    controls: [],
    defaults: {},
    install: snippetSteps("verified-badge.liquid"),
    files: () => ({
      liquid: `<span class="gpl-verified">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
  Verified buyer
</span>`,
      css: `.gpl-verified { display: inline-flex; align-items: center; gap: 0.3rem; padding: 0.2rem 0.6rem; border-radius: 999px; background: rgb(var(--color-button, 21 128 61) / 0.1); font-size: 0.58rem; font-weight: 800; color: rgb(var(--color-button, 21 128 61)); }
.gpl-verified svg { width: 0.65rem; height: 0.65rem; }`,
      usage: `{% render 'verified-badge' %}`,
    }),
  },
  {
    id: "limited-edition",
    name: "Limited edition number",
    description: "'#24 of 500' - numbered editions create real scarcity for drops and collectibles.",
    category: "Product page",
    kind: "snippet",
    controls: [
      { id: "num", label: "This unit #", type: "text", maxLength: 4 },
      { id: "total", label: "Total run", type: "text", maxLength: 5 },
    ],
    defaults: { num: "24", total: "500" },
    install: [
      ...snippetSteps("limited-edition.liquid"),
      "Update the number per unit/batch - a real numbered run, not a marketing lie.",
    ],
    files: (v) => ({
      liquid: `<p class="gpl-limited">#{{ num | default: '1' }} <span class="gpl-limited__of">of</span> {{ total | default: '500' }} <span class="gpl-limited__tag">limited edition</span></p>`,
      css: `.gpl-limited { display: inline-flex; align-items: baseline; gap: 0.3rem; margin: 0.4rem 0; font-size: 0.8rem; font-weight: 800; }
.gpl-limited__of { font-size: 0.62rem; font-weight: 400; color: rgb(var(--color-foreground, 100 116 139) / 0.75); }
.gpl-limited__tag { margin-left: 0.4rem; padding: 0.15rem 0.5rem; border-radius: 999px; background: rgb(var(--color-button, 245 158 11) / 0.15); font-size: 0.55rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #b45309; }`,
      usage: `{% render 'limited-edition', num: ${js(str(v, "num"))}, total: ${js(str(v, "total"))} %}`,
    }),
  },
  {
    id: "festival-banner",
    name: "Festival sale banner",
    description: "Diwali/Holi/seasonal banner - the recurring sale hook Indian shoppers expect.",
    category: "Marketing",
    kind: "snippet",
    controls: [
      { id: "festival", label: "Festival name", type: "text", maxLength: 30 },
      { id: "offer", label: "Offer", type: "text", maxLength: 50 },
      { id: "emoji", label: "Emoji", type: "text", maxLength: 4 },
    ],
    defaults: { festival: "Diwali", offer: "up to 30% off + free gift wrap", emoji: "🪔" },
    install: snippetSteps("festival-banner.liquid"),
    files: (v) => ({
      liquid: `<a class="gpl-fest" href="{{ routes.collections_url }}/sale">
  {{ emoji | default: '' }} {{ festival | default: 'Festival' }} Sale - {{ offer | default: 'special offers' }}
</a>`,
      css: `.gpl-fest { display: block; margin: 0.5rem 0; padding: 0.75rem 1rem; border-radius: 10px; background: linear-gradient(90deg, rgb(var(--color-button, 217 119 6) / 0.1), rgb(var(--color-button, 217 119 6) / 0.04)); border: 1px solid rgb(var(--color-button, 217 119 6) / 0.2); font-size: 0.75rem; font-weight: 700; text-decoration: none; color: inherit; text-align: center; }`,
      usage: `{% render 'festival-banner', festival: ${js(str(v, "festival"))}, offer: ${js(str(v, "offer"))}, emoji: ${js(str(v, "emoji"))} %}`,
    }),
  },
  {
    id: "social-unlock",
    name: "Share to unlock discount",
    description: "'Share on IG to unlock 10%' - gated discount that trades a coupon for organic reach.",
    category: "Marketing",
    kind: "snippet",
    controls: [
      { id: "offer", label: "Reward", type: "text", maxLength: 40 },
      { id: "code", label: "Discount code", type: "text", maxLength: 20 },
    ],
    defaults: { offer: "10% off your next order", code: "SHARE10" },
    install: [
      ...snippetSteps("social-unlock.liquid"),
      "Honour-based: they share, you reveal the code. Some share honestly, some don't - still converts.",
    ],
    files: (v) => ({
      liquid: `<gpl-unlock class="gpl-unlock">
  <p class="gpl-unlock__text">Share us on Instagram to unlock <b>{{ offer | default: 'a discount' }}</b></p>
  <a class="gpl-unlock__share" href="https://instagram.com" target="_blank" rel="noopener">Share on Instagram</a>
  <div class="gpl-unlock__code" hidden data-code>
    <p>Your code:</p>
    <code>{{ code | default: 'CODE' }}</code>
  </div>
</gpl-unlock>`,
      css: `.gpl-unlock { margin: 1rem 0; padding: 1rem; border: 1px dashed rgb(var(--color-foreground, 148 163 184) / 0.3); border-radius: 10px; }
.gpl-unlock__text { margin: 0; font-size: 0.75rem; }
.gpl-unlock__share { display: inline-block; margin-top: 0.6rem; padding: 0.5rem 1.1rem; border-radius: 999px; background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); color: #fff; font-size: 0.7rem; font-weight: 700; text-decoration: none; }
.gpl-unlock__code { margin-top: 0.8rem; padding-top: 0.8rem; border-top: 1px dashed rgb(var(--color-foreground, 148 163 184) / 0.3); }
.gpl-unlock__code p { margin: 0 0 0.3rem; font-size: 0.62rem; }
.gpl-unlock__code code { padding: 0.3rem 0.7rem; border-radius: 6px; background: rgb(var(--color-foreground, 15 23 42) / 0.05); font-size: 0.8rem; font-weight: 800; letter-spacing: 0.08em; }`,
      js: `document.querySelectorAll('gpl-unlock').forEach((el) => {
  el.querySelector('.gpl-unlock__share').addEventListener('click', () => {
    setTimeout(() => { el.querySelector('[data-code]').hidden = false; }, 1500);
  });
});`,
      usage: `{% render 'social-unlock', offer: ${js(str(v, "offer"))}, code: ${js(str(v, "code"))} %}`,
    }),
  },
  {
    id: "cart-drawer",
    name: "Slide-out cart drawer",
    description: "The flagship replacement for paid cart-drawer apps - free-shipping bar, qty controls, remove, subtotal and an optional upsell card. Intercepts the add-to-cart form and opens automatically.",
    category: "Cart & checkout",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 30 },
      { id: "threshold", label: "Free shipping threshold (rupees, 0 = off)", type: "text", maxLength: 8 },
      { id: "upsell", label: "Upsell product handle", type: "text", maxLength: 60 },
      { id: "floating", label: "Show floating cart button", type: "toggle" },
      { id: "hijack", label: "Open drawer on add-to-cart", type: "toggle" },
    ],
    defaults: { heading: "Your cart", threshold: "999", upsell: "", floating: true, hijack: true },
    install: [
      ...sectionSteps,
      "Best placement: add the section to the Header group or every template so the drawer is available site-wide.",
      "To trigger it from your theme's own cart icon instead of the floating button, turn off the floating button and add data-gpl-cart-open to your header cart link.",
    ],
    files: (v) => ({
      liquid: `<gpl-cart class="gpl-cart" data-threshold="{{ section.settings.threshold | times: 100 }}" data-hijack="{{ section.settings.hijack }}">
  {%- if section.settings.floating -%}
    <button type="button" class="gpl-cart__trigger" data-open aria-label="Open cart">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      <span class="gpl-cart__count" data-count>0</span>
    </button>
  {%- endif -%}
  <div class="gpl-cart__overlay" data-close hidden></div>
  <aside class="gpl-cart__drawer" data-drawer aria-hidden="true" aria-label="{{ section.settings.heading | escape }}">
    <header class="gpl-cart__head">
      <p class="gpl-cart__title">{{ section.settings.heading | default: 'Your cart' }} <span data-count>0</span></p>
      <button type="button" class="gpl-cart__x" data-close aria-label="Close">&times;</button>
    </header>
    <div class="gpl-cart__ship" data-ship hidden>
      <p class="gpl-cart__shiptext" data-ship-text></p>
      <div class="gpl-cart__bar"><span data-ship-fill></span></div>
    </div>
    <div class="gpl-cart__items" data-items><p class="gpl-cart__empty">Your cart is empty.</p></div>
    {%- if section.settings.upsell != blank -%}
      {%- assign u = all_products[section.settings.upsell] -%}
      {%- if u -%}
        <div class="gpl-cart__upsell">
          {%- if u.featured_image -%}<img src="{{ u.featured_image | image_url: width: 80 }}" alt="{{ u.title | escape }}" width="80" height="80" loading="lazy">{%- endif -%}
          <div class="gpl-cart__uinfo">
            <p>{{ u.title }}</p>
            <span>{{ u.price | money }}</span>
          </div>
          <button type="button" class="gpl-cart__uadd" data-add-variant="{{ u.selected_or_first_available_variant.id }}">Add</button>
        </div>
      {%- endif -%}
    {%- endif -%}
    <footer class="gpl-cart__foot">
      <p class="gpl-cart__sub"><span>Subtotal</span><b data-subtotal></b></p>
      <a class="gpl-cart__checkout" href="{{ routes.cart_url }}">Checkout</a>
    </footer>
  </aside>
</gpl-cart>

{% schema %}
{
  "name": "Cart drawer",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading", 30))} },
    { "type": "number", "id": "threshold", "label": "Free shipping threshold (rupees, 0 disables the bar)", "default": ${Number(v.threshold) || 0} },
    { "type": "text", "id": "upsell", "label": "Upsell product handle" },
    { "type": "checkbox", "id": "floating", "label": "Show floating cart button", "default": true },
    { "type": "checkbox", "id": "hijack", "label": "Open drawer when shoppers add to cart", "default": true }
  ],
  "presets": [{ "name": "Cart drawer" }]
}
{% endschema %}`,
      css: `.gpl-cart__trigger {
  position: fixed; right: 1.25rem; bottom: 1.25rem; z-index: 80;
  display: flex; align-items: center; gap: 0.4rem;
  padding: 0.8rem 1rem; border: 0; border-radius: 999px;
  background: rgb(var(--color-button, 15 23 42)); color: rgb(var(--color-button-text, 255 255 255));
  font-weight: 700; cursor: pointer; box-shadow: 0 10px 30px rgba(0,0,0,0.25);
}
.gpl-cart__trigger svg { width: 1.1rem; height: 1.1rem; }
.gpl-cart__overlay { position: fixed; inset: 0; z-index: 88; background: rgba(0,0,0,0.45); }
.gpl-cart__drawer {
  position: fixed; top: 0; right: 0; z-index: 90;
  width: min(24rem, 92vw); height: 100dvh;
  display: flex; flex-direction: column;
  background: rgb(var(--color-background, 255 255 255)); color: inherit;
  transform: translateX(100%); transition: transform 0.28s ease;
  box-shadow: -10px 0 40px rgba(0,0,0,0.2);
}
.gpl-cart.is-open .gpl-cart__drawer { transform: none; }
.gpl-cart__head { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.1rem; border-bottom: 1px solid rgba(148,163,184,0.25); }
.gpl-cart__title { margin: 0; font-size: 0.95rem; font-weight: 800; }
.gpl-cart__x { border: 0; background: none; font-size: 1.4rem; cursor: pointer; line-height: 1; }
.gpl-cart__ship { padding: 0.8rem 1.1rem; border-bottom: 1px solid rgba(148,163,184,0.15); }
.gpl-cart__shiptext { margin: 0 0 0.45rem; font-size: 0.7rem; font-weight: 600; }
.gpl-cart__bar { height: 5px; border-radius: 999px; background: rgba(148,163,184,0.3); overflow: hidden; }
.gpl-cart__bar span { display: block; height: 100%; background: #16a34a; transition: width 0.3s; }
.gpl-cart__items { flex: 1; overflow-y: auto; padding: 0.75rem 1.1rem; }
.gpl-cart__empty { margin: 2rem 0; text-align: center; font-size: 0.8rem; color: #94a3b8; }
.gpl-cart__row { display: flex; gap: 0.7rem; padding: 0.6rem 0; border-bottom: 1px solid rgba(148,163,184,0.15); }
.gpl-cart__row img { width: 3.5rem; height: 3.5rem; object-fit: cover; border-radius: 8px; }
.gpl-cart__rinfo { flex: 1; font-size: 0.72rem; }
.gpl-cart__rname { margin: 0 0 0.2rem; font-weight: 700; }
.gpl-cart__rprice { color: #64748b; }
.gpl-cart__qty { display: inline-flex; align-items: center; gap: 0.5rem; margin-top: 0.4rem; border: 1px solid rgba(148,163,184,0.35); border-radius: 8px; }
.gpl-cart__qty button { border: 0; background: none; padding: 0.3rem 0.6rem; cursor: pointer; font-size: 0.9rem; }
.gpl-cart__rm { border: 0; background: none; color: #94a3b8; cursor: pointer; font-size: 0.95rem; align-self: flex-start; }
.gpl-cart__upsell { display: flex; align-items: center; gap: 0.6rem; margin: 0 1.1rem; padding: 0.7rem; border: 1px dashed rgba(148,163,184,0.45); border-radius: 10px; font-size: 0.7rem; }
.gpl-cart__upsell img { width: 2.6rem; height: 2.6rem; object-fit: cover; border-radius: 6px; }
.gpl-cart__uinfo p { margin: 0; font-weight: 700; } .gpl-cart__uinfo span { color: #64748b; }
.gpl-cart__uadd { margin-left: auto; border: 0; border-radius: 999px; background: rgb(var(--color-button, 15 23 42)); color: rgb(var(--color-button-text, 255 255 255)); padding: 0.4rem 0.9rem; font-size: 0.68rem; font-weight: 700; cursor: pointer; }
.gpl-cart__foot { padding: 1rem 1.1rem; border-top: 1px solid rgba(148,163,184,0.25); }
.gpl-cart__sub { display: flex; justify-content: space-between; margin: 0 0 0.8rem; font-size: 0.85rem; }
.gpl-cart__checkout { display: block; padding: 0.85rem; border-radius: var(--buttons-radius, 10px); background: rgb(var(--color-button, 15 23 42)); color: rgb(var(--color-button-text, 255 255 255)); text-align: center; font-weight: 800; text-decoration: none; }`,
      js: `class GplCart extends HTMLElement {
  connectedCallback() {
    this.threshold = Number(this.dataset.threshold) || 0;
    this.drawer = this.querySelector('[data-drawer]');
    this.overlay = this.querySelector('.gpl-cart__overlay');
    this.querySelectorAll('[data-open]').forEach((b) => b.addEventListener('click', () => this.open()));
    this.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => this.close()));
    this.overlay.addEventListener('click', () => this.close());
    this.querySelector('[data-add-variant]')?.addEventListener('click', (e) => this.addVariant(Number(e.currentTarget.dataset.addVariant)));
    if (this.dataset.hijack === 'true') {
      document.addEventListener('submit', (e) => this.onSubmit(e), true);
      document.addEventListener('click', (e) => { const t = e.target.closest('[data-gpl-cart-open]'); if (t) { e.preventDefault(); this.open(); } });
    }
    this.refresh();
  }
  money(c) { return (window.Shopify && Shopify.formatMoney) ? Shopify.formatMoney(c) : (c / 100).toFixed(2); }
  open() { this.classList.add('is-open'); this.drawer.setAttribute('aria-hidden', 'false'); this.overlay.hidden = false; document.documentElement.style.overflow = 'hidden'; this.refresh(); }
  close() { this.classList.remove('is-open'); this.drawer.setAttribute('aria-hidden', 'true'); this.overlay.hidden = true; document.documentElement.style.overflow = ''; }
  onSubmit(e) {
    const form = e.target;
    if (!(form instanceof HTMLFormElement) || !String(form.action).includes('/cart/add')) return;
    e.preventDefault();
    const data = new FormData(form);
    const id = data.get('id');
    if (!id) { form.submit(); return; }
    const properties = {};
    for (const [k, val] of data.entries()) { const m = k.match(/^properties\\[(.+)\\]$/); if (m && val) properties[m[1]] = val; }
    fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: [{ id: Number(id), quantity: Number(data.get('quantity')) || 1, properties }] }) })
      .then(() => { this.refresh(); this.open(); })
      .catch(() => form.submit());
  }
  addVariant(vid) { fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: [{ id: vid, quantity: 1 }] }) }).then(() => this.refresh()); }
  setQty(key, qty) { fetch('/cart/change.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: key, quantity: qty }) }).then((r) => r.json()).then((c) => this.render(c)); }
  refresh() { fetch('/cart.js').then((r) => r.json()).then((c) => this.render(c)); }
  render(cart) {
    this.querySelectorAll('[data-count]').forEach((el) => { el.textContent = cart.item_count; });
    const box = this.querySelector('[data-items]');
    if (!cart.items.length) { box.innerHTML = '<p class="gpl-cart__empty">Your cart is empty.</p>'; }
    else {
      box.innerHTML = '';
      cart.items.forEach((it) => {
        const row = document.createElement('div');
        row.className = 'gpl-cart__row';
        row.innerHTML =
          (it.image ? '<img src="' + it.image + '" alt="" loading="lazy">' : '<div></div>') +
          '<div class="gpl-cart__rinfo"><p class="gpl-cart__rname">' + it.product_title + '</p><span class="gpl-cart__rprice">' + this.money(it.final_line_price) + '</span>' +
          '<span class="gpl-cart__qty"><button type="button" data-dec>-</button><b>' + it.quantity + '</b><button type="button" data-inc>+</button></span></div>' +
          '<button type="button" class="gpl-cart__rm" aria-label="Remove">&times;</button>';
        row.querySelector('[data-dec]').addEventListener('click', () => this.setQty(it.key, it.quantity - 1));
        row.querySelector('[data-inc]').addEventListener('click', () => this.setQty(it.key, it.quantity + 1));
        row.querySelector('.gpl-cart__rm').addEventListener('click', () => this.setQty(it.key, 0));
        box.appendChild(row);
      });
    }
    this.querySelector('[data-subtotal]').textContent = this.money(cart.total_price);
    const ship = this.querySelector('[data-ship]');
    if (this.threshold > 0) {
      ship.hidden = false;
      const left = Math.max(0, this.threshold - cart.total_price);
      this.querySelector('[data-ship-text]').textContent = left > 0 ? 'You are ' + this.money(left) + ' away from free shipping' : 'You unlocked free shipping!';
      this.querySelector('[data-ship-fill]').style.width = Math.min(100, Math.round((cart.total_price / this.threshold) * 100)) + '%';
    } else ship.hidden = true;
  }
}
if (!customElements.get('gpl-cart')) customElements.define('gpl-cart', GplCart);`,
    }),
  },
  {
    id: "wishlist-page",
    name: "Wishlist page",
    description: "A full wishlist page that displays products saved by the Wishlist heart button - fetched live, add-to-cart and remove included. Pair it with wishlist-button for a complete no-app wishlist.",
    category: "Content",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 40 },
      { id: "empty", label: "Empty message", type: "text", maxLength: 80 },
    ],
    defaults: { heading: "My wishlist", empty: "Nothing saved yet - tap the heart on any product." },
    install: [
      ...sectionSteps,
      "Create a Page (Online Store > Pages), assign it to a template, add this section, then link the page in your navigation as 'Wishlist'.",
      "Pair with the wishlist-button snippet on product pages - they share the same saved list.",
    ],
    files: (v) => ({
      liquid: `<gpl-wishlist class="gpl-wlist" data-empty="{{ section.settings.empty | escape }}">
  <h2 class="gpl-wlist__heading">{{ section.settings.heading | default: 'My wishlist' }}</h2>
  <div class="gpl-wlist__grid" data-grid><p class="gpl-wlist__loading">Loading saved items…</p></div>
</gpl-wishlist>

{% schema %}
{
  "name": "Wishlist page",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading", 40))} },
    { "type": "text", "id": "empty", "label": "Empty message", "default": ${js(str(v, "empty", 80))} }
  ],
  "presets": [{ "name": "Wishlist page" }]
}
{% endschema %}`,
      css: `.gpl-wlist { display: block; padding: 1.5rem 0; }
.gpl-wlist__heading { margin: 0 0 1.25rem; font-size: 1.4rem; font-weight: 800; }
.gpl-wlist__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
@media (max-width: 900px) { .gpl-wlist__grid { grid-template-columns: repeat(2, 1fr); } }
.gpl-wlist__loading, .gpl-wlist__empty { grid-column: 1 / -1; margin: 3rem 0; text-align: center; font-size: 0.85rem; color: #94a3b8; }
.gpl-wlist__card { position: relative; border: 1px solid rgba(148,163,184,0.3); border-radius: 12px; overflow: hidden; }
.gpl-wlist__img { display: block; width: 100%; aspect-ratio: 1; object-fit: cover; }
.gpl-wlist__info { padding: 0.7rem 0.8rem; }
.gpl-wlist__name { margin: 0; font-size: 0.75rem; font-weight: 700; text-decoration: none; color: inherit; display: block; }
.gpl-wlist__price { margin: 0.25rem 0 0.6rem; font-size: 0.72rem; color: #64748b; }
.gpl-wlist__add { width: 100%; border: 0; border-radius: 8px; padding: 0.55rem; background: rgb(var(--color-button, 15 23 42)); color: rgb(var(--color-button-text, 255 255 255)); font-size: 0.68rem; font-weight: 700; cursor: pointer; }
.gpl-wlist__rm { position: absolute; top: 0.5rem; right: 0.5rem; width: 1.8rem; height: 1.8rem; border: 0; border-radius: 999px; background: rgba(255,255,255,0.9); cursor: pointer; font-size: 0.9rem; line-height: 1; }`,
      js: `class GplWishlist extends HTMLElement {
  connectedCallback() {
    const KEY = 'gpl-wishlist';
    const grid = this.querySelector('[data-grid]');
    const handles = JSON.parse(localStorage.getItem(KEY) || '[]');
    const money = (c) => (window.Shopify && Shopify.formatMoney) ? Shopify.formatMoney(c) : (c / 100).toFixed(2);
    if (!handles.length) { grid.innerHTML = '<p class="gpl-wlist__empty">' + this.dataset.empty + '</p>'; return; }
    Promise.all(handles.map((h) => fetch('/products/' + h + '.js').then((r) => (r.ok ? r.json() : null)).catch(() => null)))
      .then((products) => {
        grid.innerHTML = '';
        const real = products.filter(Boolean);
        if (!real.length) { grid.innerHTML = '<p class="gpl-wlist__empty">' + this.dataset.empty + '</p>'; return; }
        real.forEach((p) => {
          const card = document.createElement('div');
          card.className = 'gpl-wlist__card';
          const vid = p.variants && p.variants.length ? p.variants[0].id : 0;
          card.innerHTML =
            '<button type="button" class="gpl-wlist__rm" aria-label="Remove">&times;</button>' +
            (p.featured_image ? '<img class="gpl-wlist__img" src="' + p.featured_image + '" alt="" loading="lazy">' : '') +
            '<div class="gpl-wlist__info"><a class="gpl-wlist__name" href="' + p.url + '">' + p.title + '</a>' +
            '<p class="gpl-wlist__price">' + money(p.price) + '</p>' +
            '<button type="button" class="gpl-wlist__add">Add to cart</button></div>';
          card.querySelector('.gpl-wlist__rm').addEventListener('click', () => {
            const l = JSON.parse(localStorage.getItem(KEY) || '[]').filter((h) => h !== p.handle);
            localStorage.setItem(KEY, JSON.stringify(l));
            card.remove();
            if (!grid.children.length) grid.innerHTML = '<p class="gpl-wlist__empty">' + this.dataset.empty + '</p>';
          });
          card.querySelector('.gpl-wlist__add').addEventListener('click', () => {
            fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: [{ id: vid, quantity: 1 }] }) })
              .then(() => { window.location.href = '/cart'; });
          });
          grid.appendChild(card);
        });
      });
  }
}
if (!customElements.get('gpl-wishlist')) customElements.define('gpl-wishlist', GplWishlist);`,
    }),
  },
  {
    id: "scratch-card",
    name: "Scratch card popup",
    description: "The viral gamified popup - shoppers scratch a foil layer on a real canvas to reveal their coupon code. Session-gated, dismissible, huge email-list and conversion numbers.",
    category: "Marketing",
    kind: "section",
    controls: [
      { id: "title", label: "Title", type: "text", maxLength: 40 },
      { id: "code", label: "Coupon code", type: "text", maxLength: 20 },
      { id: "foil", label: "Foil colour", type: "color" },
      { id: "delay", label: "Delay (seconds)", type: "select", options: [{ value: "1", label: "1" }, { value: "3", label: "3" }, { value: "8", label: "8" }] },
    ],
    defaults: { title: "Scratch & win", code: "LUCKY15", foil: "#8b96a5", delay: "3" },
    install: [
      ...sectionSteps,
      "Create a real discount in Shopify admin first - the popup only reveals it, Shopify applies it at checkout.",
      "Add once per page. It remembers scratched visitors via localStorage.",
    ],
    files: (v) => ({
      liquid: `<gpl-scratch class="gpl-scratch" data-delay="{{ section.settings.delay }}" data-key="gpl-scratch-{{ section.id }}" data-foil="{{ section.settings.foil }}" hidden>
  <div class="gpl-scratch__box" role="dialog" aria-modal="true" aria-label="{{ section.settings.title | escape }}">
    <button type="button" class="gpl-scratch__x" data-close aria-label="Close">&times;</button>
    <h2 class="gpl-scratch__title">{{ section.settings.title | default: 'Scratch & win' }}</h2>
    <div class="gpl-scratch__area">
      <code class="gpl-scratch__code">{{ section.settings.code | default: 'LUCKY15' }}</code>
      <canvas class="gpl-scratch__foil" data-foil></canvas>
    </div>
    <p class="gpl-scratch__hint" data-hint>Scratch the card to reveal your code</p>
  </div>
</gpl-scratch>

{% schema %}
{
  "name": "Scratch card popup",
  "settings": [
    { "type": "text", "id": "title", "label": "Title", "default": ${js(str(v, "title", 40))} },
    { "type": "text", "id": "code", "label": "Coupon code", "default": ${js(str(v, "code", 20))} },
    { "type": "color", "id": "foil", "label": "Foil colour", "default": ${js(str(v, "foil"))} },
    { "type": "range", "id": "delay", "label": "Delay in seconds", "min": 1, "max": 30, "step": 1, "default": ${Number(v.delay) || 3} }
  ],
  "presets": [{ "name": "Scratch card popup" }]
}
{% endschema %}`,
      css: `.gpl-scratch { position: fixed; inset: 0; z-index: 90; display: flex; align-items: center; justify-content: center; padding: 1.5rem; background: rgba(0,0,0,0.55); }
.gpl-scratch[hidden] { display: none; }
.gpl-scratch__box { position: relative; width: min(24rem, 100%); padding: 2rem 1.5rem; border-radius: 16px; background: #fff; text-align: center; box-shadow: 0 24px 60px rgba(0,0,0,0.35); }
.gpl-scratch__x { position: absolute; top: 0.6rem; right: 0.75rem; border: 0; background: none; font-size: 1.5rem; cursor: pointer; color: #94a3b8; }
.gpl-scratch__title { margin: 0 0 1rem; font-size: 1.35rem; font-weight: 800; }
.gpl-scratch__area { position: relative; border-radius: 12px; overflow: hidden; }
.gpl-scratch__code { display: block; padding: 1.6rem 0.5rem; font-size: 1.5rem; font-weight: 800; letter-spacing: 0.12em; color: #0f172a; }
.gpl-scratch__foil { position: absolute; inset: 0; width: 100%; height: 100%; cursor: grab; touch-action: none; }
.gpl-scratch__foil.is-done { pointer-events: none; opacity: 0; transition: opacity 0.4s; }
.gpl-scratch__hint { margin: 0.9rem 0 0; font-size: 0.7rem; color: #94a3b8; }`,
      js: `class GplScratch extends HTMLElement {
  connectedCallback() {
    if (localStorage.getItem(this.dataset.key) === 'done') return;
    this.querySelector('[data-close]').addEventListener('click', () => this.dismiss());
    this.addEventListener('click', (e) => { if (e.target === this) this.dismiss(); });
    this.timer = setTimeout(() => { this.hidden = false; this.paint(); }, Number(this.dataset.delay) * 1000 || 3000);
  }
  dismiss() { clearTimeout(this.timer); this.hidden = true; localStorage.setItem(this.dataset.key, 'done'); }
  paint() {
    const canvas = this.querySelector('[data-foil]');
    const area = canvas.parentElement;
    canvas.width = area.clientWidth; canvas.height = area.clientHeight;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = this.dataset.foil || '#8b96a5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.font = '600 13px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH HERE', canvas.width / 2, canvas.height / 2 + 4);
    let scratching = false;
    const scratch = (e) => {
      const r = canvas.getBoundingClientRect();
      const x = (e.clientX - r.left), y = (e.clientY - r.top);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath(); ctx.arc(x, y, 18, 0, Math.PI * 2); ctx.fill();
    };
    canvas.addEventListener('pointerdown', (e) => { scratching = true; canvas.setPointerCapture(e.pointerId); scratch(e); });
    canvas.addEventListener('pointermove', (e) => { if (scratching) { scratch(e); this.check(ctx, canvas); } });
    canvas.addEventListener('pointerup', () => { scratching = false; });
    this.check = (ctx2, cv) => {
      if (canvas.classList.contains('is-done')) return;
      if (this.pokes === undefined) this.pokes = 0;
      this.pokes++;
      if (this.pokes % 15 !== 0) return;
      const d = ctx2.getImageData(0, 0, cv.width, cv.height).data;
      let clear = 0;
      for (let i = 3; i < d.length; i += 16) if (d[i] < 40) clear++;
      if (clear / (d.length / 16) > 0.45) {
        canvas.classList.add('is-done');
        this.querySelector('[data-hint]').textContent = 'Use the code at checkout';
        localStorage.setItem(this.dataset.key, 'done');
      }
    };
  }
}
if (!customElements.get('gpl-scratch')) customElements.define('gpl-scratch', GplScratch);`,
    }),
  },
  {
    id: "buy-box-booster",
    name: "Buy box conversion blocks",
    description: "A stackable conversion kit for the buy area - reorderable blocks: trust points, stock status, delivery estimate, guarantee and payment icons in one section.",
    category: "Product page",
    kind: "section",
    controls: [
      { id: "accent", label: "Accent colour", type: "color" },
    ],
    defaults: { accent: "#15803d" },
    install: [
      ...sectionSteps,
      "Place directly under the Product information section (or inside it via a Custom Liquid block) - blocks reorder in the theme editor.",
    ],
    files: (v) => ({
      liquid: `<div class="gpl-booster" style="--gpl-accent: {{ section.settings.accent }};">
  {%- for block in section.blocks -%}
    {%- case block.type -%}
      {%- when 'feature' -%}
        <p class="gpl-booster__row" {{ block.shopify_attributes }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m5 13 4 4L19 7"/></svg>
          {{ block.settings.text | escape }}
        </p>
      {%- when 'stock' -%}
        <p class="gpl-booster__row gpl-booster__stock" {{ block.shopify_attributes }}>
          <span class="gpl-booster__dot{% if product.selected_or_first_available_variant.available %} gpl-booster__dot--in{% endif %}"></span>
          {% if product.selected_or_first_available_variant.available %}{{ block.settings.in_stock | escape }}{% else %}{{ block.settings.out_stock | escape }}{% endif %}
        </p>
      {%- when 'delivery' -%}
        <p class="gpl-booster__row" {{ block.shopify_attributes }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 17h-2v-11a1 1 0 0 1 1-1h9v12m-8 0h8m4 0h2v-6h-6v6m0-9h4l4 4"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="17.5" cy="17.5" r="1.5"/></svg>
          Order today - {{ block.settings.text | escape }}
        </p>
      {%- when 'guarantee' -%}
        <p class="gpl-booster__row" {{ block.shopify_attributes }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          {{ block.settings.text | escape }}
        </p>
      {%- when 'payments' -%}
        <p class="gpl-booster__row gpl-booster__pay" {{ block.shopify_attributes }}>{{ block.settings.text | escape }}</p>
    {%- endcase -%}
  {%- endfor -%}
</div>

{% schema %}
{
  "name": "Buy box booster",
  "settings": [
    { "type": "color", "id": "accent", "label": "Accent colour", "default": ${js(str(v, "accent"))} }
  ],
  "blocks": [
    { "type": "feature", "name": "Trust point", "settings": [{ "type": "text", "id": "text", "label": "Text", "default": "Free shipping over $50" }] },
    { "type": "stock", "name": "Stock status", "settings": [{ "type": "text", "id": "in_stock", "label": "In stock text", "default": "In stock - ready to ship" }, { "type": "text", "id": "out_stock", "label": "Out of stock text", "default": "Currently out of stock" }] },
    { "type": "delivery", "name": "Delivery estimate", "settings": [{ "type": "text", "id": "text", "label": "Text", "default": "dispatched in 24 hours" }] },
    { "type": "guarantee", "name": "Guarantee", "settings": [{ "type": "text", "id": "text", "label": "Text", "default": "30-day money-back guarantee" }] },
    { "type": "payments", "name": "Payment note", "settings": [{ "type": "text", "id": "text", "label": "Text", "default": "Secure checkout - UPI, cards & COD" }] }
  ],
  "presets": [{ "name": "Buy box booster", "blocks": [{ "type": "stock" }, { "type": "feature" }, { "type": "delivery" }, { "type": "guarantee" }, { "type": "payments" }] }]
}
{% endschema %}`,
      css: `.gpl-booster { display: grid; gap: 0.45rem; margin: 0.9rem 0; }
.gpl-booster__row { display: flex; align-items: center; gap: 0.5rem; margin: 0; font-size: 0.72rem; }
.gpl-booster__row svg { width: 0.85rem; height: 0.85rem; color: var(--gpl-accent, #15803d); flex-shrink: 0; }
.gpl-booster__dot { width: 0.5rem; height: 0.5rem; border-radius: 999px; background: #9ca3af; flex-shrink: 0; }
.gpl-booster__dot--in { background: var(--gpl-accent, #16a34a); }
.gpl-booster__pay { font-weight: 700; }`,
    }),
  },
  {
    id: "stock-alert",
    name: "Back in stock signup",
    description: "Shows an email capture only when the variant is sold out - submits through Shopify's own customer form so the shopper lands in your customer list tagged with the product. Zero app needed.",
    category: "Product page",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 50 },
      { id: "sub", label: "Subtext", type: "text", maxLength: 80 },
      { id: "button", label: "Button label", type: "text", maxLength: 25 },
    ],
    defaults: { heading: "Sold out - notify me", sub: "Leave your email and we'll ping you the moment it's back.", button: "Notify me" },
    install: [
      ...sectionSteps,
      "Add to your product template - it hides itself while the product is in stock.",
      "Signups appear as customers tagged 'stock-alert:{product-handle}' in admin - email them when you restock (or export to your mail tool).",
    ],
    files: (v) => ({
      liquid: `{%- unless product.selected_or_first_available_variant.available -%}
<div class="gpl-alert">
  <p class="gpl-alert__heading">{{ section.settings.heading | default: 'Sold out - notify me' }}</p>
  {%- if section.settings.sub != blank -%}<p class="gpl-alert__sub">{{ section.settings.sub | escape }}</p>{%- endif -%}
  {%- form 'customer', class: 'gpl-alert__form' -%}
    <input type="hidden" name="contact[tags]" value="stock-alert,{{ product.handle }}">
    {%- if form.posted_successfully? -%}
      <p class="gpl-alert__done">Done - we'll email you as soon as it's back.</p>
    {%- else -%}
      <input type="email" name="contact[email]" class="gpl-alert__input" placeholder="you@email.com" required>
      <button type="submit" class="gpl-alert__btn">{{ section.settings.button | default: 'Notify me' }}</button>
    {%- endif -%}
  {%- endform -%}
</div>
{%- endunless -%}

{% schema %}
{
  "name": "Back in stock signup",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading", 50))} },
    { "type": "text", "id": "sub", "label": "Subtext", "default": ${js(str(v, "sub", 80))} },
    { "type": "text", "id": "button", "label": "Button label", "default": ${js(str(v, "button", 25))} }
  ],
  "presets": [{ "name": "Back in stock signup" }]
}
{% endschema %}`,
      css: `.gpl-alert { margin: 1rem 0; padding: 1.1rem; border: 1px dashed rgb(var(--color-foreground, 148 163 184) / 0.4); border-radius: 12px; }
.gpl-alert__heading { margin: 0; font-size: 0.85rem; font-weight: 800; }
.gpl-alert__sub { margin: 0.35rem 0 0; font-size: 0.72rem; color: rgb(var(--color-foreground, 100 116 139) / 0.8); }
.gpl-alert__form { display: flex; gap: 0.5rem; margin-top: 0.8rem; }
.gpl-alert__input { flex: 1; min-width: 0; padding: 0.6rem 0.8rem; border: 1px solid rgb(var(--color-foreground, 148 163 184) / 0.35); border-radius: 8px; font-size: 0.75rem; background: transparent; color: inherit; }
.gpl-alert__btn { border: 0; border-radius: 8px; padding: 0.6rem 1.1rem; background: rgb(var(--color-button, 15 23 42)); color: rgb(var(--color-button-text, 255 255 255)); font-size: 0.72rem; font-weight: 700; cursor: pointer; }
.gpl-alert__done { margin: 0.8rem 0 0; font-size: 0.75rem; font-weight: 700; color: #16a34a; }`,
    }),
  },
  {
    id: "mega-menu",
    name: "Mega menu header",
    description: "A complete header with logo, dropdown panels (sub-links become columns automatically), promo cards, search, cart count, sticky option and a mobile drawer. What paid header apps sell for $15+ alone.",
    category: "Headers & navigation",
    kind: "section",
    controls: [
      { id: "logo_text", label: "Logo text", type: "text", maxLength: 20 },
      { id: "sticky", label: "Sticky on scroll", type: "toggle" },
      { id: "bg", label: "Background", type: "color" },
      { id: "accent", label: "Accent", type: "color" },
    ],
    defaults: { logo_text: "Store", sticky: true, bg: "#ffffff", accent: "#0f172a" },
    install: [
      ...sectionSteps,
      "Add to the Header group, then disable your theme's own header section (one toggle on most OS 2.0 themes).",
      "Sub-menu items become panel columns automatically. Add a 'Promo card' block and set 'Show under menu item' to the top-level link title you want it under.",
    ],
    files: (v) => ({
      liquid: `<gpl-mm class="gpl-mm{% if section.settings.sticky %} gpl-mm--sticky{% endif %}" style="--gpl-mmbg: {{ section.settings.bg }}; --gpl-mmaccent: {{ section.settings.accent }};">
  <div class="gpl-mm__bar">
    <button type="button" class="gpl-mm__burger" data-burger aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
    <a class="gpl-mm__logo" href="{{ routes.root_url }}">
      {%- if section.settings.logo -%}
        <img src="{{ section.settings.logo | image_url: width: 160 }}" alt="{{ shop.name | escape }}" width="{{ section.settings.logo.width }}" height="{{ section.settings.logo.height }}">
      {%- else -%}
        {{ section.settings.logo_text | default: shop.name | escape }}
      {%- endif -%}
    </a>
    <nav class="gpl-mm__nav" aria-label="Main">
      {%- for link in section.settings.menu.links -%}
        <div class="gpl-mm__item" data-item>
          <a class="gpl-mm__link" href="{{ link.url }}">
            {{ link.title | escape }}
            {%- if link.links != blank %}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>{% endif -%}
          </a>
          {%- if link.links != blank -%}
            <div class="gpl-mm__panel" data-panel>
              <div class="gpl-mm__cols">
                {%- for child in link.links -%}
                  <div class="gpl-mm__col">
                    <a class="gpl-mm__colhead" href="{{ child.url }}">{{ child.title | escape }}</a>
                    {%- for grand in child.links -%}
                      <a class="gpl-mm__sublink" href="{{ grand.url }}">{{ grand.title | escape }}</a>
                    {%- endfor -%}
                  </div>
                {%- endfor -%}
              </div>
              {%- for block in section.blocks -%}
                {%- if block.settings.match == link.title -%}
                  <a class="gpl-mm__promo" href="{{ block.settings.link | default: '#' }}" {{ block.shopify_attributes }}>
                    {%- if block.settings.image -%}<img src="{{ block.settings.image | image_url: width: 400 }}" alt="" width="400" height="400" loading="lazy">{%- endif -%}
                    {%- if block.settings.text != blank -%}<span>{{ block.settings.text | escape }}</span>{%- endif -%}
                  </a>
                {%- endif -%}
              {%- endfor -%}
            </div>
          {%- endif -%}
        </div>
      {%- endfor -%}
    </nav>
    <div class="gpl-mm__icons">
      <a class="gpl-mm__icon" href="{{ routes.search_url }}" aria-label="Search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </a>
      <a class="gpl-mm__icon" href="{{ routes.cart_url }}" aria-label="Cart">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <span class="gpl-mm__count">{{ cart.item_count }}</span>
      </a>
    </div>
  </div>
  <div class="gpl-mm__drawer" data-drawer hidden>
    <div class="gpl-mm__drawerbox">
      <button type="button" class="gpl-mm__dx" data-burger aria-label="Close">&times;</button>
      {%- for link in section.settings.menu.links -%}
        {%- if link.links != blank -%}
          <details class="gpl-mm__dgroup">
            <summary>{{ link.title | escape }}</summary>
            {%- for child in link.links -%}
              <a href="{{ child.url }}">{{ child.title | escape }}</a>
            {%- endfor -%}
          </details>
        {%- else -%}
          <a class="gpl-mm__dlink" href="{{ link.url }}">{{ link.title | escape }}</a>
        {%- endif -%}
      {%- endfor -%}
    </div>
  </div>
</gpl-mm>

{% schema %}
{
  "name": "Mega menu header",
  "settings": [
    { "type": "image_picker", "id": "logo", "label": "Logo image" },
    { "type": "text", "id": "logo_text", "label": "Logo text (used when no image)", "default": ${js(str(v, "logo_text", 20))} },
    { "type": "link_list", "id": "menu", "label": "Menu", "default": "main-menu" },
    { "type": "checkbox", "id": "sticky", "label": "Sticky on scroll", "default": true },
    { "type": "color", "id": "bg", "label": "Background", "default": ${js(str(v, "bg"))} },
    { "type": "color", "id": "accent", "label": "Accent", "default": ${js(str(v, "accent"))} }
  ],
  "blocks": [
    {
      "type": "promo",
      "name": "Promo card",
      "settings": [
        { "type": "text", "id": "match", "label": "Show under menu item (exact title)" },
        { "type": "image_picker", "id": "image", "label": "Image" },
        { "type": "text", "id": "text", "label": "Caption" },
        { "type": "url", "id": "link", "label": "Link" }
      ]
    }
  ],
  "presets": [{ "name": "Mega menu header" }]
}
{% endschema %}`,
      css: `.gpl-mm { display: block; background: var(--gpl-mmbg, #fff); }
.gpl-mm--sticky { position: sticky; top: 0; z-index: 60; }
.gpl-mm__bar { display: flex; align-items: center; gap: 1.5rem; padding: 0.9rem 1.5rem; }
.gpl-mm__burger { display: none; flex-direction: column; gap: 4px; border: 0; background: none; cursor: pointer; padding: 4px; }
.gpl-mm__burger span { display: block; width: 1.3rem; height: 2px; background: currentColor; }
.gpl-mm__logo { font-size: 1.15rem; font-weight: 800; color: inherit; text-decoration: none; }
.gpl-mm__logo img { max-height: 2.2rem; width: auto; }
.gpl-mm__nav { display: flex; align-items: center; gap: 0.25rem; flex: 1; }
.gpl-mm__link { display: flex; align-items: center; gap: 0.3rem; padding: 0.55rem 0.75rem; font-size: 0.78rem; font-weight: 600; color: inherit; text-decoration: none; border-radius: 8px; }
.gpl-mm__link svg { width: 0.75rem; height: 0.75rem; }
.gpl-mm__item:hover > .gpl-mm__link, .gpl-mm__item.is-open > .gpl-mm__link { color: var(--gpl-mmaccent, #0f172a); }
.gpl-mm__panel { position: absolute; left: 0; right: 0; top: 100%; display: none; padding: 1.5rem 2rem; background: var(--gpl-mmbg, #fff); border-top: 1px solid rgba(148,163,184,0.2); box-shadow: 0 24px 40px rgba(0,0,0,0.08); gap: 2rem; }
.gpl-mm__item:hover > .gpl-mm__panel, .gpl-mm__item.is-open > .gpl-mm__panel { display: flex; }
.gpl-mm__item { position: static; }
.gpl-mm { position: relative; }
.gpl-mm--sticky { position: sticky; }
.gpl-mm__cols { display: flex; gap: 3rem; flex: 1; }
.gpl-mm__col { display: grid; gap: 0.45rem; align-content: start; }
.gpl-mm__colhead { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: var(--gpl-mmaccent, #0f172a); text-decoration: none; margin-bottom: 0.25rem; }
.gpl-mm__sublink { font-size: 0.75rem; color: inherit; text-decoration: none; opacity: 0.8; }
.gpl-mm__sublink:hover { opacity: 1; text-decoration: underline; }
.gpl-mm__promo { display: block; width: 12rem; border-radius: 12px; overflow: hidden; text-decoration: none; color: inherit; }
.gpl-mm__promo img { display: block; width: 100%; height: 8rem; object-fit: cover; }
.gpl-mm__promo span { display: block; padding: 0.6rem 0.2rem 0; font-size: 0.72rem; font-weight: 600; }
.gpl-mm__icons { display: flex; align-items: center; gap: 0.4rem; margin-left: auto; }
.gpl-mm__icon { position: relative; padding: 0.4rem; color: inherit; }
.gpl-mm__icon svg { width: 1.1rem; height: 1.1rem; }
.gpl-mm__count { position: absolute; top: 0; right: -2px; min-width: 1rem; height: 1rem; border-radius: 999px; background: var(--gpl-mmaccent, #0f172a); color: #fff; font-size: 0.55rem; font-weight: 800; display: flex; align-items: center; justify-content: center; }
.gpl-mm__drawer { position: fixed; inset: 0; z-index: 95; background: rgba(0,0,0,0.4); }
.gpl-mm__drawer[hidden] { display: none; }
.gpl-mm__drawerbox { width: min(20rem, 85vw); height: 100%; overflow-y: auto; background: var(--gpl-mmbg, #fff); padding: 1.2rem; }
.gpl-mm__dx { float: right; border: 0; background: none; font-size: 1.6rem; cursor: pointer; }
.gpl-mm__dlink { display: block; padding: 0.85rem 0; border-bottom: 1px solid rgba(148,163,184,0.2); font-size: 0.85rem; font-weight: 600; color: inherit; text-decoration: none; }
.gpl-mm__dgroup { border-bottom: 1px solid rgba(148,163,184,0.2); }
.gpl-mm__dgroup summary { padding: 0.85rem 0; font-size: 0.85rem; font-weight: 600; cursor: pointer; list-style: none; }
.gpl-mm__dgroup summary::after { content: '+'; float: right; }
.gpl-mm__dgroup[open] summary::after { content: '-'; }
.gpl-mm__dgroup a { display: block; padding: 0.6rem 0.8rem; font-size: 0.78rem; color: inherit; text-decoration: none; opacity: 0.8; }
@media (max-width: 860px) {
  .gpl-mm__nav { display: none; }
  .gpl-mm__burger { display: flex; }
}`,
      js: `document.querySelectorAll('gpl-mm').forEach((el) => {
  const drawer = el.querySelector('[data-drawer]');
  el.querySelectorAll('[data-burger]').forEach((b) => b.addEventListener('click', () => { drawer.hidden = !drawer.hidden; }));
  drawer.addEventListener('click', (e) => { if (e.target === drawer) drawer.hidden = true; });
  el.querySelectorAll('[data-item] > a').forEach((a) => {
    a.addEventListener('click', (e) => {
      const item = a.parentElement;
      if (!item.querySelector('[data-panel]')) return;
      if (item.classList.contains('is-open')) return;
      if (e.pointerType === 'touch' || !item.matches(':hover')) { e.preventDefault(); item.classList.toggle('is-open'); }
    });
  });
  document.addEventListener('click', (e) => { if (!el.contains(e.target)) el.querySelectorAll('.is-open').forEach((i) => i.classList.remove('is-open')); });
});`,
    }),
  },

  {
    id: "spin-wheel",
    name: "Spin to win wheel",
    description: "The classic gamified popup - a canvas prize wheel with configurable prizes, spins to a random slice and reveals the code. Proven email-list and conversion builder.",
    category: "Marketing",
    kind: "section",
    controls: [
      { id: "title", label: "Title", type: "text", maxLength: 40 },
      { id: "spin_text", label: "Button label", type: "text", maxLength: 20 },
      { id: "delay", label: "Delay (seconds)", type: "select", options: [{ value: "1", label: "1" }, { value: "3", label: "3" }, { value: "8", label: "8" }] },
    ],
    defaults: { title: "Spin to win", spin_text: "Spin the wheel", delay: "3" },
    install: [
      ...sectionSteps,
      "Add 'Prize slice' blocks (2-8). The code field is optional - leave blank for 'no win' slices.",
      "Create matching discounts in Shopify admin so revealed codes actually work.",
    ],
    files: (v) => ({
      liquid: `<gpl-wheel class="gpl-wheel" data-delay="{{ section.settings.delay }}" data-key="gpl-wheel-{{ section.id }}" hidden>
  <div class="gpl-wheel__box" role="dialog" aria-modal="true" aria-label="{{ section.settings.title | escape }}">
    <button type="button" class="gpl-wheel__x" data-close aria-label="Close">&times;</button>
    <h2 class="gpl-wheel__title">{{ section.settings.title | default: 'Spin to win' }}</h2>
    <div class="gpl-wheel__stage">
      <canvas class="gpl-wheel__canvas" data-canvas width="280" height="280"></canvas>
      <div class="gpl-wheel__pin"></div>
    </div>
    <button type="button" class="gpl-wheel__spin" data-spin>{{ section.settings.spin_text | default: 'Spin the wheel' }}</button>
    <div class="gpl-wheel__win" data-win hidden>
      <p data-win-text></p>
      <code class="gpl-wheel__code" data-win-code></code>
    </div>
    {%- for block in section.blocks -%}
      <span data-slice data-label="{{ block.settings.label | escape }}" data-code="{{ block.settings.code | escape }}" {{ block.shopify_attributes }} hidden></span>
    {%- endfor -%}
  </div>
</gpl-wheel>

{% schema %}
{
  "name": "Spin to win wheel",
  "max_blocks": 8,
  "settings": [
    { "type": "text", "id": "title", "label": "Title", "default": ${js(str(v, "title", 40))} },
    { "type": "text", "id": "spin_text", "label": "Button label", "default": ${js(str(v, "spin_text", 20))} },
    { "type": "range", "id": "delay", "label": "Delay in seconds", "min": 1, "max": 30, "step": 1, "default": ${Number(v.delay) || 3} }
  ],
  "blocks": [
    {
      "type": "prize",
      "name": "Prize slice",
      "settings": [
        { "type": "text", "id": "label", "label": "Label", "default": "10% off" },
        { "type": "text", "id": "code", "label": "Code (blank = no win)" }
      ]
    }
  ],
  "presets": [{ "name": "Spin to win wheel", "blocks": [{ "type": "prize" }, { "type": "prize" }, { "type": "prize" }, { "type": "prize" }] }]
}
{% endschema %}`,
      css: `.gpl-wheel { position: fixed; inset: 0; z-index: 90; display: flex; align-items: center; justify-content: center; padding: 1.5rem; background: rgba(0,0,0,0.55); }
.gpl-wheel[hidden] { display: none; }
.gpl-wheel__box { position: relative; width: min(24rem, 100%); padding: 1.75rem 1.5rem; border-radius: 18px; background: #fff; text-align: center; box-shadow: 0 24px 60px rgba(0,0,0,0.35); }
.gpl-wheel__x { position: absolute; top: 0.6rem; right: 0.75rem; border: 0; background: none; font-size: 1.5rem; cursor: pointer; color: #94a3b8; }
.gpl-wheel__title { margin: 0 0 1rem; font-size: 1.3rem; font-weight: 800; }
.gpl-wheel__stage { position: relative; width: 17.5rem; height: 17.5rem; margin: 0 auto; }
.gpl-wheel__canvas { display: block; width: 100%; height: 100%; }
.gpl-wheel__pin { position: absolute; top: -6px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 18px solid #0f172a; }
.gpl-wheel__spin { margin-top: 1.1rem; border: 0; border-radius: 999px; padding: 0.75rem 2rem; background: rgb(var(--color-button, 15 23 42)); color: rgb(var(--color-button-text, 255 255 255)); font-size: 0.8rem; font-weight: 800; cursor: pointer; }
.gpl-wheel__spin:disabled { opacity: 0.5; cursor: default; }
.gpl-wheel__win { margin-top: 1rem; }
.gpl-wheel__win p { margin: 0 0 0.4rem; font-size: 0.85rem; font-weight: 700; }
.gpl-wheel__code { display: inline-block; padding: 0.5rem 1.2rem; border: 1.5px dashed #0f172a; border-radius: 8px; font-size: 1.05rem; font-weight: 800; letter-spacing: 0.1em; }
.gpl-wheel__win.is-lose p { color: #64748b; }
.gpl-wheel__win.is-lose code { display: none; }`,
      js: `class GplWheel extends HTMLElement {
  connectedCallback() {
    if (localStorage.getItem(this.dataset.key) === 'done') return;
    this.slices = [...this.querySelectorAll('[data-slice]')].map((s) => ({ label: s.dataset.label || '?', code: s.dataset.code || '' }));
    if (this.slices.length < 2) this.slices = [{ label: '10% off', code: 'WIN10' }, { label: 'Try again', code: '' }];
    this.querySelector('[data-close]').addEventListener('click', () => this.dismiss());
    this.addEventListener('click', (e) => { if (e.target === this) this.dismiss(); });
    this.querySelector('[data-spin]').addEventListener('click', () => this.spin());
    this.timer = setTimeout(() => { this.hidden = false; this.draw(0); }, Number(this.dataset.delay) * 1000 || 3000);
  }
  dismiss() { clearTimeout(this.timer); this.hidden = true; localStorage.setItem(this.dataset.key, 'done'); }
  draw(rot) {
    const cv = this.querySelector('[data-canvas]');
    const ctx = cv.getContext('2d');
    const n = this.slices.length, arc = (Math.PI * 2) / n, r = cv.width / 2;
    const cols = ['#0f172a', '#334155', '#16a34a', '#b45309', '#7c3aed', '#be123c', '#0369a1', '#4d7c0f'];
    ctx.clearRect(0, 0, cv.width, cv.height);
    this.slices.forEach((s, i) => {
      ctx.beginPath();
      ctx.moveTo(r, r);
      ctx.arc(r, r, r - 4, rot + i * arc, rot + (i + 1) * arc);
      ctx.closePath();
      ctx.fillStyle = cols[i % cols.length];
      ctx.fill();
      ctx.save();
      ctx.translate(r, r);
      ctx.rotate(rot + i * arc + arc / 2);
      ctx.fillStyle = '#fff';
      ctx.font = '700 13px system-ui';
      ctx.textAlign = 'right';
      ctx.fillText(s.label.slice(0, 14), r - 16, 4);
      ctx.restore();
    });
  }
  spin() {
    const btn = this.querySelector('[data-spin]');
    btn.disabled = true;
    const n = this.slices.length, arc = (Math.PI * 2) / n;
    const win = Math.floor(Math.random() * n);
    const target = Math.PI * 2 * 5 + (Math.PI * 1.5) - (win * arc + arc / 2);
    const dur = 3200, t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const ease = 1 - Math.pow(1 - p, 3);
      this.draw(target * ease);
      if (p < 1) requestAnimationFrame(tick);
      else {
        const w = this.slices[win];
        const box = this.querySelector('[data-win]');
        box.hidden = false;
        box.classList.toggle('is-lose', !w.code);
        this.querySelector('[data-win-text]').textContent = w.code ? 'You won: ' + w.label : 'No luck this time - try tomorrow!';
        this.querySelector('[data-win-code]').textContent = w.code;
        localStorage.setItem(this.dataset.key, 'done');
      }
    };
    requestAnimationFrame(tick);
  }
}
if (!customElements.get('gpl-wheel')) customElements.define('gpl-wheel', GplWheel);`,
    }),
  },
  {
    id: "quick-view-grid",
    name: "Quick-view collection",
    description: "A product grid where every card has a quick-view button - opens a modal with image, price, variant picker and add-to-cart without leaving the page. The quick-view feature paid themes charge for.",
    category: "Product page",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 40 },
      { id: "collection", label: "Collection handle", type: "text", maxLength: 60 },
      { id: "limit", label: "Products shown", type: "select", options: [{ value: "4", label: "4" }, { value: "8", label: "8" }, { value: "12", label: "12" }] },
    ],
    defaults: { heading: "Shop the look", collection: "", limit: "8" },
    install: [
      ...sectionSteps,
      "Set the collection handle in the settings (find it on the collection page in admin).",
    ],
    files: (v) => ({
      liquid: `<gpl-qv class="gpl-qv">
  {%- if section.settings.heading != blank -%}<h2 class="gpl-qv__heading">{{ section.settings.heading | escape }}</h2>{%- endif -%}
  <div class="gpl-qv__grid">
    {%- assign col = collections[section.settings.collection] -%}
    {%- if col and col.products.size > 0 -%}
      {%- for product in col.products limit: section.settings.limit -%}
        <div class="gpl-qv__card">
          <a class="gpl-qv__imgwrap" href="{{ product.url }}">
            {%- if product.featured_image -%}
              <img class="gpl-qv__img" src="{{ product.featured_image | image_url: width: 400 }}" alt="{{ product.title | escape }}" width="400" height="400" loading="lazy">
            {%- endif -%}
            <button type="button" class="gpl-qv__btn" data-qv="{{ product.handle }}">Quick view</button>
          </a>
          <a class="gpl-qv__name" href="{{ product.url }}">{{ product.title }}</a>
          <p class="gpl-qv__price">{{ product.price | money }}</p>
        </div>
      {%- endfor -%}
    {%- else -%}
      <p class="gpl-qv__hint">Set a collection handle in the section settings to show products with quick-view.</p>
    {%- endif -%}
  </div>
  <div class="gpl-qv__modal" data-modal hidden>
    <div class="gpl-qv__mbox" role="dialog" aria-modal="true">
      <button type="button" class="gpl-qv__x" data-close aria-label="Close">&times;</button>
      <div class="gpl-qv__mbody" data-body><p class="gpl-qv__loading">Loading…</p></div>
    </div>
  </div>
</gpl-qv>

{% schema %}
{
  "name": "Quick-view collection",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading", 40))} },
    { "type": "collection", "id": "collection", "label": "Collection" },
    { "type": "range", "id": "limit", "label": "Products shown", "min": 2, "max": 12, "step": 1, "default": ${Number(v.limit) || 8} }
  ],
  "presets": [{ "name": "Quick-view collection" }]
}
{% endschema %}`,
      css: `.gpl-qv { display: block; }
.gpl-qv__heading { margin: 0 0 1.2rem; font-size: 1.3rem; font-weight: 800; }
.gpl-qv__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
@media (max-width: 900px) { .gpl-qv__grid { grid-template-columns: repeat(2, 1fr); } }
.gpl-qv__hint { grid-column: 1 / -1; margin: 2rem 0; text-align: center; font-size: 0.8rem; color: #94a3b8; }
.gpl-qv__imgwrap { position: relative; display: block; }
.gpl-qv__img { display: block; width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 12px; }
.gpl-qv__btn { position: absolute; left: 50%; bottom: 0.6rem; transform: translateX(-50%); border: 0; border-radius: 999px; padding: 0.45rem 1rem; background: rgba(255,255,255,0.92); color: #0f172a; font-size: 0.62rem; font-weight: 800; cursor: pointer; opacity: 0; transition: opacity 0.2s; }
.gpl-qv__imgwrap:hover .gpl-qv__btn, .gpl-qv__btn:focus { opacity: 1; }
.gpl-qv__name { display: block; margin-top: 0.55rem; font-size: 0.72rem; font-weight: 700; color: inherit; text-decoration: none; }
.gpl-qv__price { margin: 0.2rem 0 0; font-size: 0.7rem; color: #64748b; }
.gpl-qv__modal { position: fixed; inset: 0; z-index: 90; display: flex; align-items: center; justify-content: center; padding: 1.5rem; background: rgba(0,0,0,0.5); }
.gpl-qv__modal[hidden] { display: none; }
.gpl-qv__mbox { position: relative; width: min(34rem, 100%); max-height: 85vh; overflow-y: auto; border-radius: 16px; background: #fff; padding: 1.5rem; }
.gpl-qv__x { position: absolute; top: 0.6rem; right: 0.75rem; border: 0; background: none; font-size: 1.5rem; cursor: pointer; }
.gpl-qv__mprod { display: grid; grid-template-columns: 12rem 1fr; gap: 1.2rem; align-items: start; }
@media (max-width: 560px) { .gpl-qv__mprod { grid-template-columns: 1fr; } }
.gpl-qv__mimg { width: 100%; border-radius: 10px; }
.gpl-qv__mname { margin: 0; font-size: 1rem; font-weight: 800; }
.gpl-qv__mprice { margin: 0.35rem 0 0.8rem; font-size: 0.9rem; font-weight: 700; }
.gpl-qv__mdesc { margin: 0 0 0.9rem; font-size: 0.72rem; color: #475569; }
.gpl-qv__var { width: 100%; padding: 0.6rem; margin-bottom: 0.7rem; border: 1px solid rgba(148,163,184,0.4); border-radius: 8px; font-size: 0.75rem; }
.gpl-qv__add { width: 100%; border: 0; border-radius: var(--buttons-radius, 10px); padding: 0.75rem; background: rgb(var(--color-button, 15 23 42)); color: rgb(var(--color-button-text, 255 255 255)); font-size: 0.78rem; font-weight: 800; cursor: pointer; }
.gpl-qv__view { display: inline-block; margin-top: 0.7rem; font-size: 0.68rem; text-decoration: underline; color: inherit; }
.gpl-qv__loading { margin: 3rem 0; text-align: center; color: #94a3b8; font-size: 0.8rem; }`,
      js: `class GplQv extends HTMLElement {
  connectedCallback() {
    this.modal = this.querySelector('[data-modal]');
    this.body = this.querySelector('[data-body]');
    this.querySelector('[data-close]').addEventListener('click', () => this.close());
    this.modal.addEventListener('click', (e) => { if (e.target === this.modal) this.close(); });
    this.querySelectorAll('[data-qv]').forEach((b) => {
      b.addEventListener('click', (e) => { e.preventDefault(); this.open(b.dataset.qv); });
    });
  }
  money(c) { return (window.Shopify && Shopify.formatMoney) ? Shopify.formatMoney(c) : (c / 100).toFixed(2); }
  close() { this.modal.hidden = true; }
  open(handle) {
    this.modal.hidden = false;
    this.body.innerHTML = '<p class="gpl-qv__loading">Loading…</p>';
    fetch('/products/' + handle + '.js').then((r) => r.json()).then((p) => {
      const vars = (p.variants || []).filter((v) => v.available);
      this.body.innerHTML =
        '<div class="gpl-qv__mprod">' +
        (p.featured_image ? '<img class="gpl-qv__mimg" src="' + p.featured_image + '" alt="">' : '<div></div>') +
        '<div><h3 class="gpl-qv__mname">' + p.title + '</h3>' +
        '<p class="gpl-qv__mprice" data-price>' + this.money(p.price) + '</p>' +
        '<p class="gpl-qv__mdesc">' + (p.description || '').replace(/<[^>]*>/g, '').slice(0, 140) + '…</p>' +
        (vars.length > 1
          ? '<select class="gpl-qv__var">' + vars.map((v) => '<option value="' + v.id + '">' + v.title + '</option>').join('') + '</select>'
          : '') +
        '<button type="button" class="gpl-qv__add"' + (vars.length ? '' : ' disabled') + '>' + (vars.length ? 'Add to cart' : 'Sold out') + '</button>' +
        '<a class="gpl-qv__view" href="' + p.url + '">View full details</a></div></div>';
      const sel = this.body.querySelector('.gpl-qv__var');
      if (sel) sel.addEventListener('change', () => { const v = vars.find((x) => x.id === Number(sel.value)); if (v) this.body.querySelector('[data-price]').textContent = this.money(v.price); });
      this.body.querySelector('.gpl-qv__add').addEventListener('click', () => {
        const vid = sel ? Number(sel.value) : (vars[0] && vars[0].id);
        if (!vid) return;
        fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: [{ id: vid, quantity: 1 }] }) })
          .then(() => { window.location.href = '/cart'; });
      });
    }).catch(() => { this.body.innerHTML = '<p class="gpl-qv__loading">Could not load this product.</p>'; });
  }
}
if (!customElements.get('gpl-qv')) customElements.define('gpl-qv', GplQv);`,
    }),
  },

  {
    id: "upsell-modal",
    name: "Post-add-to-cart upsell",
    description: "Shows a one-click 'add this too' offer the moment a shopper adds to cart - intercepts the form, offers the upsell, then continues to the cart. Post-purchase upsell apps charge $20+/mo for this.",
    category: "Cart & checkout",
    kind: "section",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 40 },
      { id: "product", label: "Upsell product handle", type: "text", maxLength: 60 },
      { id: "add", label: "Add button label", type: "text", maxLength: 25 },
    ],
    defaults: { heading: "Complete your order", product: "", add: "Add it too" },
    install: [
      ...sectionSteps,
      "Add once to your product template. It wakes up when any add-to-cart form on the page submits.",
    ],
    files: (v) => ({
      liquid: `{%- assign u = all_products[section.settings.product] -%}
{%- if u -%}
<gpl-upsell class="gpl-usmodal" hidden>
  <div class="gpl-usmodal__box" role="dialog" aria-modal="true" aria-label="{{ section.settings.heading | escape }}">
    <button type="button" class="gpl-usmodal__x" data-close aria-label="Close">&times;</button>
    <p class="gpl-usmodal__heading">{{ section.settings.heading | default: 'Complete your order' }}</p>
    <div class="gpl-usmodal__prod">
      {%- if u.featured_image -%}
        <img class="gpl-usmodal__img" src="{{ u.featured_image | image_url: width: 160 }}" alt="{{ u.title | escape }}" width="160" height="160">
      {%- endif -%}
      <div>
        <p class="gpl-usmodal__name">{{ u.title }}</p>
        <p class="gpl-usmodal__price">{{ u.price | money }}</p>
      </div>
    </div>
    <button type="button" class="gpl-usmodal__add" data-add data-vid="{{ u.selected_or_first_available_variant.id }}">{{ section.settings.add | default: 'Add it too' }}</button>
    <button type="button" class="gpl-usmodal__no" data-close>No thanks, continue to cart</button>
  </div>
</gpl-upsell>
{%- endif -%}

{% schema %}
{
  "name": "Post-cart upsell",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": ${js(str(v, "heading", 40))} },
    { "type": "product", "id": "product", "label": "Upsell product" },
    { "type": "text", "id": "add", "label": "Add button label", "default": ${js(str(v, "add", 25))} }
  ],
  "presets": [{ "name": "Post-cart upsell" }]
}
{% endschema %}`,
      css: `.gpl-usmodal { position: fixed; inset: 0; z-index: 92; display: flex; align-items: center; justify-content: center; padding: 1.5rem; background: rgba(0,0,0,0.5); }
.gpl-usmodal[hidden] { display: none; }
.gpl-usmodal__box { position: relative; width: min(22rem, 100%); padding: 1.75rem; border-radius: 16px; background: #fff; text-align: center; box-shadow: 0 24px 60px rgba(0,0,0,0.3); }
.gpl-usmodal__x { position: absolute; top: 0.6rem; right: 0.75rem; border: 0; background: none; font-size: 1.5rem; cursor: pointer; color: #94a3b8; }
.gpl-usmodal__heading { margin: 0 0 1rem; font-size: 1rem; font-weight: 800; }
.gpl-usmodal__prod { display: flex; align-items: center; gap: 0.9rem; padding: 0.9rem; border: 1px solid rgba(148,163,184,0.3); border-radius: 12px; text-align: left; }
.gpl-usmodal__img { width: 3.5rem; height: 3.5rem; object-fit: cover; border-radius: 8px; }
.gpl-usmodal__name { margin: 0; font-size: 0.78rem; font-weight: 700; }
.gpl-usmodal__price { margin: 0.2rem 0 0; font-size: 0.72rem; color: #64748b; }
.gpl-usmodal__add { margin-top: 1rem; width: 100%; border: 0; border-radius: 10px; padding: 0.75rem; background: rgb(var(--color-button, 15 23 42)); color: rgb(var(--color-button-text, 255 255 255)); font-size: 0.78rem; font-weight: 800; cursor: pointer; }
.gpl-usmodal__no { margin-top: 0.6rem; border: 0; background: none; font-size: 0.68rem; color: #64748b; text-decoration: underline; cursor: pointer; }`,
      js: `class GplUpsellModal extends HTMLElement {
  connectedCallback() {
    document.addEventListener('submit', (e) => {
      const form = e.target;
      if (!(form instanceof HTMLFormElement) || !String(form.action).includes('/cart/add')) return;
      e.preventDefault();
      const data = new FormData(form);
      const id = data.get('id');
      if (!id) { form.submit(); return; }
      const main = { id: Number(id), quantity: Number(data.get('quantity')) || 1 };
      this.show(main);
    }, true);
    this.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => this.finish()));
    this.addEventListener('click', (e) => { if (e.target === this) this.finish(); });
    this.querySelector('[data-add]').addEventListener('click', (e) => {
      this.extra = { id: Number(e.currentTarget.dataset.vid), quantity: 1 };
      this.finish();
    });
  }
  show(main) { this.pending = main; this.extra = null; this.hidden = false; }
  finish() {
    const items = [this.pending];
    if (this.extra) items.push(this.extra);
    this.hidden = true;
    fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items }) })
      .then(() => { window.location.href = '/cart'; });
  }
}
if (!customElements.get('gpl-upsell')) customElements.define('gpl-upsell', GplUpsellModal);`,
    }),
  },
];

export function getExample(id: string | undefined): PlaygroundExample {
  return examples.find((e) => e.id === id) ?? examples[0]!;
}

/**
 * One-file install: merges the generated CSS/JS into the Liquid via Shopify's
 * {% stylesheet %} / {% javascript %} tags (supported in sections and snippets).
 * This is the file users copy - identical pattern to LaunchTip's sections.
 */
export function completeFile(files: ExampleFiles): string {
  let out = files.liquid.replace(/\s+$/, "");
  if (files.css) out += `\n\n{% stylesheet %}\n${files.css.replace(/\s+$/, "")}\n{% endstylesheet %}`;
  if (files.js) out += `\n\n{% javascript %}\n${files.js.replace(/\s+$/, "")}\n{% endjavascript %}`;
  return `${out}\n`;
}

const CONTEXT_OBJECTS = new Set(["product", "collection", "cart", "article", "blog", "customer", "section", "page", "search", "request", "forloop"]);
const LIQUID_KEYWORDS = new Set(["true", "false", "nil", "null", "empty", "blank", "limit", "offset", "forloop", "loop", "range", "reversed", "cols", "endpaginate", "paginate", "increment", "decrement", "cycle", "tablerow", "endtablerow", "raw", "endraw", "include", "render", "echo", "elsif", "else", "endif", "endunless", "when", "endcase", "case", "unless", "if", "and", "or", "contains", "in", "endfor", "break", "continue", "liquid", "form", "endform", "style", "endstyle", "schema", "endschema", "stylesheet", "endstylesheet", "javascript", "endjavascript", "comment", "endcomment", "doc", "enddoc", "layout", "block", "endblock", "section", "sections", "section_group", "endsection_group", "paginate", "assign", "capture", "endcapture", "with", "as"]);

/**
 * Section variant: wraps a snippet's liquid in `{% schema %}` so the same code
 * can also be dropped into sections/ and added via the theme editor - zero
 * render tags. Scalar render params become section settings; page-context
 * params (product, cart…) come from the template automatically.
 */
export function asSectionFile(ex: PlaygroundExample, files: ExampleFiles): string {
  const usage = files.usage ?? "";
  const paramRe = /([a-z_][a-z0-9_]*)\s*:\s*(["'][^"']*["']|[a-z0-9_.-]+)/g;
  const assigns: string[] = [];
  const settings: string[] = [];
  const known = new Set(CONTEXT_OBJECTS);
  for (const m of Array.from(usage.matchAll(paramRe))) {
    const name = m[1]!;
    const val = m[2]!.replace(/^["']|["']$/g, "");
    if (CONTEXT_OBJECTS.has(m[2]!)) continue; // page-context object, not a setting
    known.add(name);
    assigns.push(`{%- assign ${name} = section.settings.${name} -%}`);
    const ctrl = ex.controls?.find((c) => c.id === name);
    const type =
      ctrl?.type === "color" ? "color" : ctrl?.type === "toggle" ? "checkbox" : val.includes("\n") || val.length > 60 ? "textarea" : "text";
    const options = ctrl?.type === "select" ? `, "options": ${JSON.stringify(ctrl.options.map((o) => ({ value: o.value, label: o.label })))}` : "";
    settings.push(
      `    { "type": "${ctrl?.type === "select" ? "select" : type}", "id": "${name}", "label": ${JSON.stringify(ctrl?.label ?? name)}, "default": ${type === "color" ? JSON.stringify(val || "#000000") : type === "checkbox" ? (val === "true" ? "true" : "false") : JSON.stringify(val)}${options} }`,
    );
  }
  // Optional params the liquid references but usage doesn't pass (defaults via | default:)
  const locals = new Set(known);
  for (const m of Array.from(files.liquid.matchAll(/\{%\s*-?\s*(?:assign|capture|for|endfor)\s+([a-z_][a-z0-9_]*)/g))) locals.add(m[1]!);
  for (const m of Array.from(files.liquid.matchAll(/\{%\s*-?\s*for\s+([a-z_][a-z0-9_]*)\s+in\s+([a-z_][a-z0-9_]*)/g))) { locals.add(m[1]!); locals.add(m[2]!); }
  const referenced = new Set<string>();
  for (const m of Array.from(files.liquid.matchAll(/\{\{\s*([a-z_][a-z0-9_]*)/g))) referenced.add(m[1]!);
  for (const m of Array.from(files.liquid.matchAll(/\{%\s*-?\s*(?:if|unless|elsif)\s+([a-z_][a-z0-9_]*)/g))) referenced.add(m[1]!);
  for (const id of Array.from(referenced)) {
    if (locals.has(id) || LIQUID_KEYWORDS.has(id)) continue;
    assigns.push(`{%- assign ${id} = section.settings.${id} -%}`);
    const ctrl = ex.controls?.find((c) => c.id === id);
    settings.push(`    { "type": "text", "id": "${id}", "label": ${JSON.stringify(ctrl?.label ?? id)} }`);
    locals.add(id);
  }
  const body = files.liquid.replace(/\s+$/, "");
  let out = `${assigns.length ? `${assigns.join("\n")}\n` : ""}${body}`;
  if (files.css) out += `\n\n{% stylesheet %}\n${files.css.replace(/\s+$/, "")}\n{% endstylesheet %}`;
  if (files.js) out += `\n\n{% javascript %}\n${files.js.replace(/\s+$/, "")}\n{% endjavascript %}`;
  const schemaName = ex.name.length > 25 ? ex.name.slice(0, 22) + "…" : ex.name;
  out += `\n\n{% schema %}\n{\n  "name": ${JSON.stringify(schemaName)},\n  "settings": [\n${settings.join(",\n")}\n  ],\n  "presets": [{ "name": ${JSON.stringify(schemaName)} }]\n}\n{% endschema %}\n`;
  return out;
}
