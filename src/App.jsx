import { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import BorderGlow from './components/BorderGlow'
import Logo from './components/Logo'
import './App.css'

/* ─── Brand constants ───────────────────────────────────────────── */
const BRAND_COLORS = ['#3B82F6', '#60A5FA', '#F26522']
const CARD_BG      = 'rgba(2,11,24,0.78)'
const GLOW_BLUE    = '217 91 60'
const GLOW_ORANGE  = '21 89 54'

/* ─── GlowCard wrapper ──────────────────────────────────────────── */
function GlowCard({ children, className = '', borderRadius = 22, glowColor = GLOW_BLUE, hover = 'm', ...rest }) {
  return (
    <BorderGlow
      className={`glow-glass glow-hover-${hover} ${className}`}
      backgroundColor={CARD_BG}
      borderRadius={borderRadius}
      glowColor={glowColor}
      glowRadius={32}
      glowIntensity={0.75}
      coneSpread={28}
      colors={BRAND_COLORS}
      animated={false}
      fillOpacity={0.35}
      {...rest}
    >
      {children}
    </BorderGlow>
  )
}

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

/* ─── TMS logo marks ────────────────────────────────────────────── */
const MarkRoseRocket = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="6" fill="rgba(255,80,20,0.16)"/>
    <path d="M14 4.5s5 3.5 5 8.5l-2.5 2.5L14 14.5l-2.5 1L9 13C9 8 14 4.5 14 4.5z" fill="#FF5014"/>
    <circle cx="14" cy="11" r="1.8" fill="white"/>
    <path d="M11.5 15.5L10 20l4-2 4 2-1.5-4.5" fill="#FF5014" opacity="0.6"/>
    <path d="M9 13l-2.5 1.5 1.5-2.5" fill="#FF5014" opacity="0.45"/>
    <path d="M19 13l2.5 1.5-1.5-2.5" fill="#FF5014" opacity="0.45"/>
  </svg>
)
const MarkAlvys = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="6" fill="rgba(79,70,229,0.15)"/>
    <path d="M14 6L21 21H7L14 6Z" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M9.5 16.5h9" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)
const MarkTurvo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="6" fill="rgba(124,58,237,0.15)"/>
    <circle cx="14" cy="8" r="2.5" fill="#7C3AED"/>
    <circle cx="7.5" cy="19" r="2.5" fill="#7C3AED"/>
    <circle cx="20.5" cy="19" r="2.5" fill="#7C3AED"/>
    <path d="M14 10.5L7.5 16.5M14 10.5L20.5 16.5M7.5 19h13" stroke="#7C3AED" strokeWidth="1.5" opacity="0.55"/>
  </svg>
)
const MarkMcLeod = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="6" fill="rgba(29,78,216,0.15)"/>
    <path d="M5.5 21V8.5L14 16.5l8.5-8V21" stroke="#1D4ED8" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" fill="none"/>
  </svg>
)
const MarkTai = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="6" fill="rgba(245,158,11,0.15)"/>
    <path d="M6.5 9h15M14 9v11" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="20" cy="20" r="2.5" fill="#D97706" opacity="0.5"/>
  </svg>
)
const MarkAscend = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="6" fill="rgba(5,150,105,0.14)"/>
    <rect x="5.5" y="17" width="4.5" height="6" rx="1.2" fill="#059669"/>
    <rect x="11.5" y="13" width="4.5" height="10" rx="1.2" fill="#059669"/>
    <rect x="17.5" y="9" width="4.5" height="14" rx="1.2" fill="#059669"/>
    <polyline points="7.75,16 12,11 16.25,13.5 21,7" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.45"/>
  </svg>
)

