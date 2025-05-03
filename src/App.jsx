import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Layout from './components/layout/Layout'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import EditName from './pages/EditName/EditName'
import Transactions from './pages/Transaction/Transaction'
import NotFound from './pages/NotFound/NotFound'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

console.log('[App.jsx] App routes loaded')

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/edit-name"
            element={
              <PrivateRoute>
                <EditName />
              </PrivateRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <PrivateRoute>
                <Transactions />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
