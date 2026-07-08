import { useEffect, useLayoutEffect, useRef, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GlowCard, { GLOW_BLUE, GLOW_ORANGE } from './components/GlowCard'
import Logo from './components/Logo'

gsap.registerPlugin(ScrollTrigger)

/* ─── CheckIcon ─────────────────────────────────────────────────── */
const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M1.5 5l2.5 2.5L8.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

/* ─── Source pill icons ─────────────────────────────────────────── */
const IcoMail = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m2 8 10 6 10-6"/>
  </svg>
)
const IcoWhatsApp = () => (
  <svg width="15" height="15" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="15" fill="#25D366"/>
    <path d="M23 19.4c-.4-.2-2.4-1.2-2.8-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.2 1.5-.2.3-.5.3-.9.1-.4-.2-1.7-.6-3.3-2-1.2-1.1-2-2.4-2.2-2.8-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.4-.7.1-.3 0-.5-.1-.7-.1-.2-.9-2.2-1.2-3-.3-.8-.6-.6-.9-.6h-.7c-.3 0-.7.1-1.1.5C8.5 9.3 7.5 10.5 7.5 13c0 2.5 1.4 4.9 1.6 5.2.2.3 2.7 4.3 6.7 6 .9.4 1.7.6 2.3.8.9.3 1.8.2 2.5.1.7-.1 2.2-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.2-.4-.3-.9-.5z" fill="white"/>
  </svg>
)
const IcoGlobe = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
)
const IcoFTP = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="6" rx="8" ry="3"/>
    <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/>
    <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/>
    <path d="M16 9.5V7M16 16.5V14"/>
  </svg>
)
const IcoEDI = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 1 21 5 17 9"/>
    <path d="M3 11V9a4 4 0 014-4h14"/>
    <polyline points="7 23 3 19 7 15"/>
    <path d="M21 13v2a4 4 0 01-4 4H3"/>
  </svg>
)
const IcoScanDoc = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <path d="M2 16h20" strokeDasharray="3 2" strokeWidth="1.5"/>
    <path d="M8 12h8M8 17h5" strokeWidth="1.4"/>
  </svg>
)
const IcoCamera = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
)

/* ─── Voices data — unattributed paraphrases from discovery calls and
       public operator forums. Never fabricate named sources here. ──── */
const voices = [
  { q:'“We hired two people just to type rate cons into the TMS.”',                                          src:'heard from a brokerage owner, midwest, ~90 loads/day' },
  { q:'“The inbox is our ETL pipeline and a dispatcher is the orchestration layer.”',                        src:'heard from a senior dispatcher' },
  { q:'“We plugged GPT into our email. It invented load numbers.”',                                          src:'heard from a 3PL ops lead' },
  { q:'“Half our critical updates live in a WhatsApp group. The TMS never sees them.”',                      src:'heard from a brokerage manager' },
  { q:'“By the time we reconcile the rate con, the BOL, and the portal, the load already delivered.”',       src:'heard from a billing lead' },
]

function VoiceCard({ v }) {
  return (
    <div className="voice">
      <div className="voice-q">{v.q}</div>
      <div className="voice-src">{v.src}</div>
    </div>
  )
}

/* ─── Sources data ──────────────────────────────────────────────── */
const srcPills = [
  { ico:<IcoMail />,     label:'Email Attachments',      icoStyle:{} },
  { ico:<IcoWhatsApp />, label:'WhatsApp Forwards',      icoStyle:{background:'rgba(37,211,102,0.14)',borderColor:'rgba(37,211,102,0.35)'} },
  { ico:<IcoGlobe />,    label:'Carrier Portals',        icoStyle:{} },
  { ico:<IcoFTP />,      label:'FTP Drops',              icoStyle:{background:'rgba(249,115,22,0.14)',borderColor:'rgba(249,115,22,0.3)',color:'#f97316'} },
  { ico:<IcoEDI />,      label:'EDI Feeds',              icoStyle:{background:'rgba(124,58,237,0.14)',borderColor:'rgba(124,58,237,0.3)',color:'#a78bfa'} },
  { ico:<IcoScanDoc />,  label:'Scanned PDFs',           icoStyle:{background:'rgba(239,68,68,0.14)',borderColor:'rgba(239,68,68,0.3)',color:'#f87171'} },
  { ico:<IcoCamera />,   label:'Photographed Documents', icoStyle:{background:'rgba(245,158,11,0.14)',borderColor:'rgba(245,158,11,0.3)',color:'#fbbf24'} },
]

/* Text-only chips: naming TMS platforms is nominative fair use; rendering
   lookalike logos is not. */
const TMS_ENTRIES = ['Rose Rocket', 'Alvys', 'Turvo', 'McLeod', 'Tai TMS', 'AscendTMS']

