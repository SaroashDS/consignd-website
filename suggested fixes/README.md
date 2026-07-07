# Consignd Website — Fix Pack (agent instructions)

You are fixing the Consignd DataCore marketing site to go-to-market quality.
Read this file first, then execute the numbered docs in order. Each doc is
self-contained; file paths and line references are exact as of 2026-07-08.

## What this site is

Marketing site for **Consignd DataCore** — an automated document-intake pipeline
for freight brokers (rate cons, BOLs, PODs arrive by email/WhatsApp/portal →
classified, extracted, matched, reconciled → land in the client's TMS, with one
human review step). The commercial motion is **audit-first**: prospect sends
25–50 real documents, Consignd runs a 5-day paid "Document Audit," then scopes
a monthly managed rollout only if the numbers prove out. The site already says
this (good — keep it); the problems are credibility landmines, generic
"AI-startup" styling, and zero SEO infrastructure.

## Stack facts (do not fight these)

- Vite 8 + React 19 + plain CSS (`src/index.css`, ~1450 lines). **No Tailwind.**
- Routing: `react-router-dom` v7 with **HashRouter** (`src/main.jsx`) — being replaced, see doc 04.
- Animation: GSAP + ScrollTrigger (installed, used for the pinned "cinematic" scene in `App.jsx`).
  `lenis` and `ogl` are also installed; `lenis` is **unused dead weight**, `ogl` powers one
  static WebGL gradient on `/book-demo`.
- Deploys to Vercel (`@vercel/speed-insights` is wired in `main.jsx`).
- Two routes only: `/` (all of `src/App.jsx`, 934 lines) and `/book-demo` (`src/pages/BookDemo.jsx`).
- Contact form on `/book-demo` **is wired and working** (POSTs to a Vercel API
  endpoint, honeypot included). Do not "fix" it into a mock.

## Hard rules — violating these is worse than shipping nothing

1. **Never fabricate.** No invented testimonials, usernames, upvote counts,
   customer names, logos-as-clients, or made-up outcome stats. The company is
   pre-revenue; the honest framing ("pilot," "founding customer," "what we
   measure") is the brand. Doc 01 has approved replacement copy.
2. **Never promise features the product doesn't have.** Truth source: the
   product does OCR → classify → extract → match → reconcile → human review →
   TMS push. It does NOT do "fully automatic TMS sync with no human," live
   tracking, or carrier outreach. When copy is ambiguous, prefer the weaker
   honest claim.
3. **Don't rebuild the stack.** No Next.js migration, no CSS framework swap
   unless doc 03's Tailwind path is explicitly chosen. Work inside Vite+React.
4. **Keep the pinned GSAP "cinematic" scene** (`App.jsx` ~line 457). It is the
   best thing on the site. Upgrade it (doc 02), never delete it.
5. **`prefers-reduced-motion` must keep working** for every animation you add.
6. One concern per commit, conventional-commit messages (`fix:`, `feat:`, `refactor:`).

## Execution order

| Doc | Scope | Priority |
|---|---|---|
| `04-misc-and-seo-fixes.md` | Ship-blockers: legal, routing, SEO files, dead links, dead code | **P0 — do first** |
| `01-website-copy.md` | Full copy pass: kill fabricated content, tighten every section | **P0/P1** |
| `02-website-design.md` | Design system: palette, type, hierarchy, motion | **P1** |
| `03-aceternity-components.md` | Component upgrades (optional Tailwind path) | **P2 — only after 01+02** |

Rationale for the order: the P0 items are cheap and remove active liabilities
(fake social proof, trademark lookalikes, an SEO layer that doesn't exist).
Copy changes next because design decisions (section removal/merging) depend on
final copy. Aceternity last because it may introduce Tailwind and should land
on a stable base.

## Verification checklist (run after each doc)

```
npm run lint && npm run build
```

- `npm run dev` → click every nav link on `/` AND from `/book-demo` back to `/`
  section anchors (these are currently broken — doc 04).
- View page source of the built `dist/index.html`: title, description, OG tags,
  JSON-LD present.
- Lighthouse (mobile): Performance ≥ 85, SEO = 100, Accessibility ≥ 95.
- Grep the repo for `u/Equal-Hair3068` — must return nothing when doc 01 is done.
- Resize to 375px width: no horizontal scroll, hamburger works, CTA visible.
