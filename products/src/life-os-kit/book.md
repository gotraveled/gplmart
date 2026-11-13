# The Life OS Kit
## Your life, running on a system — not on willpower

*A field guide from GPLMart*

---

## 1. What is a Life Operating System?

A Life OS is a set of linked documents that hold everything your head would otherwise try to remember: your goals, your projects, your habits, your money, your relationships, your journal. It is not a journal, a planner, or a to-do list — it is the system underneath all three.

The analogy is exact: your brain is not a storage device, it is a processing unit. Every unfinished task, debt, appointment, and "thing I should probably look into" sits in working memory, consuming attention that would otherwise go to the work in front of you. A Life OS moves that inventory out of your head and into files. Once a thought is *captured*, your brain stops rehearsing it.

The kit gives you seven files:

| File | What it holds |
|------|---------------|
| `dashboard.md` | Your command center — links, priorities, quick stats |
| `goals.md` | Yearly → quarterly → monthly goals with templates |
| `weekly-review.md` | The Friday review ritual |
| `habits.md` | Daily habit tracking on a 31-day grid |
| `finance.md` | Monthly budget with categories and formulas |
| `projects.md` | Active projects, next actions, waiting-on list |
| `reading-library.md` | Reading list + book notes |
| `journal.md` | Daily journal with prompts |
| `contacts-crm.md` | Personal CRM for relationships |

That's it. Nine files. No app subscription, no proprietary format, no monthly fee.

## 2. Why Templates Beat Apps

Popular life planners cost $8–20/month and lock your data inside their format. Templates do three things better:

1. **You own the data.** Markdown files are yours forever. Export to Notion, Obsidian, Google Docs, Apple Notes — or print to paper.
2. **You own the structure.** When the system doesn't fit your life, you edit a heading. No feature requests, no waiting.
3. **You learn the system.** Writing it into the template is how you internalize the review ritual. Apps hide that.

The rule of the kit: **one source of truth per concern.** Goals live in `goals.md`. Money lives in `finance.md`. Never copy the same information into two files — link to it instead.

## 3. Setup in Under an Hour

You can run this in any of three environments. Pick one — you can migrate later.

### Option A: Notion (recommended for most people)

