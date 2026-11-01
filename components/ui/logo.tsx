import Link from "next/link";

export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <linearGradient id="gm-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8f542" />
          <stop offset="1" stopColor="#5eead4" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#gm-g)" />
      <path
        d="M9 11.5 16 8l7 3.5v9L16 24l-7-3.5v-9Zm7 .5v12m-7-12.5 7 4 7-4"
        fill="none"
        stroke="#070b14"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="GPLMart home">
      <LogoMark />
      <span className="font-display text-xl font-semibold tracking-tight">
        GPL<span className="text-accent">Mart</span>
      </span>
    </Link>
  );
}
