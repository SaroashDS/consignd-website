# 05 — Premium industrial pass (phase 2, after docs 01–04 are applied)

Reference feel: terminal-industries.com — stark black, white type, mono
uppercase kickers, hairline rules, data-dense product visuals, one accent,
big declarative statements with very little supporting text. We take the
*styling discipline*, not the copy. Buyer psychology: a freight ops buyer in
2026 is drowning in "AI copilot" pitches — the premium move is to look like
**infrastructure**, show the actual product, and say less.

## 1. The positioning statement band (new section)

One full-bleed, near-empty section between Problem and Voices. Mono kicker,
then the thesis in huge Fraunces:

> kicker: `THE POSITION`
> statement: `You don't need more AI. You need a data layer you can trust.`
> one supporting line: `Consignd is the layer between your inbox and your TMS — deterministic where it must be, AI where it helps, human where it matters.`

That supporting line is true to the product: matching/reconciliation are
deterministic code, LLMs do classify/extract, humans review flags. This is the
"intelligent data layer" framing — it positions against the AI-tool crowd
without dunking on AI (the product uses it).

## 2. Product visual — show the actual portal ("sexy product screenshots")

The single biggest premium gap: the site never shows the product. Two options:

**Option A (implemented now): high-fidelity JSX mock — `ProductFrame`.**
A browser-chrome window rendering the real Data Card screen faithfully to the
actual portal (which exists: review queue, data card with RC/BOL side-by-side
fields, flag panel with per-flag resolution, confirm-to-TMS button, source
links, email/whatsapp channel badges). Faithful field names (`load_number`,
`rate_usd`, `carrier_mc`), a real-looking flag ("rate mismatch: RC $2,850 vs
carrier invoice $3,025 — $175 detention"), review actions. Always crisp at any
DPI, no PII risk, ships today. Label it honestly: `Portal preview · demo data`.
Placed directly under the hero — premium sites lead with product.

**Option B (upgrade later): real screenshots.** The portal is real and demo-
seedable. From the DataCore repo: boot API (`uvicorn app.main:app`) + portal
(vite dev), run `python -m scripts.seed_demo`, log in `admin@consignd.com`,
screenshot Review Queue + Data Card at 1440px with `DEMO-` prefixed records
only, export WebP, swap into the ProductFrame chrome. Do NOT screenshot
anything without the DEMO label. Keep the same frame so the swap is one img.

## 3. Industrial styling system

- `.section-eyebrow` → JetBrains Mono, 11px, uppercase, 0.22em tracking,
  `--muted`, preceded by a short accent tick (2px × 12px). Kills the last
  "startup badge pill" tell.
- Statement band + ProductFrame use hairline `--line` rules, tabular numbers,
  status dots (`--ok` green / `--accent` amber-orange) — the industrial
  vocabulary.
- Primary CTA gets the Aceternity "hover border gradient" idea ported to pure
  CSS: rotating conic-gradient border on hover only. No Tailwind, no motion
  lib (doc 03 Path B — ≤2 component ideas, port don't install).
- Everything else stays within doc 02's glow budget.

## 4. What NOT to do

- No Tailwind/motion install for this — the two ported ideas don't justify it.
- No fake "live" data in the ProductFrame that overclaims (no "synced to
  McLeod ✓" — use the honest chips: Review queue / Import-ready export).
- Don't let the statement band become a paragraph. One kicker, one statement,
  one line. If it needs more words, it's the wrong statement.
- Statement band replaces nothing — the AI-ready section keeps its "broken
  foundation" H2; they rhyme deliberately (position → proof).

## 5. Acceptance

- `/` shows product UI within one scroll of the hero.
- The words "data layer you can trust" appear exactly once, huge.
- Lighthouse ≥ previous scores (ProductFrame is DOM+CSS only).
- A screenshot of the hero + ProductFrame could not be mistaken for a
  template — it shows a freight-specific review screen.
