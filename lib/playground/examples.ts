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
    name: "Delivery estimate checker",
    description: "A postcode field that validates input and shows an estimated delivery date. Adapted from a real storefront build.",
    category: "Trust & store information",
    kind: "snippet",
    controls: [
      { id: "heading", label: "Heading", type: "text", maxLength: 40 },
      { id: "fast", label: "Fast zone (days)", type: "select", options: [{ value: "2", label: "2" }, { value: "3", label: "3" }] },
      { id: "slow", label: "Default (days)", type: "select", options: [{ value: "5", label: "5" }, { value: "7", label: "7" }] },
      { id: "accent", label: "Accent", type: "color" },
    ],
    defaults: { heading: "Estimated delivery time", fast: "2", slow: "5", accent: "#0f172a" },
    install: snippetSteps("delivery-estimator.liquid"),
    files: (v) => ({
      liquid: `{%- comment -%}
  Postcode delivery estimate. The day ranges in the JS below are examples —
  adjust them to match your own courier zones before going live.
{%- endcomment -%}
<div
  class="gpl-delivery"
  data-gpl-delivery
  data-fast-days="${v.fast ?? 2}"
  data-slow-days="${v.slow ?? 5}"
  style="--gpl-accent: {{ accent | default: '${hex(v, "accent")}' }};"
>
  <span class="gpl-delivery__title">${str(v, "heading", 40)}</span>
  <div class="gpl-delivery__field" data-field>
    <input
      type="tel"
      inputmode="numeric"
      maxlength="6"
      placeholder="Enter 6-digit PIN code"
      autocomplete="postal-code"
      aria-label="Enter delivery PIN code"
      data-input
    >
    <button type="button" class="gpl-delivery__check" data-check>Check</button>
  </div>
  <p class="gpl-delivery__error" data-error role="alert" hidden>Please enter a valid 6-digit PIN code.</p>
  <div class="gpl-delivery__result" data-result hidden>
    <span>Estimated delivery <strong data-date></strong></span>
    <button type="button" class="gpl-delivery__change" data-change>Change</button>
  </div>
</div>`,
      css: `.gpl-delivery { width: 100%; max-width: 36rem; margin: 0.75rem 0; }
.gpl-delivery__title { display: block; margin-bottom: 0.45rem; font-size: 0.95rem; }
.gpl-delivery__field {
  display: flex;
  overflow: hidden;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: #fff;
}
.gpl-delivery__field:focus-within { border-color: var(--gpl-accent); box-shadow: 0 0 0 3px rgb(15 23 42 / 0.08); }
.gpl-delivery__field input { flex: 1; min-width: 0; height: 46px; border: 0; padding: 0 14px; font-size: 0.85rem; outline: 0; }
.gpl-delivery__check {
  flex: 0 0 5rem;
  border: 0;
  border-left: 1px solid #e2e8f0;
  background: #f8fafc;
  font-weight: 600;
  cursor: pointer;
}
.gpl-delivery__check:hover { background: var(--gpl-accent); color: #fff; }
.gpl-delivery__error { margin: 0.4rem 0 0; color: #b4234d; font-size: 0.75rem; }
.gpl-delivery__result {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.7rem 0.9rem;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  font-size: 0.85rem;
}
.gpl-delivery__change { border: 0; background: none; color: var(--gpl-accent); font-weight: 600; text-decoration: underline; cursor: pointer; }
.gpl-delivery__result[hidden], .gpl-delivery__error[hidden] { display: none; }`,
      js: `document.querySelectorAll('[data-gpl-delivery]').forEach((box) => {
  const input = box.querySelector('[data-input]');
  const field = box.querySelector('[data-field]');
  const error = box.querySelector('[data-error]');
  const result = box.querySelector('[data-result]');
  const dateEl = box.querySelector('[data-date]');
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
    dateEl.textContent = formatDate(daysFor(pin));
    field.style.display = 'none';
    result.hidden = false;
  }
  box.querySelector('[data-check]').addEventListener('click', check);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
  input.addEventListener('input', () => { input.value = input.value.replace(/\\D/g, ''); error.hidden = true; });
  box.querySelector('[data-change]').addEventListener('click', () => {
    result.hidden = true;
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
.gpl-coupon__subtitle { margin: 0.2rem 0 0; color: #64748b; font-size: 0.75rem; }
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
    controls: [
      { id: "accent", label: "Icon colour", type: "color" },
      { id: "columns", label: "Columns", type: "select", options: [{ value: "2", label: "2" }, { value: "4", label: "4" }] },
    ],
    defaults: { accent: "#166534", columns: "2" },
    install: sectionSteps,
    files: (v) => ({
      liquid: `{%- if section.blocks.size > 0 -%}
  <ul class="gpl-trustgrid gpl-trustgrid--{{ section.settings.columns }}" style="--gpl-accent: {{ section.settings.accent }};">
    {%- for block in section.blocks -%}
      <li class="gpl-trustgrid__card" {{ block.shopify_attributes }}>
        <span class="gpl-trustgrid__icon" aria-hidden="true">
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
    { "type": "color", "id": "accent", "label": "Icon colour", "default": ${js(hex(v, "accent"))} },
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
  border-radius: 10px;
  color: var(--gpl-accent);
  background: color-mix(in srgb, var(--gpl-accent) 8%, #fff);
}
.gpl-trustgrid__icon svg { width: 1.3rem; height: 1.3rem; }
.gpl-trustgrid__text { display: grid; min-width: 0; }
.gpl-trustgrid__text strong { font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.gpl-trustgrid__text span { font-size: 0.75rem; color: #64748b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }`,
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
  <div class="gpl-price" data-gpl-price style="--gpl-accent: {{ accent | default: '${hex(v, "accent")}' }};">
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
.gpl-price__note { color: #64748b; font-size: 0.75rem; }
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
  color: #64748b;
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
  border-radius: 999px;
  background: #0f172a;
  color: #fff;
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
  max-width: 30rem;
  margin: 0 auto;
  padding: 1.25rem 1.5rem;
  border-radius: 14px;
  background: #0f172a;
  color: #fff;
  text-align: center;
  overflow: hidden;
}
.gpl-cd__card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 15%;
  right: 15%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gpl-accent), transparent);
}
.gpl-cd__badge {
  display: inline-block;
  border: 1px solid rgb(251 191 36 / 0.4);
  background: rgb(245 158 11 / 0.12);
  color: #fbbf24;
  border-radius: 999px;
  padding: 0.2rem 0.7rem;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.gpl-cd__heading { margin: 0.4rem 0 0; color: #94a3b8; font-size: 0.85rem; }
.gpl-cd__clock { display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-top: 0.9rem; }
.gpl-cd__slot { display: grid; gap: 0.25rem; }
.gpl-cd__slot b {
  display: grid;
  place-items: center;
  width: 3.4rem;
  height: 2.9rem;
  border: 1px solid rgb(148 163 184 / 0.25);
  border-radius: 9px;
  background: rgb(2 6 23 / 0.8);
  font-family: ui-monospace, monospace;
  font-size: 1.35rem;
  font-weight: 800;
}
.gpl-cd__slot--accent b { border-color: rgb(200 245 66 / 0.5); color: var(--gpl-accent); }
.gpl-cd__slot small { color: #64748b; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
.gpl-cd__colon { color: #64748b; font-weight: 700; }
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
    <strong class="gpl-stars__score">{{ rating }}</strong>
    {%- if rcount > 0 -%}
      <span class="gpl-stars__count">({{ rcount }} reviews)</span>
    {%- endif -%}
  </div>
{%- endif -%}`,
      css: `.gpl-stars { display: inline-flex; align-items: center; gap: 0.5rem; }
.gpl-stars__icons { position: relative; display: inline-block; color: #d1d5db; letter-spacing: 0.1em; font-size: 1rem; line-height: 1; }
.gpl-stars__icons::before {
  content: "\\2605\\2605\\2605\\2605\\2605";
  position: absolute;
  left: 0;
  top: 0;
  width: calc(var(--gpl-rating) / 5 * 100%);
  overflow: hidden;
  white-space: nowrap;
  color: #f59e0b;
}
.gpl-stars__score { font-size: 0.9rem; }
.gpl-stars__count { color: #64748b; font-size: 0.8rem; }`,
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
  gap: 0.5rem;
  margin: 0.5rem 0;
  padding: 0.55rem 0.9rem;
  border: 1px solid rgb(239 68 68 / 0.35);
  border-radius: 9px;
  background: rgb(239 68 68 / 0.08);
  color: #b91c1c;
  font-size: 0.82rem;
  font-weight: 600;
}
.gpl-stock__dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: #ef4444;
  animation: gpl-stock-pulse 1.4s ease-in-out infinite;
}
@keyframes gpl-stock-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.45; transform: scale(1.3); }
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
    controls: [
      { id: "label", label: "Button label", type: "text", maxLength: 20 },
      { id: "accent", label: "Button colour", type: "color" },
    ],
    defaults: { label: "Add to cart", accent: "#111827" },
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
  <div class="gpl-buybar" data-gpl-buybar style="--gpl-accent: {{ accent | default: '${hex(v, "accent")}' }};">
    <div class="gpl-buybar__price">
      <strong>{{ v.price | money }}</strong>
      {%- if v.compare_at_price > v.price -%}
        <s>{{ v.compare_at_price | money }}</s>
      {%- endif -%}
    </div>
    <button type="button" class="gpl-buybar__cta" data-gpl-buy>${str(v, "label", 20)}</button>
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
    background: rgb(255 255 255 / 0.95);
    border-top: 1px solid #e2e8f0;
    backdrop-filter: blur(12px);
  }
  .gpl-buybar__price { display: flex; align-items: baseline; gap: 0.4rem; }
  .gpl-buybar__price strong { font-size: 1.1rem; font-weight: 800; }
  .gpl-buybar__price s { color: #94a3b8; font-size: 0.8rem; }
  .gpl-buybar__cta {
    border: 0;
    border-radius: 999px;
    background: var(--gpl-accent);
    color: #fff;
    padding: 0.7rem 1.4rem;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
  }
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
];

export function getExample(id: string | undefined): PlaygroundExample {
  return examples.find((e) => e.id === id) ?? examples[0]!;
}
