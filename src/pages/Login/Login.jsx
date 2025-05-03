import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        console.log('[Login.jsx] Submit login form', { email, password })

        try {
            const response = await fetch('http://localhost:3001/api/v1/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()
            console.log('[Login.jsx] API response:', data)

            if (response.ok && data.body?.token) {
                dispatch(loginSuccess({ token: data.body.token }))
                console.log('[Login.jsx] Login success, token saved')
                navigate('/transactions')
            } else {
                setError(data.message || 'Login failed')
                console.error('[Login.jsx] Login error:', data.message)
            }
        } catch (err) {
            setError('Erreur de connexion')
            console.error('[Login.jsx] Network error:', err)
        }
    }

    return (
        <section className="login-page">
            <div className="login-container">
                <h1>Sign In</h1>
                <form onSubmit={handleLogin}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button className="login-button" type="submit">
                        Sign In
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Login
