// Builds printable PDF products: Coloring Book, Affirmation Cards, Wedding Signage, Meal Planner.
// Usage: node scripts/build-visuals.mjs
import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";

const INK = "#1a1a2e";
const MUTED = "#6b6b80";
const LINE = "#9ca3af";
const W = 595, H = 842, M = 50;

function newDoc(dir, file) {
  fs.mkdirSync(dir, { recursive: true });
  const doc = new PDFDocument({ size: "A4", margins: { top: M, bottom: M, left: M, right: M }, bufferPages: true });
  const stream = fs.createWriteStream(path.join(dir, file));
  doc.pipe(stream);
  return { doc, stream, done: () => new Promise((res, rej) => { stream.on("finish", res); stream.on("error", rej); }) };
}
function footer(doc, label, n, total) {
  doc.font("Helvetica").fontSize(8).fillColor(MUTED)
    .text(label, M, H - 34, { width: W - M * 2, align: "center" })
    .text(`${n} / ${total}`, M, H - 24, { width: W - M * 2, align: "center" });
}
function cover(doc, title, subtitle, kicker, accent) {
  doc.rect(0, 0, W, 14).fill(accent);
  doc.font("Helvetica-Bold").fontSize(11).fillColor(accent)
    .text(kicker.toUpperCase(), M, 90, { characterSpacing: 3 });
  doc.font("Helvetica-Bold").fontSize(32).fillColor(INK)
    .text(title, M, 120, { width: W - M * 2, lineGap: 4 });
  doc.font("Helvetica").fontSize(13).fillColor(MUTED)
    .text(subtitle, M, doc.y + 14, { width: W - M * 2 - 40, lineGap: 4 });
  doc.moveTo(M, H - 120).lineTo(W - M, H - 120).lineWidth(1).strokeColor(LINE).stroke();
  doc.font("Helvetica").fontSize(10).fillColor(MUTED).text("GPLMart - printable - print at 100% / Actual Size", M, H - 100);
  doc.font("Helvetica-Bold").fontSize(10).fillColor(accent).text("gplmart.com", M, H - 84);
}
function sectionTitle(doc, text, y, accent = INK) {
  doc.font("Helvetica-Bold").fontSize(9).fillColor(accent)
    .text(text.toUpperCase(), M, y, { characterSpacing: 2 });
  doc.moveTo(M, y + 14).lineTo(W - M, y + 14).lineWidth(0.8).strokeColor(accent).stroke();
  return y + 24;
}
function label(doc, text, x, y, w) {
  doc.font("Helvetica-Bold").fontSize(9).fillColor(INK).text(text, x, y, { width: w });
}
function lines(doc, x, y, w, n, gap = 22) {
  doc.save().lineWidth(0.5).strokeColor(LINE);
  for (let i = 0; i < n; i++) { const ly = y + i * gap; doc.moveTo(x, ly).lineTo(x + w, ly).stroke(); }
  doc.restore();
}

