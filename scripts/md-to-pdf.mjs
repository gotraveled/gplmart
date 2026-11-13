// Converts products/src/<slug>/book.md into a styled book.pdf using pdfkit.
// Usage: node scripts/md-to-pdf.mjs [slug ...]  (no args = all ebook products)
import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";

const ROOT = path.resolve("products/src");
const catalog = JSON.parse(fs.readFileSync("products/catalog.json", "utf8"));

const ACCENT = "#0e9f6e";
const INK = "#1a1a2e";
const MUTED = "#555570";
const LINE = "#d8d8e0";

// Per-book cover styling: accent color + category kicker.
const COVERS = {
  "shopify-store-launch-bible": { accent: "#8b5cf6", deep: "#1e1040", kicker: "ECOMMERCE PLAYBOOK" },
  "meta-ads-mastery-ecommerce": { accent: "#f59e0b", deep: "#291a04", kicker: "PAID ADS MASTERCLASS" },
  "winning-product-research-bible": { accent: "#06b6d4", deep: "#04222b", kicker: "PRODUCT RESEARCH" },
  "ai-powered-ecommerce-playbook": { accent: "#a78bfa", deep: "#171233", kicker: "AI FOR SELLERS" },
  "shopify-liquid-mastery": { accent: "#34d399", deep: "#052018", kicker: "SHOPIFY LIQUID" },
  "ecommerce-india-playbook": { accent: "#fb7185", deep: "#2b0713", kicker: "INDIA MARKET GUIDE" },
  "ai-prompts-ecommerce": { accent: "#f472b6", deep: "#26091a", kicker: "PROMPT LIBRARY" },
  "ai-tools-beginners": { accent: "#60a5fa", deep: "#081830", kicker: "BEGINNER AI GUIDE" },
  "freelance-income-playbook": { accent: "#fbbf24", deep: "#241a03", kicker: "FREELANCE BUSINESS" },
  "digital-products-empire": { accent: "#2dd4bf", deep: "#03211d", kicker: "DIGITAL PRODUCTS" },
  "money-basics-playbook": { accent: "#4ade80", deep: "#0a2413", kicker: "PERSONAL FINANCE" },
  "ecom-profit-pricing-system": { accent: "#38bdf8", deep: "#082f49", kicker: "SPREADSHEET SYSTEM" },
  "etsy-dropshipping-business-toolkit": { accent: "#fb923c", deep: "#2b1204", kicker: "BUSINESS TOOLKIT" },
  "ad-copy-swipe-file-vol1": { accent: "#f472b6", deep: "#26091a", kicker: "COPY SWIPE FILE" },
  "shopify-store-launch-doc-pack": { accent: "#a78bfa", deep: "#171233", kicker: "STORE DOC KIT" },
  "resume-freelance-proposal-kit": { accent: "#fbbf24", deep: "#241a03", kicker: "CAREER KIT" },
};

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
}

function tint(hex, f) {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(r * f, g * f, b * f);
}

