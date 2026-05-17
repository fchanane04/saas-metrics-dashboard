import { useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Register</h1>
      <button onClick={() => navigate('/login')}>
        Already have an account? Login
      </button>
    </div>
  )
}

export default Register