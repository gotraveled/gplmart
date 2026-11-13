// Builds two printable PDF products: Party & Game Bundle + Airbnb Host Welcome Kit.
// Usage: node scripts/build-party-airbnb.mjs
import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";

const INK = "#1a1a2e";
const MUTED = "#6b6b80";
const ACCENT = "#7c3aed";
const SOFT = "#f3efff";
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
function sectionTitle(doc, text, y) {
  doc.font("Helvetica-Bold").fontSize(9).fillColor(ACCENT)
    .text(text.toUpperCase(), M, y, { characterSpacing: 2 });
  doc.moveTo(M, y + 14).lineTo(W - M, y + 14).lineWidth(0.8).strokeColor(ACCENT).stroke();
  return y + 24;
}
function item(doc, text, y, x = M, w = W - M * 2) {
  doc.font("Helvetica").fontSize(10.5).fillColor(INK).text(text, x, y, { width: w, lineGap: 2 });
  return doc.y + 8;
}
function lines(doc, x, y, w, n, gap = 22) {
  doc.save().lineWidth(0.5).strokeColor(LINE);
  for (let i = 0; i < n; i++) { const ly = y + i * gap; doc.moveTo(x, ly).lineTo(x + w, ly).stroke(); }
  doc.restore();
}
function label(doc, text, x, y, w) {
  doc.font("Helvetica-Bold").fontSize(9).fillColor(INK).text(text, x, y, { width: w });
}
function checkbox(doc, x, y, s = 10) {
  doc.save().rect(x, y, s, s).lineWidth(1).strokeColor(INK).stroke().restore();
}

// ================= PARTY & GAME BUNDLE =================
function randBingoCard() {
  const cols = { B: [1, 15], I: [16, 30], N: [31, 45], G: [46, 60], O: [61, 75] };
  const card = {};
  for (const [k, [lo, hi]] of Object.entries(cols)) {
    const pool = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
    for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
    card[k] = pool.slice(0, 5);
  }
  card.N[2] = "FREE";
  return card;
}

