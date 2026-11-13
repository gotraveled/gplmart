// Builds the GPLMart spreadsheet products (.xlsx) with live formulas.
// Usage: node scripts/build-toolkit-sheets.mjs
import fs from "node:fs";
import path from "node:path";
import ExcelJS from "exceljs";

const NAVY = "FF1A1A2E";
const ACCENT = "FF0E9F6E";
const MINT = "FF34D399";
const LIGHT = "FFF4F4F8";
const BORDER = "FFD8D8E0";

function styleHeader(ws, rowNum, cols) {
  const row = ws.getRow(rowNum);
  row.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
  row.fill = { type: "pattern", pattern: "solid", fgColor: { argb: NAVY } };
  row.alignment = { vertical: "middle" };
  row.eachCell((cell) => {
    cell.border = { bottom: { style: "medium", color: { argb: ACCENT } } };
  });
  cols.forEach((c, i) => {
    ws.getColumn(i + 1).width = c;
  });
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

function box(ws, cell, fill = LIGHT) {
  ws.getCell(cell).fill = { type: "pattern", pattern: "solid", fgColor: { argb: fill } };
}

// ---------- helpers for currency ----------
const money = '"$"#,##0.00';
const pct = '0.0%';
const num = '#,##0';

async function buildPricingSystem() {
  const wb = new ExcelJS.Workbook();
  wb.creator = "GPLMart";
  wb.created = new Date();

  // --- Start Here ---
  const s = wb.addWorksheet("Start Here");
  s.views = [{ showGridLines: false }];
  title(s, "Ecommerce Profit & Pricing System", "GPLMart - know your real margins before you spend a rupee on ads");
  note(s, 4, "HOW TO USE THIS WORKBOOK");
  const guide = [
    ["1.", "Product Costs", "List every product: what it costs you, what shipping costs, platform fees, ad cost per sale."],
    ["2.", "Pricing Calculator", "Enter one product's numbers - get break-even price and suggested price at your target margin."],
    ["3.", "P&L Dashboard", "Log monthly totals - watch gross and net margin update live."],
    ["", "", "Yellow cells = you type here. Everything else calculates automatically."],
    ["", "", "Tip: price for profit, not for the market. If break-even is above market price, the product needs a bundle, a cost cut, or a different angle."],
  ];
  guide.forEach((r, i) => {
    s.getCell(`A${5 + i}`).value = r[0];
    s.getCell(`B${5 + i}`).value = r[1];
    s.getCell(`C${5 + i}`).value = r[2];
    s.getCell(`B${5 + i}`).font = { bold: true };
    s.getCell(`C${5 + i}`).alignment = { wrapText: true, vertical: "top" };
  });
  s.getColumn("A").width = 6;
  s.getColumn("B").width = 20;
  s.getColumn("C").width = 90;

  // --- Product Costs ---
  const c = wb.addWorksheet("Product Costs");
  c.views = [{ state: "frozen", ySplit: 4 }];
  title(c, "Product Cost Sheet", "One row per product - update costs whenever supplier prices change");
  const cols = [6, 26, 14, 14, 14, 12, 14, 16, 14, 16];
  const headers = ["#", "Product", "Material $", "Ship/unit $", "Platform fee %", "Payment fee %", "Ad cost/sale $", "Landed cost $", "Break-even price $", "Target margin price $"];
  headers.forEach((h, i) => (c.getCell(4, i + 1).value = h));
  styleHeader(c, 4, cols);
  const sample = [
    ["Ceramic pour-over set", 8.5, 4.2, 0.065, 0.03, 6.0],
    ["Linen apron (handmade look)", 5.0, 3.8, 0.065, 0.03, 4.5],
    ["Beeswax candle trio", 3.2, 3.5, 0.065, 0.03, 3.0],
  ];
  sample.forEach((r, i) => {
    const row = i + 5;
    c.getCell(row, 1).value = i + 1;
    c.getCell(row, 2).value = r[0];
    [3, 4, 5, 6, 7].forEach((col, j) => (c.getCell(row, col).value = r[j + 1]));
    c.getCell(row, 5).numFmt = pct;
    c.getCell(row, 6).numFmt = pct;
    // landed cost = material + ship + platform%*price? platform fee is % of sale -> approximate on price; use fixed estimate column formula:
    c.getCell(row, 8).value = { formula: `=C${row}+D${row}` };
    c.getCell(row, 9).value = { formula: `=H${row}/(1-E${row}-F${row})` };
    c.getCell(row, 10).value = { formula: `=G${row}*2+H${row}` };
    c.getCell(row, 8).numFmt = money;
    c.getCell(row, 9).numFmt = money;
    c.getCell(row, 10).numFmt = money;
    [3, 4, 7].forEach((col) => box(c, `${String.fromCharCode(64 + col)}${row}`));
  });
  note(c, 9, "Platform fee & payment fee % are of the SALE price. Landed cost = material + shipping. Break-even = landed cost / (1 - fees). Target price = 2x ad cost + landed cost - adjust to your margin goal.");
  [3, 4, 7].forEach((col) => {
    const letter = String.fromCharCode(64 + col);
    for (let r = 5; r <= 30; r++) box(c, `${letter}${r}`);
  });

  // --- Pricing Calculator ---
  const p = wb.addWorksheet("Pricing Calculator");
  p.views = [{ showGridLines: false }];
  title(p, "Pricing Calculator", "Enter one product - get break-even and suggested price instantly");
  const fields = [
    ["Product name", "", "text"],
    ["Material / COGS cost ($)", 8.5, money],
    ["Shipping cost per unit ($)", 4.2, money],
    ["Platform fee (% of sale)", 0.065, pct],
    ["Payment processing fee (% of sale)", 0.03, pct],
    ["Ad cost per sale ($)", 6.0, money],
    ["Target gross margin (%)", 0.5, pct],
    ["Competitor / market price ($)", 29.99, money],
  ];
  fields.forEach((f, i) => {
    const r = 4 + i;
    p.getCell(`A${r}`).value = f[0];
    p.getCell(`A${r}`).font = { bold: true };
    if (f[2] !== "text") {
      p.getCell(`B${r}`).value = f[1];
      p.getCell(`B${r}`).numFmt = f[2];
      box(p, `B${r}`);
    } else {
      p.getCell(`B${r}`).value = "My hero product";
    }
  });
  const outStart = 14;
  const outputs = [
    ["Landed cost per unit", { formula: "=B5+B6" }, money],
    ["Break-even price (0 profit)", { formula: "=B14/(1-B7-B8)" }, money],
    ["Price at target margin", { formula: "=B14*(1+B10)/(1-B7-B8)" }, money],
    ["Price covering ads + target margin", { formula: "=(B14+B9)*(1+B10)/(1-B7-B8)" }, money],
    ["Profit per unit at market price", { formula: "=B11*(1-B7-B8)-B14-B9" }, money],
    ["Margin at market price", { formula: "=(B11-B14-B9)/B11" }, pct],
  ];
  p.getCell(`A${outStart - 1}`).value = "RESULTS";
  p.getCell(`A${outStart - 1}`).font = { bold: true, size: 12, color: { argb: ACCENT } };
  outputs.forEach((o, i) => {
    const r = outStart + i;
    p.getCell(`A${r}`).value = o[0];
    p.getCell(`B${r}`).value = o[1];
    p.getCell(`B${r}`).numFmt = o[2];
    p.getCell(`B${r}`).font = { bold: true, color: { argb: NAVY } };
    box(p, `B${r}`, "FFE8F5EF");
  });
  p.getColumn("A").width = 38;
  p.getColumn("B").width = 18;
  note(p, outStart + outputs.length + 1, "Break-even: the minimum price that covers costs + fees. Target margin price: price that hits your margin goal. Ads-covered price: also recovers your ad spend per sale. Compare all three to your market price.");

  // --- P&L Dashboard ---
  const d = wb.addWorksheet("P&L Dashboard");
  d.views = [{ state: "frozen", ySplit: 4 }];
  title(d, "Monthly P&L", "Log each month - margins calculate live");
  const dcols = [14, 14, 14, 14, 14, 14, 14, 14];
  const dhead = ["Month", "Revenue $", "Orders", "AOV $", "Product costs $", "Shipping $", "Fees $", "Ad spend $"];
  dhead.forEach((h, i) => (d.getCell(4, i + 1).value = h));
  styleHeader(d, 4, dcols);
  for (let i = 0; i < 12; i++) {
    const r = 5 + i;
    d.getCell(r, 1).value = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i];
    for (let col = 2; col <= 8; col++) {
      const cell = d.getCell(r, col);
      cell.value = 0;
      cell.numFmt = col === 3 ? num : money;
      box(d, cell.address);
    }
  }
  const tr = 18;
  d.getCell(`A${tr}`).value = "TOTAL";
  d.getCell(`A${tr}`).font = { bold: true };
  for (let col = 2; col <= 8; col++) {
    const L = String.fromCharCode(64 + col);
    d.getCell(tr, col).value = { formula: `=SUM(${L}5:${L}16)` };
    d.getCell(tr, col).numFmt = col === 3 ? num : money;
    d.getCell(tr, col).font = { bold: true };
  }
  const mr = 20;
  const metrics = [
    ["Gross profit", { formula: "=B18-E18-F18" }, money],
    ["Net profit (after ads)", { formula: "=B18-E18-F18-H18" }, money],
    ["Gross margin", { formula: "=(B18-E18-F18)/B18" }, pct],
    ["Net margin", { formula: "=(B18-E18-F18-H18)/B18" }, pct],
    ["Orders", { formula: "=C18" }, num],
  ];
  d.getCell(`A${mr - 1}`).value = "MARGINS";
  d.getCell(`A${mr - 1}`).font = { bold: true, size: 12, color: { argb: ACCENT } };
  metrics.forEach((m, i) => {
    const r = mr + i;
    d.getCell(`A${r}`).value = m[0];
    d.getCell(`A${r}`).font = { bold: true };
    d.getCell(`B${r}`).value = m[1];
    d.getCell(`B${r}`).numFmt = m[2];
    d.getCell(`B${r}`).font = { bold: true, color: { argb: NAVY } };
    box(d, `B${r}`, "FFE8F5EF");
  });
  note(d, mr + metrics.length + 1, "Fees column = platform + payment fees on revenue (estimate ~9.5% - adjust). Product costs & shipping = your actual spend. Ad spend = total ads for the month.");

  const dir = "products/src/ecom-profit-pricing-system";
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, "Ecommerce-Profit-Pricing-System.xlsx");
  await wb.xlsx.writeFile(file);
  console.log("built", file);
}

