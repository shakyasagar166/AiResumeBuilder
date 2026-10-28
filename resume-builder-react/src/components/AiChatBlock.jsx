import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Send,
  Sparkles,
  FileText,
  Copy,
  Check,
  RefreshCw,
  RotateCcw,
  Zap,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Code
} from "lucide-react";
import confetti from "canvas-confetti";
import { apiService } from "../services/apiService";

const SUGGESTED_PROMPTS = [
  {
    title: "⚡ Fresher Java Developer Resume",
    prompt: "I am a Fresher B.Tech graduate from Uncodemy skilled in Java, Spring Boot, React, MySQL, and REST APIs. Generate a complete 100% ATS-friendly resume."
  },
  {
    title: "⚡ Polish Experience Bullets",
    prompt: "Please rewrite my project bullet points with strong action verbs (Engineered, Architected, Optimized) and quantifiable business metrics for a Software Engineer role."
  },
  {
    title: "⚡ Full Stack React & Node Developer",
    prompt: "Generate a complete resume for a Full Stack React Developer with 2 years of experience building modern web apps, TypeScript, Tailwind CSS, and Node.js."
  },
  {
    title: "⚡ High-Impact Career Summary",
    prompt: "Write a high-impact, 3-line professional executive summary for an aspiring Full Stack Developer targeting top tech MNCs."
  }
];

