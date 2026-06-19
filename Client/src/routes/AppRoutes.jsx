import React from 'react'
import Landing from '../pages/Landing'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import { Route, Routes } from "react-router"
import Dashboard from '../pages/Dashboard'
import ForgotPassword from '../pages/auth/ForgotPassword'
import ResetPassword from '../pages/auth/ResetPassword'
import VerifyEmail from '../pages/auth/VerifyEmail'
import ResendEmail from '../pages/auth/ResendEmail'
import ProtectedRoute from '../context/ProtectedRoute'
import PublicRoute from '../context/PublicRoute'
function AppRoutes() {
  return (
    <div>
      <Routes>
         <Route path='/' element={<Landing />} />
        <Route element={<PublicRoute />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/verify-email' element={<VerifyEmail />} />
          <Route path='/resend-email' element={<ResendEmail />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  )
}

export default AppRoutes
