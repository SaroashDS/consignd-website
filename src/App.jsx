import { useEffect, useLayoutEffect, useRef, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GlowCard, { GLOW_BLUE, GLOW_ORANGE } from './components/GlowCard'
import Logo from './components/Logo'
import './App.css'

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
  const cinematicRef = useRef(null)

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
      <div className="scroll-progress" id="scroll-progress" aria-hidden="true"></div>

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
            <Link to="/book-demo" className="btn btn-primary nav-cta">Test Your Documents →</Link>
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
          <Link to="/book-demo" className="btn btn-primary" style={{width:'100%',justifyContent:'center',marginTop:'8px'}} onClick={closeMenu}>Test Your Documents →</Link>
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
            <span className="dot"></span>Everyone’s talking about AI. We’re focused on the data your team still has to clean by hand.
          </span>

          <h1>
            {headline.map((w, i) => (
              <Fragment key={i}>
                <span className={`word w${i+1}`}><span className="word-inner"><span className={w.cls}>{w.text}</span></span></span>
                {i < headline.length - 1 ? ' ' : ''}
              </Fragment>
            ))}
          </h1>

          <p className="sub">Send us the freight docs your team rekeys every day. Consignd turns messy rate cons, BOLs, PODs, invoices, emails, and portal exports into clean load records — with source links and human review where the data gets messy.</p>
          <div className="hero-ctas">
            <Link to="/book-demo" className="btn btn-primary btn-lg">Test Your Documents →</Link>
            <a href="#" className="btn btn-ghost btn-lg" onClick={e=>{e.preventDefault();document.getElementById('how')?.scrollIntoView({behavior:'smooth'})}}>See the workflow</a>
          </div>

          <div className="stat-pills stagger-group" id="heroStats">
            {[
              { v:'25–50', l:'Docs to start a sample' },
              { v:'1',     l:'Workflow before rollout' },
              { v:'No rip', l:'Keep your current TMS' },
              { v:'Review',l:'Humans check messy fields' },
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
              ['04', 'Consignd starts with the repeatable part.', 'Send 25–50 real documents. We show what extracts cleanly, what needs review, and whether the workflow deserves a rollout.'],
            ].map(([n, title, body], i) => (
              <GlowCard key={i} className="story-card stagger-item" borderRadius={22} hover="m" glowColor={i === 3 ? GLOW_ORANGE : GLOW_BLUE}>
                <div className="story-card-inner">
                  <div className="story-num">{n}</div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </GlowCard>
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
            <p className="section-sub">This is the Consignd motion: capture a real document batch, extract the fields that matter, flag the uncertain pieces, and hand your team a cleaner workflow — not a black box.</p>
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
          <span className="section-eyebrow" style={{justifyContent:'center'}}>What freight operators keep running into</span>
          <h2 style={{marginLeft:'auto',marginRight:'auto',maxWidth:'900px'}}>
            <span className="grad">The bottleneck is not always</span> <span className="num"> better software.</span> <span className="grad"> It is getting trustworthy data into the workflow.</span>
          </h2>
          <p className="section-sub" style={{marginLeft:'auto',marginRight:'auto'}}>The names change, but the complaint is the same: too many document formats, too many places to check, and too much tribal knowledge between the source document and the system of record.</p>
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
            <span className="grad">Start where the mess is</span> <span className="num"> costing the most time</span><span className="grad">.</span>
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
            <h2><span className="grad">A narrow pilot.</span> <span className="num"> Then</span> <span className="grad"> a managed workflow.</span></h2>
            <p className="section-sub">We do not start by promising a giant integration project. We start with one repeated document workflow, prove what can be extracted reliably, and only then design the managed rollout.</p>
          </div>
          <div className="pipe stagger-group">
            <GlowCard className="stagger-item" borderRadius={22} hover="l">
              <div className="pipe-card-inner">
                <div className="step-num">STAGE 01</div>
                <h3>Capture</h3>
                <p>You give us a small batch from the inbox, folder, export, or portal creating the most manual work. We use that to map the real workflow before touching the broader operation.</p>
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
                <p>Freight-trained extraction turns messy documents into structured fields — pickup, delivery, commodity, rate, MC, references — with low-confidence fields sent for review.</p>
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
                <p>Clean records are delivered in the least disruptive format first: review queue, CSV, import-ready file, or TMS workflow where access allows — always linked back to the source document.</p>
                <div className="pipe-illus">
                  <div className="ln"><b>→ Review queue</b><span>ready</span></div>
                  <div className="ln"><b>→ CSV / import file</b><span>clean</span></div>
                  <div className="ln"><b>→ TMS workflow</b><span>where supported</span></div>
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
            <p className="section-sub">Every dashboard, invoice check, customer update, or AI workflow depends on the same boring foundation: clean load records with source links. Consignd DataCore builds that foundation first, so later automation has something trustworthy to work with.</p>
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
                  <li><span className="k">✓</span>Standard schema that can be exported, reviewed, or mapped into your workflow</li>
                  <li><span className="k">✓</span>Structured events for future automation: missing BOL, rate mismatch, late pickup</li>
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
              { ico:'⟐', title:'Cleaner invoice matching', body:'When load data is clean upstream, invoice review becomes less detective work and more exception handling.' },
              { ico:'≡', title:'Trustworthy reporting',    body:"Dashboards become easier to trust because key fields trace back to the source document — not a spreadsheet someone rebuilt on Friday." },
              { ico:'↯', title:'Cleaner exception queues', body:'Missing BOL, rate mismatch, late pickup, unknown accessorial — route the exception instead of hunting through emails.' },
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
          <p style={{color:'var(--muted)',fontSize:'13px',letterSpacing:'0.18em',textTransform:'uppercase',margin:'0 0 32px'}}>Works around the TMS stack you already run</p>
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
            <span className="section-eyebrow">What we measure in a pilot</span>
            <h2><span className="grad">Before a rollout,</span> <span className="num"> prove the workflow is worth it.</span></h2>
          </div>
          <div className="cases stagger-group">
            <GlowCard className="stagger-item" borderRadius={22} hover="m" glowColor={GLOW_ORANGE}>
              <article className="case-inner">
                <div className="case-head">
                  <div className="case-co">Manual entry reduction</div>
                  <span className="case-tag">Pilot metric</span>
                </div>
                <h3>Which repeated checks can be removed or turned into exceptions?</h3>
                <div className="case-metrics">
                  <div className="case-metric"><div className="v">50</div><div className="l">Sample docs</div></div>
                  <div className="case-metric"><div className="v">7</div><div className="l">Fields tracked</div></div>
                  <div className="case-metric"><div className="v">1</div><div className="l">Ops workflow</div></div>
                </div>
                <p className="case-quote">We compare the current manual workflow against a cleaned sample: fields extracted, exceptions caught, review effort required, and where the process still needs a human.<span className="who">Pilot output · before/after workflow map</span></p>
              </article>
            </GlowCard>

            <GlowCard className="stagger-item" borderRadius={22} hover="m" glowColor={GLOW_ORANGE}>
              <article className="case-inner">
                <div className="case-head">
                  <div className="case-co">Commercial fit</div>
                  <span className="case-tag">Buying decision</span>
                </div>
                <h3>Can the workflow support a monthly managed service without pretending it is magic software?</h3>
                <div className="case-metrics">
                  <div className="case-metric"><div className="v">Setup</div><div className="l">One-time</div></div>
                  <div className="case-metric"><div className="v">Retainer</div><div className="l">Monthly</div></div>
                  <div className="case-metric"><div className="v">Volume</div><div className="l">Scales</div></div>
                </div>
                <p className="case-quote">If the pilot shows enough repeatable work, we scope a rollout: one-time setup for sources and rules, monthly managed processing, and optional expansion into reconciliation/reporting.<span className="who">Commercial model · pilot → rollout</span></p>
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
            <h2 style={{marginLeft:'auto',marginRight:'auto',textAlign:'center'}}><span className="grad">Simple commercial model.</span> <span className="num"> Sample, setup, managed monthly.</span></h2>
            <p className="section-sub" style={{marginLeft:'auto',marginRight:'auto',textAlign:'center'}}>You should not buy a platform before you know the workflow is worth automating. Start with a sample run, then move to setup and monthly managed processing only if the numbers make sense.</p>
          </div>
          <div className="pricing-wrap reveal-scale">
            <GlowCard borderRadius={28} hover="s" glowColor={GLOW_ORANGE} style={{maxWidth:'560px',width:'100%'}}>
              <div className="pricing-inner">
                <div className="tier">Commercial model</div>
                <h3>Sample first. Setup second. Monthly only if it works.</h3>
                <p className="lede">The commercial model is intentionally boring: test real documents, configure the workflow, then run it as a managed service priced around volume and complexity.</p>
                <ul>
                  {[
                    'Sample run with 25–50 real documents',
                    'One-time setup for document types, fields, and review rules',
                    'Monthly managed processing priced by volume and complexity',
                    'Human review for low-confidence or exception-heavy records',
                    'Optional expansion into invoice matching, dispute queues, and reporting',
                  ].map((item, i) => (
                    <li key={i}><span className="chk"><CheckIcon /></span>{item}</li>
                  ))}
                </ul>
                <Link to="/book-demo" className="btn btn-primary btn-lg" style={{width:'100%',justifyContent:'center'}}>Test Your Documents →</Link>
              </div>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* ══════════════ FINAL CTA ══════════════ */}
      <section className="final" id="cta">
        <div className="final-orb"></div>
        <div className="wrap reveal-scale">
          <h2><span className="grad">Send the docs your team rekeys every day.</span> <span className="num"> We'll show what can be cleaned up.</span></h2>
          <p>Start with 25–50 real documents. We will show what extracts cleanly, what needs review, and whether the workflow is strong enough for a managed rollout.</p>
          <Link to="/book-demo" className="btn btn-primary btn-lg">Test Your Documents →</Link>
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
