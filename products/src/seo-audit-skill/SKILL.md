---
name: seo-audit-skill
description: Run a complete SEO audit on any e-commerce store or website - technical checks, on-page analysis, content gaps, competitor comparison and a prioritised fix roadmap. Use for auditing Shopify stores, landing pages, blogs and competitor sites. Produces a written audit report with severity-ranked fixes, NOT code changes (unless asked to implement them).
---

# SEO audit - find what's costing you rankings

A structured audit that checks a site the way Google does: can it crawl, is it fast, does each page
answer a real query, is the content better than competitors'. Output = a prioritised fix list,
not a generic "improve your SEO" report.

Works on any public URL. For Shopify stores specifically, knows theme-level vs app-level issues.

---

## Audit scope - decide before starting

Ask or infer:

1. **Full site audit** - homepage + key templates (product, collection, blog) + technical
2. **Page audit** - one specific page/URL deep-dive
3. **Competitor gap** - compare against 1-2 competitor URLs
4. **Technical only** - speed, indexing, schema, mobile (no content review)

Default: full site audit of homepage + 3 representative pages.

## The 5 audit layers (run in order)

### 1. Technical foundation

- robots.txt + sitemap.xml exist and are valid
- Canonical tags correct (no duplicates, no chains)
- HTTPS everywhere, no mixed content
- Mobile-friendly (viewport, tap targets, no horizontal scroll)
- Core Web Vitals estimate: LCP <2.5s, INP <200ms, CLS <0.1 (use PageSpeed Insights API or manual estimate)
- Index status: site: search footprint, manual actions check (ask user for GSC access if available)
- Structured data: Product/Offer schema on product pages, Organization on homepage, Breadcrumbs
- Hreflang if multi-market, pagination handled (rel=next/prev or load-more pattern)

### 2. On-page per template

For EACH page type (home, product, collection, blog, about):

- Title tag: 50-60 chars, primary keyword front-loaded, unique per page
- Meta description: 150-160 chars, compelling, includes CTA or differentiator
- H1: exactly one, matches page intent
- Heading hierarchy: H2/H3 logical, no skipped levels
- Keyword presence: natural, not stuffed (check density ~0.5-2%)
- Image alt text: descriptive, keyword-aware where natural
- Internal links: 3-5 contextual links to related pages
- Content depth: enough to answer the query fully (thin content = ranking ceiling)

### 3. Content & intent

- Does each page target a distinct search intent? (informational vs transactional vs navigational)
- Title/H1 alignment: does the page deliver what the title promises?
- Content gaps: questions the audience asks that no page answers (People Also Ask, related searches)
- Freshness: dates on time-sensitive content, last-updated signals
- E-E-A-T signals: about page, contact info, author credibility, real testimonials

### 4. Shopify-specific (when applicable)

- Theme-level SEO: title/meta templates in theme settings vs hardcoded
- Duplicate content: product descriptions copied from suppliers (huge issue in dropshipping)
- Collection pages: unique intros vs thin category pages
- Blog/content engine: is there one? Most stores have zero content = zero organic traffic
- App bloat: SEO apps slowing the site vs theme-native fixes
- URL structure: /products/, /collections/, /blogs/ clean or messy handles

### 5. Competitive position

- What do ranking competitors have that this site lacks? (content depth, backlinks, schema, page speed)
- Keyword difficulty vs opportunity: are they chasing terms they can't win yet?
- Quick wins: low-competition long-tail terms the site could rank for in 30-60 days

## Output - the audit report

```
# SEO Audit: [domain] - [date]

## Executive summary
[2-3 sentences: biggest issues, biggest opportunities]

## Critical issues (fix first - blocking rankings)
1. [issue] - [evidence] - [fix] - [effort: S/M/L]

## High impact (fix within 2 weeks)
...

## Quick wins (easy + fast results)
...

## Per-page findings
[table: page | title | meta | H1 | issues]

## Content gaps
[queries the audience asks that no page answers]

## 30/60/90-day roadmap
[prioritised actions by timeframe]
```

## Rules

- ALWAYS show evidence - screenshot description, URL, or metric, never "your SEO is bad"
- Prioritise by impact x effort - a 10-minute meta fix ranks above a "rebuild your site" suggestion
- Distinguish "fix now" from "strategic investment" - don't bury quick wins under big projects
- For Shopify stores: always check if the fix is theme-level (free) vs app-level (monthly cost) - recommend theme-first
- Never recommend black-hat tactics (keyword stuffing, link schemes, cloaking, fake reviews)

## References

- `references/checklist.md` - the full technical + on-page checklist
- `references/shopify-seo.md` - Shopify-specific issues and theme-level fixes
- `references/report-template.md` - detailed report structure
- `references/tools.md` - free tools for each audit layer
- `references/self-check.md` - audit quality checklist

---

*Part of GPLMart All-Access - GPL-3.0-or-later - © GPLMart - gplmart.com*