export default function AiChatBlock({
  resumeData,
  onApplyResume,
  onSwitchToMaker,
  onSwitchToMatcher
}) {
  const [messages, setMessages] = useState([
    {
      id: "m-1",
      sender: "ai",
      text: "👋 Hello! I am your **AI Resume Copilot & Career Assistant**.\n\nTell me about your background — degree, technical skills, projects, or work experience — and I will generate a 100% ATS-compliant resume or polish your bullet points in seconds!\n\n*(100% Free & Unlimited)*"
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [lastGeneratedResume, setLastGeneratedResume] = useState(null);
  const [notice, setNotice] = useState("");

  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  // Send message to Groq AI
  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputVal).trim();
    if (!text || isGenerating) return;

    const userMsg = { id: "u-" + Date.now(), sender: "user", text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputVal("");

    setIsGenerating(true);
    setGenerationStep("⚡ Analyzing prompt with Groq High-Speed LLM...");

    try {
      setTimeout(() => {
        setGenerationStep("✍️ Crafting ATS-compliant bullet points & industry keywords...");
      }, 700);

      const chatHistory = updatedMessages.map((m) => `${m.sender}: ${m.text}`).join("\n");
      const generatedResume = await apiService.generateResumeFromChat(chatHistory);

      if (generatedResume && (generatedResume.personalInfo || generatedResume.skills)) {
        setLastGeneratedResume(generatedResume);
        const name = generatedResume.personalInfo?.fullName || "Candidate";
        const title = generatedResume.personalInfo?.jobTitle || "Engineer";

        setMessages((prev) => [
          ...prev,
          {
            id: "ai-" + Date.now(),
            sender: "ai",
            isResumePayload: true,
            resumeData: generatedResume,
            text: `🎉 **Successfully Generated ATS Resume for ${name} (${title})!**\n\n• **Candidate:** ${name}\n• **Target Role:** ${title}\n• **Skills Included:** ${(generatedResume.skills?.technical || []).slice(0, 8).join(", ")}\n• **Projects:** ${(generatedResume.projects || []).length} structured projects with metrics\n\n👉 Click **"⚡ Apply to Resume Maker (Block 1)"** below to instantly load this resume into your builder!`
          }
        ]);

        try {
          confetti({
            particleCount: 60,
            spread: 50,
            origin: { y: 0.7 }
          });
        } catch (e) {}
      } else {
        // Text explanation or polishing response
        const fallbackText = typeof generatedResume === "string" ? generatedResume : "I have analyzed your request. Please review the details or ask me to polish specific bullet points!";
        setMessages((prev) => [
          ...prev,
          {
            id: "ai-" + Date.now(),
            sender: "ai",
            text: fallbackText
          }
        ]);
      }
    } catch (err) {
      console.error("AI Generation Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: "ai-err-" + Date.now(),
          sender: "ai",
          text: "⚠️ Server communication error with AI engine. Please verify the backend connection and try again."
        }
      ]);
    } finally {
      setIsGenerating(false);
      setGenerationStep("");
    }
  };

  // Copy text to clipboard
  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // 1-Click apply to builder
  const handleApplyToBuilder = (resumeToApply) => {
    const target = resumeToApply || lastGeneratedResume;
    if (!target) return;
    if (onApplyResume) {
      onApplyResume(target);
      setNotice("✓ Successfully applied AI resume to Resume Maker (Block 1)!");
      setTimeout(() => setNotice(""), 3500);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-['Poppins','Rubik',sans-serif]">
      {/* Block Header Card */}
      <div className="bg-white rounded-3xl border border-neutral-200 p-5 sm:p-7 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff5421] to-purple-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/25 shrink-0">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                AI Resume Copilot & Career Assistant
              </h2>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-orange-100 text-[#ff5421] border border-orange-200">
                Block 3
              </span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                100% Free & Unlimited
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Generate entire resumes from scratch, rewrite bullet points with strong action verbs & numbers, or tailor your content for specific companies. 
            </p>
          </div>
        </div>

        {/* Cross-Block Quick Actions */}
        <div className="flex items-center gap-2 self-stretch md:self-auto">
          {onSwitchToMaker && (
            <button
              type="button"
              onClick={onSwitchToMaker}
              className="flex-1 md:flex-none min-h-[42px] px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
            >
              <FileText className="w-4 h-4 text-[#ff5421]" />
              <span>Resume Maker (Block 1) →</span>
            </button>
          )}
          {onSwitchToMatcher && (
            <button
              type="button"
              onClick={onSwitchToMatcher}
              className="flex-1 md:flex-none min-h-[42px] px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Zap className="w-4 h-4 text-blue-600" />
              <span>Job Matcher (Block 2) →</span>
            </button>
          )}
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

      {/* Main Studio Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Prompts & Quick Tools) - 4 cols */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl border border-neutral-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
              <Sparkles className="w-4 h-4 text-[#ff5421]" />
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                Quick AI Actions & Starters
              </h3>
            </div>

            <div className="space-y-2.5">
              {SUGGESTED_PROMPTS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(item.prompt)}
                  disabled={isGenerating}
                  className="w-full text-left p-3 rounded-2xl border border-slate-200 hover:border-[#ff5421] bg-slate-50/70 hover:bg-orange-50/50 transition cursor-pointer group active:scale-98"
                >
                  <span className="font-bold text-xs text-slate-900 group-hover:text-[#ff5421] block">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                    {item.prompt}
                  </span>
                </button>
              ))}
            </div>

            {/* If resume was generated, show prominent apply button */}
            {lastGeneratedResume && (
              <div className="pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => handleApplyToBuilder(lastGeneratedResume)}
                  className="w-full py-3 px-4 rounded-xl font-black text-xs text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md transition cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>⚡ Apply Last Generated Resume to Block 1</span>
                </button>
              </div>
            )}
          </div>

          {/* AI Features & Compliance Card */}
          <div className="bg-gradient-to-br from-slate-950 to-neutral-900 text-white rounded-3xl p-5 shadow-md space-y-3">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-orange-300 border border-white/20">
              Groq Powered
            </span>
            <h4 className="font-black text-sm text-white">
              Trained on 10,000+ Shortlisted Tech Resumes
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Every resume generated by this Copilot is strictly formatted for 1-page ATS screening (Taleo, Workday, Greenhouse). Zero tables, zero columns, zero parsing errors.
            </p>
          </div>
        </div>

        {/* Right Column (Chat Stream & Input Box) - 8 cols */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-neutral-200 shadow-sm flex flex-col h-[650px] overflow-hidden">
          {/* Chat Stream Header */}
          <div className="px-6 py-3.5 border-b border-neutral-100 bg-slate-50/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-800">
                Live Copilot Session (100% Free & Unlimited)
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setMessages([
                  {
                    id: "m-reset-" + Date.now(),
                    sender: "ai",
                    text: "Conversation cleared! What role or resume would you like me to create next?"
                  }
                ]);
                setLastGeneratedResume(null);
              }}
              className="text-[11px] font-bold text-slate-500 hover:text-rose-600 transition cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Chat</span>
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/40">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.sender === "ai" && (
                  <div className="w-8 h-8 rounded-xl bg-[#ff5421] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed relative group ${
                    m.sender === "user"
                      ? "bg-slate-900 text-white rounded-br-xs shadow-xs"
                      : "bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-xs"
                  }`}
                >
                  <div className="whitespace-pre-line">{m.text}</div>

                  {/* Actions for AI messages */}
                  {m.sender === "ai" && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopy(m.id, m.text)}
                        className="text-[10px] font-bold text-slate-500 hover:text-slate-800 transition cursor-pointer flex items-center gap-1"
                      >
                        {copiedId === m.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Text</span>
                          </>
                        )}
                      </button>

                      {/* If this message contains resume payload, show instant Apply button */}
                      {m.isResumePayload && m.resumeData && (
                        <button
                          type="button"
                          onClick={() => handleApplyToBuilder(m.resumeData)}
                          className="px-3 py-1.5 rounded-lg bg-[#ff5421] hover:bg-[#e04515] text-white font-black text-[11px] transition cursor-pointer flex items-center gap-1.5 shadow-xs active:scale-95"
                        >
                          <Zap className="w-3 h-3" />
                          <span>⚡ Apply to Resume Maker (Block 1)</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing / Generating Indicator */}
            {isGenerating && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-xl bg-[#ff5421] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <Bot className="w-4 h-4 animate-bounce" />
                </div>
                <div className="bg-white border border-orange-200 rounded-2xl rounded-bl-xs p-4 shadow-xs flex items-center gap-3">
                  <RefreshCw className="w-4 h-4 text-[#ff5421] animate-spin" />
                  <span className="text-xs font-bold text-slate-700">{generationStep}</span>
                </div>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Bottom Chat Input Bar */}
          <div className="p-4 bg-white border-t border-neutral-100">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask AI to generate your resume, write bullet points, or suggest skills..."
                disabled={isGenerating}
                className="flex-1 px-4 py-3 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#ff5421]/30 focus:border-[#ff5421] text-xs text-slate-900 bg-slate-50/60"
              />

              <button
                type="submit"
                disabled={!inputVal.trim() || isGenerating}
                className="min-h-[44px] px-5 py-3 rounded-2xl bg-[#ff5421] hover:bg-[#e04515] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-orange-500/20 active:scale-95 shrink-0"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
