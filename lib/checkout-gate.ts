/**
 * Test-mode keys may always check out (for QA). Live keys need BOTH the explicit
 * CHECKOUT_LIVE_ENABLED=true flag and the admin "content ready" setting.
 */
export function checkoutOpen(input: { testMode: boolean; liveEnabled: boolean; contentReady: boolean }): boolean {
  return input.testMode || (input.liveEnabled && input.contentReady);
}
