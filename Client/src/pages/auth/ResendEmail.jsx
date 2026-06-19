import React, { useState } from "react";
import { resendEmail } from "../../services/authService";
import { toast } from "react-hot-toast";
import Navbar from "../../components/layout/Navbar"
function ResendEmail() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResend = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email required");
      return;
    }

    try {
      setLoading(true);

      const res = await resendEmail(email);

      toast.success(res.message || "Email sent successfully");
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to resend email");
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
      <div className="max-w-md mx-auto mt-10 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Resend Email</h2>

        <form onSubmit={handleResend}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border p-2 rounded mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            Resend Email
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResendEmail;