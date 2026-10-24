import React from "react";
import { Sparkles, Code2, GraduationCap, Users } from "lucide-react";

export default function Footer({ onOpenPricing }) {
  return (
    <footer className="no-print mt-16 border-t border-slate-200 bg-white pt-12 pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Quick FAQ Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ff5421]" /> Free Trial Policy
            </h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Every student gets <strong>2 free high-quality PDF downloads</strong> with full editing access, live ATS scoring, and 1 AI Copilot trial. Upgrade anytime for unlimited access.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-orange-50/60 border border-orange-200">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#ff5421]" /> Uncodemy Student Special Pass
            </h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Are you an Uncodemy student? Apply promo coupon <code className="text-[#ff5421] font-bold bg-orange-100 px-1.5 py-0.5 rounded border border-orange-300">UNCODEMY</code> to get Pro access at just <strong>₹29</strong>!
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#ff5421]" /> 1,000+ Concurrent Students
            </h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Engineered with Spring Boot, Redis caching & Kafka event streaming to ensure lightning-fast resume export and AI generation with zero delay.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <span>© 2026 Uncodemy Career Portal. 100% Recruiter ATS Standard.</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenPricing}
              className="text-[#ff5421] hover:underline cursor-pointer font-bold"
            >
              View Student Pricing (₹29)
            </button>
            <span>•</span>
            <span className="text-slate-600">Enterprise High-Scale Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
