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

function renderMd(doc, md, title) {
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
    if (line.startsWith("```")) { inCode ? flushCode() : (inCode = true); continue; }
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
      doc.x = doc.page.margins.left + 14;
      doc.font("Helvetica").fontSize(10.5).fillColor(MUTED);
      doc.text("\u2022 ", { continued: true });
      renderParagraph(doc, line.replace(/^[-*]\s+/, ""));
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

  // cover-ish header
  doc.font("Helvetica-Bold").fontSize(26).fillColor(ACCENT).text(title, { width: doc.page.width - doc.page.margins.left - doc.page.margins.right });
  doc.moveDown(0.3);
  doc.font("Helvetica").fontSize(11).fillColor(MUTED).text("GPLMart - practical digital resources for ecommerce sellers, developers and creators.", { width: doc.page.width - doc.page.margins.left - doc.page.margins.right });
  doc.moveDown(0.2);
  doc.font("Helvetica").fontSize(9).fillColor(MUTED).text(`v${item?.version ?? "1.0"} - GPL-3.0-or-later - gplmart.com`, { width: doc.page.width - doc.page.margins.left - doc.page.margins.right });
  doc.moveDown(1.4);
  doc.moveTo(doc.page.margins.left, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).lineWidth(2).strokeColor(ACCENT).stroke();
  doc.moveDown(1);
  doc.x = doc.page.margins.left;

  renderMd(doc, md, title);

  // footer page numbers
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
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
