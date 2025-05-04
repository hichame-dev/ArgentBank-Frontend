import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../assets/img/argentBankLogo.png'
import './ProfileHeader.scss'

const ProfileHeader = () => {
    const userName = localStorage.getItem('userName') || 'User'

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
                <i className="fa fa-user-circle icon" title="Account"></i>
                <i className="fa fa-cog icon" title="Settings"></i>
                <i className="fa fa-power-off icon logout" title="Logout"></i>
            </div>
        </header>
    )
}

export default ProfileHeader
