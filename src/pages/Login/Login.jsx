import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginSuccess, setUser } from '../../redux/slices/authSlice'
import './Login.scss'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('[Login] Attempt login with:', email)

        try {
            // 🔐 Connexion à l'API
            const loginResponse = await fetch('http://localhost:3001/api/v1/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            if (!loginResponse.ok) {
                throw new Error('Échec de connexion (login API)')
            }

            const loginData = await loginResponse.json()
            console.log('[Login] Login response:', loginData)

            const token = loginData?.body?.token
            if (!token) {
                setError('Identifiants incorrects')
                console.error('[Login] Token manquant')
                return
            }

            dispatch(loginSuccess({ token }))
            // Enregistrement du token dans le localStorage
            localStorage.setItem('token', token)

            // 📡 Appel sécurisé au profil
            const profileResponse = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })

            if (!profileResponse.ok) {
                throw new Error(`Erreur profil (${profileResponse.status})`)
            }

            const profileData = await profileResponse.json()
            console.log('[Login] Profile response:', profileData)

            if (profileData.body) {
                dispatch(setUser(profileData.body))
            }

            // ✅ Redirection
            navigate('/profile')
        } catch (err) {
            console.error('[Login] Erreur attrapée :', err)
            setError('Erreur de connexion ou utilisateur inconnu')
        }
    }

    return (
        <main className="main bg-dark">
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

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="sign-in-button">
                        Sign In
                    </button>
                </form>
            </section>
        </main>
    )
}

export default Login
