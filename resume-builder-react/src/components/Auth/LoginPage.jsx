import React, { useState } from "react";
import {
  Mail,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  LogIn
} from "lucide-react";
import confetti from "canvas-confetti";
import { loginWithEmail } from "../../services/authService";

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const targetEmail = email.trim().toLowerCase();

    if (!targetEmail) {
      setErrorMsg("Please enter your registered email address.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await loginWithEmail(targetEmail);

      if (res.success) {
        setSuccessMsg(res.message || "Login successful! Redirecting...");
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (err) {}

        setTimeout(() => {
          if (onLoginSuccess) {
            onLoginSuccess(res.user);
          }
        }, 700);
      } else {
        setErrorMsg(
          res.message || "Access Denied"
        );
      }
    } catch (err) {
      setErrorMsg("Server communication error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-orange-50/25 to-slate-100 flex flex-col font-['Poppins','Rubik',sans-serif] text-slate-900 selection:bg-[#ff5421] selection:text-white">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-neutral-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          {/* Logo Mark */}
          <div className="flex items-center shadow-xs">
            <div className="w-7 h-7 bg-[#2d3748] rounded-l-md flex items-center justify-center text-white font-black text-sm">
              U
            </div>
            <div className="w-1 h-7 bg-white" />
            <div className="w-7 h-7 bg-[#ff5421] rounded-r-md flex items-center justify-center text-white font-black text-sm">
              C
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base tracking-tight text-slate-900">
                UnCodemy
              </span>
              <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-orange-100 text-[#ff5421]">
                AI Resume
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-semibold hidden sm:inline">
              AI Resume Builder & Career Portal
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span className="hidden md:inline">Helpline:</span>
          <a
            href="tel:+918800023723"
            className="text-[#ff5421] font-bold hover:underline"
          >
            +91 8800023723
          </a>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-auto">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-orange-500/5 border border-slate-200/90 p-6 sm:p-8 relative overflow-hidden">
          {/* Top Decorative Gradient */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-[#ff5421] to-amber-500" />

          {/* Heading */}
          <div className="text-center mb-6 mt-1">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Sign In
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1.5">
              Enter your email to access your account
            </p>
          </div>

          {/* Alert: Error Message */}
          {errorMsg && (
            <div
              role="alert"
              className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5 animate-in fade-in"
            >
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="font-semibold leading-relaxed">{errorMsg}</div>
            </div>
          )}

          {/* Alert: Success Message */}
          {successMsg && (
            <div
              role="status"
              className="mb-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2.5 animate-in fade-in"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="font-bold leading-relaxed">{successMsg}</div>
            </div>
          )}

          {/* Simple Email-Only Form */}
          <form onSubmit={handleLogin} className="space-y-4" noValidate>
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-slate-700 mb-1.5"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  inputMode="email"
                  enterKeyHint="done"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMsg) setErrorMsg("");
                  }}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-3.5 py-3 bg-slate-50/80 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5421] focus:bg-white focus:border-[#ff5421] transition shadow-2xs"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !email.trim()}
              className="w-full py-3.5 px-4 bg-[#ff5421] hover:bg-[#e04515] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#ff5421] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-orange-500/25 transition cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="text-center py-3.5 text-xs text-slate-400 border-t border-neutral-200 bg-white">
        © 2026 UnCodemy • AI Career Portal. All rights reserved.
      </footer>
    </div>
  );
}
