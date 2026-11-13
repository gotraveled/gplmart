# Shopify-specific SEO issues

## Theme-level vs app-level

Most Shopify SEO "problems" are theme settings, not missing apps. Check theme first:

- **Title/meta templates**: Online Store > Themes > Edit code > theme.liquid OR theme settings - check if titles are hardcoded or use {{ page_title }} variables
- **Duplicate product descriptions**: supplier-copied descriptions = duplicate content across thousands of stores. Rewrite at least title + first paragraph uniquely.
- **Collection intro content**: empty collection pages = thin content. Add 100-300 word unique intro per collection.
- **Blog/content**: most stores have ZERO blog = zero informational keywords. Even 2 posts/month compounds.
- **URL handles**: check /products/, /collections/, /blogs/ handles are clean, not auto-generated gibberish
- **Image alt text**: Shopify auto-generates from filenames - fix filenames BEFORE upload (blue-widget-product.jpg not IMG_4521.jpg)

## Common Shopify SEO killers

1. **App bloat**: 15+ apps each injecting scripts = slow site. Audit apps quarterly - remove unused.
2. **Duplicate title tags**: product variants sharing one title. Fix via theme template or SEO app.
3. **No structured data**: product schema missing = no rich snippets. Check with Rich Results Test.
4. **Pagination issues**: ?page=2 duplicate content. Use rel=next/prev or infinite scroll with care.
5. **Thin category pages**: collections with just products and no intro text.
6. **No Google Search Console**: flying blind on indexing/coverage issues.

## The dropshipping SEO trap

Supplier descriptions copied verbatim = thousands of identical pages across the web. Google sees
them as duplicate/low-value. The fix isn't an app - it's rewriting. Even 100 unique words per
product beats copied text.
