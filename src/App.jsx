import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginSuccess } from './redux/slices/authSlice'

import Layout from './components/layout/Layout'
import Home from './pages/Home/Home'
import Login from './Pages/Login/Login'
import Profile from './pages/Profile/Profile'
import NotFound from './pages/NotFound/NotFound'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import TransactionsPage from './pages/TransactionsPage/TransactionsPage'



function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(loginSuccess({ token }))
    }
  }, [dispatch])

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={
            <PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/transactions" element={
            <PrivateRoute><TransactionsPage /></PrivateRoute>} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
