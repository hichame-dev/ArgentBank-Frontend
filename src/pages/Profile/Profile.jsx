import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../../redux/slices/authSlice'
import './Profile.scss'
import Transactions from '../Transaction/Transaction'

const Profile = () => {
    const token = useSelector((state) => state.auth.token)
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) return navigate('/login')

        const fetchProfile = async () => {
            try {
                const res = await fetch('http://localhost:3001/api/v1/user/profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
                const data = await res.json()
                if (res.ok && data.body) dispatch(setUser(data.body))
            } catch (err) {
                console.error('[Profile.jsx] Failed to load profile:', err)
            }
        }

        fetchProfile()
    }, [token, dispatch, navigate])

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>
                    Welcome back
                    <br />
                    {user?.firstName || "Guest !"} {/* Affiche "Tony" ou "Guest" si non défini */}
                </h1>
                <button className="edit-button" onClick={() => navigate('/edit-name')}>
                    Edit Name
                </button>
            </div>

            {/* Affichage des transactions sous l'en-tête */}
            <Transactions />
        </main>
    )
}

export default Profile
