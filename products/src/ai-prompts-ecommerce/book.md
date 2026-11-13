# AI Prompts for Ecommerce

> **A seller's field guide to getting ChatGPT, Claude, and Gemini to write your listings, ads, emails, and content — fast and on-brand.**
>
> 100+ copy-paste prompts. 16 chapters. Zero fluff. Built for Shopify store owners, Amazon and Flipkart sellers, dropshippers, and the agencies that serve them.

---

## How to Use This Book

Every chapter has copy-paste prompts — swap in your product details and get usable output.

Three rules:

1. **Never paste a bare product name.** `"write a description for a LED lamp"` produces garbage. Context produces sales copy.
2. **Tell the AI who it is.** `"Act as a direct-response copywriter for Shopify brands"` changes everything.
3. **Iterate.** The first output is a draft. The second prompt — "make it shorter, punchier" — is where the gold is.

> **KEY INSIGHT:** AI doesn't write worse copy than a mediocre human. It writes *average* copy instantly. Your job is to spend 60 seconds prompting to make it write *good* copy — the kind you used to pay a freelancer $500 for.

---

## Chapter 1: Why Prompting Is a Skill (Not a Trick)

Every seller has had the same experience: you ask ChatGPT for product descriptions and get something that sounds like a generic Amazon listing — "high quality," "best in class." The problem isn't the AI. It's the prompt.

LLMs predict the most probable next words. A vague prompt produces the most *average* output — exactly what you don't want. You want specific, opinionated, on-brand copy. That requires the **5-part prompt formula**:

| Part | What it does | Example |
|---|---|---|
| **Role** | Sets expertise and register | "You are a conversion copywriter for Shopify brands" |
| **Context** | Your product, customer, brand | "Selling yoga mats to home-fitness buyers aged 28-45" |
| **Task** | The exact deliverable | "Write 5 bullet points" |
| **Format** | Structure of output | "Bullets, max 20 words each" |
| **Constraints** | Guardrails | "No word 'premium,' no exclamation marks" |

### Worked Example: Bad vs. Good Prompt

**Bad:**

```
Write a product description for my yoga mat.
```

**Output:** Generic copy about "comfort" and "durability" that could describe any mat on earth.

**Improved:**

```
You are a conversion copywriter for a Shopify brand selling to home-fitness buyers aged 28-45.

Product: "ProGrip Travel Yoga Mat" — 4mm thick, non-slip even when wet, rolls into a 30cm carry strap, $49.
Customer pain: their mat slides during planks, is too thick to travel with, peels after 3 months.

Write 3 product descriptions:
1. A 40-word emotional hook
2. 5 bullet points: benefit first, then proof, max 20 words each
3. One paragraph answering "will it last?"

Constraints: no word "premium," no exclamation marks, write like a knowledgeable friend.
```

**Better output:** "The mat that grips back — even when you sweat." Bullets like "Stays put through hot yoga. Dual-texture surface grips 3x better when wet — tested, not claimed." Specific > generic, every time.

> **PRO TIP:** Save improved prompts as templates with variables (PRODUCT, CUSTOMER, BRAND VOICE) at the top. That's how agencies scale to 50 clients without hiring 50 copywriters.

---

## Chapter 2: The Prompt Patterns That Actually Work

| Pattern | What it does | When to use |
|---|---|---|
| **Few-shot** | Show 2-3 examples of good output; AI matches the style | Brand voice, review replies, captions |
| **Chain-of-thought** | "First analyze, then write" | Strategy, competitor analysis, pricing |
| **Persona** | "Act as a [role]" | Almost everything |
| **Constraints** | "Under 50 words," "avoid word X" | Tight slots (ad headlines, SMS, bios) |
| **Iteration** | Follow-up prompts that refine output | When draft 1 is 70% good |

### Few-Shot (the most underrated)

```
Here are 3 examples of our brand voice (short, confident, slightly witty, never corporate):

EXAMPLE 1: "Your skincare routine has too many steps. Ours has one."
EXAMPLE 2: "Sunscreen that doesn't feel like a science experiment."
EXAMPLE 3: "Made in small batches. Gone in fast. That's the point."

Now write 10 Instagram captions for our new vitamin C serum in this exact voice. Each under 25 words. End 3 with a question.
```

The AI now has a *style target*, not a vague instruction. Quality jumps immediately.

### Chain-of-Thought for Strategy

```
Analyze this product opportunity step by step:
1. List the top 3 customer segments and their main pain
2. For each, write the strongest angle
3. Identify the biggest objection to purchase
4. THEN recommend the single best positioning statement
```

You get a reasoning trail you can evaluate — not just a confident-sounding answer.

### Iteration Moves

Think of AI output as draft 1 of 5:

- "Make it 30% shorter."
- "Rewrite the opening line to be more curiosity-driven."
- "This sounds too salesy — make it feel like a recommendation from a friend."
- "Now give me 5 variations of just the headline."
- "Add a stronger risk reversal to the CTA."

> **KEY INSIGHT:** The sellers who get amazing AI output aren't better at prompting on the first try — they're better at *iterating*. Budget 3 prompts per deliverable, not 1.

---

## Chapter 3: Product Research Prompts

Know what you're selling *to whom* before you write a word of copy.

### Niche Opportunity Scanner

**When to use:** Evaluating whether to enter a niche before committing ad spend.

```
You are a D2C product researcher. Analyze this niche for a Shopify seller with $2,000/month ad budget.

Niche: [e.g., ergonomic office accessories for remote workers]

Research and present:
1. Top 5 customer pain points (ranked by intensity)
2. 3 competitor brands and their positioning gaps
3. Price range the market accepts
4. 3 angles competitors are NOT using
5. Verdict: pursue / pass / pursue-with-differentiation — with reasoning
```

### Customer Avatar Builder

**When to use:** Before writing any copy — you can't sell to "everyone."

```
Build a detailed customer avatar for this product:

Product: [name, price, key features]
Target market: [country, platform]

Include:
- Demographics (age, income, situation)
- Psychographics (values, fears, aspirations)
- Buying triggers (what makes them buy today vs. later)
- Objections (the 3 reasons they won't buy)
- Where they hang out online (3 platforms)
- The exact words they'd use to describe their problem
```

### Review Mining Prompt

**When to use:** Stealing competitors' customers' language — the best copy uses the customer's own words.

```
I sell [your product]. My competitor is [competitor name/URL].

Analyze their 1-star and 5-star reviews to find:
1. The 5 phrases customers use most to describe the problem
2. The top 3 complaints about the competitor (my opportunity)
3. The top 3 things customers love (table stakes I must match)
4. The emotional language in 5-star reviews (for my copy)

[Paste reviews or provide the URL if the AI can browse.]
```

### Keyword & Search Intent Prompt

**When to use:** SEO titles, Amazon keywords, marketplace search optimization.

```
Generate a keyword strategy for this product:

Product: [description]
Platform: [Amazon / Shopify / Flipkart / Google]

Provide:
1. 20 primary keywords buyers actually search
2. 10 long-tail keywords with buying intent
3. 5 keywords competitors likely target (to differentiate from)
4. Recommended title structure using top keywords naturally
5. Questions buyers ask (for FAQ and A+ content)
```

### USP Finder

**When to use:** Your product is similar to 50 others — find the angle that makes it yours.

```
My product: [describe product, price, features]
My competitors offer: [list 2-3 alternatives]

Find my unique selling proposition:
1. List 10 possible differentiators (features, price, experience, guarantee, story)
2. Rank them by emotional impact on the buyer
3. Recommend the TOP differentiator as a single compelling sentence
4. Write 3 headline variations using that differentiator
```

### Trend Validation Prompt

**When to use:** Before ordering inventory — is this a wave or a fad?

```
Evaluate this product trend for a 60-day test order:

Product: [describe]
Source: [TikTok trend / Amazon Best Seller / Google Trends spike / etc.]

Analyze:
1. Is demand rising, stable, or past peak?
2. How many competitors already sell it? (saturation check)
3. Expected lifecycle — weeks or months?
4. Margin reality check at typical ad costs
5. Go / no-go recommendation with confidence level
```

### Bundle & Complementary Product Finder

**When to use:** Increasing AOV — what else should you sell with this?

```
I sell [product]. Find 10 complementary products my customers likely need, ranked by:
- Logical pairing strength (1-10)
- Margin potential (low/medium/high)
- Likelihood they'd buy from me vs. elsewhere

For the top 3, suggest how to bundle them (name, price strategy, "complete the set" angle).
```

> **KEY INSIGHT:** The sellers who win aren't the ones with the best products — they're the ones who understand their customer *better*. These prompts give you that understanding in 5 minutes instead of 5 weeks of guessing.

---

## Chapter 4: Product Listing & Description Prompts

Listing copy is the difference between a page that converts and a page that bounces.

### Product Title Generator

**When to use:** Naming a product for Shopify, Amazon, or Flipkart — needs to rank AND make people click.

```
Write 10 product titles for this item:

Product: [name/type]
Key features: [list 3-5]
Target keyword: [primary keyword]
Platform: [Shopify / Amazon / Flipkart]

Rules:
- Front-load the main keyword
- Include 1 differentiator in the title
- Under 80 characters for Shopify, under 200 for Amazon
- No clickbait, no ALL CAPS, no "hot sale"
- Mix of SEO-heavy and emotional variants
```

### Product Description (Full Page)

**When to use:** The main description block on a product page.

```
Write a product description for this product:

Product: [name]
Price: [price]
Key features: [list]
Target customer: [avatar from Ch.3]
Brand voice: [e.g., confident, minimal, expert]

Structure:
1. Opening hook (1-2 sentences — the "why this exists")
2. Problem agitation (2 sentences)
3. Solution (product described through benefits not features)
4. Social proof placeholder [SOCIAL PROOF]
5. Risk reversal (guarantee, returns, warranty)
6. Final CTA

Length: 250-350 words. No bullet points — flowing prose.
```

### Bullet Points (Conversion Bullets)

**When to use:** The bullet section above the fold — where most buying decisions happen.

```
Write 7 bullet points for this product:

Product: [name, key features]
Customer pain: [main problem it solves]

Each bullet must follow this structure:
- Start with the BENEFIT, not the feature
- Follow with SPECIFIC proof (number, material, test result)
- Max 20 words per bullet
- No bullet starts with "This product"

Example:
BAD: "This product is made of stainless steel"
GOOD: "Won't rust, stain, or leach — 18/8 surgical-grade steel tested to 10,000 dishwasher cycles"

Write 7 bullets plus 3 shorter "mini-bullets" for mobile.
```

### Feature-to-Benefit Translator

**When to use:** You have a spec sheet but no idea how to make it sound appealing.

```
Translate these technical specs into customer-facing benefits:

Specs: [paste spec sheet]
Customer: [who buys this]

For each spec, write:
- The feature (technical)
- The benefit (what it means for them)
- The emotion it triggers (relief, pride, convenience, status)

Format as a 3-column table: Feature | Benefit | Emotion
```

### A+ Content / Enhanced Brand Content

**When to use:** Amazon A+ content, Shopify image-text blocks, rich product pages.