/* ─── Voices data ───────────────────────────────────────────────── */
const voices = [
  { user:'u/Equal-Hair3068',    sub:'r/logistics',      meta:'2d · Ops Manager',       q:'"still manually cross-referencing three different systems just to figure out if a load actually delivered on time."', up:247, cmts:42, av:'E', color:'' },
  { user:'u/Personal-Lack4170', sub:'r/freightbrokers', meta:'4d · Dispatcher',         q:'"the biggest time sink isn\'t decision-making — it\'s cleaning and reconciling data from 5 different sources before you can even trust it."', up:389, cmts:67, av:'P', color:'o' },
  { user:'u/thea_in_supply',    sub:'r/logistics',      meta:'1w · Supply Chain Lead',  q:'"you can\'t layer ai on top of a foundation that\'s basically held together by tribal knowledge and vlookups."', up:512, cmts:88, av:'T', color:'g' },
  { user:'u/midwest_moves_',    sub:'r/freightbrokers', meta:'3d · Brokerage Owner',    q:'"i hired two people last quarter just to type rate cons into our tms. that\'s not a strategy, that\'s a tax."', up:428, cmts:71, av:'M', color:'' },
  { user:'u/Unlikely_Laugh_984',sub:'r/logistics',      meta:'5d · Ops Director',       q:'"ops teams end up spending more time stitching together the truth than actually solving the exception."', up:603, cmts:104, av:'U', color:'o' },
  { user:'u/cold_chain_carl',   sub:'r/logistics',      meta:'6d · 3PL Operator',       q:'"we tried plugging gpt into our emails. it confidently invented load numbers that didn\'t exist. garbage in, garbage out."', up:712, cmts:129, av:'C', color:'g' },
  { user:'u/dispatch_daily',    sub:'r/freightbrokers', meta:'2d · Senior Dispatcher',  q:'"my inbox is the ETL pipeline. my dispatcher is the orchestration layer. this is not a functional system."', up:331, cmts:58, av:'D', color:'' },
  { user:'u/rate_con_refugee',  sub:'r/logistics',      meta:'1d · Billing Lead',       q:'"by the time we reconcile the rate con, the bol, and the carrier portal, the load has already delivered. billing is always playing catch-up."', up:445, cmts:82, av:'R', color:'o' },
  { user:'u/whatsapp_ops',      sub:'r/freightbrokers', meta:'4d · Brokerage Mgr',      q:'"half my critical load updates live in a whatsapp group chat. no TMS in the world ingests that. it\'s just… gone."', up:589, cmts:97, av:'W', color:'' },
  { user:'u/fleet_fiona',       sub:'r/logistics',      meta:'1w · VP Ops',             q:'"everyone wants to sell us an \'ai copilot.\' nobody wants to solve the actual problem: our data is in 14 places and none of them agree."', up:841, cmts:156, av:'F', color:'g' },
]

