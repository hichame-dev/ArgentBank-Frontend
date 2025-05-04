import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Layout from './components/layout/Layout'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import EditName from './pages/EditName/EditName'
import Profile from './pages/Profile/Profile'
import NotFound from './pages/NotFound/NotFound'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import TransactionsPage from './pages/TransactionsPage/TransactionsPage' // ✅ le bon import

console.log('[App.jsx] App routes loaded')

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/transactions" element={<PrivateRoute><TransactionsPage /></PrivateRoute>} />
          <Route path="/edit-name" element={<PrivateRoute><EditName /></PrivateRoute>} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
