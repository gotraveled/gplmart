export type Lang = "liquid" | "css" | "js" | "text";
export type TokenType = "plain" | "comment" | "string" | "keyword" | "delim" | "filter" | "number" | "tag" | "attr" | "prop" | "punct";
export interface Token {
  t: TokenType;
  v: string;
}

const LIQUID_KEYWORDS = new Set(
  "if elsif else endif unless endunless for endfor in case when endcase assign capture endcapture render include section schema endschema stylesheet endstylesheet javascript endjavascript comment endcomment break continue and or contains blank empty true false nil limit offset forloop with as".split(" "),
);
const JS_KEYWORDS = new Set(
  "const let var function return if else for while of in new class this document window true false null undefined typeof await async try catch throw".split(" "),
);

function scan(code: string, re: RegExp, classify: (m: RegExpExecArray) => TokenType): Token[] {
  const out: Token[] = [];
  let last = 0;
  for (const m of code.matchAll(re)) {
    const i = m.index ?? 0;
    if (i > last) out.push({ t: "plain", v: code.slice(last, i) });
    out.push({ t: classify(m as RegExpExecArray), v: m[0] });
    last = i + m[0].length;
  }
  if (last < code.length) out.push({ t: "plain", v: code.slice(last) });
  return out;
}

function liquidInner(inner: string): Token[] {
  return scan(
    inner,
    /"[^"]*"|'[^']*'|\|\s*[a-z_]+|-?\d+(?:\.\d+)?|[a-z_][\w.-]*/gi,
    (m) => {
      const s = m[0];
      if (s[0] === '"' || s[0] === "'") return "string";
      if (s[0] === "|") return "filter";
      if (/^-?\d/.test(s)) return "number";
      return LIQUID_KEYWORDS.has(s) ? "keyword" : "plain";
    },
  );
}

function liquid(code: string): Token[] {
  const out: Token[] = [];
  const master = /\{%-?\s*comment\s*-?%\}[\s\S]*?\{%-?\s*endcomment\s*-?%\}|\{\{-?[\s\S]*?-?\}\}|\{%-?[\s\S]*?-?%\}|<!--[\s\S]*?-->|<\/?[a-zA-Z][\w-]*|\/?>|[\w:-]+(?==)|"[^"\n]*"|'[^'\n]*'/g;
  let last = 0;
  for (const m of code.matchAll(master)) {
    const i = m.index ?? 0;
    if (i > last) out.push({ t: "plain", v: code.slice(last, i) });
    const s = m[0];
    if (s.startsWith("{%") && /^\{%-?\s*comment/.test(s)) out.push({ t: "comment", v: s });
    else if (s.startsWith("{{") || s.startsWith("{%")) {
      const open = s.startsWith("{{") ? s.match(/^\{\{-?/)![0] : s.match(/^\{%-?/)![0];
      const close = s.startsWith("{{") ? s.match(/-?\}\}$/)![0] : s.match(/-?%\}$/)![0];
      out.push({ t: "delim", v: open }, ...liquidInner(s.slice(open.length, s.length - close.length)), { t: "delim", v: close });
    } else if (s.startsWith("<!--")) out.push({ t: "comment", v: s });
    else if (s.startsWith("<") || s.endsWith(">")) out.push({ t: "tag", v: s });
    else if (s[0] === '"' || s[0] === "'") out.push({ t: "string", v: s });
    else out.push({ t: "attr", v: s });
    last = i + s.length;
  }
  if (last < code.length) out.push({ t: "plain", v: code.slice(last) });
  return out;
}

function css(code: string): Token[] {
  return scan(
    code,
    /\/\*[\s\S]*?\*\/|"[^"]*"|'[^']*'|@[a-z-]+|--[\w-]+|[a-z-]+(?=\s*:)|#[0-9a-fA-F]{3,8}\b|-?\d*\.?\d+(?:px|rem|em|%|vh|vw|ch|s|ms|fr)?|[{}();:,]/gi,
    (m) => {
      const s = m[0];
      if (s.startsWith("/*")) return "comment";
      if (s[0] === '"' || s[0] === "'") return "string";
      if (s[0] === "@") return "keyword";
      if (s.startsWith("--") || /^[a-z-]+$/i.test(s)) return "prop";
      if (s[0] === "#" || /^-?\d|^\./.test(s)) return "number";
      return "punct";
    },
  );
}

function js(code: string): Token[] {
  return scan(
    code,
    /\/\/[^\n]*|\/\*[\s\S]*?\*\/|"[^"\n]*"|'[^'\n]*'|`[^`]*`|\b\d+(?:\.\d+)?\b|[A-Za-z_$][\w$]*|[{}()[\];,.=<>!&|+\-*/?:]/g,
    (m) => {
      const s = m[0];
      if (s.startsWith("//") || s.startsWith("/*")) return "comment";
      if (/^["'`]/.test(s)) return "string";
      if (/^\d/.test(s)) return "number";
      if (/^[A-Za-z_$]/.test(s)) return JS_KEYWORDS.has(s) ? "keyword" : "plain";
      return "punct";
    },
  );
}

/** Tokenises source for display. Concatenating every token value always reproduces the input exactly. */
export function tokenize(code: string, lang: Lang): Token[] {
  if (lang === "liquid") return liquid(code);
  if (lang === "css") return css(code);
  if (lang === "js") return js(code);
  return [{ t: "plain", v: code }];
}

/** Splits tokens into display lines without losing or altering any characters. */
export function toLines(tokens: Token[]): Token[][] {
  const lines: Token[][] = [[]];
  for (const tok of tokens) {
    const parts = tok.v.split("\n");
    parts.forEach((part, i) => {
      if (i > 0) lines.push([]);
      if (part) lines[lines.length - 1]!.push({ t: tok.t, v: part });
    });
  }
  return lines;
}
