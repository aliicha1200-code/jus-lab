import { useState } from 'react'
import { supabase } from './supabase'

function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        if (error) throw error
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password
        })
        if (error) throw error

        if (!data.session) {
          setMessage('Account created. Check your email to confirm your account.')
        }
      }
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f3f6fa',
      padding: '20px'
    }}>
      <form onSubmit={handleSubmit} style={{
        width: '100%',
        maxWidth: '390px',
        background: 'white',
        padding: '35px',
        borderRadius: '16px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.08)'
      }}>
        <h1 style={{ color: '#173b5e', textAlign: 'center' }}>
          ⚗ JusLab
        </h1>

        <h2 style={{ textAlign: 'center' }}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        <p style={{ textAlign: 'center', color: '#64748b' }}>
          {isLogin ? 'Sign in to continue' : 'Create your personal account'}
        </p>

        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          style={inputStyle}
        />

        <label>Password</label>
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="At least 6 characters"
          style={inputStyle}
        />

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Sign Up'}
        </button>

        {message && (
          <p style={{ color: '#b45309', marginTop: '15px', fontSize: '14px' }}>
            {message}
          </p>
        )}

        <p style={{ textAlign: 'center', marginTop: '22px' }}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin)
              setMessage('')
            }}
            style={{
              border: 'none',
              background: 'none',
              color: '#2563eb',
              cursor: 'pointer',
              marginLeft: '5px'
            }}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </form>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '12px',
  margin: '8px 0 18px',
  border: '1px solid #cbd5e1',
  borderRadius: '8px'
}

const buttonStyle = {
  width: '100%',
  padding: '13px',
  background: '#173b5e',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  marginTop: '10px'
}

export default Auth