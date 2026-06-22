import React, { useState } from "react";
import { Link } from "react-router";
import { registerUser, googleLogin } from "../../services/authService"
import { validateRegister } from "../../utils/validation";
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router";
import { GoogleLogin } from "@react-oauth/google";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateRegister(user);
    localStorage.setItem("verifyEmail", user.email);

    if (Object.keys(newErrors).length > 0) {
      return setErrors(newErrors);
    }

    try {
      setLoading(true);
      const res = await registerUser(user);
      console.log("Success:", res.data);
      toast.success(res.data.message, {
        duration: 2000
      });
      setErrors({});
      setUser({
        fullName: "",
        email: "",
        password: "",
      });
      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await googleLogin(
        credentialResponse.credential
      );

      localStorage.setItem(
        "token",
        res.data.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        res.data.refreshToken
      );

      toast.success("Google Registration Successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Google registration failed"
      );
    }
  };

  return (
    <div className=" bg-white dark:bg-gray-900 flex flex-col lg:flex-row overflow-hidden h-screen">

      {loading && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center dark:brightness-100 dark:contrast-100 p-10">
        <img
          src="/image1.jpg"
          alt="Register Illustration"
          className="w-full h-full object-cover rounded-2xl shadow-2xl"
        />
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          <div className="mb-8">
            <h1 className="text-3xl font-bold dark:text-blue-100 text-gray-900">
              Create Account
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Join us today and start managing your work efficiently.
            </p>
          </div>
          <div className="flex justify-center mb-6">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                toast.error("Google registration failed");
              }}
              size="large"
              width="400"
              text="signup_with"
              shape="rectangular"
            />
          </div>

          {/* OR Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-gray-300 flex-1"></div>
            <span className="text-sm text-gray-500 dark:text-blue-50">OR</span>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 ">
            <div className="flex gap-2 mb-2 font-medium">
              <label className="block text-sm  text-gray-700 mb-2 dark:text-blue-100">
                Full Name <span className="text-red-500">*</span>
              </label>
              {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {errors.fullName}
                </p>
              )}
            </div>

            <input
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              placeholder="Jhon dye"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 
              focus:outline-none focus:ring-2 focus:ring-black focus:border-black
               dark:focus:ring-white dark:focus:border-white placeholder:text-gray-400
               dark:placeholder:text-gray-300 text-black dark:text-white"
            />

            <div className="flex gap-2 mb-2 font-medium">
              <label className="block text-sm text-gray-700 mb-2 dark:text-blue-100">
                Email <span className="text-red-500">*</span>
              </label>
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email}
                </p>
              )}
            </div>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 
              focus:outline-none focus:ring-2 focus:ring-black focus:border-black
               dark:focus:ring-white dark:focus:border-white placeholder:text-gray-400
               dark:placeholder:text-gray-300 text-black dark:text-white"
            />


            <div className="flex gap-2 mb-2 font-medium">
              <label className="block text-sm text-gray-700 mb-2 dark:text-blue-100">
                Password <span className="text-red-500">*</span>
              </label>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password}
                </p>
              )}

            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="*********"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 
              focus:outline-none focus:ring-2 focus:ring-black focus:border-black
               dark:focus:ring-white dark:focus:border-white placeholder:text-gray-400
               dark:placeholder:text-gray-300 text-black dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? (
                  <FiEyeOff size={20} className="dark:text-white" />
                ) : (
                  <FiEye size={20} className="dark:text-white" />
                )}
              </button>

            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-black py-3 dark:bg-gray-100 dark:text-black dark:hover:bg-gray-300 font-medium text-white hover:bg-gray-900 transition"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-black hover:underline dark:text-white"
            >
              Sign In
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;