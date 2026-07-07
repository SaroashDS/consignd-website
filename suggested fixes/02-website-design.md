# 02 — Website Design: system, hierarchy, motion

The site's CSS is competent but it's a *template*: aurora blobs + dual-color
grid + noise + gradient-text headlines + identical blue-glow glass cards on
every section. That exact combination is the 2024–26 "AI startup" signature,
and a mature freight buyer pattern-matches it to vaporware. The fix is
**restraint and hierarchy**, not more effects. Almost everything below is
`src/index.css` plus targeted JSX edits in `src/App.jsx`.

## Design principles (apply to every decision)

1. **One hero effect per viewport.** If a section has a glowing card, its
   background is quiet. If the background moves, the cards are flat.
2. **The product is the decoration.** Documents, fields, monospace schema rows,
   review queues — render those beautifully instead of abstract blobs. The
   cinematic scene and the `load.record` schema block already do this; extend
   that language, delete the abstract one.
3. **Freight is paper.** Lean into ledger/document texture (hairline rules,
   monospace data, stamp-like tags) instead of sci-fi glow.
4. **Gravity over vibrancy.** Enterprise trust comes from restraint: fewer
   colors, fewer simultaneous animations, more whitespace.

## 1. Token overhaul (`:root`, index.css lines 1–14)