function coverSubtitle(md) {
  const line = md.split(/\r?\n/).map((l) => l.trim()).find((l) => l.startsWith(">") && l.replace(/[>*\s]/g, "").length > 10);
  if (!line) return "";
  const text = line.replace(/^>\s?/, "").replace(/\*\*/g, "").replace(/\*/g, "").replace(/`/g, "").trim();
  return text.length > 150 ? text.slice(0, 147).replace(/\s+\S*$/, "") + "..." : text;
}

function coverMonogram(title) {
  const words = title.replace(/^(The|A)\s+/i, "").split(/\s+/).filter(Boolean);
  return (words[0]?.[0] ?? "G") + (words[1]?.[0] ?? words[0]?.slice(-1) ?? "M");
}

function drawCover(doc, item, md) {
  const W = doc.page.width, H = doc.page.height;
  const c = COVERS[item?.slug] ?? { accent: ACCENT, deep: "#101024", kicker: "GPLMART GUIDE" };
  // background gradient
  const grad = doc.linearGradient(0, 0, 0, H);
  grad.stop(0, c.deep).stop(1, tint(c.deep, 0.4));
  doc.save().rect(0, 0, W, H).fill(grad).restore();

  // decorative shapes
  doc.save().opacity(0.35).circle(W - 60, 120, 190).lineWidth(1.5).strokeColor(c.accent).stroke().restore();
  doc.save().opacity(0.18).circle(W - 60, 120, 120).lineWidth(1).strokeColor(c.accent).stroke().restore();
  doc.save().opacity(0.10).circle(50, H - 90, 140).fill(c.accent).restore();
  doc.save().opacity(0.07).moveTo(0, H * 0.62).lineTo(W, H * 0.5).lineTo(W, H).lineTo(0, H).closePath().fill(c.accent).restore();

  // wordmark
  doc.font("Helvetica-Bold").fontSize(13).fillColor("#ffffff")
    .text("G P L M A R T", 60, 58, { characterSpacing: 4 });
  doc.font("Helvetica").fontSize(8.5).fillColor(`#ffffff`)
    .text("PREMIUM DIGITAL RESOURCE LIBRARY", 60, 76, { characterSpacing: 2.5 });

  // monogram emblem
  const ex = 60, ey = H * 0.30, es = 92;
  const eg = doc.linearGradient(ex, ey, ex + es, ey + es);
  eg.stop(0, c.accent).stop(1, tint(c.accent, 0.6));
  doc.save().roundedRect(ex, ey, es, es, 22).fill(eg).restore();
  doc.save().roundedRect(ex + 5, ey + 5, es - 10, es - 10, 18).opacity(0.35).lineWidth(1).strokeColor("#ffffff").stroke().restore();
  doc.font("Helvetica-Bold").fontSize(34).fillColor("#ffffff")
    .text(coverMonogram(item?.title ?? item?.slug ?? "G"), ex, ey + es / 2 - 22, { width: es, align: "center" });

  // kicker + title + subtitle
  const tx = ex + es + 28;
  doc.font("Helvetica-Bold").fontSize(10).fillColor(c.accent)
    .text(c.kicker, tx, ey + 8, { characterSpacing: 3 });
  doc.font("Helvetica-Bold").fontSize(27).fillColor("#ffffff")
    .text(item?.title ?? item?.slug ?? "", tx, ey + 30, { width: W - tx - 60, lineGap: 3 });
  const subtitle = coverSubtitle(md);
  if (subtitle) {
    doc.font("Helvetica").fontSize(11).fillColor("#e8e8f0")
      .text(subtitle, tx, ey + es - 26, { width: W - tx - 60, lineGap: 2 });
  }

  // bottom block
  const by = H - 120;
  doc.save().opacity(0.5).moveTo(60, by).lineTo(W - 60, by).lineWidth(1).strokeColor(c.accent).stroke().restore();
  doc.font("Helvetica-Bold").fontSize(12).fillColor("#ffffff").text("gplmart.com", 60, by + 16);
  doc.font("Helvetica").fontSize(9).fillColor("#c8c8d8")
    .text("One membership - instant PDF download - resell rights included", 60, by + 34);
  doc.font("Helvetica").fontSize(8).fillColor("#9a9ab0")
    .text(`v${item?.version ?? "1.0"} - GPL-3.0-or-later - ${new Date().getFullYear()}`, 60, by + 50);
}

function inlineRuns(text) {
  // returns array of {text, bold, italic, code}
  const runs = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let last = 0, m;
  while ((m = re.exec(text))) {
    if (m.index > last) runs.push({ text: text.slice(last, m.index) });
    const t = m[0];
    if (t.startsWith("**")) runs.push({ text: t.slice(2, -2), bold: true });
    else if (t.startsWith("`")) runs.push({ text: t.slice(1, -1), code: true });
    else runs.push({ text: t.slice(1, -1), italic: true });
    last = m.index + t.length;
  }
  if (last < text.length) runs.push({ text: text.slice(last) });
  return runs.length ? runs : [{ text }];
}

function ensureSpace(doc, needed) {
  if (doc.y + needed > doc.page.height - doc.page.margins.bottom) doc.addPage();
}

function renderParagraph(doc, text, opts = {}) {
  const size = opts.size ?? 10.5;
  const runs = inlineRuns(text).map((r) => ({
    text: r.text,
    font: r.bold ? "Helvetica-Bold" : r.code ? "Courier" : r.italic ? "Helvetica-Oblique" : "Helvetica",
    ...(r.code ? { size: size - 0.5, color: ACCENT } : {}),
  }));
  doc.font("Helvetica").fontSize(size).fillColor(INK)
    .text(runs, { width: doc.page.width - doc.page.margins.left - doc.page.margins.right });
}

function renderMd(doc, md) {
  const lines = md.split(/\r?\n/);
  let inCode = false, codeBuf = [], firstH1 = true;

  const flushCode = () => {
    if (!codeBuf.length) return;
    ensureSpace(doc, 20);
    doc.save().roundedRect(doc.page.margins.left, doc.y, doc.page.width - doc.page.margins.left - doc.page.margins.right, 14 + codeBuf.length * 13, 6).fill("#f4f4f8").restore();
    doc.x = doc.page.margins.left + 10;
    doc.y += 8;
    doc.font("Courier").fontSize(8.5).fillColor(INK);
    const cw = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    for (const cl of codeBuf) {
      ensureSpace(doc, 14);
      doc.x = doc.page.margins.left + 10;
      doc.font("Courier").fontSize(8.5).fillColor(INK)
        .text(cl.length ? cl : " ", { width: cw - 20 });
    }
    doc.x = doc.page.margins.left; doc.moveDown(0.8);
    codeBuf = [];
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line.startsWith("```")) {
      if (inCode) flushCode(); else inCode = true;
      continue;
    }
    if (inCode) { codeBuf.push(line); continue; }

    if (/^#{1}\s/.test(line)) {
      if (!firstH1) { ensureSpace(doc, 40); }
      firstH1 = false;
      doc.moveDown(firstH1 ? 0 : 1.2);
      doc.font("Helvetica-Bold").fontSize(22).fillColor(ACCENT).text(line.replace(/^#\s*/, ""), { width: doc.page.width - doc.page.margins.left - doc.page.margins.right });
      doc.moveDown(0.4);
      doc.moveTo(doc.page.margins.left, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).lineWidth(2).strokeColor(ACCENT).stroke();
      doc.moveDown(0.8);
    } else if (/^#{2}\s/.test(line)) {
      ensureSpace(doc, 34);
      doc.moveDown(1);
      doc.font("Helvetica-Bold").fontSize(14).fillColor(INK).text(line.replace(/^##\s*/, ""), { width: doc.page.width - doc.page.margins.left - doc.page.margins.right });
      doc.moveDown(0.5);
    } else if (/^#{3}\s/.test(line)) {
      ensureSpace(doc, 26);
      doc.moveDown(0.7);
      doc.font("Helvetica-Bold").fontSize(11.5).fillColor(ACCENT).text(line.replace(/^###\s*/, ""), { width: doc.page.width - doc.page.margins.left - doc.page.margins.right });
      doc.moveDown(0.3);
    } else if (/^[-*]\s+/.test(line)) {
      ensureSpace(doc, 16);
      const listText = line.replace(/^[-*]\s+/, "");
      doc.x = doc.page.margins.left + 14;
      doc.font("Helvetica").fontSize(10.5).fillColor(MUTED);
      doc.text("\u2022 ", { continued: true });
      renderParagraph(doc, listText);
      doc.x = doc.page.margins.left;
    } else if (/^\d+\.\s+/.test(line)) {
      ensureSpace(doc, 16);
      renderParagraph(doc, line);
      doc.x = doc.page.margins.left;
    } else if (/^>\s?/.test(line)) {
      ensureSpace(doc, 18);
      doc.x = doc.page.margins.left + 12;
      doc.font("Helvetica-Oblique").fontSize(10).fillColor(MUTED);
      const txt = line.replace(/^>\s?/, "");
      doc.text(txt, { width: doc.page.width - doc.page.margins.left - doc.page.margins.right - 12 });
      doc.x = doc.page.margins.left;
      doc.moveDown(0.4);
    } else if (/^\|.*\|$/.test(line) || /^\|[-\s|:]+\|$/.test(line)) {
      // markdown table row -> plain text row
      if (/^\|[-\s|:]+\|$/.test(line)) continue;
      const cells = line.split("|").slice(1, -1).map((c) => c.trim());
      ensureSpace(doc, 16);
      doc.font("Courier").fontSize(8).fillColor(INK).text(cells.join("  |  "), { width: doc.page.width - doc.page.margins.left - doc.page.margins.right });
      doc.moveDown(0.2);
    } else if (line.trim() === "") {
      doc.moveDown(0.45);
    } else if (/^---+$/.test(line.trim())) {
      ensureSpace(doc, 14);
      doc.moveTo(doc.page.margins.left, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).lineWidth(0.5).strokeColor(LINE).stroke();
      doc.moveDown(0.6);
    } else {
      ensureSpace(doc, 16);
      renderParagraph(doc, line);
      doc.x = doc.page.margins.left;
    }
  }
  flushCode();
}

async function build(slug) {
  const dir = path.join(ROOT, slug);
  const mdPath = path.join(dir, "book.md");
  const pdfPath = path.join(dir, "book.pdf");
  if (!fs.existsSync(mdPath)) { console.log(`skip ${slug}: no book.md`); return; }
  const md = fs.readFileSync(mdPath, "utf8");
  const item = catalog.items.find((i) => i.slug === slug);
  const title = item?.title ?? slug;

  const doc = new PDFDocument({ size: "A4", margins: { top: 64, bottom: 64, left: 60, right: 60 }, bufferPages: true });
  const stream = fs.createWriteStream(pdfPath);
  doc.pipe(stream);

  // designed cover page
  drawCover(doc, item, md);
  doc.addPage();

  renderMd(doc, md);

  // footer page numbers
  const range = doc.bufferedPageRange();
  for (let i = range.start + 1; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    doc.font("Helvetica").fontSize(8).fillColor(MUTED)
      .text(`${title} - GPLMart`, doc.page.margins.left, doc.page.height - 40, { width: doc.page.width - doc.page.margins.left - doc.page.margins.right, align: "center" })
      .text(`Page ${i + 1} of ${range.count}`, doc.page.margins.left, doc.page.height - 30, { width: doc.page.width - doc.page.margins.left - doc.page.margins.right, align: "center" });
  }

  doc.end();
  await new Promise((res, rej) => { stream.on("finish", res); stream.on("error", rej); });
  console.log(`built ${slug}/book.pdf (${(fs.statSync(pdfPath).size / 1024).toFixed(0)} KB)`);
}

const slugs = process.argv.slice(2);
const targets = slugs.length ? slugs : catalog.items.filter((i) => i.category === "ebook").map((i) => i.slug);
for (const s of targets) await build(s);
