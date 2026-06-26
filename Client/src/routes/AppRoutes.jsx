import React, { Suspense, lazy } from 'react'
import { Route, Routes } from "react-router"
const Landing = lazy(() => import('../pages/Landing'));
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));
const VerifyEmail = lazy(() => import('../pages/auth/VerifyEmail'));
const ResendEmail = lazy(() => import('../pages/auth/ResendEmail'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Home = lazy(() => import('../components/Dashbaordlayout/Home'));
const Expense = lazy(() => import('../components/Dashbaordlayout/Expense'));
const Budgets = lazy(() => import('../components/Dashbaordlayout/Budgets'));
const Analytics = lazy(() => import('../components/Dashbaordlayout/Analytics'));
const AIInsights = lazy(() => import('../components/Dashbaordlayout/AIInsights'));
const Profile = lazy(() => import('../components/Dashbaordlayout/Profile'));
const Settings = lazy(() => import('../components/Dashbaordlayout/Settings'));
const AccounInfo = lazy(() => import('../components/HomePage/AccounInfo'));
import PublicRoute from "../context/PublicRoute.jsx";
import ProtectedRoute from "../context/ProtectedRoute.jsx"

function AppRoutes() {
  return (
    <div>
      <Suspense fallback={
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
      </div>
    }>
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
            <Route path='/accountinfo/:id' element={<AccounInfo />} />
          </Route>

        </Routes>
      </Suspense>

    </div>
  )
}

export default AppRoutes