// ---------- line-art helpers for coloring pages ----------
function mandala(doc, cx, cy, r) {
  // concentric rings
  for (const f of [1, 0.85, 0.7, 0.55, 0.4]) {
    doc.save().circle(cx, cy, r * f).lineWidth(1).strokeColor(INK).stroke().restore();
  }
  // petals ring
  const petals = 12;
  for (let i = 0; i < petals; i++) {
    const a = (i / petals) * Math.PI * 2;
    const px = cx + Math.cos(a) * r * 0.62, py = cy + Math.sin(a) * r * 0.62;
    doc.save().ellipse(px, py, r * 0.18, r * 0.32, a, 0, Math.PI * 2).lineWidth(1).strokeColor(INK).stroke().restore();
  }
  // inner star
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    doc.save().moveTo(cx, cy).lineTo(cx + Math.cos(a) * r * 0.3, cy + Math.sin(a) * r * 0.3).lineWidth(1).strokeColor(INK).stroke().restore();
  }
  doc.save().circle(cx, cy, r * 0.1).lineWidth(1.5).strokeColor(INK).stroke().restore();
}
function flower(doc, cx, cy, s) {
  for (let ring = 0; ring < 3; ring++) {
    const petals = 6 + ring * 2, pr = s * (0.5 + ring * 0.3);
    for (let i = 0; i < petals; i++) {
      const a = (i / petals) * Math.PI * 2 + ring * 0.3;
      const px = cx + Math.cos(a) * pr * 0.55, py = cy + Math.sin(a) * pr * 0.55;
      doc.save().ellipse(px, py, s * 0.14, s * 0.28, a, 0, Math.PI * 2).lineWidth(1).strokeColor(INK).stroke().restore();
    }
    doc.save().circle(cx, cy, pr * 0.35).lineWidth(1).strokeColor(INK).stroke().restore();
  }
  // stem + leaves
  doc.save().moveTo(cx, cy + s * 0.9).bezierCurveTo(cx - s * 0.3, cy + s * 1.4, cx + s * 0.3, cy + s * 1.7, cx, cy + s * 2.0).lineWidth(1.5).strokeColor(INK).stroke().restore();
  for (const sgn of [-1, 1]) {
    doc.save().moveTo(cx, cy + s * 1.4).bezierCurveTo(cx + sgn * s * 0.5, cy + s * 1.3, cx + sgn * s * 0.6, cy + s * 1.5, cx, cy + s * 1.6).lineWidth(1).strokeColor(INK).stroke().restore();
  }
}
function geometric(doc, cx, cy, s) {
  // hexagon + inner triangles + dots
  for (let i = 0; i < 6; i++) {
    const a1 = (i / 6) * Math.PI * 2 - Math.PI / 2, a2 = ((i + 1) / 6) * Math.PI * 2 - Math.PI / 2;
    doc.save().moveTo(cx + Math.cos(a1) * s, cy + Math.sin(a1) * s).lineTo(cx + Math.cos(a2) * s, cy + Math.sin(a2) * s).lineWidth(1.5).strokeColor(INK).stroke().restore();
    // triangle to center
    doc.save().moveTo(cx, cy).lineTo(cx + Math.cos(a1) * s, cy + Math.sin(a1) * s).lineTo(cx + Math.cos(a2) * s, cy + Math.sin(a2) * s).closePath().lineWidth(0.7).strokeColor(INK).stroke().restore();
  }
  doc.save().circle(cx, cy, s * 0.4).lineWidth(1).strokeColor(INK).stroke().restore();
  doc.save().circle(cx, cy, 4).fill(INK).restore();
  // corner dots
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    doc.save().circle(cx + Math.cos(a) * s * 1.25, cy + Math.sin(a) * s * 1.25, 5).lineWidth(1).strokeColor(INK).stroke().restore();
  }
}
function sunFace(doc, cx, cy, s) {
  // sun rays
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    doc.save().moveTo(cx + Math.cos(a) * s * 1.1, cy + Math.sin(a) * s * 1.1).lineTo(cx + Math.cos(a) * s * 1.5, cy + Math.sin(a) * s * 1.5).lineWidth(2).strokeColor(INK).stroke().restore();
  }
  doc.save().circle(cx, cy, s).lineWidth(2).strokeColor(INK).stroke().restore();
  // face
  doc.save().circle(cx - s * 0.3, cy - s * 0.15, 4).fill(INK).restore();
  doc.save().circle(cx + s * 0.3, cy - s * 0.15, 4).fill(INK).restore();
  doc.save().arc(cx, cy + s * 0.1, s * 0.35, 0.3, Math.PI - 0.3).lineWidth(2).strokeColor(INK).stroke().restore();
  doc.save().arc(cx - s * 0.35, cy + s * 0.35, s * 0.2, 0.3, Math.PI - 0.3).lineWidth(1).strokeColor(INK).stroke().restore();
  doc.save().arc(cx + s * 0.35, cy + s * 0.35, s * 0.2, 0.3, Math.PI - 0.3).lineWidth(1).strokeColor(INK).stroke().restore();
}
function butterfly(doc, cx, cy, s) {
  for (const sgn of [-1, 1]) {
    doc.save().ellipse(cx + sgn * s * 0.55, cy - s * 0.3, s * 0.55, s * 0.75, sgn * 0.5, 0, Math.PI * 2).lineWidth(1.2).strokeColor(INK).stroke().restore();
    doc.save().ellipse(cx + sgn * s * 0.45, cy + s * 0.4, s * 0.4, s * 0.55, sgn * -0.4, 0, Math.PI * 2).lineWidth(1).strokeColor(INK).stroke().restore();
    // wing dots
    doc.save().circle(cx + sgn * s * 0.55, cy - s * 0.3, 5).lineWidth(1).strokeColor(INK).stroke().restore();
  }
  doc.save().ellipse(cx, cy, s * 0.12, s * 1.1, 0, 0, Math.PI * 2).lineWidth(1.2).strokeColor(INK).stroke().restore();
  doc.save().moveTo(cx, cy - s).bezierCurveTo(cx - s * 0.4, cy - s * 1.4, cx - s * 0.6, cy - s * 1.5, cx - s * 0.7, cy - s * 1.3).lineWidth(1).strokeColor(INK).stroke().restore();
  doc.save().moveTo(cx, cy - s).bezierCurveTo(cx + s * 0.4, cy - s * 1.4, cx + s * 0.6, cy - s * 1.5, cx + s * 0.7, cy - s * 1.3).lineWidth(1).strokeColor(INK).stroke().restore();
}

