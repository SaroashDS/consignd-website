import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import Logo from './components/Logo'
import Aurora from './components/Aurora'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

/* ─── Small icons ───────────────────────────────────────────────── */
const IcoMail = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 8 10 6 10-6"/>
  </svg>
)
const IcoChat = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 01-8.5 8.5 8.5 8.5 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 018.5-8.5 8.38 8.38 0 018.5 8.5z"/>
  </svg>
)
const IcoGlobe = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
)
const IcoCamera = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/>
  </svg>
)
const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M1.5 5l2.5 2.5L8.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

/* ─── Voices — verbatim quotes from the ICP doc, cleared for website use ── */
const voices = [
  { q: '“Half the time I don’t even get to copy paste.”', src: 'freight ops professional, discovery conversation' },
  { q: '“I mutter ‘what the f**k does that say’ in a day.”', src: 'freight ops professional, on scanned BOLs' },
  { q: '“Feels like we’re trying to build a skyscraper on quicksand.”', src: 'freight ops professional, on TMS data quality' },
  { q: '“The biggest time sink isn’t decision-making — it’s cleaning and reconciling data from 5 different sources before you can even trust it.”', src: 'freight ops professional, discovery conversation' },
  { q: '“QuickBooks integration is clunky and wrought with problems.”', src: 'AscendTMS user, public review' },
  { q: '“Filters don’t provide flexibility for business-specific reports.”', src: 'Rose Rocket user, Capterra' },
]

/* TMS platforms with mature public APIs — text + neutral monogram only
   (logo lookalikes were removed for trademark reasons; don't reintroduce) */
const TMS_ENTRIES = ['Rose Rocket', 'Alvys', 'Turvo', 'Tai TMS', 'McLeod']