/* ─── Hero headline — only "Closing Loads." gets the gradient ───── */
const headline = [
  { text:'Your',        cls:'plain' },
  { text:'Dispatchers', cls:'plain' },
  { text:'Should',      cls:'plain' },
  { text:'Be',          cls:'plain' },
  { text:'Closing',     cls:'accent' },
  { text:'Loads.',      cls:'accent' },
  { text:'Not',         cls:'plain' },
  { text:'Typing',      cls:'plain' },
  { text:'Them.',       cls:'plain' },
]

/* ─── App ───────────────────────────────────────────────────────── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const cinematicRef = useRef(null)

  useEffect(() => {
    document.title = 'Consignd — The Document Audit for Freight Brokers | Rate Cons, BOLs & PODs to Clean TMS Data'
  }, [])

  /* nav scroll */
  useEffect(() => {
    const nav = document.getElementById('nav')
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40)
      const progress = document.getElementById('scroll-progress')
      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight
        progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
      }
    }
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

  /* scroll-reveal */
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' })
    document.querySelectorAll('.reveal, .reveal-scale, .stagger-group').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  /* hero stats stagger */
  useEffect(() => {
    const el = document.getElementById('heroStats')
    if (el) setTimeout(() => el.classList.add('in'), 500)
  }, [])

  /* pinned cinematic workflow */
  useLayoutEffect(() => {
    const root = cinematicRef.current
    if (!root) return undefined
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return undefined

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=1400',
          scrub: 0.7,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      tl.fromTo('.cin-doc',
        { y: 70, opacity: 0, rotate: -5, filter: 'blur(10px)' },
        { y: 0, opacity: 1, rotate: 0, filter: 'blur(0px)', stagger: 0.08, duration: 0.7, ease: 'power3.out' }
      )
      .to({}, { duration: 0.25 })
      .to('.cin-doc', { x: -48, y: -10, rotate: -2, stagger: 0.04, duration: 0.75, ease: 'power2.inOut' })
      .fromTo('.cin-beam', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.45, ease: 'power2.out' }, '<25%')
      .fromTo('.cin-field', { x: 50, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out' }, '<35%')
      .to('.cin-doc', { opacity: 0.34, scale: 0.94, duration: 0.5 }, '<20%')
      .to({}, { duration: 0.2 })
      .fromTo('.cin-review', { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '<30%')
      .fromTo('.cin-progress-fill', { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'none' }, '<')
      .fromTo('.cin-final-chip', { y: 24, opacity: 0, scale: 0.94 }, { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.65, ease: 'back.out(1.4)' }, '<45%')
    }, root)

    return () => ctx.revert()
  }, [])

  /* refresh scroll measurements after scene layout settles */
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120)
    return () => window.clearTimeout(id)
  }, [])

  /* case metric counters */
  useEffect(() => {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        const el = e.target
        const raw = el.textContent.trim()
        const m = raw.match(/^(\D*)([\d.,]+)(\D*)$/)
        if (!m) { cio.unobserve(el); return }
        const [, prefix, numStr, suffix] = m
        const final = parseFloat(numStr.replace(/,/g, ''))
        const hasDecimal = numStr.includes('.')
        const isMoney = prefix.includes('$')
        const start = performance.now()
        const tick = (now) => {
          const t = Math.min(1, (now - start) / 1400)
          const eased = 1 - Math.pow(1 - t, 3)
          const val = final * eased
          const str = isMoney && final >= 1000 ? `${Math.round(val / 1000)}K`
            : hasDecimal ? val.toFixed(1)
            : Math.round(val).toLocaleString()
          el.textContent = prefix + str + suffix
          if (t < 1) requestAnimationFrame(tick)
          else el.textContent = raw
        }
        el.textContent = prefix + '0' + suffix
        requestAnimationFrame(tick)
        cio.unobserve(el)
      })
    }, { threshold: 0.5 })
    document.querySelectorAll('.case-metric .v').forEach(c => cio.observe(c))
    return () => cio.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/* ── Quiet background: one wash, one static grid, grain ── */}
      <div className="bg-fixed">
        <div className="bg-wash"></div>
        <div className="bg-grid"></div>
        <div className="bg-noise"></div>
      </div>
      <div className="scroll-progress" id="scroll-progress" aria-hidden="true"></div>

      {/* ── Nav ── */}
      <nav className="nav" id="nav">
        <div className="nav-inner">
          <a href="/" className="logo" aria-label="Consignd DataCore">
            <Logo />
          </a>
          <div className="nav-links">
            <a href="#problem">Problem</a>
            <a href="#sources">What we ingest</a>
            <a href="#how">How it works</a>
            <a href="#audit">The pilot</a>
            <a href="#pricing">How pricing works</a>
          </div>
          <div className="nav-right">
            <Link to="/book-demo" className="btn btn-primary nav-cta">Run the Document Audit →</Link>
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
          <a href="#problem" onClick={closeMenu}>Problem</a>
          <a href="#sources" onClick={closeMenu}>What we ingest</a>
          <a href="#how" onClick={closeMenu}>How it works</a>
          <a href="#audit" onClick={closeMenu}>The pilot</a>
          <a href="#pricing" onClick={closeMenu}>How pricing works</a>
          <Link to="/book-demo" className="btn btn-primary" style={{width:'100%',justifyContent:'center',marginTop:'8px'}} onClick={closeMenu}>Run the Document Audit →</Link>
        </div>
      </nav>

      {/* ══════════════ HERO ══════════════ */}
      <section className="hero">
        <div className="wrap hero-content">
          <span className="hero-eyebrow">
            <span className="dot"></span>The five-day Document Audit for freight brokers
          </span>

          <h1>
            {headline.map((w, i) => (
              <Fragment key={i}>
                <span className={`word w${i+1}`}><span className="word-inner"><span className={w.cls}>{w.text}</span></span></span>
                {i < headline.length - 1 ? ' ' : ''}
              </Fragment>
            ))}
          </h1>

          <p className="sub">Rate cons, BOLs, and PODs arrive by email, WhatsApp, and portal. Consignd turns them into clean, source-linked load records — with a human review step exactly where the data gets messy.</p>
          <div className="hero-ctas">
            <Link to="/book-demo" className="btn btn-primary btn-lg">Run the Document Audit →</Link>
            <a href="#how" className="btn btn-ghost btn-lg">See how it works</a>
          </div>

          <div className="stat-pills stagger-group" id="heroStats">
            {[
              { v:'25–50',  l:'Real docs to start' },
              { v:'5 days', l:'To a written verdict' },
              { v:'0',      l:'Changes to your TMS' },
              { v:'100%',   l:'Fields linked to source' },
            ].map((s, i) => (
              <div key={i} className="card stagger-item">
                <div className="stat-pill-inner">
                  <div className="v"><em>{s.v}</em></div>
                  <div className="l">{s.l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ PRODUCT FRAME — the portal, shown not described ══════ */}
      <section className="pframe-section">
        <div className="wrap reveal-scale">
          <div className="pframe" role="img" aria-label="Consignd portal data card: extracted load fields with one flagged rate mismatch awaiting review">
            <div className="pframe-bar">
              <span className="dots" aria-hidden="true"><i /><i /><i /></span>
              <span className="url">portal.consignd.one / review / DEMO-48219</span>
              <span className="env">demo data</span>
            </div>
            <div className="pframe-body">
              <div className="pframe-main">
                <div className="pframe-load">
                  <b>load DEMO-48219 · Laredo, TX → Chicago, IL</b>
                  <span className="pframe-status">needs review</span>
                </div>
                {[
                  ['pickup', 'Laredo, TX · 04/23 08:00', 'rate_con.pdf'],
                  ['delivery', 'Chicago, IL · 04/25 14:00', 'rate_con.pdf'],
                  ['commodity', 'Auto Parts · 38,200 lb', 'whatsapp'],
                  ['carrier_mc', 'MC-884213', 'email'],
                ].map(([f, v, src]) => (
                  <div className="pframe-row" key={f}>
                    <b>{f}</b><span>{v}</span><span className="src">→ {src}</span>
                  </div>
                ))}
                <div className="pframe-row flagged">
                  <b>rate_usd</b><span>2,850.00 ≠ 3,025.00</span><span className="src">→ 2 sources</span>
                </div>
                <div className="pframe-verified">✓ 4 of 5 fields extracted clean · 1 flagged for a human</div>
              </div>
              <div className="pframe-side">
                <h4>Flag · rate mismatch</h4>
                <div className="pframe-flag">
                  <b>Why these disagree</b>
                  The rate con shows $2,850. The carrier invoice shows $3,025 — the difference is a $175 detention accessorial added after delivery.
                </div>
                <div className="pframe-actions">
                  <span className="act primary">Accept rate con</span>
                  <span className="act">Accept invoice</span>
                  <span className="act">Send to triage</span>
                </div>
              </div>
            </div>
          </div>
          <p className="pframe-caption">The review surface your team actually uses — every field linked to its source document.</p>
        </div>
      </section>

      {/* ══════════════ STORY ══════════════ */}
      <section id="story" className="story-section">
        <div className="wrap">
          <div className="reveal story-intro">
            <span className="section-eyebrow">The story behind every messy load</span>
            <h2><span className="grad">The load does not start</span> <span className="num"> in your TMS.</span></h2>
            <p className="section-sub">It starts as a rate con in an inbox, a BOL from a driver, a POD photo, a carrier portal update, or a forwarded message. By the time it reaches the TMS, your team has already done the invisible work.</p>
          </div>

          <div className="story-board stagger-group">
            {[
              ['01', 'A document lands somewhere messy.', 'Rate con in email. POD in WhatsApp. Invoice in a portal. The important data exists, but not where the system needs it.'],
              ['02', 'A human turns it into “system data.”', 'Someone reads the PDF, checks the lane, fixes the reference number, and rekeys the same fields your customer already sent.'],
              ['03', 'The cleanup becomes the workflow.', 'Dispatch, billing, customer updates, and invoice review all depend on whether that manual cleanup was right.'],
              ['04', 'Consignd starts with the repeatable part.', "You don't buy software on day one. You send a two-week sample, and the audit shows whether the repeatable part is big enough to matter."],
            ].map(([n, title, body], i) => (
              <div key={i} className="card story-card stagger-item">
                <div className="story-card-inner">
                  <div className="story-num">{n}</div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CINEMATIC WORKFLOW ══════════════ */}
      <section className="cinematic" ref={cinematicRef}>
        <div className="cin-bg-orb"></div>
        <div className="wrap cin-wrap">
          <div className="cin-copy">
            <span className="section-eyebrow">Watch the workflow clean itself up</span>
            <h2><span className="grad">Messy freight docs in.</span> <span className="num">Clean records out.</span></h2>
            <p className="section-sub">Scroll to watch one load come together: three documents from three channels, extracted into a single record, with the uncertain field flagged for a human — not silently guessed.</p>
          </div>

          <div className="cin-stage" aria-label="Cinematic workflow diagram">
            <div className="cin-doc-stack">
              {[
                ['rate_con.pdf', 'Laredo → Chicago', '$2,850 · MC-884213'],
                ['pod_photo.jpg', 'Delivered 04/25', 'Signed · 14:06'],
                ['carrier_invoice.pdf', 'Accessorial added', '$175 detention'],
              ].map(([name, route, meta], i) => (
                <div className={`cin-doc cin-doc-${i + 1}`} key={name}>
                  <div className="cin-doc-top"><span>{name}</span><b>{i + 1}</b></div>
                  <div className="cin-doc-line wide"></div>
                  <div className="cin-doc-line"></div>
                  <div className="cin-doc-route">{route}</div>
                  <div className="cin-doc-meta">{meta}</div>
                </div>
              ))}
            </div>

            <div className="cin-beam"></div>

            <div className="cin-record">
              <div className="cin-record-head">
                <span>load.record</span>
                <b>source-linked</b>
              </div>
              {[
                ['pickup', 'Laredo, TX · 04/23 08:00'],
                ['delivery', 'Chicago, IL · 04/25 14:00'],
                ['rate_usd', '2,850.00'],
                ['carrier_mc', 'MC-884213'],
                ['exception', 'detention needs review'],
              ].map(([field, value]) => (
                <div className="cin-field" key={field}>
                  <b>{field}</b><span>{value}</span>
                </div>
              ))}
            </div>

            <div className="cin-review">
              <div className="cin-review-head">Human review where it matters</div>
              <div className="cin-progress"><span className="cin-progress-fill"></span></div>
              <div className="cin-final-chips">
                <span className="cin-final-chip">Review queue</span>
                <span className="cin-final-chip">Import-ready export</span>
                <span className="cin-final-chip">Invoice match later</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ PROBLEM ══════════════ */}
      <section id="problem">
        <div className="wrap">
          <div className="reveal">
            <span className="section-eyebrow">The Manual Chaos</span>
            <h2><span className="grad">Every load your team books becomes a</span> <span className="num"> 7-step</span> <span className="grad"> typing exercise.</span></h2>
            <p className="section-sub">Carriers still send paperwork across a dozen channels. Your dispatchers spend their mornings copying and pasting instead of moving freight.</p>
          </div>

          <div className="chaos-grid stagger-group">
            {[
              ['01','Receive',  'Rate con lands in an inbox, a WhatsApp thread, or a portal.'],
              ['02','Download', 'Open attachment, save to desktop, rename to find it later.'],
              ['03','Read',     'Hunt for pickup, delivery, commodity, reference numbers.'],
              ['04','Type',     'Rekey 40+ fields into the TMS, one character at a time.'],
              ['05','Verify',   'Cross-check the rate, weight, and MC against the rate con.'],
              ['06','Correct',  "Fix the typos you didn't catch. Call the broker back."],
              ['07','Repeat',   'Do it all again. 80 times. Before lunch.'],
            ].map(([n, t, d], i) => (
              <div key={i} className="card stagger-item">
                <div className="step-inner">
                  <div className="n">{n}</div>
                  <div className="t">{t}</div>
                  <div className="d">{d}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="chaos-callout reveal-scale">
            <div>
              <div className="big">$8,100<span style={{fontSize:'22px',color:'var(--muted)',fontWeight:500}}>/mo</span></div>
              <div className="tag">Average labor cost per dispatcher lost to data entry</div>
            </div>
            <div className="msg">That's <span className="num">$97,200 a year</span> per seat — paid to copy and paste information that already exists as structured data somewhere upstream.</div>
          </div>
          <p className="chaos-src reveal">Assumes a $52K dispatcher spending ~65% of the day on document entry and verification — the midpoint of what ops managers report. Your audit report recalculates this with your numbers.</p>
        </div>
      </section>

      {/* ══════════════ POSITION STATEMENT ══════════════ */}
      <section className="statement">
        <div className="wrap reveal">
          <span className="kicker">The position</span>
          <h2>You don't need more AI. You need a <em>data layer you can trust.</em></h2>
          <p>Consignd is the layer between your inbox and your TMS — deterministic where it must be, AI where it helps, human where it matters.</p>
        </div>
      </section>

      {/* ══════════════ VOICES ══════════════ */}
      <section id="voices" style={{padding:'80px 0 40px'}}>
        <div className="wrap reveal" style={{textAlign:'center',marginBottom:'12px'}}>
          <span className="section-eyebrow" style={{justifyContent:'center'}}>What ops teams keep telling us</span>
          <h2 style={{marginLeft:'auto',marginRight:'auto',maxWidth:'900px'}}>
            The bottleneck isn't better software. <span className="num">It's getting trustworthy data into the workflow.</span>
          </h2>
          <p className="section-sub" style={{marginLeft:'auto',marginRight:'auto'}}>The names change, but the complaint is the same: too many document formats, too many places to check, and too much tribal knowledge between the source document and the system of record.</p>
        </div>
        <div className="voices-wrap" role="region" aria-label="Paraphrased operator quotes">
          <div className="voices-row">
            <div className="voices-track">
              {voices.map((v, i) => <VoiceCard key={i} v={v} />)}
              <div aria-hidden="true" style={{display:'contents'}}>
                {voices.map((v, i) => <VoiceCard key={`dup-${i}`} v={v} />)}
              </div>
            </div>
          </div>
        </div>
        <p className="voices-note wrap">Paraphrased from discovery conversations and public operator forums. When we have named customers, they'll be here instead.</p>
      </section>

      {/* ══════════════ SOURCES ══════════════ */}
      <section id="sources" style={{padding:'80px 0'}}>
        <div className="wrap reveal" style={{textAlign:'center',marginBottom:'12px'}}>
          <span className="section-eyebrow" style={{justifyContent:'center'}}>Every channel your carriers actually use</span>
          <h2 style={{marginLeft:'auto',marginRight:'auto'}}>
            If a document can reach you, <span className="num">it can reach us.</span>
          </h2>
          <p className="section-sub" style={{marginLeft:'auto',marginRight:'auto',textAlign:'center'}}>Email attachments, WhatsApp forwards, portal exports, FTP drops, EDI feeds, scans, and phone photos — order-independent, so the BOL can land before its rate con.</p>
        </div>
        <div className="marquee-wrap reveal">
          <div className="marquee">
            <div className="marquee-track">
              {[...srcPills, ...srcPills].map((p, i) => (
                <div className="src-pill" key={i}><span className="ico" style={p.icoStyle}>{p.ico}</span>{p.label}</div>
              ))}
            </div>
          </div>
          <div className="marquee" style={{marginTop:'6px'}}>
            <div className="marquee-track rev">
              {[...[...srcPills].reverse(), ...[...srcPills].reverse()].map((p, i) => (
                <div className="src-pill" key={i}><span className="ico" style={p.icoStyle}>{p.ico}</span>{p.label}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ PIPELINE ══════════════ */}
      <section id="how">
        <div className="wrap">
          <div className="reveal">
            <span className="section-eyebrow">How it works</span>
            <h2><span className="grad">A narrow pilot.</span> <span className="num"> Then</span> <span className="grad"> a managed workflow.</span></h2>
            <p className="section-sub">We do not start by promising a giant integration project. We start with one repeated document workflow, prove what can be extracted reliably, and only then design the managed rollout.</p>
          </div>
          <div className="pipe stagger-group">
            <div className="card stagger-item">
              <div className="pipe-card-inner">
                <div className="step-num">STAGE 01</div>
                <h3>Capture</h3>
                <p>You give us a small batch from the inbox, folder, export, or portal creating the most manual work. We use that to map the real workflow before touching the broader operation.</p>
                <div className="pipe-illus">
                  <div className="ln"><b>inbox@ops.yours</b><span>2,411 new</span></div>
                  <div className="ln"><b className="pipe-ln-icon"><IcoWhatsApp />WhatsApp · Carriers</b><span>184</span></div>
                  <div className="ln"><b>Carrier portal</b><span>synced</span></div>
                  <div className="ln"><b>FTP / EDI</b><span>live</span></div>
                </div>
              </div>
            </div>

            <div className="arrow stagger-item" aria-hidden="true">
              <svg viewBox="0 0 60 24" fill="none">
                <path className="dash" d="M2 12h54m0 0l-8-8m8 8l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </div>

            <div className="card stagger-item">
              <div className="pipe-card-inner">
                <div className="step-num">STAGE 02</div>
                <h3>Structure</h3>
                <p>Freight-trained extraction turns messy documents into structured fields — pickup, delivery, commodity, rate, MC, references — with low-confidence fields sent for review.</p>
                <div className="pipe-illus">
                  <div className="ln"><b>pickup_city</b><span>Laredo, TX</span></div>
                  <div className="ln"><b>rate_usd</b><span>2,850.00</span></div>
                  <div className="ln"><b>commodity</b><span>Auto Parts</span></div>
                  <div className="ln"><b>mc_number</b><span>MC-884213</span></div>
                </div>
              </div>
            </div>

            <div className="arrow stagger-item" aria-hidden="true">
              <svg viewBox="0 0 60 24" fill="none">
                <path className="dash" d="M2 12h54m0 0l-8-8m8 8l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </div>

            <div className="card stagger-item">
              <div className="pipe-card-inner">
                <div className="step-num">STAGE 03</div>
                <h3>Deliver</h3>
                <p>Clean records are delivered in the least disruptive format first: review queue, CSV, import-ready file, or TMS workflow where access allows — always linked back to the source document.</p>
                <div className="pipe-illus">
                  <div className="ln"><b>→ Review queue</b><span>ready</span></div>
                  <div className="ln"><b>→ CSV / import file</b><span>clean</span></div>
                  <div className="ln"><b>→ TMS workflow</b><span>where supported</span></div>
                  <div className="ln"><b>audit_trail</b><span>attached</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ AI READY ══════════════ */}
      <section id="ai-ready" style={{padding:'40px 0 80px'}}>
        <div className="wrap">
          <div className="reveal" style={{maxWidth:'820px'}}>
            <span className="section-eyebrow">The AI-ready data layer</span>
            <h2><span className="grad">You can't put AI on top of a</span> <span className="num"> broken foundation.</span></h2>
            <p className="section-sub">Every dashboard, invoice check, customer update, or AI workflow depends on the same boring foundation: clean load records with source links. Consignd DataCore builds that foundation first, so later automation has something trustworthy to work with.</p>
          </div>

          <div className="ai-grid stagger-group">
            <div className="card stagger-item">
              <div className="ai-col-inner">
                <div className="ai-tag">Before Consignd DataCore</div>
                <h3>Data held together by tribal knowledge.</h3>
                <ul className="ai-list">
                  <li><span className="x">✕</span>Rate cons in 6 inboxes, BOLs in a WhatsApp group</li>
                  <li><span className="x">✕</span>One update in a PDF, another in a carrier portal</li>
                  <li><span className="x">✕</span>Critical info lives exclusively in someone's head</li>
                  <li><span className="x">✕</span>AI tools hallucinate because the inputs are garbage</li>
                  <li><span className="x">✕</span>Every new automation is a one-off integration</li>
                </ul>
              </div>
            </div>

            <div className="card stagger-item">
              <div className="ai-col-inner">
                <div className="ai-tag ai-tag-accent">With Consignd DataCore</div>
                <h3>One governed record per load. Every field, every source.</h3>
                <ul className="ai-list">
                  <li><span className="k">✓</span>Unified load record, queryable by any agent or tool</li>
                  <li><span className="k">✓</span>Provenance on every field — source doc one click away</li>
                  <li><span className="k">✓</span>Confidence scores + human-in-the-loop on low-confidence</li>
                  <li><span className="k">✓</span>Standard schema that can be exported, reviewed, or mapped into your workflow</li>
                  <li><span className="k">✓</span>Structured events for future automation: missing BOL, rate mismatch, late pickup</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="ai-ready-schema reveal-scale">
            <div className="schema-head">
              <div className="schema-title">load.record <span className="schema-badge">v1 · ai-ready</span></div>
              <div className="schema-meta">↓ downstream-ready · agents · dashboards · auto-billing · exception routing</div>
            </div>
            <div className="schema-body">
              <div className="schema-ln"><b>load_id</b><span className="v">CN-2026-48219</span><span className="src">→ email · Acme Brokerage</span></div>
              <div className="schema-ln"><b>pickup</b><span className="v">Laredo, TX · 04/23 08:00</span><span className="src">→ pdf · rate_con.pdf</span></div>
              <div className="schema-ln"><b>delivery</b><span className="v">Chicago, IL · 04/25 14:00</span><span className="src">→ pdf · rate_con.pdf</span></div>
              <div className="schema-ln"><b>commodity</b><span className="v">Auto Parts · 38,200 lb</span><span className="src">→ whatsapp · +1 956-***</span></div>
              <div className="schema-ln"><b>rate_usd</b><span className="v">2,850.00</span><span className="src">→ email · confirmation</span></div>
              <div className="schema-ln"><b>carrier_mc</b><span className="v">MC-884213</span><span className="src">→ portal · carrier</span></div>
              <div className="schema-ln"><b>_confidence</b><span className="v ok">0.97</span><span className="src">→ 1 field human-verified</span></div>
            </div>
          </div>

          <div className="ai-use stagger-group">
            {[
              { ico:'⟐', title:'Cleaner invoice matching', body:'When load data is clean upstream, invoice review becomes less detective work and more exception handling.' },
              { ico:'≡', title:'Trustworthy reporting',    body:"Dashboards become easier to trust because key fields trace back to the source document — not a spreadsheet someone rebuilt on Friday." },
              { ico:'↯', title:'Cleaner exception queues', body:'Missing BOL, rate mismatch, late pickup, unknown accessorial — route the exception instead of hunting through emails.' },
            ].map((c, i) => (
              <div key={i} className="card stagger-item">
                <div className="ai-use-card-inner">
                  <div className="ai-use-ico">{c.ico}</div>
                  <h4>{c.title}</h4>
                  <p>{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ TMS LOGOS ══════════════ */}
      <section style={{padding:'20px 0 100px'}}>
        <div className="wrap reveal" style={{textAlign:'center'}}>
          <p style={{color:'var(--muted)',fontSize:'13px',letterSpacing:'0.18em',textTransform:'uppercase',margin:'0 0 32px'}}>Works around the TMS stack you already run</p>
          <div className="tms-strip stagger-group">
            {TMS_ENTRIES.map((t, i) => (
              <div className="tms-chip stagger-item" key={i}>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ TRUST ══════════════ */}
      <section>
        <div className="wrap">
          <div className="reveal">
            <span className="section-eyebrow">Built for freight operators</span>
            <h2><span className="grad">Practical, auditable,</span> <span className="num"> and human-reviewed.</span></h2>
          </div>
          <div className="trust stagger-group">
            {[
              {
                title:'Every field has a source',
                body:'Every extracted field links back to the document, email, or export it came from, so your team can verify the answer instead of trusting a black box.',
                icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2l8 3v7c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5l8-3z" stroke="currentColor" strokeWidth="1.6"/><path d="M8.5 12l2.5 2.5L16 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              },
              {
                title:'Human-in-the-loop review',
                body:'Anything below the confidence threshold gets flagged for review. The goal is not blind automation — it is fewer repetitive checks and a cleaner exception queue.',
                icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 7l8-4 8 4-8 4-8-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M4 12l8 4 8-4M4 17l8 4 8-4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
              },
              {
                title:'No big-platform commitment',
                body:'Start with a sample. If the workflow is not repeatable enough, we say that. If it is, the rollout is scoped around document volume, complexity, and review needs.',
                icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
              },
            ].map((col, i) => (
              <div key={i} className="card stagger-item">
                <div className="trust-col-inner">
                  <div className="trust-ico">{col.icon}</div>
                  <h3>{col.title}</h3>
                  <p>{col.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ DOCUMENT AUDIT ══════════════ */}
      <section id="audit">
        <div className="wrap">
          <div className="reveal" style={{textAlign:'center'}}>
            <span className="section-eyebrow" style={{justifyContent:'center'}}>Start with the audit</span>
            <h2 style={{marginLeft:'auto',marginRight:'auto',textAlign:'center'}}><span className="grad">The Document Audit:</span> <span className="num"> a five-day diagnostic on your real paperwork.</span></h2>
            <p className="section-sub" style={{marginLeft:'auto',marginRight:'auto',textAlign:'center'}}>Send 25–50 real documents from the last two weeks of operations. We classify them, extract the fields, map the variation, and show you where your team is still burning time by hand.</p>
          </div>
          <div className="cases stagger-group" style={{marginTop:'28px'}}>
            <GlowCard className="stagger-item" borderRadius={22} hover="m" glowColor={GLOW_ORANGE}>
              <article className="case-inner">
                <div className="case-head">
                  <div className="case-co">What we do in 5 days</div>
                  <span className="case-tag">Audit scope</span>
                </div>
                <h3>We test the workflow using your actual documents — not a sandbox demo.</h3>
                <div className="case-metrics">
                  <div className="case-metric"><div className="v">25–50</div><div className="l">Real docs</div></div>
                  <div className="case-metric"><div className="v">1–2</div><div className="l">Doc types to start</div></div>
                  <div className="case-metric"><div className="v">5</div><div className="l">Business days</div></div>
                </div>
                <p className="case-quote">We classify every document by type and carrier, extract the key fields, show what parses cleanly versus what needs review, and produce a TMS-ready structured data sample from your own workflow.<span className="who">Audit output · written report + structured sample</span></p>
              </article>
            </GlowCard>

            <GlowCard className="stagger-item" borderRadius={22} hover="m" glowColor={GLOW_ORANGE}>
              <article className="case-inner">
                <div className="case-head">
                  <div className="case-co">What you get back</div>
                  <span className="case-tag">Decision material</span>
                </div>
                <h3>An honest picture of what your documents contain, where the bottlenecks are, and whether rollout makes sense.</h3>
                <div className="case-metrics">
                  <div className="case-metric"><div className="v">Mix</div><div className="l">By carrier/type</div></div>
                  <div className="case-metric"><div className="v">Fields</div><div className="l">Clean vs review</div></div>
                  <div className="case-metric"><div className="v">Scope</div><div className="l">If rollout fits</div></div>
                </div>
                <p className="case-quote">If the audit shows repeatable work, we scope setup and managed monthly processing. If it does not, we tell you that directly instead of forcing a software story where there isn’t one.<span className="who">Commercial model · audit → rollout</span></p>
              </article>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* ══════════════ PRICING ══════════════ */}
      <section id="pricing">
        <div className="wrap">
          <div className="reveal" style={{textAlign:'center'}}>
            <span className="section-eyebrow" style={{justifyContent:'center'}}>Commercial model</span>
            <h2 style={{marginLeft:'auto',marginRight:'auto',textAlign:'center'}}><span className="grad">Audit first.</span> <span className="num"> Setup second. Managed monthly only if it works.</span></h2>
            <p className="section-sub" style={{marginLeft:'auto',marginRight:'auto',textAlign:'center'}}>You should not buy a platform before you know the workflow is worth automating. Start with the Document Audit, then move to setup and monthly managed processing only if the numbers make sense.</p>
          </div>
          <div className="pricing-wrap reveal-scale">
            <GlowCard borderRadius={28} hover="s" glowColor={GLOW_ORANGE} style={{maxWidth:'560px',width:'100%'}}>
              <div className="pricing-inner">
                <div className="tier">Commercial model</div>
                <h3>Audit first. Roll out only when the workflow proves out.</h3>
                <p className="lede">The commercial model is intentionally boring: run a five-day audit on real documents, configure the workflow only if it is repeatable, then operate it as a managed service priced around volume and complexity.</p>
                <ul>
                  {[
                    'Five-day Document Audit using 25–50 real documents',
                    'Written findings: document mix, extraction quality, and review burden',
                    'One-time setup for document types, fields, and review rules if rollout fits',
                    'Monthly managed processing priced by volume and complexity',
                    'Optional expansion into invoice matching, dispute queues, and reporting',
                  ].map((item, i) => (
                    <li key={i}><span className="chk"><CheckIcon /></span>{item}</li>
                  ))}
                </ul>
                <Link to="/book-demo" className="btn btn-primary btn-lg" style={{width:'100%',justifyContent:'center'}}>Run the Document Audit →</Link>
              </div>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section id="faq">
        <div className="wrap">
          <div className="reveal">
            <span className="section-eyebrow">Frequently asked questions</span>
            <h2><span className="grad">The questions every ops leader asks</span> <span className="num"> before sending documents.</span></h2>
          </div>
          <div className="faq-grid stagger-group">
            {[
              ['What is the Consignd Document Audit?', 'A five-day paid diagnostic where a freight broker sends 25–50 real documents (rate confirmations, BOLs, PODs) and receives a written report showing what extracts cleanly, what needs human review, and whether a managed rollout is commercially worth it.'],
              ['Do I have to replace my TMS?', 'No. Consignd works around your existing TMS. Clean records are delivered as a review queue, CSV, import-ready file, or written into your TMS workflow where access allows.'],
              ['What documents does Consignd handle?', 'Rate confirmations, bills of lading, proof-of-delivery documents, and carrier invoices — as PDFs, scans, phone photos, email bodies, WhatsApp forwards, portal exports, FTP drops, or EDI feeds.'],
              ["What happens when the AI isn't sure?", 'Low-confidence fields are flagged and routed to a human review queue. Nothing is silently guessed, and every field links back to the exact source document it came from.'],
              ['What if documents arrive out of order?', 'Matching is order-independent: a BOL can arrive days before its rate con. Whichever document lands first seeds the load; later documents match into it. Unmatched documents go to a triage queue — never dropped, never force-matched.'],
              ['How much does it cost?', "The audit is a flat fee. If the workflow proves repeatable, rollout is a one-time setup plus monthly managed processing priced by document volume and complexity. If it doesn't prove out, we tell you that in the report."],
            ].map(([q, a], i) => (
              <div className="faq-item stagger-item" key={i}>
                <h3>{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FINAL CTA ══════════════ */}
      <section className="final" id="cta">
        <div className="final-orb"></div>
        <div className="wrap reveal-scale">
          <h2><span className="grad">Stop paying dispatchers to type.</span> <span className="num"> Start paying them to close.</span></h2>
          <p>Run the five-day Document Audit on 25–50 real documents. You'll know what extracts cleanly, what needs a human, and whether rollout is worth it — before you spend a dollar on software.</p>
          <Link to="/book-demo" className="btn btn-primary btn-lg">Run the Document Audit →</Link>
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