async function buildEtsyToolkit() {
  const wb = new ExcelJS.Workbook();
  wb.creator = "GPLMart";
  wb.created = new Date();

  const s = wb.addWorksheet("Start Here");
  s.views = [{ showGridLines: false }];
  title(s, "Etsy & Dropshipping Business Toolkit", "GPLMart - every number your shop runs on, in one workbook");
  note(s, 4, "TABS");
  [
    ["Etsy Fee Calculator", "Price any item - see Etsy's real cut (6.5% transaction + ~3% payment + optional 12% offsite ads) and your true profit."],
    ["Profit Tracker", "Log every sale - revenue, COGS, fees, ads, profit - with running totals."],
    ["Order Log", "Every order in one place: date, item, qty, price, status, tracking."],
    ["Listing Tracker", "Track views, favorites, sales and conversion rate per listing - kill losers, scale winners."],
    ["", "", "Yellow cells = you type here. Everything else calculates automatically."],
  ].forEach((r, i) => {
    s.getCell(`A${5 + i}`).value = r[0];
    s.getCell(`B${5 + i}`).value = r[1];
    s.getCell(`A${5 + i}`).font = { bold: true };
    s.getCell(`B${5 + i}`).alignment = { wrapText: true, vertical: "top" };
  });
  s.getColumn("A").width = 24;
  s.getColumn("B").width = 100;

  // --- Etsy Fee Calculator ---
  const f = wb.addWorksheet("Etsy Fee Calculator");
  f.views = [{ showGridLines: false }];
  title(f, "Etsy Fee & Profit Calculator", "Enter your numbers - see exactly what Etsy takes");
  const ffields = [
    ["Item price ($)", 15.0, money],
    ["Quantity", 1, num],
    ["Shipping charged to buyer ($)", 4.99, money],
    ["Your shipping cost ($)", 4.5, money],
    ["Material / COGS cost ($)", 3.0, money],
    ["Etsy transaction fee (6.5%)", 0.065, pct],
    ["Payment processing fee (~3% + $0.25)", 0.03, pct],
    ["Offsite Ads fee (12% if applicable)", 0, pct],
    ["Ad spend per sale ($)", 0, money],
  ];
  ffields.forEach((fd, i) => {
    const r = 4 + i;
    f.getCell(`A${r}`).value = fd[0];
    f.getCell(`A${r}`).font = { bold: true };
    f.getCell(`B${r}`).value = fd[1];
    f.getCell(`B${r}`).numFmt = fd[2];
    box(f, `B${r}`);
  });
  // revenue per sale = (price + shipping charged) * qty
  f.getCell("A14").value = "Gross revenue per sale";
  f.getCell("B14").value = { formula: "=(B4+B6)*B5" };
  f.getCell("B14").numFmt = money;
  f.getCell("A14").font = { bold: true };
  const fouts = [
    ["Etsy transaction fee", { formula: "=(B4+B6)*B5*B9" }, money],
    ["Payment processing fee", { formula: "=(B14)*B10+0.25*B5" }, money],
    ["Offsite ads fee", { formula: "=(B4+B6)*B5*B11" }, money],
    ["Total Etsy + payment fees", { formula: "=B15+B16+B17" }, money],
    ["COGS + shipping cost", { formula: "=(B7+B8)*B5" }, money],
    ["Ad spend", { formula: "=B12*B5" }, money],
    ["Net profit per sale", { formula: "=B14-B18-B19-B20" }, money],
    ["Net margin", { formula: "=B21/B14" }, pct],
    ["Break-even item price", { formula: "=((B7+B8)*B5+B12*B5+B5*0.25)/(B5*(1-B9-B10-B11))" }, money],
  ];
  fouts.forEach((o, i) => {
    const r = 15 + i;
    f.getCell(`A${r}`).value = o[0];
    f.getCell(`B${r}`).value = o[1];
    f.getCell(`B${r}`).numFmt = o[2];
    if ([6, 7, 8].includes(i)) {
      f.getCell(`B${r}`).font = { bold: true, color: { argb: NAVY } };
      box(f, `B${r}`, "FFE8F5EF");
    }
  });
  f.getColumn("A").width = 38;
  f.getColumn("B").width = 18;
  note(f, 25, "Etsy fees as of 2026: 6.5% transaction + payment processing (~3% + $0.25) + optional 12% Offsite Ads (15% for shops over $10k/yr). Adjust B9-B12 if Etsy changes rates.");

  // --- Profit Tracker ---
  const t = wb.addWorksheet("Profit Tracker");
  t.views = [{ state: "frozen", ySplit: 4 }];
  title(t, "Sales & Profit Log", "One row per sale - totals update live");
  const tcols = [12, 22, 8, 10, 10, 10, 10, 10, 12];
  const thead = ["Date", "Product", "Qty", "Revenue $", "COGS $", "Etsy+pay fees $", "Ads $", "Shipping cost $", "Profit $"];
  thead.forEach((h, i) => (t.getCell(4, i + 1).value = h));
  styleHeader(t, 4, tcols);
  for (let i = 0; i < 100; i++) {
    const r = 5 + i;
    for (let col = 1; col <= 9; col++) {
      const cell = t.getCell(r, col);
      if (col === 1) cell.value = "";
      else if (col === 2) cell.value = "";
      else if (col === 9) cell.value = { formula: `=D${r}-E${r}-F${r}-G${r}-H${r}` };
      else cell.value = 0;
      if (col >= 3) cell.numFmt = col === 3 ? num : money;
      if (col >= 3) box(t, cell.address);
    }
  }
  const ttot = 106;
  t.getCell(`A${ttot}`).value = "TOTALS";
  t.getCell(`A${ttot}`).font = { bold: true };
  ["D", "E", "F", "G", "H", "I"].forEach((L) => {
    t.getCell(ttot, L.charCodeAt(0) - 64).value = { formula: `=SUM(${L}5:${L}104)` };
    t.getCell(ttot, L.charCodeAt(0) - 64).numFmt = money;
    t.getCell(ttot, L.charCodeAt(0) - 64).font = { bold: true };
  });
  t.getCell(ttot + 2, 1).value = "Avg profit per order";
  t.getCell(ttot + 2, 2).value = { formula: `=IF(COUNT(D5:D104)=0,0,I${ttot}/COUNT(D5:D104))` };
  t.getCell(ttot + 2, 2).numFmt = money;
  note(t, ttot + 4, "Fees column = Etsy + payment fees on that sale (use the Fee Calculator to price it). Log ad spend honestly - it's the difference between revenue and profit.");

  // --- Order Log ---
  const o = wb.addWorksheet("Order Log");
  o.views = [{ state: "frozen", ySplit: 4 }];
  title(o, "Order Log", "Every order, one row - never lose track of a customer");
  const ocols = [12, 10, 20, 8, 10, 12, 14, 14];
  const ohead = ["Date", "Order #", "Item", "Qty", "Price $", "Buyer", "Status", "Tracking #"];
  ohead.forEach((h, i) => (o.getCell(4, i + 1).value = h));
  styleHeader(o, 4, ocols);
  const statuses = ["Paid", "Shipped", "Delivered", "Refunded", "Issue"];
  for (let i = 0; i < 100; i++) {
    const r = 5 + i;
    o.getCell(r, 7).value = { formula: `=IF(H${r}="","",IF(I${r}="","Paid",""))` };
    o.getCell(r, 7).value = "";
    for (let col = 1; col <= 8; col++) {
      const cell = o.getCell(r, col);
      if (col === 5) cell.numFmt = money;
      if (col >= 1 && col <= 6) box(o, cell.address);
    }
    // data validation dropdown for status
    o.getCell(r, 7).dataValidation = { type: "list", allowBlank: true, formulae: [`"${statuses.join(",")}"`] };
  }
  note(o, 106, "Status column: pick from the dropdown. Add a data filter (Data > Filter) to sort by status or date.");

  // --- Listing Tracker ---
  const l = wb.addWorksheet("Listing Tracker");
  l.views = [{ state: "frozen", ySplit: 4 }];
  title(l, "Listing Performance", "Views, favorites, sales and conversion rate per listing - weekly check");
  const lcols = [26, 10, 10, 10, 12, 14, 14];
  const lhead = ["Listing", "Views", "Favorites", "Sales", "Conv. rate", "Revenue $", "Profit $"];
  lhead.forEach((h, i) => (l.getCell(4, i + 1).value = h));
  styleHeader(l, 4, lcols);
  for (let i = 0; i < 50; i++) {
    const r = 5 + i;
    l.getCell(r, 1).value = "";
    for (let col = 2; col <= 7; col++) {
      const cell = l.getCell(r, col);
      cell.value = col >= 6 ? { formula: col === 6 ? `=D${r}*12` : `=D${r}*5` } : 0;
      cell.numFmt = col === 5 ? pct : col >= 2 && col <= 4 ? num : money;
      box(l, cell.address);
    }
  }
  note(l, 56, "Conv. rate = sales / views. Under 1% on Etsy usually means weak photos or wrong keywords; over 3% is strong. Revenue/Profit are estimates - update the formulas to your real price/cost.");

  const dir = "products/src/etsy-dropshipping-business-toolkit";
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, "Etsy-Dropshipping-Business-Toolkit.xlsx");
  await wb.xlsx.writeFile(file);
  console.log("built", file);
}

await buildPricingSystem();
await buildEtsyToolkit();