```
Write A+ style content blocks for this product:

Product: [name]
Brand story: [1-2 sentences]
Key differentiators: [list]
Target customer: [avatar]

Create 5 content blocks:
1. Brand story headline + 50-word narrative
2. "Why choose us" comparison (us vs. generic)
3. Feature spotlight (pick the #1 differentiator, explain why it matters)
4. How it works (3-step visual description)
5. Trust block (certifications, guarantees, press)

Each block: headline + supporting text. Write like a brand with a point of view.
```

### Product Comparison Table

**When to use:** "Why buy ours over theirs" — comparison content converts browsers.

```
Create a product comparison for my store:

My product: [name, price, key features]
Competitor alternatives: [2-3 competing products or generic options]

Build a comparison table with 8-10 rows covering: price, key feature, material/quality, guarantee, use case, target customer.

Rules:
- Be factual — no competitor bashing
- Highlight where we genuinely win
- Include a row where competitor might be better (builds trust)
- End with a "best for" row for each
```

### Variant Selection Guide

**When to use:** Products with sizes, colors, or configurations.

```
Write a variant selection guide for this product:

Product: [name]
Variants: [list sizes/colors/options with key differences]

Create:
1. A simple decision tree ("If you want X, choose Y")
2. A comparison table of variants
3. A "not sure?" recommendation section
4. FAQ answers for the 3 most common variant questions
```

### Product FAQ Section

**When to use:** FAQ blocks reduce support tickets AND capture long-tail search traffic.

```
Generate 12 FAQ questions and answers for this product:

Product: [name, features, price, use case]
Platform: [Shopify / Amazon / etc.]

Cover:
- 4 usage questions ("Can I use this for X?")
- 3 sizing/compatibility questions
- 3 objection questions ("Is it worth the price?", "How long does it last?")
- 2 shipping/returns questions

Answers: 2-3 sentences each, conversational tone, include the keyword naturally.
```

### Product Story / Origin Section

**When to use:** D2C brands need a "why we exist" story — it justifies premium pricing.

```
Write a 200-word brand/product story for this product:

Product: [name]
Founder/origin: [who made it, why, what problem they saw]
Values: [list 2-3]
Target customer: [who they are]

Tone: authentic, not inspirational-poster. No "we're passionate about" cliches.
Structure: problem → discovery → creation → who it's for.
```

### Shopify Product Page (Full Template)

**When to use:** One-shot full product page copy — title, description, bullets, FAQ.

```
Write a complete Shopify product page for:

Product: [name, price, features]
Target customer: [avatar]
Brand voice: [tone]
Competitors: [who else sells this]

Deliver in this order:
1. Product title (SEO-optimized)
2. Hero description (2-3 sentences above the fold)
3. 7 benefit-led bullet points
4. Long description (250 words, problem→solution→proof)
5. 8 FAQ items
6. Meta title + meta description
7. 3 Instagram caption variations for launch

Make it sound like a real brand, not a template.
```

### Amazon Listing Optimization

**When to use:** Amazon-specific listing copy — different rules than Shopify.

```
Write an Amazon-optimized listing for:

Product: [name, features, price]
Category: [Amazon category]
Target keyword: [primary keyword]

Deliver:
1. Title (under 200 chars, keyword-front-loaded)
2. 5 bullet points (under 250 chars each, feature+benefit, no fluff)
3. Product description (2000 chars max, HTML with <b> and <br>)
4. Backend search terms (250 bytes, comma-separated)
5. A+ content outline (5 modules with headlines and text)

Amazon rules: no subjective claims ("best," "#1"), no superlatives, no contact info, no pricing.
```

### Flipkart / Marketplace Listing

**When to use:** Indian marketplace sellers — different style, different audience.

```
Write a Flipkart marketplace listing for:

Product: [name, price, features]
Category: [Flipkart category]
Target customer: [Indian buyer persona]
Brand: [established / value / premium]

Deliver:
1. Product title (under 255 chars, brand + key specs)
2. 5 key feature bullets
3. Product description (500 words, benefit-focused, warranty/returns)
4. Specification table
5. 3 search keywords for Flipkart's algorithm
```

> **KEY INSIGHT:** Listing copy isn't "writing" — it's *sales architecture*. Every element has one job: move the reader one step closer to buying.

---

## Chapter 5: Ad Copy Prompts (Meta, Google, TikTok)

Ad copy is where prompting ROI is highest — you're paying for every impression, so every word must earn its place.

### Meta Ad Hook Generator

**When to use:** Facebook/Instagram feed ads — the first 3 words decide if anyone reads the rest.

```
Write 10 Meta ad hooks for this product:

Product: [name, key benefit]
Target audience: [who]
Ad format: [image / video / carousel]
Goal: [sales / leads / awareness]

Hook types to include:
- 2 curiosity hooks ("Nobody talks about this...")
- 2 pain-point hooks ("Tired of [problem]?")
- 2 social proof hooks ("10,000+ customers can't be wrong")
- 2 contrarian hooks ("Stop doing [common mistake]")
- 2 benefit-first hooks ("[Benefit] in [timeframe]")

Each hook: max 125 characters. Include primary text (under 125 words) and headline (under 40 chars) for each.
```

### Google Search Ad Copy

**When to use:** Google Ads — limited character count means every word counts.

```
Write Google Search ad copy for:

Product: [name]
Target keyword: [keyword]
USP: [main differentiator]
Offer: [discount/free shipping/guarantee]

Deliver 3 ad variations, each with:
- Headline 1 (30 chars max)
- Headline 2 (30 chars max)
- Headline 3 (30 chars max)
- Description 1 (90 chars max)
- Description 2 (90 chars max)
- Display URL path suggestion

Rules: keyword in headline 1, CTA in description 1, no punctuation in headlines 1-2.
```

### TikTok / Reels Ad Script

**When to use:** Short-form video ads — hook in first 1.5 seconds or lose them.

```
Write a 30-second TikTok/Reels ad script for:

Product: [name, key benefit]
Target: [audience]
Format: [POV / tutorial / before-after / testimonial-style / storytime]

Script structure:
- 0-1.5s: HOOK (pattern interrupt)
- 1.5-5s: PROBLEM (relatable pain point)
- 5-20s: SOLUTION (product demo or testimonial)
- 20-27s: PROOF (result, review, stat)
- 27-30s: CTA

Include: on-screen text, voiceover script, music/mood notes.
```

### UGC-Style Ad Script

**When to use:** Ads that look like organic content — they convert better than polished ads.

```
Write a UGC-style ad script (looks like a real customer video):

Product: [name]
Scenario: [e.g., "found this at 2am and couldn't believe it worked"]
Creator persona: [e.g., "25-year-old woman, casual, slightly skeptical"]

Format:
- Opening line (casual, not salesy)
- The "discovery" moment
- Demo (what they show/do)
- The result/reaction
- Soft CTA ("link in bio" not "BUY NOW")

Length: 45-60 seconds spoken. Include 3 alternate hooks.
```

### Carousel Ad Copy (Meta)

**When to use:** Multi-image ads — each card needs its own mini-message.

```
Write a 6-card Meta carousel ad for:

Product: [name]
Goal: [educate / sell / retarget]
Audience: [who]

For each card:
- Card number and purpose (hook / problem / solution / proof / offer / CTA)
- Headline (under 40 chars)
- Body text (under 125 chars)
- Visual direction

Card 1 must stop the scroll. Card 6 must drive action.
```

### Retargeting Ad Copy

**When to use:** People who visited but didn't buy — different message than cold traffic.

```
Write retargeting ad copy for cart abandoners:

Product: [name, price]
Time since visit: [e.g., 24 hours / 7 days]
Previous interaction: [viewed product / added to cart / started checkout]

Deliver 3 variations:
1. Gentle reminder (no pressure)
2. Objection handler (address the #1 reason they didn't buy)
3. Incentive offer (discount, free shipping, bonus)

Each: primary text + headline + CTA button text.
```

### Lookalike Audience Ad Variations

**When to use:** Scaling winning ads — need variations without changing the core message.

```
I have a winning ad for [product]. Create 5 variations that test ONE element at a time:

Original ad:
[Paste winning ad copy]

Create variations testing:
1. Different hook (same body)
2. Different CTA (same body)
3. Different proof point (same body)
4. Different audience angle (same body)
5. Different format (video vs. image)

Label each variation with what it's testing.
```

> **KEY INSIGHT:** The best ad isn't the cleverest — it's the one that gets the right person to feel "this is for me" in under 2 seconds. Prompt for *relevance*, not *creativity*.

---

## Chapter 6: Email & WhatsApp Sequence Prompts

Email and WhatsApp sequences are where ecommerce makes its money — they warm up cold traffic, recover abandoned carts, and turn one-time buyers into repeat customers.

### Welcome Email Sequence (5 Emails)

**When to use:** New subscribers — set expectations, build trust, drive first purchase.

```
Write a 5-email welcome sequence for:

Brand: [name]
Product/niche: [what you sell]
Brand voice: [tone]
Offer: [first-purchase discount or free shipping]

Email sequence:
1. Welcome (day 0) — deliver what they signed up for + brand story
2. Value (day 2) — teach them something useful
3. Social proof (day 4) — customer story/review + soft product intro
4. Objection handler (day 6) — address "why should I trust you?"
5. Offer (day 8) — first-purchase incentive + urgency

For each email: subject line (2 options), preview text, body (under 200 words), CTA.
```

### Abandoned Cart Recovery (3 Emails)

**When to use:** Cart abandonment — recover 10-15% of lost sales.

```
Write a 3-email abandoned cart recovery sequence:

Product: [name, price]
Cart value: [avg order value]
Brand voice: [tone]

Email 1 (1 hour): remind them what they left + one benefit reminder
Email 2 (24 hours): address the #1 objection + social proof
Email 3 (72 hours): last chance + optional incentive

Each email under 150 words. Conversational, not corporate.
For each: subject line options (3), body, CTA.
```

### Post-Purchase Sequence (4 Emails)

**When to use:** After someone buys — reduce refunds, drive reviews, build loyalty.

```
Write a 4-email post-purchase sequence:

Product: [name]
Delivery estimate: [e.g., 5-7 days]
Brand voice: [tone]

Email 1 (immediately): Order confirmation + what to expect
Email 2 (delivery day): "Your order arrived" + setup tips + review request
Email 3 (7 days): How to get the most from it + cross-sell
Email 4 (14 days): Review request + referral ask + loyalty offer

For each: subject line, body (under 150 words), CTA.
```

### WhatsApp Broadcast Sequence

**When to use:** WhatsApp marketing — higher open rates than email, but requires restraint.

```
Write a WhatsApp broadcast sequence for:

Brand: [name]
Audience: [customers / leads / cart abandoners]
Goal: [sale / re-engagement / review]
Product: [name, offer]

Rules: max 3 messages per sequence, each under 300 characters, conversational tone, 1 CTA per message, no spam language.

Message 1: [hook + value]
Message 2: [proof/offer]
Message 3: [urgency + CTA]

Include timing suggestions for each.
```

### Win-Back Campaign (Lapsed Customers)

**When to use:** Customers who haven't bought in 60-90 days — cheaper to reactivate than acquire.

```
Write a 3-message win-back campaign for customers inactive 90+ days:

Brand: [name]
Last purchase: [product/category]
Incentive: [discount/mystery offer/free gift]

Message 1: "We miss you" + what's new + soft CTA
Message 2: Their previous purchase + how it's improved + social proof
Message 3: Exclusive offer + urgency + final CTA

Channels: email + WhatsApp version of each.
```

