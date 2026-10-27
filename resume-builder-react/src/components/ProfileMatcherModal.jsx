import React, { useState, useRef } from "react";
import {
  X,
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

export default function ProfileMatcherModal({
  isOpen,
  onClose,
  resumeData,
  onAddSkillToBuilder,
  onOpenAiChat
}) {
  const [resumeText, setResumeText] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [selectedPresetId, setSelectedPresetId] = useState("");
  const [matchResult, setMatchResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [notice, setNotice] = useState("");

  const resumeFileInputRef = useRef(null);
  const jdFileInputRef = useRef(null);

  if (!isOpen) return null;

  // 1. One-click load from builder data
  const handleLoadFromBuilder = () => {
    if (!resumeData) return;
    const text = convertResumeDataToText(resumeData);
    setResumeText(text);
    setResumeFileName("Current_Builder_Resume.txt");
    setNotice("✓ Successfully loaded current resume from builder!");
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
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-5 bg-slate-900/80 backdrop-blur-sm overflow-y-auto font-['Poppins','Rubik',sans-serif]"
    >
      <div className="relative w-full max-w-6xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-neutral-900 px-6 py-5 text-white flex items-center justify-between shrink-0 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-[#ff5421] to-amber-500 rounded-2xl shadow-lg shadow-orange-500/20">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black tracking-tight">
                  AI Resume & Job Profile Matcher
                </h3>
                <span className="text-[10px] bg-[#ff5421] text-white px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                  Live Matcher
                </span>
                <span className="hidden sm:inline-block text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-bold">
                  100% Free
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Upload your resume on one side and a job description on the other to check your ATS match percentage!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
            title="Close Matcher"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Notice Toast */}
        {notice && (
          <div className="bg-orange-50 border-b border-orange-200 px-6 py-2 text-xs font-bold text-[#ff5421] flex items-center justify-between animate-in fade-in">
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

        {/* Main Content Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6 bg-slate-50/70">
          {/* Side-by-Side Upload / Input Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* ========================================================
                LEFT COLUMN: Candidate Resume
                ======================================================== */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-[#ff5421]" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-800">
                        1. Candidate Resume (Left)
                      </h4>
                      <p className="text-[11px] text-slate-500">Your profile, projects & skills</p>
                    </div>
                  </div>

                  {/* One-click builder sync */}
                  <button
                    type="button"
                    onClick={handleLoadFromBuilder}
                    className="px-2.5 py-1 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#ff5421] border border-orange-200 text-[10.5px] font-bold transition cursor-pointer flex items-center gap-1 active:scale-95 shadow-2xs"
                    title="Load everything you entered in the builder"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>⚡ Use Current Resume</span>
                  </button>
                </div>

                {/* Upload or Drop */}
                <div className="flex items-center gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => resumeFileInputRef.current?.click()}
                    className="flex-1 py-2 px-3 rounded-xl border border-dashed border-orange-300 bg-orange-50/50 hover:bg-orange-100/60 transition cursor-pointer flex items-center justify-center gap-2 text-xs font-bold text-slate-700"
                  >
                    <FileUp className="w-4 h-4 text-[#ff5421]" />
                    <span>Upload Resume (.pdf, .txt)</span>
                  </button>
                  <input
                    type="file"
                    ref={resumeFileInputRef}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleResumeFileUpload(e.target.files[0]);
                      }
                    }}
                    accept=".pdf,.txt,.docx"
                    className="hidden"
                  />
                  {resumeFileName && (
                    <span className="text-[10px] font-mono font-bold bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 truncate max-w-[130px]">
                      {resumeFileName}
                    </span>
                  )}
                </div>

                {/* Textarea for resume text */}
                <div className="relative">
                  <textarea
                    rows={9}
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste your resume content here (or click '⚡ Use Current Resume' / 'Upload Resume' above)..."
                    className="w-full text-xs font-mono p-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#ff5421]/30 focus:border-[#ff5421] bg-slate-50/60 leading-relaxed resize-y"
                  />
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 px-1">
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
                        className="text-slate-400 hover:text-rose-600 font-bold"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================
                RIGHT COLUMN: Target Job Profile / Description
                ======================================================== */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-800">
                        2. Target Job Profile (Right)
                      </h4>
                      <p className="text-[11px] text-slate-500">Job description, role requirements & skills</p>
                    </div>
                  </div>

                  {/* File Upload button for JD */}
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
                    accept=".pdf,.txt,.docx"
                    className="hidden"
                  />
                </div>

                {/* Preset Chips */}
                <div className="mb-2">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <span>⚡ Quick Preset Roles:</span>
                  </div>
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
                    rows={9}
                    value={jobDescription}
                    onChange={(e) => {
                      setJobDescription(e.target.value);
                      setSelectedPresetId("");
                    }}
                    placeholder="Paste the target job description or requirements here (or click any of the preset role buttons above)..."
                    className="w-full text-xs font-mono p-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 bg-slate-50/60 leading-relaxed resize-y"
                  />
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 px-1">
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
                        className="text-slate-400 hover:text-rose-600 font-bold"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              CENTER CTA: Compare & Calculate Match Percentage
              ======================================================== */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              disabled={isAnalyzing || !resumeText.trim() || !jobDescription.trim()}
              onClick={handleCalculateMatch}
              className={`w-full sm:w-auto min-h-[48px] px-8 py-3 rounded-2xl text-xs sm:text-sm font-extrabold text-white transition flex items-center justify-center gap-2.5 shadow-xl transform active:scale-95 ${
                !resumeText.trim() || !jobDescription.trim()
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                  : "bg-gradient-to-r from-[#ff5421] via-orange-600 to-amber-600 hover:from-[#e04515] hover:to-amber-700 shadow-orange-500/30 cursor-pointer"
              }`}
            >
              <Sparkles className="w-5 h-5 text-white animate-spin-slow" />
              <span>
                {isAnalyzing ? "Comparing Profiles with ATS Engine..." : "⚡ Calculate Profile Match Percentage"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {(!resumeText.trim() || !jobDescription.trim()) && (
              <span className="text-[11px] text-slate-500 font-medium text-center">
                (Please provide both your resume and target job description above)
              </span>
            )}
          </div>

          {/* ========================================================
              MATCH RESULTS SECTION
              ======================================================== */}
          {matchResult && matchResult.isValid && (
            <div className="bg-white rounded-3xl border border-neutral-200 p-5 sm:p-7 shadow-lg space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
              {/* Top Hero Banner of Result */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-neutral-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center gap-5 z-10 text-center md:text-left">
                  {/* Big Circular Score Badge */}
                  <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
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
                      <span className="text-3xl font-black tracking-tight">{matchResult.matchScore}%</span>
                      <span className="text-[10px] uppercase font-bold text-neutral-400">Match</span>
                    </div>
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/10 border border-white/20 mb-2">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>Grade {matchResult.grade}</span>
                      <span className="text-neutral-400">•</span>
                      <span>{matchResult.verdict}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                      Profile Compatibility Analysis
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl leading-relaxed">
                      {matchResult.summary}
                    </p>
                  </div>
                </div>

                {/* Quick Action in Card */}
                {onOpenAiChat && (
                  <div className="z-10 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenAiChat();
                      }}
                      className="px-4 py-2.5 rounded-xl text-xs font-black text-slate-900 bg-white hover:bg-neutral-100 shadow-md transition cursor-pointer flex items-center gap-2"
                    >
                      <Bot className="w-4 h-4 text-[#ff5421]" />
                      <span>Auto-Tailor with AI Copilot</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 4 Category Score Breakdown Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Technical Stack
                  </span>
                  <span className="text-2xl font-black text-slate-900 mt-1 block">
                    {matchResult.categoryScores.technical}%
                  </span>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
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
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
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
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
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
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${matchResult.categoryScores.education}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Side-by-Side Skills Tag Clouds */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                {/* 1. Matched Skills (Green) */}
                <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h4 className="font-extrabold text-xs uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Matched Skills & Keywords ({matchResult.skills.matched.length})</span>
                    </h4>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      ✓ Present in Both
                    </span>
                  </div>

                  {matchResult.skills.matched.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {matchResult.skills.matched.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white text-emerald-800 border border-emerald-300 shadow-2xs flex items-center gap-1"
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

                {/* 2. Missing Skills (Red/Amber) */}
                <div className="bg-rose-50/50 border border-rose-200 rounded-2xl p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h4 className="font-extrabold text-xs uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      <span>Missing Skills from JD ({matchResult.skills.missing.length})</span>
                    </h4>
                    <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                      ⚠️ Needs Attention
                    </span>
                  </div>

                  {matchResult.skills.missing.length > 0 ? (
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        {matchResult.skills.missing.map((skill, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              if (onAddSkillToBuilder) {
                                onAddSkillToBuilder(skill);
                                setNotice(`✓ Added "${skill}" to your resume builder skills!`);
                                setTimeout(() => setNotice(""), 3000);
                              }
                            }}
                            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white hover:bg-orange-50 text-rose-800 hover:text-[#ff5421] border border-rose-300 hover:border-orange-400 shadow-2xs flex items-center gap-1 transition cursor-pointer group active:scale-95"
                            title={`Click to add ${skill} to your Resume Builder`}
                          >
                            <span className="text-rose-500 group-hover:text-[#ff5421] font-black">+</span>
                            <span>{skill}</span>
                          </button>
                        ))}
                      </div>
                      <p className="text-[10.5px] text-slate-500 mt-2">
                        💡 <em>Tip: Click any skill tag above with a <strong>(+)</strong> to automatically add it to your Resume Builder skills!</em>
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-emerald-700 font-bold">
                      🎉 Outstanding! Your resume covers all required skills listed in this job description!
                    </p>
                  )}
                </div>
              </div>

              {/* Actionable Tailoring Tips */}
              {matchResult.tailoringTips && matchResult.tailoringTips.length > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#ff5421]" />
                    <span>How to Reach 95%+ Match for this Job:</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {matchResult.tailoringTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#ff5421] font-bold mt-0.5">•</span>
                        <span>{tip}</span>
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
      </div>
    </div>
  );
}
