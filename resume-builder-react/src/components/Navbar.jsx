import React, { useState } from "react";
import {
  Sparkles,
  FileText,
  RotateCcw,
  Crown,
  Bot,
  ChevronDown,
  ShieldCheck,
  Phone,
  Mail,
  GraduationCap,
  LogOut,
  User,
  Menu,
  X,
  ArrowLeft,
  Target
} from "lucide-react";
import { sampleProfiles } from "../data/sampleData";

export default function Navbar({
  onLoadProfile,
  onResetData,
  onOpenPricing,
  freeExportsLeft,
  isProUser,
  onResetTrial,
  onOpenAiChat,
  aiGenerationsLeft,
  onOpenAtsChecker,
  onOpenProfileMatcher,
  atsScore = 95,
  activeView,
  setActiveView,
  currentUser,
  onLogout,
  onOpenLoginModal
}) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [trainingDropdownOpen, setTrainingDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        id="main-nav"
        className="no-print fixed top-0 left-0 w-full z-[1000] bg-white text-black shadow-xs font-['Poppins','Rubik',sans-serif]"
      >
        {/* ========================================================
            1. TOP HELPLINE BAR (Identical to uncodemy.com)
            White background with vibrant orange vertical separators '|'
            ======================================================== */}
        <div className="bg-white border-b border-neutral-100 py-1.5 px-4 hidden md:block text-[11px] font-semibold text-slate-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <span className="bg-orange-100 text-[#ff5421] px-2.5 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 shadow-2xs">
                <GraduationCap className="w-3.5 h-3.5 text-[#ff5421]" />
                <span>Free for Uncodemy: 100% Free AI Resume Copilot</span>
              </span>
              {!currentUser ? (
                <button
                  type="button"
                  onClick={onOpenLoginModal}
                  className="text-[#ff5421] font-black hover:underline cursor-pointer text-[10px] flex items-center gap-0.5"
                >
                  <span>Student Login</span>
                  <span className="text-[9px]">→</span>
                </button>
              ) : (
                <span className="text-emerald-700 text-[10px] font-bold">
                  ✓ Verified Student ({currentUser.email})
                </span>
              )}
            </div>

            <div className="flex items-center justify-end gap-2.5">
            <span className="text-[#ff5421] font-bold text-sm">|</span>
            <a
              href="tel:+919818366550"
              className="hover:text-[#ff5421] transition tracking-tight"
            >
              +91 9818366550 / +91 8448807675 / +91 8766313646
            </a>

            <span className="text-[#ff5421] font-bold text-sm">|</span>
            <span className="text-slate-800">
              For Support : <a href="tel:+918800023723" className="hover:text-[#ff5421] transition font-bold">+91 8800023723</a>
            </span>

            <span className="text-[#ff5421] font-bold text-sm">|</span>
            <a
              href="mailto:info@uncodemy.com"
              className="hover:text-[#ff5421] transition"
            >
              info@uncodemy.com
            </a>

            <span className="text-[#ff5421] font-bold text-sm">|</span>
            {/* WhatsApp Icon */}
            <a
              href="https://api.whatsapp.com/send?phone=918800023723"
              target="_blank"
              rel="noreferrer"
              className="hover:scale-110 transition flex items-center"
              title="Chat on WhatsApp"
            >
              <span className="w-4 h-4 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-2xs">
                <svg className="w-2.5 h-2.5 fill-white" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.974.554 1.769.82 2.795.82h.005c3.182 0 5.768-2.587 5.769-5.766.001-3.182-2.585-5.77-5.774-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.06-2.072-.511-1.764-.728-2.886-2.518-2.973-2.634-.087-.117-.714-.951-.714-1.815 0-.864.453-1.289.614-1.464.161-.176.351-.22.468-.22.117 0 .234.001.336.006.107.005.25-.041.391.298.144.348.492 1.2.535 1.288.043.088.072.19.014.305-.058.115-.087.187-.175.29-.087.103-.184.23-.263.308-.088.087-.179.182-.077.357.102.175.454.748.974 1.211.67.597 1.235.782 1.41.869.175.088.278.073.38-.044.103-.117.438-.511.555-.686.117-.175.234-.146.394-.088.161.058 1.022.482 1.197.569.175.088.292.132.336.205.044.073.044.423-.1 1.028z" />
                </svg>
              </span>
            </a>

            <span className="text-[#ff5421] font-bold text-sm">|</span>
          </div>
        </div>
      </div>

        {/* ========================================================
            2. MAIN NAVBAR ROW (UnCodemy Logo, #1 India's Top IT, Categories, Menu)
            ======================================================== */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          {/* Left: Exact Uncodemy Logo + #1 Badge + CATEGORIES Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Logo Brand */}
            <div
              onClick={() => setActiveView && setActiveView("form")}
              className="flex flex-col items-center cursor-pointer select-none group"
              title="Uncodemy Career Hub"
            >
              {/* Split U - C Icon Box */}
              <div className="flex items-center shadow-xs">
                <div className="w-5 h-6 bg-[#2d3748] rounded-l-md flex items-center justify-center text-white font-black text-sm">
                  U
                </div>
                <div className="w-1 h-6 bg-white" />
                <div className="w-5 h-6 bg-[#ff5421] rounded-r-md flex items-center justify-center text-white font-black text-sm">
                  C
                </div>
              </div>
              {/* UnCodemy Text */}
              <span className="font-black text-xs tracking-tight text-slate-900 group-hover:text-[#ff5421] transition mt-0.5">
                UnCodemy
              </span>
            </div>

            {/* #1 India's Top IT Training Institute */}
            <div className="hidden sm:flex items-center gap-1.5 pl-3 border-l border-neutral-200">
              <span className="text-2xl font-black text-[#ff5421] leading-none">#1</span>
              <div className="text-[10px] font-bold text-slate-800 leading-tight">
                <div>India's Top IT</div>
                <div className="text-slate-500 font-semibold">Training Institute</div>
              </div>
            </div>

            {/* CATEGORIES Button (Solid Orange) - desktop only */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="px-4 py-2 bg-[#ff5421] hover:bg-[#e04515] text-white font-black text-xs uppercase tracking-wider rounded-lg shadow-sm shadow-orange-500/20 transition cursor-pointer flex items-center gap-1"
              >
                <span>CATEGORIES</span>
              </button>

              {categoriesOpen && (
                <div
                  className="absolute left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-2xl p-2 z-50 text-xs animate-in fade-in"
                  onClick={() => setCategoriesOpen(false)}
                >
                  <div className="font-bold text-slate-400 uppercase text-[10px] px-2 py-1">Top Placement Tracks</div>
                  <div
                    onClick={() => onLoadProfile(sampleProfiles.experienced)}
                    className="p-2 hover:bg-orange-50 hover:text-[#ff5421] rounded-lg cursor-pointer font-semibold"
                  >
                    ☕ Java Full Stack Development
                  </div>
                  <div
                    onClick={() => onLoadProfile(sampleProfiles.fresher)}
                    className="p-2 hover:bg-orange-50 hover:text-[#ff5421] rounded-lg cursor-pointer font-semibold"
                  >
                    ⚛️ MERN & React Full Stack
                  </div>
                  <div className="p-2 hover:bg-orange-50 hover:text-[#ff5421] rounded-lg cursor-pointer font-semibold">
                    📊 Data Science & AI Engineering
                  </div>
                  <div className="p-2 hover:bg-orange-50 hover:text-[#ff5421] rounded-lg cursor-pointer font-semibold">
                    🐍 Python & Data Analytics
                  </div>
                  <div className="p-2 hover:bg-orange-50 hover:text-[#ff5421] rounded-lg cursor-pointer font-semibold">
                    🧪 Software Testing & Automation
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Right Quick Action Group (< md) */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Fees Payment CTA */}
            <button
              type="button"
              onClick={onOpenPricing}
              className="px-3 py-1.5 bg-[#16a34a] hover:bg-[#15803d] text-white font-extrabold text-[11px] rounded-lg shadow-sm transition cursor-pointer flex items-center gap-1"
              title="Fees Payment / Student Pro ₹29"
            >
              <span>₹29 Pro</span>
            </button>

            {/* Mobile AI Copilot Trigger */}
            <button
              type="button"
              onClick={onOpenAiChat}
              className="p-2 rounded-xl bg-orange-50 text-[#ff5421] border border-orange-200 hover:bg-orange-100 transition cursor-pointer relative"
              title="AI Resume Copilot"
            >
              <Bot className="w-4 h-4 text-[#ff5421]" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#ff5421] rounded-full animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#ff5421] rounded-full" />
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition cursor-pointer flex items-center justify-center min-h-[38px] min-w-[38px]"
              aria-label="Navigation menu toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
            </button>
          </div>

          {/* Desktop Right: Menu Navigation Links (Identical to screenshot) */}
          <div className="hidden md:flex items-center gap-4 sm:gap-6 text-xs font-bold text-slate-800">
            {/* Home */}
            <button
              type="button"
              onClick={() => setActiveView && setActiveView("form")}
              className="hover:text-[#ff5421] transition cursor-pointer hidden md:inline"
            >
              Home
            </button>

            {/* Courses ▼ */}
            <div className="relative hidden lg:block">
              <button
                type="button"
                onClick={() => setCoursesDropdownOpen(!coursesDropdownOpen)}
                className="hover:text-[#ff5421] transition cursor-pointer flex items-center gap-0.5"
              >
                <span>Courses</span>
                <span className="text-[10px]">▼</span>
              </button>
              {coursesDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50 text-xs"
                  onClick={() => setCoursesDropdownOpen(false)}
                >
                  <div className="p-2 hover:bg-orange-50 hover:text-[#ff5421] rounded-lg cursor-pointer font-semibold">Full Stack Java Development</div>
                  <div className="p-2 hover:bg-orange-50 hover:text-[#ff5421] rounded-lg cursor-pointer font-semibold">Full Stack Web Development</div>
                  <div className="p-2 hover:bg-orange-50 hover:text-[#ff5421] rounded-lg cursor-pointer font-semibold">Data Science Masters</div>
                  <div className="p-2 hover:bg-orange-50 hover:text-[#ff5421] rounded-lg cursor-pointer font-semibold">Cloud & DevOps Engineering</div>
                </div>
              )}
            </div>

            {/* Placement */}
            <button
              type="button"
              onClick={onOpenAtsChecker}
              className="hover:text-[#ff5421] transition cursor-pointer hidden lg:inline"
              title="Check Placement ATS Score"
            >
              Placement
            </button>

            {/* Training ▼ */}
            <div className="relative hidden xl:block">
              <button
                type="button"
                onClick={() => setTrainingDropdownOpen(!trainingDropdownOpen)}
                className="hover:text-[#ff5421] transition cursor-pointer flex items-center gap-0.5"
              >
                <span>Training</span>
                <span className="text-[10px]">▼</span>
              </button>
              {trainingDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50 text-xs"
                  onClick={() => setTrainingDropdownOpen(false)}
                >
                  <div className="p-2 hover:bg-orange-50 hover:text-[#ff5421] rounded-lg cursor-pointer font-semibold">Classroom Training</div>
                  <div className="p-2 hover:bg-orange-50 hover:text-[#ff5421] rounded-lg cursor-pointer font-semibold">Live Online Training</div>
                  <div className="p-2 hover:bg-orange-50 hover:text-[#ff5421] rounded-lg cursor-pointer font-semibold">Corporate Training</div>
                </div>
              )}
            </div>

            {/* About ▼ */}
            <div className="relative hidden xl:block">
              <button
                type="button"
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                className="hover:text-[#ff5421] transition cursor-pointer flex items-center gap-0.5"
              >
                <span>About</span>
                <span className="text-[10px]">▼</span>
              </button>
              {aboutDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50 text-xs"
                  onClick={() => setAboutDropdownOpen(false)}
                >
                  <div className="p-2 hover:bg-orange-50 hover:text-[#ff5421] rounded-lg cursor-pointer font-semibold">About Uncodemy</div>
                  <div className="p-2 hover:bg-orange-50 hover:text-[#ff5421] rounded-lg cursor-pointer font-semibold">Our Placement Partners</div>
                  <div className="p-2 hover:bg-orange-50 hover:text-[#ff5421] rounded-lg cursor-pointer font-semibold">Student Reviews</div>
                </div>
              )}
            </div>

            {/* Career Guidance with '🔥 AI-Powered' Bubble (Exact match to screenshot) */}
            <div className="relative flex flex-col items-center">
              {/* Orange Floating Tooltip with Triangle Pointer */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#ff5421] text-white text-[9px] font-black px-2 py-0.5 rounded-full whitespace-nowrap shadow-xs flex items-center gap-0.5 animate-bounce">
                <span>🔥 AI-Powered</span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-[3px] border-transparent border-t-[#ff5421]" />
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!currentUser) {
                    onOpenLoginModal();
                  } else {
                    onOpenAiChat();
                  }
                }}
                className="font-bold text-xs text-[#0284c7] hover:text-[#0369a1] transition cursor-pointer pt-1"
                title="Open Uncodemy AI Resume Copilot"
              >
                Career Guidance
              </button>
            </div>

            {/* Free ATS Score Checker */}
            <button
              type="button"
              onClick={onOpenAtsChecker}
              className="px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-[#ff5421] text-[#ff5421] hover:text-white border border-orange-200 hover:border-[#ff5421] font-black text-xs transition cursor-pointer hidden sm:flex items-center gap-1.5 shadow-2xs hover:scale-105 active:scale-95"
              title="100% Free Resume ATS Checker for Students"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>🎯 Free ATS Score</span>
            </button>

            {/* AI Resume & Job Profile Matcher */}
            {onOpenProfileMatcher && (
              <button
                type="button"
                onClick={onOpenProfileMatcher}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs transition cursor-pointer hidden md:flex items-center gap-1.5 shadow-xs hover:scale-105 active:scale-95"
                title="Compare your Resume against any Job Profile"
              >
                <Target className="w-3.5 h-3.5 text-white" />
                <span>🎯 Profile Matcher %</span>
                <span className="text-[9px] bg-white text-[#ff5421] px-1.5 py-0.2 rounded-full font-black">NEW</span>
              </button>
            )}

            {/* Dedicated Back to Form button in desktop navbar when in preview */}
            {activeView === "preview" && (
              <button
                type="button"
                onClick={() => {
                  if (setActiveView) setActiveView("form");
                }}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-lg shadow-sm transition flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 border border-slate-700"
                title="Return to form to edit details"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-white" />
                <span>← Back to Form</span>
              </button>
            )}

            {/* Fees Payment Button (Exact Green Button from Screenshot) */}
            <button
              type="button"
              onClick={onOpenPricing}
              className="px-4 py-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-extrabold text-xs rounded-lg shadow-sm transition cursor-pointer hover:scale-105 active:scale-95"
              title="Fees Payment / Student Pro ₹29"
            >
              Fees Payment
            </button>

            {/* Free for Uncodemy Button (Student Login) or Logged In User Profile */}
            {!currentUser ? (
              <button
                type="button"
                onClick={onOpenLoginModal}
                className="px-3.5 py-2 bg-gradient-to-r from-amber-500 via-orange-500 to-[#ff5421] hover:opacity-95 text-white font-black text-xs rounded-xl shadow-md shadow-orange-500/25 transition cursor-pointer flex items-center gap-1.5 hover:scale-105 active:scale-95 border border-white/20 animate-pulse"
                title="Uncodemy students get 100% Free AI Copilot"
              >
                <GraduationCap className="w-4 h-4 text-white" />
                <span>Free for Uncodemy</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 pl-2 border-l border-neutral-200">
                <div className="hidden xl:flex flex-col text-right">
                  <span className="text-[11px] font-black text-slate-900 leading-tight flex items-center justify-end gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-[#ff5421]" />
                    <span>{currentUser.name || "Student"}</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.5 rounded-full border border-emerald-200">
                      {currentUser.role === "SUPER_ADMIN" ? "ADMIN" : "FREE AI"}
                    </span>
                  </span>
                  <span className="text-[9px] text-slate-500 font-mono truncate max-w-[130px]">
                    {currentUser.email}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onLogout}
                  className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs transition cursor-pointer flex items-center gap-1 border border-rose-200 hover:scale-105 active:scale-95"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-600" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            )}

            {/* Sample Profile Quick Switcher */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                title="Load Sample / Reset"
              >
                <Sparkles className="w-4 h-4 text-[#ff5421]" />
              </button>

              {profileDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 z-50 text-xs animate-in fade-in"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  <div className="font-bold text-slate-400 uppercase text-[10px] px-2 py-1">Quick Sample Profiles</div>
                  <button
                    type="button"
                    onClick={() => onLoadProfile(sampleProfiles.experienced)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-orange-50 transition flex items-center gap-2.5 text-slate-800 cursor-pointer"
                  >
                    <span>💻</span>
                    <div>
                      <div className="font-bold text-slate-900">Java Full Stack Dev</div>
                      <div className="text-[10px] text-slate-500">Spring Boot, React & Microservices</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => onLoadProfile(sampleProfiles.fresher)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-orange-50 transition flex items-center gap-2.5 text-slate-800 cursor-pointer"
                  >
                    <span>🎓</span>
                    <div>
                      <div className="font-bold text-slate-900">Fresher / Student</div>
                      <div className="text-[10px] text-slate-500">Uncodemy Placement Profile</div>
                    </div>
                  </button>
                  <div className="border-t border-slate-100 my-1" />
                  <button
                    type="button"
                    onClick={onResetData}
                    className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-rose-50 text-rose-600 transition flex items-center gap-2 text-xs cursor-pointer font-semibold"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Blank</span>
                  </button>
                  <button
                    type="button"
                    onClick={onResetTrial}
                    className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-amber-50 text-amber-700 transition flex items-center gap-2 text-[11px] cursor-pointer font-medium"
                  >
                    <span>🔄 Reset Free Trial</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* ========================================================
            MOBILE SLIDE-DOWN DRAWER MENU (For Smartphones < 768px)
            ======================================================== */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-neutral-200 px-4 py-4 space-y-4 shadow-xl max-h-[80vh] overflow-y-auto animate-in slide-in-from-top duration-200">
            {/* User Profile Bar & Logout */}
            {currentUser && (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-orange-50/60 border border-orange-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#ff5421] text-white flex items-center justify-center font-bold text-xs">
                    {currentUser.name ? currentUser.name[0].toUpperCase() : "U"}
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900">{currentUser.name || "Student"}</div>
                    <div className="text-[10px] text-slate-500 font-mono truncate max-w-[160px]">{currentUser.email}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 font-bold text-xs border border-rose-200 flex items-center gap-1 active:scale-95"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-600" />
                  <span>Logout</span>
                </button>
              </div>
            )}

            {/* Back Button for mobile drawer */}
            {activeView === "preview" && (
              <button
                type="button"
                onClick={() => {
                  if (setActiveView) setActiveView("form");
                  setMobileMenuOpen(false);
                }}
                className="w-full p-3.5 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm border border-slate-800"
              >
                <ArrowLeft className="w-4 h-4 text-white stroke-[2.5]" />
                <span>← Back to Form (Edit Details)</span>
              </button>
            )}

            {/* Primary Action Buttons */}
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  if (setActiveView) setActiveView("form");
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-xl border flex items-center justify-center gap-1.5 transition ${
                  activeView === "form"
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-slate-50 text-slate-800 border-slate-200"
                }`}
              >
                <span>1. Fill Form</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (setActiveView) setActiveView("preview");
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-xl border flex items-center justify-center gap-1.5 transition ${
                  activeView === "preview"
                    ? "bg-[#ff5421] text-white border-[#ff5421]"
                    : "bg-orange-50 text-[#ff5421] border-orange-200"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>2. View Resume</span>
              </button>
            </div>

            {/* Uncodemy Student Mobile Verification / Account */}
            {!currentUser ? (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenLoginModal) onOpenLoginModal();
                }}
                className="w-full p-3 rounded-2xl bg-gradient-to-r from-amber-500 to-[#ff5421] text-white flex items-center justify-between text-xs font-black shadow-md shadow-orange-500/20 active:scale-95 transition"
              >
                <span className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-white" />
                  <span>Free for Uncodemy (Student Login)</span>
                </span>
                <span className="text-[10px] bg-white text-[#ff5421] px-2 py-0.5 rounded-full font-black">
                  FREE AI
                </span>
              </button>
            ) : (
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <GraduationCap className="w-4 h-4 text-[#ff5421]" />
                  <div>
                    <div className="font-bold text-slate-900">{currentUser.name || "Student"}</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">✓ Verified Uncodemy Student</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 font-bold text-xs"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Quick Feature Buttons */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1">Special Features</div>
              
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiChat();
                }}
                className="w-full p-2.5 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 border border-orange-200 flex items-center justify-between text-xs font-bold text-slate-900"
              >
                <span className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-[#ff5421]" />
                  <span>AI Resume Copilot (Auto-Writer)</span>
                </span>
                <span className="text-[10px] bg-[#ff5421] text-white px-2 py-0.5 rounded-full font-black">
                  FREE
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAtsChecker();
                }}
                className="w-full p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 flex items-center justify-between text-xs font-bold text-emerald-900"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Check Placement ATS Score</span>
                </span>
                <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-black">
                  {atsScore}/100
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPricing();
                }}
                className="w-full p-2.5 rounded-xl bg-green-50 hover:bg-green-100 border border-green-200 flex items-center justify-between text-xs font-bold text-green-900"
              >
                <span className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-green-600" />
                  <span>Student Pro Pass (Fees Payment)</span>
                </span>
                <span className="text-[10px] bg-green-600 text-white px-2 py-0.5 rounded-full font-black">
                  ₹29 ONLY
                </span>
              </button>
            </div>

            {/* Quick Sample Profiles */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1">Load Demo Resumes</div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onLoadProfile(sampleProfiles.fresher);
                    setMobileMenuOpen(false);
                  }}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-orange-50 border border-slate-200 text-left text-xs font-bold text-slate-800"
                >
                  🎓 Fresher Demo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onLoadProfile(sampleProfiles.experienced);
                    setMobileMenuOpen(false);
                  }}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-orange-50 border border-slate-200 text-left text-xs font-bold text-slate-800"
                >
                  💻 2 Yr Java Dev
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  onResetData();
                  setMobileMenuOpen(false);
                }}
                className="w-full p-2 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Clear to Blank Slate
              </button>
            </div>

            {/* Student Helpline & Support Numbers */}
            <div className="pt-2 border-t border-slate-100 text-center space-y-1">
              <div className="text-[10px] font-bold text-slate-400">UNCODEMY STUDENT HELPLINE</div>
              <div className="flex items-center justify-center gap-3 text-xs font-bold text-[#ff5421]">
                <a href="tel:+918800023723" className="flex items-center gap-1 hover:underline">
                  <Phone className="w-3.5 h-3.5" /> +91 8800023723
                </a>
                <span>•</span>
                <a
                  href="https://api.whatsapp.com/send?phone=918800023723"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-600 hover:underline"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            3. BOTTOM ORANGE STRIP (Exact full-width bar from screenshot)
            Contains: 📣 New Launches, Project Management, PG Programs,
            Video Counselling Session, 📸 Placement Report, Download Certificate
            ======================================================== */}
        <div className="bg-[#ff5421] py-1.5 px-3 sm:px-4 shadow-sm border-t border-orange-600">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs overflow-x-auto scrollbar-none">
            {/* Pills from screenshot */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-nowrap shrink-0">
              {/* 📣 New Launches (Teal pill with border) */}
              <button
                type="button"
                onClick={() => onLoadProfile(sampleProfiles.fresher)}
                className="px-3 py-1 rounded-full bg-[#0d9488] hover:bg-[#0f766e] text-white font-bold text-[11px] shadow-xs flex items-center gap-1 border border-teal-300/40 cursor-pointer whitespace-nowrap transition transform hover:scale-105 active:scale-95"
              >
                <span>📣 New Launches</span>
              </button>

              {/* Project Management (Blue pill) */}
              <button
                type="button"
                onClick={() => onLoadProfile(sampleProfiles.experienced)}
                className="px-3 py-1 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-[11px] shadow-xs cursor-pointer whitespace-nowrap transition transform hover:scale-105 active:scale-95"
              >
                <span>Project Management</span>
              </button>

              {/* PG Programs (Blue pill) */}
              <button
                type="button"
                onClick={() => onLoadProfile(sampleProfiles.experienced)}
                className="px-3 py-1 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-[11px] shadow-xs cursor-pointer whitespace-nowrap transition transform hover:scale-105 active:scale-95"
              >
                <span>PG Programs</span>
              </button>

              {/* Video Counselling Session (Lime green pill) */}
              <button
                type="button"
                onClick={onOpenAiChat}
                className="px-3 py-1 rounded-full bg-[#84cc16] hover:bg-[#65a30d] text-neutral-900 font-extrabold text-[11px] shadow-xs cursor-pointer whitespace-nowrap transition transform hover:scale-105 active:scale-95"
              >
                <span>Video Counselling Session</span>
              </button>

              {/* 📸 Placement Report (Lime green pill) */}
              <button
                type="button"
                onClick={onOpenAtsChecker}
                className="px-3 py-1 rounded-full bg-[#84cc16] hover:bg-[#65a30d] text-neutral-900 font-extrabold text-[11px] shadow-xs cursor-pointer whitespace-nowrap flex items-center gap-1 transition transform hover:scale-105 active:scale-95"
              >
                <span>📸 Placement Report</span>
              </button>

              {/* Download Certificate (Lime green pill) */}
              <button
                type="button"
                onClick={() => {
                  if (setActiveView) setActiveView("preview");
                }}
                className="px-3 py-1 rounded-full bg-[#84cc16] hover:bg-[#65a30d] text-neutral-900 font-extrabold text-[11px] shadow-xs cursor-pointer whitespace-nowrap transition transform hover:scale-105 active:scale-95"
              >
                <span>Download Certificate</span>
              </button>
            </div>

            {/* Right side Student Quick Actions */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              {onOpenProfileMatcher && (
                <button
                  type="button"
                  onClick={onOpenProfileMatcher}
                  className="px-3 py-1 rounded-full bg-[#ff5421] text-white hover:bg-orange-600 font-black text-[11px] shadow-xs cursor-pointer flex items-center gap-1 transition"
                  title="Compare Resume with Target Job"
                >
                  <Target className="w-3.5 h-3.5 text-white" />
                  <span>Job Matcher %</span>
                </button>
              )}

              <button
                type="button"
                onClick={onOpenAtsChecker}
                className="px-3 py-1 rounded-full bg-white text-[#ff5421] hover:bg-orange-50 font-black text-[11px] shadow-xs cursor-pointer flex items-center gap-1 transition"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#ff5421]" />
                <span>ATS Score ({atsScore}/100)</span>
              </button>

              {setActiveView && (
                <button
                  type="button"
                  onClick={() => setActiveView(activeView === "preview" ? "form" : "preview")}
                  className="px-3 py-1 rounded-full bg-slate-900 hover:bg-black text-white font-bold text-[11px] shadow-xs cursor-pointer flex items-center gap-1 transition"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{activeView === "preview" ? "Edit Details" : "Preview Resume"}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content Spacer so fixed #main-nav never overlaps page content */}
      <div className="no-print h-[92px] sm:h-[105px] md:h-[138px] pointer-events-none" aria-hidden="true" />
    </>
  );
}
