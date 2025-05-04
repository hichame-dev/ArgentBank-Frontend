import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../../redux/slices/authSlice'
import './EditName.scss'

const EditName = () => {
    const token = useSelector((state) => state.auth.token)
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [originalUsername, setOriginalUsername] = useState('')

    useEffect(() => {
        if (!token) {
            console.warn('[EditName.jsx] No token found, redirecting...')
            return navigate('/login')
        }

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
                } else {
                    console.error('[EditName.jsx] Failed to fetch profile')
                }
            } catch (err) {
                console.error('[EditName.jsx] Network error:', err)
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

            const data = await res.json()
            if (res.ok) {
                dispatch(setUser({ ...user, userName: username }))
                setOriginalUsername(username)
            } else {
                console.error('[EditName.jsx] Error updating username:', data.message)
            }
        } catch (err) {
            console.error('[EditName.jsx] Save failed:', err)
        }
    }

    const handleCancel = () => {
        setUsername(originalUsername)
    }

    return (
        <main className="main bg-dark">
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
                        <input type="text" id="firstName" value={user?.firstName || ''} disabled />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="lastName">Last name:</label>
                        <input type="text" id="lastName" value={user?.lastName || ''} disabled />
                    </div>
                    <div className="button-group">
                        <button type="button" className="btn save" onClick={handleSave}>
                            Save
                        </button>
                        <button type="button" className="btn cancel" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default EditName
