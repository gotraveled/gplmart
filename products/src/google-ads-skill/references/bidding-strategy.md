# Bidding strategy - when to use what

## The learning phase rule

Google needs ~30 conversions per campaign to exit learning. During learning:
- Don't change budget by >20% at once
- Don't change bidding strategy
- Don't add/remove too many keywords
- Wait 1-2 weeks before judging performance

## Strategy by stage

### Stage 1: Launch (0-30 conversions/month)

**Use**: Manual CPC or Maximize Clicks
- Control costs while gathering data
- Set max CPC based on what you can afford per click
- Focus on search terms report to find converting queries

### Stage 2: Growing (30-100 conversions/month)

**Use**: Target CPA or Maximize Conversions
- Tell Google your target cost per acquisition
- Start with target = your actual CPA (don't be greedy)
- Let it optimize for 2 weeks before adjusting target

### Stage 3: Scaling (>100 conversions/month)

**Use**: Target ROAS or Maximize Conversion Value
- Tell Google your target return on ad spend
- Target = current ROAS minus 10-20% (give it room)
- Scale budget +20% every 3-5 days when profitable

## Ecommerce-specific bidding

### Shopping campaigns

- Manual CPC → Target ROAS is the standard path
- Segment by product margin: high-margin products get aggressive bids, low-margin get conservative
- Use priority levels: high-margin = high priority, test products = low priority

### Search campaigns

- Brand terms: Manual CPC or Target Impression Share (defend your brand cheaply)
- Non-brand: Target CPA or Maximize Conversions
- Competitor terms: Manual CPC (careful - they may have bigger budgets)

### Performance Max

- Requires Target ROAS or Maximize Conversion Value from start
- Needs 30+ conversions/month to work well
- Give it 2-4 weeks before judging

## Budget allocation by funnel

| Campaign type | Budget % | Goal |
|---|---|---|
| Brand search | 5-10% | Defend brand, capture navigational queries |
| Shopping | 40-50% | Product sales, high intent |
| Non-brand search | 20-30% | Category/problem queries |
| Performance Max | 10-20% | Catch-all, remarketing |
| YouTube | 5-10% | Awareness, retargeting |

## When to kill a campaign

- 30+ days, zero conversions, spend >₹10,000 = kill or restructure
- ROAS <50% of target for 2+ weeks = pause and diagnose
- CTR <1% on search = ad copy problem, not bidding problem
- Quality Score <5 = landing page/feed problem, fix before changing bids
