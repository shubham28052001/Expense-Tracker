import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import AppRoutes from './routes/AppRoutes'
import { Toaster, toast } from "react-hot-toast";
import AuthContext from './context/AuthProvider';
function App() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    })
  }, []);
  return (
    <div>
      <AuthContext>
        <AppRoutes />
      </AuthContext>
      <Toaster position="top-right" />
    </div>
  )
}

export default App
