// Builds printable planner PDFs with pdfkit - real calendar grids, trackers, time blocks.
// Usage: node scripts/build-planners.mjs
import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";

const INK = "#1a1a2e";
const MUTED = "#6b6b80";
const ACCENT = "#0e6e56";
const ACCENT_SOFT = "#e4f2ec";
const LINE = "#d8d8e0";
const W = 595, H = 842, M = 50;

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

function newDoc(dir, file) {
  fs.mkdirSync(dir, { recursive: true });
  const doc = new PDFDocument({ size: "A4", margins: { top: M, bottom: M, left: M, right: M }, bufferPages: true });
  const stream = fs.createWriteStream(path.join(dir, file));
  doc.pipe(stream);
  return { doc, stream, done: () => new Promise((res, rej) => { stream.on("finish", res); stream.on("error", rej); }) };
}

function footer(doc, label, pageNum, total) {
  doc.font("Helvetica").fontSize(8).fillColor(MUTED)
    .text(label, M, H - 34, { width: W - M * 2, align: "center" })
    .text(`${pageNum} / ${total}`, M, H - 24, { width: W - M * 2, align: "center" });
}

function cover(doc, title, subtitle, kicker) {
  doc.rect(0, 0, W, H).fill("#ffffff");
  doc.rect(0, 0, W, 14).fill(ACCENT);
  doc.font("Helvetica-Bold").fontSize(11).fillColor(ACCENT)
    .text(kicker.toUpperCase(), M, 90, { characterSpacing: 3 });
  doc.font("Helvetica-Bold").fontSize(34).fillColor(INK)
    .text(title, M, 120, { width: W - M * 2, lineGap: 4 });
  doc.font("Helvetica").fontSize(13).fillColor(MUTED)
    .text(subtitle, M, doc.y + 14, { width: W - M * 2 - 40, lineGap: 4 });
  doc.moveTo(M, H - 120).lineTo(W - M, H - 120).lineWidth(1).strokeColor(LINE).stroke();
  doc.font("Helvetica").fontSize(10).fillColor(MUTED)
    .text("GPLMart - printable planner - print at 100% / Actual Size", M, H - 100);
  doc.font("Helvetica-Bold").fontSize(10).fillColor(ACCENT).text("gplmart.com", M, H - 84);
}

function sectionTitle(doc, text, y) {
  doc.font("Helvetica-Bold").fontSize(9).fillColor(ACCENT)
    .text(text.toUpperCase(), M, y, { characterSpacing: 2 });
  doc.moveTo(M, y + 14).lineTo(W - M, y + 14).lineWidth(0.8).strokeColor(ACCENT).stroke();
  return y + 24;
}

function lines(doc, x, y, w, n, gap = 22) {
  doc.save().lineWidth(0.5).strokeColor(LINE);
  for (let i = 0; i < n; i++) {
    const ly = y + i * gap;
    doc.moveTo(x, ly).lineTo(x + w, ly).stroke();
  }
  doc.restore();
}

function label(doc, text, x, y, w) {
  doc.font("Helvetica-Bold").fontSize(9).fillColor(INK).text(text, x, y, { width: w });
}

