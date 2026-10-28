import React, { useState, useRef } from "react";
import {
  Target,
  FileText,
  Briefcase,
  Upload,
  FileUp,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Plus,
  RotateCcw,
  Bot,
  Zap,
  Award,
  Layers,
  GraduationCap
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  matchResumeWithJobProfile,
  convertResumeDataToText,
  PRESET_JOB_PROFILES
} from "../utils/profileMatcher";
import { extractTextFromDocument } from "../utils/documentTextExtractor";

export default function ProfileMatcherBlock({
  resumeData,
  onAddSkillToBuilder,
  onSwitchToMaker,
  onSwitchToChat
}) {
  const [resumeText, setResumeText] = useState(() => {
    return resumeData ? convertResumeDataToText(resumeData) : "";
  });
  const [resumeFileName, setResumeFileName] = useState("");
  const [jobDescription, setJobDescription] = useState(PRESET_JOB_PROFILES[0].description);
  const [selectedPresetId, setSelectedPresetId] = useState(PRESET_JOB_PROFILES[0].id);
  const [matchResult, setMatchResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [notice, setNotice] = useState("");

  const resumeFileInputRef = useRef(null);
  const jdFileInputRef = useRef(null);

  // 1. One-click load from builder data
  const handleLoadFromBuilder = () => {
    if (!resumeData) return;
    const text = convertResumeDataToText(resumeData);
    setResumeText(text);
    setResumeFileName("Current_Resume_Maker.txt");
    setNotice("✓ Successfully loaded current resume from Resume Maker!");
    setTimeout(() => setNotice(""), 3500);
  };

  // 2. Select Preset Job Description
  const handleSelectPreset = (preset) => {
    setSelectedPresetId(preset.id);
    setJobDescription(preset.description);
    setNotice(`✓ Loaded "${preset.title}" job description!`);
    setTimeout(() => setNotice(""), 3500);
  };

  // 3. File upload handler for Resume with Universal PDF.js / Mammoth.js
  const handleResumeFileUpload = async (file) => {
    if (!file) return;
    setResumeFileName(file.name);
    setNotice(`⏳ Extracting text from "${file.name}" with PDF.js engine...`);

    try {
      const text = await extractTextFromDocument(file);
      if (text && text.trim().length > 20) {
        setResumeText(text);
        setNotice(`✓ Extracted ${text.split(/\s+/).length} words from "${file.name}"!`);
        setTimeout(() => setNotice(""), 3500);
      } else {
        setNotice(`⚠️ ${file.name} attached. If it is a scanned image, please paste text directly.`);
      }
    } catch (err) {
      console.warn("Document text extraction error:", err);
      setNotice(`⚠️ Could not parse text from ${file.name}. Please copy and paste your resume text directly.`);
    }
  };

  // 4. File upload handler for Job Description
  const handleJdFileUpload = async (file) => {
    if (!file) return;
    setNotice(`⏳ Extracting text from Job Description "${file.name}"...`);

    try {
      const text = await extractTextFromDocument(file);
      if (text && text.trim().length > 20) {
        setJobDescription(text);
        setSelectedPresetId("");
        setNotice(`✓ Extracted ${text.split(/\s+/).length} words from "${file.name}"!`);
        setTimeout(() => setNotice(""), 3500);
      } else {
        setNotice(`⚠️ Could not parse text. Please paste the job description directly.`);
      }
    } catch (err) {
      console.warn("JD text extraction error:", err);
      setNotice(`⚠️ Could not parse text from ${file.name}. Please paste the job description directly.`);
    }
  };

  // 5. Run Match Calculation
  const handleCalculateMatch = () => {
    setIsAnalyzing(true);
    setNotice("");

    setTimeout(() => {
      const res = matchResumeWithJobProfile(resumeText, jobDescription);
      setMatchResult(res);
      setIsAnalyzing(false);

      if (res.isValid && res.matchScore >= 75) {
        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch (err) {}
      }
    }, 400);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-['Poppins','Rubik',sans-serif]">
      {/* Block Header Card */}
      <div className="bg-white rounded-3xl border border-neutral-200 p-5 sm:p-7 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff5421] to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/25 shrink-0">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Job Profile & Resume Matcher
              </h2>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-orange-100 text-[#ff5421] border border-orange-200">
                Block 2
              </span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                100% Free
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Upload or paste your resume on the left, add any target job description on the right, and get your exact ATS compatibility percentage and missing skill recommendations!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch md:self-auto">
          <button
            type="button"
            onClick={handleLoadFromBuilder}
            className="flex-1 md:flex-none min-h-[42px] px-3.5 py-2 rounded-xl text-xs font-bold text-[#ff5421] bg-orange-50 hover:bg-orange-100 border border-orange-200 transition cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs active:scale-95"
            title="Import all data entered in Resume Maker (Block 1)"
          >
            <Zap className="w-4 h-4 text-[#ff5421]" />
            <span>⚡ Sync Resume Maker Data</span>
          </button>
        </div>
      </div>

      {/* Global Notice Toast */}
      {notice && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl px-5 py-2.5 text-xs font-bold text-[#ff5421] flex items-center justify-between animate-in fade-in shadow-2xs">
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice("")}
            className="text-orange-400 hover:text-orange-700 font-black"
          >
            ×
          </button>
        </div>
      )}

      {/* Side-by-Side Dual Column Input Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ========================================================
            LEFT COLUMN: Candidate Resume
            ======================================================== */}
        <div className="bg-white rounded-3xl border border-neutral-200 p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-neutral-100 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[#ff5421]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    1. Candidate Resume (Left)
                  </h3>
                  <p className="text-[11px] text-slate-500">Your profile, projects, education & skills</p>
                </div>
              </div>

              {resumeFileName && (
                <span className="text-[10px] font-mono font-bold bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 truncate max-w-[140px]">
                  {resumeFileName}
                </span>
              )}
            </div>

            {/* Quick Upload Action Bar */}
            <div className="flex items-center gap-2 mb-3">
              <button
                type="button"
                onClick={() => resumeFileInputRef.current?.click()}
                className="flex-1 py-2.5 px-3 rounded-xl border border-dashed border-orange-300 bg-orange-50/50 hover:bg-orange-100/60 transition cursor-pointer flex items-center justify-center gap-2 text-xs font-bold text-slate-700 active:scale-95"
              >
                <FileUp className="w-4 h-4 text-[#ff5421]" />
                <span>Upload Resume (.pdf, .docx, .txt)</span>
              </button>
              <input
                type="file"
                ref={resumeFileInputRef}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleResumeFileUpload(e.target.files[0]);
                  }
                }}
                accept=".pdf,.docx,.doc,.txt"
                className="hidden"
              />
            </div>

            {/* Textarea for resume text */}
            <div className="relative">
              <textarea
                rows={11}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume content here (or click 'Upload Resume' / '⚡ Sync Resume Maker Data' above)..."
                className="w-full text-xs font-mono p-3.5 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#ff5421]/30 focus:border-[#ff5421] bg-slate-50/70 leading-relaxed resize-y"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5 px-1 font-medium">
                <span>
                  Words: <strong>{resumeText ? resumeText.trim().split(/\s+/).length : 0}</strong>
                </span>
                {resumeText && (
                  <button
                    type="button"
                    onClick={() => {
                      setResumeText("");
                      setResumeFileName("");
                    }}
                    className="text-slate-400 hover:text-rose-600 font-bold transition cursor-pointer"
                  >
                    Clear Text
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            RIGHT COLUMN: Target Job Profile / Description
            ======================================================== */}
        <div className="bg-white rounded-3xl border border-neutral-200 p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-neutral-100 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    2. Target Job Profile (Right)
                  </h3>
                  <p className="text-[11px] text-slate-500">Job requirements, technical stack & qualifications</p>
                </div>
              </div>

              {/* Upload JD button */}
              <button
                type="button"
                onClick={() => jdFileInputRef.current?.click()}
                className="px-2.5 py-1 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-[10.5px] font-bold transition cursor-pointer flex items-center gap-1 active:scale-95 shadow-2xs"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload JD</span>
              </button>
              <input
                type="file"
                ref={jdFileInputRef}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleJdFileUpload(e.target.files[0]);
                  }
                }}
                accept=".pdf,.docx,.doc,.txt"
                className="hidden"
              />
            </div>

            {/* Preset Role Chips */}
            <div className="mb-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">
                ⚡ Quick Presets (Click to Test):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_JOB_PROFILES.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`text-[10.5px] font-bold px-2.5 py-1 rounded-lg border transition cursor-pointer flex items-center gap-1 ${
                      selectedPresetId === preset.id
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-slate-50 hover:bg-blue-50 text-slate-700 border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    <span>{preset.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Textarea for Job Description */}
            <div className="relative">
              <textarea
                rows={11}
                value={jobDescription}
                onChange={(e) => {
                  setJobDescription(e.target.value);
                  setSelectedPresetId("");
                }}
                placeholder="Paste the target job description or requirements here (or click any of the preset role buttons above)..."
                className="w-full text-xs font-mono p-3.5 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 bg-slate-50/70 leading-relaxed resize-y"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5 px-1 font-medium">
                <span>
                  Words: <strong>{jobDescription ? jobDescription.trim().split(/\s+/).length : 0}</strong>
                </span>
                {jobDescription && (
                  <button
                    type="button"
                    onClick={() => {
                      setJobDescription("");
                      setSelectedPresetId("");
                    }}
                    className="text-slate-400 hover:text-rose-600 font-bold transition cursor-pointer"
                  >
                    Clear Text
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          CENTER ACTION CTA: Compare & Calculate Match Percentage
          ======================================================== */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          type="button"
          disabled={isAnalyzing || !resumeText.trim() || !jobDescription.trim()}
          onClick={handleCalculateMatch}
          className={`w-full sm:w-auto min-h-[50px] px-10 py-3.5 rounded-2xl text-xs sm:text-sm font-black text-white transition flex items-center justify-center gap-3 shadow-xl transform active:scale-95 ${
            !resumeText.trim() || !jobDescription.trim()
              ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
              : "bg-gradient-to-r from-[#ff5421] via-orange-600 to-amber-600 hover:from-[#e04515] hover:to-amber-700 shadow-orange-500/30 cursor-pointer hover:scale-[1.02]"
          }`}
        >
          <Sparkles className="w-5 h-5 text-white animate-spin-slow" />
          <span>
            {isAnalyzing ? "Comparing Profiles with ATS Engine..." : "⚡ Calculate Profile Match Percentage"}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {(!resumeText.trim() || !jobDescription.trim()) && (
          <span className="text-xs text-slate-500 font-medium text-center">
            (Please provide both your resume and target job description above)
          </span>
        )}
      </div>

      {/* ========================================================
          MATCH RESULTS REPORT (Appears after calculation)
          ======================================================== */}
      {matchResult && matchResult.isValid && (
        <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Top Hero Banner of Result */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-neutral-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-6 z-10 text-center md:text-left">
              {/* Big Circular Score Badge */}
              <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-white/10"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={264}
                    strokeDashoffset={264 - (264 * matchResult.matchScore) / 100}
                    strokeLinecap="round"
                    className={`transition-all duration-1000 ease-out ${
                      matchResult.matchScore >= 80
                        ? "text-emerald-400"
                        : matchResult.matchScore >= 60
                        ? "text-amber-400"
                        : "text-rose-400"
                    }`}
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black tracking-tight">{matchResult.matchScore}%</span>
                  <span className="text-[10px] uppercase font-bold text-neutral-400">Match</span>
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/10 border border-white/20 mb-2">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Grade {matchResult.grade}</span>
                  <span className="text-neutral-400">•</span>
                  <span>{matchResult.verdict}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Profile Compatibility Score: {matchResult.matchScore}%
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl leading-relaxed">
                  {matchResult.summary}
                </p>
              </div>
            </div>

            {/* Quick Cross-Block Actions */}
            <div className="z-10 flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 w-full md:w-auto">
              {onSwitchToMaker && (
                <button
                  type="button"
                  onClick={onSwitchToMaker}
                  className="px-4 py-2.5 rounded-xl text-xs font-black text-slate-900 bg-white hover:bg-neutral-100 shadow-md transition cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                >
                  <FileText className="w-4 h-4 text-[#ff5421]" />
                  <span>Open Resume Maker (Block 1) →</span>
                </button>
              )}
              {onSwitchToChat && (
                <button
                  type="button"
                  onClick={onSwitchToChat}
                  className="px-4 py-2.5 rounded-xl text-xs font-black text-white bg-[#ff5421] hover:bg-[#e04515] shadow-md transition cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                >
                  <Bot className="w-4 h-4 text-white" />
                  <span>Auto-Tailor with AI (Block 3) →</span>
                </button>
              )}
            </div>
          </div>

          {/* 4 Category Score Breakdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Technical Stack
              </span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">
                {matchResult.categoryScores.technical}%
              </span>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${matchResult.categoryScores.technical}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Tools & Delivery
              </span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">
                {matchResult.categoryScores.toolsAndImpact}%
              </span>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2.5 overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${matchResult.categoryScores.toolsAndImpact}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Role & Experience
              </span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">
                {matchResult.categoryScores.experience}%
              </span>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2.5 overflow-hidden">
                <div
                  className="bg-purple-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${matchResult.categoryScores.experience}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Education & Degree
              </span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">
                {matchResult.categoryScores.education}%
              </span>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2.5 overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${matchResult.categoryScores.education}%` }}
                />
              </div>
            </div>
          </div>

          {/* Side-by-Side Skills Tag Clouds */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* 1. Matched Skills (Green) */}
            <div className="bg-emerald-50/50 border border-emerald-200 rounded-3xl p-5 sm:p-6">
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Matched Skills & Keywords ({matchResult.skills.matched.length})</span>
                </h4>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                  ✓ Found in Both
                </span>
              </div>

              {matchResult.skills.matched.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {matchResult.skills.matched.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-emerald-800 border border-emerald-300 shadow-2xs flex items-center gap-1.5"
                    >
                      <span className="text-emerald-500">✓</span>
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-emerald-700 italic">
                  No common technical keywords detected between this resume and JD.
                </p>
              )}
            </div>

            {/* 2. Missing Skills (Red/Amber with direct 1-click add to Block 1) */}
            <div className="bg-rose-50/50 border border-rose-200 rounded-3xl p-5 sm:p-6">
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>Missing Skills from JD ({matchResult.skills.missing.length})</span>
                </h4>
                <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full">
                  ⚠️ Action Required
                </span>
              </div>

              {matchResult.skills.missing.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {matchResult.skills.missing.map((skill, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          if (onAddSkillToBuilder) {
                            onAddSkillToBuilder(skill);
                            setNotice(`✓ Added "${skill}" to Resume Maker (Block 1)!`);
                            setTimeout(() => setNotice(""), 3500);
                          }
                        }}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-orange-50 text-rose-800 hover:text-[#ff5421] border border-rose-300 hover:border-orange-400 shadow-2xs flex items-center gap-1.5 transition cursor-pointer group active:scale-95"
                        title={`Click to add ${skill} to your Resume Maker`}
                      >
                        <span className="text-rose-500 group-hover:text-[#ff5421] font-black">+</span>
                        <span>{skill}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-2 bg-white/70 p-3 rounded-xl border border-rose-100">
                    💡 <em>Click any missing skill with a <strong>(+)</strong> to automatically add it to your <strong>Resume Maker (Block 1)</strong>!</em>
                  </p>
                </div>
              ) : (
                <p className="text-xs text-emerald-700 font-bold">
                  🎉 Outstanding! Your resume covers all required skills listed in this job description!
                </p>
              )}
            </div>
          </div>

          {/* Actionable Tailoring Recommendations */}
          {matchResult.tailoringTips && matchResult.tailoringTips.length > 0 && (
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-6">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#ff5421]" />
                <span>How to Reach 95%+ Match for this Job:</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {matchResult.tailoringTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#ff5421] font-black mt-0.5">•</span>
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Error notice if validation failed */}
      {matchResult && !matchResult.isValid && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs font-bold text-rose-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600" />
          <span>{matchResult.error}</span>
        </div>
      )}
    </div>
  );
}
