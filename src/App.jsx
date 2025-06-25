import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginSuccess, setUser } from './redux/slices/authSlice'

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
    const user = localStorage.getItem('user')

    // ✅ On restaure uniquement si les deux sont présents
    if (token && user) {
      dispatch(loginSuccess({ token }))
      dispatch(setUser(JSON.parse(user)))
    }
  }, [dispatch])

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={<PrivateRoute><Profile /></PrivateRoute>}
          />
          <Route
            path="/transactions"
            element={<PrivateRoute><TransactionsPage /></PrivateRoute>}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
