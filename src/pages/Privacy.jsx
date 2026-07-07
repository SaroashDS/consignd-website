import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

const TEAM_EMAIL = 'website.inquiries@consignd.one'

/* ponytail: static one-pager, no CMS — expand into real legal copy before
   the first signed customer contract. */
export default function Privacy() {
  useEffect(() => {
    document.title = 'Privacy & Security — Consignd'
  }, [])

  return (
    <>
      <nav className="nav scrolled" id="privacy-nav">
        <div className="nav-inner">
          <Link to="/" className="logo" aria-label="Consignd DataCore"><Logo /></Link>
          <div className="nav-right">
            <Link to="/" className="btn btn-ghost nav-cta" style={{fontSize:'13px',padding:'9px 16px'}}>← Back to site</Link>
          </div>
        </div>
      </nav>

      <main className="legal-main wrap">
        <h1>Privacy &amp; Security</h1>
        <p className="legal-updated">Last updated: July 2026</p>

        <h2>What we collect on this website</h2>
        <p>
          The contact form on this site collects your name, company, work email,
          approximate monthly load volume, and the message you write. We use it
          for exactly one thing: replying to you about the Document Audit. We do
          not sell it, share it, or add you to a marketing list you didn't ask for.
        </p>

        <h2>How audit documents are handled</h2>
        <p>
          Documents you send for a Document Audit (rate confirmations, BOLs,
          PODs, invoices) are treated as your confidential business records.
          They are used only to produce your audit report, are accessible only
          to the people working on your audit, and are deleted on request. We
          are happy to sign a mutual NDA before you send anything.
        </p>

        <h2>Analytics</h2>
        <p>
          We use Vercel Speed Insights for anonymous performance measurement.
          No advertising trackers, no cross-site cookies.
        </p>

        <h2>Questions or requests</h2>
        <p>
          Email <a href={`mailto:${TEAM_EMAIL}`}>{TEAM_EMAIL}</a> to ask what we
          hold about you, correct it, or have it deleted. We reply within one
          business day.
        </p>
      </main>

      <footer>
        <div className="wrap foot">
          <Link to="/" className="logo" aria-label="Consignd DataCore"><Logo /></Link>
          <div className="foot-links">
            <Link to="/privacy">Privacy &amp; Security</Link>
            <a href={`mailto:${TEAM_EMAIL}`}>Contact</a>
          </div>
          <div>© 2026 Consignd, Inc. · DataCore™</div>
        </div>
      </footer>
    </>
  )
}
