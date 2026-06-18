import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { Toaster, toast } from "react-hot-toast";
function App() {
  return (
    <div>
   <AppRoutes/>
   <Toaster position="top-right" />
    </div>
  )
}

export default App
