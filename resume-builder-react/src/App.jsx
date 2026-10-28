import React, { useState, useEffect } from "react";
import HeroBanner from "./components/HeroBanner";
import EditorContainer from "./components/EditorForm/EditorContainer";
import PreviewSection from "./components/PreviewSection";
import AtsScoreMeter from "./components/AtsScoreMeter";
import AtsCheckerModal from "./components/AtsCheckerModal";
import ProfileMatcherBlock from "./components/ProfileMatcherBlock";
import AiChatBlock from "./components/AiChatBlock";
import EmailResumeModal from "./components/EmailResumeModal";
import UncodemyLoginModal from "./components/Auth/UncodemyLoginModal";
import Toast from "./components/Toast";
import { initialResumeData, sampleProfiles } from "./data/sampleData";
import { TEMPLATES, ACCENT_COLORS, FONTS } from "./data/templates";
import { calculateAtsScore } from "./utils/atsScorer";
import {
  FileText,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Target,
  Bot,
  RotateCcw,
  Check,
  Layers,
  Flame
} from "lucide-react";
import confetti from "canvas-confetti";
import { getCurrentUser, logoutUser } from "./services/authService";

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem("resumecraft_data");
    if (!saved) return initialResumeData;
    try {
      const parsed = JSON.parse(saved);
      // If previous user had old pre-filled sample ("Rahul Sharma" or "Pooja Verma"), clear it!
      if (
        parsed?.personalInfo?.fullName === "Rahul Sharma" ||
        parsed?.personalInfo?.email === "rahul.sharma@example.com" ||
        parsed?.personalInfo?.fullName === "Pooja Verma"
      ) {
        localStorage.removeItem("resumecraft_data");
        return initialResumeData;
      }
      return parsed;
    } catch {
      return initialResumeData;
    }
  });

  // 3 Distinct Studio Blocks:
  // "maker" = Resume Maker Studio (Form & 100% Monochrome ATS Preview)
  // "matcher" = Job Profile Matcher (Side-by-side JD comparison & Match %)
  // "chat" = AI Resume Chatbot Copilot (Full Groq Assistant)
  const [activeStudioBlock, setActiveStudioBlock] = useState("maker");

  // Maker View sub-state: "form" (Step 1: Enter details) vs "preview" (Step 2: View & Download ATS Resume)
  const [activeView, setActiveView] = useState("form");

  // Auxiliary Modals (100% Free)
  const [isAtsCheckerOpen, setIsAtsCheckerOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Live ATS score
  const atsResult = calculateAtsScore(resumeData);
  const atsScore = atsResult.score;

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem("resumecraft_data", JSON.stringify(resumeData));
  }, [resumeData]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    showToast(`Welcome ${user.name || "Student"}! 100% Free & Unlimited Access Enabled.`, "success");
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    showToast("Logged out successfully.", "warning");
  };

  const handleExportSuccess = () => {
    showToast("Resume exported! 100% Free & Unlimited.", "success");
  };

  const handleLoadProfile = (profile) => {
    setResumeData(profile);
    showToast("Loaded sample profile data!", "success");
  };

  const handleApplyResumeFromAi = (newResume) => {
    setResumeData(newResume);
    setActiveStudioBlock("maker");
    setActiveView("preview");
    showToast("✨ Applied AI resume! Viewing in 100% Black & White ATS format.", "success");
  };

  const handleResetData = () => {
    setResumeData({
      personalInfo: {
        fullName: "",
        jobTitle: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
        portfolio: "",
        photoUrl: "",
        summary: ""
      },
      experience: [],
      education: [],
      skills: { technical: [], softSkills: [], tools: [] },
      projects: [],
      certifications: []
    });
    showToast("Form cleared to blank slate.", "warning");
  };

  // Direct 100% Free PDF Print / Export
  const handleDownloadPdf = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {}

    handleExportSuccess();

    setTimeout(() => {
      window.print();
    }, 300);
  };

  const handleAddSkillToBuilder = (newSkill) => {
    if (!newSkill) return;
    setResumeData((prev) => {
      const existing = prev.skills || [];
      if (existing.some((s) => s.toLowerCase() === newSkill.toLowerCase())) {
        return prev;
      }
      return {
        ...prev,
        skills: [...existing, newSkill]
      };
    });
    setToast({
      type: "success",
      message: `Added "${newSkill}" to your Resume Skills!`
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Hero Conversion & 3-Block Studio Selector */}
      {activeStudioBlock === "maker" && activeView === "form" && (
        <div className="no-print">
          <HeroBanner
            activeStudioBlock={activeStudioBlock}
            onSelectBlock={(block) => {
              setActiveStudioBlock(block);
              if (block === "maker") setActiveView("form");
            }}
            onLoadFresherProfile={() => {
              handleLoadProfile(sampleProfiles.fresher);
              setActiveStudioBlock("maker");
              setActiveView("form");
            }}
            currentUser={currentUser}
            onOpenLoginModal={() => setIsLoginModalOpen(true)}
          />
        </div>
      )}

      {/* Main Studio Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* =========================================================
            3 DEDICATED STUDIO MODULES / BLOCKS SWITCHER BAR
            ========================================================= */}
        <div className="no-print mb-6 bg-white border-2 border-slate-200 rounded-2xl p-2 sm:p-2.5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Module Selector Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
            {/* Block 1: Resume Maker */}
            <button
              type="button"
              onClick={() => setActiveStudioBlock("maker")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer active:scale-95 whitespace-nowrap ${
                activeStudioBlock === "maker"
                  ? "bg-[#ff5421] text-white shadow-md shadow-orange-500/25 ring-2 ring-[#ff5421]/30"
                  : "bg-slate-100 text-slate-700 hover:bg-orange-50 hover:text-[#ff5421]"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>1. Resume Maker</span>
            </button>

            {/* Block 2: Profile Matcher */}
            <button
              type="button"
              onClick={() => setActiveStudioBlock("matcher")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer active:scale-95 whitespace-nowrap ${
                activeStudioBlock === "matcher"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-500/30"
                  : "bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <Target className="w-4 h-4" />
              <span>2. Job Matcher</span>
            </button>

            {/* Block 3: AI Chatbot */}
            <button
              type="button"
              onClick={() => setActiveStudioBlock("chat")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer active:scale-95 whitespace-nowrap ${
                activeStudioBlock === "chat"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/25 ring-2 ring-purple-500/30"
                  : "bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-600"
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>3. AI Chatbot</span>
            </button>
          </div>

          {/* Right Status Badge & Student Account */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Free Forever</span>
            </span>

            {currentUser ? (
              <div className="flex items-center gap-1.5 bg-slate-100 text-slate-800 border border-slate-200 text-[11px] font-bold px-3 py-1 rounded-full">
                <span>✓ {currentUser.name || currentUser.email}</span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-slate-500 hover:text-rose-600 font-black ml-1 cursor-pointer"
                  title="Logout"
                >
                  (Logout)
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsLoginModalOpen(true)}
                className="text-[11px] font-bold px-3 py-1 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#ff5421] border border-orange-200 transition cursor-pointer"
              >
                Student Login
              </button>
            )}
          </div>
        </div>

        {/* =========================================================
            BLOCK 1: RESUME MAKER STUDIO
            ========================================================= */}
        {activeStudioBlock === "maker" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Step Indicator & Top Control Bar */}
            <div className="no-print flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-3 sm:p-4 rounded-2xl border border-neutral-200 shadow-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5421] animate-ping" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                  {activeView === "form" ? "Step 1: Enter Your Details" : "Step 2: 100% Black & White ATS Resume"}
                </span>
                <span className="text-[11px] bg-orange-100 text-[#ff5421] font-bold px-2 py-0.5 rounded-full">
                  {activeView === "form" ? "Details Mode" : "Preview & Download"}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full md:w-auto flex-wrap">
                {activeView === "preview" && (
                  <button
                    type="button"
                    onClick={() => setActiveView("form")}
                    className="col-span-2 sm:col-span-1 min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black text-slate-900 bg-white hover:bg-slate-100 border-2 border-slate-900 shadow-xs transition flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95"
                    title="Return to form to edit details"
                  >
                    <ArrowLeft className="w-4 h-4 text-slate-900 stroke-[2.5]" />
                    <span>← Back to Form</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setActiveView("form")}
                  className={`min-h-[44px] px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center text-center ${
                    activeView === "form"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  1. Details (Form)
                </button>

                <button
                  type="button"
                  onClick={() => setActiveView("preview")}
                  className={`min-h-[44px] flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer text-center ${
                    activeView === "preview"
                      ? "bg-[#ff5421] text-white shadow-md shadow-orange-500/25"
                      : "bg-orange-50 text-[#ff5421] hover:bg-orange-100 border border-orange-200"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>2. Resume (Preview)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsAtsCheckerOpen(true)}
                  className="min-h-[44px] px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>ATS Score: {atsScore}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveStudioBlock("matcher")}
                  className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-black text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-300 transition cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                  title="Compare your Resume against any Job Description"
                >
                  <Target className="w-4 h-4 text-blue-600" />
                  <span>🎯 Job Matcher %</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetData}
                  className="min-h-[44px] px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 transition cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                  title="Clear all fields and start with a fresh blank resume"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear Form</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveStudioBlock("chat")}
                  className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 transition cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                  title="Open AI Resume Chatbot Copilot"
                >
                  <Bot className="w-4 h-4 text-white" />
                  <span>🤖 AI Copilot</span>
                </button>
              </div>
            </div>

            {/* STEP 1 VIEW: Clean Form Only */}
            {activeView === "form" && (
              <div className="max-w-4xl mx-auto space-y-5 animate-in fade-in duration-200">
                {/* Top Compact ATS Score & Generate CTA Bar */}
                <div className="no-print bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-black text-lg shadow-2xs">
                      {atsScore}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <h4 className="font-bold text-xs uppercase tracking-wide text-slate-900">
                          ATS Compatibility Score ({atsScore}/100)
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {atsResult.status} • Recruiter Approved Monochrome
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setIsAtsCheckerOpen(true)}
                      className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition cursor-pointer flex items-center justify-center gap-1.5"
                      title="Check or Upload Student Resume for Free ATS Scoring"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>🎯 Free ATS Score (Upload/Paste)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveView("preview")}
                      className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-[#ff5421] to-[#e04515] hover:from-[#e04515] hover:to-[#c2380d] shadow-md shadow-orange-500/25 flex items-center justify-center gap-1.5 transition cursor-pointer hover:scale-[1.01]"
                    >
                      <FileText className="w-4 h-4 text-white" />
                      <span>Open Resume Preview →</span>
                    </button>
                  </div>
                </div>

                {/* Main Form Tabs */}
                <div className="no-print">
                  <EditorContainer
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                    onOpenPreview={() => setActiveView("preview")}
                  />
                </div>
              </div>
            )}

            {/* STEP 2 VIEW: 100% Black & White ATS Resume Preview */}
            {activeView === "preview" && (
              <div className="max-w-5xl mx-auto space-y-4 animate-in fade-in duration-200">
                <PreviewSection
                  resumeData={resumeData}
                  isProUser={true}
                  freeExportsLeft={999999}
                  onExportSuccess={handleExportSuccess}
                  onOpenEmailModal={() => setIsEmailModalOpen(true)}
                  onBackToEdit={() => setActiveView("form")}
                  onOpenAtsChecker={() => setIsAtsCheckerOpen(true)}
                />
              </div>
            )}

            {/* Hidden Print Container: ensures window.print() always prints ATS Resume */}
            {activeView === "form" && (
              <div className="hidden print:block">
                <PreviewSection
                  resumeData={resumeData}
                  isProUser={true}
                  freeExportsLeft={999999}
                  onExportSuccess={handleExportSuccess}
                  onOpenEmailModal={() => setIsEmailModalOpen(true)}
                  onBackToEdit={() => setActiveView("form")}
                  onOpenAtsChecker={() => setIsAtsCheckerOpen(true)}
                />
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            BLOCK 2: JOB PROFILE MATCHER (MATCHING BLOCK)
            ========================================================= */}
        {activeStudioBlock === "matcher" && (
          <div className="animate-in fade-in duration-200">
            <ProfileMatcherBlock
              resumeData={resumeData}
              onAddSkillToBuilder={handleAddSkillToBuilder}
              onSwitchToMaker={() => {
                setActiveStudioBlock("maker");
                setActiveView("preview");
              }}
              onSwitchToChat={() => setActiveStudioBlock("chat")}
            />
          </div>
        )}

        {/* =========================================================
            BLOCK 3: AI RESUME CHATBOT (AI CHAT COPILOT)
            ========================================================= */}
        {activeStudioBlock === "chat" && (
          <div className="animate-in fade-in duration-200">
            <AiChatBlock
              resumeData={resumeData}
              onApplyResume={(newResume) => {
                handleApplyResumeFromAi(newResume);
                setActiveStudioBlock("maker");
                setActiveView("preview");
              }}
              onSwitchToMaker={() => {
                setActiveStudioBlock("maker");
                setActiveView("form");
              }}
              onSwitchToMatcher={() => setActiveStudioBlock("matcher")}
            />
          </div>
        )}
      </main>

      {/* Auxiliary ATS Score Modal (Free) */}
      <AtsCheckerModal
        isOpen={isAtsCheckerOpen}
        onClose={() => setIsAtsCheckerOpen(false)}
        resumeData={resumeData}
        onOpenPreview={() => {
          setActiveStudioBlock("maker");
          setActiveView("preview");
          setIsAtsCheckerOpen(false);
        }}
        onOpenAiChat={() => {
          setActiveStudioBlock("chat");
          setIsAtsCheckerOpen(false);
        }}
        onApplyResume={handleApplyResumeFromAi}
      />

      {/* Auxiliary Direct Email Delivery Modal (Free) */}
      <EmailResumeModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        resumeData={resumeData}
        selectedTemplate="Official ATS Black & White"
        atsScore={atsScore}
        isProUser={true}
      />

      {/* Auxiliary Student Verification Modal (Free) */}
      <UncodemyLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Dynamic Toast Feedback */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
