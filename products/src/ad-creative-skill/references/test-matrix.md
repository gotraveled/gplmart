# Test matrix + campaign structure

## Naming convention

```
[Product]_[Angle]_[Creative#]_[Date]
Example: Chopper_ProbSol_C1_2026-11-12
```

## Campaign structure (Meta)

```
Campaign: [Product] - Testing - Nov 2026
  Ad Set A: Broad US/IN, $15/day
    Ad A1: Angle1-Creative1
    Ad A2: Angle1-Creative2
  Ad Set B: Broad US/IN, $15/day
    Ad B1: Angle2-Creative1
    Ad B2: Angle2-Creative2
  Ad Set C: Retargeting 30d, $10/day
    Ad C1: Angle3-Creative1
```

## Budget rules

- Testing: $20-50/day TOTAL across all ad sets - enough data, not enough bleed
- Per ad minimum spend to judge: $100-150 (about 3-5 days at test budgets)
- Winner scale: +20-30% budget every 2-3 days, never jump 10x
- Kill rule: $150 spend + zero purchases + CTR <0.8% = dead

## Metrics that matter (in order)

1. CTR (link clicks / impressions) - creative quality signal, want >1% cold, >2% warm
2. CPC - traffic cost, compare across angles not "benchmarks"
3. Add-to-cart rate - intent signal
4. Purchase/ROAS - the only metric that pays bills
5. Frequency - above 3-4 = creative fatigue, refresh

## Weekly rhythm

- Mon: launch new angle test (20% of budget)
- Wed: kill clear losers, note winners
- Fri: scale winners, queue next creative batch
