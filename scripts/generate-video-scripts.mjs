#!/usr/bin/env node
/**
 * Video course pipeline - stage 1: narration scripts + captions.
 *
 * For every course lesson that has no `video` field yet, asks Gemini for a
 * ~60-90 second narration script and word-timed SRT captions, and stores them
 * in lib/video-scripts.json. A later stage turns these into audio (Gemini TTS)
 * and renders MP4s - this script only produces the text assets.
 *
 * Runs on its own weekly schedule (video-scripts.yml) so the daily content
 * workflow stays light. Manual: node scripts/generate-video-scripts.mjs
 */
import fs from "node:fs";

const FILES = { lessons: "lib/course-lessons.json", scripts: "lib/video-scripts.json", state: ".video-state.json" };
const readJson = (p) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : null);
const writeJson = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2) + "\n");

const API_KEYS = (process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || "")
  .split(",").map((k) => k.trim()).filter(Boolean);
const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";
if (!API_KEYS.length) { console.error("No GEMINI_API_KEY(S) set"); process.exit(1); }
let keyIdx = 0;
const nextKey = () => API_KEYS[keyIdx++ % API_KEYS.length];

const PER_RUN = Number(process.env.VIDEO_SCRIPTS_PER_RUN ?? 3);

const PROMPT = (lesson) => `Write a video narration script for a course lesson.

Lesson: "${lesson.title}" (${lesson.course}/${lesson.module}/${lesson.slug})
Summary: ${lesson.excerpt}

Return JSON:
{
  "title": "video title (under 70 chars)",
  "script": "conversational narration, 150-220 words, spoken style, no stage directions",
  "captions": [
    { "start": 0.0, "end": 3.5, "text": "caption line 1" },
    { "start": 3.5, "end": 7.0, "text": "caption line 2" }
  ]
}

RULES:
- Script must teach the lesson's core idea in under 90 seconds when spoken (~150-18wpm).
- Captions: 8-14 cues covering the whole script, timestamps in seconds, each cue max ~10 words.
- Friendly expert tone, no fluff, no "in this video we will". Start with the hook.
- Return ONLY JSON.`;

async function llm(prompt) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${nextKey()}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 8000, responseMimeType: "application/json" },
      }),
    },
  );
  if (!res.ok) throw new Error(`LLM ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
}

const parseJson = (t) => JSON.parse(t.replace(/```(?:json)?/g, "").trim().replace(/^[\s\S]*?([\[{])/, "$1"));

async function main() {
  const lessons = readJson(FILES.lessons) ?? [];
  const scripts = readJson(FILES.scripts) ?? {};
  const state = readJson(FILES.state) ?? {};
  const done = new Set(Object.keys(scripts));
  const queue = lessons.filter((l) => !l.video && !done.has(`${l.course}/${l.module}/${l.slug}`)).slice(0, PER_RUN);
  console.log(`${lessons.length} lessons, ${queue.length} queued for scripts (keys=${API_KEYS.length})`);

  let made = 0;
  for (const l of queue) {
    const key = `${l.course}/${l.module}/${l.slug}`;
    try {
      const text = await llm(PROMPT(l));
      const v = parseJson(text);
      if (!v.script || !Array.isArray(v.captions) || !v.captions.length) throw new Error("bad shape");
      scripts[key] = { title: v.title ?? l.title, script: v.script, captions: v.captions, lesson: key, generated: new Date().toISOString().slice(0, 10) };
      made++;
      console.log(`+ ${key}`);
    } catch (e) {
      console.log(`x ${key}: ${e.message}`);
      state[`fail:${key}`] = (state[`fail:${key}`] ?? 0) + 1;
      if ((state[`fail:${key}`] ?? 0) >= 3) done.add(key); // stop retrying permanently broken ones
    }
  }
  writeJson(FILES.scripts, scripts);
  writeJson(FILES.state, state);
  console.log(`done: ${made} scripts`);
}

main().catch((e) => { console.error(e); process.exit(1); });
