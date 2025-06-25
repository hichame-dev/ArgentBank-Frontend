import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../redux/slices/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../../../assets/img/argentBankLogo.webp'
import './MainHeader.scss'

const Header = () => {
    const username = useSelector((state) => state.auth.username)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    localStorage.removeItem('username') // ← AJOUT OBLIGATOIRE
    navigate('/')
}


    return (
        <header className="header">
            <Link to="/" className="header-logo">
                <img
                    src={logo}
                    alt="Argent Bank Logo"
                    className="header-logo-img"
                    loading="lazy"
                />
            </Link>

            <nav className="header-nav">
                {username ? (
                    <>
                        <span className="user-name">{username}</span>
                        <Link to="/profile">
                            <i className="fa fa-user-circle icon" title="Profile"></i>
                        </Link>
                        <i className="fa fa-cog icon" title="Settings"></i>
                        <i
                            className="fa fa-sign-out icon logout"
                            title="Logout"
                            onClick={handleLogout}
                        ></i>
                    </>
                ) : (
                    <Link to="/login">
                        <i className="fa fa-user-circle icon"></i> Sign In
                    </Link>
                )}
            </nav>
        </header>
    )
}

export default Header
