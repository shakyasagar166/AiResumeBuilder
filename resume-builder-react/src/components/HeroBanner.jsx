import React from "react";
import {
  Sparkles,
  GraduationCap,
  CheckCircle2,
  Users,
  ArrowRight,
  ShieldCheck,
  Zap,
  Bot,
  Star,
  Target,
  FileText
} from "lucide-react";

export default function HeroBanner({
  onSelectBlock,
  activeStudioBlock,
  onLoadFresherProfile,
  currentUser,
  onOpenLoginModal
}) {
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
            <span className="text-slate-700 font-semibold">100% Free & Unlimited Access</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.2] sm:leading-[1.15]">
            ATS-Optimized Resumes That Pass Screeners &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5421] to-amber-600">
              Get You Placed
            </span>
          </h1>

          <p className="mt-3 text-xs sm:text-base text-slate-600 leading-relaxed max-w-xl">
            Designed to match the strict hiring criteria of Top Tech MNCs and startups. Clean monochrome formatting,
            zero parsing errors, automated AI bullet polisher, and instant direct PDF downloads.
          </p>

          {/* Value Props Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-neutral-200 shadow-2xs text-[11px] sm:text-xs font-semibold text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 98.6% ATS Pass
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-neutral-200 shadow-2xs text-[11px] sm:text-xs font-semibold text-slate-700">
              <Zap className="w-3.5 h-3.5 text-amber-500" /> Monochrome A4
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-neutral-200 shadow-2xs text-[11px] sm:text-xs font-semibold text-slate-700">
              <Users className="w-3.5 h-3.5 text-[#ff5421]" /> 1,000+ Students Daily
            </span>
            <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200 shadow-2xs text-[11px] sm:text-xs font-bold">
              ✓ 100% Free Forever
            </span>
          </div>
        </div>

        {/* 3 Core Studio Modules Quick Switch Card */}
        <div className="w-full lg:w-auto shrink-0 bg-white border-2 border-orange-200 rounded-3xl p-6 shadow-xl shadow-orange-500/10 max-w-md relative space-y-4">
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-neutral-100">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#ff5421]" />
              <span>3 Core AI Studio Blocks</span>
            </span>
            <span className="text-[10px] text-emerald-700 font-extrabold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Free Access
            </span>
          </div>

          <div className="space-y-2.5">
            {/* Block 1 Card */}
            <button
              type="button"
              onClick={() => onSelectBlock && onSelectBlock("maker")}
              className={`w-full text-left p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between group active:scale-98 ${
                activeStudioBlock === "maker"
                  ? "bg-orange-50/80 border-[#ff5421] shadow-xs"
                  : "bg-slate-50 border-slate-200 hover:border-orange-300 hover:bg-orange-50/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center text-[#ff5421]">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-black text-xs text-slate-900 group-hover:text-[#ff5421]">
                    1. Resume Maker Studio
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Form editor & 100% B&W ATS templates
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#ff5421] transition" />
            </button>

            {/* Block 2 Card */}
            <button
              type="button"
              onClick={() => onSelectBlock && onSelectBlock("matcher")}
              className={`w-full text-left p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between group active:scale-98 ${
                activeStudioBlock === "matcher"
                  ? "bg-blue-50/80 border-blue-500 shadow-xs"
                  : "bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-blue-50/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-black text-xs text-slate-900 group-hover:text-blue-600">
                    2. Job Profile Matcher
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Compare resume vs JD & see match %
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
            </button>

            {/* Block 3 Card */}
            <button
              type="button"
              onClick={() => onSelectBlock && onSelectBlock("chat")}
              className={`w-full text-left p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between group active:scale-98 ${
                activeStudioBlock === "chat"
                  ? "bg-purple-50/80 border-purple-500 shadow-xs"
                  : "bg-slate-50 border-slate-200 hover:border-purple-300 hover:bg-purple-50/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-black text-xs text-slate-900 group-hover:text-purple-600">
                    3. AI Resume Chatbot
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Generate resumes & polish bullet points
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
