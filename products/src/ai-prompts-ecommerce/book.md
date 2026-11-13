# AI Prompts for Ecommerce

> **A seller's field guide to getting ChatGPT, Claude, and Gemini to write your listings, ads, emails, and content — fast and on-brand.**
>
> 70+ copy-paste prompts. 16 chapters. Zero fluff. Built for Shopify store owners, Amazon and Flipkart sellers, dropshippers, and the agencies that serve them.

---

## How to Use This Book

Every chapter has copy-paste prompts — swap in your product details and get usable output.

Three rules: **(1)** Never paste a bare product name — context produces sales copy. **(2)** Tell the AI who it is — "act as a direct-response copywriter" changes everything. **(3)** Iterate — the first output is a draft; "make it shorter, punchier" is where the gold is.

> **KEY INSIGHT:** AI doesn't write worse copy than a mediocre human. It writes *average* copy instantly. Your job is to spend 60 seconds prompting to make it write *good* copy — the kind you used to pay a freelancer $500 for.

---

## Chapter 1: Why Prompting Is a Skill (Not a Trick)

Ask ChatGPT for product descriptions and you get generic Amazon-listing filler — "high quality," "best in class." The problem isn't the AI. It's the prompt.

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

---

## Chapter 6: Email & WhatsApp Sequence Prompts

Email and WhatsApp sequences are where ecommerce makes its money — they warm up cold traffic, recover abandoned carts, and turn one-time buyers into repeat customers.
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

---

## Chapter 12: Master Prompt Library — Copy-Paste Prompts

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

---

### Listing & Copywriting
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
---

### Email & Messaging
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

---

### Support & Operations
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
---

### Research & Analysis
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
---

### Content & SEO
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

### Quick-Fire Prompt Bank

Ultra-compact prompts for common one-off tasks — copy, fill the brackets, paste.

#### Size Guide Quiz

**When to use:** Helping customers pick the right size or variant.

```
Write a 5-question size-selection quiz for [product]. Map answers to recommended size/variant. Friendly tone, one line per question.
```

#### Back-in-Stock Alert

**When to use:** Re-engaging customers when inventory returns.

```
Write a back-in-stock email for [product]: it sold out, it's back, under 100 words. One CTA, no pressure.
```

#### Price-Match Response

**When to use:** Replying to "found it cheaper elsewhere."

```
Write a reply to a price-match request for [product, our price $X]: justify value in under 80 words, offer price-match if policy allows.
```

#### Wholesale/Bulk Inquiry Reply

**When to use:** Responding to B2B or bulk buyers.

```
Reply to a wholesale inquiry for [product]: MOQ, volume pricing tiers, lead time, how to order. Professional tone, under 120 words.
```

#### Packaging Insert Copy

**When to use:** The card inside the box — thank-you + care tip + review ask.

```
Write packaging insert copy for [product]: thank-you line, one care/usage tip, review request. Under 80 words, warm tone.
```

#### Influencer Outreach DM

**When to use:** Gifting products to micro-influencers.

```
Write a cold outreach DM/email to a micro-influencer for [product] gifting: under 100 words, specific compliment, clear ask, no begging.
```

#### Press Pitch

**When to use:** Pitching a product launch to niche blogs or journalists.

```
Write a press pitch for [product] launch: subject line + 100-word pitch to a [niche] publication. Newsworthy angle, not ad copy.
```

#### Subscription Skip Reminder

**When to use:** Letting subscribers pause before a shipment.

```
Write a "your subscription ships soon" email for [product]: delivery date, skip/pause link [URL], under 80 words.
```

#### Referral Ask Email

**When to use:** Post-purchase referral requests.

```
Write a referral email for [product] buyers: what the friend gets, what the referrer gets, share link [URL]. Under 100 words.
```

#### Objection FAQ Set

**When to use:** Pre-empting the top reasons people don't buy.

```
Write 5 FAQ answers for [product] handling objections: price, quality, shipping time, returns, "will it work for me?" Each under 40 words.
```

#### "Us vs. Generic" Ad

**When to use:** Comparison-style ad against no-name alternatives.

```
Write a comparison ad for [product] vs. generic alternatives: headline + 3 benefit bullets + CTA. Under 100 words total.
```

