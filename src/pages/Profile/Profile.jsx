import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../../redux/slices/authSlice'
import './Profile.scss'

const Profile = () => {
    const token = useSelector((state) => state.auth.token)
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [originalUsername, setOriginalUsername] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

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
                if (res.ok && data.body) {
                    dispatch(setUser(data.body))
                    setUsername(data.body.userName)
                    setOriginalUsername(data.body.userName)
                }
            } catch (err) {
                console.error('[Profile.jsx] Failed to load profile:', err)
            }
        }

        fetchProfile()
    }, [token, dispatch, navigate])

    const handleSave = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ userName: username }),
            })
            if (res.ok) {
                dispatch(setUser({ ...user, userName: username }))
                setOriginalUsername(username)
                setSuccessMessage('Nom modifié avec succès.')
                setErrorMessage('')
                setTimeout(() => {
                    setSuccessMessage('')
                    setIsEditing(false)
                }, 1000)
            } else {
                setErrorMessage("Impossible de modifier le nom d'utilisateur.")
            }
        } catch (err) {
            console.error("Error while saving profile:", err)
            setErrorMessage("Erreur réseau. Veuillez réessayer.")
        }
    }

    const handleCancel = () => {
        setUsername(originalUsername)
        setIsEditing(false)
    }

    const handleViewTransactions = (account) => {
        navigate('/transactions', {
            state: { account },
        })
    }

    return (
        <main className="main bg-dark">
            <div className="profile-container">
                <div className="profile-header">
                    <h1>
                        Welcome back
                        <br />
                        {user?.firstName || 'Guest !'}
                    </h1>

                    {!isEditing ? (
                        <button
                            className="profile-edit-button"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Name
                        </button>
                    ) : (
                        <section className="edit-profile white-box">
                            <h2>Edit user info</h2>
                            <form className="edit-form" onSubmit={(e) => e.preventDefault()}>
                                <div className="input-wrapper">
                                    <label htmlFor="username">User name:</label>
                                    <input
                                        id="username"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <label htmlFor="firstName">First name:</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        value={user?.firstName || ''}
                                        disabled
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <label htmlFor="lastName">Last name:</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        value={user?.lastName || ''}
                                        disabled
                                    />
                                </div>

                                <div className="button-group">
                                    <button type="button" className="btn save" onClick={handleSave}>
                                        Save
                                    </button>
                                    <button type="button" className="btn cancel" onClick={handleCancel}>
                                        Cancel
                                    </button>
                                </div>

                                {successMessage && <p className="success-message">{successMessage}</p>}
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                            </form>
                        </section>
                    )}
                </div>

                <div className="profile-accounts">
                    {[
                        {
                            title: 'Argent Bank Checking (x8349)',
                            amount: '$2,082.79',
                            desc: 'Available Balance',
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
                            ],
                        },
                        {
                            title: 'Argent Bank Savings (x6712)',
                            amount: '$10,928.42',
                            desc: 'Available Balance',
                            transactions: [],
                        },
                        {
                            title: 'Argent Bank Credit Card (x8349)',
                            amount: '$184.30',
                            desc: 'Current Balance',
                            transactions: [],
                        },
                    ].map((acc, idx) => (
                        <div className="profile-account" key={idx}>
                            <div>
                                <p className="profile-account-title">{acc.title}</p>
                                <p className="profile-account-amount">{acc.amount}</p>
                                <p className="profile-account-desc">{acc.desc}</p>
                            </div>
                            <button
                                className="profile-btn"
                                onClick={() => handleViewTransactions(acc)}
                            >
                                View transactions
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Profile
