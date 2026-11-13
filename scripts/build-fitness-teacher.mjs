// Builds two printable PDF products: Fitness Habit Tracker + Teacher Activity Pack.
// Usage: node scripts/build-fitness-teacher.mjs
import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";

const INK = "#1a1a2e";
const MUTED = "#6b6b80";
const ACCENT = "#0e6e56";
const ACCENT2 = "#be185d";
const LINE = "#d8d8e0";
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
function cover(doc, title, subtitle, kicker, accent = ACCENT) {
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
function sectionTitle(doc, text, y, accent = ACCENT) {
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
function cell(doc, x, y, w, h, text, opts = {}) {
  doc.save().rect(x, y, w, h).lineWidth(0.5).strokeColor(LINE).stroke().restore();
  if (text) doc.font(opts.bold ? "Helvetica-Bold" : "Helvetica").fontSize(opts.size ?? 9).fillColor(opts.color ?? INK).text(text, x + 3, y + 3, { width: w - 6 });
}

// ================= FITNESS HABIT TRACKER =================
async function fitness() {
  const dir = "products/src/fitness-habit-tracker";
  const { doc, done } = newDoc(dir, "Fitness-Habit-Tracker.pdf");
  cover(doc, "The Fitness Habit Tracker", "Monthly habit grids, weekly reviews, streak tracking and goal setting - the printable system that actually builds habits.", "GPLMart Printable", "#be185d");

  // how it works
  doc.addPage();
  let y = sectionTitle(doc, "How this tracker works", M + 10, ACCENT2);
  const how = [
    ["Pick 6 habits max", "Exercise, protein, water, sleep, steps, reading - habits you can do daily, not aspirationally."],
    ["Mark X every day you do it", "No partial credit. Miss a day? Mark it anyway - the point is awareness, not perfection."],
    ["Count streaks weekly", "A 7-day streak is worth more than a perfect month. Protect the streak."],
    ["Review every Sunday", "10 minutes: what worked, what broke, what changes next week."],
    ["Monthly reset", "End of month: keep habits above 80%, drop or redesign habits below 50%."],
  ];
  how.forEach(([h, t]) => {
    doc.font("Helvetica-Bold").fontSize(11).fillColor(ACCENT2).text(h, M, y, { width: W - M * 2 });
    y = doc.y + 4;
    doc.font("Helvetica").fontSize(10.5).fillColor(INK).text(t, M, y, { width: W - M * 2 });
    y = doc.y + 12;
  });
  doc.font("Helvetica-Bold").fontSize(11).fillColor(ACCENT2).text("Habit design rules", M, y + 8);
  y = doc.y + 8;
  ["Habits must take under 2 minutes to start (\"put on workout shoes\" beats \"workout 1 hour\")", "Attach new habits to existing ones (\"after morning coffee, I stretch 5 min\")", "Never miss twice - one missed day is an accident, two is a new habit."].forEach((t) => {
    doc.font("Helvetica").fontSize(10.5).fillColor(INK).text(`• ${t}`, M, y, { width: W - M * 2 }); y = doc.y + 6;
  });

  // monthly habit grid pages - generic month template x3 variants? do 4 monthly pages (can print monthly)
  for (let m = 0; m < 4; m++) {
    doc.addPage();
    y = sectionTitle(doc, `Monthly Habit Grid - Copy ${m + 1}`, M + 10, ACCENT2);
    doc.font("Helvetica").fontSize(10).fillColor(MUTED).text("Write your 6 habits in the rows, mark X in each day you complete them. Print one per month.", M, y, { width: W - M * 2 });
    y = doc.y + 12;
    const habits = ["Habit 1", "Habit 2", "Habit 3", "Habit 4", "Habit 5", "Habit 6"];
    const dayW = (W - M * 2 - 110) / 31, headY = y;
    doc.font("Helvetica-Bold").fontSize(7).fillColor(MUTED).text("HABIT", M, headY);
    for (let d = 1; d <= 31; d++) {
      doc.font("Helvetica").fontSize(6).fillColor(MUTED).text(String(d), M + 110 + (d - 1) * dayW + 1, headY);
    }
    y += 14;
    habits.forEach((h) => {
      label(doc, h, M, y, 105);
      for (let d = 0; d < 31; d++) {
        const x = M + 110 + d * dayW;
        doc.save().rect(x, y - 2, dayW - 1, 22).lineWidth(0.3).strokeColor(LINE).stroke().restore();
      }
      y += 24;
    });
    // weekly totals row
    doc.font("Helvetica-Bold").fontSize(8).fillColor(ACCENT2).text("WEEK TOTALS", M, y + 6);
    for (let w = 0; w < 5; w++) {
      const x = M + 110 + w * (dayW * 7);
      doc.save().rect(x, y + 2, dayW * 7 - 1, 22).lineWidth(0.5).strokeColor(ACCENT2).stroke().restore();
    }
    y += 40;
    label(doc, "Monthly score (X count / max):", M, y, 200);
    doc.moveTo(M + 200, y + 10).lineTo(W - M, y + 10).lineWidth(0.5).strokeColor(INK).stroke();
    y += 30;
    label(doc, "Notes / what broke this month:", M, y, 300); y += 14;
    lines(doc, M, y, W - M * 2, 3, 22);
  }

  // weekly review pages x4
  for (let w = 0; w < 4; w++) {
    doc.addPage();
    y = sectionTitle(doc, `Weekly Review - Week ${w + 1}`, M + 10, ACCENT2);
    [
      "Habits completed (count per habit):",
      "Longest streak this week:",
      "What made it hard:",
      "One adjustment for next week:",
      "Win of the week:",
    ].forEach((q) => {
      label(doc, q.toUpperCase(), M, y, 350); y += 15;
      lines(doc, M, y, W - M * 2, 2, 24); y += 2 * 24 + 12;
    });
    // habit score row
    doc.font("Helvetica-Bold").fontSize(8).fillColor(ACCENT2).text("HABIT SCORES (X per day)", M, y);
    for (let h = 0; h < 6; h++) {
      const x = M + h * ((W - M * 2) / 6);
      label(doc, `H${h + 1}`, x + 4, y + 14, 40);
      lines(doc, x + 4, y + 30, (W - M * 2) / 6 - 12, 7, 22);
    }
  }

  // goal setting page
  doc.addPage();
  y = sectionTitle(doc, "Goal Setting", M + 10, ACCENT2);
  doc.font("Helvetica").fontSize(10).fillColor(MUTED).text("SMART goals only: Specific, Measurable, Achievable, Relevant, Time-bound.", M, y, { width: W - M * 2 });
  y = doc.y + 16;
  ["3-MONTH GOAL", "WHY IT MATTERS", "MINIMUM VIABLE VERSION (2-min version)", "FIRST ACTION (do today)"].forEach((h) => {
    label(doc, h, M, y, 200); y += 15;
    lines(doc, M, y, W - M * 2, 3, 26); y += 3 * 26 + 14;
  });
  y = sectionTitle(doc, "Emergency reset (bad week)", y, ACCENT2);
  doc.font("Helvetica").fontSize(10.5).fillColor(INK).lineGap(4);
  ["1. Shrink every habit to 2 minutes or less.", "2. Do the smallest version - put on shoes, open the app, write one line.", "3. Never miss twice - restart immediately.", "4. Track anyway - showing up counts even at 50%."].forEach((t) => {
    doc.text(t, M, y, { width: W - M * 2 }); y = doc.y + 6;
  });

  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    footer(doc, "Fitness Habit Tracker - GPLMart", i - range.start + 1, range.count);
  }
  doc.end();
  await done();
  console.log("built", path.join(dir, "Fitness-Habit-Tracker.pdf"), `${(fs.statSync(path.join(dir, "Fitness-Habit-Tracker.pdf")).size / 1024).toFixed(0)} KB`);
}

// ================= TEACHER ACTIVITY PACK =================
function wordSearch(size, words) {
  const grid = Array.from({ length: size }, () => Array(size).fill(""));
  const dirs = [[0, 1], [1, 0], [1, 1], [1, -1], [0, -1], [-1, 0], [-1, -1], [-1, 1]];
  const placed = [];
  for (const w of words) {
    const word = w.replace(/[^A-Z]/g, "");
    if (word.length > size) continue;
    let ok = false;
    for (let tries = 0; tries < 80 && !ok; tries++) {
      const [dr, dc] = dirs[Math.floor(Math.random() * dirs.length)];
      const r = Math.floor(Math.random() * size), c = Math.floor(Math.random() * size);
      const endR = r + dr * (word.length - 1), endC = c + dc * (word.length - 1);
      if (endR < 0 || endR >= size || endC < 0 || endC >= size) continue;
      let fits = true;
      for (let i = 0; i < word.length; i++) {
        const cell = grid[r + dr * i][c + dc * i];
        if (cell && cell !== word[i]) { fits = false; break; }
      }
      if (!fits) continue;
      for (let i = 0; i < word.length; i++) grid[r + dr * i][c + dc * i] = word[i];
      placed.push(w); ok = true;
    }
  }
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) if (!grid[r][c]) grid[r][c] = letters[Math.floor(Math.random() * 26)];
  return { grid, words: placed };
}

