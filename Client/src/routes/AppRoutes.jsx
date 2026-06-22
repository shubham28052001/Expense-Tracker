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
import Home from '../components/Dashbaordlayout/Home'
import Expense from '../components/Dashbaordlayout/Expense'
import Budgets from '../components/Dashbaordlayout/Budgets'
import Analytics from '../components/Dashbaordlayout/Analytics'
import AIInsights from '../components/Dashbaordlayout/AIInsights'
import Profile from '../components/Dashbaordlayout/Profile'
import Settings from '../components/Dashbaordlayout/Settings'
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
          <Route path='/dashboard' element={<Dashboard />} >
            <Route index element={<Home />} />
            <Route path='expenses' element={<Expense />} />
            <Route path='budgets' element={<Budgets />} />
            <Route path='analytics' element={<Analytics />} />
            <Route path='ai-insights' element={<AIInsights />} />
            <Route path='profile' element={<Profile />} />
            <Route path='settings' element={<Settings />} />
          </Route>
        </Route>
      </Routes>

    </div>
  )
}

export default AppRoutes
