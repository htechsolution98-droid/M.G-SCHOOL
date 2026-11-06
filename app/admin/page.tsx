"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  KeyRound,
  CheckCircle2,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import axiosInstance from "@/lib/axios";

type AuthMode = "login" | "forgot" | "reset";

// Safe error message extractor to avoid raw "Request failed with status code 400" or broken messages
function parseErrorMessage(err: unknown, fallback: string): string {
  if (!err) return fallback;
  const anyErr = err as any;
  const data = anyErr?.response?.data;
  if (data?.error && typeof data.error === "string") return data.error;
  if (data?.message && typeof data.message === "string") return data.message;
  if (typeof data === "string" && data.trim()) return data;
  if (
    anyErr?.message &&
    typeof anyErr.message === "string" &&
    !anyErr.message.includes("status code")
  ) {
    return anyErr.message;
  }
  return fallback;
}

export default function AdminLoginPage() {
  const [mode, setMode] = useState<AuthMode>("login");

  // Form Fields
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Reset Fields
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  // Status
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // ── Handle Login ──
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await axiosInstance.post("/api/auth/login", {
        email: email.trim(),
        password: password.trim(),
      });

      if (res.data?.success) {
        localStorage.setItem(
          "mg_admin_auth",
          JSON.stringify({
            isLoggedIn: true,
            email: res.data.admin?.email || email,
            name: res.data.admin?.name || "Administrator",
            token: res.data.token,
            loginTime: new Date().toISOString(),
          })
        );
        window.location.href = "/admin/dashboard";
      } else {
        setError(res.data?.error || "Invalid email or password.");
      }
    } catch (err: any) {
      setError(
        parseErrorMessage(err, "Invalid email or password. Please try again.")
      );
    } finally {
      setLoading(false);
    }
  };

  // ── Handle Request Reset Code ──
  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await axiosInstance.post("/api/auth/forgot-password", {
        email: email.trim(),
      });

      if (res.data?.success) {
        const receivedCode = res.data.code;
        setGeneratedCode(receivedCode);
        setCode(receivedCode || "");
        setSuccessMsg(
          `Verification code generated! Enter your new password below.`
        );
        setMode("reset");
      } else {
        setError(res.data?.error || "Could not generate reset code.");
      }
    } catch (err: any) {
      setError(
        parseErrorMessage(
          err,
          "Failed to request reset code. Please check your email."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  // ── Handle Reset Password ──
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match. Please verify.");
      return;
    }

    if (newPassword.length < 4) {
      setError("New password must be at least 4 characters long.");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.put("/api/auth/forgot-password", {
        email: email.trim(),
        code: code.trim(),
        newPassword: newPassword.trim(),
      });

      if (res.data?.success) {
        setSuccessMsg(
          "Password updated successfully! You can now log in with your new password."
        );
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setCode("");
        setGeneratedCode(null);
        setMode("login");
      } else {
        setError(res.data?.error || "Failed to reset password.");
      }
    } catch (err: any) {
      setError(
        parseErrorMessage(err, "Failed to reset password. Please try again.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#162d6e] to-[#0f1f4d]" />
      <div className="absolute inset-0 bg-pattern opacity-5" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-auto"
      >
        {/* Logo Section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl mb-5 border border-white/10 shadow-xl"
          >
            <GraduationCap className="text-secondary w-10 h-10" />
          </motion.div>
          <h1 className="text-3xl font-playfair font-black text-white mb-2">
            M.G. SCHOOL
          </h1>
          <div className="flex items-center justify-center gap-2 text-white/50">
            <Shield size={14} />
            <span className="text-xs uppercase tracking-[0.3em] font-bold">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Status / Feedback Messages */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-5 bg-red-500/15 border border-red-500/30 rounded-2xl px-5 py-3.5 text-red-300 text-sm font-medium flex items-center gap-2.5 shadow-lg"
            >
              <div className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-5 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl px-5 py-3.5 text-emerald-300 text-sm font-medium flex items-center gap-2.5 shadow-lg"
            >
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card */}
        <div className="bg-white/[0.08] backdrop-blur-2xl rounded-[2.5rem] p-8 sm:p-10 border border-white/15 shadow-2xl">
          <AnimatePresence mode="wait">
            {/* ── MODE 1: LOGIN ── */}
            {mode === "login" && (
              <motion.div
                key="login-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-white mb-1">
                    Sign In
                  </h2>
                  <p className="text-xs text-white/50">
                    Enter your administrator credentials to manage M.G. School.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  {/* Email Field */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] font-bold text-white/60 mb-2.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                      <input
                        id="admin-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@gmail.com"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-14 pr-5 text-white placeholder:text-white/20 focus:outline-none focus:border-secondary focus:bg-white/10 transition-all text-sm font-medium"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <div className="flex justify-between items-center mb-2.5">
                      <label className="block text-xs uppercase tracking-[0.2em] font-bold text-white/60">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setMode("forgot");
                          setError("");
                          setSuccessMsg("");
                        }}
                        className="text-xs font-bold text-secondary hover:text-amber-300 transition-colors cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                      <input
                        id="admin-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-14 pr-14 text-white placeholder:text-white/20 focus:outline-none focus:border-secondary focus:bg-white/10 transition-all text-sm font-medium"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors cursor-pointer"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Login Button */}
                  <button
                    id="admin-login-btn"
                    type="submit"
                    disabled={loading}
                    className="w-full bg-secondary text-primary py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-amber-400 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] disabled:opacity-60 cursor-pointer mt-2"
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
              </motion.div>
            )}

            {/* ── MODE 2: FORGOT PASSWORD REQUEST ── */}
            {mode === "forgot" && (
              <motion.div
                key="forgot-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMode("login");
                        setError("");
                      }}
                      className="p-1 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <h2 className="text-xl font-bold text-white">
                      Forgot Password
                    </h2>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Enter your registered admin email address. A 6-digit verification code will be generated to reset your password.
                  </p>
                </div>

                <form onSubmit={handleRequestCode} className="space-y-5">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] font-bold text-white/60 mb-2.5">
                      Registered Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@gmail.com"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-14 pr-5 text-white placeholder:text-white/20 focus:outline-none focus:border-secondary focus:bg-white/10 transition-all text-sm font-medium"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-secondary text-primary py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-amber-400 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] disabled:opacity-60 cursor-pointer"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    ) : (
                      <>
                        <KeyRound size={18} />
                        Get Verification Code
                      </>
                    )}
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMode("login");
                        setError("");
                      }}
                      className="text-xs text-white/50 hover:text-white transition-colors cursor-pointer"
                    >
                      Return to Sign In
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* ── MODE 3: RESET PASSWORD WITH CODE ── */}
            {mode === "reset" && (
              <motion.div
                key="reset-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMode("forgot");
                        setError("");
                      }}
                      className="p-1 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <h2 className="text-xl font-bold text-white">
                      Set New Password
                    </h2>
                  </div>
                  <p className="text-xs text-white/60">
                    Account: <strong className="text-white">{email}</strong>
                  </p>
                </div>

                {/* Generated Code Helper Banner */}
                {generatedCode && (
                  <div className="mb-5 bg-secondary/15 border border-secondary/30 rounded-2xl p-4 text-xs text-secondary flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] uppercase font-bold tracking-widest text-white/50">
                        Verification Code
                      </span>
                      <span className="text-lg font-mono font-black text-white tracking-widest">
                        {generatedCode}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCode(generatedCode)}
                      className="text-[11px] font-black uppercase tracking-wider text-secondary hover:text-amber-300 underline underline-offset-2 cursor-pointer"
                    >
                      Auto-Fill
                    </button>
                  </div>
                )}

                <form onSubmit={handleResetPassword} className="space-y-4">
                  {/* Code Field */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] font-bold text-white/60 mb-2">
                      6-Digit Code
                    </label>
                    <div className="relative">
                      <KeyRound className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                      <input
                        type="text"
                        maxLength={6}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="123456"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-14 pr-5 text-white placeholder:text-white/20 focus:outline-none focus:border-secondary focus:bg-white/10 transition-all text-sm font-mono tracking-widest"
                        required
                      />
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] font-bold text-white/60 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-14 pr-12 text-white placeholder:text-white/20 focus:outline-none focus:border-secondary focus:bg-white/10 transition-all text-sm font-medium"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors cursor-pointer"
                      >
                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] font-bold text-white/60 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter new password"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-14 pr-12 text-white placeholder:text-white/20 focus:outline-none focus:border-secondary focus:bg-white/10 transition-all text-sm font-medium"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-secondary text-primary py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-amber-400 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] disabled:opacity-60 cursor-pointer mt-3"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    ) : (
                      <>
                        <RefreshCw size={18} />
                        Update Password & Login
                      </>
                    )}
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMode("login");
                        setError("");
                      }}
                      className="text-xs text-white/50 hover:text-white transition-colors cursor-pointer"
                    >
                      Cancel & Return to Sign In
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <p className="text-center text-white/20 text-xs mt-8 font-medium">
          &copy; {new Date().getFullYear()} M.G. School. Authorized Personnel Only.
        </p>
      </motion.div>
    </div>
  );
}
