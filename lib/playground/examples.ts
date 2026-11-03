import type { PlaygroundExample, Values } from "./types";

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

/** Free samples: fully open in the playground. Everything else previews freely but the code is for members. */
export const freeExampleIds: ReadonlySet<string> = new Set([
  "countdown-timer",
  "star-rating",
  "free-shipping-bar",
  "trust-grid",
  "quantity-breaks",
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
    category: "Storefront sections",
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
    category: "Trust & store information",
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
    category: "Promotions & banners",
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
    category: "Trust & store information",
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
    category: "Promotions & banners",
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
    category: "Promotions & banners",
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
    category: "Trust & store information",
    kind: "snippet",
    controls: [
      { id: "stars", label: "Preview stars", type: "select", options: [{ value: "4.9", label: "4.9" }, { value: "4.5", label: "4.5" }, { value: "3.5", label: "3.5" }] },
      { id: "count", label: "Review count", type: "text", maxLength: 10 },
    ],
    defaults: { stars: "4.9", count: "1,480" },
    install: [
      "Back up your theme (Online Store > Themes > Actions > Duplicate) before changing any code.",
      "Install a review app that writes to the standard product.metafields.reviews.rating and rating_count metafields (most review apps do).",
      "Create snippets/star-rating.liquid, paste the Liquid code, and add the CSS to your theme stylesheet or a {% stylesheet %} tag.",
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
      "Create snippets/stock-pulse.liquid, paste the Liquid code, and add the CSS to your theme stylesheet or a {% stylesheet %} tag.",
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
      "Create snippets/sticky-buy-bar.liquid, paste the Liquid code, and add the CSS + JS to your theme.",
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
      "Create snippets/free-shipping-bar.liquid, paste the Liquid code, and add the CSS to your theme stylesheet or a {% stylesheet %} tag.",
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
    category: "Promotions & banners",
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
      "Create snippets/quantity-breaks.liquid, paste the Liquid code, and add the CSS and JS to your theme.",
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
      "Create snippets/recently-viewed.liquid, paste the code, and add the CSS and JS to your theme.",
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
      "Create snippets/sold-out-notify.liquid, paste the code, and add the CSS to your theme.",
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
    category: "Utilities",
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
    category: "Utilities",
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
    category: "Utilities",
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
    category: "Promotions & banners",
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
    category: "Social proof",
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
    <li><a href="/" class="gpl-crumbs__link">Home</a></li>
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
      <form method="post" action="/cart/add">
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
      {%- assign p = all_products[block.settings.product] -%}
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
];

export function getExample(id: string | undefined): PlaygroundExample {
  return examples.find((e) => e.id === id) ?? examples[0]!;
}
