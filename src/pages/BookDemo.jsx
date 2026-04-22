import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { InlineWidget } from 'react-calendly'
import BorderGlow from '../components/BorderGlow'
import Grainient from '../components/Grainient'
import Logo from '../components/Logo'
import './BookDemo.css'

/* ─── Update this to your Calendly link ────────────────────────── */
const CALENDLY_URL = 'https://calendly.com/consignd/demo'

/* ─── Update this to your team email (used as mailto fallback) ─── */
const TEAM_EMAIL = 'team@consignd.com'

const BRAND_COLORS = ['#3B82F6', '#60A5FA', '#F26522']
const CARD_BG      = 'rgba(2,11,24,0.82)'
const GLOW_BLUE    = '217 91 60'
const GLOW_ORANGE  = '21 89 54'

function GlowCard({ children, className = '', borderRadius = 24, glowColor = GLOW_BLUE, hover = 's', ...rest }) {
  return (
    <BorderGlow
      className={`glow-glass glow-hover-${hover} ${className}`}
      backgroundColor={CARD_BG}
      borderRadius={borderRadius}
      glowColor={glowColor}
      glowRadius={36}
      glowIntensity={0.8}
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

/* ─── Check icon ────────────────────────────────────────────────── */
const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M1.5 5l2.5 2.5L8.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

/* ─── Contact form ──────────────────────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState({ name: '', company: '', email: '', loads: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      /* TODO: replace with your email endpoint (Formspree, EmailJS, Resend, etc.)
         Example with Formspree:
           const res = await fetch('https://formspree.io/f/YOUR_ID', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(form),
           })
           if (!res.ok) throw new Error()
      */
      await new Promise(r => setTimeout(r, 900)) // remove when wired
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-success">
        <div className="form-success-icon">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="#22c55e" strokeWidth="1.8"/>
            <path d="M8 14l4 4 8-8" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3>We'll be in touch.</h3>
        <p>Expect a reply within one business day. In the meantime, feel free to <a href={`mailto:${TEAM_EMAIL}`}>email us directly</a>.</p>
        <button className="btn btn-ghost" style={{marginTop:'16px'}} onClick={() => { setForm({ name:'',company:'',email:'',loads:'',message:'' }); setStatus('idle') }}>
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Your name</label>
          <input className="form-input" type="text" placeholder="Alex Rivera" value={form.name} onChange={set('name')} required />
        </div>
        <div className="form-group">
          <label className="form-label">Company</label>
          <input className="form-input" type="text" placeholder="Midwest Freight LLC" value={form.company} onChange={set('company')} required />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Work email</label>
        <input className="form-input" type="email" placeholder="alex@company.com" value={form.email} onChange={set('email')} required />
      </div>
      <div className="form-group">
        <label className="form-label">Loads per month (approx.)</label>
        <select className="form-select" value={form.loads} onChange={set('loads')} required>
          <option value="">Select range</option>
          <option value="<500">Under 500</option>
          <option value="500-2000">500 – 2,000</option>
          <option value="2000-5000">2,000 – 5,000</option>
          <option value="5000-15000">5,000 – 15,000</option>
          <option value="15000+">15,000+</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">What's the biggest pain right now?</label>
        <textarea
          className="form-textarea"
          placeholder="E.g. dispatchers re-entering rate cons, carrier portals all over the place, AI tools not working because data is a mess..."
          rows={5}
          value={form.message}
          onChange={set('message')}
        />
      </div>
      {status === 'error' && (
        <p className="form-error">Something went wrong. <a href={`mailto:${TEAM_EMAIL}`}>Email us directly</a> and we'll reply right away.</p>
      )}
      <button
        type="submit"
        className="btn btn-primary btn-lg form-submit"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? (
          <><span className="spinner" />Sending…</>
        ) : (
          'Send Message →'
        )}
      </button>
      <p className="form-fine">We reply within one business day. No spam, ever.</p>
    </form>
  )
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function BookDemo() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const nav = document.getElementById('book-nav')
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* scroll to top on mount */
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      {/* ── Grainient background ── */}
      <div className="book-bg">
        <Grainient
          color1="#0D1B3E"
          color2="#1E40AF"
          color3="#020B18"
          timeSpeed={0.10}
          colorBalance={-0.2}
          warpStrength={0.55}
          warpFrequency={3.5}
          warpSpeed={1.0}
          warpAmplitude={100.0}
          blendAngle={15.0}
          blendSoftness={0.12}
          rotationAmount={320.0}
          noiseScale={1.8}
          grainAmount={0.045}
          grainScale={1.8}
          grainAnimated={false}
          contrast={1.2}
          gamma={1.05}
          saturation={0.6}
          zoom={0.82}
        />
        {/* darken overlay so content is readable */}
        <div className="book-bg-overlay" />
      </div>

      {/* ── Nav ── */}
      <nav className="nav" id="book-nav">
        <div className="nav-inner">
          <Link to="/" className="logo" aria-label="Consignd DataCore">
            <Logo />
          </Link>
          <div className="nav-links">
            <Link to="/#problem">Problem</Link>
            <Link to="/#sources">Sources</Link>
            <Link to="/#how">How it works</Link>
            <Link to="/#cases">Results</Link>
            <Link to="/#pricing">Pricing</Link>
          </div>
          <div className="nav-right">
            <Link to="/" className="btn btn-ghost nav-cta" style={{fontSize:'13px',padding:'9px 16px'}}>← Back to site</Link>
            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
        <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>← Back to site</Link>
          <a href={`#calendly`} onClick={() => setMenuOpen(false)}>Book a Demo</a>
          <a href={`#contact`} onClick={() => setMenuOpen(false)}>Talk to Our Team</a>
        </div>
      </nav>

      {/* ── Main content ── */}
      <main className="book-main">
        <div className="wrap">

          {/* Header */}
          <div className="book-header">
            <span className="section-eyebrow" style={{justifyContent:'center'}}>
              <span style={{width:6,height:6,borderRadius:'50%',background:'#22c55e',boxShadow:'0 0 10px #22c55e',display:'inline-block',animation:'pulse 1.8s infinite'}} />
              Currently accepting new customers
            </span>
            <h1 className="book-h1">
              Stop paying dispatchers<br/>to type.{' '}
              <span className="accent">Let's talk.</span>
            </h1>
            <p className="book-sub">
              Pick a time below for a 20-minute walkthrough — we'll run a live extraction from a real rate con in front of you. Or drop us a message and we'll reach out within one business day.
            </p>
          </div>

          {/* What to expect strip */}
          <div className="book-expect">
            {[
              { ico:'⏱', text:'20-minute call, no fluff' },
              { ico:'📄', text:'Live demo with your own docs' },
              { ico:'🔌', text:'We map your TMS on the call' },
              { ico:'🚀', text:'Go-live in under 10 days' },
            ].map((item, i) => (
              <div className="expect-item" key={i}>
                <span className="expect-ico">{item.ico}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Two-column cards */}
          <div className="book-grid">

            {/* Calendly card */}
            <GlowCard className="book-calendly-card" borderRadius={24} glowColor={GLOW_BLUE} hover="s">
              <div className="book-card-inner" id="calendly">
                <div className="book-card-head">
                  <div>
                    <div className="book-card-label">Book a Demo</div>
                    <h2 className="book-card-title">20-minute walkthrough</h2>
                    <p className="book-card-desc">We'll run a sample rate con from your inbox, end-to-end, live on the call. If it doesn't land cleanly in your TMS, you'll know immediately.</p>
                  </div>
                  <div className="book-card-features">
                    {[
                      'Live extraction from your own documents',
                      'TMS integration mapped on the call',
                      'Pricing tailored to your load volume',
                    ].map((f, i) => (
                      <div className="book-feature" key={i}>
                        <span className="chk-sm"><CheckIcon /></span>{f}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="calendly-wrap">
                  <InlineWidget
                    url={CALENDLY_URL}
                    styles={{ height: '660px', minWidth: '280px' }}
                    pageSettings={{
                      backgroundColor: '020B18',
                      hideEventTypeDetails: true,
                      hideLandingPageDetails: true,
                      primaryColor: '3B82F6',
                      textColor: 'ffffff',
                    }}
                  />
                </div>
              </div>
            </GlowCard>

            {/* Contact form card */}
            <GlowCard className="book-contact-card" borderRadius={24} glowColor={GLOW_ORANGE} hover="s">
              <div className="book-card-inner" id="contact">
                <div className="book-card-head">
                  <div>
                    <div className="book-card-label book-card-label-orange">Talk to Our Team</div>
                    <h2 className="book-card-title">Not ready to book?</h2>
                    <p className="book-card-desc">Tell us about your stack and current pain points. We'll send you a tailored breakdown and follow up within one business day.</p>
                  </div>
                  <div className="book-card-features">
                    {[
                      'No commitment, no sales pressure',
                      'Reply within one business day',
                      'Direct line to the ops team',
                    ].map((f, i) => (
                      <div className="book-feature" key={i}>
                        <span className="chk-sm chk-orange"><CheckIcon /></span>{f}
                      </div>
                    ))}
                  </div>
                </div>
                <ContactForm />
              </div>
            </GlowCard>

          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="book-footer">
        <div className="wrap foot">
          <Link to="/" className="logo" aria-label="Consignd DataCore"><Logo /></Link>
          <div className="foot-links">
            <a href="#">Privacy</a>
            <a href="#">Security</a>
            <a href={`mailto:${TEAM_EMAIL}`}>Contact</a>
          </div>
          <div>© 2026 Consignd, Inc. · DataCore®</div>
        </div>
      </footer>
    </>
  )
}
