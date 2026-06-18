import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/layout/Navbar";
import toast from "react-hot-toast";
import { forgotPassword } from "../services/authService"

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            return toast.error("Email is required");
        }

        try {
            setLoading(true);

            const res = await forgotPassword(email);

            toast.success(res.data.message || "Reset link sent if email exists");

            setEmail("");
        } catch (error) {
            console.log(error);

            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />

            {loading && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            )}

            <div className="flex justify-center items-center h-96 bg-gray-50">
                <form
                    onSubmit={handleSubmit}
                    className="w-96 p-6 bg-white shadow-md rounded space-y-4"
                >
                    <h2 className="text-2xl font-bold text-center">
                        Forgot Password
                    </h2>

                    <p className="text-sm text-gray-500 text-center">
                        Enter your email and we’ll send you a reset link
                    </p>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full border p-2 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full p-2 text-white rounded bg-blue-600 hover:bg-blue-700">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;