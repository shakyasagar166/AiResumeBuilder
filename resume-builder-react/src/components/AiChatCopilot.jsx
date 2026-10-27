import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Sparkles,
  Send,
  X,
  CheckCircle2,
  Lock,
  Crown,
  Zap,
  RotateCcw,
  AlertCircle,
  ArrowRight,
  Loader2,
  Download,
  Mail,
  ExternalLink,
  FileText,
  GraduationCap,
  CreditCard
} from "lucide-react";
import confetti from "canvas-confetti";
import { apiService, decrementAiGeneration } from "../services/apiService";

const QUICK_PROMPTS = [
  {
    label: "🎓 Fresher CSE (Java + React)",
    text: "My name is Shivam Shakya from Mainpuri. B.Tech CSE 2024 graduate. Proficient in Java, Spring Boot, React, and MySQL. Please generate a complete ATS-compliant resume."
  },
  {
    label: "💼 Full Stack Developer (2 Yrs)",
    text: "My name is Priya Sharma. Full Stack Developer with 2 years of experience in Java, Spring Boot, React, Redis, PostgreSQL, and REST APIs. Please generate an ATS-compliant resume."
  },
  {
    label: "📊 Data Analyst Fresher",
    text: "My name is Ankit Verma, BCA graduate 2023. Skilled in Python, SQL queries, Excel dashboards, and PowerBI data visualization. Completed a Sales Analysis project."
  },
  {
    label: "🌐 Modern Frontend Dev",
    text: "My name is Rohit Gupta. Skilled in HTML5, CSS3, Tailwind CSS, JavaScript (ES6+), React, Next.js, and Git. Created 5+ responsive web apps."
  }
];

