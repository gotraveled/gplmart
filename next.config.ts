import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // sharp/@img are optional Next image-optimization natives; Vercel's image
  // optimizer handles /_next/image, so don't bundle ~10MB into every function.
  outputFileTracingExcludes: {
    "*": [
      "node_modules/@img/**",
      "node_modules/sharp/**",
      "node_modules/@emnapi/**",
      "node_modules/detect-libc/**",
      "node_modules/semver/**",
    ],
  },
  async redirects() {
    return [
      { source: "/shop", destination: "/", permanent: true },
      { source: "/categories/:category", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
      {
        source: "/(access|account|admin|checkout|payment)/:path*",
        headers: [{ key: "Cache-Control", value: "private, no-store" }],
      },
    ];
  },
};

export default nextConfig;
