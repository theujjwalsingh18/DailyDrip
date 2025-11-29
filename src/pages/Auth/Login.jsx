import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "./AuthCard";
import useAuth from "@/context/AuthContext";
import useToast from "@/hooks/useToast";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();
  const { successToast, errorToast } = useToast();
  
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email address";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
      successToast("Welcome back! ♡");
    } catch (err) {
      errorToast(err.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (tokenResponse) => {
    setIsLoading(true);
    try {
      const profile = jwtDecode(tokenResponse.credential);
      await loginWithGoogle(tokenResponse.credential, profile);
      successToast("Google Login Successful! ♡");
    } catch (err) {
      errorToast("Google login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-pink-50/30">
      <div className="w-full max-w-2xl">
        <AuthCard
          title="Welcome Back ♡"
          subtitle="Log in and continue your cute journey!"
          oauth={
            <div className="w-full flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => errorToast("Google Connection Failed")}
                size="large"
                shape="pill"
                text="signin_with"
              />
            </div>
          }
        >
          <form className="space-y-6" onSubmit={submit}>
            <div className="space-y-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-pink-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className={`w-full pl-11 pr-4 h-12 rounded-xl border-2 bg-white text-gray-700 text-base focus:outline-none transition-all
                    ${errors.email 
                      ? "border-red-400 focus:border-red-500" 
                      : "border-pink-100 focus:border-pink-400 hover:border-pink-200"
                    }`}
                  disabled={isLoading}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email}</p>}
            </div>

            <div className="space-y-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-pink-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className={`w-full pl-11 pr-12 h-12 rounded-xl border-2 bg-white text-gray-700 text-base focus:outline-none transition-all
                    ${errors.password 
                      ? "border-red-400 focus:border-red-500" 
                      : "border-pink-100 focus:border-pink-400 hover:border-pink-200"
                    }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-pink-400 hover:text-pink-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 ml-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-pink-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-pink-200
                          hover:bg-pink-600 hover:shadow-pink-300 active:scale-[0.98] transition-all 
                          disabled:bg-pink-300 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin" size={22} /> : "Login"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            New here?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="font-bold text-pink-500 hover:text-pink-700 hover:underline transition-colors"
            >
              Create an account
            </button>
          </p>
        </AuthCard>
      </div>
    </div>
  );
}