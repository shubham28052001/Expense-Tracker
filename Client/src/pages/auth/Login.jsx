import React, { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateLogin } from "../../utils/validation";
import { loginUser, googleLogin } from "../../services/authService"
import { toast } from "react-hot-toast"
import { GoogleLogin } from "@react-oauth/google";
import { AuthContexts } from "../../context/AuthProvider";
import { FiEye, FiEyeOff } from "react-icons/fi";
function Login() {
  const { login } = useContext(AuthContexts);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateLogin(user);
    if (Object.keys(newErrors).length > 0) {
      return setErrors(newErrors);
    }

    setLoading(true);

    try {
      const res = await loginUser(user);

      const data = res.data.data;
      login(data.token);
      localStorage.setItem("refreshToken", data.refreshToken);

      toast.success(res.data.message);

      setUser({ email: "", password: "" });
      setErrors({});
      navigate("/dashboard");

    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Server error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await googleLogin(
        credentialResponse.credential
      );

      login(res.data.accessToken);

      localStorage.setItem(
        "refreshToken",
        res.data.refreshToken
      );

      toast.success("Google Login Successful");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
        "Google login failed"
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
      <div className="hidden lg:flex lg:w-1/2 items-center dark:brightness-100 dark:contrast-100 justify-center p-10">
        <img
          src="/image2.avif"
          alt="Register"
          className="w-full h-full object-cover rounded-2xl shadow-2xl"
        />
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-blue-100">
              Login Account
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Join us today and start managing your work efficiently.
            </p>
          </div>


          <div className="flex justify-center mb-6">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                toast.error("Google login failed");
              }}
              size="large"
              width="500"
              text="signin_with"
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
                className="w-full rounded-lg border text-black dark:text-white border-gray-300 px-4 py-3 
              focus:outline-none focus:ring-2 focus:ring-black placeholder:text-gray-400
               dark:placeholder:text-gray-300 focus:border-black dark:focus:ring-white 
               dark:focus:border-white"
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
              <Link to="/forgot" className="text-blue-500 font-medium">Forgot Password</Link>
            </div>


            <button
              type="submit"
              className="w-full rounded-lg bg-black py-3 font-medium dark:bg-blue-800 dark:hover:bg-blue-600 text-white hover:bg-gray-900 transition"
            >
              Sign in to your account
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            New Here?{" "}
            <Link
              to="/register"
              className="font-medium text-black hover:underline dark:text-white"
            >
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;
