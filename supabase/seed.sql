-- DEMONSTRATION DATA ONLY. Small original snippets written for GPLMart so the
-- library UI can be tested. This is NOT the real code library. Replace/extend
-- through /admin/snippets once you have confirmed you may distribute the real set.

insert into public.snippet_categories (slug, name, sort_order) values
  ('product-sections', 'Product sections', 1),
  ('product-page', 'Product page elements', 2),
  ('cart', 'Cart', 3),
  ('collection', 'Collection', 4),
  ('navigation', 'Navigation', 5),
  ('marketing', 'Marketing', 6),
  ('utilities', 'Utilities', 7)
on conflict do nothing;

insert into public.snippets (slug, title, description, category_slug, tags, filename, source, status, code, preview_html) values
('free-shipping-progress', 'Free shipping progress bar',
 'Shows how much more a customer must spend to reach a free shipping threshold.',
 'cart', array['cart','shipping','progress','demo'], 'free-shipping-progress.liquid', 'GPLMart demo (original)', 'published',
$code${%- assign threshold = 5000 | times: 100 -%}
{%- assign remaining = threshold | minus: cart.total_price -%}
<div class="shipping-bar" role="status">
  {%- if remaining > 0 -%}
    <p>Add {{ remaining | money }} more for free shipping.</p>
    <progress max="{{ threshold }}" value="{{ cart.total_price }}"></progress>
  {%- else -%}
    <p>You have unlocked free shipping.</p>
  {%- endif -%}
</div>$code$,
$p$<div style="font-family:system-ui;padding:24px"><p>Add Rs. 1,200.00 more for free shipping.</p><progress max="500000" value="380000" style="width:100%"></progress></div>$p$),

('product-badges', 'Product badges',
 'Renders Sale and Sold out badges from product data.',
 'product-page', array['product','badge','sale','demo'], 'product-badges.liquid', 'GPLMart demo (original)', 'published',
$code${%- if product.available == false -%}
  <span class="badge badge--soldout">Sold out</span>
{%- elsif product.compare_at_price > product.price -%}
  <span class="badge badge--sale">Sale</span>
{%- endif -%}$code$,
$p$<div style="font-family:system-ui;padding:24px"><span style="background:#e11d48;color:#fff;padding:4px 10px;border-radius:999px;font-size:12px">Sale</span> <span style="background:#475569;color:#fff;padding:4px 10px;border-radius:999px;font-size:12px">Sold out</span></div>$p$),

('breadcrumbs', 'Breadcrumb navigation',
 'Accessible breadcrumbs for product, collection and page templates.',
 'navigation', array['navigation','breadcrumbs','a11y','demo'], 'breadcrumbs.liquid', 'GPLMart demo (original)', 'published',
$code$<nav aria-label="Breadcrumb">
  <ol class="breadcrumbs">
    <li><a href="{{ routes.root_url }}">Home</a></li>
    {%- if collection -%}
      <li><a href="{{ collection.url }}">{{ collection.title | escape }}</a></li>
    {%- endif -%}
    {%- if product -%}
      <li aria-current="page">{{ product.title | escape }}</li>
    {%- endif -%}
  </ol>
</nav>$code$,
$p$<div style="font-family:system-ui;padding:24px;font-size:14px">Home / Summer / <strong>Linen shirt</strong></div>$p$),

('announcement-bar', 'Announcement bar section',
 'A theme section with editable text and link for a top-of-page message.',
 'marketing', array['marketing','section','announcement','demo'], 'announcement-bar.liquid', 'GPLMart demo (original)', 'published',
$code$<div class="announcement" style="background: {{ section.settings.bg }}">
  {%- if section.settings.link != blank -%}<a href="{{ section.settings.link }}">{%- endif -%}
  {{ section.settings.text | escape }}
  {%- if section.settings.link != blank -%}</a>{%- endif -%}
</div>
{% schema %}
{
  "name": "Announcement bar",
  "settings": [
    { "type": "text", "id": "text", "label": "Text", "default": "Welcome to our store" },
    { "type": "url", "id": "link", "label": "Link" },
    { "type": "color", "id": "bg", "label": "Background", "default": "#111827" }
  ]
}
{% endschema %}$code$,
$p$<div style="font-family:system-ui;background:#111827;color:#fff;text-align:center;padding:10px;font-size:14px">Welcome to our store</div>$p$),

('collection-product-count', 'Collection product count',
 'Displays the number of products in the current collection with correct pluralisation.',
 'collection', array['collection','count','demo'], 'collection-product-count.liquid', 'GPLMart demo (original)', 'published',
$code$<p class="collection-count">
  {{ collection.products_count }}
  {% if collection.products_count == 1 %}product{% else %}products{% endif %}
</p>$code$,
$p$<div style="font-family:system-ui;padding:24px">24 products</div>$p$),

('featured-product-section', 'Featured product section',
 'A section that highlights a chosen product with image, title, price and button.',
 'product-sections', array['section','product','featured','demo'], 'featured-product.liquid', 'GPLMart demo (original)', 'published',
$code${%- assign p = section.settings.product -%}
{%- if p != blank -%}
<section class="featured-product">
  {{ p.featured_image | image_url: width: 600 | image_tag: loading: 'lazy' }}
  <h2>{{ p.title | escape }}</h2>
  <p>{{ p.price | money }}</p>
  <a class="button" href="{{ p.url }}">View product</a>
</section>
{%- endif -%}
{% schema %}
{
  "name": "Featured product",
  "settings": [{ "type": "product", "id": "product", "label": "Product" }]
}
{% endschema %}$code$,
$p$<div style="font-family:system-ui;padding:24px"><div style="height:80px;background:#e5e7eb;border-radius:8px"></div><h3>Linen shirt</h3><p>Rs. 2,499.00</p><a style="background:#111827;color:#fff;padding:8px 14px;border-radius:6px;display:inline-block">View product</a></div>$p$),

('safe-image-or-placeholder', 'Image with placeholder fallback',
 'Outputs a responsive image or a placeholder SVG when no image is set.',
 'utilities', array['utility','image','placeholder','demo'], 'safe-image.liquid', 'GPLMart demo (original)', 'published',
$code${%- if image != blank -%}
  {{ image | image_url: width: 800 | image_tag: loading: 'lazy', alt: image.alt | escape }}
{%- else -%}
  {{ 'product-1' | placeholder_svg_tag: 'placeholder' }}
{%- endif -%}$code$,
$p$<div style="font-family:system-ui;padding:24px"><div style="height:80px;background:#e5e7eb;border-radius:8px;display:grid;place-items:center;color:#6b7280">placeholder</div></div>$p$)
on conflict (slug) do nothing;
