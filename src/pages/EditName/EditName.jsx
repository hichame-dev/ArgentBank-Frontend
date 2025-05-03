import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'




const EditName = () => {
    const token = useSelector((state) => state.auth.token)
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [editMode, setEditMode] = useState(false)
    const [username, setUsername] = useState('')

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
                console.log('[EditName.jsx] Profile fetched:', data)

                if (res.ok && data.body) {
                    dispatch(setUser(data.body))
                    setUsername(data.body.userName)
                } else {
                    console.error('[EditName.jsx] Failed to fetch profile')
                }
            } catch (err) {
                console.error('[EditName.jsx] Network error:', err)
            }
        }

        fetchProfile()
    }, [token, dispatch, navigate])

    const handleEdit = () => setEditMode(true)
    const handleCancel = () => setEditMode(false)

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
            console.log('[EditName.jsx] Save response:', data)

            if (res.ok) {
                dispatch(setUser({ ...user, userName: username }))
                setEditMode(false)
            } else {
                console.error('[EditName.jsx] Error updating username:', data.message)
            }
        } catch (err) {
            console.error('[EditName.jsx] Save failed:', err)
        }
    }

    return (
        <section className="edit-profile">
            <div className="header">
                <h1>
                    Welcome back
                    <br />
                    {user?.firstName} {user?.lastName}!
                </h1>

                {editMode ? (
                    <div className="edit-form">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <div className="buttons">
                            <button onClick={handleSave}>Save</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <button onClick={handleEdit}>Edit Name</button>
                )}
            </div>
        </section>
    )
}

export default EditName
