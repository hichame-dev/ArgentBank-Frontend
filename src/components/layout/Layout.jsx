import { Outlet, useLocation } from 'react-router-dom'
import MainHeader from './Header/MainHeader'
import ProfileHeader from './ProfileHeader/ProfileHeader'
import Footer from './Footer/Footer'

const Layout = () => {
    const location = useLocation()
    const isPrivatePage = location.pathname.startsWith('/profile') || location.pathname.startsWith('/transactions')

    return (
        <>
            {isPrivatePage ? <ProfileHeader /> : <MainHeader />}
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout
