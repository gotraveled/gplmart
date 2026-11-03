-- GPLMart Phase 4: guest checkout.
-- Buyers no longer need accounts: Razorpay collects their contact details and
-- access is delivered manually (shared password page). Orders keep customer
-- contact fields for reconciliation; guest orders simply have no entitlement.

alter table public.orders
  alter column user_id drop not null;

alter table public.orders
  add column customer_name text not null default '',
  add column customer_email text not null default '',
  add column customer_phone text not null default '';

-- fulfil: for guest orders (user_id is null) mark the order paid but skip the
-- entitlement row - access is delivered outside the account system.
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

  if o.user_id is not null then
    insert into public.entitlements (user_id, plan, order_id, source)
      values (o.user_id, o.plan, o.id, 'payment')
      on conflict (user_id, plan) do update
        set status = 'active', updated_at = now(),
            order_id = coalesce(public.entitlements.order_id, excluded.order_id);

    insert into public.audit_log (actor_id, action, target, details)
      values (o.user_id, 'entitlement.granted', o.razorpay_order_id,
              jsonb_build_object('payment_id', p_payment_id, 'source', p_source));
  else
    insert into public.audit_log (action, target, details)
      values ('payment.guest_paid', o.razorpay_order_id,
              jsonb_build_object('payment_id', p_payment_id, 'source', p_source,
                                 'email', o.customer_email, 'phone', o.customer_phone));
  end if;

  return 'fulfilled';
end;
$$;

revoke all on function public.fulfill_payment(text, text, integer, text, text) from public, anon, authenticated;
grant execute on function public.fulfill_payment(text, text, integer, text, text) to service_role;
