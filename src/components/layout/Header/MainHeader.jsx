import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../redux/slices/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../../../assets/img/argentBankLogo.png'
import './MainHeader.scss'

const Header = () => {
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        console.log('[Header.jsx] Logging out...')
        dispatch(logout())
        navigate('/')
    }

    return (
        <header className="header">
            <Link to="/" className="header-logo">
                <img src={logo} alt="Argent Bank Logo" className="header-logo-img" />
            </Link>
            <nav className="header-nav">
                {user ? (
                    <>
                        <span className="user-name">{user.userName}</span>
                        <i className="fa fa-user-circle icon" title="Profile"></i>
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