### Product Launch Email Sequence

**When to use:** New product drop — build anticipation, launch, follow up.

```
Write a 4-email product launch sequence:

Product: [name, price, key benefit]
Launch date: [date]
Audience: [email list / waitlist]
Brand voice: [tone]

Email 1 (7 days before): Teaser — "something's coming"
Email 2 (3 days before): Reveal — show product, build desire
Email 3 (launch day): "It's here" + offer + urgency
Email 4 (3 days after): Last chance / bonus for late buyers

Each email: subject line (2 options), preview text, body (under 200 words), CTA.
```

### Review Request Sequence

**When to use:** Getting more reviews — the #1 conversion lever for marketplaces.

```
Write a review request sequence for:

Product: [name]
Platform: [Amazon / Shopify / Flipkart / Google]
Delivery timing: [when to send]

Message 1 (delivery day): "How's it going?" + soft review ask
Message 2 (+3 days): Direct review request + where to leave it + why it matters
Message 3 (+7 days): Reminder + incentive (if allowed by platform)

For each: subject line, body (under 100 words), CTA with [REVIEW_LINK].
```

> **KEY INSIGHT:** Email sequences aren't "blast and pray." Each email has ONE job — welcome, educate, overcome, sell. Prompt for sequences with that structure built in.

---

## Chapter 7: Social Media Content Prompts

Social media is where brands get discovered — but posting consistently is hard. These prompts generate a week of content in minutes.

### Instagram Caption Generator

**When to use:** Daily Instagram posts — captions that stop the scroll.

```
Write 10 Instagram captions for this product:

Product: [name, key benefit]
Brand voice: [tone — e.g., witty, minimal, bold]
Goal: [engagement / sales / awareness]

Each caption needs:
- Hook line (first line — what shows before "more")
- Body (2-4 sentences, conversational)
- CTA (question, link, or action)
- 15-20 relevant hashtags (mix of sizes)

Vary formats: some educational, some entertaining, some promotional.
```

### Reels / TikTok Script (Organic)

**When to use:** Short-form video content — organic reach, not ads.

```
Write a 30-second Reels/TikTok script for:

Topic: [product / tip / behind-scenes / trend]
Format: [tutorial / POV / before-after / storytelling / listicle]
Target audience: [who]
Brand voice: [tone]

Script:
- 0-2s: Hook (must work with sound off — on-screen text)
- 2-25s: Content (fast-paced, visual cues noted)
- 25-30s: CTA or payoff

Include: shot list, on-screen text, voiceover, caption, hashtags.
```

### Carousel Post (Educational)

**When to use:** LinkedIn/Instagram carousels — high save rate, great for authority.

```
Write a 7-slide carousel post:

Topic: [e.g., "5 mistakes killing your product listings"]
Audience: [who — sellers, buyers, etc.]
Tone: [educational / provocative / story]

For each slide:
- Slide number
- Headline (under 10 words)
- Body text (under 30 words)
- Visual direction

Slide 1: Hook that makes them swipe
Slide 7: CTA or summary
```

### Content Calendar Generator

**When to use:** Planning a month of content — stop staring at a blank calendar.

```
Create a 30-day content calendar for:

Brand: [name]
Platforms: [Instagram / TikTok / LinkedIn / Pinterest]
Product focus: [main product or category]
Content pillars: [list 3-4 themes — education, behind-scenes, UGC, offers]

For each day provide:
- Date
- Platform
- Content type (reel / carousel / story / post)
- Topic/hook
- Caption or script outline
- Best posting time

Balance: 60% value, 25% engagement, 15% promotional.
```

### Story Sequence (Instagram Stories)

**When to use:** Instagram Stories — polls, Q&As, behind-scenes, flash sales.

```
Write a 5-frame Instagram Story sequence:

Goal: [e.g., "drive traffic to new product" / "answer FAQs" / "flash sale"]
Product/offer: [details]
Audience: [who]

For each frame:
- Frame number
- Visual direction
- Text overlay (under 15 words)
- Interactive element (poll / question / slider / link)
- CTA
```

### Pinterest Pin Copy

**When to use:** Pinterest — evergreen traffic that compounds over time.

```
Write Pinterest pin copy for:

Product: [name]
Target keyword: [SEO keyword]
Pin format: [standard / video / idea pin]
Audience: [who searches for this]

Deliver:
1. Pin title (under 100 chars, keyword-front-loaded)
2. Pin description (under 500 chars, keyword-rich, with CTA)
3. 3 alternate titles for A/B testing
4. Suggested board names
5. Related search terms for SEO
```

### LinkedIn Post (B2B / Thought Leadership)

**When to use:** LinkedIn for ecommerce brands — build authority, attract partners.

```
Write a LinkedIn post for:

Topic: [e.g., "What I learned scaling a Shopify store to $50K/month"]
Audience: [other founders / marketers / investors]
Tone: [authoritative but human / vulnerable / contrarian]
Length: [150-300 words]

Structure:
- Hook (first line — the takeaway or bold claim)
- Story/proof (the experience or data)
- Insight (the lesson)
- CTA (question or offer)

No hashtags or max 3. No "I'm humbled to announce" energy.
```

### YouTube Script Outline

**When to use:** YouTube content — Shorts for discovery, long-form for depth.

```
Write a YouTube script outline for:

Format: [Short (60s) / Long-form (8-12 min)]
Topic: [product review / tutorial / comparison / story]
Target audience: [who]
Goal: [subs / traffic / sales]

Short format:
- Hook (0-3s)
- Setup (3-15s)
- Payoff/demo (15-50s)
- CTA (50-60s)

Long-form:
- Intro hook (0-30s)
- Chapters (3-5 sections with timestamps)
- Key points per chapter
- CTA + end screen suggestion
```

> **KEY INSIGHT:** Social media isn't about posting more — it's about posting *consistently with a point of view*. These prompts give you that consistency without the daily creative block.

---

## Chapter 8: SEO & Blog Content Prompts

SEO content is the compounding asset — write it once, get traffic for years.

### Blog Post (SEO-Optimized)

**When to use:** Blog content that ranks on Google and drives product sales.

```
Write an SEO blog post for:

Topic: [e.g., "best ergonomic chairs for home office"]
Target keyword: [primary keyword]
Search intent: [informational / commercial / transactional]
Audience: [who's searching]
Product to feature: [your product, if relevant]
Word count: [1500-2500]

Structure:
- Title (keyword-front-loaded, under 60 chars)
- Meta description (under 155 chars)
- Introduction (hook + what they'll learn)
- H2 sections (4-6, each answering a sub-question)
- Product mention (natural, not salesy)
- FAQ section (3-5 questions)
- Conclusion + CTA

Write in a helpful, expert tone. No fluff, no "in today's world."
```

### Product Comparison Article

**When to use:** "X vs Y" content — high purchase intent, great for SEO.

```
Write a product comparison article:

Products: [Product A] vs [Product B]
Target keyword: "[A] vs [B]"
Audience: [buyers researching]

Structure:
- Introduction (why people compare these)
- Quick verdict table (who should buy what)
- Detailed comparison (price, features, pros/cons, use cases)
- "Best for" sections for each
- FAQ (5 questions)
- Conclusion with recommendation

Be honest — recommend the competitor when they're better. Builds trust.
```

### How-To / Tutorial Blog Post

**When to use:** "How to [task]" content — captures informational searches.

```
Write a how-to blog post:

Topic: [e.g., "how to clean a yoga mat"]
Target keyword: [keyword]
Audience: [who needs this info]
Product tie-in: [your product, if relevant]

Structure:
- Title: "How to [task] (Step-by-Step Guide)"
- Introduction (why this matters)
- Materials/tools needed
- Step-by-step instructions (numbered, clear)
- Tips/troubleshooting section
- FAQ (3-5 questions)
- CTA to related product or resource

Word count: 1000-1500. Practical, not theoretical.
```

### Category Page SEO Content

**When to use:** Category/collection pages need unique content — don't duplicate product descriptions.

```
Write category page content for:

Category: [e.g., "Yoga Mats"]
Store: [brand name]
Products in category: [list 3-5 examples]
Target keyword: [category keyword]
Audience: [buyers browsing this category]

Deliver:
1. H1 title (keyword + benefit)
2. Intro paragraph (100 words — what this category is, who it's for)
3. 3-4 sub-sections (H2s covering sub-categories, use cases, buying guide)
4. Buying guide tips (3-5 bullets)
5. Internal linking suggestions (which products to feature)

Make it feel like a curated collection, not a warehouse listing.
```

### Email Capture / Lead Magnet Content

**When to use:** Lead magnets that build your email list — the foundation of ecommerce marketing.

```
Create a lead magnet for:

Brand: [name]
Niche: [product category]
Target customer: [avatar]

Format options:
- Checklist ("10 things to check before buying [product]")
- Guide ("The complete guide to [topic]")
- Quiz ("Find your perfect [product]")
- Template ("[Product] sizing/measurement template")

Deliver:
1. Lead magnet title + description
2. Outline/structure
3. Landing page copy (headline, benefits, form)
4. Thank you email copy (deliver + next step)
```

### SEO Meta Tags Generator

**When to use:** Quick meta title + description for any page.

```
Generate SEO meta tags for this page:

Page type: [product / category / blog / landing page]
Topic: [what the page is about]
Target keyword: [primary keyword]
Brand: [name]

Deliver:
1. Meta title (under 60 chars, keyword + brand)
2. Meta description (under 155 chars, keyword + CTA)
3. 3 alternate title options for A/B testing
4. Open Graph title + description
```

### Schema Markup Suggestions

**When to use:** Structured data helps Google understand your content — rich snippets get more clicks.

```
Suggest schema markup for this page:

Page type: [product / article / FAQ / review]
Content: [describe what's on the page]

Provide:
1. Recommended schema type(s)
2. Key properties to include
3. Example JSON-LD code
4. Which rich snippets this could earn
```

> **KEY INSIGHT:** SEO content isn't about ranking — it's about *answering the question better than anyone else*. When you do that, rankings follow. Prompt for helpfulness first, keywords second.

---

## Chapter 9: Customer Support & Review Reply Prompts

Support is where brands are made or broken — and it's the most time-consuming part of running a store.

### Customer Support Response Templates

**When to use:** Common support inquiries — shipping, returns, product questions.

```
Write customer support response templates for:

Brand: [name]
Common inquiries: [shipping delay / return request / product defect / order status / general question]
Brand voice: [tone — apologetic / efficient / warm]

For each inquiry type, write:
1. Template response (with [VARIABLE] placeholders)
2. 2 alternate versions (different tone)
3. When to escalate to human
4. Follow-up message (after resolution)

Keep responses under 150 words. Empathetic but efficient.
```

### Negative Review Response

**When to use:** Responding to 1-3 star reviews — the public response matters more than the review.

```
Write a response to this negative review:

Review: [paste review]
Product: [name]
Review rating: [1-3 stars]
Customer issue: [summarize]
Brand voice: [tone]

Response should:
- Acknowledge the specific issue (not generic apology)
- Take responsibility without admitting fault
- Offer a solution (refund, replacement, fix)
- Invite them to contact support directly
- Be public-facing (other customers will read this)

Length: under 100 words. No defensiveness, no blame.
```

### Positive Review Response