// ================= COLORING BOOK =================
async function coloringBook() {
  const dir = "products/src/coloring-book-mandalas";
  const { doc, done } = newDoc(dir, "Coloring-Book-Mandalas.pdf");
  cover(doc, "The Mandala Coloring Book", "15 hand-drawn-style coloring pages: mandalas, flowers, geometric patterns, sun faces and butterflies. Print, color, relax.", "GPLMart Coloring Book", "#9333ea");

  doc.addPage();
  let y = sectionTitle(doc, "How to use this coloring book", M + 10, "#9333ea");
  ["Print at 100% / Actual Size on white paper - 80gsm works, 120gsm is nicer.", "Color with pencils, markers, gel pens or watercolors - every page is pure black line art.", "Mandala pages are designed for symmetry: start at the center and work outward.", "Take your time - coloring is meant to be slow. 20 minutes per page is normal."].forEach((t) => {
    doc.font("Helvetica").fontSize(10.5).fillColor(INK).text(`â€¢ ${t}`, M, y, { width: W - M * 2 }); y = doc.y + 6;
  });
  y += 12;
  doc.font("Helvetica-Bold").fontSize(11).fillColor("#9333ea").text("Tips for stunning results", M, y);
  y = doc.y + 8;
  ["Use a light pencil sketch first for complex pages", "Blend adjacent colors for gradient effects", "Leave some white space - it makes colors pop", "Try metallic gel pens on dark pages for a premium look"].forEach((t) => {
    doc.font("Helvetica").fontSize(10.5).fillColor(INK).text(`â€¢ ${t}`, M, y, { width: W - M * 2 }); y = doc.y + 6;
  });

  const pages = [
    ["Mandala Bloom", (cx, cy, s) => mandala(doc, cx, cy, s)],
    ["Sacred Flower", (cx, cy, s) => flower(doc, cx, cy, s)],
    ["Hexagon Garden", (cx, cy, s) => geometric(doc, cx, cy, s)],
    ["Sunshine Smile", (cx, cy, s) => sunFace(doc, cx, cy, s)],
    ["Butterfly Dance", (cx, cy, s) => butterfly(doc, cx, cy, s)],
    ["Mandala Ocean", (cx, cy, s) => { mandala(doc, cx, cy, s); // waves border
      for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; doc.save().arc(cx + Math.cos(a) * s * 1.2, cy + Math.sin(a) * s * 1.2, 18, 0, Math.PI * 2).lineWidth(1).strokeColor(INK).stroke().restore(); }
    }],
    ["Double Flower", (cx, cy, s) => { flower(doc, cx - s * 0.8, cy - s * 0.4, s * 0.7); flower(doc, cx + s * 0.8, cy + s * 0.4, s * 0.7); mandala(doc, cx, cy, s * 0.5); }],
    ["Star Mandala", (cx, cy, s) => { mandala(doc, cx, cy, s * 0.85); for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; const x1 = cx + Math.cos(a) * s * 1.1, y1 = cy + Math.sin(a) * s * 1.1; const x2 = cx + Math.cos(a + 0.4) * s * 1.5, y2 = cy + Math.sin(a + 0.4) * s * 1.5; const x3 = cx + Math.cos(a - 0.4) * s * 1.5, y3 = cy + Math.sin(a - 0.4) * s * 1.5; doc.save().moveTo(x1, y1).lineTo(x2, y2).lineTo(x3, y3).closePath().lineWidth(1).strokeColor(INK).stroke().restore(); } }],
    ["Garden Hex", (cx, cy, s) => { geometric(doc, cx - s * 0.7, cy - s * 0.5, s * 0.55); geometric(doc, cx + s * 0.7, cy - s * 0.5, s * 0.55); geometric(doc, cx, cy + s * 0.6, s * 0.6); flower(doc, cx, cy - s * 0.4, s * 0.35); }],
    ["Moon Mandala", (cx, cy, s) => { mandala(doc, cx, cy, s * 0.9); doc.save().circle(cx, cy, s * 0.55).lineWidth(2).strokeColor(INK).stroke().restore(); doc.save().circle(cx + s * 0.22, cy - s * 0.15, s * 0.5).fill("#ffffff").restore(); }],
    ["Spring Bloom", (cx, cy, s) => { flower(doc, cx, cy, s * 0.85); butterfly(doc, cx + s * 0.9, cy - s * 0.7, s * 0.4); sunFace(doc, cx - s * 0.95, cy - s * 0.75, s * 0.3); }],
    ["Crystal Geometric", (cx, cy, s) => { geometric(doc, cx, cy, s * 0.9); for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; const x = cx + Math.cos(a) * s * 1.3, y2 = cy + Math.sin(a) * s * 1.3; doc.save().moveTo(cx + Math.cos(a) * s * 0.4, cy + Math.sin(a) * s * 0.4).lineTo(x, y2).lineWidth(1).strokeColor(INK).stroke().restore(); doc.save().circle(x, y2, 8).lineWidth(1).strokeColor(INK).stroke().restore(); } }],
    ["Peace Flower", (cx, cy, s) => { for (let ring = 0; ring < 4; ring++) { const petals = 8 + ring * 4, pr = s * (0.35 + ring * 0.25); for (let i = 0; i < petals; i++) { const a = (i / petals) * Math.PI * 2 + ring * 0.4; const px = cx + Math.cos(a) * pr * 0.5, py = cy + Math.sin(a) * pr * 0.5; doc.save().ellipse(px, py, s * 0.1, s * 0.22, a, 0, Math.PI * 2).lineWidth(0.8).strokeColor(INK).stroke().restore(); } } doc.save().circle(cx, cy, s * 0.15).lineWidth(1.5).strokeColor(INK).stroke().restore(); }],
    ["Ocean Mandala", (cx, cy, s) => { mandala(doc, cx, cy, s * 0.8); for (let i = 0; i < 3; i++) { doc.save().arc(cx, cy, s * (0.4 + i * 0.25), 0, Math.PI * 2).lineWidth(1).strokeColor(INK).stroke().restore(); } butterfly(doc, cx + s * 0.7, cy - s * 0.6, s * 0.35); }],
    ["Autumn Mandala", (cx, cy, s) => { mandala(doc, cx, cy, s * 0.85); for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; const lx = cx + Math.cos(a) * s * 1.1, ly = cy + Math.sin(a) * s * 1.1; doc.save().ellipse(lx, ly, s * 0.15, s * 0.08, a, 0, Math.PI * 2).lineWidth(1).strokeColor(INK).stroke().restore(); } }],
  ];
  pages.forEach(([title, draw]) => {
    doc.addPage();
    label(doc, title.toUpperCase(), M, M + 10, 200);
    doc.font("Helvetica").fontSize(8).fillColor(MUTED).text("color me in", M, M + 26);
    const cx = W / 2, cy = H / 2 + 10, s = 190;
    draw(cx, cy, s);
    // page border frame
    doc.save().rect(M, M, W - M * 2, H - M * 2).lineWidth(1).strokeColor(LINE).stroke().restore();
  });

  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    footer(doc, "Mandala Coloring Book - GPLMart", i - range.start + 1, range.count);
  }
  doc.end();
  await done();
  console.log("built", path.join(dir, "Coloring-Book-Mandalas.pdf"), `${(fs.statSync(path.join(dir, "Coloring-Book-Mandalas.pdf")).size / 1024).toFixed(0)} KB`);
}

