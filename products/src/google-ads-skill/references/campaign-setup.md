# Campaign setup - Shopping + Search

## Shopping campaign build

### Step 1: Google Merchant Center

1. Create account at merchants.google.com
2. Verify store ownership (HTML file, meta tag, or Google Analytics)
3. Connect Shopify feed (automatic via Google & YouTube app) or upload product feed (XML/CSV)
4. Fix feed errors: missing GTIN, bad images, price mismatches, availability issues

### Step 2: Shopping campaign

1. Campaign type: Shopping (Standard or Performance Max)
2. Budget: start ₹500-1000/day
3. Bidding: Manual CPC (launch) → Target ROAS (once profitable)
4. Product groups: segment by category, margin, bestseller status
5. Priority: high-margin products in high-priority campaign

### Step 3: Feed optimization

- Product titles: front-load keywords ("Hiso Steel Lunch Box 3-Tier" not "Lunch Box")
- Descriptions: benefit-led, include use cases
- Images: white background, high-res, multiple angles
- Price: competitive - Google compares across merchants
- Availability: keep accurate - out-of-stock = disapproved

## Search campaign build

### Structure

```
Campaign: [Product Category] - Search - India
  Ad Group 1: [Brand Terms] - "hiso lunch box", "hiso tiffin"
  Ad Group 2: [Product Terms] - "steel lunch box", "3 tier tiffin"
  Ad Group 3: [Use Case] - "office lunch box", "school tiffin"
  Ad Group 4: [Competitor] - "[competitor] alternative" (careful)
  Ad Group 5: [Problem] - "how to keep food hot in tiffin"
```

### Ad group rules

- 5-15 tightly related keywords per ad group
- Ad copy matches keyword intent (don't show lunch box ad for "tiffin recipe")
- Negative keywords at campaign level (shared across ad groups)

## Negative keywords (start with these)

```
free, cheap, DIY, how to make, jobs, career, salary, course, tutorial,
images, pictures, wallpaper, vector, clipart, mockup, PSD, font,
repair, second hand, used, rent, wholesale, supplier, manufacturer,
dropship, franchise, buy in bulk
```

Add more as search terms report reveals irrelevant queries.

## Extensions (use all applicable)

- **Sitelinks**: links to categories, bestsellers, offers
- **Callouts**: "Free shipping", "COD available", "Easy returns"
- **Structured snippets**: "Types: Steel, Plastic, Insulated"
- **Price extensions**: show price range directly in ad
- **Promotion extensions**: sale badges, discount codes
- **Image extensions**: product photos in search results