**When to use:** Responding to 4-5 star reviews — build loyalty, encourage more reviews.

```
Write a response to this positive review:

Review: [paste review]
Product: [name]
Review rating: [4-5 stars]
What they praised: [summarize]
Brand voice: [tone]

Response should:
- Thank them specifically (reference what they said)
- Add value (tip, related product, behind-scenes)
- Encourage them to share or review again
- Be warm but not over-the-top

Length: under 80 words. Make them feel seen.
```

### FAQ Knowledge Base Generator

**When to use:** Building a help center — reduces support tickets by 30%+.

```
Create a FAQ knowledge base for:

Brand: [name]
Products: [list main products]
Common questions: [list 10-15 questions customers ask]

Organize into categories:
1. Orders & Shipping
2. Returns & Refunds
3. Product Usage
4. Account & Billing
5. Troubleshooting

For each question:
- Clear question title
- Concise answer (under 100 words)
- Related links/resources
- "Still need help?" CTA
```

### Live Chat / Chatbot Script

**When to use:** Website chat or WhatsApp bot — handle common questions automatically.

```
Write chatbot conversation flows for:

Brand: [name]
Products: [main products]
Common intents: [order status / product question / shipping info / return request / human handoff]

For each intent, create:
1. Greeting/trigger phrase
2. Qualifying question(s)
3. Response with answer
4. Fallback/escalation path
5. Closing/next step

Keep responses under 50 words. Conversational, not robotic.
```

### Returns/Refund Response

**When to use:** Processing return requests — make it easy while protecting margins.

```
Write returns/refund response templates for:

Brand: [name]
Return policy: [e.g., 30 days, unused, original packaging]
Product: [name]
Brand voice: [tone]

Scenarios:
1. Return approved (happy path)
2. Return denied (policy violation — be kind but firm)
3. Partial refund offered (damaged but kept)
4. Exchange suggested (wrong size/color)
5. Follow-up after return processed

Each: email/WhatsApp template with [VARIABLE] placeholders.
```

### VIP Customer Response

**When to use:** High-value customers — they deserve white-glove treatment.

```
Write a VIP customer response for:

Customer: [name, purchase history, LTV]
Situation: [e.g., "complaint about shipping" / "asking for early access" / "referral request"]
Brand voice: [tone]

Response should:
- Acknowledge their status ("As one of our top customers...")
- Resolve their issue with priority
- Offer something extra (early access, exclusive discount, personal thank you)
- Make them feel valued, not processed

Length: under 100 words. Personal, not templated.
```

> **KEY INSIGHT:** Support isn't a cost center — it's a marketing channel. Every response is a brand moment. Prompt for responses that solve the problem AND build the relationship.

---

## Chapter 10: Pricing & Offer Prompts

Pricing is the most under-optimized lever in ecommerce — a 10% price increase on the same volume is pure profit.

### Pricing Strategy Analysis

**When to use:** Deciding what to charge — too low leaves money on table, too high kills conversion.

```
Analyze pricing strategy for this product:

Product: [name, cost, current price or target price]
Competitors: [list 2-3 with their prices]
Target margin: [desired %]
Market position: [budget / mid-range / premium]

Provide:
1. Cost-plus analysis (margin at different price points)
2. Value-based pricing argument (what it's worth to customer)
3. Competitive positioning
4. Recommended price range (with reasoning)
5. 3 pricing psychology tactics to test
6. A/B test suggestions (what to test first)
```

### Discount/Offer Structure

**When to use:** Creating offers that drive action without destroying margins.

```
Create a discount offer for:

Product: [name, price, margin]
Goal: [clear inventory / acquire customers / reward loyalty / launch]
Audience: [who gets this offer]
Constraints: [max discount %, duration, eligibility]

Recommend:
1. Offer type (percentage off / dollar off / BOGO / bundle / free gift)
2. Specific offer (e.g., "20% off orders over $75")
3. Urgency mechanics (deadline, quantity limit, first X customers)
4. Margin impact analysis
5. 3 alternate offers to A/B test
6. Email/announcement copy for the offer
```

### Bundle Pricing Strategy

**When to use:** Increasing AOV — bundles convert better than single products.

```
Design a bundle strategy for:

Products: [list 3-5 related products]
Individual prices: [list]
Target AOV increase: [desired %]
Customer: [who buys these]

Create:
1. 3 bundle options (starter / complete / premium)
2. Bundle names and contents
3. Bundle pricing (show savings clearly)
4. "Add to bundle" upsell logic
5. Bundle landing page copy
6. Email announcement for bundle launch
```

### Subscription/Recurring Offer

**When to use:** Products customers buy repeatedly — subscriptions increase LTV.

```
Design a subscription offer for:

Product: [name — consumable / replenishable]
Frequency options: [e.g., 30/60/90 days]
Subscription discount: [desired %]
Customer pain: [running out / forgetting / wanting convenience]

Create:
1. Subscription tiers (if multiple products)
2. Frequency recommendations with reasoning
3. Pricing structure (monthly vs. per-delivery)
4. "Skip/pause/cancel" policy (reduces churn anxiety)
5. Landing page copy for subscription vs. one-time
6. Email sequence for subscription signup
```

### Flash Sale / Urgency Offer

**When to use:** Limited-time offers — create urgency without sounding desperate.

```
Create a flash sale for:

Product: [name, price]
Duration: [e.g., 24 hours / 48 hours]
Discount: [percentage or dollar amount]
Inventory: [limited quantity or unlimited]
Audience: [email list / site visitors / social]

Deliver:
1. Sale announcement email (subject + body)
2. Countdown timer copy suggestions
3. Social media posts (3 variations)
4. Website banner copy
5. "Last chance" follow-up message
6. Post-sale "thanks for joining" email

Make urgency feel real, not manufactured.
```

### Free Shipping Threshold Analysis

**When to use:** Free shipping is the #1 purchase driver — find the right threshold.

```
Analyze free shipping threshold for:

Store: [name]
AOV: [current average order value]
Shipping cost: [avg cost to ship]
Products: [price range]
Margin: [average margin %]

Calculate:
1. Current AOV vs. target AOV
2. Shipping cost as % of AOV
3. Threshold that increases AOV by 15-25% without killing margin
4. "Add $X for free shipping" messaging test
5. Comparison: free shipping vs. flat rate vs. threshold
6. Implementation recommendation
```

### Price Anchoring Copy

**When to use:** Making your price feel reasonable by showing a higher anchor first.

```
Write price anchoring copy for:

Product: [name, price]
Anchor product/comparison: [higher-priced alternative or "before" price]
Value proposition: [why you're worth it]

Create:
1. "Compare at" messaging (if applicable)
2. Value stack breakdown (what they'd pay for separately)
3. "Worth $X, yours for $Y" framing
4. Payment plan messaging ("just $X/month")
5. Risk reversal (guarantee, returns, trial)
```

### Loyalty/Rewards Program Structure

**When to use:** Retaining customers — loyalty programs increase repeat purchase rate.

```
Design a loyalty program for:

Store: [name]
Average customer LTV: [current]
Repeat purchase rate: [current %]
Products: [consumable / durable / mixed]

Recommend:
1. Program type (points / cashback / tiers / subscription)
2. Earning structure (points per $1, etc.)
3. Redemption options (discount / free product / exclusive access)
4. Tier structure (if applicable)
5. Launch email/announcement copy
6. Program rules (expiration, exclusions)
```

> **KEY INSIGHT:** Pricing isn't about what's "fair" — it's about what the market will bear and what your positioning supports. Prompt for data-driven pricing, not gut-feel.

---

## Chapter 11: Competitor Analysis Prompts

Knowing what your competitors are doing — their copy, their offers, their positioning — is intelligence gold.

### Competitor Product Analysis

**When to use:** Before launching a competing product — know what you're up against.

```
Analyze this competitor's product:

Competitor: [name/URL]
Product: [name]
Price: [their price]

Analyze:
1. Their positioning (who they're targeting, what they promise)
2. Their copy approach (tone, hooks, CTAs)
3. Their strengths (what they do well)
4. Their weaknesses (gaps, complaints, limitations)
5. Their pricing strategy (value vs. premium vs. budget)
6. Your opportunity (how to differentiate)

Format as a SWOT-style analysis.
```

### Competitor Ad Spy Analysis

**When to use:** Seeing what ads your competitors are running — they're paying to test these.

```
Analyze competitor ad strategy:

Competitors: [list 2-3]
Platforms: [Meta / Google / TikTok]

For each competitor, identify:
1. Ad formats they're using (video / image / carousel)
2. Their hook styles (curiosity / pain / social proof)
3. Their offers (discount / guarantee / bundle)
4. Their target audience (who they're speaking to)
5. Their creative themes (what visuals/messages repeat)
6. What you can learn/apply/avoid

[If using browsing-enabled AI, provide ad library URLs.]
```

### Competitor Pricing Comparison

**When to use:** Ensuring you're priced right relative to the market.

```
Create a competitor pricing comparison:

My product: [name, price, features]
Competitors: [list 3-5 with prices]

Build a table comparing:
- Price
- Key features
- Materials/quality
- Guarantee/warranty
- Shipping/returns
- Brand positioning
- Target customer

Identify:
1. Where I undercut (opportunity)
2. Where I'm premium (justify or adjust)
3. Where I'm missing features (gap to fill)
4. Recommended price positioning
```

### Competitor Content Gap Analysis

**When to use:** Finding content topics competitors aren't covering — your SEO opportunity.

```
Find content gaps vs. competitors:

My site: [URL]
Competitors: [list 2-3 URLs]
Niche: [product category]

Analyze:
1. Topics competitors rank for that I don't
2. Questions they answer that I don't
3. Content formats they use that I don't
4. Keywords they target that I miss
5. Top 10 content opportunities (ranked by difficulty × traffic potential)

Format as a prioritized action list.
```

### Competitor Review Mining

**When to use:** Stealing your competitors' customers — their complaints are your marketing.

```
Mine competitor reviews for insights:

Competitor: [name]
Product: [name]
Review sources: [Amazon / Google / Trustpilot / etc.]

Analyze 1-star and 5-star reviews to find:
1. Top 5 complaints (my opportunity)
2. Top 5 things customers love (table stakes)
3. Language patterns in negative reviews (emotional triggers)
4. Language patterns in positive reviews (what resonates)
5. Feature requests customers mention (product roadmap ideas)

Use exact customer phrases where possible — that's your copy gold.
```

### Competitor Social Media Analysis

**When to use:** Understanding what content works in your niche.

```
Analyze competitor social media strategy:

Competitors: [list 2-3]
Platforms: [Instagram / TikTok / LinkedIn / etc.]

For each competitor:
1. Content types that get most engagement
2. Posting frequency and timing
3. Hashtag strategy
4. UGC/creator usage
5. Community engagement approach
6. What you should copy, adapt, or avoid

Focus on patterns, not individual posts.
```

### "Why Us" Differentiation Prompt

**When to use:** Articulating why customers should choose you — the foundation of all marketing.

```
Define my competitive differentiation:

My brand: [name, story, values]
My product: [name, features, price]
Competitors: [list 2-3]
Target customer: [avatar]

Create:
1. 3 unique differentiators (what I do that they don't)
2. "Why us" messaging for each (customer-facing language)
3. Comparison table (me vs. them on key factors)
4. Objection handler ("Why not just buy [competitor]?")
5. Brand manifesto (100 words — why we exist)
```