// ================= AFFIRMATION CARDS =================
async function affirmations() {
  const dir = "products/src/affirmation-card-deck";
  const { doc, done } = newDoc(dir, "Affirmation-Card-Deck.pdf");
  const PURPLE = "#7c3aed";
  cover(doc, "The Affirmation Card Deck", "30 printable affirmation cards for daily confidence, calm and momentum - cut, place, repeat.", "GPLMart Card Deck", PURPLE);

  doc.addPage();
  let y = sectionTitle(doc, "How to use your affirmation deck", M + 10, PURPLE);
  ["Print at 100% on card stock (160-250gsm) or regular paper.", "Cut along the dashed guides - each card is designed to fit a standard card size.", "Pull one card each morning - read it twice, then go.", "Keep a card where you'll see it: desk, mirror, wallet, phone case.", "Rotate daily. The magic is repetition, not intensity."].forEach((t) => {
    doc.font("Helvetica").fontSize(10.5).fillColor(INK).text(`â€¢ ${t}`, M, y, { width: W - M * 2 }); y = doc.y + 6;
  });
  y += 10;
  doc.font("Helvetica-Bold").fontSize(11).fillColor(PURPLE).text("Pro tip", M, y);
  y = doc.y + 6;
  doc.font("Helvetica").fontSize(10.5).fillColor(INK).text("Say the affirmation out loud - speaking activates it differently than reading. And personalize: change 'I am' to 'I am becoming' if that feels more honest.", M, y, { width: W - M * 2 });

  const affirmationsList = [
    "I am capable of handling whatever today brings.",
    "I choose progress over perfection, every single day.",
    "I am allowed to rest and still be productive.",
    "My work has value, even when no one sees it yet.",
    "I attract opportunities by being my best self.",
    "Today I will do one thing that scares me slightly.",
    "I am not my worst day - I am my average effort.",
    "I trust myself to figure it out as I go.",
    "I release what I cannot control and focus on what I can.",
    "I am building something that matters - slowly, surely.",
    "I deserve success as much as anyone else in the room.",
    "I learn faster from mistakes than from wins.",
    "I am allowed to change my mind and my plans.",
    "I am the author of my own story - and I like how it's going.",
    "I bring calm to chaos and clarity to confusion.",
    "I am proud of how far I've come, not just where I'm going.",
    "I choose to see challenges as puzzles, not problems.",
    "I am exactly where I need to be right now.",
    "I have survived 100% of my worst days so far.",
    "I make time for what matters - starting today.",
    "I am patient with myself while I grow.",
    "I attract people who lift me up, not drain me.",
    "I am grateful for the version of me that's still learning.",
    "I let go of comparison - my path is my own.",
    "I am strong enough to ask for help when I need it.",
    "I choose energy over exhaustion, always.",
    "I am creating a life I don't need to escape from.",
    "I trust the process even when I can't see the result.",
    "I am worthy of good things - love, success, peace.",
    "I finish what I start - one small win at a time.",
  ];

  // 2 cards per page, 15 pages
  for (let p = 0; p < 15; p++) {
    doc.addPage();
    for (let slot = 0; slot < 2; slot++) {
      const idx = p * 2 + slot;
      const text = affirmationsList[idx];
      const cardW = W - M * 2 - 30, cardH = 300;
      const x = M + 15, yy = M + 30 + slot * (cardH + 40);
      // card border
      doc.save().roundedRect(x, yy, cardW, cardH, 16).lineWidth(2).strokeColor(PURPLE).stroke().restore();
      doc.save().roundedRect(x + 8, yy + 8, cardW - 16, cardH - 16, 12).lineWidth(0.8).strokeColor(LINE).stroke().restore();
      // corner ornaments
      for (const [ox, oy] of [[x + 18, yy + 18], [x + cardW - 18, yy + 18], [x + 18, yy + cardH - 18], [x + cardW - 18, yy + cardH - 18]]) {
        doc.save().circle(ox, oy, 4).fill(PURPLE).restore();
      }
      // affirmation text
      const words = text.split(" ");
      const lines_arr = [];
      let cur = "";
      for (const w of words) {
        const test = cur ? cur + " " + w : w;
        if (doc.widthOfString(test) > cardW - 80) { lines_arr.push(cur); cur = w; } else cur = test;
      }
      if (cur) lines_arr.push(cur);
      const startY = yy + cardH / 2 - (lines_arr.length * 24) / 2;
      doc.font("Times-Roman").fontSize(20).fillColor(INK);
      lines_arr.forEach((l, i) => doc.text(l, x, startY + i * 26, { width: cardW, align: "center" }));
      // number
      doc.font("Helvetica-Bold").fontSize(9).fillColor(PURPLE).text(`${idx + 1} / 30`, x + cardW - 50, yy + 20);
      // GPLMart micro-brand
      doc.font("Helvetica").fontSize(7).fillColor(MUTED).text("GPLMart", x + 20, yy + cardH - 26);
    }
  }

  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    footer(doc, "Affirmation Card Deck - GPLMart", i - range.start + 1, range.count);
  }
  doc.end();
  await done();
  console.log("built", path.join(dir, "Affirmation-Card-Deck.pdf"), `${(fs.statSync(path.join(dir, "Affirmation-Card-Deck.pdf")).size / 1024).toFixed(0)} KB`);
}

