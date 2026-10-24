import React, { useState } from "react";
import { CheckCircle2, AlertCircle, ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";
import { calculateAtsScore } from "../utils/atsScorer";

export default function AtsScoreMeter({ resumeData }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { score, strengths, suggestions, status } = calculateAtsScore(resumeData);

  const getScoreColor = () => {
    if (score >= 85) return { stroke: "#059669", text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" };
    if (score >= 60) return { stroke: "#d97706", text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" };
    return { stroke: "#e11d48", text: "text-rose-700", bg: "bg-rose-50", border: "border-rose-200" };
  };

  const colors = getScoreColor();

  return (
    <div className={`rounded-2xl border p-4 sm:p-5 transition-all duration-300 bg-white shadow-sm ${colors.border}`}>
      <div className="flex items-center justify-between gap-4">
        {/* Left: Circular gauge + Score */}
        <div className="flex items-center gap-3.5">
          <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                strokeDasharray={`${score}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke={colors.stroke}
                fill="none"
                className="transition-all duration-700 ease-out"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className={`text-base font-extrabold ${colors.text}`}>{score}</span>
              <span className="text-[8px] text-slate-400 -mt-1 font-bold">/100</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className={`w-4 h-4 ${colors.text}`} />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                ATS Compatibility Score
              </h4>
            </div>
            <p className={`text-xs font-bold mt-0.5 ${colors.text}`}>
              {status}
            </p>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Tested against automated recruiters & screening bots
            </p>
          </div>
        </div>

        {/* Right Toggle */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition cursor-pointer border border-slate-200"
        >
          <span>{isExpanded ? "Hide Tips" : "Improve Score"}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expanded Suggestions Checklist */}
      {isExpanded && (
        <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-3 animate-in fade-in duration-200">
          {/* Missing Improvements */}
          {suggestions.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Quick Improvements to reach 95+:
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {suggestions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-amber-50/70 p-2 rounded-lg border border-amber-200/80">
                    <span className="text-amber-600 shrink-0 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Current Strengths */}
          {strengths.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Your ATS Strengths:
              </div>
              <ul className="space-y-1 text-xs text-slate-600">
                {strengths.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
