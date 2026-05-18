import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: "'Inter', sans-serif", background: '#fff' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .nav-link:hover { color: #1a1a1a !important; }
        .cta-main:hover { background: #155c32 !important; }
        .cta-outline:hover { background: #f8f8f8 !important; }
      `}</style>

      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 3rem', background: '#fff', borderBottom: '1px solid #f0f0f0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 16, fontWeight: 700, color: '#1a1a1a' }}>
          <div style={{ width: 32, height: 32, background: '#1a6b3c', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="5" height="5" rx="1.5" fill="white"/>
              <rect x="9" y="2" width="5" height="5" rx="1.5" fill="white" opacity="0.6"/>
              <rect x="2" y="9" width="5" height="5" rx="1.5" fill="white" opacity="0.6"/>
              <rect x="9" y="9" width="5" height="5" rx="1.5" fill="white"/>
            </svg>
          </div>
          SaaS Metrics
        </div>

        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {['Home', 'Features', 'Pricing', 'About'].map(link => (
            <a key={link} href="#" className="nav-link" style={{ fontSize: 14, color: '#666', textDecoration: 'none' }}>{link}</a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => navigate('/login')} style={{ fontSize: 14, color: '#555', background: 'none', border: '1px solid #e5e5e5', borderRadius: 8, padding: '0.5rem 1.2rem', cursor: 'pointer', fontFamily: 'inherit' }}>
            Sign in
          </button>
          <button onClick={() => navigate('/register')} style={{ fontSize: 14, fontWeight: 600, color: '#fff', background: '#1a6b3c', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', cursor: 'pointer', fontFamily: 'inherit' }}>
            Get started →
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem 3rem' }}>

        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#f0faf4', border: '1px solid #c3e6d0', borderRadius: 20, padding: '5px 14px', fontSize: 12, color: '#1a6b3c', fontWeight: 500, marginBottom: '1.8rem', animation: 'fadeUp 0.5s ease both' }}>
          <span style={{ width: 6, height: 6, background: '#1a6b3c', borderRadius: '50%', display: 'inline-block' }} />
          AI-powered SaaS analytics platform
        </div>

        {/* Title */}
        <h1 style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, color: '#1a1a1a', marginBottom: '1.2rem', maxWidth: 800, animation: 'fadeUp 0.5s ease 0.1s both' }}>
          Track, analyze, and grow<br />
          your SaaS <span style={{ color: '#1a6b3c' }}>smarter</span>
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: 16, color: '#666', maxWidth: 500, lineHeight: 1.7, marginBottom: '2.2rem', animation: 'fadeUp 0.5s ease 0.2s both' }}>
          Real-time MRR, churn, LTV and CAC dashboards — powered by AI that predicts, alerts, and recommends actions to grow your business.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3.5rem', animation: 'fadeUp 0.5s ease 0.25s both' }}>
          <button className="cta-main" onClick={() => navigate('/register')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1a6b3c', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, padding: '0.8rem 2rem', borderRadius: 10, border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}>
            Get started free
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 8h10M9 4l4 4-4 4"/>
            </svg>
          </button>
          <button className="cta-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#1a1a1a', fontFamily: 'inherit', fontSize: 15, fontWeight: 500, padding: '0.8rem 2rem', borderRadius: 10, border: '1px solid #e5e5e5', cursor: 'pointer', transition: 'background 0.2s' }}>
            ● See how it works
          </button>
        </div>

        {/* Social Proof */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', animation: 'fadeUp 0.5s ease 0.3s both' }}>
          <div style={{ fontSize: 11, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}>
            Trusted by fast-growing SaaS teams
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            {['Acme', 'Stripe', 'Notion', 'Linear', 'Vercel'].map(name => (
              <span key={name} style={{ fontSize: 14, color: '#ccc', fontWeight: 700, letterSpacing: '-0.02em' }}>{name}</span>
            ))}
          </div>
        </div>

      </section>
    </div>
  )
}