// ================= WEDDING SIGNAGE SUITE =================
async function weddingSigns() {
  const dir = "products/src/wedding-signage-suite";
  const { doc, done } = newDoc(dir, "Wedding-Signage-Suite.pdf");
  const GOLD = "#b8860b";
  cover(doc, "The Wedding Signage Suite", "18 printable wedding signs: welcome, table numbers, menu, hashtag, directions and thank-you cards - elegant minimal design.", "GPLMart Wedding Suite", GOLD);

  const sign = (title, sub, accent = GOLD, big = 40) => {
    doc.addPage();
    doc.save().roundedRect(M + 30, M + 50, W - M * 2 - 60, H - M * 2 - 100, 12).strokeColor(accent).lineWidth(2).stroke().restore();
    doc.save().roundedRect(M + 44, M + 64, W - M * 2 - 88, H - M * 2 - 128, 8).lineWidth(0.8).strokeColor(LINE).stroke().restore();
    doc.font("Times-Roman").fontSize(big).fillColor(accent).text(title, M, H / 2 - 70, { width: W - M * 2, align: "center", lineGap: 4 });
    if (sub) doc.font("Helvetica").fontSize(14).fillColor(MUTED).text(sub, M, H / 2 + 20, { width: W - M * 2, align: "center", lineGap: 5 });
    doc.font("Helvetica").fontSize(8).fillColor(MUTED).text("GPLMart Wedding Suite - gplmart.com", M, H - 60, { width: W - M * 2, align: "center" });
  };

  sign("Welcome to our wedding", "Please take a seat - ceremony begins shortly", GOLD, 44);
  sign("Table numbers", "Place cards & seating chart inside", GOLD, 36);
  // table numbers 1-10
  for (let t = 1; t <= 10; t++) {
    doc.addPage();
    doc.save().roundedRect(M + 30, M + 50, W - M * 2 - 60, H - M * 2 - 100, 12).strokeColor(GOLD).lineWidth(2).stroke().restore();
    doc.save().roundedRect(M + 44, M + 64, W - M * 2 - 88, H - M * 2 - 128, 8).lineWidth(0.8).strokeColor(LINE).stroke().restore();
    doc.font("Times-Roman").fontSize(90).fillColor(GOLD).text(String(t), M, H / 2 - 60, { width: W - M * 2, align: "center" });
    doc.font("Helvetica").fontSize(13).fillColor(MUTED).text("Table", M, H / 2 + 30, { width: W - M * 2, align: "center" });
    doc.font("Helvetica").fontSize(8).fillColor(MUTED).text("GPLMart Wedding Suite", M, H - 60, { width: W - M * 2, align: "center" });
  }
  sign("Menu", "Appetizers â€¢ Mains â€¢ Desserts â€¢ Drinks", GOLD, 40);
  sign("Our hashtag", "#YourWeddingHashtag", GOLD, 36);
  sign("Find your seat", "Escort cards on the welcome table", GOLD, 36);
  sign("Guest book", "Sign & leave a note for the couple", GOLD, 36);
  sign("Photo booth", "Props inside - tag us!", GOLD, 34);
  sign("Thank you", "For celebrating with us", GOLD, 40);
  sign("Dance floor", "This way!", GOLD, 40);
  sign("Sweetheart table", "The couple's corner", GOLD, 34);
  sign("Kids table", "Coloring & games inside", GOLD, 36);
  sign("Directions", "Ceremony: [VENUE] â€¢ Reception: [VENUE]", GOLD, 30);
  sign("Just married", "Mr & Mrs [NAMES]", GOLD, 44);
  sign("Favors", "Take one & enjoy", GOLD, 36);

  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    footer(doc, "Wedding Signage Suite - GPLMart", i - range.start + 1, range.count);
  }
  doc.end();
  await done();
  console.log("built", path.join(dir, "Wedding-Signage-Suite.pdf"), `${(fs.statSync(path.join(dir, "Wedding-Signage-Suite.pdf")).size / 1024).toFixed(0)} KB`);
}

