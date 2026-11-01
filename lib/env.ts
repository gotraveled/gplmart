import "server-only";

export const supabaseUrl = () => process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = () => process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl() && supabaseAnonKey() && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function razorpayCreds() {
  const keyId = process.env.RAZORPAY_KEY_ID ?? "";
  const keySecret = process.env.RAZORPAY_KEY_SECRET ?? "";
  return keyId && keySecret ? { keyId, keySecret } : null;
}

export const razorpayWebhookSecret = () => process.env.RAZORPAY_WEBHOOK_SECRET ?? "";

export function isRazorpayTestMode(): boolean {
  return (process.env.RAZORPAY_KEY_ID ?? "").startsWith("rzp_test_");
}

export const isLiveCheckoutEnabled = () => process.env.CHECKOUT_LIVE_ENABLED === "true";