async function partyGames() {
  const dir = "products/src/party-game-bundle";
  const { doc, done } = newDoc(dir, "Party-Game-Bundle.pdf");

  cover(doc, "The Party Game Bundle", "30 bingo cards, trivia, scavenger hunts, baby shower games and printable party signs - everything a host needs, zero prep stress.", "GPLMart Party Bundle", "#db2777");

  // contents
  doc.addPage();
  let y = sectionTitle(doc, "What's inside", M + 10);
  [
    "30 unique Bingo cards (B 1-15, I 16-30, N 31-45 FREE center, G 46-60, O 61-75)",
    "Caller sheets with randomized call orders for 10 cards",
    "Would You Rather: 30 party cards (groups of 10 per page)",
    "Party trivia: 40 questions with answers (general knowledge, movies, music)",
    "3 scavenger hunts: birthday party, baby shower, house party",
    "Baby shower games: guess the baby food, nursery rhyme quiz, advice cards",
    "Printable party signs: welcome, photo booth, happy birthday, cake table, thank you",
    "How-to-play instructions for every game",
  ].forEach((t) => { y = item(doc, t, y); });
  y += 12;
  doc.font("Helvetica-Bold").fontSize(11).fillColor("#db2777").text("Pro tip", M, y);
  y = doc.y + 6;
  doc.font("Helvetica").fontSize(10.5).fillColor(INK).text("Print bingo cards double-sided or single - guests love having their own card. Laminate the signs for reuse.", M, y, { width: W - M * 2 });

  // bingo cards - 30 cards, 3 per page (compact)
  const letters = ["B", "I", "N", "G", "O"];
  for (let batch = 0; batch < 10; batch++) {
    doc.addPage();
    for (let slot = 0; slot < 3; slot++) {
      const cardIdx = batch * 3 + slot + 1;
      const card = randBingoCard();
      const ox = M + slot * ((W - M * 2) / 3 + 6) - 3, oy = M + 10;
      const cw = (W - M * 2) / 3 - 10, ch = (H - M * 2 - 30) / 3 - 10;
      doc.font("Helvetica-Bold").fontSize(8).fillColor(MUTED).text(`BINGO CARD ${cardIdx}`, ox, oy);
      const top = oy + 14, cell = (ch - 30) / 5, gw = cw / 5;
      letters.forEach((L, ci) => {
        doc.font("Helvetica-Bold").fontSize(8).fillColor("#db2777").text(L, ox + ci * gw + gw / 2 - 3, top);
      });
      for (let r = 0; r < 5; r++) {
        letters.forEach((L, ci) => {
          const x = ox + ci * gw, yy = top + 12 + r * cell;
          doc.save().rect(x, yy, gw - 2, cell - 2).lineWidth(0.5).strokeColor(LINE).stroke().restore();
          const val = card[L][r];
          doc.font("Helvetica").fontSize(9).fillColor(INK)
            .text(String(val), x + gw / 2 - 6, yy + cell / 2 - 4);
        });
      }
      doc.font("Helvetica").fontSize(7).fillColor(MUTED).text("GPLMart Party Bundle - gplmart.com", ox, oy + ch - 2, { width: cw });
    }
  }

  // caller sheets - 10 pages? one page with 10 call orders
  doc.addPage();
  y = sectionTitle(doc, "Caller Sheets (10 random orders)", M + 10);
  doc.font("Helvetica").fontSize(9).fillColor(MUTED).text("Call in any order - each row is a full game. Free space is called automatically on many cards.", M, y, { width: W - M * 2 });
  y = doc.y + 8;
  for (let g = 0; g < 10; g++) {
    const nums = [];
    for (const L of letters) {
      const [lo, hi] = { B: [1, 15], I: [16, 30], N: [31, 45], G: [46, 60], O: [61, 75] }[L];
      const pool = Array.from({ length: hi - lo + 1 }, (_, i) => `${L}${lo + i}`);
      for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
      nums.push(...pool.slice(0, 5));
    }
    doc.font("Helvetica-Bold").fontSize(8).fillColor("#db2777").text(`Game ${g + 1}:`, M, y);
    doc.font("Helvetica").fontSize(8).fillColor(INK).text(nums.join("  "), M + 50, y, { width: W - M * 2 - 50 });
    y = doc.y + 6;
    if (y > H - M - 10) { doc.addPage(); y = M + 10; }
  }

  // Would You Rather cards
  const wyr = [
    ["be able to fly", "be invisible"], ["always be 10 minutes late", "always be 20 minutes early"],
    ["live without music", "live without movies"], ["have a rewind button", "have a pause button"],
    ["be famous but broke", "unknown but rich"], ["eat pizza forever", "eat tacos forever"],
    ["speak all languages", "talk to animals"], ["never use phone again", "never watch TV again"],
    ["win $1M but tell everyone", "win $100k and keep it secret"], ["always say what you think", "never speak again"],
    ["be 3 inches taller", "be 3 inches shorter"], ["live in hot forever", "cold forever"],
    ["have super strength", "super speed"], ["be 100 years ago", "100 years from now"],
    ["lose all photos", "lose all music"], ["only sweet food", "only salty food"],
    ["always know the time", "always know the date"], ["be the funniest", "be the smartest"],
    ["one meal a day favorite", "snacks all day"], ["no internet forever", "no friends forever"],
    ["relive your best day", "skip your worst day"], ["know how you'll die", "know when you'll die"],
    ["be a cat", "be a dog"], ["always wake rested", "never need sleep"],
    ["speak to plants", "hear animals"], ["never age but stay same", "age but stay healthy"],
    ["free travel forever", "free food forever"], ["be your own boss", "be a CEO"],
    ["know every language", "know every skill"], ["only text messages", "only voice calls"],
    ["always sunny", "always rainy"], ["live on beach", "live in mountains"],
  ];
  for (let p = 0; p < 3; p++) {
    doc.addPage();
    y = sectionTitle(doc, `Would You Rather - Set ${p + 1} (10 cards)`, M + 10);
    doc.font("Helvetica").fontSize(9).fillColor(MUTED).text("Read both options, pick one, defend your choice. Great icebreaker for 6-20 people.", M, y, { width: W - M * 2 });
    y = doc.y + 10;
    for (let i = 0; i < 10; i++) {
      const [a, b] = wyr[p * 10 + i];
      const cardY = y + (i % 5) * 60, col = Math.floor(i / 5);
      const x = M + col * ((W - M * 2) / 2 + 10);
      doc.save().roundedRect(x, cardY, (W - M * 2) / 2 - 10, 52, 8).fill(SOFT).restore();
      doc.font("Helvetica-Bold").fontSize(9).fillColor("#db2777").text(`${i + 1 + p * 10}`, x + 10, cardY + 8);
      doc.font("Helvetica").fontSize(10).fillColor(INK).text(`A: ${a}`, x + 26, cardY + 8, { width: (W - M * 2) / 2 - 50 });
      doc.text(`B: ${b}`, x + 26, cardY + 26, { width: (W - M * 2) / 2 - 50 });
    }
    y += 5 * 60 + 16;
  }

  // trivia
  const trivia = [
    ["What year did the first iPhone release?", "2007"], ["Which planet is known as the Red Planet?", "Mars"],
    ["How many continents are there?", "7"], ["What is the largest ocean?", "Pacific"],
    ["Which band released 'Bohemian Rhapsody'?", "Queen"], ["What year did Titanic premiere?", "1997"],
    ["How many bones in adult human body?", "206"], ["What is H2O commonly known as?", "Water"],
    ["Which country invented pizza?", "Italy"], ["What is the currency of Japan?", "Yen"],
    ["How many colors in rainbow?", "7"], ["Which animal is 'man's best friend'?", "Dog"],
    ["What is the capital of Australia?", "Canberra"], ["How many days in leap year?", "366"],
    ["Which company makes iPhones?", "Apple"], ["What does 'www' stand for?", "World Wide Web"],
    ["How many players in a soccer team?", "11"], ["Which is hotter: 100C or 100F?", "100C"],
    ["What year did World War 2 end?", "1945"], ["Which gas do plants absorb?", "CO2 (carbon dioxide)"],
    ["How many strings on a guitar?", "6"], ["What is the fastest land animal?", "Cheetah"],
    ["Which app has the bird logo?", "Twitter/X"], ["How many minutes in 2 hours?", "120"],
    ["What is the largest mammal?", "Blue whale"], ["Which language has most native speakers?", "Mandarin Chinese"],
    ["What does DNA stand for?", "Deoxyribonucleic acid"], ["How many sides on a hexagon?", "6"],
    ["Which planet has the most moons?", "Saturn"], ["What year did man first land on moon?", "1969"],
    ["How many zeros in a million?", "6"], ["What is the smallest country?", "Vatican City"],
    ["Which fruit is yellow and curved?", "Banana"], ["How many hours in a day?", "24"],
    ["What do bees produce?", "Honey"], ["Which metal is liquid at room temp?", "Mercury"],
    ["What is the tallest mountain?", "Mount Everest"], ["How many players on a basketball team?", "5"],
    ["Which is bigger: kilometer or mile?", "Mile"], ["What does PDF stand for?", "Portable Document Format"],
  ];
  for (let p = 0; p < 2; p++) {
    doc.addPage();
    y = sectionTitle(doc, `Party Trivia - Set ${p + 1}`, M + 10);
    doc.font("Helvetica").fontSize(9).fillColor(MUTED).text("Host reads the question, guests write answers, reveal after 30 seconds. 1 point each.", M, y, { width: W - M * 2 });
    y = doc.y + 10;
    for (let i = 0; i < 20; i++) {
      const [q, a] = trivia[p * 20 + i];
      const yy = y + (i % 10) * 62, col = Math.floor(i / 10);
      const x = M + col * ((W - M * 2) / 2 + 10);
      doc.save().roundedRect(x, yy, (W - M * 2) / 2 - 10, 54, 8).fill("#fff").strokeColor(LINE).stroke().restore();
      doc.font("Helvetica-Bold").fontSize(8).fillColor("#db2777").text(`${p * 20 + i + 1}`, x + 8, yy + 6);
      doc.font("Helvetica").fontSize(9).fillColor(INK).text(q, x + 24, yy + 6, { width: (W - M * 2) / 2 - 60 });
      doc.font("Helvetica-Oblique").fontSize(8).fillColor(MUTED).text(`A: ${a}`, x + 24, yy + 36, { width: (W - M * 2) / 2 - 60 });
    }
  }

  // scavenger hunts
  const hunts = [
    ["Birthday Party Scavenger Hunt", "Items to find or photograph - works indoors or out", [
      "Something red", "Something round", "Something that makes noise", "Something borrowed",
      "Something with a face", "Something older than you", "Something from another country",
      "Something sweet", "Something cold", "Something you can wear", "A hidden object (host hides a small toy)",
      "A guest's signature", "Something shiny", "Something that smells good", "Your favorite snack",
    ]],
    ["Baby Shower Scavenger Hunt", "Guests hunt for baby items or sweet moments", [
      "A baby photo of the mom-to-be", "Three baby items under $5", "A handprint craft",
      "Advice for the parents (write on card)", "Something the baby will love", "A group selfie",
      "A guests' best baby memory", "Match baby socks to feet", "A nursery rhyme recited",
      "Guess the baby food (blind taste)", "A wish for the baby written down",
    ]],
    ["House Party Scavenger Hunt", "Mix indoor tasks and social challenges", [
      "Find the weirdest thing in the host's home", "Get a photo with 3 people you just met",
      "Learn one fun fact about someone", "Find something that starts with 'B'",
      "Make the host laugh", "Find a hidden party favor", "Trade snacks with another guest",
      "Take a group selfie in an odd place", "Compliment 3 guests sincerely",
      "Find the fastest Wi-Fi spot", "Leave the room cleaner than you found it",
    ]],
  ];
  hunts.forEach(([title, sub, items]) => {
    doc.addPage();
    y = sectionTitle(doc, title, M + 10);
    doc.font("Helvetica").fontSize(9).fillColor(MUTED).text(sub, M, y, { width: W - M * 2 });
    y = doc.y + 12;
    items.forEach((it, i) => {
      const yy = y + (i % 8) * 40, col = Math.floor(i / 8);
      const x = M + col * ((W - M * 2) / 2 + 10);
      checkbox(doc, x, yy + 4);
      doc.font("Helvetica").fontSize(10).fillColor(INK).text(`${i + 1}. ${it}`, x + 20, yy, { width: (W - M * 2) / 2 - 30 });
    });
    y += Math.ceil(items.length / 8) * 40 + 20;
    label(doc, "SCORING", M, y, 100); y += 14;
    doc.font("Helvetica").fontSize(10).fillColor(INK).text("First team to find everything wins. Tiebreaker: silliest photo or best story. Small prizes recommended.", M, y, { width: W - M * 2 });
  });

  // baby shower games
  doc.addPage();
  y = sectionTitle(doc, "Baby Shower Games", M + 10);
  label(doc, "GUESS THE BABY FOOD (blind taste test)", M, y, 400); y += 16;
  doc.font("Helvetica").fontSize(10).fillColor(INK).text("Puree single-ingredient baby foods (carrot, sweet potato, pea, apple, banana). Guests taste blind and guess. 1 point per correct. Have extras for the brave.", M, y, { width: W - M * 2 });
  y = doc.y + 14;
  label(doc, "NURSERY RHYME QUIZ", M, y, 400); y += 16;
  doc.font("Helvetica").fontSize(10).fillColor(INK).text("Read the first line of a nursery rhyme, guests finish it. 'Twinkle twinkle little...' 'Humpty Dumpty sat on...' 20 rhymes = 20 points.", M, y, { width: W - M * 2 });
  y = doc.y + 14;
  label(doc, "ADVICE CARDS", M, y, 400); y += 16;
  lines(doc, M, y, W - M * 2, 12, 24);
  y += 12 * 24 + 10;
  doc.font("Helvetica").fontSize(9).fillColor(MUTED).text("Print these pages back-to-back for guests to write parenting advice. Compile into a keepsake book for the parents.", M, y, { width: W - M * 2 });

  // party signs
  const signs = [
    ["HAPPY BIRTHDAY", "to our favorite person", "#db2777"],
    ["WELCOME", "to the celebration", "#0e6e56"],
    ["PHOTO BOOTH", "strike a pose!", "#7c3aed"],
    ["CAKE TABLE", "sweet treats inside", "#db2777"],
    ["THANK YOU", "for celebrating with us", "#0e6e56"],
    ["LET'S PARTY", "games • laughs • cake", "#7c3aed"],
  ];
  signs.forEach(([big, small, color]) => {
    doc.addPage();
    doc.save().roundedRect(M + 40, M + 80, W - M * 2 - 80, H - M * 2 - 160, 16).strokeColor(color).lineWidth(3).stroke().restore();
    doc.save().roundedRect(M + 56, M + 96, W - M * 2 - 112, H - M * 2 - 192, 12).lineWidth(1).strokeColor(LINE).stroke().restore();
    doc.font("Helvetica-Bold").fontSize(44).fillColor(color).text(big, M, H / 2 - 90, { width: W - M * 2, align: "center", characterSpacing: 4 });
    doc.font("Helvetica").fontSize(16).fillColor(MUTED).text(small, M, H / 2 + 10, { width: W - M * 2, align: "center" });
    doc.font("Helvetica").fontSize(9).fillColor(MUTED).text("Print on card stock, 100% scale", M, H - 70, { width: W - M * 2, align: "center" });
  });

  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    footer(doc, "Party Game Bundle - GPLMart", i - range.start + 1, range.count);
  }
  doc.end();
  await done();
  console.log("built", path.join(dir, "Party-Game-Bundle.pdf"), `${(fs.statSync(path.join(dir, "Party-Game-Bundle.pdf")).size / 1024).toFixed(0)} KB`);
}

