# 01 — Website Copy: full audit + exact rewrites

All copy lives in `src/App.jsx` (home) and `src/pages/BookDemo.jsx`.
Work top-to-bottom. Where a rewrite is given in a blockquote, use it verbatim
unless it conflicts with a product fact — then flag, don't improvise.

## The one strategic note before you edit

The site's positioning is already right: **audit-first, honest, anti-hype**
("if the workflow isn't repeatable, we say so"). That candor is the brand and
the differentiator against every "AI copilot" competitor. Every edit below
either (a) removes something that contradicts that candor (fabricated social
proof, an overclaiming meta description, a fake ®), or (b) tightens copy that
buries it. Do not add hype back in.

The single biggest copy sin on this site is **inconsistent CTA language**.
Right now a visitor sees: "Test Your Documents →" (nav), "See the workflow"
(hero ghost), "Start the Document Audit →" (pricing), "Start the Audit →"
(form submit), and the page itself is named "Book Demo." Five names for one
action. **Canonical CTA everywhere: `Run the Document Audit →`.**
Secondary/ghost CTA: `See how it works`. Rename nothing else about the route
(URL `/book-demo` can stay; it's just an address).

---

## 1. `index.html` metadata (lines 7–8) — actively contradicts the site

Current description: *"…synced into your TMS automatically."* The entire site
below it says "human review where the data gets messy" and "review queue, CSV,
import-ready file… where access allows." The meta description is the old
overclaiming positioning. An LLM answer engine or a careful buyer will quote
this line back. Replace:

> `<title>Consignd — The Document Audit for Freight Brokers | Rate Cons, BOLs & PODs to Clean TMS Data</title>`
>
> `<meta name="description" content="Send 25–50 real freight documents. Consignd's five-day Document Audit shows what extracts cleanly, what needs human review, and whether a managed rollout pays for itself — before you buy anything." />`

## 2. Nav labels (`App.jsx` lines 353–357 and 372–376, plus BookDemo nav)

- `Problem` → keep.
- `Sources` → **`What we ingest`**. "Sources" means nothing to a first-time visitor.
- `How it works` → keep.
- `Results` → **`The pilot`**. It links to `#cases`, which contains pilot
  *methodology*, not results. Calling methodology "Results" is exactly the
  overclaim the rest of the site avoids.
- `Pricing` → **`How pricing works`**. The section has no prices (that's fine —
  it's a scoped service), so don't promise a price list in the nav.
- Nav CTA `Test Your Documents →` → `Run the Document Audit →` (both desktop
  and mobile menu, both App.jsx and BookDemo.jsx).

## 3. Hero (`App.jsx` lines 392–425)

**Headline** (`headline` array, line 172): keep — *"Your Dispatchers Should Be
Closing Loads. Not Typing Them."* is the strongest line on the site. No change.

**Eyebrow** (line 393) is 16 words of throat-clearing. Replace:

> `The five-day Document Audit for freight brokers`

**Sub** (line 405) is a 40-word run-on that lists six document types. Replace:

> `Rate cons, BOLs, and PODs arrive by email, WhatsApp, and portal. Consignd turns them into clean, source-linked load records — with a human review step exactly where the data gets messy.`

**CTAs** (lines 407–408): primary → `Run the Document Audit →`; ghost → `See how it works`.

**Stat pills** (lines 412–417): the current four are honest but cryptic
(`"No rip" / Keep your current TMS` reads as a typo). Replace the array:

```js
{ v:'25–50',  l:'Real docs to start' },
{ v:'5 days', l:'To a written verdict' },
{ v:'0',      l:'Changes to your TMS' },
{ v:'100%',   l:'Fields linked to source' },
```

## 4. Story section (lines 429–455) — keep, one fix

The 01→04 narrative is good. Card 04's body repeats the audit pitch that
appears three more times down-page. Replace card 04 body:

> `You don't buy software on day one. You send a two-week sample, and the audit shows whether the repeatable part is big enough to matter.`

## 5. Cinematic section copy (lines 461–464) — keep h2, fix sub

"This is the Consignd motion" is internal jargon. Replace the `.section-sub`:

> `Scroll to watch one load come together: three documents from three channels, extracted into a single record, with the uncertain field flagged for a human — not silently guessed.`

(Also note for doc 02: the scene's third chip says "Invoice match later" —
keep, it's honest scoping.)

## 6. Problem section (lines 517–553) — keep, but source the number

The 7-step chaos grid is the best-written section on the site. Keep all of it.

The `$8,100/mo` / `$97,200 a year` callout is a checkable-sounding claim with
no source. Unverifiable precision reads as fabricated to a broker who knows
their own payroll. Two options, in order of preference:

1. Add a small methodology line under the callout (new element, class `chaos-src`):
   > `Assumes a $52K dispatcher spending ~65% of the day on document entry and verification — the midpoint of what ops managers report. Your audit report recalculates this with your numbers.`
2. If the founder can't stand behind the math, soften the figure to
   `"$70–100K/yr per seat"` and keep the methodology line.

Never delete the callout — concrete money math is what makes this section work.

## 7. Voices section (lines 118–148 data, 556–572 render) — **DELETE. Non-negotiable.**

Ten invented Reddit usernames (`u/Equal-Hair3068`, `u/rate_con_refugee`…) with
fabricated upvote counts, comment counts, and subreddit attributions, dressed
in Reddit's UI (▲ / 💬 / Share). Any buyer who searches one quote finds
nothing; any AI answer engine that ingests this page attributes fake Reddit
posts to real subreddits. This is the single highest-risk element on the site.

**Replacement section** (same slot, keeps the horizontal-scroll visual if
desired, or a simple 3-across quote row): title it honestly as *patterns*, not
people. Section eyebrow: `What ops teams keep telling us`. H2:

> `The bottleneck isn't better software. It's getting trustworthy data into the workflow.`

(the current H2 — keep it, it's good). Then 4–6 cards, each an unattributed,
plainly-labeled paraphrase. Approved card set — use as-is:

- `"We hired two people just to type rate cons into the TMS."` — heard from a brokerage owner, midwest, ~90 loads/day
- `"The inbox is our ETL pipeline and a dispatcher is the orchestration layer."` — heard from a senior dispatcher
- `"We plugged GPT into our email. It invented load numbers."` — heard from a 3PL ops lead
- `"Half our critical updates live in a WhatsApp group. The TMS never sees them."` — heard from a brokerage manager
- `"By the time we reconcile the rate con, the BOL, and the portal, the load already delivered."` — heard from a billing lead

Attribution format: literally the words "heard from a …" — no names, no
handles, no fake engagement numbers. Add one footnote line under the row:
`Paraphrased from discovery conversations and public operator forums. When we have named customers, they'll be here instead.`
That last sentence converts the weakness into the candor brand.

## 8. Sources section (lines 574–597) — keep, retitle

H2 currently: "Start where the mess is costing the most time." — vague.
Eyebrow → `Every channel your carriers actually use`. H2 →

> `If a document can reach you, it can reach us.`

Sub (new, one line): `Email attachments, WhatsApp forwards, portal exports, FTP drops, EDI feeds, scans, and phone photos — order-independent, so the BOL can land before its rate con.`

That last clause is the product's genuinely hardest technical feature
(order-independent matching) and the current site never mentions it. Say it.

## 9. Pipeline / How it works (lines 600–663) — keep, two touches

- Stage 01 illustration line `inbox@ops.yours · 2,411 new` — good.
  `RMX Portal` is an invented brand; rename to the generic `Carrier portal`.
- Stage 03 title `Sync` overpromises vs. its own body copy. Rename to **`Deliver`**.

## 10. AI-ready section (lines 666–736) — keep, one cut, one fix

- The before/after two-card comparison is strong. Keep.
- In the schema mock, `_confidence: 0.998` is comically precise for a marketing
  mock and invites "prove it." Change to `0.97` and the src note to
  `→ 1 field human-verified`.
- The three `ai-use` cards are fine (they were rewritten since the last audit
  and are now grounded). Keep.

## 11. TMS strip (lines 739–751) — copy is fine, marks are a legal problem (doc 04)

Line copy `Works around the TMS stack you already run` — keep, "around" is
honest (it doesn't claim native integrations).

## 12. Cases + Audit sections (lines 753–875) — **merge them**

`#cases` ("What we measure in a pilot") and `#audit-offer` ("The Consignd
Document Audit") are the same pitch twice, four GlowCards of near-identical
copy ~one screen apart. This is the main reason the page feels long and
repetitive. Merge into ONE section (`#audit`), keeping:

- Eyebrow: `Start with the audit`
- H2: `The Document Audit: a five-day diagnostic on your real paperwork.`
- Sub: current `#audit-offer` sub (line 839) — keep verbatim, it's good.
- Card A = current "What we do in 5 days" card (lines 842–856) unchanged.
- Card B = current "What you get back" card (lines 858–872) unchanged —
  its closing line ("we tell you that directly instead of forcing a software
  story") is the best trust copy on the site.
- Delete both cards from the old `#cases` section entirely; retarget the nav
  link `#cases` → `#audit`.

## 13. Pricing section (lines 877–907) — keep structure, add the one number buyers need

A scoped service can skip a price list, but zero anchoring reads as "expensive
and evasive." Add ONE line to the bullet list (position 2):

> `Audit is a flat fee, credited against setup if you roll out`

(If the founder hasn't decided the credit policy — flag it in the PR
description and ship without this bullet. Do not invent a dollar figure.)

## 14. Final CTA (lines 909–917) — replace with the strongest close

Current close repeats the audit mechanics a fourth time. Replace H2 + p:

> H2: `Stop paying dispatchers to type. Start paying them to close.`
> p: `Run the five-day Document Audit on 25–50 real documents. You'll know what extracts cleanly, what needs a human, and whether rollout is worth it — before you spend a dollar on software.`

Button: `Run the Document Audit →`.

## 15. Footer (lines 919–931)

- `Privacy / Security / Status / Contact` all point to `href="#"` — dead. Doc 04 handles links; copy-wise: drop `Status` (there is no status page; a fake one is another candor violation). `Contact` → `mailto:` (address in BookDemo.jsx line 13).
- `DataCore®` → `DataCore™` unless a registration certificate actually exists (see doc 04, legal).

## 16. `/book-demo` page (`BookDemo.jsx`)

- Page copy is largely good and consistent with the audit positioning. Keep.
- H1 (line 260): fine. Sub: fine.
- Submit button `Start the Audit →` → `Run the Document Audit →` (consistency).
- Success copy (line 95–96): fine.
- The eyebrow "Currently running five-day document audits" with a pulsing green
  dot is borderline fake-scarcity theater but factually fine — keep only if true.

## 17. NEW: FAQ section (add before Final CTA) — the GEO workhorse

Question-shaped H3s, definitional first sentences (this is what LLM answer
engines extract). Add with `FAQPage` JSON-LD (doc 04 wires the schema). Approved Q&A:

1. **What is the Consignd Document Audit?** A five-day paid diagnostic where a freight broker sends 25–50 real documents (rate confirmations, BOLs, PODs) and receives a written report showing what extracts cleanly, what needs human review, and whether a managed rollout is commercially worth it.
2. **Do I have to replace my TMS?** No. Consignd works around your existing TMS. Clean records are delivered as a review queue, CSV, import-ready file, or written into your TMS workflow where access allows.
3. **What documents does Consignd handle?** Rate confirmations, bills of lading, proof-of-delivery documents, and carrier invoices — as PDFs, scans, phone photos, email bodies, WhatsApp forwards, portal exports, FTP drops, or EDI feeds.
4. **What happens when the AI isn't sure?** Low-confidence fields are flagged and routed to a human review queue. Nothing is silently guessed, and every field links back to the exact source document it came from.
5. **What if documents arrive out of order?** Matching is order-independent: a BOL can arrive days before its rate con. Whichever document lands first seeds the load; later documents match into it. Unmatched documents go to a triage queue — never dropped, never force-matched.
6. **How much does it cost?** The audit is a flat fee. If the workflow proves repeatable, rollout is a one-time setup plus monthly managed processing priced by document volume and complexity. If it doesn't prove out, we tell you that in the report.

## Voice & style rules for any copy you write beyond the above

- Sentence case for headings. No em-dash chains; one dash max per sentence.
- Concrete nouns from freight (rate con, BOL, POD, MC number, detention,
  accessorial, lane) — never "documents" when you can say which document.
- Numbers over adjectives; "5 days" beats "fast."
- The brand voice is a calm operator, not a founder on demo day. Banned words:
  revolutionary, supercharge, unleash, seamless, magic, effortless, 10x,
  game-changing, AI-powered (as a headline adjective).
- Every claim must be survivable in a room with a skeptical freight broker who
  runs 90 loads a day.
