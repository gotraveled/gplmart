# Price testing - methods that actually work

## A/B price testing

### Method
- Split traffic 50/50 between Price A and Price B
- Run for minimum 2 weeks (need statistical significance)
- Measure: conversion rate, revenue per visitor, total revenue

### What to test
- ₹499 vs ₹599 (20% increase)
- ₹999 vs ₹899 (10% decrease)
- Bundle price vs separate purchase
- Charm pricing (₹499) vs round (₹500)

### Winner criteria
- Higher revenue per visitor = winner (not just higher conversion)
- Example: Price A converts 5% at ₹500 = ₹25/visitor. Price B converts 4% at ₹599 = ₹24/visitor. Price A wins despite lower price.

## Price increase testing

### Soft launch method
- Raise price for NEW visitors only (existing customers keep old price via cookies/accounts)
- Monitor conversion rate for 2 weeks
- If conversion drops <5%: keep new price (small drop, big margin gain)
- If conversion drops >10%: revert or find middle ground

### Announce vs silent
- Silent increase: less backlash, but customers notice anyway
- Announced increase: "Prices increasing next month due to rising costs" = transparency
- Grandfather offer: "Lock in current price for 6 months" = urgency + loyalty

## Anchor testing

### "Was" price testing
- Show "was ₹X" vs no anchor
- "Was" price must be real (was your actual price, or comparable product)
- Test: does anchor increase conversion? By how much?

### Strikethrough vs badge
- "₹999 ₹799" (strikethrough) vs "₹799 SAVE ₹200" (badge)
- Different visual treatments can affect perception

## Bundle vs single testing

- Same products, sold separately vs bundled
- Measure: AOV, conversion rate, total revenue
- Bundle usually wins on AOV, single wins on flexibility

## Testing tools

- **Shopify**: built-in A/B testing via Shopify Scripts or apps (Intelligems, Bold Price)
- **Google Optimize** (deprecated, use VWO/Optimizely)
- **Manual**: different prices on different landing pages, track separately

## Testing rules

- **One variable at a time**: don't change price AND image AND copy simultaneously
- **Statistical significance**: need 100+ conversions per variant minimum
- **Don't test during sales**: clean data requires normal conditions
- **Document everything**: what tested, results, decision, learnings
- **Re-test periodically**: market changes, test winners again in 6-12 months
