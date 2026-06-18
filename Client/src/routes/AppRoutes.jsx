import React from 'react'
import Landing from '../pages/Landing'
import Login from '../pages/Login'
import Register from '../pages/Register'
import {Route,Routes} from "react-router"
import Dashboard from '../pages/Dashboard'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
function AppRoutes() {
  return (
    <div>
            <Routes>
              <Route path='/' element={<Landing/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/forgot' element={<ForgotPassword/>}/>
              <Route path='/reset-password' element={<ResetPassword/>}/>
            </Routes>
    </div>
  )
}

export default AppRoutes
