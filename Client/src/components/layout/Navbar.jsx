import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";
import { AuthContexts } from '../../context/AuthProvider';
function Navbar() {

    const { token, logout, theme, toggleTheme } = useContext(AuthContexts);

    const handleLogout = () => {
        logout();
        window.location.href = "/";
    };

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <nav className="mx-auto px-4 md:px-6 lg:px-8 h-16 flex gap-2 lg:gap-0 items-center justify-between">

                <Link to="/" className="flex items-center gap-2">
                    <img
                        src="/logo.svg"
                        alt="ExpenseTracker Logo"
                        className="w-72 h-16 lg:w-48 lg:h-12"
                    />
                </Link>

                <div className="hidden md:flex items-center w-sm justify-between">
                    <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600">
                        Features
                    </a>

                    <a href="#working" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600">
                        How It Works
                    </a>

                    <a href="#testimonials" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600">
                        Testimonials
                    </a>
                </div>

                <div className="flex items-center gap-3">

                    <button className='dark:text-white' onClick={toggleTheme}>
                        {theme === "light" ? <FiMoon size={22} /> : <FiSun size={22} />}
                    </button>

                    {token ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="px-7 sm:px-5 sm:py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            >
                                Go to Dashboard
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/register"
                                className="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/login"
                                className="px-5 py-2 lg:px-5 lg:py-2 lg:text-[16px] whitespace-nowrap rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                            >
                                Get Started
                            </Link>
                        </>
                    )}

                </div>
            </nav>
        </header>
    );
}

export default Navbar;