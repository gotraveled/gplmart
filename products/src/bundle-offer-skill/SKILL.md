---
name: bundle-offer-skill
description: Design and implement bundle offers that increase average order value - bundle types, pricing math, Shopify/marketplace implementation, promotion strategy and bundle performance tracking. Use for creating product bundles, kits, gift sets, or "frequently bought together" offers.
---

# Bundle offers - sell more per order, not just more orders

Bundles increase average order value (AOV) without needing more traffic. A customer buying 1 item
at ₹500 vs a bundle at ₹899 = 80% more revenue per transaction. This skill designs bundles that
customers actually want - not just forced combos.

---

## Intake - one batch

1. Product catalog: what products do you have?
2. Current AOV (average order value)
3. Top sellers vs slow movers (which products move, which sit?)
4. Product relationships: what complements what? (lunch box + water bottle, serum + moisturizer)
5. Platform: Shopify / marketplace / both
6. Goal: increase AOV / move slow stock / launch new products / seasonal sales
7. Margin constraints: minimum margin per bundle

## Bundle types (pick the right one)

### 1. Pure bundle (only sold together)

Products that only make sense together:
- Skincare routine: cleanser + toner + moisturizer + sunscreen
- Cooking kit: pan + spatula + tongs + apron
- Gym starter: mat + resistance bands + water bottle

**Why it works**: complete solution, higher perceived value, can't buy separately

### 2. Mixed bundle (buy X get Y discount)

"Buy 2 shirts get 20% off pants" or "Buy laptop get 15% off accessories"

**Why it works**: cross-sell complementary categories, increase items per order

### 3. Quantity break

"Buy 1 = ₹499, Buy 2 = ₹899, Buy 3 = ₹1,199"

**Why it works**: bulk buyers save, you move volume, consumables reorder

### 4. Gift bundle

"Buy [product], get free [accessory]" or "Gift set: product + wrapping + card"

**Why it works**: adds perceived value without discounting main product, perfect for gifting season

### 5. Mystery/surprise bundle

"Surprise bundle - 3 products for ₹999" (worth ₹1,500)

**Why it works**: excitement, moves slow movers, creates urgency ("while stock lasts")

### 6. Seasonal bundle

Diwali gift set, summer essentials, back-to-school kit, wedding season package

**Why it works**: timely relevance, gift-giving angle, clears seasonal stock

## Bundle pricing math

### The formula

```
Bundle price = (Sum of individual prices) x (1 - bundle_discount%)

Example:
Product A: ₹500
Product B: ₹300  
Product C: ₹200
Individual total: ₹1,000

Bundle options:
- 10% off: ₹900 (save ₹100)
- 15% off: ₹850 (save ₹150)
- 20% off: ₹800 (save ₹200)

Sweet spot: 10-15% off - enough to feel like a deal, not enough to kill margin
```

### Margin check

```
Bundle COGS = sum of individual COGS
Bundle margin = (Bundle price - Bundle COGS) / Bundle price

Must maintain minimum margin (typically 40-50%)
If bundle discount drops margin below target → reduce discount or raise bundle price
```

## What to bundle (the strategy)

### High-AOV strategy
- Bundle bestsellers together (products that already sell)
- Add slow movers as bonus items ("buy X get Y free")
- Create "complete solution" bundles (everything needed for a task)

### Slow mover clearance
- Bundle slow products with bestsellers
- "Buy [bestseller], get [slow mover] 50% off"
- Mystery bundles featuring slow stock

### New product launch
- Bundle new product with established bestsellers
- "Try our new [product] - bundle with [bestseller] at special price"
- Early access bundles for loyal customers

### Seasonal strategy
- Festival gift sets (Diwali, Eid, Christmas)
- Seasonal essentials (summer care kit, winter warmers)
- Back-to-school/work packs

## Implementation by platform

### Shopify

**Option 1: Shopify Bundles app (free)**
- Create bundle products in admin
- Set bundle price and component products
- Inventory syncs automatically
- Best for: simple bundles

**Option 2: Bundle apps (Bold Bundles, Frequently Bought Together)**
- More features: mixed bundles, quantity breaks, upsells
- "Frequently bought together" recommendations
- A/B testing bundle offers

**Option 3: Manual bundle products**
- Create single product with bundle variants
- Set price manually
- Best for: simple fixed bundles

### Marketplaces (Amazon/Flipkart/Meesho)

- Create virtual bundle products
- Use "frequently bought together" features
- Quantity discounts via seller tools
- Gift sets as separate product listings

## Bundle promotion strategy

### On-site
- Homepage banner: "Bundle & Save 15%"
- Product page: "Frequently bought together" section
- Cart page: "Complete your order with..." upsell
- Collection page: dedicated "Bundles" collection

### Email/WhatsApp
- "Bundle deal this week" broadcasts
- Post-purchase: "Customers who bought X also bought Y - bundle and save"
- Win-back: "Special bundle offer just for you"

### Ads
- Bundle-specific ad creatives (show all items + savings)
- "Buy X get Y" offer in ad copy
- Bundle landing pages for ad traffic

## Bundle performance tracking

### Metrics to track

| Metric | What it tells you |
|---|---|
| Bundle AOV vs single AOV | Is bundling increasing order value? |
| Bundle conversion rate vs single | Do bundles convert better or worse? |
| Bundle margin vs single margin | Are bundles profitable? |
| Bundle attach rate | How often is bundle chosen over single? |
| Bundle product mix | Which bundles perform best? |

### Optimization

- Kill underperforming bundles (low conversion, low margin)
- Double down on winners (high conversion, good margin)
- Test bundle prices (10% vs 15% vs 20% off)
- Test bundle compositions (which products work together?)
- Seasonal bundle refresh (update for festivals/trends)

## References

- `references/bundle-types.md` - detailed breakdown of each bundle type
- `references/pricing-strategy.md` - discount depth, anchoring, perceived value
- `references/implementation.md` - platform-specific setup guides
- `references/promotion-tactics.md` - on-site, email, ads promotion
- `references/performance-tracking.md` - metrics, analysis, optimization
- `references/self-check.md` - bundle audit checklist

---

*Part of GPLMart All-Access - GPL-3.0-or-later - © GPLMart - gplmart.com*

