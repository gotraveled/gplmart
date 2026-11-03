-- Optional add-on recorded on guest orders (e.g. paid install service).
alter table public.orders
  add column if not exists addon text;

comment on column public.orders.addon is 'Optional add-on purchased with the order, e.g. install_service. Null = none.';
