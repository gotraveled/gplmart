export interface PromptItem {
  id: string;
  category: string;
  title: string;
  prompt: string;
}

/** Free AI prompt pack for Shopify/e-commerce merchants - copy and adapt. */
export const prompts: readonly PromptItem[] = [
  // Product content
  { id: "pd-1", category: "Product descriptions", title: "Benefit-led description", prompt: "Write a 150-word product description for [PRODUCT] sold at [PRICE]. Open with the single biggest benefit, then 3 short paragraphs: materials/quality, use case, and why buy now. Tone: confident, not salesy. Audience: [TARGET BUYER]." },
  { id: "pd-2", category: "Product descriptions", title: "Feature to benefit table", prompt: "List 5 features of [PRODUCT]. For each, translate the feature into the benefit the buyer actually gets, then write it as a single bullet under 12 words, ordered by conversion impact." },
  { id: "pd-3", category: "Product descriptions", title: "Objection handling", prompt: "List the 5 most likely objections a buyer has about [PRODUCT] at [PRICE] (price, quality, sizing, shipping, trust). Write one honest, non-defensive answer to each in under 20 words." },
  { id: "pd-4", category: "Product descriptions", title: "Sensory product copy", prompt: "Rewrite this product description to engage the senses - what the buyer sees, touches, smells, hears and feels using [PRODUCT]. Keep it under 120 words. Current description: [PASTE]" },
  { id: "pd-5", category: "Product descriptions", title: "Compare-at-price framing", prompt: "Write a 2-sentence justification for why [PRODUCT] at [SALE PRICE] vs [ORIGINAL PRICE] is a genuine deal, mentioning what makes up the price (materials, craft, warranty). No hype words like 'amazing' or 'insane'." },
  { id: "pd-6", category: "Product descriptions", title: "Size/fit guidance", prompt: "Write a helpful sizing guide paragraph for [PRODUCT] that reduces returns - mention fit type, how to measure, what to do if between sizes. Friendly, practical, under 80 words." },

  // Marketing copy
  { id: "mk-1", category: "Marketing copy", title: "Hero headline variants", prompt: "Write 10 homepage hero headline options for [STORE/PRODUCT]. Rules: under 8 words, outcome-focused, no superlatives. Mix benefit-led, curiosity-led and urgency-led angles." },
  { id: "mk-2", category: "Marketing copy", title: "Value proposition", prompt: "Distil why a shopper should buy [PRODUCT] from us instead of Amazon or a competitor, into one sentence under 20 words plus 3 supporting bullet points." },
  { id: "mk-3", category: "Marketing copy", title: "Offer announcement", prompt: "Write a store announcement bar message for [OFFER] - max 12 words, include the deadline and the benefit, no clickbait. Then write 2 alternative versions." },
  { id: "mk-4", category: "Marketing copy", title: "CTA button copy", prompt: "Suggest 10 high-intent CTA button texts for [PRODUCT/OFFER] beyond 'Buy now'. Each under 4 words, action-first, matched to the moment (product page, cart, exit popup)." },
  { id: "mk-5", category: "Marketing copy", title: "Cart abandonment popup", prompt: "Write an exit-intent popup for shoppers leaving with [PRODUCT] in cart - headline (max 8 words), one reassurance line, and a button label. Offer: [DISCOUNT/FREE SHIPPING/none]." },
  { id: "mk-6", category: "Marketing copy", title: "Bundle pitch", prompt: "Write a 'bundle & save' pitch for buying [QUANTITY] of [PRODUCT] together - 2 lines explaining the saving in money terms (not %), plus a one-word urgency nudge." },

  // SEO
  { id: "seo-1", category: "SEO & content", title: "Meta title + description", prompt: "Write an SEO title (max 60 chars) and meta description (max 155 chars) for [PAGE/PRODUCT]. Include the primary keyword [KEYWORD] naturally, a benefit, and a soft CTA." },
  { id: "seo-2", category: "SEO & content", title: "Keyword expansion", prompt: "Give me 20 long-tail keyword variations for [PRODUCT CATEGORY] that Indian shoppers would actually type - mix 'buy', 'price', 'best', 'vs', 'near me' and how-to intents." },
  { id: "seo-3", category: "SEO & content", title: "FAQ schema content", prompt: "Generate 6 FAQ questions and concise answers for the [PRODUCT] page, targeting 'people also ask' style queries. Each answer under 40 words, factual, no fluff." },
  { id: "seo-4", category: "SEO & content", title: "Collection page intro", prompt: "Write a 90-word SEO intro paragraph for a collection of [CATEGORY] - naturally mention the category, use cases, and shipping location without keyword stuffing." },
  { id: "seo-5", category: "SEO & content", title: "Blog outline", prompt: "Create a blog post outline for '[TOPIC related to my product]' that a customer would actually search before buying. 5-7 H2 sections, each with 2 bullet sub-points, and a product CTA at the end." },
  { id: "seo-6", category: "SEO & content", title: "Alt text batch", prompt: "Write descriptive, SEO-friendly alt text for 5 product images of [PRODUCT]: [DESCRIBE IMAGES]. Each under 125 characters, natural language, includes product name and a different key feature." },

  // Email
  { id: "em-1", category: "Email marketing", title: "Welcome email", prompt: "Write a welcome email for new subscribers of [STORE] - subject line (curiosity, max 50 chars), 3 short paragraphs: what they signed up for, what makes the store different, first-purchase nudge with [OFFER]." },
  { id: "em-2", category: "Email marketing", title: "Abandoned cart - hour 1", prompt: "Write the first abandoned-cart email (sent 1 hour after leaving). Subject under 45 chars, 3 lines: reminder what they left, one reassurance (returns/shipping), single CTA. No discount." },
  { id: "em-3", category: "Email marketing", title: "Abandoned cart - day 1", prompt: "Write the second abandoned-cart email (24h later). Angle: handle the top 2 objections for [PRODUCT] honestly. Subject under 50 chars. End with CTA. Optional soft incentive: [INCENTIVE]." },
  { id: "em-4", category: "Email marketing", title: "Post-purchase thank you", prompt: "Write a post-delivery thank-you email for [PRODUCT] - thank them genuinely, 2 usage tips, ask for a review with a direct link placeholder, soft cross-sell to [RELATED PRODUCT]." },
  { id: "em-5", category: "Email marketing", title: "Winback campaign", prompt: "Write a winback email for customers who haven't purchased in 90 days. Subject (no 'we miss you'), honest line about what changed at the store, [OFFER] incentive, one-click CTA." },
  { id: "em-6", category: "Email marketing", title: "Sale announcement", prompt: "Write a flash-sale email for [OFFER] ending [DEADLINE] - subject (urgency without shouting), hero line, 3 bestsellers with one-line pitches, deadline reminder. Keep under 120 words." },

  // Social & ads
  { id: "ad-1", category: "Ads & social", title: "Instagram Reel script", prompt: "Write a 20-second Instagram Reel script for [PRODUCT] - hook in first 2 seconds (problem or transformation), 3 quick benefits shown on-screen, CTA. Include text overlay suggestions." },
  { id: "ad-2", category: "Ads & social", title: "Meta ad angles", prompt: "Write 5 different Meta (Facebook/Instagram) ad angles for [PRODUCT]: problem-aware, social proof, comparison, urgency, gift angle. Each: headline (max 40 chars) + primary text (max 60 chars)." },
  { id: "ad-3", category: "Ads & social", title: "Google search ad", prompt: "Write a Google search ad for [PRODUCT] targeting keyword [KEYWORD]: 3 headlines (max 30 chars each) and 2 descriptions (max 90 chars each). Include price or offer where it strengthens the click." },
  { id: "ad-4", category: "Ads & social", title: "UGC brief for creators", prompt: "Write a brief for a UGC creator making a video about [PRODUCT]: 30 seconds, opening hook options, must-show product shots, talking points (not a script), CTA. Keep it authentic, not ad-like." },
  { id: "ad-5", category: "Ads & social", title: "WhatsApp broadcast", prompt: "Write a WhatsApp broadcast message for [OFFER] to opted-in customers - conversational Indian English, 3 short lines max, emoji limit 1, link placeholder, opt-out line." },
  { id: "ad-6", category: "Ads & social", title: "Product demo script", prompt: "Write a 60-second product demo voiceover for [PRODUCT]: problem intro, 3 feature moments with what the viewer sees, result, price/value line, CTA. Conversational, no jargon." },

  // Support & ops
  { id: "op-1", category: "Support & ops", title: "Shipping delay reply", prompt: "Write a customer reply for a delayed shipment: acknowledge frustration honestly, explain cause without excuses, give new ETA, offer compensation ([POLICY]). Under 60 words, human tone." },
  { id: "op-2", category: "Support & ops", title: "Return request reply", prompt: "Write a reply approving a return for [PRODUCT]: warm but not gushing, state the process in 3 numbered steps, mention the [X-day] refund window, end with a retention offer." },
  { id: "op-3", category: "Support & ops", title: "Negative review response", prompt: "Write a public response to this 2-star review: '[REVIEW]'. Acknowledge the specific issue, take responsibility where fair, state the fix, offer private follow-up. No defensiveness, under 50 words." },
  { id: "op-4", category: "Support & ops", title: "Pre-purchase FAQ reply", prompt: "Draft answers to these pre-purchase questions from a WhatsApp inquiry: [PASTE QUESTIONS]. Keep each answer under 25 words, helpful not salesy, end each with a next step." },
  { id: "op-5", category: "Support & ops", title: "Order confirmation tone", prompt: "Rewrite this order-confirmation message to feel warm and human instead of robotic: '[CURRENT TEXT]'. Keep order details intact, add one line of genuine appreciation." },

  // Conversion strategy
  { id: "cv-1", category: "Conversion strategy", title: "PDP audit checklist", prompt: "Act as a CRO consultant. Give me a 12-point audit checklist for my product page selling [PRODUCT] - rank each item by conversion impact and say exactly what to look for." },
  { id: "cv-2", category: "Conversion strategy", title: "Above-the-fold review", prompt: "My product page shows [DESCRIBE ABOVE THE FOLD] in the first screen. What must change so a first-time mobile visitor sees product, price, trust signal and buy button within 2 seconds? List fixes by priority." },
  { id: "cv-3", category: "Conversion strategy", title: "Trust-gap analysis", prompt: "List the 7 trust signals a first-time buyer needs on a store before paying. For each, say what 'good' looks like and how to add it to a Shopify store without an app." },
  { id: "cv-4", category: "Conversion strategy", title: "Offer strategy", prompt: "I sell [PRODUCT] at [PRICE] with [MARGIN]% margin. Suggest 3 offer structures that lift conversion without destroying margin - rank by risk and explain the math behind each." },
  { id: "cv-5", category: "Conversion strategy", title: "Competitor teardown", prompt: "Analyse this competitor product page: [PASTE URL/text]. List 5 things they do better than a typical store, 3 weaknesses to exploit, and 2 things worth copying honestly." },
  { id: "cv-6", category: "Conversion strategy", title: "A/B test ideas", prompt: "Suggest 8 A/B tests for my Shopify product page ranked by expected impact - for each say the element, the variant to test, and the hypothesis." },

  // Brand & naming
  { id: "br-1", category: "Brand", title: "Brand story", prompt: "Write a 100-word 'Our story' for [STORE] - why it exists, who makes it, what we stand for. Specific and human, no 'passion for quality' clichés." },
  { id: "br-2", category: "Brand", title: "Voice guidelines", prompt: "Create a mini brand-voice guide for [STORE]: 3 voice traits, a do/don't example for each, and 5 phrases we'd actually say in product copy. Target audience: [AUDIENCE]." },
  { id: "br-3", category: "Brand", title: "Tagline options", prompt: "Generate 15 tagline options for [STORE] - under 6 words each, grouped by angle (benefit, craft, attitude, community). Avoid 'best', 'premium', 'quality'." },
  { id: "br-4", category: "Brand", title: "Packaging insert text", prompt: "Write text for a thank-you card that ships inside every order of [PRODUCT] - 2 lines of genuine thanks, one line asking for a review or tag, a subtle repeat-purchase hint. Under 50 words." },
  { id: "br-5", category: "Brand", title: "Collection naming", prompt: "Suggest 12 name options for a collection of [PRODUCT TYPE] - evocative but clear, easy to say in Indian English, no generic words like 'exclusive' or 'elite'. Group by mood." },

  // Launch & seasonal
  { id: "lc-1", category: "Launch & seasonal", title: "Product launch plan", prompt: "Create a 7-day launch plan for [PRODUCT] - day-by-day: teaser, announcement, social proof, offer, urgency close. Channels: Instagram, WhatsApp, email. Keep each day to 2 concrete actions." },
  { id: "lc-2", category: "Launch & seasonal", title: "Festive offer", prompt: "Write a festive campaign for [PRODUCT] for [FESTIVAL] - hook connecting the product to the occasion, offer structure that protects margin, 3 post captions, WhatsApp message." },
  { id: "lc-3", category: "Launch & seasonal", title: "Pre-order pitch", prompt: "Write pre-order copy for [PRODUCT] arriving [DATE] - what buyers get for ordering early, honest delivery expectations, one reassurance about refunds if delayed. Under 80 words." },
  { id: "lc-4", category: "Launch & seasonal", title: "Coming-soon page", prompt: "Write coming-soon page copy for [STORE/PRODUCT] launching [DATE] - headline, 2-line pitch, why sign up early, and the incentive for the email list. Under 60 words." },

  // Customer insights
  { id: "ci-1", category: "Customer insights", title: "Review mining", prompt: "Here are 20 customer reviews of [PRODUCT]: [PASTE]. Extract: top 3 things buyers love, top 2 complaints, the exact words customers use to describe the benefit (for ad copy), and 3 product improvement ideas." },
  { id: "ci-2", category: "Customer insights", title: "Buyer persona", prompt: "Build a realistic buyer persona for [PRODUCT] sold at [PRICE] in India - demographics, where they shop, the trigger that makes them buy, the objection that stops them, and the channel to reach them." },
  { id: "ci-3", category: "Customer insights", title: "Survey questions", prompt: "Write 8 post-purchase survey questions for buyers of [PRODUCT] that reveal why they bought, what almost stopped them, and what to sell next - mix multiple choice and one open question." },
];

export const promptCategories = [...new Set(prompts.map((p) => p.category))];