// ---------- 2026 Planner Bundle ----------
async function planner2026() {
  const dir = "products/src/planner-bundle-2026";
  const { doc, done } = newDoc(dir, "Planner-Bundle-2026.pdf");

  // page 1: cover
  cover(doc, "The Minimalist 2026 Planner", "Budget, goals, habits and monthly focus - 20 printable pages designed to be used, not admired.", "GPLMart Planner Bundle");

  // page 2: how to use
  doc.addPage();
  let y = sectionTitle(doc, "How to use this planner", M + 10);
  doc.font("Helvetica").fontSize(10.5).fillColor(INK).lineGap(4);
  const intro = [
    "Print at 100% scale (Actual Size, not Fit to Page) for correct sizing. Single-sided is fine - the design works on any paper.",
    "Start with 'Year at a Glance' and 'Annual Goals'. Pick 3 life areas and one word for the year.",
    "Each monthly page has: the real 2026 calendar, your top 3 priorities, a focus project, a budget box and notes.",
    "Review monthly pages on the last Sunday of each month - 15 minutes, same time, same place.",
    "The habit tracker at the back is your consistency engine: 8 habits, 12 months, one dot per day done.",
  ];
  intro.forEach((t) => { doc.text(t, M, y, { width: W - M * 2 }); y = doc.y + 8; });
  y += 16;
  doc.font("Helvetica-Bold").fontSize(11).fillColor(ACCENT).text("The 15-minute monthly ritual", M, y);
  y = doc.y + 8;
  ["1. Check the budget box - what did you actually spend vs plan?", "2. Move unfinished priorities forward or kill them.", "3. Set next month's top 3 before the month starts.", "4. Fill one line in the notes: what worked, what didn't."].forEach((t) => {
    doc.font("Helvetica").fontSize(10.5).fillColor(INK).text(t, M, y, { width: W - M * 2 }); y = doc.y + 6;
  });

  // page 3: year at a glance
  doc.addPage();
  y = sectionTitle(doc, "Year at a Glance - 2026", M + 10);
  const cw = (W - M * 2) / 4, ch = 90;
  MONTHS.forEach((m, i) => {
    const col = i % 4, row = Math.floor(i / 4);
    const x = M + col * cw, yy = y + row * (ch + 12);
    doc.save().roundedRect(x, yy, cw - 10, ch, 6).fill(ACCENT_SOFT).restore();
    doc.font("Helvetica-Bold").fontSize(12).fillColor(ACCENT).text(m.slice(0, 3).toUpperCase(), x + 10, yy + 12);
    doc.font("Helvetica").fontSize(9).fillColor(MUTED).text(`${new Date(2026, i, 1).toLocaleString("en", { weekday: "short" })} start`, x + 10, yy + 32);
    lines(doc, x + 10, yy + 52, cw - 30, 3, 14);
  });
  doc.y = y + 2 * (ch + 12) + 10;
  doc.font("Helvetica").fontSize(10).fillColor(MUTED)
    .text("One line per month: the single most important thing. Write it now for Q1 at least.", M, doc.y, { width: W - M * 2 });

  // page 4: annual goals
  doc.addPage();
  y = sectionTitle(doc, "Annual Goals", M + 10);
  doc.font("Helvetica").fontSize(10).fillColor(MUTED)
    .text("Three areas. One word. Twelve monthly goals. Specific beats ambitious.", M, y, { width: W - M * 2 });
  y = doc.y + 14;
  ["Health", "Work / Business", "Life / Relationships"].forEach((area) => {
    y = sectionTitle(doc, area, y);
    label(doc, "Word for the year:", M, y, 110);
    doc.moveTo(M + 110, y + 12).lineTo(M + 260, y + 12).lineWidth(0.7).strokeColor(INK).stroke();
    y += 26;
    lines(doc, M, y, W - M * 2, 3, 24);
    y += 3 * 24 + 14;
  });
  y = sectionTitle(doc, "Twelve monthly goals - one per month", y);
  for (let i = 0; i < 12; i++) {
    const col = i % 2, row = Math.floor(i / 2);
    const x = M + col * ((W - M * 2) / 2 + 8), yy = y + row * 40;
    doc.font("Helvetica-Bold").fontSize(9).fillColor(ACCENT).text(MONTHS[i].toUpperCase(), x, yy);
    lines(doc, x, yy + 16, (W - M * 2) / 2 - 16, 1, 18);
  }

  // pages 5-16: monthly pages
  for (let m = 0; m < 12; m++) {
    doc.addPage();
    y = M + 6;
    doc.font("Helvetica-Bold").fontSize(20).fillColor(INK).text(MONTHS[m].toUpperCase(), M, y);
    doc.font("Helvetica").fontSize(10).fillColor(MUTED).text("2026", M + doc.widthOfString(MONTHS[m].toUpperCase()) + 10, y + 6);
    doc.moveTo(M, y + 30).lineTo(W - M, y + 30).lineWidth(1).strokeColor(ACCENT).stroke();
    y += 44;

    // calendar grid
    const first = new Date(2026, m, 1);
    const startDow = (first.getDay() + 6) % 7; // Mon=0
    const daysIn = new Date(2026, m + 1, 0).getDate();
    const gw = (W - M * 2) / 7, gh = 24;
    DAYS.forEach((d, i) => {
      doc.font("Helvetica-Bold").fontSize(8).fillColor(MUTED).text(d, M + i * gw + 6, y);
    });
    y += 14;
    const rows = Math.ceil((startDow + daysIn) / 7);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < 7; c++) {
        const idx = r * 7 + c - startDow + 1;
        const x = M + c * gw, yy = y + r * gh;
        doc.save().rect(x, yy, gw, gh).lineWidth(0.4).strokeColor(LINE).stroke().restore();
        if (idx >= 1 && idx <= daysIn) {
          doc.font("Helvetica").fontSize(9).fillColor(INK).text(String(idx), x + 5, yy + 5);
        }
      }
    }
    y += rows * gh + 18;

    // priorities + focus
    label(doc, "TOP 3 PRIORITIES THIS MONTH", M, y, 200); y += 15;
    lines(doc, M, y, (W - M * 2) * 0.55, 3, 20); y += 3 * 20 + 12;
    label(doc, "FOCUS PROJECT", M, y, 200); y += 15;
    lines(doc, M, y, (W - M * 2) * 0.55, 2, 20); y += 2 * 20 + 16;

    // right column: budget + notes
    const rx = M + (W - M * 2) * 0.62, rw = (W - M * 2) * 0.38;
    const ry = M + 100;
    doc.save().roundedRect(rx, ry, rw, 110, 6).fill(ACCENT_SOFT).restore();
    doc.font("Helvetica-Bold").fontSize(9).fillColor(ACCENT).text("MONTH BUDGET", rx + 12, ry + 12);
    label(doc, "Income $", rx + 12, ry + 34, 60);
    doc.moveTo(rx + 80, ry + 44).lineTo(rx + rw - 12, ry + 44).lineWidth(0.5).strokeColor(INK).stroke();
    label(doc, "Expenses $", rx + 12, ry + 58, 60);
    doc.moveTo(rx + 80, ry + 68).lineTo(rx + rw - 12, ry + 68).lineWidth(0.5).strokeColor(INK).stroke();
    label(doc, "Profit $", rx + 12, ry + 82, 60);
    doc.moveTo(rx + 80, ry + 92).lineTo(rx + rw - 12, ry + 92).lineWidth(0.5).strokeColor(INK).stroke();

    // notes area
    const ny = y;
    doc.save().roundedRect(M, ny, (W - M * 2) * 0.55, H - M - ny - 8, 6).fill("#fafafc").restore();
    doc.font("Helvetica-Bold").fontSize(9).fillColor(MUTED).text("NOTES & WINS", M + 12, ny + 10);
    lines(doc, M + 12, ny + 30, (W - M * 2) * 0.55 - 24, 8, 24);
    doc.font("Helvetica-Bold").fontSize(9).fillColor(MUTED).text("MONTHLY REVIEW", rx + 12, ry + 122);
    lines(doc, rx + 12, ry + 140, rw - 24, 5, 20);
  }

  // habit tracker page
  doc.addPage();
  y = sectionTitle(doc, "Annual Habit Tracker", M + 10);
  doc.font("Helvetica").fontSize(10).fillColor(MUTED)
    .text("Pick 8 habits. Mark each month X when you kept it most days. Aim for 8/12 per habit by December.", M, y, { width: W - M * 2 });
  y = doc.y + 18;
  const habits = ["Exercise", "Read 20 min", "No sugar", "Meditate", "Save money", "No phone bed", "Learn skill", "Early sleep"];
  const cellW = (W - M * 2 - 140) / 12, cellH = 30;
  doc.font("Helvetica-Bold").fontSize(9).fillColor(MUTED).text("HABIT", M, y);
  MONTHS.forEach((m, i) => doc.font("Helvetica-Bold").fontSize(7).fillColor(MUTED).text(m.slice(0, 3), M + 140 + i * cellW, y));
  y += 16;
  habits.forEach((h) => {
    doc.font("Helvetica").fontSize(9).fillColor(INK).text(h, M, y + 8, { width: 130 });
    for (let m = 0; m < 12; m++) {
      const x = M + 140 + m * cellW;
      doc.save().rect(x, y, cellW - 4, cellH - 4).lineWidth(0.4).strokeColor(LINE).stroke().restore();
    }
    y += cellH;
  });

  // budget summary page
  doc.addPage();
  y = sectionTitle(doc, "Annual Budget Summary", M + 10);
  const bcols = ["Month", "Income", "Expenses", "Profit", "Savings rate"];
  const bw = (W - M * 2) / 5;
  bcols.forEach((c, i) => {
    doc.font("Helvetica-Bold").fontSize(9).fillColor("#ffffff")
      .text(c, M + i * bw + 6, y + 4, { width: bw - 10 });
  });
  doc.rect(M, y, W - M * 2, 22).fill(NAVY_FIX());
  doc.fillColor("#ffffff");
  y += 22;
  for (let m = 0; m < 12; m++) {
    doc.font("Helvetica").fontSize(9).fillColor(INK).text(MONTHS[m].slice(0, 3), M + 6, y + 5, { width: bw - 10 });
    for (let i = 1; i < 5; i++) {
      doc.moveTo(M + i * bw, y).lineTo(M + i * bw, y + 20).lineWidth(0.4).strokeColor(LINE).stroke();
      doc.text("", M + i * bw + 6, y + 5, { width: bw - 10 });
    }
    doc.moveTo(M, y + 20).lineTo(W - M, y + 20).lineWidth(0.4).strokeColor(LINE).stroke();
    y += 20;
  }
  doc.font("Helvetica").fontSize(9).fillColor(MUTED).text("Savings rate = profit / income. Target 20%+ every month - even in expensive months.", M, y + 12, { width: W - M * 2 });

  // quarterly reviews
  for (const q of ["Q1 (Jan-Mar)", "Q2 (Apr-Jun)", "Q3 (Jul-Sep)", "Q4 (Oct-Dec)"]) {
    doc.addPage();
    y = sectionTitle(doc, `Quarterly Review - ${q}`, M + 10);
    ["Wins this quarter (3)", "Misses / lessons (3)", "Carry forward to next quarter", "One thing to stop doing"].forEach((h) => {
      label(doc, h.toUpperCase(), M, y, 300); y += 15;
      lines(doc, M, y, W - M * 2, 3, 24); y += 3 * 24 + 14;
    });
  }

  // notes pages
  for (let i = 0; i < 2; i++) {
    doc.addPage();
    y = sectionTitle(doc, `Notes ${i + 1}`, M + 10);
    lines(doc, M, y + 8, W - M * 2, 22, 30);
  }

  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    footer(doc, "The Minimalist 2026 Planner - GPLMart", i - range.start + 1, range.count);
  }
  doc.end();
  await done();
  console.log("built", path.join(dir, "Planner-Bundle-2026.pdf"), `${(fs.statSync(path.join(dir, "Planner-Bundle-2026.pdf")).size / 1024).toFixed(0)} KB`);
}

