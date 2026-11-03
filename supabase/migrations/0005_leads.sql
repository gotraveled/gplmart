-- Free-resource email capture (lead magnet signups). Not tied to payments.
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null check (char_length(email) between 5 and 200),
  source text not null default 'prompts',
  created_at timestamptz not null default now()
);

create unique index if not exists leads_email_source_key on public.leads (email, source);

-- Only the server (service role) writes. No client read needed.
alter table public.leads enable row level security;
