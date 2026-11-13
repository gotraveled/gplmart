# Bundle pricing - types, math, implementation

## Bundle types

### Pure bundle (only sold together)
- Products that complement each other (skincare set: cleanser + toner + moisturizer)
- Forces bundle purchase, increases perceived value
- Example: "Skincare routine kit" at ₹999 vs buying separately at ₹1,299

### Mixed bundle (buy X get Y discount)
- "Buy 2 shirts get 20% off pants"
- Cross-sell complementary products
- Increases AOV without heavy discounting

### Quantity break
- "Buy 1 = ₹499, Buy 2 = ₹899 (10% off), Buy 3 = ₹1,199 (20% off)"
- Encourages bulk purchase
- Works well for consumables (grocery, supplements)

### Gift bundle
- "Buy product, get free accessory"
- Adds perceived value without discounting main product
- Example: "Buy serum, get free applicator"

### Mystery bundle
- "Surprise bundle - 3 products for ₹999" (worth ₹1,500)
- Creates excitement, moves slow movers
- Works for fashion, beauty, lifestyle products

## Bundle math

```
Bundle price = (Product A price + Product B price) x (1 - bundle_discount%)

Example:
Product A: ₹500 (COGS ₹200, margin 60%)
Product B: ₹300 (COGS ₹120, margin 60%)
Separate total: ₹800
Bundle price (15% off): ₹680
Bundle margin: (₹680 - ₹320 COGS) / ₹680 = 53% margin
Still healthy!

Rule: bundle discount should be 10-15% max - enough to feel like a deal, not enough to kill margin
```

## Implementation by platform

### Shopify
- Use Shopify Bundles app (free) or create bundle products manually
- Set bundle price in product pricing
- Use "Frequently bought together" apps for mixed bundles
- Quantity breaks via discount apps or manual variant pricing

### Marketplaces (Amazon/Flipkart/Meesho)
- Create virtual bundle products
- Use "frequently bought together" features
- Quantity discounts via seller tools

## Bundle pricing psychology

- **Anchoring**: show "was ₹800, now ₹680" (was price = separate purchase)
- **Perceived savings**: "Save ₹120" feels better than "15% off"
- **Value stacking**: list what's included + individual values = higher perceived value
- **Scarcity**: "Limited bundle - only 50 sets" (if real)
- **Gift framing**: "Perfect gift set" for giftable bundles

## What to bundle

- **Complements**: products used together (lunch box + water bottle)
- **Complete solutions**: everything needed for a task (skincare routine, cooking kit)
- **Slow movers + bestsellers**: bundle slow stock with popular items
- **Seasonal**: festival gift sets, summer essentials, winter warmers
- **Price points**: create bundles at ₹499, ₹999, ₹1,499 price anchors
