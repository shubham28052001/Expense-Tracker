import React from 'react'
import { Link } from "react-router"
function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-bold text-blue-600"
                >
                    ExpenseTracker
                </Link>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
                    <a href="#features" className="hover:text-blue-600 transition">
                        Features
                    </a>

                    <a href="#pricing" className="hover:text-blue-600 transition">
                        Pricing
                    </a>

                    <a href="#about" className="hover:text-blue-600 transition">
                        About
                    </a>

                    <a href="#contact" className="hover:text-blue-600 transition">
                        Contact
                    </a>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3">
                    <button
                        className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                    >
                        Dashboard
                    </button>

                    <button
                        className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        Get Started
                    </button>
                </div>

            </nav>
        </header>
    )
}

export default Navbar
