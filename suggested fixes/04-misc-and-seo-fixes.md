# 04 — Misc, SEO/GEO, legal, perf, a11y (P0 — do this doc first)

## A. Legal / trust (ship-blockers)

1. **Hand-drawn TMS trademark lookalikes** (`App.jsx` lines 68–116:
   `MarkRoseRocket`, `MarkAlvys`, `MarkTurvo`, `MarkMcLeod`, `MarkTai`,
   `MarkAscend`). These are original SVG *approximations of other companies'
   registered marks* — worse legally than using the real logo (derivative
   mark, implied endorsement). Real logo files sit unused in `public/logos/`
   but licensing is unconfirmed. **Fix: delete all six SVG components and
   render text-only chips** (name in JetBrains Mono, hairline border). Text
   references to compatibility are nominative fair use; invented logos are not.
2. **`DataCore®`** (footer, both pages). ® asserts a *registered* trademark;
   using it unregistered is a legal exposure (false marking) and an instant
   credibility tell for diligence. Change to `™` unless a USPTO registration
   certificate exists.
3. **Fabricated Reddit testimonials** — covered in doc 01 §7; listed here
   because it is also a legal/impersonation exposure (fake attributions to a
   real platform's real communities), not just a copy problem.

## B. Routing (breaks both UX and SEO today)

`src/main.jsx` uses **HashRouter**: every URL is `/#/…`, so crawlers see one
URL for the whole site, OG scrapers can't resolve `/book-demo`, and analytics
path reporting is useless. Worse, the BookDemo nav links (`Link to="/#problem"`
etc., BookDemo.jsx lines 225–229) don't scroll to sections — App never reads
`location.hash` on mount, so they silently land at the top.

Fix:
1. `HashRouter` → `BrowserRouter`.
2. Add `vercel.json` at repo root: `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`
   (the site deploys on Vercel — speed-insights is already wired).
3. Add a `ScrollToHash` component (in `main.jsx` or `App.jsx`): on
   location change, if `location.hash`, `getElementById(hash)?.scrollIntoView()`
   after a rAF; else `scrollTo(0,0)`. Remove BookDemo's manual scroll-to-top
   effect (line 185) once this exists.
4. Nav links on `/` currently use `href="#"` + `preventDefault` + JS scroll —
   replace with real `href="#problem"` etc. (keeps smooth scroll via CSS
   `scroll-behavior`, restores middle-click/copy-link/a11y semantics, and
   deletes ~10 inline handlers).

## C. SEO files (all missing — `public/` has only favicon.svg, icons.svg, logos/)

Canonical domain: **https://consignd.one** (inferred from the team email
domain; confirm with founder before deploy — grep-replace if different).

1. `public/robots.txt`:
   ```
   User-agent: *
   Allow: /
   Sitemap: https://consignd.one/sitemap.xml
   ```
   Do NOT block GPTBot/ClaudeBot/PerplexityBot — being citable by answer
   engines is the GEO strategy.
2. `public/sitemap.xml` — two URLs (`/`, `/book-demo`), lastmod = build date.
3. `public/llms.txt` — plain-text: one-paragraph product definition, ICP
   (freight brokers, 500–15k loads/mo), the audit offer, FAQ digest (reuse doc
   01 §17 answers), contact. This is the highest-leverage GEO artifact.
4. `index.html` head additions:
   - Canonical: `<link rel="canonical" href="https://consignd.one/">`
   - OG/Twitter: `og:title`, `og:description` (doc 01 §1 copy), `og:url`,
     `og:image` → `/og.png` (1200×630; generate a dark card with logo +
     headline — a PowerShell `System.Drawing` script or any image tool is
     fine), `og:type=website`, `twitter:card=summary_large_image`.
   - JSON-LD: `Organization` (name, url, logo, email) + `Service`
     (name: "Consignd Document Audit", provider, areaServed: US,
     serviceType: "Freight document processing") + `FAQPage` mirroring the
     doc-01 FAQ verbatim (answers must match visible page text — Google
     requirement).
5. Per-route titles: two routes only — a 5-line `useEffect(document.title=…)`
   per page is enough; skip react-helmet. Prerendering: optional at this
   scale; if wanted later, `vite-prerender-plugin` on `/` and `/book-demo`.