function VoiceCard({ v }) {
  return (
    <div className="voice">
      <div className="voice-head">
        <div className={`voice-av${v.color ? ' ' + v.color : ''}`}>{v.av}</div>
        <div className="voice-meta">
          <div className="voice-user">{v.user}</div>
          <div className="voice-sub"><b>{v.sub}</b> · {v.meta}</div>
        </div>
      </div>
      <div className="voice-q">{v.q}</div>
      <div className="voice-stats">
        <span>▲ {v.up}</span><span>💬 {v.cmts}</span><span>Share</span>
      </div>
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

/* ─── TMS entries with custom marks ─────────────────────────────── */
const TMS_ENTRIES = [
  { name:'Rose Rocket', mark:<MarkRoseRocket /> },
  { name:'Alvys',       mark:<MarkAlvys /> },
  { name:'Turvo',       mark:<MarkTurvo /> },
  { name:'McLeod',      mark:<MarkMcLeod /> },
  { name:'Tai TMS',     mark:<MarkTai /> },
  { name:'AscendTMS',   mark:<MarkAscend /> },
]

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

  /* nav scroll */
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

  /* parallax floaters — translate only; CSS rotate handles tilt */
  useEffect(() => {
    let ticking = false
    const floaters = document.querySelectorAll('[data-parallax]')
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY
          floaters.forEach(el => {
            el.style.transform = `translate3d(0,${y * parseFloat(el.dataset.parallax)}px,0)`
          })
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
      {/* ── Animated background ── */}
      <div className="bg-fixed">
        <div className="aurora"></div>
        <div className="bg-grid"></div>
        <div className="bg-blob b1"></div>
        <div className="bg-blob b2"></div>
        <div className="bg-blob b3"></div>
        <div className="bg-blob b4"></div>
        <div className="bg-blob b5"></div>
        <div className="bg-blob b6"></div>
        <div className="bg-noise"></div>
      </div>

      {/* ── Nav ── */}
      <nav className="nav" id="nav">
        <div className="nav-inner">
          <a href="#" className="logo" aria-label="Consignd DataCore">
            <Logo />
          </a>
          <div className="nav-links">
            <a href="#" onClick={e=>{e.preventDefault();document.getElementById('problem')?.scrollIntoView({behavior:'smooth'})}}>Problem</a>
            <a href="#" onClick={e=>{e.preventDefault();document.getElementById('sources')?.scrollIntoView({behavior:'smooth'})}}>Sources</a>
            <a href="#" onClick={e=>{e.preventDefault();document.getElementById('how')?.scrollIntoView({behavior:'smooth'})}}>How it works</a>
            <a href="#" onClick={e=>{e.preventDefault();document.getElementById('cases')?.scrollIntoView({behavior:'smooth'})}}>Results</a>
            <a href="#" onClick={e=>{e.preventDefault();document.getElementById('pricing')?.scrollIntoView({behavior:'smooth'})}}>Pricing</a>
          </div>
          <div className="nav-right">
            <Link to="/book-demo" className="btn btn-primary nav-cta">Book a Demo →</Link>
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
          <a href="#" onClick={e=>{e.preventDefault();closeMenu();setTimeout(()=>document.getElementById('problem')?.scrollIntoView({behavior:'smooth'}),120)}}>Problem</a>
          <a href="#" onClick={e=>{e.preventDefault();closeMenu();setTimeout(()=>document.getElementById('sources')?.scrollIntoView({behavior:'smooth'}),120)}}>Sources</a>
          <a href="#" onClick={e=>{e.preventDefault();closeMenu();setTimeout(()=>document.getElementById('how')?.scrollIntoView({behavior:'smooth'}),120)}}>How it works</a>
          <a href="#" onClick={e=>{e.preventDefault();closeMenu();setTimeout(()=>document.getElementById('cases')?.scrollIntoView({behavior:'smooth'}),120)}}>Results</a>
          <a href="#" onClick={e=>{e.preventDefault();closeMenu();setTimeout(()=>document.getElementById('pricing')?.scrollIntoView({behavior:'smooth'}),120)}}>Pricing</a>
          <Link to="/book-demo" className="btn btn-primary" style={{width:'100%',justifyContent:'center',marginTop:'8px'}} onClick={closeMenu}>Book a Demo →</Link>
        </div>
      </nav>

      {/* ══════════════ HERO ══════════════ */}
      <section className="hero">
        <div className="floaters" aria-hidden="true">
          <div className="doc d1" data-parallax="0.25"><div className="bar md"></div><div className="bar sm"></div><div className="bar blue"></div><div className="bar sm"></div></div>
          <div className="doc d2" data-parallax="-0.20"><div className="bar md"></div><div className="bar orange"></div><div className="bar sm"></div><div className="bar md"></div><div className="bar sm"></div></div>
          <div className="doc d3" data-parallax="0.30"><div className="bar sm"></div><div className="bar md"></div><div className="bar blue"></div></div>
          <div className="doc d4" data-parallax="-0.25"><div className="bar md"></div><div className="bar sm"></div><div className="bar md"></div><div className="bar orange"></div></div>
          <div className="doc d5" data-parallax="0.15"><div className="bar sm"></div><div className="bar md"></div></div>
          <div className="doc d6" data-parallax="-0.15"><div className="bar md"></div><div className="bar blue"></div></div>
        </div>
        <div className="wrap hero-content">
          <span className="hero-eyebrow">
            <span className="dot"></span>Done-for-you data automation that makes you AI-ready
          </span>

          <h1>
            {headline.map((w, i) => (
              <Fragment key={i}>
                <span className={`word w${i+1}`}><span className="word-inner"><span className={w.cls}>{w.text}</span></span></span>
                {i < headline.length - 1 ? ' ' : ''}
              </Fragment>
            ))}
          </h1>

          <p className="sub">Before any AI tool, agent, or dashboard can help your ops team, the data has to exist. Consignd DataCore turns the emails, WhatsApp threads, PDFs, portals, and EDI feeds your carriers use into one clean, structured, AI-ready layer — synced into your TMS and ready for anything you want to build on top.</p>
          <div className="hero-ctas">
            <Link to="/book-demo" className="btn btn-primary btn-lg">Book a Demo →</Link>
            <a href="#" className="btn btn-ghost btn-lg" onClick={e=>{e.preventDefault();document.getElementById('how')?.scrollIntoView({behavior:'smooth'})}}>See how it works</a>
          </div>

          <div className="stat-pills stagger-group" id="heroStats">
            {[
              { v:'94%',   l:'Fewer keystrokes per load' },
              { v:'3.2×',  l:'Loads moved per dispatcher' },
              { v:'<45s',  l:'From document → TMS' },
              { v:'99.6%', l:'Field-level accuracy' },
            ].map((s, i) => (
              <GlowCard key={i} className="stagger-item" borderRadius={18} hover="s">
                <div className="stat-pill-inner">
                  <div className="v"><em>{s.v}</em></div>
                  <div className="l">{s.l}</div>
                </div>
              </GlowCard>
            ))}
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
              <GlowCard key={i} className="stagger-item" borderRadius={16} hover="m">
                <div className="step-inner">
                  <div className="n">{n}</div>
                  <div className="t">{t}</div>
                  <div className="d">{d}</div>
                </div>
              </GlowCard>
            ))}
          </div>

          <div className="chaos-callout reveal-scale">
            <div>
              <div className="big">$8,100<span style={{fontSize:'22px',color:'var(--muted)',fontWeight:500}}>/mo</span></div>
              <div className="tag">Average labor cost per dispatcher lost to data entry</div>
            </div>
            <div className="msg">That's <span className="num">$97,200 a year</span> per seat — paid to copy and paste information that already exists as structured data somewhere upstream.</div>
          </div>
        </div>
      </section>

      {/* ══════════════ VOICES ══════════════ */}
      <section id="voices" style={{padding:'80px 0 40px'}}>
        <div className="wrap reveal" style={{textAlign:'center',marginBottom:'12px'}}>
          <span className="section-eyebrow" style={{justifyContent:'center'}}>What ops leaders are actually saying</span>
          <h2 style={{marginLeft:'auto',marginRight:'auto',maxWidth:'900px'}}>
            <span className="grad">The real bottleneck isn't</span> <span className="num"> software.</span> <span className="grad"> It's the broken data underneath it.</span>
          </h2>
          <p className="section-sub" style={{marginLeft:'auto',marginRight:'auto'}}>Pulled from r/logistics, r/freightbrokers, and a dozen ops Slacks. The same pattern every time — teams drowning in documents, systems that can't talk to each other, and AI tools that can't help until the foundation exists.</p>
        </div>
        <div className="voices-wrap">
          <div className="voices-row">
            <div className="voices-track">
              {[...voices, ...voices].map((v, i) => <VoiceCard key={i} v={v} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ SOURCES ══════════════ */}
      <section id="sources" style={{padding:'80px 0'}}>
        <div className="wrap reveal" style={{textAlign:'center',marginBottom:'12px'}}>
          <span className="section-eyebrow" style={{justifyContent:'center'}}>Built for real freight workflows</span>
          <h2 style={{marginLeft:'auto',marginRight:'auto'}}>
            <span className="grad">We ingest from</span> <span className="num"> every channel</span> <span className="grad"> your carriers actually use.</span>
          </h2>
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
            <h2><span className="grad">Three stages.</span> <span className="num"> Zero</span> <span className="grad"> dispatcher keystrokes.</span></h2>
            <p className="section-sub">A managed pipeline that runs 24/7 in the background. You keep your TMS, your workflows, and your relationships. We handle the typing.</p>
          </div>
          <div className="pipe stagger-group">
            <GlowCard className="stagger-item" borderRadius={22} hover="l">
              <div className="pipe-card-inner">
                <div className="step-num">STAGE 01</div>
                <h3>Capture</h3>
                <p>We monitor every inbox, portal, and channel where rate cons and BOLs arrive. Documents are pulled the moment they land.</p>
                <div className="pipe-illus">
                  <div className="ln"><b>inbox@ops.yours</b><span>2,411 new</span></div>
                  <div className="ln"><b className="pipe-ln-icon"><IcoWhatsApp />WhatsApp · Carriers</b><span>184</span></div>
                  <div className="ln"><b>RMX Portal</b><span>synced</span></div>
                  <div className="ln"><b>FTP / EDI</b><span>live</span></div>
                </div>
              </div>
            </GlowCard>

            <div className="arrow stagger-item" aria-hidden="true">
              <svg viewBox="0 0 60 24" fill="none">
                <path className="dash" d="M2 12h54m0 0l-8-8m8 8l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </div>

            <GlowCard className="stagger-item" borderRadius={22} hover="l">
              <div className="pipe-card-inner">
                <div className="step-num">STAGE 02</div>
                <h3>Structure</h3>
                <p>Load-trained extraction reads every document and returns clean, validated fields — pickup, delivery, commodity, rate, MC, references.</p>
                <div className="pipe-illus">
                  <div className="ln"><b>pickup_city</b><span>Laredo, TX</span></div>
                  <div className="ln"><b>rate_usd</b><span>2,850.00</span></div>
                  <div className="ln"><b>commodity</b><span>Auto Parts</span></div>
                  <div className="ln"><b>mc_number</b><span>MC-884213</span></div>
                </div>
              </div>
            </GlowCard>

            <div className="arrow stagger-item" aria-hidden="true">
              <svg viewBox="0 0 60 24" fill="none">
                <path className="dash" d="M2 12h54m0 0l-8-8m8 8l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </div>

            <GlowCard className="stagger-item" borderRadius={22} hover="l">
              <div className="pipe-card-inner">
                <div className="step-num">STAGE 03</div>
                <h3>Sync</h3>
                <p>Structured loads push directly into your TMS through our native integrations — with full audit trails and a link back to the source document.</p>
                <div className="pipe-illus">
                  <div className="ln"><b>→ Rose Rocket</b><span>✓ load #48219</span></div>
                  <div className="ln"><b>→ Alvys</b><span>✓ load #A-7733</span></div>
                  <div className="ln"><b>→ McLeod</b><span>✓ load #M-9041</span></div>
                  <div className="ln"><b>audit_trail</b><span>attached</span></div>
                </div>
              </div>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* ══════════════ AI READY ══════════════ */}
      <section id="ai-ready" style={{padding:'40px 0 80px'}}>
        <div className="wrap">
          <div className="reveal" style={{maxWidth:'820px'}}>
            <span className="section-eyebrow">The AI-ready data layer</span>
            <h2><span className="grad">You can't put AI on top of a</span> <span className="num"> broken foundation.</span></h2>
            <p className="section-sub">Every AI tool, agent, or dashboard your ops team tries is only as good as the data it reads. Consignd DataCore is the layer underneath — turning scattered, unstructured freight documents into clean, governed, queryable records. Once that exists, anything you want to automate on top becomes possible.</p>
          </div>

          <div className="ai-grid stagger-group">
            <GlowCard className="stagger-item" borderRadius={22} hover="s">
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
            </GlowCard>

            <GlowCard className="stagger-item" borderRadius={22} hover="s" glowColor={GLOW_ORANGE}>
              <div className="ai-col-inner">
                <div className="ai-tag ai-tag-accent">With Consignd DataCore</div>
                <h3>One governed record per load. Every field, every source.</h3>
                <ul className="ai-list">
                  <li><span className="k">✓</span>Unified load record, queryable by any agent or tool</li>
                  <li><span className="k">✓</span>Provenance on every field — source doc one click away</li>
                  <li><span className="k">✓</span>Confidence scores + human-in-the-loop on low-confidence</li>
                  <li><span className="k">✓</span>Standard schema that maps cleanly across every TMS</li>
                  <li><span className="k">✓</span>Event stream your downstream AI can actually subscribe to</li>
                </ul>
              </div>
            </GlowCard>
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
              <div className="schema-ln"><b>carrier_mc</b><span className="v">MC-884213</span><span className="src">→ portal · RMX</span></div>
              <div className="schema-ln"><b>_confidence</b><span className="v ok">0.998</span><span className="src">→ 2 fields human-verified</span></div>
            </div>
          </div>

          <div className="ai-use stagger-group">
            {[
              { ico:'⟐', title:'Feed your AI agents',     body:'Hand your copilots and agents a structured load context instead of raw email threads. They stop hallucinating and start answering.' },
              { ico:'≡', title:'Trustworthy analytics',    body:"Dashboards finally reflect reality because every metric traces back to a source document — not a junior's spreadsheet." },
              { ico:'↯', title:'Automate exceptions',      body:'Subscribe to structured events — late pickup, rate mismatch, missing BOL — and route them automatically instead of hunting emails.' },
            ].map((c, i) => (
              <GlowCard key={i} className="stagger-item" borderRadius={18} hover="s">
                <div className="ai-use-card-inner">
                  <div className="ai-use-ico">{c.ico}</div>
                  <h4>{c.title}</h4>
                  <p>{c.body}</p>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ TMS LOGOS ══════════════ */}
      <section style={{padding:'20px 0 100px'}}>
        <div className="wrap reveal" style={{textAlign:'center'}}>
          <p style={{color:'var(--muted)',fontSize:'13px',letterSpacing:'0.18em',textTransform:'uppercase',margin:'0 0 32px'}}>Native integrations with the TMS you already run</p>
          <div className="tms-strip stagger-group">
            {TMS_ENTRIES.map((t, i) => (
              <div className="tms-chip stagger-item" key={i}>
                {t.mark}<span>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CASE STUDIES ══════════════ */}
      <section id="cases">
        <div className="wrap">
          <div className="reveal">
            <span className="section-eyebrow">Case studies</span>
            <h2><span className="grad">Teams that stopped typing —</span> <span className="num"> and started scaling.</span></h2>
          </div>
          <div className="cases stagger-group">
            <GlowCard className="stagger-item" borderRadius={22} hover="m" glowColor={GLOW_ORANGE}>
              <article className="case-inner">
                <div className="case-head">
                  <div className="case-co">Midwest Logistics Group</div>
                  <span className="case-tag">Brokerage · 40 seats</span>
                </div>
                <h3>"We grew load volume 2.4× without adding a single dispatcher seat."</h3>
                <div className="case-metrics">
                  <div className="case-metric"><div className="v">2.4×</div><div className="l">Load volume</div></div>
                  <div className="case-metric"><div className="v">−71%</div><div className="l">Entry errors</div></div>
                  <div className="case-metric"><div className="v">$412K</div><div className="l">Annual labor saved</div></div>
                </div>
                <p className="case-quote">"Within six weeks Consignd DataCore was processing every rate confirmation we received automatically. Our dispatchers finally have time to build carrier relationships and actually close loads."<span className="who">— Daniela Ortiz · VP of Operations</span></p>
              </article>
            </GlowCard>

            <GlowCard className="stagger-item" borderRadius={22} hover="m" glowColor={GLOW_ORANGE}>
              <article className="case-inner">
                <div className="case-head">
                  <div className="case-co">Coastal Freight Partners</div>
                  <span className="case-tag">Asset-based · 120 trucks</span>
                </div>
                <h3>"Load build times dropped from 11 minutes to under 45 seconds."</h3>
                <div className="case-metrics">
                  <div className="case-metric"><div className="v">45s</div><div className="l">Avg. load build</div></div>
                  <div className="case-metric"><div className="v">99.6%</div><div className="l">Field accuracy</div></div>
                  <div className="case-metric"><div className="v">18</div><div className="l">FTEs redeployed</div></div>
                </div>
                <p className="case-quote">"The ROI was clear inside the first month. We redeployed 18 people from data entry into carrier sales — and that's what actually grew the business."<span className="who">— Marcus Whelan · Chief Operating Officer</span></p>
              </article>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* ══════════════ TRUST ══════════════ */}
      <section>
        <div className="wrap">
          <div className="reveal">
            <span className="section-eyebrow">Built for freight operators</span>
            <h2><span className="grad">Trust, accuracy, and auditability —</span> <span className="num"> by default.</span></h2>
          </div>
          <div className="trust stagger-group">
            {[
              {
                title:'SOC 2 Type II · HIPAA-ready',
                body:'Your documents never leave encrypted infrastructure. Row-level audit logs capture every extraction and TMS write, with PII redaction on by default.',
                icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2l8 3v7c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5l8-3z" stroke="currentColor" strokeWidth="1.6"/><path d="M8.5 12l2.5 2.5L16 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              },
              {
                title:'Human-in-the-loop review',
                body:'Anything below our confidence threshold routes to a Consignd analyst — not your dispatchers. You only ever see clean, verified loads in your TMS.',
                icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 7l8-4 8 4-8 4-8-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M4 12l8 4 8-4M4 17l8 4 8-4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
              },
              {
                title:'Ten-day rollout, done-for-you',
                body:'We map your TMS, your load types, and your edge cases. Go live in under two weeks with a dedicated ops lead on a shared Slack channel.',
                icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
              },
            ].map((col, i) => (
              <GlowCard key={i} className="stagger-item" borderRadius={20} hover="m">
                <div className="trust-col-inner">
                  <div className="trust-ico">{col.icon}</div>
                  <h3>{col.title}</h3>
                  <p>{col.body}</p>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ PRICING ══════════════ */}
      <section id="pricing">
        <div className="wrap">
          <div className="reveal" style={{textAlign:'center'}}>
            <span className="section-eyebrow" style={{justifyContent:'center'}}>Pricing</span>
            <h2 style={{marginLeft:'auto',marginRight:'auto',textAlign:'center'}}><span className="grad">One tier.</span> <span className="num"> Priced per load</span><span className="grad">, not per seat.</span></h2>
            <p className="section-sub" style={{marginLeft:'auto',marginRight:'auto',textAlign:'center'}}>We only win when your dispatchers stop typing. Pricing scales with automated load volume, and we cap it as your team grows.</p>
          </div>
          <div className="pricing-wrap reveal-scale">
            <GlowCard borderRadius={28} hover="s" glowColor={GLOW_ORANGE} style={{maxWidth:'560px',width:'100%'}}>
              <div className="pricing-inner">
                <div className="tier">Done-for-you Automation</div>
                <h3>Everything, managed end-to-end.</h3>
                <p className="lede">A dedicated ops team, unlimited sources, native TMS sync, and an SLA on field-level accuracy. No per-seat surprises.</p>
                <ul>
                  {[
                    'Unlimited ingestion channels & document types',
                    'Native TMS sync across all supported platforms',
                    '99.6% field-level accuracy SLA, or we credit it back',
                    'Dedicated operations lead + shared Slack channel',
                    'Audit trail & source-document link on every load',
                  ].map((item, i) => (
                    <li key={i}><span className="chk"><CheckIcon /></span>{item}</li>
                  ))}
                </ul>
                <Link to="/book-demo" className="btn btn-primary btn-lg" style={{width:'100%',justifyContent:'center'}}>Talk to Our Team →</Link>
              </div>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* ══════════════ FINAL CTA ══════════════ */}
      <section className="final" id="cta">
        <div className="final-orb"></div>
        <div className="wrap reveal-scale">
          <h2><span className="grad">Stop paying dispatchers to type.</span> <span className="num"> Start paying them to close.</span></h2>
          <p>Twenty-minute walkthrough. We'll run a sample rate con from your own inbox, end-to-end, in front of you. If it doesn't land cleanly in your TMS, you'll know in the call.</p>
          <Link to="/book-demo" className="btn btn-primary btn-lg">Book a Demo →</Link>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer>
        <div className="wrap foot">
          <a href="#" className="logo" aria-label="Consignd DataCore"><Logo /></a>
          <div className="foot-links">
            <a href="#">Privacy</a>
            <a href="#">Security</a>
            <a href="#">Status</a>
            <a href="#">Contact</a>
          </div>
          <div>© 2026 Consignd, Inc. · DataCore®</div>
        </div>
      </footer>
    </>
  )
}
