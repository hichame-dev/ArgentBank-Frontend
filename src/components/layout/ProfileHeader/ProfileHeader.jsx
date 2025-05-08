import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../redux/slices/authSlice'
import logo from '../../../assets/img/argentBankLogo.png'
import './ProfileHeader.scss'

const ProfileHeader = () => {
    const userName = useSelector((state) => state.auth.user?.userName || 'User')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        setMessage('Utilisateur déconnecté')
        setTimeout(() => {
            setMessage('')
            navigate('/')
        }, 2000)
    }

    return (
        <header className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={logo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>

            <div className="main-nav-items">
                <span className="main-nav-user">{userName}</span>
                <Link to="/profile">
                    <i className="fa fa-user-circle icon" title="Account"></i>
                </Link>
                <i className="fa fa-cog icon" title="Settings"></i>
                <i
                    className="fa fa-sign-out-alt icon logout"
                    title="Logout"
                    onClick={handleLogout}
                ></i>
            </div>

            {message && <p className="logout-message">{message}</p>}
        </header>
    )
}

export default ProfileHeader
