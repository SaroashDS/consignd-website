# 03 — Aceternity UI: what to use, what to avoid, how to integrate

Aceternity UI (ui.aceternity.com) is copy-paste React components built on
**Tailwind CSS + `motion` (framer-motion)**. This repo has **neither** — it is
plain CSS + GSAP. Read the integration decision first; do not blindly paste
components that won't compile.

## Integration decision (pick one, tell the user which you picked)

**Path A — add the Aceternity toolchain (only if adopting ≥3 components):**
```
npm i motion clsx tailwind-merge tailwindcss @tailwindcss/vite
```
- Tailwind v4: add `@tailwindcss/vite` plugin to `vite.config.js`, add
  `@import "tailwindcss";` at the TOP of `src/index.css`. Tailwind v4 needs no
  config file; existing plain CSS keeps working alongside.
- Add the standard `cn()` util at `src/lib/utils.js`:
  `import { clsx } from "clsx"; import { twMerge } from "tailwind-merge"; export const cn = (...i) => twMerge(clsx(i));`
- Map Aceternity's CSS variables to ours (they use `--background` etc.) inside
  the `@theme` block; recolor every pasted component to the doc-02 tokens
  (`--accent` orange, NOT their default purple/indigo — pasted-in default
  Aceternity colors instantly re-introduce the "template" look doc 02 removed).
- `motion` + GSAP coexisting is fine at this scale; keep GSAP for the pinned
  scene, `motion` only inside pasted components.

**Path B — no Tailwind (recommended if adopting ≤2 components):** treat
Aceternity as a design reference and port the visual idea into the existing
plain-CSS system. Most of the components below are <100 lines of CSS/JS when
ported. This keeps the dependency surface enterprise-lean.

## Components that fit this site (ranked by impact)

1. **Compare** (`/components/compare`) — before/after slider. **The best
   possible match for this product**: left = a messy scanned rate con (blurred
   sample or CSS mock), right = the clean `load.record` schema block. Drag
   handle = the pitch. Place in the AI-ready section replacing the static
   before/after card pair, or directly under the hero. If you adopt only one
   Aceternity component, adopt this one.

2. **Sticky Scroll Reveal** (`/components/sticky-scroll-reveal`) — left rail
   text steps, right panel swaps content. Perfect for the 3-stage
   Capture→Structure→Deliver pipeline (`#how`), replacing the three side-by-
   side GlowCards with a taller, more legible narrative. Note: overlaps
   conceptually with the GSAP cinematic scene — use it for `#how` ONLY if the
   cinematic scene stays focused on the document-transform story.

3. **Timeline** (`/components/timeline`) — vertical scroll-progress timeline.
   Ideal for the Story section's 01→04 beats ("A document lands somewhere
   messy…"), replacing four equal cards with a narrative spine. Also the right
   pattern for a future "order-independence" section (BOL arrives → triage →
   rate con arrives → auto-match): that's a sequence in time, which is exactly
   what a timeline communicates.

4. **Container Scroll Animation** (`/components/container-scroll-animation`) —
   the tilted-screenshot-straightens-on-scroll hero. Adopt ONLY when a real
   portal screenshot exists (the product's portal has a review queue + data
   card UI; use a `DEMO-` seeded screenshot, never client data). A real
   product screenshot is worth more than every other item in this file.

5. **Infinite Moving Cards** (`/components/infinite-moving-cards`) — drop-in
   upgrade for the rewritten "heard from a…" quotes row (doc 01 §7): built-in
   pause-on-hover, direction, speed. Only adopt AFTER the copy fix — do not
   animate the fabricated Reddit cards.

6. **Hover Border Gradient** (`/components/hover-border-gradient`) — subtle
   animated border for the ONE primary CTA button. Cheap, tasteful, within the
   doc-02 glow budget if it replaces (not adds to) an existing glow.

7. **Bento Grid** (`/components/bento-grid`) — layout pattern for the AI-ready
   section's card cluster: one 2×2 dominant cell (the schema block) + small
   cells (the three use-cases). Gives the section the hierarchy doc 02 asks
   for. This is mostly a CSS-grid idea — trivially Path-B portable.

8. **Text Generate Effect** (`/components/text-generate-effect`) — word-by-
   word blur-in for the hero sub only. The H1 already has a reveal; don't
   stack both on the same element.

## Components to explicitly AVOID (they re-install the template look)

**Aurora Background, Background Beams, Meteors, Sparkles, Vortex, Wavy
Background, Shooting Stars, Globe (GitHub-style), Lamp Effect, Spotlight.**
Every one of these is the decorative-ambient vocabulary doc 02 §3 deletes, and
they are the most-copied Aceternity pieces on the internet — i.e. the fastest
way to look like every other AI landing page. Also avoid **3D Card / Glare
Card** on content cards (mouse-tilt on text hurts readability) and **Macbook
Scroll** (device-frame skeuomorphism is off-brand for a back-office tool;
Container Scroll's plain frame is the better fit).

## Adaptation rules for anything you paste

- Recolor to doc-02 tokens before first commit. Grep the pasted file for
  `indigo`, `purple`, `cyan`, `emerald` Tailwind classes — replace all.
- Fonts: pasted components inherit `font-sans`; ensure Tailwind's `--font-sans`
  maps to Inter and headings keep Fraunces.
- Every animated component must early-return or freeze under
  `prefers-reduced-motion` (Aceternity components mostly do NOT handle this —
  add `useReducedMotion()` from `motion/react` yourself).
- Delete unused props/variants from pasted files; they ship dead code.
- Keep pasted components in `src/components/aceternity/` so provenance is
  obvious to the next agent.
