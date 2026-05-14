import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { InlineWidget } from 'react-calendly'
import GlowCard, { GLOW_BLUE, GLOW_ORANGE } from '../components/GlowCard'
import Grainient from '../components/Grainient'
import Logo from '../components/Logo'
import './BookDemo.css'

/* ─── Update this to your Calendly link ────────────────────────── */
const CALENDLY_URL = 'https://calendly.com/operations-consignd/30min'

/* ─── Update this to your team email (used as mailto fallback) ─── */
const TEAM_EMAIL = 'website.inquiries@consignd.one'
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || 'https://project-qay72.vercel.app/api/contact'

/* ─── Check icon ────────────────────────────────────────────────── */
const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M1.5 5l2.5 2.5L8.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

/* ─── Contact form ──────────────────────────────────────────────── */
function ContactForm() {
  const emptyForm = { name: '', company: '', email: '', loads: '', message: '', website: '' }
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState('')
  const [submittedAt, setSubmittedAt] = useState(() => Date.now())

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const resetForm = () => {
    setForm(emptyForm)
    setSubmittedAt(Date.now())
    setErrorMessage('')
    setStatus('idle')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, submittedAt }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Request failed')
      }

      setStatus('sent')
    } catch (error) {
      setErrorMessage(error?.message || 'Something went wrong.')
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
        <button className="btn btn-ghost" style={{marginTop:'16px'}} onClick={resetForm}>
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
          placeholder="E.g. rate cons being rekeyed, BOLs stuck in inboxes, carrier invoices not matching rate cons, portal exports getting cleaned by hand..."
          rows={5}
          value={form.message}
          onChange={set('message')}
        />
      </div>
      <input
        type="text"
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
        style={{position:'absolute',left:'-9999px',opacity:0,pointerEvents:'none'}}
        value={form.website}
        onChange={set('website')}
      />
      {status === 'error' && (
        <p className="form-error">{errorMessage || 'Something went wrong.'} <a href={`mailto:${TEAM_EMAIL}`}>Email us directly</a> and we'll reply right away.</p>
      )}
      <button
        type="submit"
        className="btn btn-primary btn-lg form-submit"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? (
          <><span className="spinner" />Sending…</>
        ) : (
          'Start the Audit →'
        )}
      </button>
      <p className="form-fine">We reply within one business day with the cleanest next step for the audit.</p>
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
          <a href={`#calendly`} onClick={() => setMenuOpen(false)}>Start the Audit</a>
          <a href={`#contact`} onClick={() => setMenuOpen(false)}>Send Documents</a>
        </div>
      </nav>

      {/* ── Main content ── */}
      <main className="book-main">
        <div className="wrap">

          {/* Header */}
          <div className="book-header">
            <span className="section-eyebrow" style={{justifyContent:'center'}}>
              <span style={{width:6,height:6,borderRadius:'50%',background:'#22c55e',boxShadow:'0 0 10px #22c55e',display:'inline-block',animation:'pulse 1.8s infinite'}} />
              Currently running five-day document audits
            </span>
            <h1 className="book-h1">
              Start with the Consignd Document Audit.{' '}
              <span className="accent">See what your workflow is actually doing.</span>
            </h1>
            <p className="book-sub">
              Send 25–50 real documents from the last two weeks of operations. We will map the document mix, extract the fields, identify review points, and show whether a managed rollout is worth it.
            </p>
          </div>

          {/* What to expect strip */}
          <div className="book-expect">
            {[
              { ico:'⏱', text:'5-business-day audit' },
              { ico:'📄', text:'25–50 docs is enough to start' },
              { ico:'🧭', text:'Map fields, variation, and handoffs' },
              { ico:'📊', text:'Written findings + structured sample' },
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
            <GlowCard className="book-calendly-card" borderRadius={24} glowColor={GLOW_BLUE} hover="s" backgroundColor="rgba(2,11,24,0.82)" glowRadius={36} glowIntensity={0.8}>
              <div className="book-card-inner" id="calendly">
                <div className="book-card-head">
                  <div>
                    <div className="book-card-label">Start the Document Audit</div>
                    <h2 className="book-card-title">Book a 20-minute audit scoping call</h2>
                    <p className="book-card-desc">We will define the first document set, confirm the fields that matter, and make sure the five-day audit is scoped around a real operational bottleneck.</p>
                  </div>
                  <div className="book-card-features">
                    {[
                      'Choose the first 1–2 document types to test',
                      'Confirm fields, sources, and review constraints',
                      'Align on audit scope, timeline, and handoff',
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
            <GlowCard className="book-contact-card" borderRadius={24} glowColor={GLOW_ORANGE} hover="s" backgroundColor="rgba(2,11,24,0.82)" glowRadius={36} glowIntensity={0.8}>
              <div className="book-card-inner" id="contact">
                <div className="book-card-head">
                  <div>
                    <div className="book-card-label book-card-label-orange">Send Documents Instead</div>
                    <h2 className="book-card-title">Not ready to book?</h2>
                    <p className="book-card-desc">Tell us which documents create the most manual work right now. We will reply with the cleanest way to scope the audit — even if the honest answer is that the workflow is not ready yet.</p>
                  </div>
                  <div className="book-card-features">
                    {[
                      'No commitment, no sales pressure',
                      'Reply within one business day',
                      'Practical audit starting point, not a generic demo',
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
