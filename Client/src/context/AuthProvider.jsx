import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { getProfile } from "../services/authService";

export const AuthContexts = createContext();
function AuthContext({ children }) {
    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    )

    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    )

    useEffect(() => {
        document.documentElement.classList.toggle(
            "dark",
            theme === "dark"
        );
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";

        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        if (token) {
            fetchProfile();
        }
    }, [token]);


    const fetchProfile = async () => {
        try {
            const res = await getProfile();
            setUser(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const login = (newtoken) => {
        localStorage.setItem("token", newtoken);
        setToken(newtoken);
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        setToken(null);
        setUser(null);
    };
    return (
        <AuthContexts.Provider value={{ token, login, logout, user, setUser, theme, toggleTheme }}>
            {children}
        </AuthContexts.Provider>
    )
}

export default AuthContext;
