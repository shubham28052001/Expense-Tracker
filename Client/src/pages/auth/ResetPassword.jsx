import React, { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/layout/Navbar";
import toast from "react-hot-toast";
import { resetPassword } from "../../services/authService";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const navigate = useNavigate();

    const [form, setForm] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.newPassword || !form.confirmPassword) {
            return toast.error("All fields are required");
        }

        if (form.newPassword !== form.confirmPassword) {
            return toast.error("Passwords do not match");
        }

        try {
            setLoading(true);

            const res = await resetPassword(form.newPassword, token)
            console.log(res);


            toast.success(res.data.message || "Password reset successful");

            navigate("/login");
        } catch (error) {
            console.log(error);

            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            )}
            <Navbar />

            <div className="flex justify-center items-center h-screen bg-gray-50">
                <form
                    onSubmit={handleSubmit}
                    className="w-96 p-6 bg-white shadow-md rounded space-y-4"
                >
                    <h2 className="text-2xl font-bold text-center">
                        Reset Password
                    </h2>

                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        className="w-full border p-2 rounded"
                        value={form.newPassword}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="w-full border p-2 rounded"
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        className="w-full p-2 text-white rounded bg-green-600 hover:bg-green-700"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;