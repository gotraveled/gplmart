# WhatsApp message patterns

## Format rules

- Under 500 chars per message
- *bold* for key info, _italic_ for emphasis
- No markdown headers, no long bullet lists (use line breaks + emojis as bullets)
- 1-2 emojis max, relevant not decorative
- Always identify brand in first message of a sequence

## Broadcast types

### Order update
```
Hi [Name]! Your order #[number] has shipped 📦
Tracking: [link]
Expected delivery: [date]
Questions? Reply here - we're real humans.
```

### Offer/launch
```
Hey [Name]! 🔥 [Store] just dropped [product]
[One-line hook]
[Offer details]
Shop now: [link]
(Reply STOP to opt out)
```

### Abandoned cart
```
Hi [Name], you left [product] in your cart 🛒
Still want it? [link]
Need help deciding? Ask us anything.
```

### Restock
```
Good news [Name]! [Product] is back in stock.
This one's popular - last batch sold out in [time].
Grab yours: [link]
```

## Template messages (outside 24h window)

WhatsApp Business API requires pre-approved templates for messages outside the 24-hour customer window:

```
Template: order_update
Body: "Hi {{1}}, your order {{2}} from {{3}} has been {{4}}. Track: {{5}}"
```

Keep variables minimal - {{1}}=name, {{2}}=order#, {{3}}=store, {{4}}=status, {{5}}=link

## What gets you blocked

- Sending to people who never opted in
- Same message to hundreds at once (use proper API broadcast, not personal WhatsApp)
- Ignoring STOP requests
- Sending outside 24h window without approved template
- Links to suspicious/unknown domains