async function teacher() {
  const dir = "products/src/teacher-activity-pack";
  const { doc, done } = newDoc(dir, "Teacher-Activity-Pack.pdf");
  cover(doc, "The Teacher Activity Pack", "Word searches, math drills, handwriting pages and reward charts - print-and-go activities for grades K-5.", "GPLMart Classroom Pack", ACCENT2);

  // word searches x3
  const wordSets = [
    ["APPLE","SCHOOL","FRIEND","TEACHER","BOOK","PENCIL","RECESS","LIBRARY","CLASS","MATH"],
    ["PLANET","ROCKET","GALAXY","COMET","ORBIT","STAR","MOON","ALIEN","SPACE","METEOR"],
    ["GARDEN","FLOWER","SEED","SOIL","WATER","SUNLIGHT","PLANT","LEAF","ROOT","BLOOM"],
  ];
  wordSets.forEach((words, si) => {
    doc.addPage();
    const { grid, words: placed } = wordSearch(12, words);
    let y = sectionTitle(doc, `Word Search ${si + 1} - Find the hidden words`, M + 10, ACCENT2);
    doc.font("Helvetica").fontSize(9).fillColor(MUTED).text("Words can go across, down or diagonally - forwards or backwards.", M, y, { width: W - M * 2 });
    y = doc.y + 12;
    const size = 12, gx = M + 20, cs = 34, gy = y;
    grid.forEach((row, r) => row.forEach((ch, c) => {
      cell(doc, gx + c * cs, gy + r * cs, cs, cs, ch, { size: 12, bold: true });
    }));
    // word list on right
    const wx = gx + size * cs + 40;
    label(doc, "WORDS TO FIND", wx, gy, 200);
    placed.forEach((w, i) => {
      const wy = gy + 20 + i * 30;
      doc.font("Helvetica").fontSize(11).fillColor(INK).text(`${i + 1}. ${w}`, wx, wy, { width: 180 });
      lines(doc, wx, wy + 14, 140, 1, 16);
    });
  });

  // math drills - generated
  function mathDrill(doc, title, gen, perPage = 20) {
    let y = sectionTitle(doc, title, M + 10, ACCENT2);
    doc.font("Helvetica").fontSize(9).fillColor(MUTED).text("Solve and write the answer. No calculators!", M, y, { width: W - M * 2 });
    y = doc.y + 14;
    const cols = 4, cw = (W - M * 2) / cols, ch = 52;
    for (let i = 0; i < perPage; i++) {
      const x = M + (i % cols) * cw, yy = y + Math.floor(i / cols) * ch;
      const prob = gen(i);
      doc.font("Helvetica").fontSize(14).fillColor(INK).text(prob.q, x + 10, yy + 10);
      doc.moveTo(x + 10, yy + ch - 14).lineTo(x + cw - 10, yy + ch - 14).lineWidth(0.5).strokeColor(LINE).stroke();
    }
    return yy_end(y + Math.ceil(perPage / cols) * ch);
    function yy_end(v) { return v; }
  }
  const drills = [
    ["Addition Drill (sums to 20)", (i) => { const a = 1 + (i * 7) % 10, b = 20 - a - ((i * 3) % 8); return { q: `${a} + ${b} =` }; }],
    ["Subtraction Drill", (i) => { const a = 15 + (i * 5) % 15, b = (i * 3) % (a - 1) + 1; return { q: `${a} - ${b} =` }; }],
    ["Multiplication Drill (x2-x9)", (i) => { const a = 2 + (i * 3) % 8, b = 2 + (i * 5) % 8; return { q: `${a} × ${b} =` }; }],
  ];
  drills.forEach(([title, gen]) => {
    doc.addPage();
    mathDrill(doc, title, gen);
  });

  // handwriting pages x2
  for (let p = 0; p < 2; p++) {
    doc.addPage();
    let y = sectionTitle(doc, `Handwriting Practice - Page ${p + 1}`, M + 10, ACCENT2);
    doc.font("Helvetica").fontSize(9).fillColor(MUTED).text("Trace the letter shapes, then write your own below each row.", M, y, { width: W - M * 2 });
    y = doc.y + 14;
    const letters = p === 0 ? "Aa Bb Cc Dd Ee" : "Ff Gg Hh Ii Jj Kk";
    doc.font("Helvetica-Bold").fontSize(28).fillColor(LINE).text(letters, M, y, { width: W - M * 2 });
    y += 60;
    for (let i = 0; i < 8; i++) {
      // three-line handwriting guide
      const gy = y + i * 60;
      doc.save().moveTo(M, gy).lineTo(W - M, gy).lineWidth(0.7).strokeColor(LINE).stroke().restore();
      doc.save().moveTo(M, gy + 40).lineTo(W - M, gy + 40).lineWidth(0.7).strokeColor(LINE).stroke().restore();
      doc.save().moveTo(M, gy + 14).lineTo(W - M, gy + 14).lineWidth(0.3).strokeColor(LINE).stroke().restore();
      doc.save().moveTo(M, gy + 27).lineTo(W - M, gy + 27).lineWidth(0.3).strokeColor(LINE).stroke().restore();
    }
    y += 8 * 60 + 20;
    label(doc, "NAME:", M, y, 80);
    doc.moveTo(M + 80, y + 10).lineTo(M + 250, y + 10).lineWidth(0.5).strokeColor(INK).stroke();
    label(doc, "DATE:", M + 300, y, 80);
    doc.moveTo(M + 380, y + 10).lineTo(W - M, y + 10).lineWidth(0.5).strokeColor(INK).stroke();
  }

  // reward chart
  doc.addPage();
  let y = sectionTitle(doc, "Classroom Reward Chart", M + 10, ACCENT2);
  doc.font("Helvetica").fontSize(10).fillColor(MUTED).text("Pick 5 behaviors. Students move their clip up when they earn it - 5 clips = reward.", M, y, { width: W - M * 2 });
  y = doc.y + 16;
  const behaviors = ["Follows directions", "Helps classmates", "Completes work", "Kind words", "Good listening"];
  behaviors.forEach((b, i) => {
    const col = i % 5, row = Math.floor(i / 5);
    const x = M + col * ((W - M * 2) / 5 + 6), yy = y + row * 120;
    doc.save().roundedRect(x, yy, (W - M * 2) / 5 - 6, 110, 8).strokeColor(LINE).stroke().restore();
    label(doc, b.toUpperCase(), x + 8, yy + 10, (W - M * 2) / 5 - 22);
    for (let s = 0; s < 5; s++) {
      const sx = x + 8 + s * ((W - M * 2) / 5 - 22) / 5;
      doc.save().circle(sx + 10, yy + 80, 9).lineWidth(1).strokeColor(INK).stroke().restore();
    }
    doc.font("Helvetica").fontSize(7).fillColor(MUTED).text("reward", x + 8, yy + 96, { width: (W - M * 2) / 5 - 22 });
  });
  y += 130;
  label(doc, "STUDENT NAME:", M, y, 120);
  doc.moveTo(M + 120, y + 10).lineTo(W - M, y + 10).lineWidth(0.5).strokeColor(INK).stroke();

  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    footer(doc, "Teacher Activity Pack - GPLMart", i - range.start + 1, range.count);
  }
  doc.end();
  await done();
  console.log("built", path.join(dir, "Teacher-Activity-Pack.pdf"), `${(fs.statSync(path.join(dir, "Teacher-Activity-Pack.pdf")).size / 1024).toFixed(0)} KB`);
}

await fitness();
await teacher();
