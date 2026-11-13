// Builds business planner workbooks (.xlsx) with live formulas.
// Usage: node scripts/build-business-sheets.mjs
import fs from "node:fs";
import path from "node:path";
import ExcelJS from "exceljs";

const NAVY = "FF1A1A2E";
const ACCENT = "FF0E9F6E";
const LIGHT = "FFF4F4F8";
const money = '"$"#,##0.00';
const pct = '0.0%';
const num = '#,##0';

function styleHeader(ws, rowNum, widths) {
  const row = ws.getRow(rowNum);
  row.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
  row.fill = { type: "pattern", pattern: "solid", fgColor: { argb: NAVY } };
  widths.forEach((w, i) => (ws.getColumn(i + 1).width = w));
}
function title(ws, text, sub) {
  ws.getCell("A1").value = text;
  ws.getCell("A1").font = { bold: true, size: 16, color: { argb: NAVY } };
  if (sub) {
    ws.getCell("A2").value = sub;
    ws.getCell("A2").font = { italic: true, size: 10, color: { argb: "FF555570" } };
  }
}
function note(ws, row, text) {
  ws.getCell(`A${row}`).value = text;
  ws.getCell(`A${row}`).font = { italic: true, size: 10, color: { argb: "FF555570" } };
}
function box(ws, addr) {
  ws.getCell(addr).fill = { type: "pattern", pattern: "solid", fgColor: { argb: LIGHT } };
}
function headerRow(ws, r, heads, widths) {
  heads.forEach((h, i) => (ws.getCell(r, i + 1).value = h));
  styleHeader(ws, r, widths);
  ws.views = [{ state: "frozen", ySplit: r }];
}
function dataRows(ws, start, count, cols, formulas = {}) {
  for (let i = 0; i < count; i++) {
    const r = start + i;
    for (let c = 1; c <= cols; c++) {
      const cell = ws.getCell(r, c);
      const key = `${c}`;
      if (formulas[key]) cell.value = { formula: formulas[key].replace("{r}", r) };
      else cell.value = "";
      box(ws, cell.address);
    }
  }
}
async function save(wb, dir, file) {
  fs.mkdirSync(dir, { recursive: true });
  const p = path.join(dir, file);
  await wb.xlsx.writeFile(p);
  console.log("built", p);
}

