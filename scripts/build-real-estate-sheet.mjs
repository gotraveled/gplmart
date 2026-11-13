// Builds the Real Estate Agent Toolkit workbook (.xlsx) with live formulas.
// Usage: node scripts/build-real-estate-sheet.mjs
import fs from "node:fs";
import path from "node:path";
import ExcelJS from "exceljs";

const NAVY = "FF1A1A2E";
const ACCENT = "FF0E9F6E";
const LIGHT = "FFF4F4F8";
const money = '"$"#,##0';
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
function box(ws, addr, fill = LIGHT) {
  ws.getCell(addr).fill = { type: "pattern", pattern: "solid", fgColor: { argb: fill } };
}
function headerRow(ws, r, heads, widths) {
  heads.forEach((h, i) => (ws.getCell(r, i + 1).value = h));
  styleHeader(ws, r, widths);
  ws.views = [{ state: "frozen", ySplit: r }];
}
async function save(wb, dir, file) {
  fs.mkdirSync(dir, { recursive: true });
  const p = path.join(dir, file);
  await wb.xlsx.writeFile(p);
  console.log("built", p);
}

const wb = new ExcelJS.Workbook();
wb.creator = "GPLMart";

// ---- Start Here ----
const s = wb.addWorksheet("Start Here");
s.views = [{ showGridLines: false }];
title(s, "Real Estate Agent Business Toolkit", "CMA pricing, commission math, lead pipeline and open house tracking - the agent's numbers in one place");
note(s, 4, "TABS");
[
  ["CMA Calculator", "Subject property + up to 5 comps - $/sqft analysis and suggested list price range, calculated live."],
  ["Commission Calculator", "List price to net commission: splits, referral fees, marketing costs - know your real check."],
  ["Lead Tracker", "Every lead: source, stage, value, last contact, next follow-up - the 5-3-1 cadence built in."],
  ["Open House Log", "Every open house: sign-ins, leads captured, appointments set."],
  ["Goals", "Monthly listings/sales/appraisal goals vs actual."],
].forEach((r, i) => {
  s.getCell(`A${5 + i}`).value = r[0];
  s.getCell(`B${5 + i}`).value = r[1];
  s.getCell(`A${5 + i}`).font = { bold: true };
  s.getCell(`B${5 + i}`).alignment = { wrapText: true, vertical: "top" };
});
s.getColumn("A").width = 20; s.getColumn("B").width = 100;

// ---- CMA Calculator ----
const c = wb.addWorksheet("CMA Calculator");
c.views = [{ showGridLines: false }];
title(c, "Comparative Market Analysis", "Enter the subject property and up to 5 comps - suggested list price calculates itself");
c.getCell("A4").value = "SUBJECT PROPERTY"; c.getCell("A4").font = { bold: true, size: 12, color: { argb: ACCENT } };
const subj = [
  ["Address", "", "text"],
  ["Beds", 3, num], ["Baths", 2, num], ["Sqft", 1800, num],
  ["Condition (1-10)", 7, num], ["Lot size (sqft)", 6000, num],
];
subj.forEach((f, i) => {
  const r = 5 + i;
  c.getCell(`A${r}`).value = f[0]; c.getCell(`A${r}`).font = { bold: true };
  if (f[2] !== "text") { c.getCell(`B${r}`).value = f[1]; c.getCell(`B${r}`).numFmt = f[2]; box(c, `B${r}`); }
  else { c.getCell(`B${r}`).value = ""; box(c, `B${r}`); }
});
c.getCell("A12").value = "COMPARABLE SALES (most recent first)"; c.getCell("A12").font = { bold: true, size: 12, color: { argb: ACCENT } };
headerRow(c, 13, ["Address", "Sold price $", "Sqft", "Beds", "Baths", "Sold date", "$/sqft", "Est. value $"], [30, 14, 10, 8, 8, 12, 10, 14]);
for (let i = 0; i < 5; i++) {
  const r = 14 + i;
  c.getCell(r, 7).value = { formula: `=IF(OR(B${r}="",C${r}="",C${r}=0),"",B${r}/C${r})` };
  c.getCell(r, 7).numFmt = money;
  c.getCell(r, 8).value = { formula: `=IF(G${r}="","",G${r}*$B$8)` };
  c.getCell(r, 8).numFmt = money;
  for (let col = 1; col <= 8; col++) box(c, c.getCell(r, col).address);
}
c.getCell("A20").value = "ANALYSIS"; c.getCell("A20").font = { bold: true, size: 12, color: { argb: ACCENT } };
const outs = [
  ["Avg comp $/sqft", { formula: "=AVERAGE(G14:G18)" }, money],
  ["Median comp $/sqft", { formula: "=MEDIAN(G14:G18)" }, money],
  ["Est. value (avg $/sqft)", { formula: "=B21*B8" }, money],
  ["Est. value (median $/sqft)", { formula: "=B22*B8" }, money],
  ["Suggested list price (low)", { formula: "=MIN(B23,B24)*0.97" }, money],
  ["Suggested list price (high)", { formula: "=MAX(B23,B24)*1.02" }, money],
];
outs.forEach((o, i) => {
  const r = 21 + i;
  c.getCell(`A${r}`).value = o[0]; c.getCell(`A${r}`).font = { bold: true };
  c.getCell(`B${r}`).value = o[1]; c.getCell(`B${r}`).numFmt = o[2];
  if (i >= 4) { c.getCell(`B${r}`).font = { bold: true, color: { argb: NAVY } }; box(c, `B${r}`, "FFE8F5EF"); }
});
c.getColumn("A").width = 30;
note(c, 29, "Subject fields: B8=Sqft is used in formulas. $/sqft adjusts for size differences - a comp with higher $/sqft than subject suggests premium finishes/location. List price range assumes 3-5% negotiation room.");

