# GPLMart

Storefront for GPLMart.com, a digital products and resources marketplace. Phase 1: static storefront with a demo catalogue (no payments, accounts or downloads).

## Stack

Next.js (App Router), TypeScript (strict), Tailwind CSS v4, Lucide icons, Vitest.

## Scripts

```bash
npm install
npm run dev        # local dev server
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm test           # vitest
```

## Structure

- `app/` routes, layout, sitemap, robots, error and not-found pages
- `components/layout|products|ui/` shared components
- `data/` typed demo categories and products (all placeholder content)
- `lib/` utilities, catalogue filtering/sorting logic and site config

## Configuration

Copy `.env.example` to `.env.local` if needed. `NEXT_PUBLIC_SITE_URL` sets canonical/sitemap URLs; `NEXT_PUBLIC_ANNOUNCEMENT` sets the announcement bar text.

## Deployment

Vercel detects Next.js automatically; no `vercel.json` is required. Set `NEXT_PUBLIC_SITE_URL` in the Vercel project settings.

## Content notice

All products and policy pages are placeholders pending business review.
