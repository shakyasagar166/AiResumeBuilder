import React, { useState, useEffect } from "react";
import HeroBanner from "./components/HeroBanner";
import EditorContainer from "./components/EditorForm/EditorContainer";
import PreviewSection from "./components/PreviewSection";
import AtsScoreMeter from "./components/AtsScoreMeter";
import AtsCheckerModal from "./components/AtsCheckerModal";
import ProfileMatcherModal from "./components/ProfileMatcherModal";
import PricingModal from "./components/PricingModal";
import AiChatCopilot from "./components/AiChatCopilot";
import EmailResumeModal from "./components/EmailResumeModal";
import UncodemyLoginModal from "./components/Auth/UncodemyLoginModal";
import Toast from "./components/Toast";
import { initialResumeData, sampleProfiles } from "./data/sampleData";
import { TEMPLATES, ACCENT_COLORS, FONTS } from "./data/templates";
import { calculateAtsScore } from "./utils/atsScorer";
import { FileText, ShieldCheck, ArrowRight, ArrowLeft, Sparkles, CheckCircle2, Target, Bot, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import {
  getFreeExportsLeft,
  decrementFreeExport,
  getAiGenerationsLeft,
  getIsProUser,
  setIsProUser,
  resetFreeTrialForDemo
} from "./services/apiService";
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

  const [selectedTemplate, setSelectedTemplate] = useState("modern-tech");
  const [accentColor, setAccentColor] = useState(ACCENT_COLORS[0]);
  const [fontOption, setFontOption] = useState(FONTS[0]);

  // View state: "form" (Step 1: Enter details) vs "preview" (Step 2: View & Download ATS Resume)
  const [activeView, setActiveView] = useState("form");
  const [isAtsCheckerOpen, setIsAtsCheckerOpen] = useState(false);
  const [isProfileMatcherOpen, setIsProfileMatcherOpen] = useState(false);

  const [freeExportsLeft, setFreeExportsLeftState] = useState(getFreeExportsLeft);
  const [aiGenerationsLeft, setAiGenerationsLeftState] = useState(getAiGenerationsLeft);
  const [isProUser, setIsProUserState] = useState(getIsProUser);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
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
    setIsProUserState(true);
    setAiGenerationsLeftState(999);
    showToast(`Welcome ${user.name || "Student"}! Verified Uncodemy student. AI Copilot is now 100% FREE!`, "success");
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setIsProUserState(false);
    setAiGenerationsLeftState(0);
    showToast("Logged out successfully.", "warning");
  };

  const handleExportSuccess = () => {
    const remaining = decrementFreeExport();
    setFreeExportsLeftState(remaining);
    if (remaining > 0) {
      showToast(`Resume exported! You have ${remaining} free download remaining.`, "success");
    } else {
      showToast(`Exported! Free trial completed (0 left). Upgrade to Pro for unlimited downloads.`, "warning");
    }
  };

  const handleProUnlocked = () => {
    setIsProUserState(true);
    setAiGenerationsLeftState(999);
    showToast("🎉 Pro Access Unlocked! Enjoy unlimited downloads, AI Copilot & all premium templates.", "success");
  };

  const handleLoadProfile = (profile) => {
    setResumeData(profile);
    showToast("Loaded sample profile data!", "success");
  };

  const handleApplyResumeFromAi = (newResume) => {
    setResumeData(newResume);
    setActiveView("preview");
    showToast("✨ AI Copilot generated your resume! Viewing in 100% Black & White ATS format.", "success");
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

  const handleResetTrial = () => {
    resetFreeTrialForDemo();
    setFreeExportsLeftState(2);
    setAiGenerationsLeftState(1);
    setIsProUserState(false);
    showToast("Free trial reset: 2 Free Downloads & 1 AI Generation restored!", "success");
  };

  const handleDownloadPdf = () => {
    if (!isProUser && freeExportsLeft <= 0) {
      setIsPricingOpen(true);
      return;
    }
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {}

    if (!isProUser) {
      handleExportSuccess();
    }

    setTimeout(() => {
      window.print();
    }, 400);
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
      {/* Hero conversion banner - only displayed in form view */}
      {activeView === "form" && (
        <div className="no-print">
          <HeroBanner
            onOpenPricing={() => setIsPricingOpen(true)}
            onLoadFresherProfile={() => handleLoadProfile(sampleProfiles.fresher)}
            onOpenAiChat={() => setIsAiChatOpen(true)}
            onOpenAtsChecker={() => setIsAtsCheckerOpen(true)}
            onOpenProfileMatcher={() => setIsProfileMatcherOpen(true)}
            currentUser={currentUser}
            onOpenLoginModal={() => setIsLoginModalOpen(true)}
          />
        </div>
      )}

      {/* Main Studio Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* Step Indicator & Top Control Bar */}
        <div className="no-print mb-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-3 sm:p-4 rounded-2xl border border-neutral-200 shadow-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5421] animate-ping" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-800">
              {activeView === "form" ? "Step 1: Enter Your Details" : "Step 2: 100% Black & White ATS Resume"}
            </span>
            <span className="text-[11px] bg-orange-100 text-[#ff5421] font-bold px-2 py-0.5 rounded-full">
              {activeView === "form" ? "Details Mode" : "Preview & Download"}
            </span>

            {/* Quick Student Login status */}
            {currentUser ? (
              <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-full">
                <span>✓ {currentUser.name || currentUser.email}</span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-emerald-700 hover:text-rose-600 font-black ml-1 cursor-pointer"
                  title="Logout"
                >
                  (Logout)
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsLoginModalOpen(true)}
                className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-orange-50 hover:bg-orange-100 text-[#ff5421] border border-orange-200 transition cursor-pointer"
              >
                Student Login →
              </button>
            )}
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
              onClick={() => setIsProfileMatcherOpen(true)}
              className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-black text-[#ff5421] bg-orange-50 hover:bg-orange-100 border border-orange-300 transition cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
              title="Compare your Resume against any Job Description"
            >
              <Target className="w-4 h-4 text-[#ff5421]" />
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
              onClick={() => {
                if (!currentUser) {
                  setIsLoginModalOpen(true);
                } else {
                  setIsAiChatOpen(true);
                }
              }}
              className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#ff5421] hover:bg-[#e04515] transition cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
            >
              <Bot className="w-4 h-4 text-white" />
              <span>🤖 AI Copilot</span>
            </button>
          </div>
        </div>

        {/* STEP 1 VIEW: Clean Form Only (No huge resume on first page!) */}
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

        {/* STEP 2 VIEW: 100% Black & White ATS Resume (Opens after button click) */}
        {activeView === "preview" && (
          <div className="max-w-5xl mx-auto space-y-4 animate-in fade-in duration-200">
            <PreviewSection
              resumeData={resumeData}
              isProUser={isProUser}
              freeExportsLeft={freeExportsLeft}
              onTriggerUpgrade={() => setIsPricingOpen(true)}
              onExportSuccess={handleExportSuccess}
              onOpenEmailModal={() => setIsEmailModalOpen(true)}
              onBackToEdit={() => setActiveView("form")}
              onOpenAtsChecker={() => setIsAtsCheckerOpen(true)}
            />
          </div>
        )}

        {/* Hidden Print Container: ensures window.print() always prints ATS Resume properly */}
        {activeView === "form" && (
          <div className="hidden print:block">
            <PreviewSection
              resumeData={resumeData}
              isProUser={isProUser}
              freeExportsLeft={freeExportsLeft}
              onTriggerUpgrade={() => setIsPricingOpen(true)}
              onExportSuccess={handleExportSuccess}
              onOpenEmailModal={() => setIsEmailModalOpen(true)}
              onBackToEdit={() => setActiveView("form")}
              onOpenAtsChecker={() => setIsAtsCheckerOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Pricing & Uncodemy Student Discount Modal */}
      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        onProUnlocked={handleProUnlocked}
        freeExportsLeft={freeExportsLeft}
      />

      {/* Direct Email Resume Delivery Modal */}
      <EmailResumeModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        resumeData={resumeData}
        selectedTemplate="Official ATS Black & White"
        atsScore={atsScore}
        isProUser={isProUser}
        onOpenPricing={() => setIsPricingOpen(true)}
      />

      {/* ATS Checker Modal */}
      <AtsCheckerModal
        isOpen={isAtsCheckerOpen}
        onClose={() => setIsAtsCheckerOpen(false)}
        resumeData={resumeData}
        onOpenPreview={() => setActiveView("preview")}
        onOpenAiChat={() => setIsAiChatOpen(true)}
        onApplyResume={handleApplyResumeFromAi}
      />

      {/* AI Resume & Job Profile Matcher Modal (Side-by-Side Match %) */}
      <ProfileMatcherModal
        isOpen={isProfileMatcherOpen}
        onClose={() => setIsProfileMatcherOpen(false)}
        resumeData={resumeData}
        onAddSkillToBuilder={handleAddSkillToBuilder}
        onOpenAiChat={() => setIsAiChatOpen(true)}
      />

      {/* AI Resume Copilot Assistant (Free for Uncodemy students in MongoDB, Paid for external users) */}
      <AiChatCopilot
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        onOpen={() => setIsAiChatOpen(true)}
        currentUser={currentUser}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        aiGenerationsLeft={aiGenerationsLeft}
        setAiGenerationsLeft={setAiGenerationsLeftState}
        isProUser={isProUser}
        freeExportsLeft={freeExportsLeft}
        onApplyResume={handleApplyResumeFromAi}
        onDownloadPdf={handleDownloadPdf}
        onOpenEmailModal={() => setIsEmailModalOpen(true)}
        onOpenPricing={() => setIsPricingOpen(true)}
        onResetTrial={handleResetTrial}
      />

      {/* Uncodemy Student Login / MySQL Verification Modal */}
      <UncodemyLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onOpenPricing={() => setIsPricingOpen(true)}
      />

      {/* Dynamic Toast feedback */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
