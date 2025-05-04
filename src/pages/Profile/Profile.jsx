import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../../redux/slices/authSlice'
import './Profile.scss'

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

    const handleViewTransactions = (account) => {
        navigate('/transactions', {
            state: { account }
        })
    }

    return (
        <main className="main bg-dark">
            <div className="profile-container">
                <div className="profile-header">
                    <h1>
                        Welcome back
                        <br />
                        {user?.firstName || "Guest !"}
                    </h1>
                    <button
                        className="profile-edit-button"
                        onClick={() => navigate('/edit-name')}
                    >
                        Edit Name
                    </button>
                </div>

                <div className="profile-accounts">
                    <div className="profile-account">
                        <div>
                            <p className="profile-account-title">Argent Bank Checking (x8349)</p>
                            <p className="profile-account-amount">$2,082.79</p>
                            <p className="profile-account-desc">Available Balance</p>
                        </div>
                        <button
                            className="profile-btn"
                            onClick={() =>
                                handleViewTransactions({
                                    title: 'Argent Bank Checking (x8349)',
                                    transactions: [
                                        {
                                            date: '27/02/20',
                                            description: 'Golden Sun Bakery',
                                            amount: '$8.00',
                                            balance: '$298.00',
                                            type: 'Electronic',
                                            category: 'Food',
                                            note: 'Lorem ipsum',
                                        },
                                    ]
                                })
                            }
                        >
                            View transactions
                        </button>
                    </div>

                    <div className="profile-account">
                        <div>
                            <p className="profile-account-title">Argent Bank Savings (x6712)</p>
                            <p className="profile-account-amount">$10,928.42</p>
                            <p className="profile-account-desc">Available Balance</p>
                        </div>
                        <button
                            className="profile-btn"
                            onClick={() =>
                                handleViewTransactions({
                                    title: 'Argent Bank Savings (x6712)',
                                    transactions: [] // à remplir plus tard
                                })
                            }
                        >
                            View transactions
                        </button>
                    </div>

                    <div className="profile-account">
                        <div>
                            <p className="profile-account-title">Argent Bank Credit Card (x8349)</p>
                            <p className="profile-account-amount">$184.30</p>
                            <p className="profile-account-desc">Current Balance</p>
                        </div>
                        <button
                            className="profile-btn"
                            onClick={() =>
                                handleViewTransactions({
                                    title: 'Argent Bank Credit Card (x8349)',
                                    transactions: [] // à remplir plus tard
                                })
                            }
                        >
                            View transactions
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Profile
