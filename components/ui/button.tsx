import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-ink-950 shadow-[0_8px_28px_-10px_rgb(200_245_66/0.7)] hover:brightness-105 hover:shadow-[0_10px_32px_-8px_rgb(200_245_66/0.8)]",
  secondary: "border border-line-strong bg-white/[0.03] text-fg hover:bg-white/[0.08]",
  ghost: "text-muted hover:text-fg hover:bg-white/[0.06]",
};
const sizes: Record<Size, string> = { md: "h-10 px-4 text-sm", lg: "h-12 px-6 text-base" };

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:brightness-100",
    variants[variant],
    sizes[size],
    className,
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return <Link className={buttonClasses(variant, size, className)} {...props} />;
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}
