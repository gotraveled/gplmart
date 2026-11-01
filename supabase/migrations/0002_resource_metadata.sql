-- GPLMart Phase 3: resource metadata and license gating.
-- Adds the metadata admins need to run the library, and blocks publishing paid
-- content until redistribution rights are reviewed. GPLMart's own demo examples
-- (is_demo) are original work and need no clearance.
--
-- NOTE: if this migration fails on publish_requires_license, published rows
-- exist that have not been rights-reviewed. Set license_status='cleared' (with
-- evidence) or switch them to draft first.

alter table public.snippets
  add column is_demo boolean not null default false,
  add column version text not null default '',
  add column compatibility text not null default '',
  add column documentation text not null default '',
  add column license_status text not null default 'unreviewed'
    check (license_status in ('unreviewed', 'cleared'));

-- Rows previously marked with the "demo" tag convention become real demos.
update public.snippets set is_demo = true where 'demo' = any(tags);

alter table public.snippets
  add constraint publish_requires_license
  check (status <> 'published' or is_demo or license_status = 'cleared');