// ================= WEDDING PLANNER =================
async function wedding() {
  const wb = new ExcelJS.Workbook();
  wb.creator = "GPLMart";

  const s = wb.addWorksheet("Start Here");
  s.views = [{ showGridLines: false }];
  title(s, "Wedding Planner Spreadsheet System", "Budget, guests, timeline, seating & vendors - the spreadsheet that out-sold every printable on Etsy");
  note(s, 4, "TABS");
  [
    ["Budget", "Every cost category with estimated vs actual - watch total spend vs budget live."],
    ["Guest List", "Names, RSVP, meal choice, plus-one, table assignment."],
    ["Timeline", "Countdown to the wedding + day-of schedule."],
    ["Seating Plan", "Tables, seats, guest assignments with capacity checks."],
    ["Vendors", "Every vendor: contact, quote, deposit, balance, status."],
    ["Checklist", "The complete pre-wedding task list by months-out."],
  ].forEach((r, i) => {
    s.getCell(`A${5 + i}`).value = r[0];
    s.getCell(`B${5 + i}`).value = r[1];
    s.getCell(`A${5 + i}`).font = { bold: true };
    s.getCell(`B${5 + i}`).alignment = { wrapText: true, vertical: "top" };
  });
  s.getColumn("A").width = 18; s.getColumn("B").width = 100;

  // Budget
  const b = wb.addWorksheet("Budget");
  title(b, "Wedding Budget", "Estimated vs actual per category - totals update live");
  headerRow(b, 4, ["Category", "Estimated $", "Actual $", "Variance $", "Notes"], [30, 14, 14, 14, 40]);
  const cats = ["Venue", "Catering & cake", "Photography", "Videography", "Flowers & decor", "Attire & rings", "Music & entertainment", "Invitations", "Transport", "Hair & makeup", "Favors & gifts", "Contingency (10%)", "Other"];
  cats.forEach((cat, i) => {
    const r = 5 + i;
    b.getCell(r, 1).value = cat;
    b.getCell(r, 2).value = 0; b.getCell(r, 2).numFmt = money; box(b, `B${r}`);
    b.getCell(r, 3).value = 0; b.getCell(r, 3).numFmt = money; box(b, `C${r}`);
    b.getCell(r, 4).value = { formula: `=C${r}-B${r}` }; b.getCell(r, 4).numFmt = money;
  });
  const bt = 5 + cats.length;
  b.getCell(`A${bt}`).value = "TOTAL"; b.getCell(`A${bt}`).font = { bold: true };
  ["B", "C", "D"].forEach((L) => {
    b.getCell(bt, L.charCodeAt(0) - 64).value = { formula: `=SUM(${L}5:${L}${bt - 1})` };
    b.getCell(bt, L.charCodeAt(0) - 64).numFmt = money;
    b.getCell(bt, L.charCodeAt(0) - 64).font = { bold: true };
  });
  note(b, bt + 2, "Variance = actual - estimated. Green = under budget, red = over. Keep Contingency at ~10% of total for the inevitable surprises.");

  // Guest List
  const g = wb.addWorksheet("Guest List");
  title(g, "Guest List & RSVPs", "Track every invite, reply, meal and plus-one");
  headerRow(g, 4, ["Name", "Side (B/G)", "Email", "RSVP", "Plus one?", "Meal choice", "Table #", "Notes"], [24, 10, 26, 10, 10, 14, 9, 30]);
  dataRows(g, 5, 150, 8);
  for (let r = 5; r < 155; r++) {
    g.getCell(r, 4).dataValidation = { type: "list", allowBlank: true, formulae: ['"Yes,No,Maybe"'] };
    g.getCell(r, 5).dataValidation = { type: "list", allowBlank: true, formulae: ['"Yes,No"'] };
  }
  const gt = 156;
  g.getCell(`A${gt}`).value = "RSVP COUNT"; g.getCell(`A${gt}`).font = { bold: true };
  const rsvpCount = (val) => `=COUNTIF(D5:D154,"${val}")`;
  [["Yes"], ["No"], ["Maybe"], ["Total invited"]].forEach(([lbl], i) => {
    const r = gt + 1 + i;
    g.getCell(`A${r}`).value = lbl;
    g.getCell(`B${r}`).value = lbl === "Total invited" ? { formula: "=COUNTA(A5:A154)" } : { formula: rsvpCount(lbl) };
    g.getCell(`B${r}`).font = { bold: true };
  });
  note(g, gt + 6, "Filter the RSVP column for 'Yes' when building the seating plan. Meal choice feeds the caterer's final count.");

  // Timeline
  const t = wb.addWorksheet("Timeline");
  title(t, "Wedding Countdown & Day-Of Schedule", "Every task with a deadline - nothing forgotten");
  headerRow(t, 4, ["Task", "Owner", "Due date", "Status", "Notes"], [40, 16, 14, 12, 36]);
  const tasks = [
    "Set budget & guest count", "Book venue", "Book photographer", "Book videographer", "Book caterer", "Book florist",
    "Book band/DJ", "Buy rings", "Buy attire", "Send save-the-dates", "Book hair & makeup", "Order invitations",
    "Book transport", "Finalize menu tasting", "Write vows", "Book rehearsal dinner venue", "Confirm timeline with vendors",
    "Mail invitations", "RSVP deadline", "Final headcount to caterer", "Seating chart final", "Welcome bags",
    "Marriage license", "Rehearsal", "Wedding day!",
  ];
  tasks.forEach((task, i) => {
    const r = 5 + i;
    t.getCell(r, 1).value = task;
    t.getCell(r, 4).dataValidation = { type: "list", allowBlank: true, formulae: ['"Done,In progress,Todo"'] };
    for (let c = 1; c <= 5; c++) box(t, t.getCell(r, c).address);
  });
  note(t, 5 + tasks.length + 1, "Sort by Due date. Typical order: venue 12+ months out, invites 2-3 months, RSVPs 1 month, license 1-4 weeks (varies by state).");

  // Seating
  const st = wb.addWorksheet("Seating Plan");
  title(st, "Seating Plan", "Tables and guests - check capacity before you finalize");
  headerRow(st, 4, ["Table #", "Table name", "Capacity", "Guest names"], [10, 20, 10, 80]);
  for (let i = 0; i < 20; i++) {
    const r = 5 + i;
    for (let c = 1; c <= 4; c++) box(st, st.getCell(r, c).address);
  }
  st.getCell("F4").value = "TOTAL SEATED"; st.getCell("F4").font = { bold: true };
  st.getCell("G4").value = { formula: '=COUNTA(D5:D24)' }; st.getCell("G4").font = { bold: true };
  st.getCell("F5").value = "TOTAL CAPACITY"; st.getCell("F5").font = { bold: true };
  st.getCell("G5").value = { formula: "=SUM(C5:C24)" }; st.getCell("G5").font = { bold: true };
  st.getCell("F6").value = "SEATS LEFT"; st.getCell("F6").font = { bold: true };
  st.getCell("G6").value = { formula: "=G5-G4" }; st.getCell("G6").font = { bold: true, color: { argb: ACCENT } };
  note(st, 27, "Capacity check: Seats left should be >= your VIP/wheelchair/children buffer. Cross-reference with Guest List 'Table #' column.");

  // Vendors
  const v = wb.addWorksheet("Vendors");
  title(v, "Vendor Tracker", "Every vendor, quote, deposit and balance in one place");
  headerRow(v, 4, ["Vendor", "Category", "Contact", "Quote $", "Deposit $", "Balance $", "Status", "Notes"], [22, 16, 24, 12, 12, 12, 12, 30]);
  const vstatus = ["Booked", "Quoted", "Contacted", "Needed"];
  dataRows(v, 5, 60, 8);
  for (let r = 5; r < 65; r++) {
    v.getCell(r, 6).value = { formula: `=IF(E${r}="","",E${r}-D${r})` };
    v.getCell(r, 6).numFmt = money;
    v.getCell(r, 4).numFmt = money; v.getCell(r, 5).numFmt = money;
    v.getCell(r, 7).dataValidation = { type: "list", allowBlank: true, formulae: [`"${vstatus.join(",")}"`] };
  }
  note(v, 66, "Rule of thumb: never pay more than 30-50% deposit before a contract. Get everything in writing - email counts.");

  // Checklist
  const c = wb.addWorksheet("Checklist");
  title(c, "Master Checklist", "Every task by months-out - print or check off digitally");
  headerRow(c, 4, ["When", "Task", "Done?"], [16, 70, 10]);
  const cl = [
    ["12+ months", "Set budget, draft guest list", ""], ["12+ months", "Book venue", ""], ["12+ months", "Book photographer & videographer", ""],
    ["10-12 months", "Book caterer, band/DJ, florist", ""], ["10-12 months", "Buy rings & start attire shopping", ""],
    ["8-10 months", "Book transport, hair & makeup, rehearsal venue", ""], ["6-8 months", "Order invitations, book cake tasting", ""],
    ["4-6 months", "Mail save-the-dates", ""], ["3-4 months", "Final attire fittings, vow drafts", ""],
    ["2-3 months", "Mail invitations, book guest transportation", ""], ["1-2 months", "RSVP chase, final headcount, seating chart", ""],
    ["1 month", "Confirm all vendor details & timeline", ""], ["2 weeks", "Marriage license, final fittings", ""],
    ["1 week", "Rehearsal, vendor final check", ""], ["Day before", "Vendor meals, emergency kit", ""], ["Wedding day", "GET MARRIED", ""],
  ];
  cl.forEach((r, i) => {
    const row = 5 + i;
    c.getCell(row, 1).value = r[0]; c.getCell(row, 2).value = r[1];
    c.getCell(row, 3).dataValidation = { type: "list", allowBlank: true, formulae: ['"Done,N/A"'] };
    for (let col = 1; col <= 3; col++) box(c, c.getCell(row, col).address);
  });

  await save(wb, "products/src/wedding-planner-spreadsheet", "Wedding-Planner-Spreadsheet-System.xlsx");
}

