-- GPLMart Phase 2: one-time all-access membership.
-- All tables have RLS enabled. Customers can only read their own orders and
-- entitlement. Everything else is reachable only through the service-role key
-- on the server. Protected content (snippet code, delivery URL) has NO policy
-- for anon/authenticated roles on purpose.

create extension if not exists pgcrypto;

-- Admin allowlist. Rows are inserted manually via SQL (see docs). No client policy.
create table public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete restrict,
  plan text not null default 'all_access',
  razorpay_order_id text not null unique,
  razorpay_payment_id text unique,
  amount_paise integer not null check (amount_paise > 0),
  currency text not null check (currency = 'INR'),
  status text not null default 'created'
    check (status in ('created', 'paid', 'failed', 'mismatch')),
  failure_reason text,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);
create index orders_user_idx on public.orders (user_id);

create table public.entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  plan text not null default 'all_access',
  status text not null default 'active' check (status in ('active', 'revoked')),
  order_id uuid unique references public.orders (id),
  source text not null default 'payment' check (source in ('payment', 'admin')),
  granted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, plan)
);

create table public.webhook_events (
  event_id text primary key,
  event_type text not null,
  payload jsonb not null,
  received_at timestamptz not null default now(),
  processed_at timestamptz,
  result text,
  error text
);

create table public.settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id)
);
insert into public.settings (key, value) values
  ('content_ready', 'false'),
  ('drive_url', ''),
  ('license_evidence', '')
on conflict do nothing;

create table public.snippet_categories (
  slug text primary key,
  name text not null,
  sort_order integer not null default 0
);

create table public.snippets (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  description text not null default '',
  category_slug text not null references public.snippet_categories (slug),
  tags text[] not null default '{}',
  code text not null,
  filename text not null default 'snippet.liquid',
  preview_html text not null default '',
  source text not null default '',
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index snippets_category_idx on public.snippets (category_slug);

create table public.audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid,
  action text not null,
  target text,
  details jsonb not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;
alter table public.orders enable row level security;
alter table public.entitlements enable row level security;
alter table public.webhook_events enable row level security;
alter table public.settings enable row level security;
alter table public.snippet_categories enable row level security;
alter table public.snippets enable row level security;
alter table public.audit_log enable row level security;

create policy "own orders" on public.orders
  for select to authenticated using (user_id = (select auth.uid()));
create policy "own entitlement" on public.entitlements
  for select to authenticated using (user_id = (select auth.uid()));

revoke all on all tables in schema public from anon, authenticated;
grant select on public.orders, public.entitlements to authenticated;

-- Atomic, idempotent fulfilment. Called only by the server with the service role,
-- after the payment has been verified against Razorpay.
create or replace function public.fulfill_payment(
  p_razorpay_order_id text,
  p_payment_id text,
  p_amount_paise integer,
  p_currency text,
  p_source text
) returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  o public.orders;
begin
  select * into o from public.orders where razorpay_order_id = p_razorpay_order_id for update;
  if not found then
    return 'order_not_found';
  end if;

  if o.amount_paise <> p_amount_paise or o.currency <> p_currency then
    update public.orders
      set status = 'mismatch', failure_reason = 'amount or currency mismatch'
      where id = o.id and status <> 'paid';
    insert into public.audit_log (action, target, details)
      values ('payment.mismatch', o.razorpay_order_id,
              jsonb_build_object('expected', o.amount_paise, 'got', p_amount_paise, 'currency', p_currency));
    return 'amount_mismatch';
  end if;

  if o.status = 'paid' then
    if o.razorpay_payment_id is distinct from p_payment_id then
      insert into public.audit_log (action, target, details)
        values ('payment.extra_payment', o.razorpay_order_id,
                jsonb_build_object('payment_id', p_payment_id, 'source', p_source));
      return 'already_paid_other_payment';
    end if;
    return 'already_fulfilled';
  end if;

  update public.orders
    set status = 'paid', razorpay_payment_id = p_payment_id, paid_at = now(), failure_reason = null
    where id = o.id;

  insert into public.entitlements (user_id, plan, order_id, source)
    values (o.user_id, o.plan, o.id, 'payment')
    on conflict (user_id, plan) do update
      set status = 'active', updated_at = now(),
          order_id = coalesce(public.entitlements.order_id, excluded.order_id);

  insert into public.audit_log (actor_id, action, target, details)
    values (o.user_id, 'entitlement.granted', o.razorpay_order_id,
            jsonb_build_object('payment_id', p_payment_id, 'source', p_source));
  return 'fulfilled';
end;
$$;

revoke all on function public.fulfill_payment(text, text, integer, text, text) from public, anon, authenticated;
grant execute on function public.fulfill_payment(text, text, integer, text, text) to service_role;
grant all on all tables in schema public to service_role;
grant usage, select on all sequences in schema public to service_role;
