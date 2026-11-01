const locales = { INR: "en-IN", USD: "en-US" } as const;

export function formatPrice(amount: number, currency: keyof typeof locales): string {
  return new Intl.NumberFormat(locales[currency], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
