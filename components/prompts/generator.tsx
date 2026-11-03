"use client";

import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";
import { CopyButton } from "@/components/ui/copy-button";

const goals = [
  "Write a product description",
  "Write a marketing email",
  "Write an ad (Meta/Google)",
  "Write a social post/Reel script",
  "Write SEO meta + description",
  "Write a customer support reply",
  "Plan a launch/offer campaign",
] as const;

const lengths = ["Short (under 50 words)", "Medium (50-120 words)", "Long (120-250 words)"] as const;
const tones = ["Confident", "Warm and friendly", "Professional", "Playful", "Urgent but honest"] as const;

const selectCls =
  "w-full rounded-xl border border-line-strong bg-ink-900 px-3 py-2.5 text-sm text-fg focus:border-accent/60 focus:outline-none";

export function PromptGenerator() {
  const [goal, setGoal] = useState<(typeof goals)[number]>(goals[0]);
  const [product, setProduct] = useState("my product");
  const [audience, setAudience] = useState("online shoppers");
  const [tone, setTone] = useState<(typeof tones)[number]>(tones[1]);
  const [length, setLength] = useState<(typeof lengths)[number]>(lengths[1]);
  const [mustInclude, setMustInclude] = useState("");

  const output = useMemo(() => {
    const parts = [
      `${goal} for ${product.trim() || "my product"}.`,
      `Target audience: ${audience.trim() || "online shoppers"}.`,
      `Tone: ${tone}.`,
      `Length: ${length}.`,
      mustInclude.trim() ? `Must include: ${mustInclude.trim()}.` : "",
      "Be specific, honest and practical - no hype words, no superlatives, no filler.",
      "Give me 3 variations I can pick from.",
    ];
    return parts.filter(Boolean).join("\n");
  }, [goal, product, audience, tone, length, mustInclude]);

  return (
    <div className="rounded-2xl border border-accent/30 bg-gradient-to-b from-ink-800 to-ink-900 p-6 shadow-card">
      <div className="flex items-center gap-2">
        <Sparkles aria-hidden className="size-5 text-accent" />
        <h2 className="font-display text-lg font-semibold">Prompt builder</h2>
      </div>
      <p className="mt-1.5 text-sm text-muted">Fill the fields, copy the prompt, paste into ChatGPT/Claude.</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted">Goal</span>
          <select value={goal} onChange={(e) => setGoal(e.target.value as typeof goal)} className={selectCls}>
            {goals.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted">Your product</span>
          <input value={product} onChange={(e) => setProduct(e.target.value)} className={selectCls} placeholder="e.g. handmade leather wallet" />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted">Audience</span>
          <input value={audience} onChange={(e) => setAudience(e.target.value)} className={selectCls} placeholder="e.g. new moms, gift buyers" />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted">Tone</span>
          <select value={tone} onChange={(e) => setTone(e.target.value as typeof tone)} className={selectCls}>
            {tones.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted">Length</span>
          <select value={length} onChange={(e) => setLength(e.target.value as typeof length)} className={selectCls}>
            {lengths.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted">Must include (optional)</span>
          <input value={mustInclude} onChange={(e) => setMustInclude(e.target.value)} className={selectCls} placeholder="e.g. COD, free shipping, ₹499 price" />
        </label>
      </div>

      <div className={cn("mt-5 overflow-hidden rounded-xl border border-line-strong bg-ink-950")}>
        <div className="flex items-center justify-between border-b border-line px-4 py-2">
          <p className="font-mono text-[0.7rem] text-subtle">your-prompt.txt</p>
          <CopyButton text={output} label="Copy prompt" />
        </div>
        <pre className="whitespace-pre-wrap p-4 font-mono text-sm leading-relaxed text-fg">{output}</pre>
      </div>
    </div>
  );
}