#### Seasonal Promo Email

**When to use:** Holiday or sale-event campaigns.

```
Write a [Diwali/BFCM/summer sale] promo email for [product]: offer, deadline, urgency. Under 120 words, subject line options x2.
```

#### Live Shopping Script

**When to use:** Instagram/YouTube live selling sessions.

```
Write a 5-minute live-shopping script for [product]: hook, 3 demo points, offer, CTA. Conversational, punchy.
```

#### WhatsApp Catalog Description

**When to use:** WhatsApp Business catalog listings.

```
Write a WhatsApp catalog description for [product]: under 200 characters, benefit-led, one emoji max.
```

#### Review-to-Quote-Graphic

**When to use:** Repurposing a great review as social proof.

```
Turn this review into a quote-graphic caption for [product]: [paste review]. Punchy pull-quote + product tag + CTA.
```

#### Returns Policy Explainer

**When to use:** Making returns feel easy to reduce purchase anxiety.

```
Write a returns-policy explainer email for [product]: eligibility, how to start, refund timeline. Under 100 words, reassuring tone.
```

#### Loyalty Tier Announcement

**When to use:** Launching a new rewards tier.

```
Write an email announcing a new loyalty tier for [product] customers: perks, how to upgrade, under 120 words.
```

#### Gift-With-Purchase Promo

**When to use:** AOV-boosting gift offers.

```
Write a gift-with-purchase promo for [product]: free gift [X] on orders over $[Y], email subject + 80-word body.
```

#### Abandoned Browse Nudge

**When to use:** Retargeting product viewers who never added to cart.

```
Write a "still thinking it over?" email for [product] browsers: reminder + one benefit + soft CTA. Under 90 words.
```

---

## Chapter 13: Prompt Debugging — When the Output Is Bad

Even with perfect prompts, AI sometimes gives you garbage. Here's how to diagnose and fix it.

### The Debugging Framework

| Symptom | Likely cause | Fix |
|---|---|---|
| Too generic | Missing context | Add product details, customer avatar, brand voice |
| Too long/short | No format constraint | Specify word count, structure, bullet count |
| Wrong tone | Missing persona | Add "act as [role]" + voice examples |
| Factually wrong | Hallucination | Ask it to flag uncertain claims |
| Ignores instructions | Too many at once | One task per prompt, numbered lists |
| Repetitive | No variation asked | Request "5 variations" or "different angles" |
| Doesn't understand | Ambiguous wording | Be specific: "200-word email," not "an email" |

### The Iteration Ladder

- **Quick fix:** "Make it shorter/longer," "more/less [adjective]," "change tone to [X]."
- **Direction fix:** "Try 5 different hooks," "less salesy, more like a friend's recommendation," "focus on [benefit], cut [other thing]."
- **Rebuild:** "Start over with this structure: [X]," "explain like a friend, not a salesperson," "give me key points and I'll write the copy."

### Common Mistakes & Fixes

1. **Asking for everything at once** — one deliverable per prompt; chain follow-ups instead.
2. **No examples** — paste 2-3 samples of your real copy: "Match this style."
3. **Vague constraints** — say "under 100 words," not "keep it short."
4. **Asking for facts AI lacks** — only real claims; otherwise ask for `[NEEDS VERIFICATION]`.
5. **Not specifying format** — name every field: primary text, headline, description, CTA.

### The "Show, Don't Tell" Technique

When AI can't match your style, paste an example of copy you like plus: "Write something similar for [my product] with these differences: [X]." The AI matches the *style* while adapting to your product.

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

### Organizing Your Prompt Library

Tag each prompt with use-case, platform, audience (cold/warm/customer), and goal. Store them in folders or a spreadsheet: Prompt Name | Use-Case | Platform | Last Updated | Performance Notes.

### Updating & Sharing

Keep version history (v1, v2, v3), A/B test changes, and document results. For teams: record context and good/bad output examples per prompt, flag prompts needing human review, and train on real products.

> **KEY INSIGHT:** The sellers who win with AI aren't the ones with the best prompts — they're the ones who *systematize* their prompting. Build your library, document what works, and iterate.

---

## Chapter 15: Ethics & Accuracy Rules for AI Copy

AI is a powerful tool — but it comes with responsibility.

