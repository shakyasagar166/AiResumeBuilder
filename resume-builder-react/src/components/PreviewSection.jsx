import React, { useRef, useState } from "react";
import { Download, ZoomIn, ZoomOut, Type, Sparkles, Mail, SlidersHorizontal, Check, ArrowLeft, ShieldCheck, FileText, CheckCircle2 } from "lucide-react";
import StandardAtsBlackWhiteTemplate from "./Templates/StandardAtsBlackWhiteTemplate";
import ModernTechAtsTemplate from "./Templates/ModernTechAtsTemplate";
import ExecutiveSerifAtsTemplate from "./Templates/ExecutiveSerifAtsTemplate";
import CompactGridAtsTemplate from "./Templates/CompactGridAtsTemplate";
import TwoColumnSplitAtsTemplate from "./Templates/TwoColumnSplitAtsTemplate";
import MinimalistSwissAtsTemplate from "./Templates/MinimalistSwissAtsTemplate";
import CampusPlacementAtsTemplate from "./Templates/CampusPlacementAtsTemplate";
import { TEMPLATES } from "../data/templates";

const FONT_CHOICES = [
  { id: "font-sans", name: "Modern Sans (Inter)", className: "font-sans" },
  { id: "font-serif", name: "Classic Serif (Times/Garamond)", className: "font-serif" },
  { id: "font-mono", name: "Clean Tech (Mono/System)", className: "font-mono" }
];

const DENSITY_CHOICES = [
  { id: "compact", name: "Compact (1-Page Fit)", desc: "Tight spacing, fits maximum content on single page" },
  { id: "standard", name: "Standard ATS", desc: "Balanced spacing, standard recruiter format" },
  { id: "spacious", name: "Spacious", desc: "Generous margins for clean readability" }
];

const DIVIDER_CHOICES = [
  { id: "solid", name: "Solid Line" },
  { id: "double", name: "Double Line" },
  { id: "minimal", name: "Subtle Gray" }
];

