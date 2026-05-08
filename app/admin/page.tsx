"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowRight, Shield } from "lucide-react";

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "12345";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("mg_admin_auth", JSON.stringify({
        isLoggedIn: true,
        email: email,
        loginTime: new Date().toISOString(),
      }));
      window.location.href = "/admin/dashboard";
    } else {
      setError("Invalid email or password. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#162d6e] to-[#0f1f4d]" />
      <div className="absolute inset-0 bg-pattern opacity-5" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-6"
      >
        {/* Logo Section */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl mb-6 border border-white/10"
          >
            <GraduationCap className="text-secondary w-10 h-10" />
          </motion.div>
          <h1 className="text-3xl font-playfair font-black text-white mb-2">
            M.G. SCHOOL
          </h1>
          <div className="flex items-center justify-center gap-2 text-white/40">
            <Shield size={14} />
            <span className="text-xs uppercase tracking-[0.3em] font-bold">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white/[0.07] backdrop-blur-2xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] font-bold text-white/50 mb-3">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gmail.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white placeholder:text-white/20 focus:outline-none focus:border-secondary/50 focus:bg-white/10 transition-all text-sm font-medium"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] font-bold text-white/50 mb-3">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-14 text-white placeholder:text-white/20 focus:outline-none focus:border-secondary/50 focus:bg-white/10 transition-all text-sm font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-xl px-5 py-3 text-red-400 text-sm font-medium"
              >
                {error}
              </motion.div>
            )}

            {/* Login Button */}
            <button
              id="admin-login-btn"
              type="submit"
              disabled={loading}
              className="w-full bg-secondary text-primary py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-amber-400 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-white/20 text-xs mt-8 font-medium">
          &copy; {new Date().getFullYear()} M.G. School. Authorized Personnel Only.
        </p>
      </motion.div>
    </div>
  );
}
