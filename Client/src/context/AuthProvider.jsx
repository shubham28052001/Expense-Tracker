import React, { Children, useState } from 'react'
import { createContext } from 'react'

export const AuthContexts = createContext();
function AuthContext({children}) {
    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    )

    const login = (newtoken) => {
        localStorage.setItem("token", newtoken);
        setToken(newtoken);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };
    return (
      <AuthContexts.Provider value={{token,login,logout}}>
        {children}
      </AuthContexts.Provider>
    )
}

export default AuthContext;