export default function PreviewSection({
  resumeData,
  isProUser,
  freeExportsLeft,
  onTriggerUpgrade,
  onExportSuccess,
  onOpenEmailModal,
  onBackToEdit,
  onOpenAtsChecker
}) {
  const [zoomLevel, setZoomLevel] = useState(0.85);
  const [viewMode, setViewMode] = useState("fit"); // 'fit' (Mobile Responsive) or 'a4' (Strict Sheet View)
  const [selectedTemplateId, setSelectedTemplateId] = useState("classic-ats");
  const [isExporting, setIsExporting] = useState(false);
  const [selectedFont, setSelectedFont] = useState(FONT_CHOICES[0]);
  const [density, setDensity] = useState("standard");
  const [dividerStyle, setDividerStyle] = useState("solid");
  const resumeContainerRef = useRef(null);

  const handleDownload = () => {
    setIsExporting(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    setTimeout(() => {
      window.print();
      setIsExporting(false);
    }, 250);
  };

  const renderTemplate = () => {
    const props = {
      data: resumeData,
      fontClass: selectedFont.className,
      density,
      dividerStyle
    };

    switch (selectedTemplateId) {
      case "modern-tech":
        return <ModernTechAtsTemplate {...props} />;
      case "executive-serif":
        return <ExecutiveSerifAtsTemplate {...props} />;
      case "compact-grid":
        return <CompactGridAtsTemplate {...props} />;
      case "two-column-split":
        return <TwoColumnSplitAtsTemplate {...props} />;
      case "minimalist-swiss":
        return <MinimalistSwissAtsTemplate {...props} />;
      case "campus-placement":
        return <CampusPlacementAtsTemplate {...props} />;
      case "classic-ats":
      default:
        return <StandardAtsBlackWhiteTemplate {...props} />;
    }
  };

  return (
    <div className="resume-preview-card flex flex-col h-full bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-5 shadow-xs">
      {/* ========================================================
          ALL CONTROLS, TOOLBARS & BADGES ARE NO-PRINT
          (Guarantees that on Print / PDF export, ONLY the resume paper appears!)
          ======================================================== */}
      <div className="no-print flex flex-col gap-3 pb-3 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Format Title Badge */}
          <div className="flex items-center justify-between sm:justify-start gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-black shrink-0" />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                100% Monochrome ATS Standard
              </h3>
            </div>
            <span className="text-[10px] bg-black text-white font-bold px-2 py-0.5 rounded-md">
              7 B&W Templates
            </span>
          </div>

          {/* Primary Action Buttons Bar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Super Prominent Back Button */}
            {onBackToEdit && (
              <button
                type="button"
                onClick={onBackToEdit}
                className="min-h-[44px] flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black text-slate-900 bg-white hover:bg-slate-100 border-2 border-slate-900 transition cursor-pointer shadow-xs hover:scale-[1.02] active:scale-95"
                title="Return to form to edit details"
              >
                <ArrowLeft className="w-4 h-4 text-slate-900 stroke-[2.5]" />
                <span>← Back to Form (Edit Details)</span>
              </button>
            )}

            {/* Download Button in Uncodemy Orange */}
            <button
              type="button"
              onClick={handleDownload}
              disabled={isExporting}
              className="min-h-[44px] flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black text-white bg-gradient-to-r from-[#ff5421] to-[#e04515] hover:from-[#e04515] hover:to-[#c2380d] shadow-md shadow-orange-500/25 transition cursor-pointer hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              <Download className="w-4 h-4 text-white" />
              <span>{isExporting ? "Preparing..." : "Download PDF"}</span>
            </button>
          </div>
        </div>

        {/* 7 Official Black & White Templates Selector Bar */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <span>Choose Black & White ATS Template ({TEMPLATES.length} Designs):</span>
            </span>
            <span className="text-[10px] text-slate-500 font-semibold hidden sm:inline">
              ⚡ Click any template to switch live
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {TEMPLATES.map((tmpl) => {
              const isSelected = selectedTemplateId === tmpl.id;
              return (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => setSelectedTemplateId(tmpl.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                    isSelected
                      ? "bg-slate-950 text-white border-black shadow-md ring-2 ring-orange-500/50"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                  }`}
                  title={tmpl.tagline}
                >
                  <span className="text-base">{tmpl.icon}</span>
                  <div className="text-left">
                    <div className="leading-tight flex items-center gap-1">
                      <span>{tmpl.name}</span>
                      {isSelected && <Check className="w-3 h-3 text-emerald-400" />}
                    </div>
                    <div className={`text-[9px] ${isSelected ? "text-neutral-300" : "text-slate-400"} font-medium`}>
                      {tmpl.badge}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Mobile & Desktop Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            {/* ATS Score Checker Button */}
            {onOpenAtsChecker && (
              <button
                type="button"
                onClick={onOpenAtsChecker}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition cursor-pointer"
                title="Check or Upload Student Resume for Free ATS Scoring"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>🎯 Free ATS Score</span>
              </button>
            )}

            {/* Send to Email Button */}
            <button
              type="button"
              onClick={onOpenEmailModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200 transition cursor-pointer"
              title="Direct resume mail delivery"
            >
              <Mail className="w-3.5 h-3.5 text-orange-600" />
              <span>Email to Me</span>
            </button>
          </div>

          {/* View Mode Toggle: Fit Phone Screen vs A4 Paper Sheet */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setViewMode("fit")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                viewMode === "fit"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Responsive Phone Fit View"
            >
              📱 Mobile Fit
            </button>

            <button
              type="button"
              onClick={() => setViewMode("a4")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                viewMode === "a4"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Exact A4 Sheet View"
            >
              📄 A4 Paper
            </button>

            {viewMode === "a4" && (
              <div className="flex items-center gap-1 pl-1 border-l border-slate-200">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(0.4, z - 0.05))}
                  className="hover:text-slate-900 p-0.5 cursor-pointer font-bold"
                  title="Zoom out"
                >
                  <ZoomOut className="w-3 h-3" />
                </button>
                <span className="font-mono text-[10px] font-bold">{Math.round(zoomLevel * 100)}%</span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(1.2, z + 0.05))}
                  className="hover:text-slate-900 p-0.5 cursor-pointer font-bold"
                  title="Zoom in"
                >
                  <ZoomIn className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Unified Format Customization Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          {/* Spacing / Page Fit density */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Spacing:</span>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              {DENSITY_CHOICES.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDensity(d.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                    density === d.id
                      ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  title={d.desc}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </div>

          {/* Font Type Selection */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Typography:</span>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              {FONT_CHOICES.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedFont(f)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                    selectedFont.id === f.id
                      ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {f.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Divider line style */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Dividers:</span>
            <select
              value={dividerStyle}
              onChange={(e) => setDividerStyle(e.target.value)}
              className="bg-slate-100 text-slate-800 text-[11px] font-semibold py-1 px-2.5 rounded-lg border border-slate-200 cursor-pointer focus:outline-none"
            >
              {DIVIDER_CHOICES.map((div) => (
                <option key={div.id} value={div.id}>
                  {div.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Free Unlimited Badge Status */}
        <div className="flex items-center justify-between text-xs pt-1 text-slate-500">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-emerald-800 font-extrabold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> 100% Free & Unlimited PDF Downloads
            </span>
          </div>

          <div className="text-[11px] text-slate-500 font-medium">
            📄 Recruiter Approved: <strong>100% Monochrome ATS</strong>
          </div>
        </div>
      </div>

      {/* Resume Canvas Preview (100% Black and White) */}
      <div className="resume-canvas-outer flex-1 overflow-x-auto overflow-y-auto bg-neutral-200/60 rounded-xl p-2 sm:p-6 border border-neutral-300 flex justify-center items-start shadow-inner touch-pan-x touch-pan-y min-h-[480px]">
        <div
          id="resume-print-area"
          ref={resumeContainerRef}
          className={`bg-white shadow-xl ring-1 ring-slate-900/10 transition-all duration-200 ${
            viewMode === "a4" ? "origin-top" : "rounded-lg sm:rounded-none"
          }`}
          style={
            viewMode === "a4"
              ? {
                  transform: `scale(${zoomLevel})`,
                  width: "820px",
                  minWidth: "820px"
                }
              : {
                  width: "100%",
                  maxWidth: "820px"
                }
          }
        >
          {renderTemplate()}
        </div>
      </div>

      {/* Bottom Completion Bar: Quick Back & Download options after checking resume */}
      <div className="no-print mt-4 p-4 sm:p-5 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg border border-slate-800">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 hidden sm:flex">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-sm font-black tracking-wide text-white flex items-center gap-2 justify-center sm:justify-start">
              <span>Finished Reviewing Your Resume?</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                100% Monochrome ATS
              </span>
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Return to edit any details, or print and download your PDF directly.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {onBackToEdit && (
            <button
              type="button"
              onClick={onBackToEdit}
              className="flex-1 sm:flex-none min-h-[44px] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black text-slate-900 bg-white hover:bg-slate-100 transition cursor-pointer flex items-center justify-center gap-2 shadow-sm hover:scale-[1.02] active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-slate-900 stroke-[2.5]" />
              <span>← Back to Form</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleDownload}
            disabled={isExporting}
            className="flex-1 sm:flex-none min-h-[44px] px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black text-white bg-gradient-to-r from-[#ff5421] to-[#e04515] hover:from-[#e04515] hover:to-[#c2380d] transition cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-orange-500/30 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
          >
            <Download className="w-4 h-4 text-white" />
            <span>{isExporting ? "Preparing..." : "Download PDF"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
