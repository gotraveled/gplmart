import { toLines, tokenize, type Lang, type TokenType } from "@/lib/highlight";
import { cn } from "@/lib/cn";

const cls: Record<TokenType, string | undefined> = {
  plain: undefined,
  comment: "tok-comment",
  string: "tok-string",
  keyword: "tok-keyword",
  delim: "tok-delim",
  filter: "tok-filter",
  number: "tok-number",
  tag: "tok-tag",
  attr: "tok-attr",
  prop: "tok-prop",
  punct: "tok-punct",
};

/** Server-renderable highlighted code block. Output is escaped by React. */
export function CodeBlock({
  code,
  lang = "liquid",
  lineNumbers = true,
  maxHeight = "28rem",
  className,
}: {
  code: string;
  lang?: Lang;
  lineNumbers?: boolean;
  maxHeight?: string;
  className?: string;
}) {
  const lines = toLines(tokenize(code, lang));
  return (
    <div className={cn("overflow-auto font-mono text-[0.8125rem] leading-relaxed", className)} style={{ maxHeight }}>
      <pre className="min-w-max p-4">
        <code>
          {lines.map((line, i) => (
            <span key={i} className="block whitespace-pre">
              {lineNumbers && (
                <span aria-hidden className="mr-4 inline-block w-8 select-none text-right text-subtle/50">
                  {i + 1}
                </span>
              )}
              {line.map((tok, j) => (
                <span key={j} className={cls[tok.t]}>
                  {tok.v}
                </span>
              ))}
              {line.length === 0 && "\u00a0"}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