function NAVY_FIX() { return "#1a1a2e"; }

// ---------- ADHD Daily Planner ----------
async function adhdPlanner() {
  const dir = "products/src/adhd-daily-planner";
  const { doc, done } = newDoc(dir, "ADHD-Daily-Planner.pdf");

  cover(doc, "The ADHD-Friendly Daily Planner", "Time-blocked days, body-doubling timers and shutdown rituals - 14 undated pages plus a weekly reset.", "GPLMart Planner");

  // how it works
  doc.addPage();
  let y = sectionTitle(doc, "How this planner works", M + 10);
  const how = [
    ["Top 3 only", "ADHD brains drown in long lists. Three priorities per day - everything else is bonus."],
    ["Time blocks, not to-dos", "Assign each task a time slot. A task without a time is a wish."],
    ["Body doubling", "Work alongside someone (or a video) for 25 minutes, break 5. The timer section is built for this."],
    ["Energy check first", "Rate your energy 1-5 before planning. Low energy day = shrink the list, don't abandon it."],
    ["Shutdown ritual", "End every day by writing tomorrow's top 3 - your future self starts ahead."],
  ];
  how.forEach(([h, t]) => {
    doc.font("Helvetica-Bold").fontSize(11).fillColor(ACCENT).text(h, M, y, { width: W - M * 2 });
    y = doc.y + 4;
    doc.font("Helvetica").fontSize(10.5).fillColor(INK).text(t, M, y, { width: W - M * 2 });
    y = doc.y + 12;
  });
  doc.font("Helvetica-Bold").fontSize(11).fillColor(ACCENT).text("The 5-minute reset (for bad days)", M, y + 8);
  y = doc.y + 8;
  ["1. Set a 5-minute timer. 2. Write down everything swirling in your head - no order, no judgment.", "3. Pick ONE thing you can finish in 15 minutes. 4. Do only that. 5. Stop. You already won today."].forEach((t) => {
    doc.font("Helvetica").fontSize(10.5).fillColor(INK).text(t, M, y, { width: W - M * 2 }); y = doc.y + 6;
  });

  // 14 daily pages
  for (let d = 0; d < 14; d++) {
    doc.addPage();
    y = M + 4;
    doc.font("Helvetica-Bold").fontSize(18).fillColor(INK).text("DAY", M, y);
    doc.font("Helvetica").fontSize(14).fillColor(MUTED).text(`  #${d + 1}`, M + doc.widthOfString("DAY") + 4, y + 3);
    doc.moveTo(M, y + 26).lineTo(W - M, y + 26).lineWidth(1).strokeColor(ACCENT).stroke();
    y += 40;

    // energy + mood check
    label(doc, "ENERGY / MOOD (circle one)", M, y, 300); y += 14;
    for (let i = 1; i <= 5; i++) {
      const x = M + (i - 1) * 42;
      doc.save().circle(x + 10, y + 5, 9).lineWidth(1).strokeColor(INK).stroke().restore();
      doc.font("Helvetica").fontSize(8).fillColor(MUTED).text(String(i), x + 7, y + 2);
    }
    doc.font("Helvetica").fontSize(9).fillColor(MUTED).text("1 = wrecked    5 = unstoppable", M + 230, y);
    y += 26;

    // top 3
    label(doc, "TOP 3 PRIORITIES (only 3)", M, y, 300); y += 15;
    lines(doc, M, y, W - M * 2, 3, 26); y += 3 * 26 + 14;

    // time blocks left, pomodoro right
    const bw = (W - M * 2) * 0.62, bx = M + bw + 20, bww = (W - M * 2) * 0.38;
    label(doc, "TIME BLOCKS", M, y, bw);
    const blockH = 20;
    const hours = ["7-9", "9-11", "11-1", "1-3", "3-5", "5-7", "7-9"];
    hours.forEach((h) => {
      doc.font("Helvetica").fontSize(8).fillColor(MUTED).text(h, M, y, { width: 40 });
      doc.moveTo(M + 44, y + 8).lineTo(M + bw, y + 8).lineWidth(0.5).strokeColor(LINE).stroke();
      doc.moveTo(M + 44, y + 16).lineTo(M + bw, y + 16).lineWidth(0.3).strokeColor(LINE).stroke();
      y += blockH;
    });
    y += 10;

    // pomodoro box
    doc.save().roundedRect(bx, M + 120, bww, 190, 8).fill(ACCENT_SOFT).restore();
    doc.font("Helvetica-Bold").fontSize(10).fillColor(ACCENT).text("BODY DOUBLE TIMER", bx + 12, M + 132);
    doc.font("Helvetica").fontSize(9).fillColor(MUTED)
      .text("25 min focus / 5 min break. Put on a study-with-me video or work next to someone.", bx + 12, M + 150, { width: bww - 24 });
    for (let i = 0; i < 4; i++) {
      const px = bx + 12 + i * ((bww - 24) / 4);
      doc.save().circle(px + 8, M + 210, 8).lineWidth(1).strokeColor(INK).stroke().restore();
      doc.font("Helvetica-Bold").fontSize(8).fillColor(INK).text(`${(i + 1) * 25}`, px + 2, M + 206);
    }
    label(doc, "Interruptions today:", bx + 12, M + 240, 120);
    doc.moveTo(bx + 120, M + 250).lineTo(bx + bww - 12, M + 250).lineWidth(0.5).strokeColor(INK).stroke();

    // shutdown ritual
    y = M + 120 + 200 + 16;
    doc.save().roundedRect(M, y, W - M * 2, 90, 8).fill("#fafafc").strokeColor(LINE).stroke().restore();
    doc.font("Helvetica-Bold").fontSize(10).fillColor(ACCENT).text("SHUTDOWN RITUAL (5 min before bed)", M + 14, y + 12);
    doc.font("Helvetica").fontSize(9.5).fillColor(INK).text("Write tomorrow's top 3: ", M + 14, y + 32);
    doc.moveTo(M + 130, y + 40).lineTo(W - M - 14, y + 40).lineWidth(0.5).strokeColor(INK).stroke();
    lines(doc, M + 14, y + 56, W - M * 2 - 28, 2, 18);
  }

  // weekly review
  doc.addPage();
  y = sectionTitle(doc, "Weekly Reset", M + 10);
  ["Days I actually used the planner (honest count)", "What worked this week", "What made it hard", "One adjustment for next week", "Carry-over tasks from last week"].forEach((q) => {
    label(doc, q.toUpperCase(), M, y, 400); y += 15;
    lines(doc, M, y, W - M * 2, 3, 24); y += 3 * 24 + 14;
  });

  // overwhelm page
  doc.addPage();
  y = sectionTitle(doc, "The Overwhelm Page", M + 10);
  doc.font("Helvetica").fontSize(10.5).fillColor(INK).lineGap(4);
  [
    "When everything feels like too much, don't try to fix your life. Do this instead:",
    "1. Breathe for 60 seconds - in for 4, hold for 4, out for 6.",
    "2. Write a brain dump: everything in your head, no filtering.",
    "3. Circle the ONE thing causing the most weight.",
    "4. Shrink it until it's 15 minutes of work.",
    "5. Set a timer and do only that.",
    "6. When the timer ends, stop. Progress counts, even tiny.",
  ].forEach((t) => { doc.text(t, M, y, { width: W - M * 2 }); y = doc.y + 8; });
  doc.font("Helvetica-Bold").fontSize(11).fillColor(ACCENT).text("Reminder: done is better than perfect. A messy day that happened beats a perfect plan that didn't.", M, y + 16, { width: W - M * 2 });

  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    footer(doc, "ADHD-Friendly Daily Planner - GPLMart", i - range.start + 1, range.count);
  }
  doc.end();
  await done();
  console.log("built", path.join(dir, "ADHD-Daily-Planner.pdf"), `${(fs.statSync(path.join(dir, "ADHD-Daily-Planner.pdf")).size / 1024).toFixed(0)} KB`);
}

await planner2026();
await adhdPlanner();