> **KEY INSIGHT:** Competitor analysis isn't about copying — it's about *finding the gap they leave open*. The best differentiation is the thing they can't easily copy: your story, your customer relationship, your niche expertise.

---

## Chapter 12: Master Prompt Library — 80+ Ready-to-Use Prompts

Every prompt below is copy-paste ready. Swap the bracketed details for your product, customer, and brand voice.

---

### Product Research & Strategy

#### Niche Validation Prompt

**When to use:** Quick go/no-go on a product idea.

```
Validate this product idea for a Shopify store:

Product: [describe]
Price point: [$X]
Target market: [country]
Ad budget available: [$X/month]

Give me:
1. Demand signal check
2. Competition level (saturated / moderate / open)
3. Margin potential at typical ad costs
4. Top 3 risks
5. Verdict: pursue / pass / test-with-small-budget
```

#### Customer Pain Point Finder

**When to use:** Understanding what problem your product actually solves.

```
Find the real customer pain points for:

Product: [name, features]
Target customer: [avatar]

List 10 pain points ranked by:
1. Emotional intensity
2. Frequency
3. Willingness to pay to solve it

For the top 3, write the exact words a customer would use to describe the problem.
```

#### Product-Market Fit Questions

**When to use:** Before scaling — make sure the product solves a real problem.

```
Ask me 10 questions to evaluate product-market fit for:

Product: [name]
Current traction: [sales, reviews, feedback]
Target customer: [who]

Questions should cover: problem severity, current alternatives, willingness to pay, switching cost, market size, timing, differentiation, retention, referral potential, expansion opportunity.
```

#### Ideal Customer Profile Builder

**When to use:** Defining exactly who you're selling to.

```
Build an Ideal Customer Profile for:

Product: [name, price, use case]
Current customers: [describe or paste data]
Market: [country/platform]

Create a detailed ICP with:
- Demographics (age, income, location, situation)
- Psychographics (values, fears, aspirations)
- Buying behavior (how they discover, decide, purchase)
- Top 3 objections to overcome
- Best channels to reach them
- Messaging that resonates
```

#### Competitor Feature Gap Analysis

**When to use:** Finding features competitors have that you don't (or vice versa).

```
Compare feature sets:

My product: [name, features list]
Competitor A: [name, features list]
Competitor B: [name, features list]

Create a table showing:
- Features I have that they don't (my advantages)
- Features they have that I don't (my gaps)
- Features we all have (table stakes)
- Features neither has (opportunity)

Recommend which gaps to fill vs. which to ignore.
```

---

### Listing & Copywriting

#### Product Title Variations

**When to use:** A/B testing product titles.

```
Write 10 product title variations for:

Product: [name, key features]
Target keyword: [keyword]
Platform: [Shopify/Amazon/Flipkart]

Mix: 3 SEO-heavy, 3 emotional, 2 benefit-focused, 2 curiosity-driven.
All under platform character limit.
```

#### Product Description — Emotional Angle

**When to use:** Copy that sells the feeling, not just the features.

```
Write a product description focused on emotion:

Product: [name]
What it helps customer achieve: [outcome]
How it makes them feel: [emotion]

Write 3 versions:
1. Aspiration-focused (who they'll become)
2. Relief-focused (what pain disappears)
3. Belonging-focused (community/identity)

Each under 150 words. No feature lists — pure emotion.
```

#### Product Description — Feature Angle

**When to use:** Copy for technical buyers who want specs.

```
Write a product description focused on features/specs:

Product: [name]
Key specs: [list]
Target customer: [technical buyer]

Write 2 versions:
1. Spec-heavy (all details, organized)
2. Spec-to-benefit (each spec translated to what it means)

Include comparison to generic alternatives where relevant.
```

#### Bullet Point Variations

**When to use:** Testing different bullet point styles.

```
Write bullet points in 3 different styles for:

Product: [name, features]

Style 1: Benefit-first ("Wake up refreshed" not "Has alarm")
Style 2: Problem-solution ("Tired of X? This does Y")
Style 3: Specification-proof ("10-hour battery, tested")

7 bullets each. Max 20 words per bullet.
```

#### Product Page FAQ

**When to use:** Comprehensive FAQ for product page.

```
Write 15 FAQ items for:

Product: [name, features, price, use case]

Categories:
- Usage (5 questions)
- Compatibility (3 questions)
- Quality/Durability (3 questions)
- Purchase/Shipping (2 questions)
- Comparison (2 questions)

Answers under 50 words each. Conversational tone.
```

#### Product Image Alt Text

**When to use:** Accessibility + SEO for product images.

```
Write alt text for these product images:

Product: [name]
Images: [describe what each image shows]
Target keyword: [keyword]

For each image:
- Descriptive alt text (under 125 chars)
- Include keyword naturally where relevant
- Describe what's visible, not just the product name
```

#### Product Video Script

**When to use:** Product demo videos — show don't tell.

```
Write a 60-second product demo video script:

Product: [name, key features]
Format: [demo / unboxing / testimonial / how-to]
Target audience: [who]

Script:
- 0-5s: Hook (what problem this solves)
- 5-45s: Demo (show key features in action)
- 45-55s: Results/benefits
- 55-60s: CTA

Include: voiceover, on-screen text, music notes, shot list.
```

#### Product Comparison Page

**When to use:** "Why choose us" page — comparison content converts.

```
Write a product comparison page:

My product: [name, features, price]
vs.
Alternative 1: [generic/competitor]
Alternative 2: [competitor]

Structure:
- Headline ("How we compare")
- Comparison table (8-10 rows)
- "Best for" sections
- FAQ
- CTA

Be honest — include rows where competitor wins.
```

---

### Advertising

#### Facebook Ad — Single Image

**When to use:** Standard FB/IG image ad.

```
Write a Facebook ad for:

Product: [name, benefit]
Audience: [who]
Offer: [discount/free shipping/etc.]
Image description: [what the image shows]

Deliver:
- Primary text (under 125 words, hook + benefits + CTA)
- Headline (under 40 chars)
- Description (under 30 chars)
- CTA button text
```

#### Facebook Ad — Carousel

**When to use:** Multi-product or multi-benefit carousel.

```
Write a 5-card Facebook carousel ad:

Product: [name]
Goal: [sell / educate / retarget]
Cards: [list what each card covers]

For each card:
- Headline (under 40 chars)
- Body (under 125 chars)
- Visual direction
- CTA (on last card)
```

#### Google Search Ad — Exact Match

**When to use:** Keyword-targeted search ads.

```
Write a Google Search ad for keyword: [keyword]

Product: [name]
Landing page: [URL]
USP: [main differentiator]
Offer: [what they're getting]

Headlines (3, under 30 chars each):
Descriptions (2, under 90 chars each):
Display URL path:
```

#### Google Search Ad — Broad Match

**When to use:** Catching varied search queries.

```
Write a Google Search ad for broad match:

Product category: [e.g., "yoga mats"]
Target audience: [who]
Key benefits: [list 3]
Offer: [incentive]

Create ads that work for multiple search intents:
- Informational ("best yoga mat for beginners")
- Commercial ("yoga mat deals")
- Transactional ("buy yoga mat online")
```

#### TikTok Ad Script — 15s

**When to use:** Ultra-short TikTok ads.

```
Write a 15-second TikTok ad:

Product: [name, benefit]
Hook style: [question / bold claim / visual surprise]
CTA: [what action]

Script (15s):
- 0-3s: Hook
- 3-12s: Product + benefit
- 12-15s: CTA

Include on-screen text and sound suggestions.
```

#### TikTok Ad Script — 60s

**When to use:** Longer TikTok ads with story.

```
Write a 60-second TikTok ad:

Product: [name]
Story arc: [problem → discovery → solution → result]
Creator persona: [who's "posting" this]

Full script with:
- Scene-by-scene breakdown
- Dialogue/voiceover
- On-screen text
- Music/mood
- CTA
```

#### Instagram Story Ad

**When to use:** Vertical story-format ads.

```
Write a 3-frame Instagram Story ad:

Product: [name, offer]
Goal: [click / purchase / lead]

Frame 1: Hook (visual + text)
Frame 2: Value/benefit
Frame 3: CTA + link sticker

Each frame: visual description, text overlay (under 15 words), interactive element.
```

#### YouTube Ad Script — Skippable

**When to use:** YouTube ads that must hook before skip.

```
Write a 15-second YouTube ad (skippable after 5s):

Product: [name, benefit]
Must communicate: [key message] in first 5 seconds

Script:
- 0-5s: Hook (must work before skip)
- 5-15s: Value + CTA

Include visual direction and voiceover.
```

#### Retargeting Ad — Cart Abandoner

**When to use:** People who added to cart but didn't buy.

```
Write a retargeting ad for cart abandoners:

Product: [name, price]
Time since abandonment: [24h / 7d]
Their cart: [what they were buying]

Ad copy should:
- Reference their specific interest
- Address likely objection
- Include incentive if applicable
- Create urgency

3 variations: gentle / objection-handler / incentive.
```

#### Lookalike Ad Variation

**When to use:** Testing variations of winning ad.

```
Create 5 variations of this winning ad:

Original: [paste ad]

Test one element at a time:
1. Hook
2. CTA
3. Proof point
4. Offer
5. Format

Label what each tests.
```

---

### Email & Messaging

#### Welcome Email — Single

**When to use:** First email to new subscriber.

```
Write a welcome email for:

Brand: [name]
What they signed up for: [lead magnet/newsletter]
Brand voice: [tone]
First offer: [discount/free shipping/etc.]

Subject line options (3):
Preview text:
Body (under 200 words):
CTA:
```

#### Welcome Email Sequence — 3 Emails

**When to use:** Short welcome sequence.

```
Write a 3-email welcome sequence:

Email 1 (day 0): Welcome + deliver + brand intro
Email 2 (day 2): Value/education
Email 3 (day 4): Soft sell + offer

For each: subject, preview, body (under 150 words), CTA.
```

#### Abandoned Cart — Email 1

**When to use:** First reminder after cart abandonment.

```
Write abandoned cart email 1 (send 1 hour after):

Product: [name, price]
Cart value: [$X]
Brand voice: [tone]

Subject options (3):
Body (under 100 words):
CTA:
```

#### Abandoned Cart — Email 2

**When to use:** Second reminder with objection handling.

```
Write abandoned cart email 2 (send 24 hours after):

Address top objection: [price/trust/shipping/etc.]
Include social proof: [review/stat]

Subject options (3):
Body (under 120 words):
CTA:
```

#### Abandoned Cart — Email 3

**When to use:** Final reminder with urgency.

```
Write abandoned cart email 3 (send 72 hours after):

Create urgency: [limited time/stock/incentive]
Offer: [optional discount]

Subject options (3):
Body (under 100 words):
CTA:
```

#### Post-Purchase — Review Request

**When to use:** Asking for review after delivery.

```
Write a review request email:

Product: [name]
Days since delivery: [e.g., 7]
Platform: [Amazon/Shopify/etc.]
Review link: [URL]

Subject options (3):
Body (under 100 words):
CTA:
```

#### Post-Purchase — Cross-Sell

**When to use:** Suggesting related products after purchase.