// ---- Commission Calculator ----
const cm = wb.addWorksheet("Commission Calculator");
cm.views = [{ showGridLines: false }];
title(cm, "Commission & Net Calculator", "From list price to your actual check - every deduction shown");
const cf = [
  ["List price ($)", 450000, money],
  ["Commission rate (%)", 0.03, pct],
  ["Your split (%)", 0.8, pct],
  ["Referral fee (% of GCI)", 0.25, pct],
  ["Marketing costs ($)", 1500, money],
  ["Transaction/broker fees ($)", 500, money],
  ["Expected sale price ($)", 440000, money],
];
cf.forEach((f, i) => {
  const r = 4 + i;
  cm.getCell(`A${r}`).value = f[0]; cm.getCell(`A${r}`).font = { bold: true };
  cm.getCell(`B${r}`).value = f[1]; cm.getCell(`B${r}`).numFmt = f[2]; box(cm, `B${r}`);
});
const cout = [
  ["Gross commission income (GCI)", { formula: "=B10*B5" }, money],
  ["Referral fee", { formula: "=B11*B6" }, money],
  ["After referral", { formula: "=B11-B12" }, money],
  ["Your split share", { formula: "=B13*B6" }, money],
  ["After split", { formula: "=B14-B15" }, money],
  ["Less marketing + transaction", { formula: "=B16-B7-B8" }, money],
  ["NET COMMISSION", { formula: "=B16-B7-B8" }, money],
  ["Effective rate on sale price", { formula: "=B17/B10" }, pct],
];
cout.forEach((o, i) => {
  const r = 10 + i;
  cm.getCell(`A${r}`).value = o[0]; cm.getCell(`A${r}`).font = { bold: true };
  cm.getCell(`B${r}`).value = o[1]; cm.getCell(`B${r}`).numFmt = o[2];
  if (i === 6 || i === 7) { cm.getCell(`B${r}`).font = { bold: true, color: { argb: i === 6 ? NAVY : "FF555570" } }; box(cm, `B${r}`, "FFE8F5EF"); }
});
cm.getColumn("A").width = 34; cm.getColumn("B").width = 18;
note(cm, 19, "Most agents quote the gross commission - this shows the real number. At 3% on $450k with an 80/20 split and referral, net is roughly half the headline figure.");

// ---- Lead Tracker ----
const l = wb.addWorksheet("Lead Tracker");
title(l, "Lead Pipeline", "Every lead through the 5-3-1 follow-up cadence - nothing falls through");
headerRow(l, 4, ["Name", "Source", "Stage", "Value $", "Last contact", "Next follow-up", "Notes"], [22, 14, 16, 12, 12, 14, 34]);
const stages = ["New", "Contacted", "Qualified", "Showing", "Offer", "Under contract", "Closed", "Dead"];
for (let r = 5; r < 105; r++) {
  l.getCell(r, 4).numFmt = money; box(l, l.getCell(r, 4).address);
  for (let c = 1; c <= 7; c++) if (c !== 4) box(l, l.getCell(r, c).address);
  l.getCell(r, 3).dataValidation = { type: "list", allowBlank: true, formulae: [`"${stages.join(",")}"`] };
}
note(l, 106, "5-3-1 cadence: 5 touches in week 1, 3 in week 2, 1 weekly after. Update 'Next follow-up' every time you contact - sort by it daily.");

// ---- Open House Log ----
const oh = wb.addWorksheet("Open House Log");
title(oh, "Open House Log", "Sign-ins, leads and appointments per open house - measure what works");
headerRow(oh, 4, ["Date", "Property address", "Sign-ins", "New leads", "Appointments set", "Offers received", "Notes"], [12, 30, 10, 10, 14, 14, 34]);
for (let r = 5; r < 45; r++) {
  for (let c = 1; c <= 7; c++) box(oh, oh.getCell(r, c).address);
  oh.getCell(r, 3).numFmt = num; oh.getCell(r, 4).numFmt = num; oh.getCell(r, 5).numFmt = num; oh.getCell(r, 6).numFmt = num;
}
const oht = 46;
oh.getCell(`A${oht}`).value = "TOTALS"; oh.getCell(`A${oht}`).font = { bold: true };
for (const col of ["C", "D", "E", "F"]) {
  oh.getCell(oht, col.charCodeAt(0) - 64).value = { formula: `=SUM(${col}5:${col}44)` };
  oh.getCell(oht, col.charCodeAt(0) - 64).numFmt = num;
  oh.getCell(oht, col.charCodeAt(0) - 64).font = { bold: true };
}
note(oh, oht + 2, "Benchmark: a good open house converts 10-20% of sign-ins to leads and 2-5% to appointments. Below that, fix the pricing, staging or signage - not the effort.");

// ---- Goals ----
const g = wb.addWorksheet("Goals");
title(g, "Monthly Goals", "Listings, sales and appraisals - goal vs actual");
headerRow(g, 4, ["Month", "Listings goal", "Listings", "Sales goal", "Sales", "Appraisals", "Gap $ (sales)", "Notes"], [12, 12, 10, 12, 10, 10, 12, 34]);
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
months.forEach((m, i) => {
  const r = 5 + i;
  g.getCell(r, 1).value = m;
  for (let c = 2; c <= 7; c++) {
    g.getCell(r, c).value = 0;
    g.getCell(r, c).numFmt = c === 7 ? money : num;
    box(g, g.getCell(r, c).address);
  }
});
note(g, 18, "Review monthly. If listings are behind, prospect expired/FSBO - if sales are behind, it's a lead-generation problem, not a pricing problem.");

await save(wb, "products/src/real-estate-agent-toolkit", "Real-Estate-Agent-Toolkit.xlsx");