// ================= AIRBNB HOST WELCOME KIT =================
async function airbnb() {
  const dir = "products/src/airbnb-host-welcome-kit";
  const { doc, done } = newDoc(dir, "Airbnb-Host-Welcome-Kit.pdf");
  const G = "#0e6e56";

  cover(doc, "The Airbnb Host Welcome Kit", "Guest books, house manuals, welcome notes, review cards and local guides - the printed touches that turn guests into 5-star reviews.", "GPLMart Host Kit", G);

  doc.addPage();
  let y = sectionTitle(doc, "Why this kit works", M + 10);
  [
    "A handwritten-feel welcome book is the #1 thing guests photograph and mention in reviews.",
    "A house manual kills 80% of 'how do I...' messages before they happen.",
    "A review request card at checkout timing doubles your review rate.",
    "Every template uses [BRACKETS] - fill in once, print dozens.",
    "Print on cardstock, keep a stack at the property. Replenish monthly.",
  ].forEach((t) => { y = item(doc, t, y); });

  // welcome note card
  doc.addPage();
  doc.save().roundedRect(M + 30, M + 60, W - M * 2 - 60, 240, 12).strokeColor(G).lineWidth(2).stroke().restore();
  doc.font("Helvetica-Bold").fontSize(26).fillColor(G).text("WELCOME", M, H / 2 - 110, { width: W - M * 2, align: "center", characterSpacing: 6 });
  doc.font("Helvetica").fontSize(12).fillColor(INK).text("We're so glad you're here, [GUEST NAME].\n\nThis place is yours for the next [N] days - make yourselves at home.\nIf you need anything at all, text me at [PHONE] - I respond fast.\n\nEnjoy your stay,\n[YOUR NAME]", M, H / 2 - 40, { width: W - M * 2, align: "center", lineGap: 6 });

  // guest book pages x2
  for (let p = 0; p < 2; p++) {
    doc.addPage();
    y = sectionTitle(doc, `Guest Book - Page ${p + 1}`, M + 10);
    doc.font("Helvetica").fontSize(10).fillColor(MUTED).text("Leave a note for future guests - favorite memory, hidden gem, anything.", M, y, { width: W - M * 2 });
    y = doc.y + 14;
    for (let i = 0; i < 4; i++) {
      const yy = y + i * 100;
      doc.save().roundedRect(M, yy, W - M * 2, 88, 8).strokeColor(LINE).stroke().restore();
      doc.font("Helvetica-Bold").fontSize(8).fillColor(MUTED).text("NAME & DATE", M + 12, yy + 10);
      doc.moveTo(M + 12, yy + 26).lineTo(M + 160, yy + 26).lineWidth(0.5).strokeColor(INK).stroke();
      lines(doc, M + 12, yy + 40, W - M * 2 - 24, 2, 22);
    }
  }

  // house manual template
  doc.addPage();
  y = sectionTitle(doc, "House Manual Template", M + 10);
  const manual = [
    ["WiFi", "Network: [NAME] | Password: [PASS] | Router location: [WHERE]"],
    ["Door lock", "Code: [CODE] | Lockbox backup: [WHERE] | Check-out: [TIME]"],
    ["Check-in/out", "Check-in after [TIME], check-out by [TIME]. Keys go back in [WHERE]."],
    ["Heating/AC", "Thermostat: [LOCATION] | Optimal [TEMP] | Don't touch: [EXPLAIN]"],
    ["Trash & recycling", "Bins go out [DAY]. Rules: [LOCAL RULES]"],
    ["House rules", "No smoking | No parties | Quiet hours [TIME]-[TIME] | Pets [POLICY]"],
    ["Parking", "Spot(s): [WHERE] | Street rules: [NOTES] | Overflow: [ALT]"],
    ["Kitchen", "Coffee maker: [TYPE] | Extra supplies: [WHERE] | Please wash dishes"],
    ["Laundry", "Machine: [HOW] | Detergent: [WHERE] | Iron: [WHERE]"],
    ["TV & streaming", "Login: [EMAIL] | Apps: [LIST] | Remote: [LOCATION]"],
    ["Emergency", "Fire extinguisher: [WHERE] | First aid: [WHERE] | Nearest hospital: [NAME/ADDR]"],
    ["Host contact", "Text/call: [PHONE] | Email: [EMAIL] | Best response: [HOURS]"],
  ];
  manual.forEach(([h, t]) => {
    label(doc, h.toUpperCase(), M, y, 140); y += 14;
    doc.font("Helvetica").fontSize(10).fillColor(INK).text(t, M + 150, y - 13, { width: W - M * 2 - 150 });
    y = doc.y + 8;
    doc.moveTo(M, y).lineTo(W - M, y).lineWidth(0.3).strokeColor(LINE).stroke();
    y += 8;
  });

  // local guide pages
  for (let p = 0; p < 2; p++) {
    doc.addPage();
    y = sectionTitle(doc, `Local Guide - Page ${p + 1}`, M + 10);
    doc.font("Helvetica").fontSize(10).fillColor(MUTED).text("Your insider picks beat any Google search. Update seasonally.", M, y, { width: W - M * 2 });
    y = doc.y + 12;
    const cats = p === 0 ? ["Coffee & breakfast", "Lunch & dinner", "Drinks & nightlife", "Must-see attractions"] : ["Groceries & markets", "Pharmacy & essentials", "Outdoor activities", "Day trips & hidden gems"];
    cats.forEach((cat) => {
      label(doc, cat.toUpperCase(), M, y, 300); y += 15;
      lines(doc, M, y, W - M * 2, 3, 26); y += 3 * 26 + 12;
    });
  }

  // review request card
  doc.addPage();
  doc.save().roundedRect(M + 40, M + 80, W - M * 2 - 80, 260, 16).strokeColor(G).lineWidth(2).stroke().restore();
  doc.font("Helvetica-Bold").fontSize(24).fillColor(G).text("HAD A GREAT STAY?", M, H / 2 - 120, { width: W - M * 2, align: "center" });
  doc.font("Helvetica").fontSize(12).fillColor(INK).text("Your review helps future guests find this place - and helps me keep hosting it well.\n\nIt takes 60 seconds:\n[listing link]\n\nThank you for being a great guest!\n[YOUR NAME]", M, H / 2 - 60, { width: W - M * 2, align: "center", lineGap: 8 });
  doc.font("Helvetica").fontSize(9).fillColor(MUTED).text("Place on the counter or nightstand at check-out time", M, H - 80, { width: W - M * 2, align: "center" });

  // emergency card
  doc.addPage();
  doc.save().roundedRect(M + 40, M + 100, W - M * 2 - 80, 200, 12).strokeColor("#dc2626").lineWidth(2).stroke().restore();
  doc.font("Helvetica-Bold").fontSize(20).fillColor("#dc2626").text("EMERGENCY INFO", M, H / 2 - 80, { width: W - M * 2, align: "center" });
  doc.font("Helvetica").fontSize(11).fillColor(INK).text("Police / Fire / Ambulance: 911\nHost: [PHONE] - text first, call if urgent\nAddress: [FULL ADDRESS]\nNearest urgent care: [NAME / ADDRESS]\n\nIn case of emergency, guests' safety comes first - call 911, then text the host.", M, H / 2 - 30, { width: W - M * 2, align: "center", lineGap: 5 });

  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    footer(doc, "Airbnb Host Welcome Kit - GPLMart", i - range.start + 1, range.count);
  }
  doc.end();
  await done();
  console.log("built", path.join(dir, "Airbnb-Host-Welcome-Kit.pdf"), `${(fs.statSync(path.join(dir, "Airbnb-Host-Welcome-Kit.pdf")).size / 1024).toFixed(0)} KB`);
}

await partyGames();
await airbnb();
