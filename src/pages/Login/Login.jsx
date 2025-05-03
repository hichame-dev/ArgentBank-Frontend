import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess, setUser } from '../../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import './Login.scss'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        console.log('[Login.jsx] Trying login with:', email)

        try {
            const response = await fetch('http://localhost:3001/api/v1/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (data?.body?.token) {
                dispatch(loginSuccess({ token: data.body.token }))
                console.log('[Login.jsx] Token reçu ✅', data.body.token)

                // Fetch user profile
                const userRes = await fetch('http://localhost:3001/api/v1/user/profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${data.body.token}`,
                    },
                })

                const userData = await userRes.json()
                if (userData?.body) {
                    dispatch(setUser(userData.body))
                    console.log('[Login.jsx] Utilisateur reçu ✅', userData.body)
                    navigate('/user')
                } else {
                    throw new Error('Erreur lors de la récupération du profil utilisateur.')
                }
            } else {
                setError('Identifiants invalides')
                console.log('[Login.jsx] Login échoué ❌', data)
            }
        } catch (err) {
            setError('Une erreur est survenue')
            console.error('[Login.jsx] Erreur fetch ❌', err)
        }
    }

    return (
        <main className="bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button className="sign-in-button">Sign In</button>
                </form>
            </section>
        </main>
    )
}

export default Login
