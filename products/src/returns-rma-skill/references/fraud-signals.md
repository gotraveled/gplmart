# Fraud signals - red flags and prevention

## Return fraud types (India ecommerce)

### Wardrobing (fashion, ~40% of fashion returns are fraud-adjacent)
- Buy → wear to event → return as "unused"
- Prevention: tags must be attached, visible wear = reject, return window short for fashion

### Empty box / switch fraud
- Claim return, send empty box or cheaper item
- Prevention: weight check at pickup, SKU verification on receipt, photos required

### Serial returners
- Same customer returns 30%+ of orders repeatedly
- Prevention: track return rate per customer, flag >30%, require advance for flagged customers

### Price switching
- Order expensive item, return cheap item claiming it was sent
- Prevention: SKU/barcode verification on receipt, compare returned item to order

### Fake damage claims
- Claim item arrived damaged to get free replacement/refund
- Prevention: unboxing video encouraged, damage photos required, courier insurance claims for transit damage

### Bracketing (fashion)
- Order 3 sizes, return 2, keep 1
- Prevention: limit size variants per order for flagged categories, or charge restocking on multiple returns

## Risk scoring signals

Flag for manual review when 2+ signals present:

| Signal | Risk weight |
|---|---|
| New account (<7 days) + immediate return | High |
| Return rate >30% historically | High |
| High-value item (>₹2000) + vague reason | Medium |
| COD order + return claim | Medium |
| Multiple returns same week | Medium |
| Different address than shipping | Low-Medium |
| Reason = "didn't like" on branded/premium item | Low |
| Damage claim without photos | High |

## Prevention rules

- First return: generous, approve fast (build trust)
- Second return within 30 days: manual review required
- Third return: require advance payment for future orders or restrict to exchange-only
- Damage claims: photos/video required within 48 hours
- COD orders: extra verification on returns (higher fraud rate)

## Legal note

Document everything: return condition photos, inspection results, communication logs. If dispute escalates to consumer court, documentation wins.
