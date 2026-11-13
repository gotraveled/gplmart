---
name: returns-rma-skill
description: Build and manage the returns/exchange/RMA system for an e-commerce store - policy writing, workflow automation, return-reason analysis, fraud prevention and recovery flows that turn returns into repeat customers. Use for creating return policies, handling return requests, analysing return data, and reducing return rates.
---

# Returns & RMA - the system that saves margins

Returns are where ecommerce margins go to die. A 30% return rate on a ₹999 product with ₹200
shipping cost = you're paying customers to shop. This skill builds the system that reduces
returns, handles them efficiently, and recovers customers instead of losing them.

---

## Intake - one batch

1. Store/product category + average order value
2. Current return rate (if known) + main return reasons
3. Platform: Shopify / marketplace / custom
4. Logistics: own warehouse / 3PL / dropshipping supplier
5. Current policy: window, conditions, who pays shipping
6. Pain point: too many returns / handling chaos / fraud / lost customers

## The returns system (build in this order)

### 1. Policy design (before you get a single return)

A good policy answers: who can return, when, why, who pays, how.

```
RETURNS POLICY
- Window: [7/15/30] days from delivery
- Condition: [unused, tags attached, original packaging]
- Who pays: [customer for change-of-mind, store for defects/damage]
- Process: [how to initiate - portal/WhatsApp/email]
- Refund: [original payment method, 5-7 business days after inspection]
- Non-returnable: [intimate items, personalized products, opened electronics]
```

Rules:
- Longer window = more returns BUT higher conversion (test it)
- "Change of mind" returns cost you - make customer pay shipping, not you
- Defects/damage/wrong item = ALWAYS your cost, no exceptions
- Non-returnable categories need clear disclosure at purchase

### 2. Prevention (reduce return rate before it happens)

Most returns happen because expectations weren't set:

- **Size/fit issues** (fashion): size guide, model stats, fabric details, video
- **Product not as pictured** (all categories): accurate photos, video, scale references
- **Defects/damage** (electronics): QC process, packaging standards, insurance
- **Wrong item shipped** (operations): barcode scanning, pick verification, packing checklist
- **Changed mind** (all): better product descriptions, FAQ, reviews

Target: reduce preventable returns by 30-50% with better pre-purchase info.

### 3. The return workflow (handle efficiently)

```
Customer initiates → Verify eligibility → Approve/deny →
Pickup scheduled → Item received → Inspect → Refund/replacement →
Follow-up → Win-back attempt
```

For each step:
- **Initiation**: WhatsApp/email/portal - make it easy (friction = fewer returns = more trust)
- **Verification**: order lookup, policy check, reason classification
- **Approval**: auto-approve eligible, manual review for suspicious
- **Pickup**: reverse logistics partner or customer drop-off
- **Inspection**: condition check, restockable vs damaged vs wrong item
- **Refund**: original payment method, timeline communicated upfront
- **Follow-up**: "How was the return process?" - feedback loop

### 4. Fraud prevention

Return fraud costs Indian ecommerce ~8-12% of revenue:

- **Wardrobing**: buy, use, return (fashion) - tags must be attached, worn = reject
- **Empty box returns**: return claim without product - weight check at pickup
- **Serial returners**: track customer return history, flag patterns
- **Fake damage claims**: require photos/video for damage claims
- **Price switching**: return cheap item, claim expensive one was sent - SKU verification
- **Bracketing**: order multiple sizes, return all but one - limit on fashion

Signals to watch: customer with >30% return rate, new account + immediate return, high-value item + vague reason.

### 5. Recovery (turn returns into repeat customers)

A good return experience creates MORE loyal customers than a smooth purchase:

- Refund fast (3-5 days, not 15)
- Offer exchange instead of refund when possible (keeps revenue)
- Follow-up: "Sorry it didn't work out - here's 10% off your next order"
- Ask WHY: return reason data improves product decisions
- Make the process painless: prepaid label, easy drop-off, no questions asked

## Return reason analysis

Track every return by reason:

| Reason | % of returns | Fix |
|---|---|---|
| Size/fit | 35% | Better size guide, model stats |
| Not as pictured | 20% | Better photos, video, description |
| Defective/damaged | 15% | QC, packaging, supplier quality |
| Wrong item | 10% | Pick/pack process |
| Changed mind | 15% | Better pre-purchase info |
| Fraud/suspicious | 5% | Fraud rules, customer flagging |

Monthly review: which reasons are growing? Which fixes worked? Feed back into product pages and operations.

## Platform-specific

**Shopify**: use return apps (Returnly, Loop Returns) or build custom flow via Shopify admin + email automation  
**Marketplaces (Amazon/Flipkart)**: returns handled BY platform - focus on prevention + appeal false claims  
**WhatsApp-first stores**: returns via WhatsApp chat - faster, more personal, higher satisfaction

## References

- `references/policy-template.md` - complete return policy template
- `references/workflow.md` - step-by-step return handling process
- `references/fraud-signals.md` - red flags and prevention rules
- `references/recovery-flows.md` - win-back sequences after returns
- `references/reason-analysis.md` - tracking and fixing return reasons
- `references/self-check.md` - system audit checklist
