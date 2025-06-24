import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../redux/slices/authSlice'
import logo from '../../../assets/img/argentBankLogo.webp'
import './ProfileHeader.scss'

const ProfileHeader = () => {
    const userName = useSelector((state) => state.auth.username || 'User') // ✅ maintenant depuis Redux
    const [message, setMessage] = useState('')
    const [isOpen, setIsOpen] = useState(false)
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

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <header className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={logo}
                    alt="Argent Bank Logo"
                    loading="lazy"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>

            {/* Burger button */}
            <button className="burger" onClick={toggleMenu} aria-label="Menu">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>

            <div className={`main-nav-items ${isOpen ? 'open' : ''}`}>
                <span className="main-nav-user">{userName}</span>
                <Link to="/profile">
                    <i className="fa fa-user-circle icon" title="Account"></i>
                </Link>
                <Link to="/settings">
                    <i className="fa fa-cog icon" title="Settings"></i>
                </Link>
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