// ================= FREELANCE BUSINESS PLANNER =================
async function freelance() {
  const wb = new ExcelJS.Workbook();
  wb.creator = "GPLMart";

  const s = wb.addWorksheet("Start Here");
  s.views = [{ showGridLines: false }];
  title(s, "Freelance Business Planner", "Income, clients, taxes, pipeline and rates - run your freelance business like a business");
  note(s, 4, "TABS");
  [
    ["Income Tracker", "Every payment in: client, project, amount, date, status - with monthly totals."],
    ["Client CRM", "Clients, contacts, projects, lifetime value, last contact date."],
    ["Tax Set-Aside", "Log income - the sheet calculates your quarterly tax set-aside automatically."],
    ["Project Pipeline", "Leads and proposals through stages to paid - your sales funnel."],
    ["Rate Calculator", "Your costs, billable hours and target income - get your minimum hourly rate."],
    ["Goals & Review", "Monthly income goals vs actual, plus a weekly review page.", ],
  ].forEach((r, i) => {
    s.getCell(`A${5 + i}`).value = r[0];
    s.getCell(`B${5 + i}`).value = r[1];
    s.getCell(`A${5 + i}`).font = { bold: true };
    s.getCell(`B${5 + i}`).alignment = { wrapText: true, vertical: "top" };
  });
  s.getColumn("A").width = 20; s.getColumn("B").width = 100;

  // Income
  const inc = wb.addWorksheet("Income Tracker");
  title(inc, "Income Log", "Every payment received - totals by month");
  headerRow(inc, 4, ["Date", "Client", "Project", "Amount $", "Status", "Payment method", "Notes"], [12, 22, 26, 12, 12, 14, 30]);
  dataRows(inc, 5, 200, 7);
  for (let r = 5; r < 205; r++) {
    inc.getCell(r, 4).numFmt = money;
    inc.getCell(r, 5).dataValidation = { type: "list", allowBlank: true, formulae: ['"Paid,Pending,Overdue,Cancelled"'] };
  }
  const it = 206;
  inc.getCell(`A${it}`).value = "TOTALS"; inc.getCell(`A${it}`).font = { bold: true };
  inc.getCell(it, 4).value = { formula: "=SUM(D5:D204)" };
  inc.getCell(it, 4).numFmt = money; inc.getCell(it, 4).font = { bold: true };
  inc.getCell(`F${it}`).value = "By status:"; inc.getCell(`F${it}`).font = { bold: true };
  [["Paid"], ["Pending"], ["Overdue"]].forEach(([lbl], i) => {
    const r = it + 1 + i;
    inc.getCell(`F${r}`).value = lbl;
    inc.getCell(`G${r}`).value = { formula: `=SUMIF(E5:E204,"${lbl}",D5:D204)` };
    inc.getCell(`G${r}`).numFmt = money;
  });
  note(inc, it + 5, "Log income the day it lands, not month-end. The Paid/Pending/Overdue split shows your real cash position.");

  // CRM
  const crm = wb.addWorksheet("Client CRM");
  title(crm, "Client CRM", "Every client relationship - projects, lifetime value, follow-ups");
  headerRow(crm, 4, ["Client", "Contact", "Email", "Projects", "Total billed $", "Last contact", "Next follow-up", "Notes"], [22, 18, 26, 10, 14, 12, 12, 30]);
  for (let r = 5; r < 55; r++) {
    crm.getCell(r, 5).numFmt = money; box(crm, crm.getCell(r, 5).address);
    for (let c = 1; c <= 8; c++) if (c !== 5) box(crm, crm.getCell(r, c).address);
  }
  note(crm, 56, "Total billed = sum of all paid invoices for that client. Review 'Next follow-up' weekly - past-client work is the cheapest pipeline you have.");

  // Tax
  const tx = wb.addWorksheet("Tax Set-Aside");
  title(tx, "Tax Set-Aside Calculator", "Log income - your quarterly tax reserve calculates itself");
  headerRow(tx, 4, ["Date", "Client", "Amount $", "Set-aside $ (30%)"], [12, 26, 14, 18]);
  for (let r = 5; r < 105; r++) {
    tx.getCell(r, 3).numFmt = money; box(tx, tx.getCell(r, 3).address);
    tx.getCell(r, 4).value = { formula: `=C${r}*0.3` };
    tx.getCell(r, 4).numFmt = money; box(tx, tx.getCell(r, 4).address);
    tx.getCell(r, 1).value = ""; tx.getCell(r, 2).value = "";
    box(tx, tx.getCell(r, 1).address); box(tx, tx.getCell(r, 2).address);
  }
  const txt = 106;
  tx.getCell(`A${txt}`).value = "TOTAL SET-ASIDE"; tx.getCell(`A${txt}`).font = { bold: true };
  tx.getCell(`D${txt}`).value = { formula: "=SUM(D5:D104)" };
  tx.getCell(`D${txt}`).numFmt = money; tx.getCell(`D${txt}`).font = { bold: true, color: { argb: ACCENT } };
  tx.getCell(`A${txt + 2}`).value = "Adjust the 30% in column D formulas to your local tax rate - 25-35% covers most freelancers.";
  tx.getCell(`A${txt + 2}`).font = { italic: true, size: 10, color: { argb: "FF555570" } };
  note(tx, txt + 4, "Move this amount to a separate savings account the day you invoice - not the day you get paid. Taxes are not your money.");

  // Pipeline
  const pl = wb.addWorksheet("Project Pipeline");
  title(pl, "Sales Pipeline", "Leads to paid - see where deals stall");
  headerRow(pl, 4, ["Lead / Project", "Source", "Value $", "Stage", "Probability", "Expected $", "Next action", "Date"], [30, 14, 12, 14, 10, 12, 30, 12]);
  dataRows(pl, 5, 60, 8);
  for (let r = 5; r < 65; r++) {
    pl.getCell(r, 3).numFmt = money; pl.getCell(r, 6).value = { formula: `=IF(OR(D${r}="",C${r}=""),"",C${r}*E${r})` };
    pl.getCell(r, 6).numFmt = money;
    pl.getCell(r, 4).dataValidation = { type: "list", allowBlank: true, formulae: ['"Lead,Proposal sent,Negotiation,Won,Lost"'] };
    pl.getCell(r, 5).dataValidation = { type: "list", allowBlank: true, formulae: ['"10%,30%,60%,90%"'] };
  }
  const plt = 66;
  pl.getCell(`A${plt}`).value = "PIPELINE TOTALS"; pl.getCell(`A${plt}`).font = { bold: true };
  pl.getCell(`C${plt}`).value = { formula: "=SUM(C5:C64)" }; pl.getCell(`C${plt}`).numFmt = money;
  pl.getCell(`F${plt}`).value = { formula: "=SUM(F5:F64)" }; pl.getCell(`F${plt}`).numFmt = money; pl.getCell(`F${plt}`).font = { bold: true, color: { argb: ACCENT } };
  note(pl, plt + 2, "Expected $ = value x probability. Your weighted pipeline tells you if next month's income is covered - keep 3x your monthly goal in pipeline.");

  // Rate Calculator
  const rc = wb.addWorksheet("Rate Calculator");
  rc.views = [{ showGridLines: false }];
  title(rc, "Rate Calculator", "What you must charge to hit your income goal");
  const rf = [
    ["Annual income goal (after tax)", 60000, money],
    ["Billable weeks per year", 44, num],
    ["Billable hours per week", 25, num],
    ["Business expenses per month", 500, money],
    ["Vacation/unpaid weeks", 4, num],
  ];
  rf.forEach((f, i) => {
    const r = 4 + i;
    rc.getCell(`A${r}`).value = f[0]; rc.getCell(`A${r}`).font = { bold: true };
    rc.getCell(`B${r}`).value = f[1]; rc.getCell(`B${r}`).numFmt = f[2]; box(rc, `B${r}`);
  });
  const rout = [
    ["Total billable hours/year", { formula: "=B5*B6-B5*B8" }, num],
    ["Income needed after expenses", { formula: "=B4+B7*12" }, money],
    ["Minimum hourly rate", { formula: "=B14/B13" }, money],
    ["Daily rate (8h)", { formula: "=B15*8" }, money],
    ["Project rate example (40h)", { formula: "=B15*40" }, money],
  ];
  rout.forEach((o, i) => {
    const r = 13 + i;
    rc.getCell(`A${r}`).value = o[0]; rc.getCell(`A${r}`).font = { bold: true };
    rc.getCell(`B${r}`).value = o[1]; rc.getCell(`B${r}`).numFmt = o[2];
    if (i >= 2) { rc.getCell(`B${r}`).font = { bold: true, color: { argb: NAVY } }; box(rc, `B${r}`, "FFE8F5EF"); }
  });
  rc.getColumn("A").width = 36; rc.getColumn("B").width = 18;
  note(rc, 19, "Billable hours < work hours - admin, marketing and invoicing aren't billable. If your rate feels high, raise prices or productize - don't just work more hours.");

  // Goals
  const gl = wb.addWorksheet("Goals & Review");
  title(gl, "Monthly Goals & Weekly Review", "Income targets vs actual + the Friday review ritual");
  headerRow(gl, 4, ["Month", "Income goal $", "Actual $", "Gap $", "Clients active", "Notes"], [12, 14, 14, 12, 14, 40]);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  months.forEach((m, i) => {
    const r = 5 + i;
    gl.getCell(r, 1).value = m;
    gl.getCell(r, 2).value = 0; gl.getCell(r, 2).numFmt = money; box(gl, `B${r}`);
    gl.getCell(r, 3).value = 0; gl.getCell(r, 3).numFmt = money; box(gl, `C${r}`);
    gl.getCell(r, 4).value = { formula: `=C${r}-B${r}` }; gl.getCell(r, 4).numFmt = money;
  });
  const gr = 18;
  gl.getCell(`A${gr}`).value = "WEEKLY REVIEW (copy each Friday)"; gl.getCell(`A${gr}`).font = { bold: true, size: 12, color: { argb: ACCENT } };
  const reviewQs = [
    "What did I ship this week? (projects, content, outreach)",
    "What moved the revenue needle? Double down next week.",
    "What drained time? Systemize, delegate or drop it.",
    "Pipeline check: do I have 3x next month's goal in proposals?",
    "Tax set-aside updated? Invoices sent for all completed work?",
    "One relationship to nurture this week (past client, referral, community)?",
  ];
  reviewQs.forEach((q, i) => {
    const r = gr + 2 + i;
    gl.getCell(`A${r}`).value = `Week of __________  -  ${q}`;
    box(gl, `A${r}`);
    gl.getCell(`A${r}`).alignment = { wrapText: true };
  });
  note(gl, gr + 10, "The gap column shows goal minus actual - red means you need pipeline or pricing action, not just more hours.");

  await save(wb, "products/src/freelance-business-planner", "Freelance-Business-Planner.xlsx");
}

