import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => navigate('/register')}>
        Don't have an account? Register
      </button>
    </div>
  )
}

export default Login