### The Accuracy Rules

**Rule 1: Never fabricate facts.** Verify all product claims, statistics, competitor comparisons, and testimonials before publishing.

**Rule 2: Disclose AI use where required.** Some platforms and jurisdictions require transparency about AI-generated content.

**Rule 3: Don't use AI to deceive.** Never create fake reviews, misrepresent capabilities, generate misleading images, or impersonate real people.

> **WARNING:** AI will confidently invent specs, certifications, and statistics. Every factual claim in AI copy must be verified against your real product data before it goes live — one false claim can trigger refunds, chargebacks, or a suspended listing.

### The Quality Rules

**Rule 4: Always human-edit.** Review for accuracy, edit for brand voice, check for deception, personalize where possible.

**Rule 5: Maintain brand voice.** Inject personality, use real customer language, remove AI-sounding phrases ("delve," "leverage," "game-changer").

**Rule 6: Respect intellectual property.** Don't copy competitors' exact copy, reproduce copyrighted material, or plagiarize.

### The Platform Rules

**Rule 7: Follow platform guidelines.** Amazon requires accuracy and bans review manipulation; Meta/Google Ads must be truthful; disclose AI content where platforms require it.

**Rule 8: Protect customer data.** Never input customer personal information, payment data, confidential business data, or trade secrets.

### The Ethical Checklist

Before publishing any AI-generated content, ask: Is every fact verifiable? Does it sound like my brand? Is AI use disclosed where required? Does it respect privacy, stay truthful, and add real value? Have I human-edited it — and would I be comfortable if a customer knew AI helped?

> **KEY INSIGHT:** AI is a tool, not a replacement for judgment. The sellers who use it ethically and accurately will build trust and loyalty. Those who cut corners will face backlash.

---

## Chapter 16: Master Checklist & Next Steps

You're at the end of the book — but the beginning of your AI-powered ecommerce journey.

### The 30-Day AI Implementation Plan

**Week 1: Foundation**
- [ ] Set up AI tool accounts (ChatGPT Plus, Claude, or Gemini)
- [ ] Create brand voice guide and customer avatar document
- [ ] Save 10 prompts you'll use most; test each with real products

**Week 2: Product Copy**
- [ ] Rewrite top 5 product descriptions; add bullets and FAQs
- [ ] Generate meta titles/descriptions; A/B test vs. old copy

**Week 3: Marketing**
- [ ] Write ad copy for top 3 products (Meta + Google)
- [ ] Build email sequences (welcome, cart, post-purchase)
- [ ] Generate 2 weeks of social content; set up review requests

**Week 4: Systems**
- [ ] Build prompt library; document what works for your brand
- [ ] Train team/VA; set up AI content quality control
- [ ] Track conversion rates, engagement, and sales

### Measuring AI ROI

Track: conversion-rate changes, time saved, ad CTR/ROAS, email open/click rates, support-ticket reduction, and copywriting/design costs avoided.

### Common Pitfalls to Avoid

1. **Using AI as a crutch** — don't skip brand voice, human review, or accuracy checks.
2. **Over-automating** — don't auto-publish without review or ignore platform AI policies.
3. **Ignoring quality** — don't ship generic output uncustomized; customers can tell.
4. **Not iterating** — don't reuse stale prompts or ignore performance data.

### Your Next Steps

**Today:** rewrite one product description, write 3 ad variations, draft a welcome email.
**This week:** brand voice guide, customer avatar, prompt library.
**This month:** implement across all channels, track results, train your team.

### Free Resources

- **gplmart.com/prompts** — Free prompt library with 500+ prompts for ecommerce
- **gplmart.com** — Shopify snippets, AI skill packs, and digital products
- **This book's prompts** — All of them are yours to use, modify, and share

---

## Final Thoughts

AI isn't magic — it's a tool. It amplifies what you bring: clarity, context, brand voice. Bring those and AI becomes a force multiplier; bring vagueness and you get generic garbage.

You now have 70+ prompts, 16 chapters of strategy, and a clear plan. The only thing left is to start. Your first prompt is waiting.

---

*AI Prompts for Ecommerce: 70+ Copy-Paste Prompts That Sell*
*© GPLMart — GPL-3.0-or-later*
*Built for sellers, by sellers.*
