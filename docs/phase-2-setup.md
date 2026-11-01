# Phase 2 setup: all-access membership

## Architecture

- **Auth**: Supabase email/password via `@supabase/ssr`. `proxy.ts` refreshes sessions and redirects anonymous users from `/account`, `/access`, `/checkout`, `/admin`, `/payment`. Every protected page and route handler re-checks on the server (`lib/auth.ts`).
- **Payments**: `POST /api/checkout/order` creates the Razorpay order using only the server-side offer (`lib/offer.ts`, env `ALL_ACCESS_PRICE_PAISE`). `POST /api/checkout/verify` checks the HMAC signature, order ownership, then fetches the payment from Razorpay and compares order id, amount and currency before fulfilling.
- **Webhook**: `POST /api/webhooks/razorpay` verifies `X-Razorpay-Signature` over the raw body, stores the event id (primary key), and fulfils on `payment.captured` / `order.paid`. Duplicates are ignored; failures return 500 so Razorpay retries.
- **Idempotent fulfilment**: Postgres function `fulfill_payment` locks the order row, enforces amount/currency, and upserts a single entitlement (`unique(user_id, plan)`, `unique(order_id)`, `unique(razorpay_payment_id)`). Only the service role may execute it.
- **Closed-browser case**: the webhook grants access even if the customer never reaches `/payment/success`.
- **Content gating**: access = active entitlement AND setting `content_ready = true` (admins can preview). The Drive URL is read from the `settings` table only after that decision; snippet code is fetched only for the opened snippet, from server components / a route handler. No protected data lives in static files, public APIs or client bundles.
- **Preview safety**: snippet previews render static HTML in `<iframe sandbox="">` with a CSP of `default-src 'none'`. Liquid is never executed.

## Setup steps

1. Create a Supabase project. Run `supabase/migrations/0001_membership.sql` in the SQL editor (or `supabase db push`). Optionally run `supabase/seed.sql` (small ORIGINAL demo snippets, not the real library).
2. In Supabase Auth settings add your site URL and `https://<domain>/auth/callback` to the redirect allow-list. Keep email confirmation on.
3. Make yourself admin (after signing up once):
   ```sql
   insert into public.admins (user_id) select id from auth.users where email = 'you@example.com';
   ```
   Admin rights live only in this table, which has no client access.
4. Set env vars from `.env.example` in Vercel (and `.env.local` locally). Never commit them.
5. Razorpay (test mode first): create test API keys; add a webhook to `https://<domain>/api/webhooks/razorpay` with a secret, events `payment.captured`, `order.paid`, `payment.failed`.
6. Sign in as admin, open `/admin/settings`, paste the Drive URL, record licensing evidence, and only then tick **Content ready**. In test mode, checkout works before this; in live mode it stays closed until content is ready.

## Google Drive caveat

Sharing settings: use a folder shared as "Anyone with the link" (viewer), or share with specific Google accounts (more secure but you must add each buyer). The site only controls who is shown the link. A link can be forwarded, so files are not individually protected once shared. Do not claim otherwise.

## Importing the real library

Add snippets in `/admin/snippets` or insert rows into `public.snippets` (slug, title, category_slug, code, preview_html, status = `published`). Bulk import: write a SQL/CSV import using the service role. Only publish after rights are confirmed.

## Not yet built

Offer display content editing in admin (price is env-configured), customer search/pagination, automated refund/revocation handling, durable (Redis) rate limiting, email notifications.