export default function AiChatCopilot({
  isOpen,
  onClose,
  onOpen,
  currentUser,
  onOpenLoginModal,
  aiGenerationsLeft,
  setAiGenerationsLeft,
  isProUser,
  freeExportsLeft,
  onApplyResume,
  onDownloadPdf,
  onOpenEmailModal,
  onOpenPricing,
  onResetTrial
}) {
  // Check if current user is an active Uncodemy student verified in MySQL database
  const isVerifiedStudent = Boolean(
    currentUser && (
      currentUser.isUncodemyStudent === true ||
      currentUser.isPro === true ||
      currentUser.role === "SUPER_ADMIN" ||
      currentUser.role === "ADMIN" ||
      currentUser.role === "STUDENT" ||
      currentUser.role === "STUDENT_PRO" ||
      currentUser.email?.toLowerCase() === "shakaysagar166@gmail.com"
    )
  );

  // Check if user has an active paid subscription record (Paid Pro)
  const hasPaidSubscription = Boolean(
    !isVerifiedStudent && (
      Boolean(localStorage.getItem("resumecraft_paid_subscription")) ||
      currentUser?.hasPaidSubscription === true
    )
  );

  // Chatbot is 100% FREE for verified Uncodemy students, or PAID for Pro users. Strictly locked for everyone else.
  const hasAccess = isVerifiedStudent || hasPaidSubscription;
  const [messages, setMessages] = useState([
    {
      id: "m-1",
      sender: "ai",
      text: "👋 Hello! I am your AI Resume Copilot.\n\nShare your background — including your name, target job title, degree, technical skills, and any projects or work experience. I will auto-generate your 100% ATS-compliant Black & White resume in seconds!"
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("");
  const chatBottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputVal).trim();
    if (!text || isGenerating) return;

    // Add user message to conversation
    const userMsg = { id: "u-" + Date.now(), sender: "user", text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputVal("");

    if (!hasAccess) {
      setMessages((prev) => [
        ...prev,
        {
          id: "ai-locked-" + Date.now(),
          sender: "ai",
          isLockedWarning: true,
          isAccessRequired: true,
          text: "🔒 AI Resume Copilot is 100% FREE only for Uncodemy students!\n\n• If you are an Uncodemy Student, verify your student email for 100% Free Unlimited access.\n• If you are an external user, unlock the Student Pro Pass (₹29) for full AI Copilot access."
        }
      ]);
      return;
    }

    // Trigger AI Generation
    setIsGenerating(true);
    setGenerationStep("⚡ Extracting career details via Groq AI Engine...");

    try {
      setTimeout(() => {
        setGenerationStep("✍️ Writing ATS-optimized action bullets & metrics...");
      }, 700);

      setTimeout(() => {
        setGenerationStep("🚀 Formatting education, skills & projects into standard B&W resume...");
      }, 1400);

      // Collect all chat text context
      const chatHistory = updatedMessages.map((m) => `${m.sender}: ${m.text}`).join("\n");
      const generatedResume = await apiService.generateResumeFromChat(chatHistory);

      if (generatedResume && (generatedResume.personalInfo || generatedResume.skills)) {
        // Only decrement quota for non-pro trial users (Uncodemy students are always unlimited)
        if (!isVerifiedStudent && !isProUser) {
          const remaining = decrementAiGeneration();
          if (setAiGenerationsLeft) {
            setAiGenerationsLeft(remaining);
          }
        }

        // Apply generated resume to form
        onApplyResume(generatedResume);

        // Confetti effect
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });

        const candName = generatedResume.personalInfo?.fullName || "Candidate";
        const jobTitle = generatedResume.personalInfo?.jobTitle || "Engineer";

        setMessages((prev) => [
          ...prev,
          {
            id: "ai-done-" + Date.now(),
            sender: "ai",
            isSuccess: true,
            resumeData: generatedResume,
            text: `🎉 Success! Your ATS Resume for "${candName}" has been auto-generated!\n\nReview the live preview and download your PDF below:`
          }
        ]);
      } else {
        throw new Error("Invalid resume payload received");
      }
    } catch (err) {
      console.error("AI Generation error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: "ai-err-" + Date.now(),
          sender: "ai",
          text: "A technical error occurred. Please try again or load a sample profile."
        }
      ]);
    } finally {
      setIsGenerating(false);
      setGenerationStep("");
    }
  };

  const handleQuickPrompt = (promptText) => {
    setInputVal(promptText);
    handleSendMessage(promptText);
  };

  return (
    <>
      {/* Floating Trigger Button in bottom-right in Uncodemy Orange */}
      {!isOpen && (
        <aside aria-label="AI Copilot assistant launcher" className="no-print fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center">
          <button
            type="button"
            onClick={onOpen}
            className="group relative flex items-center gap-2 sm:gap-3 p-3 sm:px-5 sm:py-3.5 rounded-full bg-[#ff5421] hover:bg-[#e04515] text-white font-black text-xs sm:text-sm shadow-xl shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-white/20 min-h-[44px]"
          >
            <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-white"></span>
            </span>

            <Bot className="w-5 h-5 text-white animate-bounce" />
            <span className="tracking-wide hidden sm:inline">AI Resume Copilot</span>
            <span className="tracking-wide sm:hidden font-bold">AI Copilot</span>

            <span className="bg-white text-[#ff5421] text-[9px] sm:text-[10px] uppercase font-black px-1.5 sm:px-2 py-0.5 rounded-full tracking-wider shadow-xs">
              {isVerifiedStudent ? "STUDENT FREE" : hasPaidSubscription ? "PAID PRO" : "FREE FOR UNCODEMY"}
            </span>
          </button>
        </aside>
      )}

      {/* Slide-in Drawer Modal */}
      {isOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          className="no-print fixed inset-0 z-[2000] flex items-end sm:items-center justify-end bg-slate-900/40 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in"
        >
          <div className="w-full sm:max-w-lg h-[92dvh] sm:h-[92vh] max-h-[840px] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-neutral-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom sm:slide-in-from-right duration-300">
            {/* Header in Uncodemy Orange */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-[#ff5421] via-orange-600 to-[#e04515] text-white flex items-center justify-between border-b border-orange-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white shadow-xs">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-base text-white">Uncodemy AI Resume Copilot</h3>
                    <span className="text-[10px] bg-white/20 text-white border border-white/30 px-2 py-0.5 rounded-full font-bold">
                      Groq AI Ultra-Fast
                    </span>
                  </div>
                  <div className="text-[11px] text-orange-100 flex items-center gap-2 mt-0.5">
                    {isVerifiedStudent ? (
                      <span className="text-emerald-200 font-bold flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5" /> Uncodemy Student (100% Free Unlimited)
                      </span>
                    ) : hasPaidSubscription ? (
                      <span className="text-amber-200 font-bold flex items-center gap-1">
                        <Crown className="w-3.5 h-3.5" /> Paid Pro Member (Unlimited)
                      </span>
                    ) : (
                      <span className="text-orange-200 font-semibold flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" /> 🔒 Locked • Free Only for Uncodemy Students
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
                title="Close Copilot"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Student Free Access / External Paid Access Banner */}
            {!hasAccess && (
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-200 px-4 py-3 flex flex-col gap-2 text-xs text-orange-950">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-slate-800">
                    <span className="w-2 h-2 rounded-full bg-[#ff5421] animate-ping" />
                    <span>AI Copilot Access Rules</span>
                  </div>
                  <span className="text-[10px] bg-[#ff5421] text-white px-2 py-0.5 rounded-full font-black">
                    FREE FOR STUDENTS
                  </span>
                </div>

                <p className="text-[11px] text-slate-600">
                  AI Resume Copilot is <strong>100% Free Only for Uncodemy Students</strong>. External users can access the AI Copilot with a Student Pro Pass (₹29).
                </p>

                <div className="flex items-center gap-2 pt-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenLoginModal) onOpenLoginModal();
                    }}
                    className="px-3 py-1.5 bg-[#ff5421] hover:bg-[#e04515] text-white font-black text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Free for Uncodemy (Verify)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenPricing();
                    }}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl flex items-center gap-1 cursor-pointer active:scale-95"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Upgrade to Pro (₹29)</span>
                  </button>
                </div>
              </div>
            )}

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-neutral-50/70 flex flex-col">
              {!hasAccess ? (
                <div className="p-4 sm:p-6 my-auto text-center space-y-4 max-w-md mx-auto animate-in fade-in">
                  <div className="w-16 h-16 rounded-3xl bg-orange-100 border-2 border-orange-200 flex items-center justify-center mx-auto text-[#ff5421] shadow-lg shadow-orange-500/15">
                    <Lock className="w-8 h-8" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-black text-lg text-slate-900">
                      AI Resume Copilot Restricted
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      AI Resume Copilot is <strong>100% Free Only for Uncodemy Students</strong>. Free access is not available for external users without a Student Pro Pass.
                    </p>
                  </div>

                  <div className="p-4 bg-white border border-slate-200 rounded-2xl text-xs text-left space-y-2.5 shadow-2xs">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <GraduationCap className="w-4 h-4 text-[#ff5421]" />
                      <span>Access Policy:</span>
                    </div>
                    <div className="space-y-2 text-slate-700 text-[11.5px]">
                      <div className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Uncodemy Students:</strong> 100% Free & Unlimited access with your registered student email.</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span><strong>External Users:</strong> Free access is not available. Unlock Student Pro Pass (₹29) to proceed.</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (onOpenLoginModal) onOpenLoginModal();
                      }}
                      className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 via-orange-500 to-[#ff5421] hover:opacity-95 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-orange-500/25 transition cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>Verify Uncodemy Student (Free)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenPricing();
                      }}
                      className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-4 h-4 text-[#ff5421]" />
                      <span>Not an Uncodemy Student? Get Pro Pass (₹29)</span>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`${m.resumeData ? "max-w-[95%] sm:max-w-[90%]" : "max-w-[85%]"} rounded-2xl p-4 text-xs leading-relaxed ${
                      m.sender === "user"
                        ? "bg-[#ff5421] text-white rounded-br-xs shadow-md shadow-orange-500/15"
                        : m.isLockedWarning
                        ? "bg-rose-50 text-rose-950 border border-rose-200 rounded-bl-xs"
                        : m.isSuccess
                        ? "bg-emerald-50 text-emerald-950 border border-emerald-300 rounded-bl-xs shadow-sm"
                        : "bg-white text-slate-800 border border-neutral-200 shadow-2xs rounded-bl-xs"
                    }`}
                  >
                    <div className="whitespace-pre-line font-medium">{m.text}</div>

                    {/* Quick Action Buttons for Uncodemy Student or Paid Pass */}
                    {m.isAccessRequired && (
                      <div className="mt-3 pt-3 border-t border-rose-200 flex flex-col sm:flex-row gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (onOpenLoginModal) onOpenLoginModal();
                          }}
                          className="px-3.5 py-2 bg-[#ff5421] hover:bg-[#e04515] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer"
                        >
                          <GraduationCap className="w-4 h-4" />
                          <span>Verify Uncodemy Student (100% Free)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onOpenPricing();
                          }}
                          className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
                        >
                          <CreditCard className="w-4 h-4 text-[#ff5421]" />
                          <span>Unlock Pro (₹29)</span>
                        </button>
                      </div>
                    )}

                    {/* Interactive In-Chat Resume Card */}
                    {m.resumeData && (
                      <div className="mt-3.5 pt-3 border-t border-emerald-300/80 space-y-3">
                        {/* Resume Paper Preview Box */}
                        <div className="bg-white rounded-xl border border-neutral-300 p-3.5 shadow-xs text-neutral-900 font-sans space-y-2.5">
                          {/* Header of Candidate */}
                          <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-neutral-200">
                            <div>
                              <div className="flex items-center gap-1.5 mb-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded border border-emerald-300">
                                  ATS Score: 96/100 • Recruiter Ready
                                </span>
                              </div>
                              <h4 className="font-black text-sm text-neutral-900">
                                {m.resumeData.personalInfo?.fullName || "Candidate"}
                              </h4>
                              <p className="text-[11px] font-bold text-[#ff5421]">
                                {m.resumeData.personalInfo?.jobTitle || "Software Engineer"}
                              </p>
                            </div>
                            <div className="text-right text-[10px] text-neutral-600 space-y-0.5">
                              <p className="font-bold text-neutral-800">{m.resumeData.personalInfo?.location || "India"}</p>
                              <p className="text-[9px] text-neutral-500 font-mono truncate max-w-[140px]">{m.resumeData.personalInfo?.email}</p>
                              <p className="text-[9px] text-neutral-500 font-mono">{m.resumeData.personalInfo?.phone}</p>
                            </div>
                          </div>

                          {/* Professional Summary */}
                          {m.resumeData.personalInfo?.summary && (
                            <div className="text-[10.5px] text-neutral-700 leading-relaxed bg-neutral-50 p-2.5 rounded-lg border border-neutral-200">
                              <span className="font-bold text-neutral-900 block text-[9.5px] uppercase tracking-wider mb-0.5 text-neutral-500">Summary:</span>
                              {m.resumeData.personalInfo.summary}
                            </div>
                          )}

                          {/* Technical Skills Preview */}
                          {m.resumeData.skills?.technical?.length > 0 && (
                            <div>
                              <span className="font-bold text-[9.5px] uppercase tracking-wider text-neutral-500 block mb-1">Technical Skills:</span>
                              <div className="flex flex-wrap gap-1">
                                {m.resumeData.skills.technical.slice(0, 8).map((skill, sIdx) => (
                                  <span key={sIdx} className="text-[9.5px] bg-neutral-100 text-neutral-800 font-semibold px-2 py-0.5 rounded border border-neutral-300">
                                    {skill}
                                  </span>
                                ))}
                                {m.resumeData.skills.technical.length > 8 && (
                                  <span className="text-[9.5px] text-neutral-500 font-medium self-center">
                                    +{m.resumeData.skills.technical.length - 8} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Projects Preview */}
                          {m.resumeData.projects?.length > 0 && (
                            <div className="text-[10.5px] text-neutral-700 border-t border-dashed border-neutral-200 pt-2">
                              <span className="font-bold text-[9.5px] uppercase tracking-wider text-neutral-500 block mb-1">Projects & Experience:</span>
                              {m.resumeData.projects.slice(0, 2).map((proj, pIdx) => (
                                <div key={pIdx} className="mb-1.5 last:mb-0">
                                  <span className="font-bold text-neutral-900">{proj.name}</span>
                                  {proj.techStack && <span className="text-[9.5px] text-[#ff5421] font-semibold ml-1.5">({proj.techStack})</span>}
                                  <p className="text-[10px] text-neutral-600 line-clamp-2 mt-0.5">{proj.description}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Education */}
                          {m.resumeData.education?.length > 0 && (
                            <div className="text-[10px] text-neutral-600 border-t border-neutral-200 pt-1.5 flex items-center justify-between">
                              <span className="font-semibold text-neutral-800">{m.resumeData.education[0]?.degree}</span>
                              <span className="text-neutral-500">{m.resumeData.education[0]?.year}</span>
                            </div>
                          )}
                        </div>

                        {/* Direct Action Buttons Right in Chat */}
                        <div className="flex flex-col gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              onApplyResume(m.resumeData);
                              if (onDownloadPdf) {
                                onDownloadPdf();
                              }
                            }}
                            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#ff5421] to-[#e04515] hover:from-[#e04515] hover:to-[#c2380d] text-white font-black text-xs shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 transition cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                          >
                            <Download className="w-4 h-4 text-white" />
                            <span>📥 Download PDF Resume (Direct)</span>
                          </button>

                          <div className="grid grid-cols-2 gap-2">
                            {onOpenEmailModal && (
                              <button
                                type="button"
                                onClick={() => {
                                  onApplyResume(m.resumeData);
                                  onOpenEmailModal();
                                }}
                                className="py-2 px-3 rounded-xl bg-white hover:bg-orange-50 text-[#ff5421] font-bold text-xs border border-orange-300 shadow-2xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                                title="Send directly to email"
                              >
                                <Mail className="w-3.5 h-3.5 text-[#ff5421]" />
                                <span>Send via Email</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => {
                                onApplyResume(m.resumeData);
                                onClose();
                              }}
                              className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer border border-slate-200"
                              title="Close chat and edit in form"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Open in Editor</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {m.isLockedWarning && (
                      <div className="mt-3 pt-3 border-t border-rose-200/80 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onOpenPricing();
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-[#ff5421] text-white font-bold hover:brightness-105 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Crown className="w-3.5 h-3.5 text-white" />
                          <span>Unlock Pro ₹29 (Uncodemy Offer)</span>
                        </button>
                        {onResetTrial && (
                          <button
                            type="button"
                            onClick={onResetTrial}
                            className="px-2.5 py-1.5 rounded-lg bg-white border border-rose-200 text-rose-700 hover:bg-rose-100 font-semibold text-[11px] cursor-pointer"
                          >
                            Reset Demo
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Generating Loader Step */}
              {isGenerating && (
                <div className="flex justify-start">
                  <div className="bg-orange-50 border border-orange-200 rounded-2xl rounded-bl-xs p-4 text-xs text-orange-950 space-y-2 max-w-[85%] animate-pulse">
                    <div className="flex items-center gap-2 font-bold text-[#ff5421]">
                      <Loader2 className="w-4 h-4 animate-spin text-[#ff5421]" />
                      <span>Generating Your ATS Resume...</span>
                    </div>
                    <div className="text-[11px] text-orange-900">{generationStep}</div>
                  </div>
                </div>
              )}

                  <div ref={chatBottomRef} />
                </>
              )}
            </div>

            {/* Quick Starter Suggestions */}
            {!isGenerating && hasAccess && messages.length <= 3 && (
              <div className="p-3 bg-white border-t border-slate-100">
                <div className="text-[11px] font-bold text-slate-500 mb-2 flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-[#ff5421]" />
                  <span>Quick Starter Profiles (Tap to auto-generate):</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {QUICK_PROMPTS.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={isGenerating}
                      onClick={() => handleQuickPrompt(q.text)}
                      className="p-2 text-left rounded-xl bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-300 transition text-[11px] font-semibold text-slate-700 hover:text-[#ff5421] cursor-pointer line-clamp-1 truncate"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Box Footer */}
            <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex flex-col gap-2">
              {!hasAccess ? (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
                  <div className="flex items-center gap-2 text-slate-800 font-bold">
                    <Lock className="w-4 h-4 text-[#ff5421] shrink-0" />
                    <span>AI Resume Copilot is 100% Free only for Uncodemy students.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenLoginModal) onOpenLoginModal();
                    }}
                    className="px-3.5 py-1.5 bg-[#ff5421] hover:bg-[#e04515] text-white font-extrabold rounded-xl shadow-xs shrink-0 cursor-pointer text-xs flex items-center gap-1"
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Verify Email (Free)</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-end gap-2">
                  <textarea
                    rows={2}
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Describe your profile: Name, Degree (e.g. B.Tech CS), Skills (Java, React, SQL), Projects..."
                    disabled={isGenerating}
                    className="flex-1 resize-none rounded-2xl border border-slate-300 p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5421] focus:border-[#ff5421] transition"
                  />

                  <button
                    type="button"
                    disabled={!inputVal.trim() || isGenerating}
                    onClick={() => handleSendMessage()}
                    className="h-11 px-4 rounded-2xl bg-[#ff5421] hover:bg-[#e04515] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20 transition cursor-pointer"
                  >
                    {isGenerating ? (
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-white" />
                        <span className="hidden sm:inline">Generate</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                <span>{hasAccess ? "Press Enter to send" : "Access Restricted"}</span>
                {isVerifiedStudent ? (
                  <span className="text-emerald-600 font-extrabold flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Uncodemy Student: 100% Free & Unlimited</span>
                  </span>
                ) : hasPaidSubscription ? (
                  <span className="text-amber-600 font-bold flex items-center gap-1">
                    <Crown className="w-3.5 h-3.5" />
                    <span>Paid Pro Member: Unlimited Generations</span>
                  </span>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        if (onOpenLoginModal) onOpenLoginModal();
                      }}
                      className="text-[#ff5421] font-bold hover:underline cursor-pointer"
                    >
                      Student Login (Free)
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenPricing();
                      }}
                      className="text-slate-700 font-bold hover:underline cursor-pointer"
                    >
                      Pro Pass ₹29
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
