import React, { useState, useEffect } from "react";
import {
  Mail,
  GraduationCap,
  Sparkles,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  X,
  ArrowLeft,
  Lock,
  Database,
  ShieldCheck,
  CreditCard
} from "lucide-react";
import confetti from "canvas-confetti";
import { loginWithEmail, PRIMARY_ALLOWED_EMAIL } from "../../services/authService";

export default function UncodemyLoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
  onOpenPricing
}) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isNotInDb, setIsNotInDb] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleVerify = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setIsNotInDb(false);

    const targetEmail = email.trim().toLowerCase();

    if (!targetEmail) {
      setErrorMsg("Please enter your registered email address.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await loginWithEmail(targetEmail);

      if (res.success) {
        setSuccessMsg(res.message || "Verified! 100% Free AI Copilot Unlocked!");
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
          if (onClose) onClose();
        }, 900);
      } else {
        setIsNotInDb(true);
        setErrorMsg(
          "This email is not registered as an Uncodemy student! AI Resume Copilot is 100% Free only for Uncodemy students. External users can unlock access with a Student Pro Pass (₹29)."
        );
      }
    } catch (err) {
      setErrorMsg("Unable to connect to the backend server. Please ensure the backend API is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-sm overflow-y-auto animate-in fade-in font-['Poppins','Rubik',sans-serif]"
    >
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92dvh] flex flex-col">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#ff5421] via-orange-600 to-[#e04515] p-5 sm:p-6 text-white relative shrink-0">
          <div className="flex items-center justify-between gap-3 mb-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-black/25 hover:bg-black/40 text-white transition cursor-pointer border border-white/20 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="text-white hover:text-white p-2 rounded-xl bg-black/25 hover:bg-black/40 cursor-pointer transition min-h-[36px] min-w-[36px] flex items-center justify-center border border-white/20 active:scale-95"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white text-[#ff5421] shadow-xs mb-2">
            <GraduationCap className="w-4 h-4 text-[#ff5421]" />
            <span>Free for Uncodemy Students</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Uncodemy Student Verification
          </h2>
          <p className="text-orange-100 text-xs sm:text-sm mt-1 max-w-md leading-relaxed">
            AI Resume Copilot is <strong>100% Free & Unlimited Only for Uncodemy Students</strong>!
          </p>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {/* Rules Information Card */}
          <div className="p-3.5 bg-orange-50 border border-orange-200 rounded-2xl text-xs space-y-2">
            <div className="font-bold text-orange-950 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-[#ff5421]" />
              <span>Access Rules:</span>
            </div>
            <div className="space-y-1 text-slate-700 text-[11px]">
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Uncodemy Students:</strong> Resume Builder + AI Chatbot are <strong>100% Free & Unlimited</strong>.
                </span>
              </div>
              <div className="flex items-start gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>External Users:</strong> Resume Builder is free, but AI Chatbot is <strong>Paid</strong> (Student Pro Pass ₹29).
                </span>
              </div>
            </div>
          </div>

          {/* Alert: Error Message */}
          {errorMsg && (
            <div
              role="alert"
              className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5 animate-in fade-in"
            >
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-2 leading-relaxed">
                <div className="font-semibold">{errorMsg}</div>
                {isNotInDb && (
                  <button
                    type="button"
                    onClick={() => {
                      if (onClose) onClose();
                      if (onOpenPricing) onOpenPricing();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#ff5421] text-white rounded-xl font-bold text-xs hover:bg-[#e04515] transition cursor-pointer shadow-sm"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Get Pro Pass (₹29)</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Alert: Success Message */}
          {successMsg && (
            <div
              role="status"
              className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2.5 animate-in fade-in"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="font-bold leading-relaxed">{successMsg}</div>
            </div>
          )}

          {/* Email Verification Form */}
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label
                htmlFor="verify-email"
                className="block text-xs font-bold text-slate-800 mb-1.5"
              >
                Registered Student Email
              </label>

              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="verify-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMsg) setErrorMsg("");
                  }}
                  placeholder="e.g. shakaysagar166@gmail.com"
                  className="w-full pl-10 pr-3.5 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5421] focus:bg-white focus:border-[#ff5421] transition"
                  disabled={isLoading}
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                Enter your registered student email to unlock free access.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email.trim()}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#ff5421] via-orange-600 to-[#e04515] hover:opacity-95 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-orange-500/25 transition cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Student Email...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Verify & Unlock Free AI</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </>
              )}
            </button>
          </form>

          {/* Non-student Pro Alternative */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
            <span>Not an Uncodemy student?</span>
            <button
              type="button"
              onClick={() => {
                if (onClose) onClose();
                if (onOpenPricing) onOpenPricing();
              }}
              className="text-[#ff5421] font-bold hover:underline cursor-pointer"
            >
              Unlock AI Copilot for ₹29 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