## D. Dead code / repo hygiene

| Item | Action |
|---|---|
| `hello.py` (repo root) | delete — stray script in a JS repo |
| `Screenshot 2026-04-22 *.png` ×2 (root) | delete or move to a `docs/` folder |
| `dist/` | delete from working tree; gitignore |
| No `.gitignore` (repo not under git yet) | add: `node_modules/`, `dist/`, `.env*`, `*.local`, `.vercel` |
| `src/components/SmoothScroll.jsx` | unused (never imported) — delete |
| `lenis` dependency | unused (only SmoothScroll referenced it) — `npm rm lenis` |
| `src/assets/hero.png`, `react.svg`, `vite.svg` | unused — delete |
| `ogl` dependency + `Grainient.jsx/.css` | delete after doc 02 §9 replaces the static WebGL gradient with CSS |
| `src/App.css` | 1 line; merge into index.css and delete |
| `public/icons.svg`, `public/logos/*` | grep for usage; delete what's unreferenced (logos become unreferenced after §A.1 text-chips) |

## E. Forms & conversion

- `BookDemo.jsx` line 14: contact endpoint falls back to a hardcoded
  `https://project-qay72.vercel.app/api/contact`. Works, but set
  `VITE_CONTACT_ENDPOINT` in Vercel env and keep the hardcoded URL only as
  fallback. Confirm the endpoint's inbox is monitored (`website.inquiries@consignd.one`).
- Add `rel="noopener"` if any external links gain `target="_blank"`.
- Footer links `Privacy / Security / Status` are `href="#"` — dead links on
  every page. Minimum viable: drop `Status`, make `Contact` a `mailto:`, and
  ship a real `/privacy` page (a short honest one-pager: what the form
  collects, that uploaded audit documents are handled under NDA/deleted on
  request). A B2B buyer's security team WILL look for it. `Security` can be a
  section on the privacy page for now.

## F. Performance

1. Background layers: doc 02 §3 deletes six animated blur layers — the biggest
   win. (`filter: blur(80px+)` on animated fixed elements is a continuous
   compositor cost.)
2. Fonts: `index.html` loads Inter (6 weights+italic), JetBrains Mono (2),
   Syne (3). After doc 02: Inter 400/500/600/700, Fraunces 500/600, JBM
   400/500 — drop the rest; add `font-display: swap` (Google Fonts default
   does this via `display=swap` — keep the param).
3. Route-split: `React.lazy(() => import('./pages/BookDemo.jsx'))` +
   `<Suspense>` in main.jsx, so react-calendly (+ its iframe boot) never loads
   on `/`.
4. Counter animation (`App.jsx` lines 295–326): guard with
   `prefers-reduced-motion`; also it only animates numeric `.v` values — the
   non-numeric ones ("Setup", "Mix") are silently skipped, which is fine, but
   don't "fix" it into animating text.
5. Images: any future real screenshots ship as WebP/AVIF with explicit
   `width`/`height`.

## G. Accessibility

- Hamburger on BookDemo (line 233) is missing `aria-expanded` (App.jsx's has
  it — copy over).
- Marquee/voices duplicated tracks: `aria-hidden="true"` on the second copy;
  give the scroll region `role="region"` + `aria-label`.
- `--dim` text (0.45 white on #0B0E13) fails WCAG AA for body sizes — reserve
  it for ≥18px or decorative text; bump small-print to `--muted`.
- Nav link fix in §B.4 restores keyboard/AT semantics for free.
- Add `:focus-visible` styles (2px `--accent` outline) — currently defaults
  only.
- The scroll-progress bar div has `aria-hidden` (good) — keep.

## H. Small correctness items

- `App.jsx` logo link (line 349) is `href="#"` → make it `href="/"`.
- Footer year is hardcoded `© 2026` — fine to keep static, just note it.
- `index.html` `lang="en"` present — good.
- Add `<meta name="theme-color" content="#0B0E13">`.
- Favicon set: current SVG-only; add `favicon.ico` (32px) + apple-touch-icon
  (180px PNG) + `site.webmanifest` for Safari/legacy and PWA metadata.
