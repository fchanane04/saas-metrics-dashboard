import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function Dashboard() {
  const navigate = useNavigate()
  const [revenue, setRevenue] = useState(null)
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem('token')

  const fetchRevenue = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/metrics/revenue/summary', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setRevenue(res.data)
    } catch (err) {
      navigate('/login')
    } finally {
      setLoading(false)
    }
  }

  const chartData = [
    { month: 'Jan', mrr: 28000 },
    { month: 'Feb', mrr: 31000 },
    { month: 'Mar', mrr: 34000 },
    { month: 'Apr', mrr: 38000 },
    { month: 'May', mrr: 41000 },
    { month: 'Jun', mrr: 44000 },
    { month: 'Jul', mrr: revenue?.mrr || 48000 },
  ]

  const formatCurrency = (val) => `$${val.toLocaleString()}`

  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
  if (!token) { navigate('/login'); return }
  // Decode JWT token to get email
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    setUserEmail(payload.sub)
  } catch {
    navigate('/login')
  }
  fetchRevenue()
  }, [])
  const initial = userEmail ? userEmail[0].toUpperCase() : '?'

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: "'Inter', sans-serif", background: '#f4f6f8', overflow: 'hidden' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .menu-item { display:flex; align-items:center; gap:10px; padding:0.6rem 0.8rem; border-radius:8px; font-size:13px; font-weight:500; color:#666; cursor:pointer; margin-bottom:2px; transition:all 0.15s; }
        .menu-item:hover { background:#f8f9fa; color:#1a1a1a; }
        .menu-item.active { background:#f0faf4; color:#1a6b3c; font-weight:600; }
        .topbar-icon:hover { background:#f0f0f0 !important; }
        .ai-btn:hover { background:#155c32 !important; }
      `}</style>

      {/* Sidebar */}
      <div style={{ width: 220, background: '#fff', borderRight: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', padding: '1.5rem 1rem', flexShrink: 0 }}>

        {/* Logo */}
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

        {/* Menu */}
        <div style={{ fontSize: 10, fontWeight: 600, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 0.5rem', marginBottom: '0.5rem' }}>Menu</div>

        {[
          { icon: '▦', label: 'Dashboard', path: '/dashboard', active: true },
          { icon: '📈', label: 'Revenue' },
          { icon: '👥', label: 'Customers', path: '/customers' },
          { icon: '🔮', label: 'Forecast' },
          { icon: '🤖', label: 'AI Insights' },
        ].map(item => (
          <div
            key={item.label}
            className={`menu-item ${item.active ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span style={{ fontSize: 15, width: 18, textAlign: 'center' }}>{item.icon}</span>
            {item.label}
          </div>
        ))}

        <div style={{ height: 1, background: '#f0f0f0', margin: '1rem 0' }} />

        <div style={{ fontSize: 10, fontWeight: 600, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 0.5rem', marginBottom: '0.5rem' }}>General</div>

        <div className="menu-item">
          <span style={{ fontSize: 15, width: 18, textAlign: 'center' }}>⚙</span> Settings
        </div>
        <div className="menu-item" onClick={() => { localStorage.removeItem('token'); navigate('/login') }}>
          <span style={{ fontSize: 15, width: 18, textAlign: 'center' }}>🚪</span> Logout
        </div>

        {/* User card */}
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
            <div style={{ fontSize: 20, fontWeight: 800, color: '#1a1a1a' }}>Dashboard</div>
            <div style={{ fontSize: 12, color: '#999', marginTop: 1 }}>Track your SaaS health in real time</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="topbar-icon" style={{ width: 34, height: 34, background: '#f8f9fa', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, cursor: 'pointer', border: '1px solid #f0f0f0', transition: 'background 0.15s' }}>🔔</div>
            <div className="topbar-icon" style={{ width: 34, height: 34, background: '#f8f9fa', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, cursor: 'pointer', border: '1px solid #f0f0f0', transition: 'background 0.15s' }}>✉</div>
            <button className="ai-btn" style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#1a6b3c', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1rem', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s' }}>
              + Generate AI Report
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1.8rem' }}>

          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999', fontSize: 14 }}>
              Loading metrics...
            </div>
          ) : (
            <>
              {/* KPI Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>

                {/* MRR - Featured */}
                <div style={{ background: '#1a6b3c', borderRadius: 12, padding: '1.2rem', border: '1px solid #1a6b3c' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>MRR</div>
                    <div style={{ width: 28, height: 28, background: 'rgba(255,255,255,0.2)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2"><path d="M4 12L12 4M12 4H6M12 4v6"/></svg>
                    </div>
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 6 }}>{formatCurrency(revenue?.mrr || 0)}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>↑ Increased from last month</div>
                </div>

                {/* ARR */}
                <div style={{ background: '#fff', borderRadius: 12, padding: '1.2rem', border: '1px solid #f0f0f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em' }}>ARR</div>
                    <div style={{ width: 28, height: 28, background: '#f0faf4', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#1a6b3c" strokeWidth="2"><path d="M4 12L12 4M12 4H6M12 4v6"/></svg>
                    </div>
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#1a1a1a', marginBottom: 6 }}>{formatCurrency(revenue?.arr || 0)}</div>
                  <div style={{ fontSize: 11, color: '#1a6b3c', fontWeight: 500 }}>↑ Annualized revenue</div>
                </div>

                {/* Churned MRR */}
                <div style={{ background: '#fff', borderRadius: 12, padding: '1.2rem', border: '1px solid #f0f0f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Churned MRR</div>
                    <div style={{ width: 28, height: 28, background: '#fef2f2', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#dc2626" strokeWidth="2"><path d="M4 4L12 12M12 12H6M12 12V6"/></svg>
                    </div>
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#1a1a1a', marginBottom: 6 }}>{formatCurrency(revenue?.churned_mrr || 0)}</div>
                  <div style={{ fontSize: 11, color: '#dc2626', fontWeight: 500 }}>↑ Lost this month</div>
                </div>

              </div>

              {/* Chart */}
              <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #f0f0f0', padding: '1.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>Monthly Recurring Revenue</div>
                    <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>Last 7 months performance</div>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#1a6b3c', background: '#f0faf4', border: '1px solid #c3e6d0', borderRadius: 20, padding: '3px 10px' }}>↑ Growing</div>
                </div>

                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={chartData} barSize={36}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#bbb' }} />
                    <YAxis hide />
                    <Tooltip
                      formatter={(val) => [formatCurrency(val), 'MRR']}
                      contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #f0f0f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                    />
                    <Bar dataKey="mrr" radius={[5, 5, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={index} fill={index === chartData.length - 1 ? '#1a6b3c' : '#e8f5ee'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                  {[['#1a6b3c', 'Current month'], ['#e8f5ee', 'Previous months']].map(([color, label]) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#666' }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}