// ================= ETSY SELLER PLANNER =================
async function etsy() {
  const wb = new ExcelJS.Workbook();
  wb.creator = "GPLMart";

  const s = wb.addWorksheet("Start Here");
  s.views = [{ showGridLines: false }];
  title(s, "Etsy Seller Business Planner", "Listings, fees, content, reviews and goals - treat your Etsy shop like the business it is");
  note(s, 4, "TABS");
  [
    ["Shop Dashboard", "Revenue, orders, fees and profit at a glance - monthly view."],
    ["Listing Pipeline", "Every listing: status, views, favorites, sales, conversion."],
    ["Content Calendar", "Weekly plan for Pinterest, Instagram and Etsy SEO refreshes."],
    ["Review Tracker", "Every review: rating, date, product, response status."],
    ["Fee & Profit Log", "Per-order math: sale price minus Etsy fees, COGS, ads = real profit."],
    ["Goals", "Monthly revenue/orders/listings goals vs actual."],
  ].forEach((r, i) => {
    s.getCell(`A${5 + i}`).value = r[0];
    s.getCell(`B${5 + i}`).value = r[1];
    s.getCell(`A${5 + i}`).font = { bold: true };
    s.getCell(`B${5 + i}`).alignment = { wrapText: true, vertical: "top" };
  });
  s.getColumn("A").width = 20; s.getColumn("B").width = 100;

  // Dashboard
  const d = wb.addWorksheet("Shop Dashboard");
  title(d, "Monthly Shop Dashboard", "Log each month - profit calculates live");
  headerRow(d, 4, ["Month", "Revenue $", "Orders", "Etsy fees $", "COGS $", "Ads $", "Net profit $", "Margin"], [12, 14, 10, 14, 14, 14, 14, 10]);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  months.forEach((m, i) => {
    const r = 5 + i;
    d.getCell(r, 1).value = m;
    for (let c = 2; c <= 7; c++) {
      d.getCell(r, c).value = 0;
      d.getCell(r, c).numFmt = c === 3 ? num : money;
      box(d, d.getCell(r, c).address);
    }
    d.getCell(r, 8).value = { formula: `=IF(B${r}=0,"",(B${r}-D${r}-E${r}-F${r})/B${r})` };
    d.getCell(r, 8).numFmt = pct;
  });
  const dt = 18;
  d.getCell(`A${dt}`).value = "YEAR TOTAL"; d.getCell(`A${dt}`).font = { bold: true };
  for (const L of ["B","C","D","E","F","G"]) {
    d.getCell(dt, L.charCodeAt(0) - 64).value = { formula: `=SUM(${L}5:${L}16)` };
    d.getCell(dt, L.charCodeAt(0) - 64).numFmt = L === "C" ? num : money;
    d.getCell(dt, L.charCodeAt(0) - 64).font = { bold: true };
  }
  d.getCell(`H${dt}`).value = { formula: `=IF(B${dt}=0,"",(B${dt}-D${dt}-E${dt}-F${dt})/B${dt})` };
  d.getCell(`H${dt}`).numFmt = pct; d.getCell(`H${dt}`).font = { bold: true, color: { argb: ACCENT } };
  note(d, dt + 2, "Fees column = Etsy transaction + payment + any offsite ads for the month. Pull numbers from Etsy Stats > Monthly. Net profit is what actually matters - revenue is vanity.");

  // Listing Pipeline
  const l = wb.addWorksheet("Listing Pipeline");
  title(l, "Listing Tracker", "Every listing's performance - double down on winners");
  headerRow(l, 4, ["Listing", "Type", "Status", "Views", "Favorites", "Sales", "Conv. rate", "Revenue $", "Notes"], [32, 14, 12, 10, 10, 8, 10, 12, 30]);
  dataRows(l, 5, 100, 9);
  for (let r = 5; r < 105; r++) {
    l.getCell(r, 7).value = { formula: `=IF(OR(F${r}="",D${r}="",D${r}=0),"",F${r}/D${r})` };
    l.getCell(r, 7).numFmt = pct;
    l.getCell(r, 8).numFmt = money;
    l.getCell(r, 3).dataValidation = { type: "list", allowBlank: true, formulae: ['"Active,Draft,Paused,Seasonal"'] };
  }
  note(l, 106, "Conversion rate = sales / views. Etsy average ~1-2%; over 3% is excellent, under 0.5% means fix photos/keywords/price before adding more listings.");

  // Content Calendar
  const cc = wb.addWorksheet("Content Calendar");
  title(cc, "Content & Marketing Calendar", "Weekly plan: Pinterest pins, Instagram posts, Etsy SEO refreshes");
  headerRow(cc, 4, ["Week of", "Pinterest pins", "Instagram posts", "Etsy SEO task", "Email/newsletter", "Done?"], [12, 14, 14, 40, 30, 8]);
  for (let i = 0; i < 12; i++) {
    const r = 5 + i;
    cc.getCell(r, 1).value = `Week ${i + 1}`;
    for (let c = 2; c <= 6; c++) box(cc, cc.getCell(r, c).address);
    cc.getCell(r, 6).dataValidation = { type: "list", allowBlank: true, formulae: ['"Done,N/A"'] };
  }
  const cr = 18;
  cc.getCell(`A${cr}`).value = "Etsy SEO refresh checklist (do monthly)"; cc.getCell(`A${cr}`).font = { bold: true, size: 12, color: { argb: ACCENT } };
  [
    "Update top 10 listings' titles with current search terms",
    "Refresh first photo on all listings (mobile preview is everything)",
    "Add/refresh tags on seasonal items 6 weeks before the season",
    "Pin every new listing to a relevant Pinterest board same day",
    "Reply to every review (yes, even 5-star) within 48h",
    "Check Etsy search analytics: which keywords actually bring views",
  ].forEach((q, i) => {
    const r = cr + 2 + i;
    cc.getCell(`A${r}`).value = q; box(cc, `A${r}`); cc.getCell(`A${r}`).alignment = { wrapText: true };
  });
  note(cc, cr + 10, "Consistency beats intensity: 3 pins + 2 posts weekly for 12 weeks outperforms a launch-week sprint that dies in February.");

  // Reviews
  const rv = wb.addWorksheet("Review Tracker");
  title(rv, "Review Tracker", "Every review logged - spot problems early, thank fans publicly");
  headerRow(rv, 4, ["Date", "Product", "Stars", "Reviewer", "Responded?", "Issue?", "Action taken"], [12, 28, 8, 20, 12, 12, 36]);
  dataRows(rv, 5, 150, 7);
  for (let r = 5; r < 155; r++) {
    rv.getCell(r, 3).numFmt = '0" stars"';
    rv.getCell(r, 5).dataValidation = { type: "list", allowBlank: true, formulae: ['"Yes,No,N/A"'] };
    rv.getCell(r, 6).dataValidation = { type: "list", allowBlank: true, formulae: ['"No,Listing fix,Customer service,Product quality"'] };
  }
  const rvt = 156;
  rv.getCell(`A${rvt}`).value = "STATS"; rv.getCell(`A${rvt}`).font = { bold: true };
  rv.getCell(`A${rvt + 1}`).value = "Total reviews"; rv.getCell(`B${rvt + 1}`).value = { formula: '=COUNTA(A5:A154)' };
  rv.getCell(`A${rvt + 2}`).value = "5-star"; rv.getCell(`B${rvt + 2}`).value = { formula: '=COUNTIF(C5:C154,5)' };
  rv.getCell(`A${rvt + 3}`).value = "Under 4"; rv.getCell(`B${rvt + 3}`).value = { formula: '=COUNTIF(C5:C154,"<4")' };
  note(rv, rvt + 5, "Any review under 4 stars = product or expectation problem. Fix the root cause, not just the listing - Etsy's algorithm rewards shops that resolve issues.");

  // Goals
  const gl = wb.addWorksheet("Goals");
  title(gl, "Monthly Goals", "Revenue, orders and new listings - goal vs actual");
  headerRow(gl, 4, ["Month", "Revenue goal $", "Actual $", "Gap $", "Orders goal", "Orders", "New listings", "Notes"], [12, 14, 14, 12, 12, 10, 12, 34]);
  months.forEach((m, i) => {
    const r = 5 + i;
    gl.getCell(r, 1).value = m;
    for (let c = 2; c <= 7; c++) {
      gl.getCell(r, c).value = 0;
      gl.getCell(r, c).numFmt = c === 5 || c === 6 ? num : money;
      box(gl, gl.getCell(r, c).address);
    }
    gl.getCell(r, 4).value = { formula: `=C${r}-B${r}` }; gl.getCell(r, 4).numFmt = money;
  });
  note(gl, 18, "Set revenue goals 20% above what feels safe - Etsy shop growth is seasonal (Q4 is massive). Track new listings monthly; shops adding 4+ quality listings/month grow fastest.");

  await save(wb, "products/src/etsy-seller-business-planner", "Etsy-Seller-Business-Planner.xlsx");
}

await wedding();
await freelance();
await etsy();