1. Create a new Notion page called **Life OS**.
2. Inside it, create seven child pages named `Dashboard`, `Goals`, `Weekly Review`, `Habits`, `Finance`, `Projects`, `Reading`, `Journal`, `Contacts`.
3. Open each `*.md` file from this kit, copy the Markdown, and paste it into the matching Notion page. Notion accepts Markdown natively — tables, checkboxes, and `[[wikilinks]]` paste cleanly. (Tip: paste into a code block first if formatting fights you, or use Notion's "Paste as Markdown" from the `···` menu.)
4. On the Dashboard page, add a callout at the top linking to all the others: `[[Goals]] · [[Weekly Review]] · [[Habits]] · [[Finance]] · [[Projects]] · [[Reading]] · [[Journal]] · [[Contacts]]`.
5. Recreate the habit tracker as a Notion database with a checkbox property per day, or keep the markdown table — both work.

### Option B: Obsidian (recommended if you want plain files and backlinks)

1. Create a folder called `Life OS` anywhere on your machine (or inside an existing vault).
2. Drop each `*.md` file into it as-is. No conversion needed — it is already Markdown.
3. In `dashboard.md`, link with `[[goals]]`, `[[weekly-review]]`, etc. Obsidian's graph view becomes your system map.
4. Optional: enable the calendar plugin for habit dates, or Dataview for rolling stats.

### Option C: Google Docs (for people who live in a browser)

1. Create a folder named **Life OS** in Drive.
2. Create a Google Doc for each file. Paste the Markdown in — headings and tables carry over. Checkboxes become bulleted text; manually convert them or keep the `[ ]` syntax, which still reads clearly.
3. Star the Dashboard doc. That is your front door.

### The 60-minute plan

| Minutes | Task |
|---------|------|
| 0–10 | Pick your platform, create the container page/folder |
| 10–30 | Paste in all nine files |
| 30–45 | Fill `goals.md` for this year (one pass, not perfect) |
| 45–55 | Set up the habit grid for this month |
| 55–60 | Do your first weekly review with the `weekly-review.md` template |

Do not try to perfect it. A Life OS is meant to be edited constantly — the first draft just needs to exist.

## 4. How the Pieces Connect

```
        ┌─────────────┐
        │  DASHBOARD  │  ← you land here
        └──────┬──────┘
   ┌───────────┼───────────┐
   ▼           ▼           ▼
 GOALS      PROJECTS    HABITS
   │           │           │
   └─────┬─────┴─────┬─────┘
         ▼           ▼
    WEEKLY REVIEW  JOURNAL
         │           │
         └─────┬─────┘
               ▼
        FINANCE + READING + CONTACTS
        (supporting files, reviewed monthly)
```

- **Dashboard** links to everything and shows this week's focus. Open it daily.
- **Goals** is the "why" layer. Projects are the "what." Habits are the "how, every day."
- **Weekly review** is the engine. Everything else feeds into it or gets checked by it.
- **Journal** is the capture layer. Anything that pops into your head goes there first.
- **Finance, Reading, Contacts** are domain files. They get reviewed on their own cadence (monthly for finance, weekly for reading, monthly for contacts).

## 5. The Weekly Review Ritual

The weekly review is the single most important habit in the entire system. It takes 20–30 minutes, once a week, ideally Friday afternoon or Sunday evening.

1. **Clear the inbox.** Process every captured note in `journal.md` or your capture area: turn each into a project, a habit, a goal, a contact note, or delete it.
2. **Review the week.** Open `weekly-review.md`. Fill in wins, misses, and the numbers (habits %, projects moved, money spent vs. budget).
3. **Update the projects list.** Every active project needs exactly one *next action*. No next action = it's stalled; reschedule it or kill it.
4. **Check habits.** Look at the 31-day grid. Identify the one habit that's slipping and either shrink it or drop it. You cannot fix six habits at once.
5. **Set next week's focus.** Pick the ONE priority outcome for next week and write it at the top of the dashboard.
6. **Look ahead.** Scan the calendar for the coming 7–14 days. Note travel, deadlines, birthdays (check `contacts-crm.md`), and money events.

If you skip reviews for two weeks straight, shrink the ritual until you'll actually do it. A 5-minute review beats a 45-minute review you never run.

## 6. Daily Rhythm (Optional but Powerful)

- **Morning (5 min):** Open dashboard. Read this week's focus. Pick today's top 3 from `projects.md` next actions.
- **Evening (10 min):** Journal entry in `journal.md`. Tick habits in `habits.md`. Quick check: did today move the weekly focus forward?

That's the whole system. Everything else is detail.

## 7. The 30-Day Launch Plan

If you're setting this up for the first time, don't try to use all nine files on day one. Run this sequence:

- **Week 1 — Capture only.** Use `journal.md` and `dashboard.md`. Nothing else. Get in the habit of writing things down instead of holding them in your head.
- **Week 2 — Add the engine.** Start `weekly-review.md`. Do your first real review this week. Add `projects.md` and move your top 3 projects in.
- **Week 3 — Add direction.** Fill `goals.md` for the year. Set this month's goals. Add `habits.md` with 3 habits max.
- **Week 4 — Add domains.** Bring in `finance.md` for your monthly budget, `reading-library.md` for whatever you're reading, and `contacts-crm.md` for the 10 people you want to stay closer to.

By day 30 you'll have the full system — or you'll know exactly which pieces you actually need.

## 8. Troubleshooting

**"I set it all up and stopped using it after a week."**
Almost always means the system is too heavy. Fix: cut to dashboard + weekly review only. Add files back one at a time, only when you feel the need. The kit is modular — use two files or all nine.

**"My goals feel fake / I never hit them."**
Check the goals file: are they outcomes or activities? "Exercise more" is an activity; "Run a 10K in May" is an outcome. Also check the review — are you actually reviewing monthly? Goals without reviews become decoration.

**"I have too many projects and nothing gets done."**
Cap active projects at 3–5. Everything else goes to a "Someday/Maybe" list. In `projects.md`, the rule is: **3 active projects max per life area** (work, health, personal). If a new project appears, one must graduate or pause.

**"The habit grid is intimidating."**
Track 3–5 habits, not 12. Start each habit at a trivially small version ("do 2 pushups" not "work out"). Consistency for 30 days beats intensity for 3.

**"I use my phone, not a laptop."**
Notion and Obsidian both have mobile apps. The weekly review can be done on your phone in 20 minutes. The daily journal prompt works as a phone note.

**"Can I share this with my partner / team?"**
Yes — duplicate the folder. Couples often run a shared `dashboard.md` and `finance.md` plus individual journals. Keep personal journals separate.

**"I want paper."**
All nine files print cleanly. The habit grid is designed for a 31-day monthly page. Print `habits.md` and `finance.md` monthly; keep the rest digital.

## 9. Making It Yours

After your first month, expect to edit. Common evolutions:

- Add a `health.md` if fitness dominates your life.
- Split `finance.md` into business vs. personal if you're self-employed.
- Add a `travel.md` if you take trips often.
- Create an `archive/` section and move completed goals/projects there monthly.

The system should feel like yours within 90 days. If it still feels like someone else's template, you're not editing it enough.

---

*Life OS Kit — GPLMart — GPL-3.0-or-later — gplmart.com*
