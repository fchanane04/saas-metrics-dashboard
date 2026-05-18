import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    setError('')
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      await axios.post('http://127.0.0.1:8000/api/auth/register', { email, password })
      navigate('/login')
    } catch (err) {
      setError('Email already registered')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .form-input:focus { border-color: #1a6b3c !important; background: #fff !important; outline: none; }
        .register-btn:hover { background: #155c32 !important; }
      `}</style>

      <div style={{ display: 'flex', width: '100%', maxWidth: 900, minHeight: 560, borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.1)' }}>

        {/* Left Panel */}
        <div style={{ width: '45%', background: '#1a6b3c', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', width: 300, height: 300, background: 'rgba(255,255,255,0.05)', borderRadius: '50%', top: -100, right: -80 }} />
          <div style={{ position: 'absolute', width: 200, height: 200, background: 'rgba(255,255,255,0.05)', borderRadius: '50%', bottom: -60, left: -40 }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '3rem' }}>
            <div style={{ width: 28, height: 28, background: 'rgba(255,255,255,0.2)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="5" height="5" rx="1.5" fill="white"/>
                <rect x="9" y="2" width="5" height="5" rx="1.5" fill="white" opacity="0.6"/>
                <rect x="2" y="9" width="5" height="5" rx="1.5" fill="white" opacity="0.6"/>
                <rect x="9" y="9" width="5" height="5" rx="1.5" fill="white"/>
              </svg>
            </div>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>SaaS Metrics</span>
          </div>

          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '1rem' }}>Start for free today</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '2rem' }}>
            Create your account and get instant access to your SaaS analytics dashboard.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {[['⚡', 'Set up in under 2 minutes'], ['🔒', 'Secure & private'], ['📊', 'Full dashboard access']].map(([icon, text]) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 28, height: 28, background: 'rgba(255,255,255,0.15)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>{icon}</div>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ flex: 1, background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2.5rem' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.3rem' }}>Create account</div>
          <div style={{ fontSize: 13, color: '#888', marginBottom: '1.8rem' }}>Fill in your details to get started</div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#444', display: 'block', marginBottom: 5 }}>Email address</label>
            <input
              className="form-input"
              type="email"
              placeholder="john@company.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', padding: '0.65rem 0.9rem', border: '1.5px solid #e5e5e5', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', background: '#fafafa' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#444', display: 'block', marginBottom: 5 }}>Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.65rem 0.9rem', border: '1.5px solid #e5e5e5', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', background: '#fafafa' }}
            />
          </div>

          <div style={{ marginBottom: '0.5rem' }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#444', display: 'block', marginBottom: 5 }}>Confirm password</label>
            <input
              className="form-input"
              type="password"
              placeholder="••••••••"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              style={{ width: '100%', padding: '0.65rem 0.9rem', border: '1.5px solid #e5e5e5', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', background: '#fafafa' }}
            />
          </div>

          {error && (
            <div style={{ fontSize: 12, color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 7, padding: '0.5rem 0.8rem', marginBottom: '0.5rem' }}>
              ⚠ {error}
            </div>
          )}

          <button
            className="register-btn"
            onClick={handleRegister}
            disabled={loading}
            style={{ width: '100%', padding: '0.75rem', background: '#1a6b3c', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, border: 'none', borderRadius: 8, cursor: 'pointer', marginTop: '0.5rem', transition: 'background 0.2s' }}
          >
            {loading ? 'Creating account...' : 'Create account →'}
          </button>

          <div style={{ textAlign: 'center', fontSize: 12, color: '#888', marginTop: '1rem' }}>
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} style={{ color: '#1a6b3c', fontWeight: 600, cursor: 'pointer' }}>Sign in</span>
          </div>
        </div>
      </div>
    </div>
  )
}