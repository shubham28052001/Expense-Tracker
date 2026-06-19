import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { verifyEmail } from "../../services/authService";
import { toast } from "react-hot-toast";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const token = searchParams.get("token");

    if (!token) {
      toast.error("Invalid verification link");
      setLoading(false);
      return;
    }

    const verifyUserEmail = async () => {
      try {
        const res = await verifyEmail(token);

        toast.success(
          res.data.message || "Email verified successfully"
        );

        setVerified(true);
      } catch (error) {
        const message =
          error.response?.data?.message || "Verification failed";

        if (message === "Email already verified") {
          setVerified(true);
          return;
        }

        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    verifyUserEmail();
  }, [searchParams]);

  const handleResend = () => {
    navigate("/resend-email");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      {loading && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}
      {verified ? (
        <>
          <h1 className="text-3xl font-bold text-green-600">
            Email Verified ✅
          </h1>

          <p className="text-gray-600">
            Your email has been verified successfully.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Go to Login
          </button>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-red-600">
            Verification Failed ❌
          </h1>

          <p className="text-gray-600">
            The verification link is invalid or expired.
          </p>

          <button
            onClick={handleResend}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Resend Again
          </button>
        </>
      )}
    </div>
  );
}

export default VerifyEmail;