```
Write a post-purchase cross-sell email:

Purchased: [product]
Recommend: [related product]
Why it pairs well: [reason]
Discount: [if any]

Subject options (3):
Body (under 120 words):
CTA:
```

#### Win-Back Email

**When to use:** Reactivating lapsed customers.

```
Write a win-back email for customers inactive 90+ days:

Brand: [name]
Last purchase: [product/category]
Incentive: [discount/free gift/etc.]
What's new: [recent products/updates]

Subject options (3):
Body (under 150 words):
CTA:
```

#### Product Launch — Announcement

**When to use:** Announcing new product.

```
Write a product launch email:

Product: [name, key benefit]
Launch offer: [early access/discount/etc.]
Launch date: [date]
Brand voice: [tone]

Subject options (3):
Preview text:
Body (under 200 words):
CTA:
```

#### Flash Sale Announcement

**When to use:** Promoting limited-time sale.

```
Write a flash sale email:

Sale: [what's on sale]
Discount: [% or $]
Duration: [e.g., 24 hours]
Urgency: [why now]

Subject options (3):
Body (under 120 words):
CTA:
```

#### WhatsApp Message — Order Confirmation

**When to use:** Order confirmation via WhatsApp.

```
Write a WhatsApp order confirmation message:

Order: [#12345]
Product: [name]
Delivery: [estimate]
Support contact: [WhatsApp number]

Message (under 300 characters):
- Confirm order
- Set expectations
- Offer help
- Include tracking link placeholder
```

#### WhatsApp Message — Shipping Update

**When to use:** Delivery update notification.

```
Write a WhatsApp shipping update:

Order: [#12345]
Status: [shipped / out for delivery / delivered]
Tracking: [link]
ETA: [date]

Message (under 250 characters):
- Update status
- ETA
- What to do if issue
- Support contact
```

#### WhatsApp Message — Review Request

**When to use:** Asking for review via WhatsApp.

```
Write a WhatsApp review request:

Product: [name]
Days since delivery: [e.g., 5]
Review link: [URL]
Incentive: [if any]

Message (under 300 characters):
- Thank them
- Ask for review
- Make it easy (link)
- Offer incentive if allowed
```

#### WhatsApp Broadcast — Promo

**When to use:** Promotional broadcast to customers.

```
Write a WhatsApp broadcast promotion:

Offer: [discount/free shipping/etc.]
Product: [name]
Urgency: [deadline]
Audience: [customers/leads]

Message (under 300 characters):
- Hook
- Offer
- Urgency
- CTA
```

#### SMS Marketing — Short Promo

**When to use:** SMS campaigns — under 160 characters.

```
Write an SMS promotion:

Offer: [discount/free shipping]
Product: [name]
Link: [short URL]
Urgency: [deadline]

Message (under 160 characters):
- Hook
- Offer
- Link
- Opt-out reminder if required
```

---

### Social Media

#### Instagram Caption — Product

**When to use:** Product-focused Instagram post.

```
Write an Instagram caption for:

Product: [name, benefit]
Visual: [describe image]
Brand voice: [tone]
CTA: [shop now / link in bio / etc.]

Caption (under 300 words):
- Hook (first line)
- Body
- CTA
- 15-20 hashtags
```

#### Instagram Caption — Educational

**When to use:** Value-first content.

```
Write an Instagram caption:

Topic: [tip/fact/how-to]
Audience: [who]
Brand voice: [tone]
Goal: [saves / shares / engagement]

Caption:
- Hook
- Value (the tip/fact)
- CTA (save/share/follow)
- Hashtags
```

#### Instagram Caption — Behind Scenes

**When to use:** Humanizing your brand.

```
Write an Instagram caption:

Behind-scenes moment: [describe]
Brand voice: [tone]
Goal: [connection / trust]

Caption (under 200 words):
- Hook
- Story
- CTA (engage)
- Hashtags
```

#### Instagram Reel Script — 15s

**When to use:** Quick reel content.

```
Write a 15-second Instagram Reel script:

Topic: [product/tip/trend]
Format: [tutorial/POV/before-after]
Hook: [first 1.5s]
CTA: [end]

Script with:
- Scene breakdown
- On-screen text
- Voiceover
- Music notes
- Caption + hashtags
```

#### Instagram Reel Script — 30s

**When to use:** Standard reel length.

```
Write a 30-second Instagram Reel script:

Topic: [describe]
Format: [choose]
Target audience: [who]

Full script:
- 0-2s: Hook
- 2-25s: Content
- 25-30s: CTA

Include shot list, text overlays, voiceover, caption, hashtags.
```

#### Instagram Reel Script — 60s

**When to use:** Longer-form reel content.

```
Write a 60-second Instagram Reel script:

Topic: [describe]
Format: [tutorial/story/review]
Structure: [hook → content → payoff → CTA]

Complete script with:
- Scene-by-scene
- Dialogue/voiceover
- B-roll suggestions
- Text overlays
- Music/mood
- Caption + hashtags
```

#### Carousel Post — 5 Slides

**When to use:** Educational carousel content.

```
Write a 5-slide Instagram carousel:

Topic: [e.g., "5 mistakes killing your sales"]
Audience: [who]
Tone: [educational/provocative]

Each slide:
- Headline (under 10 words)
- Body (under 30 words)
- Visual direction

Slide 1: Hook
Slide 5: CTA/summary
```

#### Carousel Post — 10 Slides

**When to use:** Comprehensive guide carousel.

```
Write a 10-slide Instagram carousel:

Topic: [detailed subject]
Audience: [who]
Goal: [saves / authority / traffic]

Each slide:
- Number
- Headline
- Body text
- Visual direction

Structure: Hook → Value → More value → Recap → CTA
```

#### Story Sequence — 5 Frames

**When to use:** Instagram Stories campaign.

```
Write a 5-frame Instagram Story sequence:

Goal: [e.g., "drive sales" / "answer questions" / "build hype"]
Product/offer: [details]
Audience: [who]

Each frame:
- Visual direction
- Text overlay (under 15 words)
- Interactive element (poll/question/slider/link)
- CTA
```

#### LinkedIn Post — Thought Leadership

**When to use:** LinkedIn content for authority.

```
Write a LinkedIn post:

Topic: [insight/lesson/story]
Audience: [founders/marketers/etc.]
Tone: [authoritative/vulnerable/contrarian]
Length: [150-300 words]

Structure:
- Hook (bold claim or takeaway)
- Story/proof
- Insight
- CTA (question)

No hashtags or max 3.
```

#### LinkedIn Post — Product Update

**When to use:** Sharing product news on LinkedIn.

```
Write a LinkedIn post announcing:

Update: [what changed/launched]
Why it matters: [customer benefit]
Brand voice: [tone]

Post:
- Hook (what's new)
- Details (what changed)
- Benefit (why customers care)
- CTA (try it/learn more)
```

#### Pinterest Pin — Standard

**When to use:** Pinterest content for traffic.

```
Write a Pinterest pin:

Product/topic: [describe]
Target keyword: [SEO keyword]
Pin title: [under 100 chars]
Description: [under 500 chars]
Board: [suggested board name]
```

#### Pinterest Pin — Idea Pin

**When to use:** Multi-page Pinterest content.

```
Write a Pinterest Idea Pin (multi-page):

Topic: [e.g., "5 ways to style [product]"]
Pages: [number of pages]
For each page:
- Page number
- Visual direction
- Text overlay
- Page title

Include pin title, description, and hashtags.
```

#### Twitter/X Thread

**When to use:** Twitter threads for engagement.

```
Write a Twitter/X thread:

Topic: [e.g., "10 lessons from scaling to $100K/month"]
Number of tweets: [5-10]
Tone: [educational/contrarian/story]

Each tweet:
- Tweet number
- Text (under 280 chars)
- Hook for first tweet
- CTA for last tweet
```

#### YouTube Short Script

**When to use:** YouTube Shorts content.

```
Write a YouTube Short script (60s max):

Topic: [describe]
Format: [tutorial/review/story]
Hook: [first 3s]
CTA: [end]

Script:
- 0-3s: Hook
- 3-50s: Content
- 50-60s: CTA

Include title, description, hashtags.
```

#### YouTube Long-Form Outline

**When to use:** YouTube video planning.

```
Write a YouTube video outline:

Topic: [describe]
Length: [8-15 min]
Format: [tutorial/review/vlog]
Target audience: [who]
Goal: [subs/traffic/sales]

Outline:
- Intro (0-1 min): Hook + what they'll learn
- Chapter 1 (1-4 min): [topic]
- Chapter 2 (4-7 min): [topic]
- Chapter 3 (7-10 min): [topic]
- Conclusion (10-12 min): Recap + CTA

Include title ideas, description, tags.
```

#### TikTok Script — Trend Jack

**When to use:** Riding trending sounds/formats.

```
Write a TikTok script using this trend:

Trend: [describe trend/sound/format]
Product tie-in: [how to include product naturally]
Creator persona: [who's posting]

Script:
- How trend is used
- Where product fits
- CTA
- Caption + hashtags
```

#### Instagram Story — Poll/Question

**When to use:** Engagement-focused stories.

```
Write an Instagram Story engagement post:

Type: [poll / question box / quiz / slider]
Topic: [what to ask]
Product tie-in: [optional]

Provide:
- Story visual direction
- Question/poll options
- Follow-up response strategy
- Caption for story
```

#### Facebook Group Post

**When to use:** Community engagement.

```
Write a Facebook group post:

Group: [niche community]
Topic: [question/value/share]
Goal: [engagement/help]

Post:
- Hook
- Value/question
- CTA (comment/share)
- Follow-up questions to spark discussion
```

#### Reddit Post — Value First

**When to use:** Reddit marketing — provide value, not spam.

```
Write a Reddit post for r/[subreddit]:

Topic: [helpful advice related to your niche]
Product mention: [subtle, if allowed]
Goal: [help/authority]

Post:
- Title (under 300 chars)
- Body (value-first, not promotional)
- When/if to mention product
- Response strategy for comments
```

---

### Support & Operations

#### Customer Support — Shipping Inquiry

**When to use:** "Where's my order?" responses.

```
Write a customer support response for shipping inquiry:

Customer: [name]
Order: [#12345]
Issue: [e.g., "hasn't arrived" / "tracking not updating"]

Response template:
- Acknowledge
- Check status
- Provide update/solution
- Offer help

Under 100 words. Empathetic, efficient.
```

#### Customer Support — Return Request

**When to use:** Processing return requests.

```
Write a return request response:

Customer: [name]
Product: [name]
Reason: [reason]
Return policy: [30 days, unused, etc.]

Response:
- Acknowledge request
- Confirm eligibility
- Next steps (label, refund timeline)
- Alternative (exchange if applicable)

Under 120 words. Helpful, not bureaucratic.
```

#### Customer Support — Product Question

**When to use:** Pre-sale or post-sale product questions.

```
Write a product question response:

Customer: [name]
Question: [e.g., "Is this compatible with X?" / "How do I use Y?"]
Product: [name]

Response:
- Direct answer first
- Supporting details
- Related info
- CTA (buy/learn more)

Under 100 words. Clear, not salesy.
```

#### Negative Review Response

**When to use:** Responding to bad reviews publicly.

```
Write a response to this negative review:

Review: [paste]
Rating: [1-3 stars]
Product: [name]
Issue: [summarize]

Response:
- Acknowledge specific issue
- Take responsibility (without admitting fault)
- Offer solution
- Invite direct contact

Under 100 words. No defensiveness.
```

#### Positive Review Response

**When to use:** Responding to good reviews.

```
Write a response to this positive review:

Review: [paste]
Rating: [4-5 stars]
Product: [name]
What they praised: [summarize]

Response:
- Thank specifically
- Add value (tip/resource)
- Encourage sharing

Under 80 words. Warm, not over-the-top.
```

#### FAQ Entry — Product

**When to use:** Individual FAQ entries.

```
Write a FAQ entry for:

Question: [e.g., "Can I use this product for X?"]
Product: [name]
Answer length: [under 100 words]

Format:
- Question (clear, searchable)
- Answer (concise, helpful)
- Related link if applicable
```

#### Live Chat Script — Greeting

**When to use:** Chatbot or live chat opening.

```
Write a live chat greeting for:

Brand: [name]
Common intents: [order status / product question / support]
Tone: [friendly/efficient]

Greeting:
- Welcome message
- Ask how you can help
- Quick reply options (buttons)
```

#### Live Chat Script — Handoff

**When to use:** Escalating to human agent.

```
Write a chat handoff message:

Customer issue: [describe]
Why escalating: [needs human judgment]
Wait time: [estimate]

Message:
- Acknowledge complexity
- Set expectations
- Offer alternative (callback/email)
- Thank for patience
```

#### Return/Refund Policy Page

**When to use:** Creating return policy page.

```
Write a return/refund policy for:

Store: [name]
Return window: [days]
Conditions: [unused, original packaging, etc.]
Refund method: [original payment/credit]
Exceptions: [final sale items, etc.]

Policy sections:
- Eligibility
- How to initiate return
- Return shipping
- Refund timeline
- Exceptions
- Contact info
```

---

### Pricing & Strategy

#### Pricing Analysis Request

**When to use:** Getting pricing recommendations.

```
Analyze pricing for:

Product: [name]
Cost: [$X]
Current/target price: [$X]
Competitors: [$X, $X, $X]
Margin goal: [%]

Provide:
- Price range recommendation
- Margin analysis at each price
- Competitive positioning
- Pricing psychology tactics
- A/B test suggestions
```

#### Discount Strategy

**When to use:** Planning promotional discounts.

```
Create a discount strategy for:

Product: [name, price, margin]
Goal: [clear inventory / acquire customers / reward loyalty]
Constraints: [max discount %, duration]

Recommend:
- Discount type and amount
- Urgency mechanics
- Margin impact
- 3 alternate offers to test
- Announcement copy
```

#### Bundle Strategy

**When to use:** Creating product bundles.

```
Design a bundle strategy for:

Products: [list 3-5]
Individual prices: [list]
Target AOV increase: [%]

Create:
- 3 bundle options (starter/complete/premium)
- Bundle names and contents
- Pricing with savings shown
- Landing page copy
- Email announcement
```

#### Subscription Offer

**When to use:** Recurring revenue model.

```
Design a subscription offer for:

Product: [name — replenishable]
Frequency: [30/60/90 days]
Discount: [%]

Create:
- Subscription tiers
- Pricing structure
- Skip/pause/cancel policy
- Landing page copy
- Email sequence
```

#### Free Shipping Threshold

**When to use:** Optimizing shipping economics.

```
Analyze free shipping threshold:

Store: [name]
AOV: [$X]
Shipping cost: [$X avg]
Margin: [%]

Calculate:
- Current vs. target AOV
- Threshold for 15-25% AOV increase
- Margin impact
- Messaging recommendations
```

#### Loyalty Program Structure

**When to use:** Building customer loyalty.

```
Design a loyalty program:

Store: [name]
Customer LTV: [$X]
Repeat rate: [%]

Recommend:
- Program type (points/cashback/tiers)
- Earning structure
- Redemption options
- Launch copy
- Program rules
```

---

### Research & Analysis

#### Competitor Product Analysis

**When to use:** Analyzing competing products.

```
Analyze competitor product:

Competitor: [name/URL]
Product: [name, price]

Provide:
- Positioning
- Copy approach
- Strengths
- Weaknesses
- Pricing strategy
- Your opportunity
```

#### Competitor Ad Analysis

**When to use:** Understanding competitor advertising.

```
Analyze competitor ads:

Competitors: [list]
Platforms: [Meta/Google/TikTok]

For each:
- Ad formats
- Hook styles
- Offers
- Target audience
- Creative themes
- What to learn/avoid
```

#### Review Mining — Competitor

**When to use:** Learning from competitor reviews.

```
Mine competitor reviews:

Competitor: [name]
Product: [name]
Sources: [Amazon/Google/etc.]

Find:
- Top complaints (opportunity)
- Top praises (table stakes)
- Language patterns (copy gold)
- Feature requests (product ideas)
```

#### Market Trend Analysis

**When to use:** Evaluating market trends.

```
Analyze market trend:

Product/niche: [describe]
Trend source: [TikTok/Amazon/Google Trends]
Timeframe: [weeks/months]

Assess:
- Demand trajectory
- Competition level
- Lifecycle stage
- Margin potential
- Go/no-go recommendation
```

#### Customer Avatar Deep Dive

**When to use:** Detailed customer understanding.

```
Deep dive on customer avatar:

Product: [name, price]
Current customers: [data/description]

Create:
- Demographics
- Psychographics
- Buying triggers
- Objections
- Online hangouts
- Exact words they use
```

#### USP Identification

**When to use:** Finding your unique angle.

```
Identify my USP:

Product: [name, features]
Competitors: [list]
Target customer: [who]

Find:
- 10 possible differentiators
- Rank by emotional impact
- Top differentiator + messaging
- 3 headline variations
```

---

### Content & SEO

#### Blog Post Outline

**When to use:** Planning blog content.

```
Create blog post outline:

Topic: [describe]
Target keyword: [keyword]
Audience: [who]
Word count: [1500-2500]

Outline:
- Title
- Meta description
- Introduction hook
- H2 sections (4-6)
- Product mention
- FAQ
- Conclusion + CTA
```

#### How-To Guide

**When to use:** Tutorial content.

```
Write a how-to guide:

Topic: [task]
Target keyword: [keyword]
Audience: [who]
Product tie-in: [optional]

Structure:
- Title
- Materials needed
- Step-by-step (numbered)
- Tips/troubleshooting
- FAQ
- CTA
```

#### Product Comparison Article

**When to use:** "X vs Y" content.

```
Write product comparison:

Products: [A] vs [B]
Target keyword: "[A] vs [B]"
Audience: [buyers]

Structure:
- Quick verdict table
- Detailed comparison
- "Best for" sections
- FAQ
- Recommendation
```

#### Category Page Content

**When to use:** SEO content for category pages.

```
Write category page content:

Category: [name]
Products: [examples]
Target keyword: [keyword]
Audience: [buyers]

Deliver:
- H1 title
- Intro paragraph
- Sub-sections
- Buying guide
- Internal links
```

#### Lead Magnet Outline

**When to use:** Email capture content.

```
Create lead magnet:

Brand: [name]
Niche: [category]
Customer: [avatar]

Format: [checklist/guide/quiz/template]
Deliver:
- Title + description
- Outline/structure
- Landing page copy
- Thank you email
```

#### Meta Tags Generator

**When to use:** Quick SEO meta tags.

```
Generate meta tags:

Page type: [product/category/blog]
Topic: [describe]
Target keyword: [keyword]
Brand: [name]

Deliver:
- Meta title (under 60 chars)
- Meta description (under 155 chars)
- 3 alternate titles
- Open Graph tags
```

#### Schema Markup Suggestion

**When to use:** Structured data recommendations.

```
Suggest schema markup:

Page type: [product/article/FAQ]
Content: [describe]

Provide:
- Schema type
- Key properties
- JSON-LD example
- Rich snippet potential
```

---

## Chapter 13: Prompt Debugging — When the Output Is Bad

Even with perfect prompts, AI sometimes gives you garbage. Here's how to diagnose and fix it.

### The Debugging Framework

| Symptom | Likely Cause | Fix |
|---|---|---|
| Too generic | Missing context | Add product details, customer avatar, brand voice |
| Too long/short | No format/length constraint | Specify word count, structure, bullet count |
| Wrong tone | Missing persona/voice | Add "act as [role]" + voice examples |
| Factually wrong | AI hallucination | Ask it to verify claims or flag uncertainty |
| Ignores instructions | Too many instructions | Simplify — one task per prompt, use numbered lists |
| Repetitive | No variation request | Ask for "5 variations" or "different angles" |
| Doesn't understand | Ambiguous language | Be specific — "write a 200-word email" not "write an email" |

### The Iteration Ladder

**Level 1 (Quick fix):**
- "Make it shorter" / "Make it longer"
- "More [adjective]" / "Less [adjective]"
- "Change the tone to [X]"

**Level 2 (Direction fix):**
- "The opening doesn't grab me — try 5 different hooks"
- "This sounds too salesy — make it feel like a recommendation"
- "Focus more on [specific benefit], less on [other thing]"

**Level 3 (Rebuild):**
- "Start over with this structure: [new structure]"
- "Write it as if explaining to a friend, not selling"
- "Give me the raw material (key points), I'll write the copy"

### Common Mistakes & Fixes

**Mistake 1: Asking for everything at once**

Bad: "Write product description, bullets, FAQ, email, and social posts"

Fix: One deliverable per prompt. "Write the product description" → get it → "Now write bullets based on that" → get it.

**Mistake 2: No examples**

Bad: "Write in our brand voice"

Fix: Paste 2-3 examples of your actual copy. "Match this style: [examples]"

**Mistake 3: Vague constraints**

Bad: "Keep it short"

Fix: "Under 100 words" or "3 sentences max" or "under 50 characters"

**Mistake 4: Asking for facts AI doesn't have**

