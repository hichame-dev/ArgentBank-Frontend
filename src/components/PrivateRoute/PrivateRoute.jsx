import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ children }) => {
    const token = useSelector((state) => state.auth.token)
    console.log('[PrivateRoute.jsx] Vérification du token :', token)

    return token ? children : <Navigate to="/login" replace />
}

export default PrivateRoute