Current: near-black navy + TWO competing accents (blue #3B82F6 and orange
#F26522) + glass tokens. Two accents is why nothing reads as "the" brand color.

```css
:root {
  --bg: #0B0E13;            /* warmer near-black; "ledger" not "sci-fi" */
  --bg-2: #11151C;
  --surface: #151A22;       /* flat card surface — the new default card */
  --accent: #F26522;        /* orange IS the brand. One accent. */
  --accent-soft: rgba(242,101,34,0.14);
  --blue: #3B82F6;          /* DEMOTED: data-viz/link color only, never headings */
  --text: rgba(255,255,255,0.92);
  --muted: rgba(255,255,255,0.64);
  --dim: rgba(255,255,255,0.45);
  --line: rgba(255,255,255,0.08);       /* hairline borders, no glow */
  --line-strong: rgba(255,255,255,0.16);
  --ok: #22c55e;
}
```

Migration rule: every `.num`/`.grad` heading span currently colored blue
becomes either plain `--text` or `--accent`. Search for `var(--blue-bright)`
and re-decide each use: keep blue ONLY inside data mockups (schema rows,
pipeline illustrations) where it reads as syntax highlighting.

## 2. Typography

- Keep **Inter** (body/UI) and **JetBrains Mono** (data). Both are right.
- Replace **Syne** (display) — it's the default "web3 startup" display face.
  Swap to **Fraunces** (weights 500;600, `opsz` auto) for H1/H2 only. A serif
  display on a dark data product is the fastest single change that moves the
  site from "template" to "editorial." Update the Google Fonts `<link>` in
  `index.html` and the `font-family` on the h1/h2 rules (index.css ~line 123).
- Kill gradient text as a system. `.grad` (background-clip gradient) may
  survive in exactly ONE place: the hero H1 accent words ("Closing Loads.").
  Every other `.grad`/`.num` span in section H2s becomes plain text. Mid-
  sentence color switches ("costing the most time" in random blue) currently
  create emphasis the copy never intended.
- Type scale: H1 clamp(40px, 6vw, 72px); H2 clamp(28px, 4vw, 44px); section
  sub 17px/1.6. Tighten H2 letter-spacing to -0.02em (serif needs less).

## 3. Background system (index.css "animated bg" block + App.jsx lines 333–343)

Current stack: aurora conic gradient + dual-color animated grid + SIX blurred
blobs + noise — all `position:fixed`, several animating `filter: blur()`
layers (expensive paint, and the #1 "AI slop" tell).

Replace with exactly three layers:
1. Solid `--bg`.
2. ONE static radial wash top-center: `radial-gradient(900px 600px at 50% -10%, rgba(242,101,34,0.07), transparent 70%)`.
3. The existing noise layer (keep, at ~0.5 current opacity), and the grid may
   stay ONLY if: single color `rgba(255,255,255,0.04)`, no animation, no
   drop-shadow, masked to the hero viewport.

Delete `.bg-blob b1–b6`, `.aurora`, `gridDrift` animation, and their JSX divs.
This alone will noticeably improve LCP/INP on mid-range laptops.

## 4. Card hierarchy — demote GlowCard

`GlowCard` (mouse-tracking border glow) currently wraps *everything*: stat
pills, story cards, chaos steps, pipeline stages, AI cards, trust cards, case
cards, pricing, both book-demo cards. When everything glows, nothing does.

New rule — glow budget of **two**:
- KEEP GlowCard: the pricing card (`#pricing`) and the two audit cards (`#audit`).
- EVERYTHING ELSE becomes a flat `.card`: `background: var(--surface);
  border: 1px solid var(--line); border-radius: 16px;` with a hover of
  `border-color: var(--line-strong); transform: translateY(-2px);
  transition: 160ms ease;`. No shadow-glow, no mouse tracking.

This is ~10 mechanical JSX swaps (GlowCard → div.card) plus one new CSS class,
and it is the single highest-impact design change in this document.

## 5. Hero

- Delete the parallax floaters (`.floaters`, App.jsx lines 383–390, plus the
  `data-parallax` scroll handler at lines 231–248). Abstract gray-bar "docs"
  floating in blur say nothing; the pinned cinematic scene two scrolls later
  does the same job with real content.
- The hero becomes: eyebrow → H1 (Fraunces, accent words in `--accent`) → sub
  → CTAs → stat row (flat cards). Quiet background per §3. Whitespace is the
  design.
- Keep the word-by-word H1 reveal animation — it's tasteful. Port unchanged.

## 6. The cinematic scene — the site's centerpiece; invest here

Keep the GSAP pinned scene and upgrade its *content fidelity*:
- The three `.cin-doc` cards should look like actual freight paper: give
  `rate_con.pdf` a letterhead line, a bold `RATE CONFIRMATION` title, a rate
  table row; give `pod_photo.jpg` a subtle photo-skew + white border
  (Polaroid read); give the invoice a totals row. Monospace where数字 appear.
  All still CSS/JSX — no images needed.
- Add the provenance beat: when `.cin-field` rows animate in, briefly
  highlight the matching line on the source doc (shared `data-field` attr,
  one extra tween). This *visualizes* "every field links to its source,"
  the product's core trust claim, instead of asserting it in text.
- Keep the reduced-motion early-return exactly as is (App.jsx line 254) but
  add a static fallback: when reduced, render the scene's final state, not
  nothing (currently the section shows unanimated initial markup, which is
  acceptable but verify it doesn't look broken).

## 7. Section-by-section visual notes

- **Story board (01–04)**: flat cards (§4). Give the `04` card the only accent
  border in the row — it's the pitch card.
- **Chaos grid (7 steps)**: flat cards, and set the step numbers in JetBrains
  Mono `--accent`. The $8,100 callout keeps its emphasis but swap its glow for
  a 1px `--accent` left border (ledger-margin look).
- **Voices replacement (doc 01 §7)**: quiet cards, generous quotes set in
  Fraunces italic 20px, the "heard from a…" line in mono `--dim`. No avatars,
  no fake engagement chrome.
- **Marquees (sources)**: keep both rows but slow to ~40s/loop and pause on
  hover (`animation-play-state: paused`). Add `aria-hidden="true"` on the
  duplicated track.
- **TMS strip**: text-only chips (doc 04 kills the lookalike SVG marks):
  mono 13px, `--muted`, hairline border. Reads like a spec sheet — right tone.
- **Schema block (`.ai-ready-schema`)**: this is already the best-designed
  element on the site. Promote it: slightly larger, and give it the ONE
  ambient glow you removed from everywhere else if you want a wow moment.
- **Final CTA**: keep the orb but recolor to `--accent-soft` and cap
  `filter: blur()` layers to this one instance.

## 8. Motion inventory (final state)

| Element | Mechanism | Keep/Change |
|---|---|---|
| H1 word reveal | CSS keyframes | keep |
| Section reveals | IntersectionObserver + `.in` | keep (works, degrades fine) |
| Pinned cinematic | GSAP ScrollTrigger | keep + upgrade (§6) |
| Counter count-up | JS rAF | keep, but guard: skip when `prefers-reduced-motion` |
| Marquees | CSS keyframes | keep, slower + hover-pause |
| Parallax floaters | JS scroll handler | **delete** |
| BG blobs/aurora/grid drift | CSS keyframes on blur layers | **delete** |
| GlowCard mouse tracking | JS pointer events | restrict to 2 instances |

Rule for anything new: animate `transform`/`opacity` only; never `filter`,
`height`, or `top` on scroll.

## 9. `/book-demo` page

- The OGL WebGL `Grainient` background renders a **static** gradient
  (`animated={false}`) through a full WebGL pipeline — a whole GPU context for
  what one CSS gradient + the noise layer replicates. Replace with CSS,
  delete the `ogl` dependency (~50KB + context cost). Keep `Grainient.jsx` out
  of the bundle entirely.
- Calendly widget: set `primaryColor` to the new accent (`F26522`) and
  `backgroundColor` to `0B0E13` to match the token overhaul.
- The two cards here are inside the glow budget (they're the conversion
  surface) — GlowCard may stay on this page.

## 10. What "done" looks like

Screenshot test at 1440px and 375px. The page should read as: dark editorial
ledger, one orange accent, serif headlines, monospace data, two glowing
moments (schema block, pricing/audit cards), one cinematic scroll scene.
If a screenshot could be mistaken for a generic AI-tool template, §3/§4
weren't applied hard enough.