// ================= MEAL PLANNER =================
async function mealPlanner() {
  const dir = "products/src/meal-planner-grocery-bundle";
  const { doc, done } = newDoc(dir, "Meal-Planner-Grocery-Bundle.pdf");
  const GREEN = "#0e6e56";
  cover(doc, "The Meal Planner & Grocery Bundle", "4 weekly meal plan templates, grocery list generators and budget tracking - eat well without the mental load.", "GPLMart Meal Planner", GREEN);

  doc.addPage();
  let y = sectionTitle(doc, "How this planner works", M + 10, GREEN);
  ["Pick one weekly template - each has 7 days of breakfast, lunch, dinner and snack slots.", "Shop once per week using the grocery list - organized by store section so you never backtrack.", "Swap meals freely - the structure matters, not the specific dishes.", "Track your grocery spend weekly - the budget page shows if you're feeding your family for $50 or $150.", "Repeat weekly - consistency beats variety for busy households."].forEach((t) => {
    doc.font("Helvetica").fontSize(10.5).fillColor(INK).text(`â€¢ ${t}`, M, y, { width: W - M * 2 }); y = doc.y + 6;
  });
  y += 10;
  doc.font("Helvetica-Bold").fontSize(11).fillColor(GREEN).text("Budget targets", M, y);
  y = doc.y + 8;
  ["Feed a family of 4 for ~$75-100/week (budget-friendly)", "Mid-range: $120-180/week (better ingredients)", "Premium: $200+/week (organic, specialty)", "Track actuals - adjust shopping list to match your target"].forEach((t) => {
    doc.font("Helvetica").fontSize(10.5).fillColor(INK).text(`â€¢ ${t}`, M, y, { width: W - M * 2 }); y = doc.y + 6;
  });

  // 4 weekly templates
  const meals = [
    ["Week 1: Batch-Cook Friendly", ["Oatmeal + fruit", "Eggs + toast", "Smoothie bowl"], ["Chicken salad wrap", "Leftover chicken + rice", "Turkey sandwich"], ["Sheet-pan chicken + veggies", "Leftover chicken stir-fry", "Tacos + beans"], ["Greek yogurt + nuts", "Apple + PB", "Carrot sticks + hummus"]],
    ["Week 2: Quick & Easy", ["Cereal + milk", "Bagel + cream cheese", "Yogurt parfait"], ["PB&J", "Quesadilla", "Tuna salad wrap"], ["Ground beef + pasta", "Leftover beef tacos", "Baked chicken + rice"], ["Cheese + crackers", "Fruit cup", "Popcorn"]],
    ["Week 3: Veggie-Heavy", ["Veggie omelet", "Avocado toast", "Smoothie + granola"], ["Veggie wrap", "Leftover veggie soup", "Caprese sandwich"], ["Stir-fry tofu + rice", "Leftover stir-fry", "Veggie curry + naan"], ["Veggie sticks + dip", "Fresh fruit", "Roasted chickpeas"]],
    ["Week 4: Comfort Food", ["Pancakes + syrup", "French toast", "Breakfast burrito"], ["Grilled cheese + tomato soup", "Leftover pizza", "Club sandwich"], ["Meatloaf + mashed potatoes", "Leftover meatloaf sandwich", "Pot roast + carrots"], ["Ice cream", "Cookies + milk", "Fruit + chocolate"]],
  ];
  meals.forEach(([title, b, l, d, s]) => {
    doc.addPage();
    y = sectionTitle(doc, title, M + 10, GREEN);
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];
    const rows = [b, l, d, s];
    const colW = (W - M * 2) / 8, rowH = 60;
    // header
    doc.save().rect(M, y, colW, rowH).fill(GREEN).restore();
    doc.font("Helvetica-Bold").fontSize(8).fillColor("#ffffff").text("MEAL", M + 6, y + 8, { width: colW - 10 });
    days.forEach((day, i) => {
      doc.save().rect(M + (i + 1) * colW, y, colW, rowH).fill(GREEN).restore();
      doc.font("Helvetica-Bold").fontSize(9).fillColor("#ffffff").text(day, M + (i + 1) * colW + colW / 2 - 10, y + 24, { width: 20, align: "center" });
    });
    y += rowH;
    rows.forEach((rowMeals, ri) => {
      const rh = ri === 2 ? 80 : 60;
      doc.save().rect(M, y, colW, rh).fill("#f0f7f4").restore();
      doc.font("Helvetica-Bold").fontSize(8).fillColor(GREEN).text(mealTypes[ri], M + 6, y + 26, { width: colW - 10 });
      for (let di = 0; di < 7; di++) {
        const meal = rowMeals[di % rowMeals.length];
        const x = M + (di + 1) * colW;
        doc.save().rect(x, y, colW, rh).lineWidth(0.4).strokeColor(LINE).stroke().restore();
        doc.font("Helvetica").fontSize(7.5).fillColor(INK).text(meal, x + 4, y + 8, { width: colW - 8, height: rh - 12, ellipsis: true });
      }
      y += rh;
    });
    y += 14;
    label(doc, "GROCERY LIST FOR THIS WEEK:", M, y, 300); y += 16;
    lines(doc, M, y, W - M * 2, 8, 22);
  });

  // grocery list template
  doc.addPage();
  y = sectionTitle(doc, "Weekly Grocery List Template", M + 10, GREEN);
  doc.font("Helvetica").fontSize(9).fillColor(MUTED).text("Organized by store section - shop top to bottom, never backtrack.", M, y, { width: W - M * 2 });
  y = doc.y + 12;
  const sections = ["Produce", "Meat & Seafood", "Dairy & Eggs", "Bakery", "Pantry & Canned", "Frozen", "Beverages", "Household"];
  sections.forEach((sec) => {
    label(doc, sec.toUpperCase(), M, y, 160); y += 15;
    // two columns of lines
    lines(doc, M, y, (W - M * 2) / 2 - 10, 4, 24);
    lines(doc, M + (W - M * 2) / 2 + 10, y, (W - M * 2) / 2 - 10, 4, 24);
    y += 4 * 24 + 10;
  });

  // budget tracker
  doc.addPage();
  y = sectionTitle(doc, "Grocery Budget Tracker", M + 10, GREEN);
  label(doc, "Week of:", M, y, 80);
  doc.moveTo(M + 80, y + 10).lineTo(M + 200, y + 10).lineWidth(0.5).strokeColor(INK).stroke();
  label(doc, "Budget $:", M + 250, y, 80);
  doc.moveTo(M + 330, y + 10).lineTo(W - M, y + 10).lineWidth(0.5).strokeColor(INK).stroke();
  y += 30;
  const bcols = ["Category", "Budgeted $", "Actual $", "Difference"];
  const bw = (W - M * 2) / 4;
  bcols.forEach((c, i) => { doc.font("Helvetica-Bold").fontSize(9).fillColor("#ffffff").text(c, M + i * bw + 6, y + 4, { width: bw - 10 }); });
  doc.rect(M, y, W - M * 2, 20).fill(GREEN); doc.fillColor("#ffffff"); y += 20;
  ["Produce", "Protein", "Dairy", "Grains", "Frozen", "Other"].forEach(() => {
    for (let i = 0; i < 4; i++) { doc.moveTo(M + i * bw, y).lineTo(M + i * bw, y + 20).lineWidth(0.3).strokeColor(LINE).stroke(); }
    doc.moveTo(M, y + 20).lineTo(W - M, y + 20).lineWidth(0.3).strokeColor(LINE).stroke(); y += 20;
  });
  y += 10;
  label(doc, "TOTAL", M, y, 100); doc.moveTo(M + 100, y + 10).lineTo(W - M, y + 10).lineWidth(0.5).strokeColor(INK).stroke();
  y += 30;
  label(doc, "Notes / price wins / what to adjust:", M, y, 300); y += 15;
  lines(doc, M, y, W - M * 2, 4, 24);

  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    footer(doc, "Meal Planner & Grocery Bundle - GPLMart", i - range.start + 1, range.count);
  }
  doc.end();
  await done();
  console.log("built", path.join(dir, "Meal-Planner-Grocery-Bundle.pdf"), `${(fs.statSync(path.join(dir, "Meal-Planner-Grocery-Bundle.pdf")).size / 1024).toFixed(0)} KB`);
}

await coloringBook();
await affirmations();
await weddingSigns();
await mealPlanner();
