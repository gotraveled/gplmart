# Platform setup - Klaviyo / Mailchimp / Shopify Email

## Klaviyo (recommended for ecommerce)

### Setup
1. Install Klaviyo app from Shopify App Store
2. Sync customer data automatically
3. Set up flows (sequences) using templates
4. Configure signup forms (popup, embedded, flyout)

### Key flows to create
- Welcome series (3-4 emails)
- Abandoned cart (3 emails)
- Browse abandonment (1-2 emails)
- Post-purchase (3 emails)
- Win-back (3 emails)
- VIP/loyalty (ongoing)

### Segmentation
- Use predictive analytics: CLV, churn risk, next order date
- Create segments for each lifecycle stage
- A/B test subject lines and send times

## Mailchimp

### Setup
1. Connect store (Shopify/WooCommerce integration)
2. Create customer groups/tags
3. Build automation journeys
4. Design email templates

### Limitations vs Klaviyo
- Less ecommerce-specific features
- No predictive analytics
- Harder to do advanced segmentation
- Still works for basic sequences

## Shopify Email (built-in)

### Setup
1. Available in Shopify admin (Marketing > Email)
2. Create templates using Shopify's editor
3- Set up automations (welcome, abandoned cart)

### Limitations
- Basic features only
- Limited segmentation
- No advanced flows
- Good for simple welcome + cart recovery, not full lifecycle

## Universal setup checklist

- [ ] Email capture forms live (popup, footer, checkout opt-in)
- [ ] Welcome series active
- [ ] Abandoned cart flow active
- [ ] Post-purchase sequence active
- [ ] Segments created (new, repeat, at-risk, VIP)
- [ ] Sender authentication (SPF, DKIM, DMARC) configured
- [ ] Unsubscribe link working in every email
- [ ] Test sends verified (check spam folder, mobile rendering)
