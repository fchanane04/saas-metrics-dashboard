import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#f0efe8', backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px', overflow: 'hidden', fontFamily: "'DM Sans', sans-serif" }}>

      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2.5rem', background: 'rgba(240,239,232,0.85)', backdropFilter: 'blur(12px)', borderBottom: '0.5px solid rgba(0,0,0,0.08)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 600, color: '#1a1a1a' }}>
          <div style={{ width: 30, height: 30, background: '#1a1a1a', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="5" height="5" rx="1.5" fill="white"/>
              <rect x="9" y="2" width="5" height="5" rx="1.5" fill="white" opacity="0.5"/>
              <rect x="2" y="9" width="5" height="5" rx="1.5" fill="white" opacity="0.5"/>
              <rect x="9" y="9" width="5" height="5" rx="1.5" fill="white"/>
            </svg>
          </div>
          SaaS Metrics
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Features', 'How it works', 'Pricing'].map(link => (
            <a key={link} href="#" style={{ fontSize: 13, color: '#555', textDecoration: 'none' }}>{link}</a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => navigate('/login')} style={{ fontSize: 13, color: '#555', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
            Sign in
          </button>
          <button onClick={() => navigate('/register')} style={{ fontSize: 13, fontWeight: 500, color: '#fff', background: '#1a1a1a', border: 'none', borderRadius: 7, padding: '0.45rem 1.1rem', cursor: 'pointer', fontFamily: 'inherit' }}>
            Get started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>

        {/* Floating Card: MRR */}
        <div style={{ position: 'absolute', top: '8%', left: '4%', width: 165, background: '#fff', borderRadius: 12, border: '0.5px solid rgba(0,0,0,0.08)', padding: '0.8rem 1rem', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', animation: 'gentleFloat 4s ease-in-out infinite' }}>
          <div style={{ fontSize: 10, color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Monthly Revenue</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: '#1a1a1a' }}>$48,200</div>
          <div style={{ fontSize: 11, color: '#22c55e', marginTop: 3 }}>↑ 12.4% vs last month</div>
          <div style={{ display: 'flex', gap: 3, marginTop: 8, alignItems: 'flex-end', height: 24 }}>
            {[40, 55, 45, 70, 60, 80, 100].map((h, i) => (
              <span key={i} style={{ flex: 1, height: `${h}%`, background: i === 6 ? '#1a1a1a' : '#e5e5e5', borderRadius: 3 }} />
            ))}
          </div>
        </div>

        {/* Floating Card: Churn */}
        <div style={{ position: 'absolute', top: '6%', right: '4%', width: 175, background: '#fff', borderRadius: 12, border: '0.5px solid rgba(0,0,0,0.08)', padding: '0.8rem 1rem', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', animation: 'gentleFloat 4.5s ease-in-out infinite' }}>
          <div style={{ fontSize: 10, color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Churn Rate</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: '#1a1a1a' }}>3.2%</div>
          <div style={{ fontSize: 11, color: '#ef4444', marginTop: 3 }}>↑ 0.4% — needs attention</div>
          <div style={{ marginTop: 8, background: '#fef2f2', borderRadius: 5, padding: '5px 7px' }}>
            <div style={{ fontSize: 10, color: '#ef4444' }}>⚠ 3 customers at risk</div>
          </div>
        </div>

        {/* Floating Card: LTV/CAC */}
        <div style={{ position: 'absolute', bottom: '8%', left: '4%', width: 185, background: '#fff', borderRadius: 12, border: '0.5px solid rgba(0,0,0,0.08)', padding: '0.8rem 1rem', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', animation: 'gentleFloat 5s ease-in-out infinite' }}>
          <div style={{ fontSize: 10, color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>LTV : CAC Ratio</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: '#1a1a1a' }}>4.1x</div>
          <div style={{ fontSize: 11, color: '#22c55e', marginTop: 3 }}>✓ Healthy threshold</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
            {[['LTV', '$1,840'], ['CAC', '$449']].map(([label, val]) => (
              <div key={label} style={{ flex: 1, background: '#f0fdf4', borderRadius: 5, padding: 5, textAlign: 'center' }}>
                <div style={{ fontSize: 9, color: '#666' }}>{label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Card: AI */}
        <div style={{ position: 'absolute', bottom: '6%', right: '4%', width: 195, background: '#fff', borderRadius: 12, border: '0.5px solid rgba(0,0,0,0.08)', padding: '0.8rem 1rem', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', animation: 'gentleFloat 4.2s ease-in-out infinite' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <div style={{ width: 18, height: 18, background: '#7c3aed', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M5 1L6.2 3.8L9 4.5L6.8 6.8L7.4 9.5L5 8L2.6 9.5L3.2 6.8L1 4.5L3.8 3.8L5 1Z" fill="white"/></svg>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#1a1a1a' }}>AI Insight</span>
          </div>
          {['MRR growth is strong but churn is creeping up.', 'Recommend targeting Enterprise upsells.'].map((line, i) => (
            <div key={i} style={{ fontSize: 11, color: '#555', lineHeight: 1.5, marginTop: 4 }}>
              <span style={{ display: 'inline-block', width: 5, height: 5, background: '#7c3aed', borderRadius: '50%', marginRight: 4, verticalAlign: 'middle' }} />
              {line}
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff', border: '0.5px solid rgba(0,0,0,0.12)', borderRadius: 20, padding: '4px 12px', fontSize: 11, color: '#555', marginBottom: '1.2rem' }}>
          <span style={{ width: 6, height: 6, background: '#22c55e', borderRadius: '50%', display: 'inline-block' }} />
          AI-powered SaaS analytics
        </div>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', lineHeight: 1.1, color: '#1a1a1a' }}>
          Track, analyze, and grow
        </h1>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', fontStyle: 'italic', color: '#aaa', lineHeight: 1.1, marginBottom: '1rem' }}>
          all in one place
        </h2>
        <p style={{ fontSize: 14, color: '#666', maxWidth: 380, lineHeight: 1.6, marginBottom: '1.8rem' }}>
          Your SaaS health dashboard — real-time metrics, AI insights, and forecasts that help you make better decisions.
        </p>
        <button onClick={() => navigate('/register')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1a1a1a', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, padding: '0.75rem 1.8rem', borderRadius: 9, border: 'none', cursor: 'pointer' }}>
          Get started free
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 8h10M9 4l4 4-4 4"/>
          </svg>
        </button>
      </section>

      {/* Animation styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap');
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  )
}