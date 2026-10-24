import React from "react";
import { Sparkles, GraduationCap, CheckCircle2, Users, ArrowRight, ShieldCheck, Zap, Bot, Star } from "lucide-react";

export default function HeroBanner({ onOpenPricing, onLoadFresherProfile, onOpenAiChat, onOpenAtsChecker, currentUser, onOpenLoginModal }) {
  return (
    <div className="no-print relative overflow-hidden bg-gradient-to-b from-orange-50/70 via-white to-neutral-50 border-b border-neutral-200 px-4 py-8 sm:py-10">
      {/* Background soft ambient accents in Uncodemy Orange */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl text-center lg:text-left">
          {/* Uncodemy Official Placement Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-[#ff5421] border border-orange-200 shadow-xs mb-4">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Uncodemy Career & Placement Partner</span>
            <span className="text-neutral-300">•</span>
            <span className="text-slate-700 font-semibold">100% Black & White ATS Standard</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.2] sm:leading-[1.15]">
            ATS-Optimized Resumes That Pass Screeners &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5421] to-amber-600">
              Get You Placed
            </span>
          </h1>

          <p className="mt-3 text-xs sm:text-base text-slate-600 leading-relaxed max-w-xl">
            Designed to match the strict hiring criteria of Top Tech MNCs and startups. Clean monochrome formatting,
            zero parsing errors, automated AI bullet polisher, and instant direct email delivery.
          </p>

          {/* Action Row & Value Props */}
          <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => {
                if (!currentUser) {
                  onOpenLoginModal();
                } else {
                  onOpenAiChat();
                }
              }}
              className="w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#ff5421] hover:bg-[#e04515] shadow-lg shadow-orange-500/30 transition cursor-pointer transform active:scale-95"
            >
              <Bot className="w-4 h-4 text-white" />
              <span>
                {currentUser
                  ? "🤖 AI Resume Copilot (100% Free)"
                  : "🤖 AI Resume Copilot (Database Users Only)"}
              </span>
            </button>

            {onOpenAtsChecker && (
              <button
                type="button"
                onClick={onOpenAtsChecker}
                className="w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 shadow-sm transition cursor-pointer transform active:scale-95"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>🎯 Free ATS Score (Upload/Paste)</span>
                <span className="text-[10px] bg-emerald-600 text-white font-black px-1.5 py-0.5 rounded-full">FREE</span>
              </button>
            )}

            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-neutral-200 shadow-2xs text-[11px] sm:text-xs font-semibold text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 98.6% ATS Pass
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-neutral-200 shadow-2xs text-[11px] sm:text-xs font-semibold text-slate-700">
              <Zap className="w-3.5 h-3.5 text-amber-500" /> Monochrome A4
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-neutral-200 shadow-2xs text-[11px] sm:text-xs font-semibold text-slate-700">
              <Users className="w-3.5 h-3.5 text-[#ff5421]" /> 1,000+ Students Daily
            </span>
          </div>
        </div>

        {/* Uncodemy Student Special Promo Card */}
        <div className="w-full lg:w-auto shrink-0 bg-white border-2 border-orange-300 rounded-2xl p-6 shadow-xl shadow-orange-500/10 max-w-sm relative">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-orange-100 text-[#ff5421] border border-orange-300">
              🎓 Uncodemy Offer
            </span>
            <span className="text-xs text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Flat 70% Off
            </span>
          </div>

          <h3 className="text-base font-extrabold text-slate-900 mt-3 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#ff5421]" />
            Uncodemy Student Special Deal
          </h3>

          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            Get unlimited resume PDF downloads, direct email delivery, and AI auto-generation for just <strong>₹29</strong> with coupon <code className="bg-orange-50 text-[#ff5421] font-mono font-black px-1.5 py-0.5 rounded border border-orange-200">UNCODEMY</code>.
          </p>

          <div className="mt-5 flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenPricing}
              className="flex-1 min-h-[44px] flex items-center justify-center py-2.5 px-3.5 rounded-xl text-xs font-black text-white bg-[#ff5421] hover:bg-[#e04515] transition cursor-pointer text-center shadow-md shadow-orange-500/25 active:scale-95"
            >
              Claim ₹29 Deal
            </button>
            <button
              type="button"
              onClick={onLoadFresherProfile}
              className="min-h-[44px] flex items-center justify-center py-2.5 px-3.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer border border-slate-200 active:scale-95"
              title="Load Fresher Placement Sample"
            >
              🎓 Try Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
