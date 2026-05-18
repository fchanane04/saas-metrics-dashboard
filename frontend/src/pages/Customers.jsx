import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Customers() {
  const navigate = useNavigate()
  const [customers, setCustomers] = useState([])
  const [userEmail, setUserEmail] = useState('')
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      setUserEmail(payload.sub)
    } catch {
      navigate('/login')
    }
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/customers', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCustomers(res.data)
    } catch (err) {
      navigate('/login')
    } finally {
      setLoading(false)
    }
  }

  const initial = userEmail ? userEmail[0].toUpperCase() : '?'

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: "'Inter', sans-serif", background: '#f4f6f8', overflow: 'hidden' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .menu-item { display:flex; align-items:center; gap:10px; padding:0.6rem 0.8rem; border-radius:8px; font-size:13px; font-weight:500; color:#666; cursor:pointer; margin-bottom:2px; transition:all 0.15s; }
        .menu-item:hover { background:#f8f9fa; color:#1a1a1a; }
        .menu-item.active { background:#f0faf4; color:#1a6b3c; font-weight:600; }
        tr:hover td { background: #f8f9fa; }
      `}</style>

      {/* Sidebar */}
      <div style={{ width: 220, background: '#fff', borderRight: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', padding: '1.5rem 1rem', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '2rem', padding: '0 0.5rem' }}>
          <div style={{ width: 30, height: 30, background: '#1a6b3c', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="5" height="5" rx="1.5" fill="white"/>
              <rect x="9" y="2" width="5" height="5" rx="1.5" fill="white" opacity="0.6"/>
              <rect x="2" y="9" width="5" height="5" rx="1.5" fill="white" opacity="0.6"/>
              <rect x="9" y="9" width="5" height="5" rx="1.5" fill="white"/>
            </svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a' }}>SaaS Metrics</span>
        </div>

        <div style={{ fontSize: 10, fontWeight: 600, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 0.5rem', marginBottom: '0.5rem' }}>Menu</div>

        {[
          { icon: '▦', label: 'Dashboard', path: '/dashboard' },
          { icon: '📈', label: 'Revenue', path: '/revenue' },
          { icon: '👥', label: 'Customers', path: '/customers', active: true },
          { icon: '🔮', label: 'Forecast', path: '/forecast' },
          { icon: '🤖', label: 'AI Insights', path: '/ai-insights' },
        ].map(item => (
          <div key={item.label} className={`menu-item ${item.active ? 'active' : ''}`} onClick={() => navigate(item.path)}>
            <span style={{ fontSize: 15, width: 18, textAlign: 'center' }}>{item.icon}</span>
            {item.label}
          </div>
        ))}

        <div style={{ height: 1, background: '#f0f0f0', margin: '1rem 0' }} />

        <div style={{ fontSize: 10, fontWeight: 600, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 0.5rem', marginBottom: '0.5rem' }}>General</div>

        <div className="menu-item"><span style={{ fontSize: 15, width: 18, textAlign: 'center' }}>⚙</span> Settings</div>
        <div className="menu-item" onClick={() => { localStorage.removeItem('token'); navigate('/login') }}>
          <span style={{ fontSize: 15, width: 18, textAlign: 'center' }}>🚪</span> Logout
        </div>

        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.7rem 0.8rem', background: '#f8f9fa', borderRadius: 10 }}>
            <div style={{ width: 30, height: 30, background: '#1a6b3c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>{initial}</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a' }}>My Account</div>
              <div style={{ fontSize: 10, color: '#999' }}>{userEmail}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Topbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.8rem', background: '#fff', borderBottom: '1px solid #f0f0f0', flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#1a1a1a' }}>Customers</div>
            <div style={{ fontSize: 12, color: '#999', marginTop: 1 }}>Manage and track your customers</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f0faf4', border: '1px solid #c3e6d0', borderRadius: 8, padding: '0.5rem 1rem' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#1a6b3c' }}>{customers.length} total customers</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1.8rem' }}>
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999', fontSize: 14 }}>
              Loading customers...
            </div>
          ) : (
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #f0f0f0', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa', borderBottom: '1px solid #f0f0f0' }}>
                    {['Company', 'Email', 'Country', 'Industry', 'Joined', 'Status'].map(h => (
                      <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c, i) => (
                    <tr key={c.id} style={{ borderBottom: '1px solid #f8f8f8' }}>
                      <td style={{ padding: '0.85rem 1rem', fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 28, height: 28, background: '#f0faf4', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#1a6b3c' }}>
                            {c.company_name[0]}
                          </div>
                          {c.company_name}
                        </div>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', fontSize: 13, color: '#666' }}>{c.email}</td>
                      <td style={{ padding: '0.85rem 1rem', fontSize: 13, color: '#666' }}>{c.country}</td>
                      <td style={{ padding: '0.85rem 1rem', fontSize: 13, color: '#666' }}>{c.industry}</td>
                      <td style={{ padding: '0.85rem 1rem', fontSize: 13, color: '#666' }}>{c.joined_at}</td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 20, background: c.status === 'active' ? '#f0faf4' : '#fef2f2', color: c.status === 'active' ? '#1a6b3c' : '#dc2626' }}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}