Bad: "Write about our award-winning product" (if you don't have awards)

Fix: Only include real claims. "If you're unsure about a fact, write [NEEDS VERIFICATION] instead of guessing."

**Mistake 5: Not specifying format**

Bad: "Write ad copy"

Fix: "Write Facebook ad with: primary text (under 125 words), headline (under 40 chars), description (under 30 chars), CTA button text"

### The "Show, Don't Tell" Technique

When AI can't match your style, show it:

```
Here's an example of copy I like (paste competitor's good copy or your own best work):

[EXAMPLE]

Now write something similar for [my product] but with these differences: [what's different].
```

The AI will match the *style* of your example while adapting to your product.

### When to Start Over vs. Iterate

**Iterate when:**
- Output is 60-80% good — just needs tweaks
- You understand what's wrong and can describe the fix
- You're refining, not rebuilding

**Start over when:**
- Output is fundamentally wrong (wrong product, wrong audience)
- You've iterated 3+ times with no improvement
- The AI misunderstood the core task

**Start over with:**
- Clearer context (add missing details)
- Simpler structure (break into steps)
- Different approach ("write it as X" instead of "write it as Y")

> **KEY INSIGHT:** Bad output isn't the AI's fault — it's a prompt that didn't give it enough to work with. The fix is almost always *more context*, not a different AI.

---

## Chapter 14: Building Your Own Prompt Templates

The prompts in this book are starting points — the real power comes from building your own library.

### The Prompt Template Structure

```
[TASK]
You are a [ROLE] who [EXPERIENCE/EXPERTISE].

[CONTEXT]
I sell [PRODUCT] to [CUSTOMER] on [PLATFORM].
Brand voice: [TONE].
Key features: [LIST].

[DELIVERABLE]
Write [SPECIFIC OUTPUT] with:
- [ELEMENT 1]
- [ELEMENT 2]
- [ELEMENT 3]

[CONSTRAINTS]
- Length: [WORD COUNT]
- Format: [STRUCTURE]
- Avoid: [WORDS/PHRASES]
- Include: [REQUIRED ELEMENTS]
```

### Template Examples by Use-Case

**Product Description Template:**

```
You are a conversion copywriter for [BRAND] selling [PRODUCT] to [CUSTOMER].

Product: [NAME, PRICE, FEATURES]
Customer pain: [PROBLEM IT SOLVES]
Brand voice: [TONE]

Write a product description with:
1. Hook (1-2 sentences)
2. Problem agitation (2 sentences)
3. Solution (benefits, not features)
4. Social proof placeholder [SOCIAL PROOF]
5. Risk reversal
6. CTA

Length: 250-350 words. No word "premium." No exclamation marks.
```

**Ad Copy Template:**

```
You are a direct-response copywriter creating [PLATFORM] ads.

Product: [NAME, BENEFIT]
Audience: [WHO]
Offer: [INCENTIVE]

Write [NUMBER] ad variations with:
- Hook (first 3 words must grab attention)
- Primary text (under [X] words)
- Headline (under [X] chars)
- CTA

Test different angles: [LIST 3-5 ANGLES].
```

**Email Template:**

```
You are an email copywriter for [BRAND].

Email type: [WELCOME/CART/POST-PURCHASE/etc.]
Audience: [WHO]
Goal: [WHAT YOU WANT THEM TO DO]
Product: [NAME, OFFER]
Brand voice: [TONE]

Write email with:
- Subject line (2 options)
- Preview text
- Body (under [X] words)
- CTA

Focus on [KEY MESSAGE]. No jargon.
```

### Organizing Your Prompt Library

**Option 1: Folder Structure**

```
Prompts/
├── Product Research/
├── Listing Copy/
├── Advertising/
├── Email & WhatsApp/
├── Social Media/
└── Support/
```

**Option 2: Tagging System**

Tag each prompt with: use-case, platform, audience (cold/warm/customer), goal (awareness/conversion/retention).

**Option 3: Spreadsheet**

Columns: Prompt Name | Use-Case | Platform | Last Updated | Performance Notes

### Updating Your Prompts

**When to update:**
- AI model changes (new version may respond differently)
- Your brand voice evolves
- You discover better phrasing
- Performance data shows what works

**How to update:**
- Keep version history (v1, v2, v3)
- Note what changed and why
- A/B test new vs. old
- Document results

### Sharing Prompts with Your Team

**Create a prompt playbook:**
- Document each prompt with context
- Include examples of good/bad output
- Note which prompts need human review
- Add "fill-in-the-blank" variables clearly

**Train on prompts:**
- Show team how to use templates
- Practice with real products
- Review outputs together
- Iterate based on feedback

> **KEY INSIGHT:** The sellers who win with AI aren't the ones with the best prompts — they're the ones who *systematize* their prompting. Build your library, document what works, and iterate.

---

## Chapter 15: Ethics & Accuracy Rules for AI Copy

AI is a powerful tool — but it comes with responsibility.

### The Accuracy Rules

**Rule 1: Never fabricate facts**

AI will confidently make things up. Before publishing:
- Verify all product claims (materials, dimensions, certifications)
- Check all statistics and data points
- Confirm all competitor comparisons are accurate
- Ensure all testimonials/reviews are real

**Rule 2: Disclose AI use where required**

Some platforms and jurisdictions require disclosure:
- Amazon: AI-generated content must be disclosed in some categories
- EU: AI Act may require transparency for certain uses
- Your own ethics: Consider your audience's expectations

**Rule 3: Don't use AI to deceive**

Never use AI to:
- Create fake reviews or testimonials
- Misrepresent product capabilities
- Generate misleading before/after images
- Impersonate real people without consent

### The Quality Rules

**Rule 4: Always human-edit**

AI is a starting point, not a final product. Every piece of AI copy should be:
- Reviewed for accuracy
- Edited for brand voice
- Checked for tone/deception
- Personalized where possible

**Rule 5: Maintain brand voice**

AI tends toward generic. Your brand voice is what makes you *you*:
- Inject personality into AI output
- Use your real customer language
- Add your unique perspective
- Remove AI-sounding phrases ("delve," "leverage," "game-changer")

**Rule 6: Respect intellectual property**

Don't ask AI to:
- Copy competitors' exact copy
- Reproduce copyrighted material
- Generate content that infringes trademarks
- Plagiarize existing content

### The Platform Rules

**Rule 7: Follow platform guidelines**

Each platform has rules about AI content:
- **Amazon:** Must be accurate, can't use AI to manipulate reviews
- **Shopify:** No specific AI restrictions, but quality matters
- **Meta/Google Ads:** Must be truthful, no misleading claims
- **Social media:** Must disclose AI-generated content if required by platform

**Rule 8: Protect customer data**

Never input into AI:
- Customer personal information (names, emails, addresses)
- Payment information
- Confidential business data
- Trade secrets

### The Ethical Checklist

Before publishing any AI-generated content, ask:

- [ ] Is every fact accurate and verifiable?
- [ ] Does it sound like my brand (not generic AI)?
- [ ] Am I disclosing AI use where required?
- [ ] Does it respect customer privacy?
- [ ] Is it truthful and not misleading?
- [ ] Have I human-edited for quality?
- [ ] Does it add value to the customer?
- [ ] Would I be comfortable if a customer knew AI helped write it?

### When AI Goes Wrong

**If AI generates false claims:**
- Remove immediately
- Issue correction if already published
- Review your prompt to prevent recurrence
- Add verification step to workflow

**If AI plagiarizes:**
- Check for unintentional copying
- Rewrite in your own words
- Use plagiarism checker
- Adjust prompt to be more original

**If AI generates offensive content:**
- Don't publish
- Report to AI provider if severe
- Review prompt for bias triggers
- Add content guidelines to prompt

### Building Ethical AI Practices

**Create an AI usage policy:**
- What you will use AI for
- What you won't use AI for
- Review process for AI content
- Disclosure requirements
- Quality standards

**Train your team:**
- AI ethics and accuracy
- Platform-specific rules
- Quality control process
- When to escalate concerns

**Monitor and audit:**
- Regularly review AI-generated content
- Track customer feedback
- Check for accuracy issues
- Update prompts based on learnings

> **KEY INSIGHT:** AI is a tool, not a replacement for judgment. The sellers who use it ethically and accurately will build trust and loyalty. Those who cut corners will face backlash.

---

## Chapter 16: Master Checklist & Next Steps

You're at the end of the book — but the beginning of your AI-powered ecommerce journey. Here's your action checklist.

### The 30-Day AI Implementation Plan

**Week 1: Foundation**
- [ ] Set up your AI tool accounts (ChatGPT Plus, Claude, or Gemini)
- [ ] Create your brand voice guide (tone, words to use/avoid, examples)
- [ ] Build your customer avatar document
- [ ] Save 10 prompts from this book that you'll use most
- [ ] Test each prompt with your actual products

**Week 2: Product Copy**
- [ ] Rewrite your top 5 product descriptions using Chapter 4 prompts
- [ ] Create bullet points for all products
- [ ] Write FAQ sections for top products
- [ ] Generate meta titles and descriptions for SEO
- [ ] A/B test new copy vs. old copy

**Week 3: Marketing**
- [ ] Write ad copy for your top 3 products (Meta + Google)
- [ ] Create email sequence templates (welcome, cart, post-purchase)
- [ ] Generate 2 weeks of social media content
- [ ] Write WhatsApp/SMS templates for common scenarios
- [ ] Set up review request automation

**Week 4: Systems**
- [ ] Build your prompt library (folder/spreadsheet)
- [ ] Document which prompts work best for your brand
- [ ] Train team/VA on your prompt system
- [ ] Set up quality control process for AI content
- [ ] Track results (conversion rates, engagement, sales)

### Your AI Ecommerce Stack

**Essential tools:**
- **AI writing:** ChatGPT Plus, Claude Pro, or Gemini Advanced
- **Image generation:** Midjourney, DALL-E, or Stable Diffusion
- **Video:** Runway, Pika, or InVideo for AI video
- **Analytics:** Track what AI-generated content performs best

**Optional tools:**
- **Prompt management:** Notion, Airtable, or Google Sheets
- **Content scheduling:** Later, Buffer, or Hootsuite
- **Design:** Canva (with AI features) or Figma
- **Translation:** DeepL or Google Translate for international markets

### Measuring AI ROI

Track these metrics to see if AI is actually helping:

**Copy quality:**
- Conversion rate changes after implementing AI copy
- Time saved on content creation
- Customer feedback on new copy

**Marketing efficiency:**
- Ad performance (CTR, conversion rate, ROAS)
- Email open rates and click-through rates
- Social media engagement rates

**Operational efficiency:**
- Support ticket reduction (from better FAQ/knowledge base)
- Response time improvements
- Content output volume (posts per week/month)

**Cost savings:**
- Copywriting costs avoided
- Design costs avoided
- Translation costs avoided

### Common Pitfalls to Avoid

**Pitfall 1: Using AI as a crutch**
- Don't let AI replace your brand voice
- Don't publish without human review
- Don't assume AI output is always accurate

**Pitfall 2: Over-automating**
- Don't auto-publish AI content without review
- Don't use AI for customer-facing decisions
- Don't ignore platform AI policies

**Pitfall 3: Ignoring quality**
- Don't sacrifice quality for speed
- Don't use generic AI output without customization
- Don't forget that customers can tell

**Pitfall 4: Not iterating**
- Don't use the same prompts forever
- Don't ignore performance data
- Don't stop improving your system

### Your Next Steps

**Today:**
1. Pick one product and rewrite its description using Chapter 4 prompts
2. Write 3 ad variations for that product
3. Create a welcome email sequence

**This week:**
4. Build your brand voice guide
5. Create your customer avatar
6. Set up your prompt library

**This month:**
7. Implement AI across all marketing channels
8. Track results and iterate
9. Train your team on your system

### Free Resources

- **gplmart.com/prompts** — Free prompt library with 500+ prompts for ecommerce
- **gplmart.com** — Shopify snippets, AI skill packs, and digital products
- **This book's prompts** — All 100+ prompts are yours to use, modify, and share

---

## Final Thoughts

AI isn't magic — it's a tool. Like any tool, it amplifies what you bring to it. Bring clarity, bring context, bring your brand voice, and AI becomes a force multiplier. Bring vagueness and laziness, and you get generic garbage.

The sellers who win with AI aren't the ones who use it most — they're the ones who use it *smartest*. They systematize their prompts, they iterate relentlessly, they maintain quality standards, and they never stop learning.

You now have 100+ prompts, 16 chapters of strategy, and a clear implementation plan. The only thing left is to start.

Your first prompt is waiting. Your first sale is closer than you think.

---

*AI Prompts for Ecommerce: 100+ Copy-Paste Prompts That Sell*
*© GPLMart — GPL-3.0-or-later*
*Built for sellers, by sellers.*
