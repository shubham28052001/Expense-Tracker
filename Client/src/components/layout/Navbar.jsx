import React from 'react'
import { Link } from "react-router-dom";
function Navbar() {

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        window.location.href = "/";
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <nav className="mx-auto px-4 md:px-6 lg:px-8 h-16 flex gap-2 lg:gap-0 items-center justify-between">

                <Link to="/" className="flex items-center gap-2">
                    <img
                        src="/logo.svg"
                        alt="ExpenseTracker Logo"
                        className="w-72 h-16 lg:w-48 lg:h-12"
                    />
                </Link>

                <div className="flex items-center gap-3">

                    {token ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="px-7 sm:px-5 sm:py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
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
                                className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
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