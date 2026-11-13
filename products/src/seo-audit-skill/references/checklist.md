# Full audit checklist

## Technical

- [ ] HTTPS enforced, no mixed content warnings
- [ ] robots.txt accessible, doesn't block important pages
- [ ] sitemap.xml exists, submitted to GSC, no errors
- [ ] Canonical tags on all indexable pages, self-referencing preferred
- [ ] No duplicate content issues (params, www/non-www, trailing slash)
- [ ] Mobile-friendly test passes (or responsive design verified)
- [ ] Page speed: LCP, INP, CLS within "good" thresholds
- [ ] JavaScript-rendered content: critical content in initial HTML (view-source test)
- [ ] Structured data validates (Google Rich Results Test)
- [ ] No manual actions/coverage issues in GSC (if access available)
- [ ] 404s handled gracefully (custom 404 page, no soft 404s)
- [ ] Redirect chains minimal (1 hop max)

## On-page (per page)

- [ ] Unique title tag, 50-60 chars, keyword-front
- [ ] Unique meta description, 150-160 chars
- [ ] Exactly one H1, matches search intent
- [ ] Logical H2/H3 hierarchy, no skipped levels
- [ ] Primary keyword in title, H1, first 100 words, URL
- [ ] Secondary keywords naturally distributed
- [ ] Image alt text descriptive (not keyword-stuffed)
- [ ] Internal links: 3-5 contextual, descriptive anchor text
- [ ] External links to authoritative sources where relevant
- [ ] Content length sufficient for intent (not thin, not bloated)
- [ ] Readability: short paragraphs, scannable, answered-question format where apt

## Content & intent

- [ ] Page targets a clear, distinct search intent
- [ ] Title promise = page delivery (no clickbait mismatch)
- [ ] Content answers the query completely (check PAA questions)
- [ ] Freshness signals on time-sensitive content
- [ ] E-E-A-T: about/contact/authorship visible
- [ ] No duplicate/thin pages competing for same query
