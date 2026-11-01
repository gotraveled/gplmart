import type { PlaygroundExample, Values } from "./types";

/**
 * Original demonstration snippets for the free playground. They are teaching
 * examples, NOT the paid library, and are not stored in the database.
 */

export const str = (v: Values, id: string, max = 80): string => String(v[id] ?? "").slice(0, max);
export const on = (v: Values, id: string): boolean => v[id] === true;
export const hex = (v: Values, id: string): string => (/^#[0-9a-f]{6}$/i.test(String(v[id])) ? String(v[id]) : "#000000");
const js = (s: string) => JSON.stringify(s);

const sectionSteps = [
  "Back up your theme (Online Store > Themes > Actions > Duplicate) before changing any code.",
  "Open Online Store > Themes > Edit code and create a new file under Sections using the file name shown above.",
  "Paste the Liquid code, then add the CSS to your theme's base stylesheet or into a {% stylesheet %} tag at the end of the same file.",
  "Open the theme editor, add the section to a template, and replace the example values using the section settings.",
  "Preview the storefront and test it on a phone-sized screen before publishing.",
];
const snippetSteps = (file: string) => [
  "Back up your theme (Online Store > Themes > Actions > Duplicate) before changing any code.",
  `Open Online Store > Themes > Edit code and create a new file under Snippets named ${file}.`,
  "Paste the Liquid code and add the CSS to your theme's base stylesheet.",
  "Call the snippet from the template or section where it should appear using the render tag shown in the Usage tab.",
  "Preview the product, collection or cart page and test on mobile before publishing.",
];

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
    category: "Trust & store information",
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
  border: 1px solid #d5dccb;
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
    category: "Trust & store information",
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
  border: 1px solid #d5dccb;
  border-radius: 12px;
  font-size: 0.875rem;
}
.gpl-trust__icon {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 6px;
  background: #0b1220;
}`,
        usage: `{% render 'trust-badges' %}`,
      };
    },
  },
  {
    id: "collection-grid",
    name: "Collection card grid",
    description: "A responsive grid of collection cards driven by section blocks.",
    category: "Storefront sections",
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
  background: #e8ecde;
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
    category: "Promotions & banners",
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
.gpl-compare td { padding: 0.75rem 1rem; border-bottom: 1px solid #d5dccb; text-align: left; }
.gpl-compare thead th { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.04em; }
.gpl-compare--highlight th:nth-child(2),
.gpl-compare--highlight td:nth-child(2) { background: #f1f8dc; font-weight: 600; }
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
    category: "Storefront sections",
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
.gpl-faq--bordered details { border: 1px solid #d5dccb; border-radius: 12px; margin-bottom: 0.6rem; }
.gpl-faq--minimal details { border-bottom: 1px solid #d5dccb; }
.gpl-faq summary { cursor: pointer; font-weight: 600; list-style: none; }
.gpl-faq summary::-webkit-details-marker { display: none; }
.gpl-faq summary::after { content: "+"; float: right; }
.gpl-faq details[open] summary::after { content: "\\2212"; }
.gpl-faq__answer { margin-top: 0.6rem; color: #3f4a3a; }`,
    }),
  },
];

export function getExample(id: string | undefined): PlaygroundExample {
  return examples.find((e) => e.id === id) ?? examples[0]!;
}
