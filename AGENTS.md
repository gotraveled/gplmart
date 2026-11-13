# GPLMart — project conventions

Next.js App Router + TypeScript + Tailwind v4. Deploys to Vercel via `vercel deploy --prod`.

## Design system (follow for all new pages)

- Shared primitives: `Container`, `PageHeader` (with `crumbs`), `Badge`, `ButtonLink` from `@/components/ui/*`.
- Cards: `rounded-2xl border border-line bg-ink-900/60` (or `/70`), `hover:border-accent/50`, icon in `size-11 rounded-xl border border-accent/30 bg-accent/10 text-accent`.
- Accent = `#c8f542` (lime), secondary = mint `#5eead4`. Dark theme only.
- Base font-size is `16.5px` on `html` (globals.css) — do NOT bump higher; keep text readable but compact.
- Category sections: `font-display text-3xl` headings with `border-t border-line pt-10` separators and `space-y-14` between groups.

## Information architecture

- `/library` = the hub: 6 cards (5 categories + all-access CTA), each linking to a category page.
- Category pages: `/snippets` (Liquid workbench), `/courses`, `/products`, `/ebooks`, `/prompts`, `/skills`.
- `/snippets` and `/playground` share `components/playground/workbench.tsx` — pass `basePath` and `freeTier` props; never fork it.
- Nav (`mainNav` in `lib/site.ts`): Liquid Codes, Courses, Library, AI Skills, Install guide, FAQ. Products is intentionally NOT in nav.
- Footer GPLMart column = utility links only (checker, prompts, install, checkout, members, dashboard). Category links live in Library.

## Content rules

- Snippets/examples live in `lib/playground/examples.ts` (203 components, category field drives grouping).
- Products/ebooks/skills live in `products/catalog.json` + `products/src/<slug>/` — keep them in sync.
- Courses live in `lib/course.ts` + `lib/course-lessons.json`.
- Ebooks must have `book.md` + generated `book.pdf` (run `node scripts/md-to-pdf.mjs` after editing).
- Never claim official Shopify/WP status, ownership, or licensing provenance we can't verify.

## Access & payments

- Checkout is accountless; after Razorpay payment an account is auto-created and credentials emailed.
- Member-only downloads go through `app/access/**` route handlers gated by `hasAccess()`.
- Non-member hitting a gated download gets a 303 redirect to `/checkout?product=<slug>` — keep this pattern.
- Member hub = `/access` + `/dashboard`; both must list every resource category.

## Verify before deploy

`npm run typecheck && npm run lint && npm run build`, then `vercel deploy --prod --yes`. Check key routes return 200 and non-member downloads redirect to checkout.
