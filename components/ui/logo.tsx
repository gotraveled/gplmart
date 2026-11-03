import Image from "next/image";
import Link from "next/link";

export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <Image
      src="/logo-gpl.png"
      alt=""
      width={2172}
      height={724}
      className={`object-cover object-left ${className}`}
      aria-hidden
    />
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center" aria-label="GPLMart home">
      <Image src="/logo-gpl.png" alt="GPLMart" width={2172} height={724} className="h-12 w-auto" priority />
    </Link>
  );
}
