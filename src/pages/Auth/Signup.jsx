import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "./AuthCard";
import { GoogleLogin } from "@react-oauth/google";
import useAuth from "@/context/AuthContext";
import useToast from "@/hooks/useToast";
import { jwtDecode } from "jwt-decode";
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const { signup, loginWithGoogle } = useAuth();
  const { successToast, errorToast } = useToast();
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email address";
    if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await signup(formData.fullName, formData.email, formData.password);
      successToast("Account created! Welcome to the club ♡");
    } catch (err) {
      errorToast(err.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (tokenResponse) => {
    try {
      const profile = jwtDecode(tokenResponse.credential);
      await loginWithGoogle(tokenResponse.credential, profile);
      successToast("Google Signup Successful! ♡");
    } catch (e) {
      console.error(e);
      errorToast("Google Signup Failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-pink-50/30">
      <div className="w-full max-w-2xl">
        <AuthCard
          title="Create Account ♡"
          subtitle="Join the cutest club ever!"
          oauth={
            <div className="w-full flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => errorToast("Google Connection Failed")}
                size="large"
                shape="pill"
                text="signup_with"
              />
            </div>
          }
        >
          <form className="space-y-5" onSubmit={submit}>
            <div className="space-y-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-pink-400" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-white text-gray-700 focus:outline-none transition-all
                    ${errors.fullName 
                      ? "border-red-400 focus:border-red-500" 
                      : "border-pink-100 focus:border-pink-400 hover:border-pink-200"
                    }`}
                  disabled={isLoading}
                />
              </div>
              {errors.fullName && <p className="text-xs text-red-500 ml-1">{errors.fullName}</p>}
            </div>

            <div className="space-y-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-pink-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-white text-gray-700 focus:outline-none transition-all
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
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-pink-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password (8+ chars)"
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border-2 bg-white text-gray-700 focus:outline-none transition-all
                    ${errors.password 
                      ? "border-red-400 focus:border-red-500" 
                      : "border-pink-100 focus:border-pink-400 hover:border-pink-200"
                    }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-pink-400 hover:text-pink-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 ml-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-pink-500 text-white font-bold rounded-xl shadow-lg shadow-pink-200
                          hover:bg-pink-600 hover:shadow-pink-300 active:scale-[0.98] transition-all 
                          disabled:bg-pink-300 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-bold text-pink-500 hover:text-pink-700 hover:underline transition-colors"
            >
              Login
            </button>
          </p>
        </AuthCard>
      </div>
    </div>
  );
}