/* ─── App ───────────────────────────────────────────────────────── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const flowRef = useRef(null)

  useEffect(() => {
    document.title = 'Consignd — The Free Document Audit for Freight Brokers | Rate Cons, BOLs & PODs to Clean TMS Data'
  }, [])

  /* mark JS available — reveals only hide content when this class exists */
  useEffect(() => {
    document.documentElement.classList.add('js')
    return () => document.documentElement.classList.remove('js')
  }, [])

  /* nav scroll state */
  useEffect(() => {
    const nav = document.getElementById('nav')
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* close mobile menu on scroll */
  useEffect(() => {
    if (!menuOpen) return
    const close = () => setMenuOpen(false)
    window.addEventListener('scroll', close, { passive: true, once: true })
    return () => window.removeEventListener('scroll', close)
  }, [menuOpen])

  /* scroll-reveal (content is visible without JS; .js class gates the hide).
     rAF-throttled rect check instead of IntersectionObserver: never skips an
     element no matter how fast the user scrolls. */
  useEffect(() => {
    let pending = [...document.querySelectorAll('.reveal')]
    let ticking = false
    const check = () => {
      ticking = false
      const limit = window.innerHeight - 20
      pending = pending.filter(el => {
        if (el.getBoundingClientRect().top < limit) { el.classList.add('in'); return false }
        return true
      })
      if (!pending.length) window.removeEventListener('scroll', onScroll)
    }
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(check) }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    check()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── DataFlow: scroll-scrubbed line drawing. 1:1 with scroll, no pinning,
       fully drawn by default so reduced-motion / no-JS shows the finished state. ── */
  useLayoutEffect(() => {
    const root = flowRef.current
    if (!root) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const ctx = gsap.context(() => {
      /* draw every connector path as it scrolls through the viewport */
      root.querySelectorAll('.flow-path').forEach((p) => {
        const len = p.getTotalLength()
        gsap.fromTo(p,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: p.closest('.flow-connector'),
              start: 'top 88%',
              end: 'bottom 50%',
              scrub: 0.5,
            },
          })
      })

      /* chaos cards settle into place as the section arrives */
      root.querySelectorAll('.src-card').forEach((card) => {
        gsap.to(card, {
          x: 0, y: 0, rotate: 0,
          ease: 'none',
          scrollTrigger: { trigger: '.flow-sources', start: 'top 92%', end: 'top 45%', scrub: 0.5 },
        })
      })

      /* extracted rows assemble inside the DataCore card */
      gsap.fromTo('.dc-row',
        { opacity: 0, y: 8 },
        {
          opacity: 1, y: 0, stagger: 0.1, ease: 'none',
          scrollTrigger: { trigger: '.dc-card', start: 'top 85%', end: 'top 40%', scrub: 0.5 },
        })

      /* orange pulse rides the review connector */
      const gatePath = root.querySelector('#gatePath')
      const pulse = root.querySelector('.flow-pulse')
      if (gatePath && pulse) {
        gsap.to(pulse, {
          motionPath: { path: gatePath, align: gatePath, alignOrigin: [0.5, 0.5] },
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.flow-connector-gate', start: 'top 88%', end: 'bottom 50%', scrub: 0.5 },
        })
      }

      /* output cards land */
      gsap.fromTo('.flow-out .flow-card',
        { opacity: 0, y: 22 },
        {
          opacity: 1, y: 0, stagger: 0.15, ease: 'none',
          scrollTrigger: { trigger: '.flow-out', start: 'top 92%', end: 'top 55%', scrub: 0.5 },
        })
    }, root)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120)
    return () => window.clearTimeout(id)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/* ── ambient background: aurora + grid + tracer beams ── */}
      <div className="bg-fx" aria-hidden="true">
        <Aurora colorStops={['#1E3A8A', '#3B82F6', '#60A5FA']} amplitude={1.0} blend={0.5} speed={0.5} />
        <div className="bg-grid" />
        <div className="bg-beam bg-beam-v" />
        <div className="bg-beam bg-beam-v2" />
        <div className="bg-beam bg-beam-h" />
      </div>

      {/* ── Nav ── */}
      <nav className="nav" id="nav">
        <div className="nav-inner">
          <a href="/" className="logo" aria-label="Consignd DataCore">
            <Logo />
          </a>
          <div className="nav-links">
            <a href="#flow">How it works</a>
            <a href="#problem">The problem</a>
            <a href="#voices">Voices</a>
            <a href="#audit">The audit</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="nav-right">
            <Link to="/book-demo" className="btn btn-primary nav-cta">Start the free audit →</Link>
            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
        <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
          <a href="#flow" onClick={closeMenu}>How it works</a>
          <a href="#problem" onClick={closeMenu}>The problem</a>
          <a href="#voices" onClick={closeMenu}>Voices</a>
          <a href="#audit" onClick={closeMenu}>The audit</a>
          <a href="#faq" onClick={closeMenu}>FAQ</a>
          <Link to="/book-demo" className="btn btn-primary" style={{width:'100%',justifyContent:'center',marginTop:'8px'}} onClick={closeMenu}>Start the free audit →</Link>
        </div>
      </nav>

      {/* ══════════════ HERO ══════════════ */}
      <section className="hero">
        <div className="wrap hero-content">
          <span className="hero-eyebrow">
            <span className="dot"></span>The free five-day Document Audit for freight brokers
          </span>
          <h1>
            {[
              ['Your'], ['dispatchers'], ['should'], ['be'],
              ['closing', 'em'], ['loads.', 'em'],
              ['Not'], ['typing'], ['them.'],
            ].map(([w, cls], i) => (
              <Fragment key={i}>
                <span className={`w${cls ? ' em' : ''}`} style={{ '--i': i }}>{w}</span>
                {' '}
              </Fragment>
            ))}
          </h1>
          <p className="sub">
            Rate cons, BOLs, and PODs arrive by email, WhatsApp, and portal.
            Consignd DataCore turns them into clean, source-linked load records.
            A person reviews exactly the fields that need it.
          </p>
          <div className="hero-ctas">
            <Link to="/book-demo" className="btn btn-primary btn-lg">Start the free audit →</Link>
            <a href="#flow" className="btn btn-ghost btn-lg">See how it works</a>
          </div>

          <div className="stat-row">
            {[
              ['Free',  'The audit costs nothing'],
              ['5 days', 'To a written verdict'],
              ['25–50',  'Real docs is enough'],
              ['0',      'Changes to your TMS'],
            ].map(([v, l]) => (
              <div key={l} className="stat">
                <div className="v">{v}</div>
                <div className="l">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ DATAFLOW — chaos in, order out ══════════════ */}
      <section id="flow" className="flow-section" ref={flowRef}>
        <div className="wrap">
          <div className="reveal flow-head">
            <span className="kicker">How it works</span>
            <h2>Chaos in. Order out.</h2>
            <p className="section-sub">
              Follow one load through the layer: four documents from four channels,
              one governed record, one human decision where the data disagrees.
            </p>
          </div>

          <div className="flow">
            {/* Stage 1 — scattered sources */}
            <div className="flow-stage-label">01 · Documents arrive anywhere</div>
            <div className="flow-sources">
              {[
                { ico:<IcoMail />,   chan:'email',    name:'rate_con.pdf',        a:'Laredo → Chicago',   b:'$2,850 · MC-884213' },
                { ico:<IcoChat />,   chan:'whatsapp', name:'pod_photo.jpg',       a:'Delivered 04/25',    b:'Signed · 14:06' },
                { ico:<IcoGlobe />,  chan:'portal',   name:'carrier_invoice.pdf', a:'Accessorial added',  b:'$3,025 · $175 detention' },
                { ico:<IcoCamera />, chan:'photo',    name:'bol_scan.jpg',        a:'Auto Parts',         b:'38,200 lb' },
              ].map((d, i) => (
                <div key={d.name} className={`flow-card src-card src-card-${i + 1}`}>
                  <div className="src-top"><span className="src-ico">{d.ico}</span><span className="src-chan">{d.chan}</span></div>
                  <div className="src-name">{d.name}</div>
                  <div className="src-meta">{d.a}</div>
                  <div className="src-meta dim">{d.b}</div>
                </div>
              ))}
            </div>

            {/* Connector: 4 → 1 */}
            <div className="flow-connector flow-connector-fan" aria-hidden="true">
              <svg viewBox="0 0 800 130" preserveAspectRatio="none">
                <path className="flow-path" d="M100 0 C100 85, 400 45, 400 130" />
                <path className="flow-path" d="M300 0 C300 75, 400 55, 400 130" />
                <path className="flow-path" d="M500 0 C500 75, 400 55, 400 130" />
                <path className="flow-path" d="M700 0 C700 85, 400 45, 400 130" />
              </svg>
              <div className="vline" />
            </div>

            {/* Stage 2 — DataCore */}
            <div className="flow-stage-label">02 · One record, every field source-linked</div>
            <div className="flow-card dc-card">
              <div className="dc-head">
                <Logo />
                <span className="dc-load">load CN-48219 · Laredo, TX → Chicago, IL</span>
              </div>
              {[
                ['pickup',     'Laredo, TX · 04/23 08:00',   '→ rate_con.pdf'],
                ['delivery',   'Chicago, IL · 04/25 14:00',  '→ rate_con.pdf'],
                ['commodity',  'Auto Parts · 38,200 lb',     '→ bol_scan.jpg'],
                ['carrier_mc', 'MC-884213',                  '→ email'],
              ].map(([f, v, s]) => (
                <div className="dc-row" key={f}>
                  <b>{f}</b><span>{v}</span><span className="src">{s}</span>
                </div>
              ))}
              <div className="dc-row flagged">
                <b>rate_usd</b><span>2,850.00 ≠ 3,025.00</span><span className="src">→ 2 sources</span>
              </div>
              <div className="dc-foot">4 of 5 fields extracted clean · 1 flagged for a person</div>
            </div>

            {/* Connector: through the review gate */}
            <div className="flow-connector flow-connector-gate" aria-hidden="true">
              <svg viewBox="0 0 800 110" preserveAspectRatio="none">
                <path id="gatePath" className="flow-path" d="M400 0 L400 110" />
              </svg>
              <span className="flow-pulse" />
            </div>

            {/* Stage 3 — human review gate */}
            <div className="flow-stage-label">03 · A person decides, not a guess</div>
            <div className="flow-card gate-card">
              <div className="gate-title">Human review · rate mismatch</div>
              <p className="gate-body">
                The rate con shows $2,850. The carrier invoice shows $3,025.
                The difference is a $175 detention accessorial added after delivery.
              </p>
              <div className="gate-actions">
                <span className="act primary">Accept rate con</span>
                <span className="act">Accept invoice</span>
                <span className="act">Send to triage</span>
              </div>
            </div>

            {/* Connector: 1 → 2 */}
            <div className="flow-connector flow-connector-split" aria-hidden="true">
              <svg viewBox="0 0 800 120" preserveAspectRatio="none">
                <path className="flow-path" d="M400 0 C400 70, 195 55, 195 120" />
                <path className="flow-path" d="M400 0 C400 70, 605 55, 605 120" />
              </svg>
              <div className="vline" />
            </div>

            {/* Stage 4 — outputs */}
            <div className="flow-stage-label">04 · Delivered where your team works</div>
            <div className="flow-out">
              <div className="flow-card out-card">
                <div className="out-title">Your TMS</div>
                {[
                  ['→ Review queue', 'ready'],
                  ['→ CSV / import file', 'clean'],
                  ['→ TMS write-back', 'where supported'],
                ].map(([k, v]) => (
                  <div className="out-row" key={k}><b>{k}</b><span>{v}</span></div>
                ))}
                <div className="out-foot">Works around {TMS_ENTRIES.slice(0, 3).join(', ')} and the rest of your stack.</div>
              </div>
              <div className="flow-card out-card">
                <div className="out-title">Data warehouse <span className="out-badge">AI-ready</span></div>
                {[
                  ['every field', 'linked to its source doc'],
                  ['every load', 'queryable history'],
                  ['exceptions', 'missing BOL · rate mismatch'],
                ].map(([k, v]) => (
                  <div className="out-row" key={k}><b>{k}</b><span>{v}</span></div>
                ))}
                <div className="out-foot">The data layer later automation builds on.</div>
              </div>
            </div>
          </div>

          <p className="flow-caption reveal">
            Deterministic where the data allows it. A person reviews it where the data doesn’t.
          </p>
        </div>
      </section>

      {/* ══════════════ PROBLEM ══════════════ */}
      <section id="problem">
        <div className="wrap">
          <div className="reveal">
            <span className="kicker">The manual chaos</span>
            <h2>Every load becomes a 7-step typing exercise.</h2>
            <p className="section-sub">
              The load doesn’t start in your TMS. It starts as a rate con in an inbox,
              a BOL from a driver, or a POD photo. Your team retypes all of it by hand
              before the system ever sees it.
            </p>
          </div>

          <ol className="steps reveal">
            {[
              ['Receive',  'Rate con lands in an inbox, a WhatsApp thread, or a portal.'],
              ['Download', 'Open attachment, save to desktop, rename to find it later.'],
              ['Read',     'Hunt for pickup, delivery, commodity, reference numbers.'],
              ['Type',     'Rekey 40+ fields into the TMS, one character at a time.'],
              ['Verify',   'Cross-check the rate, weight, and MC against the rate con.'],
              ['Correct',  'Fix the typos you didn’t catch. Call the broker back.'],
              ['Repeat',   'Do it all again. 80 times. Before lunch.'],
            ].map(([t, d], i) => (
              <li key={t}>
                <span className="step-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="step-t">{t}</span>
                <span className="step-d">{d}</span>
              </li>
            ))}
          </ol>

          <div className="cost reveal">
            <div className="cost-big">$90K–$220K<span>/yr</span></div>
            <div className="cost-msg">
              Estimated cost of manual document intake at 1,000 loads a week:
              staff time on entry, carrier follow-ups on exceptions, and the
              downstream billing corrections it causes.
            </div>
          </div>
          <p className="cost-src reveal">
            Based on Consignd’s internal ROI model for a 1,000-load/week broker: $55K–$130K in staff time,
            $15K–$30K in exception handling, $20K–$60K in downstream correction work.
            Your audit report recalculates this with your numbers.
          </p>
        </div>
      </section>

      {/* ══════════════ VOICES ══════════════ */}
      <section id="voices">
        <div className="wrap">
          <div className="reveal">
            <span className="kicker">Voices</span>
            <h2>Every broker we talk to has the same complaint.</h2>
            <p className="section-sub">
              Too many document formats, too many places to check, too much
              tribal knowledge nobody wrote down.
            </p>
          </div>
          <div className="voices-grid reveal">
            {voices.map((v) => (
              <figure className="voice" key={v.q}>
                <blockquote>{v.q}</blockquote>
                <figcaption>{v.src}</figcaption>
              </figure>
            ))}
          </div>
          <p className="voices-note reveal">
            Quoted from freight operations professionals in discovery conversations and public
            TMS review sites. When we have named customers, they’ll be here instead.
          </p>
          <div className="tms-strip reveal">
            <span className="tms-label">Works around the TMS you already run</span>
            <div className="tms-marquee" role="list" aria-label="Supported TMS platforms">
              <div className="tms-track">
                {[...TMS_ENTRIES, ...TMS_ENTRIES, ...TMS_ENTRIES].map((t, i) => (
                  <span className="tms-chip" role={i < TMS_ENTRIES.length ? 'listitem' : 'presentation'} aria-hidden={i >= TMS_ENTRIES.length} key={i}>
                    <b className="tms-ico" aria-hidden="true">{t[0]}</b>{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ AUDIT ══════════════ */}
      <section id="audit">
        <div className="wrap">
          <div className="reveal">
            <span className="kicker">Start with the free audit</span>
            <h2>Send 25–50 real documents. Get a verdict in five days.</h2>
            <p className="section-sub">
              Send documents from the last two weeks of operations. We classify them,
              extract the fields, map the variation, and show you where your team is
              still burning time by hand. At no cost, with no commitment to move forward.
            </p>
          </div>

          <div className="audit-card reveal">
            <ul>
              {[
                'Free five-day Document Audit on 25–50 of your real documents',
                'Written findings: document mix, extraction quality, and review burden',
                'A TMS-ready structured data sample built from your own workflow',
                'If rollout fits: one-time setup, then monthly managed processing priced by volume and complexity',
                'If it doesn’t fit: we tell you that in the report, and you’ve spent nothing',
              ].map((item) => (
                <li key={item}><span className="chk"><CheckIcon /></span>{item}</li>
              ))}
            </ul>
            <Link to="/book-demo" className="btn btn-primary btn-lg">Start the free audit →</Link>
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section id="faq">
        <div className="wrap">
          <div className="reveal">
            <span className="kicker">FAQ</span>
            <h2>What ops leaders ask before sending documents.</h2>
          </div>
          <div className="faq-list reveal">
            {[
              ['What is the Consignd Document Audit?', 'A free five-day diagnostic. You send 25–50 real documents (rate confirmations, BOLs, PODs) and receive a written report showing what extracts cleanly, what needs human review, and whether a managed rollout is commercially worth it.'],
              ['Do I have to replace my TMS?', 'No. Consignd works around your existing TMS. Clean records are delivered as a review queue, CSV, import-ready file, or written into your TMS workflow where access allows.'],
              ['What documents does Consignd handle?', 'Rate confirmations, bills of lading, proof-of-delivery documents, and carrier invoices — as PDFs, scans, phone photos, email bodies, WhatsApp forwards, portal exports, FTP drops, or EDI feeds.'],
              ['What happens when extraction isn’t sure?', 'Low-confidence fields are flagged and routed to a human review queue. Nothing is silently guessed, and every field links back to the exact source document it came from.'],
              ['What if documents arrive out of order?', 'Matching is order-independent: a BOL can arrive days before its rate con. Whichever document lands first seeds the load; later documents match into it. Unmatched documents go to a triage queue — never dropped, never force-matched.'],
              ['How much does it cost?', 'The five-day Document Audit is free. No engagement fee, no commitment, no pitch at the end. If the workflow proves repeatable, rollout is a one-time setup plus monthly managed processing priced by document volume and complexity. If it doesn’t prove out, we tell you that in the report.'],
            ].map(([q, a], i) => (
              <details className="faq-item" key={q} open={i === 0}>
                <summary>{q}</summary>
                <div className="faq-a"><p>{a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FINAL CTA ══════════════ */}
      <section className="final" id="cta">
        <div className="wrap reveal">
          <h2>Stop paying dispatchers to type. Start paying them to close.</h2>
          <p>
            Run the free five-day Document Audit on 25–50 real documents.
            You’ll know what extracts cleanly, what needs a person, and whether
            rollout is worth it. Before you spend a dollar.
          </p>
          <Link to="/book-demo" className="btn btn-primary btn-lg">Start the free audit →</Link>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer>
        <div className="wrap foot">
          <a href="/" className="logo" aria-label="Consignd DataCore"><Logo /></a>
          <div className="foot-links">
            <Link to="/privacy">Privacy &amp; Security</Link>
            <a href="mailto:website.inquiries@consignd.one">Contact</a>
          </div>
          <div>© 2026 Consignd, Inc. · DataCore™</div>
        </div>
      </footer>
    </>
  )
}
