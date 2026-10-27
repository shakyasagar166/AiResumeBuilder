import React, { useState, useRef } from "react";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  FileText,
  Search,
  Check,
  TrendingUp,
  Briefcase,
  Upload,
  FileUp,
  RotateCcw,
  Award,
  Target,
  FileCheck2,
  ChevronRight,
  Info,
  ListFilter
} from "lucide-react";
import confetti from "canvas-confetti";
import { calculateAtsScore, calculateAtsScoreFromText } from "../utils/atsScorer";
import { extractTextFromDocument } from "../utils/documentTextExtractor";

const SAMPLE_FRESHER_RESUME = `Rahul Sharma
Software Engineer Fresher | Java & Full Stack Developer
Noida, Uttar Pradesh, India | +91 9876543210 | rahul.sharma@example.com
LinkedIn: linkedin.com/in/rahulsharma-dev | GitHub: github.com/rahulsharma

SUMMARY
Enthusiastic and detail-oriented Computer Science graduate from Uncodemy with strong foundation in Java, Spring Boot, React, and MySQL. Passionate about building responsive web applications, writing clean RESTful APIs, and solving real-world engineering problems.

TECHNICAL SKILLS
• Programming Languages: Java, JavaScript, TypeScript, SQL, HTML5, CSS3, C++
• Frameworks & Libraries: Spring Boot, Hibernate, React, Node.js, Express.js
• Databases: MySQL, MongoDB, PostgreSQL, Redis
• Developer Tools: Git, GitHub, Docker, Postman, VS Code, Maven, Linux, AWS
• Core Competencies: Data Structures, Algorithms, OOP, REST APIs, Microservices

EDUCATION
Bachelor of Technology (B.Tech) in Computer Science & Engineering
APJ Abdul Kalam Technical University (AKTU) | 2020 - 2024
CGPA: 8.4 / 10.0

PROJECTS
1. E-Commerce Platform & Order Management System (React, Spring Boot, MySQL)
• Engineered a full-stack e-commerce web application with user authentication using JWT and role-based access control.
• Developed RESTful microservices handling product catalog, shopping cart, and Razorpay payment gateway integration.
• Optimized MySQL database queries, reducing API response times by 35% for 10,000+ daily requests.

2. Student Management & Placement Portal (React, Node.js, MongoDB)
• Built an end-to-end recruitment tracking dashboard for 500+ active students and placement officers.
• Implemented automated resume parsing and instant status notifications using WebSockets.
• Deployed microservices using Docker containers on AWS EC2 with 99.9% uptime.

INTERNSHIP / EXPERIENCE
Software Engineering Intern | TechSol Infotech, Noida
January 2024 - June 2024
• Developed and maintained 12+ REST API endpoints using Spring Boot and Hibernate ORM.
• Refactored legacy monolithic modules into lightweight microservices, increasing throughput by 25%.
• Automated unit test suites using JUnit and Mockito, raising overall test coverage from 55% to 88%.

ACHIEVEMENTS & CERTIFICATIONS
• Uncodemy Certified Full Stack Java Developer (2024)
• Solved 300+ Data Structures & Algorithm problems on LeetCode & HackerRank`;

const SAMPLE_EXPERIENCED_RESUME = `Priya Verma
Senior Full Stack Engineer
Bengaluru, Karnataka, India | +91 9123456789 | priya.verma@example.com
LinkedIn: linkedin.com/in/priyaverma-tech | GitHub: github.com/priyaverma

PROFESSIONAL SUMMARY
Results-driven Full Stack Engineer with 3+ years of experience architecting high-throughput microservices and responsive web applications. Proven track record in scaling enterprise applications, optimizing distributed systems, and leading agile development teams.

TECHNICAL SKILLS
• Languages: Java, Python, TypeScript, JavaScript, SQL
• Backend & Cloud: Spring Boot, Microservices, Hibernate, Docker, Kubernetes, AWS, Kafka, Redis
• Frontend: React, Next.js, Redux, Tailwind CSS, HTML5, CSS3
• Databases: PostgreSQL, MongoDB, MySQL, Redis
• DevOps & Tools: Git, CI/CD, Jenkins, Linux, Postman, Jira, Agile

EXPERIENCE
Full Stack Software Engineer | CloudScale Systems, Bengaluru
July 2022 - Present
• Architected scalable event-driven microservices using Spring Boot and Apache Kafka, processing 2M+ daily transactions.
• Optimized PostgreSQL query execution plans and implemented multi-tier Redis caching, reducing API latency by 45%.
• Spearheaded the migration of legacy frontend modules to React and Tailwind CSS, improving Core Web Vitals score to 96.
• Automated CI/CD deployment pipelines using Jenkins and Docker on AWS ECS, reducing release cycle time by 40%.

Associate Software Engineer | NexaTech Solutions, Pune
August 2020 - June 2022
• Developed 20+ secure RESTful endpoints for enterprise payroll management system using Java and Spring Boot.
• Refactored database schema and introduced indexing strategies, accelerating report generation speeds by 30%.
• Collaborated with cross-functional product teams in 2-week Agile sprints, consistently delivering on-time releases.

EDUCATION
Bachelor of Engineering (B.E.) in Information Technology
Pune University | 2016 - 2020 | CGPA: 8.8 / 10.0

KEY PROJECTS
• Distributed Real-time Analytics Dashboard (React, Spring Boot, Kafka, Redis)
• Scalable Multi-tenant SaaS Task Engine (Java, AWS Lambda, PostgreSQL, Docker)`;

export default function AtsCheckerModal({
  isOpen,
  onClose,
  resumeData,
  onOpenPreview,
  onOpenAiChat,
  onApplyResume
}) {
  const [activeTab, setActiveTab] = useState("upload"); // "upload" | "builder"
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [fileName, setFileName] = useState("");
  const [uploadNotice, setUploadNotice] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [checklistFilter, setChecklistFilter] = useState("all"); // "all" | "passed" | "action"
  const fileInputRef = useRef(null);

  // Tab 2: Builder Resume Score state
  const [builderJd, setBuilderJd] = useState("");
  const [builderJdResult, setBuilderJdResult] = useState(null);

  if (!isOpen) return null;

  // Builder Resume Score (Tab 2)
  const builderScoreData = calculateAtsScore(resumeData);

  const getScoreColor = (score) => {
    if (score >= 90) return { stroke: "#059669", text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-800" };
    if (score >= 75) return { stroke: "#0d9488", text: "text-teal-700", bg: "bg-teal-50", border: "border-teal-200", badge: "bg-teal-100 text-teal-800" };
    if (score >= 60) return { stroke: "#d97706", text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", badge: "bg-amber-100 text-amber-800" };
    return { stroke: "#e11d48", text: "text-rose-700", bg: "bg-rose-50", border: "border-rose-200", badge: "bg-rose-100 text-rose-800" };
  };

  // Handle Text/File ATS calculation
  const handleCalculateAts = () => {
    if (!resumeText.trim()) return;
    setIsScanning(true);

    setTimeout(() => {
      const res = calculateAtsScoreFromText(resumeText, jobDescription);
      setAnalysisResult(res);
      setIsScanning(false);

      if (res.score >= 80) {
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
      }
    }, 350);
  };

  // Handle File Upload with Universal High-Precision PDF.js & Mammoth.js Extractor
  const handleFileProcess = async (file) => {
    if (!file) return;
    setFileName(file.name);
    setUploadNotice("⏳ Extracting text with high-precision PDF.js engine...");

    try {
      const text = await extractTextFromDocument(file);
      if (text && text.trim().length > 20) {
        setResumeText(text);
        setUploadNotice(`✅ Successfully extracted text from ${file.name} (${text.split(/\s+/).length} words)! Click "Calculate ATS Score" below.`);
      } else {
        setUploadNotice(`ℹ️ File loaded. If your resume is an image scan, please copy & paste your resume text directly.`);
      }
    } catch (err) {
      console.warn("Document text extraction error:", err);
      setUploadNotice(`ℹ️ ${file.name} attached. Please paste resume text directly if it is a scanned image.`);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  // Import parsed data into the resume builder
  const handleImportToBuilder = () => {
    if (!analysisResult?.parsedData) return;
    if (onApplyResume) {
      onApplyResume(analysisResult.parsedData);
    }
    onClose();
    if (onOpenPreview) {
      onOpenPreview();
    }
  };

  // Tab 2 JD analysis
  const handleAnalyzeBuilderJd = () => {
    if (!builderJd.trim()) return;

    const commonTechKeywords = [
      "java", "spring boot", "react", "angular", "vue", "javascript", "typescript",
      "python", "node.js", "express", "sql", "mysql", "postgresql", "mongodb",
      "redis", "kafka", "docker", "kubernetes", "aws", "azure", "git", "rest", "restful",
      "microservices", "ci/cd", "jenkins", "html", "css", "tailwind", "junit", "hibernate"
    ];

    const jdLower = builderJd.toLowerCase();
    const resumeStr = JSON.stringify(resumeData).toLowerCase();

    const matched = [];
    const missing = [];

    commonTechKeywords.forEach((kw) => {
      if (jdLower.includes(kw)) {
        if (resumeStr.includes(kw)) {
          matched.push(kw.toUpperCase());
        } else {
          missing.push(kw.toUpperCase());
        }
      }
    });

    const matchScore = matched.length + missing.length > 0
      ? Math.round((matched.length / (matched.length + missing.length)) * 100)
      : builderScoreData.score;

    setBuilderJdResult({ matched, missing, matchScore });
  };

  const uploadColors = analysisResult ? getScoreColor(analysisResult.score) : getScoreColor(85);
  const builderColors = getScoreColor(builderScoreData.score);

  // Filtered Checklist
  const filteredChecklist = (analysisResult?.auditChecklist || []).filter((item) => {
    if (checklistFilter === "passed") return item.passed;
    if (checklistFilter === "action") return !item.passed;
    return true;
  });

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="no-print fixed inset-0 z-[2000] flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-2 sm:p-4 animate-in fade-in"
    >
      <div className="w-full max-w-3xl max-h-[94dvh] bg-white rounded-3xl shadow-2xl border border-neutral-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-neutral-900 to-slate-950 text-white flex items-center justify-between border-b border-neutral-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#ff5421] flex items-center justify-center text-white shadow-md shadow-orange-500/30 shrink-0">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-black text-sm sm:text-base text-white">
                  100% Free Resume ATS Checker & Analyzer
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-bold">
                  100% Free For Students
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Accurate screening compliance check against Taleo, Workday, Greenhouse & iCIMS
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
            title="Close ATS Checker"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dual Tab Navigation */}
        <div className="bg-slate-100/80 border-b border-neutral-200 px-4 sm:px-6 py-2 flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-2 ${
              activeTab === "upload"
                ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
            }`}
          >
            <FileUp className="w-4 h-4 text-[#ff5421]" />
            <span>Upload / Paste Resume (Free)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("builder")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-2 ${
              activeTab === "builder"
                ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
            }`}
          >
            <FileCheck2 className="w-4 h-4 text-emerald-600" />
            <span>Current Builder Resume Score ({builderScoreData.score}/100)</span>
          </button>
        </div>

        {/* Tab 1: Upload & Paste Student Resume */}
        {activeTab === "upload" && (
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 bg-slate-50/70">
            {/* Upload Area & Quick Controls */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-[#ff5421]" />
                    <span>Upload Resume Document or Paste Text</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Free evaluation with transparent 14-point audit. Upload file or paste text below:
                  </p>
                </div>

                {/* Preset Sample Loaders */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => {
                      setResumeText(SAMPLE_FRESHER_RESUME);
                      setFileName("Sample_Fresher_Resume.txt");
                      setUploadNotice("⚡ Loaded Sample Fresher Resume! Click 'Calculate ATS Score' below.");
                    }}
                    className="px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-[#ff5421] border border-orange-200 text-[10.5px] font-bold transition cursor-pointer flex items-center gap-1"
                  >
                    <span>⚡ Try Fresher</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setResumeText(SAMPLE_EXPERIENCED_RESUME);
                      setFileName("Sample_Experienced_Resume.txt");
                      setUploadNotice("⚡ Loaded Experienced Resume! Click 'Calculate ATS Score' below.");
                    }}
                    className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-[10.5px] font-bold transition cursor-pointer flex items-center gap-1"
                  >
                    <span>⚡ Try Experienced</span>
                  </button>

                  {resumeText && (
                    <button
                      type="button"
                      onClick={() => {
                        setResumeText("");
                        setFileName("");
                        setAnalysisResult(null);
                        setUploadNotice("");
                      }}
                      className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10.5px] font-bold transition cursor-pointer flex items-center gap-1"
                      title="Clear editor"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Clear</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Drag & Drop File Box */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-4 sm:p-5 text-center cursor-pointer transition ${
                  isDragging
                    ? "border-[#ff5421] bg-orange-50/60"
                    : "border-slate-300 hover:border-[#ff5421] hover:bg-orange-50/20 bg-slate-50/50"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.doc,.txt,.rtf,.md,.json"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileProcess(e.target.files[0]);
                    }
                  }}
                />
                <div className="flex flex-col items-center justify-center gap-1.5">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-[#ff5421] flex items-center justify-center shadow-xs">
                    <Upload className="w-5 h-5 text-[#ff5421]" />
                  </div>
                  <div className="text-xs font-bold text-slate-800">
                    {fileName ? (
                      <span className="text-[#ff5421] font-black">Attached: {fileName}</span>
                    ) : (
                      <span>Click to upload resume file or drag & drop</span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Supports PDF, DOCX, TXT, RTF, MD (All formats parsed automatically)
                  </div>
                </div>
              </div>

              {uploadNotice && (
                <div className="text-xs font-medium text-slate-700 bg-orange-50/80 border border-orange-200 rounded-xl p-2.5 flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#ff5421] shrink-0" />
                  <span>{uploadNotice}</span>
                </div>
              )}

              {/* Resume Textarea */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                  <span>Resume Text Content:</span>
                  <span>{resumeText.trim().length} characters • {resumeText.trim().split(/\s+/).filter(Boolean).length} words</span>
                </div>
                <textarea
                  rows={5}
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your raw resume text here (Name, contact details, skills, experience, education, projects)... or upload a file above!"
                  className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#ff5421] transition font-mono bg-white"
                />
              </div>

              {/* Optional Job Description Matcher */}
              <div className="pt-1">
                <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5 mb-1">
                  <Briefcase className="w-3.5 h-3.5 text-[#ff5421]" />
                  <span>Target Job Description (Optional - Compare keyword match percentage):</span>
                </label>
                <textarea
                  rows={2}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Optional: Paste job requirements from LinkedIn, Naukri, or campus drive (e.g. Java, Spring Boot, React, MySQL, AWS, Docker...)"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#ff5421] transition bg-white"
                />
              </div>

              {/* Main Action Button */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCalculateAts}
                  disabled={!resumeText.trim() || isScanning}
                  className="flex-1 py-3 px-5 rounded-xl bg-[#ff5421] hover:bg-[#e04515] disabled:opacity-40 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 transition cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                >
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>{isScanning ? "Evaluating against ATS Rules..." : "🎯 Calculate Free ATS Score"}</span>
                </button>
              </div>
            </div>

            {/* Analysis Results Display */}
            {analysisResult && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Main Score Banner */}
                <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5">
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                      <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-100"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          strokeDasharray={`${analysisResult.score}, 100`}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          stroke={uploadColors.stroke}
                          fill="none"
                          className="transition-all duration-700 ease-out"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className={`text-3xl font-black ${uploadColors.text}`}>{analysisResult.score}</span>
                        <span className="text-[10px] text-slate-400 -mt-1 font-bold">/100</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-wider text-slate-500">Overall ATS Score</span>
                        <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${uploadColors.badge} border ${uploadColors.border}`}>
                          GRADE {analysisResult.grade}
                        </span>
                      </div>
                      <h4 className="text-base font-extrabold text-slate-900 mt-1">
                        {analysisResult.status}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Candidate: <strong>{analysisResult.parsedData?.personalInfo?.fullName || "Student"}</strong> • {analysisResult.parsedData?.personalInfo?.jobTitle || "Software Engineer"}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium mt-1">
                        <span>{analysisResult.wordCount} words</span>
                        <span>•</span>
                        <span>{analysisResult.readingTimeMinutes} min read</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-semibold">100% Monochrome ATS Standard</span>
                      </div>
                    </div>
                  </div>

                  {/* 1-Click Builder Import CTA */}
                  <div className="w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleImportToBuilder}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition cursor-pointer hover:scale-105 active:scale-95"
                    >
                      <Sparkles className="w-4 h-4 text-white" />
                      <span>🚀 Import into 100% ATS Builder</span>
                    </button>
                    <p className="text-[10px] text-slate-400 text-center sm:text-right mt-1 font-medium">
                      Loads your details into Black & White ATS format
                    </p>
                  </div>
                </div>

                {/* 5-Category Breakdown Meters */}
                <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-3">
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#ff5421]" />
                    <span>5-Pillar ATS Breakdown Scores</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                    {/* 1. Contact & Socials */}
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                      <div className="flex items-center justify-between font-bold text-slate-800">
                        <span>1. Contact & Socials</span>
                        <span className="text-[#ff5421] font-black">
                          {analysisResult.categoryScores.contact.earned}/{analysisResult.categoryScores.contact.max}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-[#ff5421] h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${(analysisResult.categoryScores.contact.earned / analysisResult.categoryScores.contact.max) * 100}%` }}
                        />
                      </div>
                      <div className="text-[10.5px] text-slate-500">
                        Name, email, phone & LinkedIn/GitHub profile presence
                      </div>
                    </div>

                    {/* 2. Experience & Structure */}
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                      <div className="flex items-center justify-between font-bold text-slate-800">
                        <span>2. ATS Structure & Sections</span>
                        <span className="text-emerald-700 font-black">
                          {analysisResult.categoryScores.structure.earned}/{analysisResult.categoryScores.structure.max}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-600 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${(analysisResult.categoryScores.structure.earned / analysisResult.categoryScores.structure.max) * 100}%` }}
                        />
                      </div>
                      <div className="text-[10.5px] text-slate-500">
                        Experience/internship, projects & education headings
                      </div>
                    </div>

                    {/* 3. Technical Skills */}
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                      <div className="flex items-center justify-between font-bold text-slate-800">
                        <span>3. Technical Skills</span>
                        <span className="text-blue-700 font-black">
                          {analysisResult.categoryScores.skills.earned}/{analysisResult.categoryScores.skills.max}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${(analysisResult.categoryScores.skills.earned / analysisResult.categoryScores.skills.max) * 100}%` }}
                        />
                      </div>
                      <div className="text-[10.5px] text-slate-500">
                        {analysisResult.detectedSkills.length} tech keywords recognized by parser
                      </div>
                    </div>

                    {/* 4. Action Verbs & Metrics */}
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                      <div className="flex items-center justify-between font-bold text-slate-800">
                        <span>4. Impact & Metrics</span>
                        <span className="text-purple-700 font-black">
                          {analysisResult.categoryScores.impact.earned}/{analysisResult.categoryScores.impact.max}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-purple-600 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${(analysisResult.categoryScores.impact.earned / analysisResult.categoryScores.impact.max) * 100}%` }}
                        />
                      </div>
                      <div className="text-[10.5px] text-slate-500">
                        {analysisResult.detectedVerbs.length} action verbs & {analysisResult.detectedMetrics.length} metrics
                      </div>
                    </div>

                    {/* 5. Professionalism */}
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                      <div className="flex items-center justify-between font-bold text-slate-800">
                        <span>5. Professional Formatting</span>
                        <span className="text-amber-700 font-black">
                          {analysisResult.categoryScores.professionalism.earned}/{analysisResult.categoryScores.professionalism.max}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-amber-600 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${(analysisResult.categoryScores.professionalism.earned / analysisResult.categoryScores.professionalism.max) * 100}%` }}
                        />
                      </div>
                      <div className="text-[10.5px] text-slate-500">
                        Target role, summary statement & bullet points
                      </div>
                    </div>

                    {/* Quick Import Card */}
                    <div
                      onClick={handleImportToBuilder}
                      className="p-3.5 rounded-xl border border-emerald-300 bg-emerald-50/80 flex items-center justify-between cursor-pointer hover:bg-emerald-100/80 transition"
                    >
                      <div>
                        <div className="font-bold text-emerald-900 text-xs">Reach 100/100 Score</div>
                        <div className="text-[10.5px] text-emerald-700">Open in Black & White Studio</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-emerald-700" />
                    </div>
                  </div>
                </div>

                {/* 14-Point ATS Recruiter Audit Checklist */}
                {analysisResult.auditChecklist && analysisResult.auditChecklist.length > 0 && (
                  <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-2">
                        <ListFilter className="w-4 h-4 text-[#ff5421]" />
                        <span>ATS Recruiter 14-Point Screening Checklist</span>
                      </h4>

                      {/* Filter pills */}
                      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
                        <button
                          type="button"
                          onClick={() => setChecklistFilter("all")}
                          className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition cursor-pointer ${
                            checklistFilter === "all" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          All ({analysisResult.auditChecklist.length})
                        </button>
                        <button
                          type="button"
                          onClick={() => setChecklistFilter("passed")}
                          className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition cursor-pointer ${
                            checklistFilter === "passed" ? "bg-emerald-600 text-white shadow-2xs" : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          Passed ({analysisResult.auditChecklist.filter((c) => c.passed).length})
                        </button>
                        <button
                          type="button"
                          onClick={() => setChecklistFilter("action")}
                          className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition cursor-pointer ${
                            checklistFilter === "action" ? "bg-rose-600 text-white shadow-2xs" : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          Action Needed ({analysisResult.auditChecklist.filter((c) => !c.passed).length})
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {filteredChecklist.map((item) => (
                        <div
                          key={item.id}
                          className={`p-3 rounded-xl border flex items-start justify-between gap-2.5 transition ${
                            item.passed
                              ? "bg-slate-50/70 border-slate-200"
                              : "bg-rose-50/50 border-rose-200"
                          }`}
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            {item.passed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                            )}
                            <div className="min-w-0">
                              <div className={`font-bold ${item.passed ? "text-slate-800" : "text-rose-900"}`}>
                                {item.title}
                              </div>
                              <div className="text-[11px] text-slate-500 truncate" title={item.detail}>
                                {item.detail}
                              </div>
                            </div>
                          </div>

                          <span
                            className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0 ${
                              item.passed
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                : "bg-rose-100 text-rose-800 border border-rose-200"
                            }`}
                          >
                            {item.pointsEarned}/{item.maxPoints} pts
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detected Keywords Badges */}
                <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#ff5421]" />
                      <span>Detected Technical Skills ({analysisResult.detectedSkills.length})</span>
                    </h4>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
                      ATS Verified
                    </span>
                  </div>

                  {analysisResult.detectedSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {analysisResult.detectedSkills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[10.5px] font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1"
                        >
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-rose-600 font-semibold bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                      ⚠️ Zero recognized tech keywords detected. Add skills like Java, React, SQL, Spring Boot, Git to pass applicant tracking filters.
                    </div>
                  )}

                  {/* Detected Action Verbs & Metrics */}
                  <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[10.5px] font-bold text-slate-700 block mb-1">
                        Power Action Verbs Found ({analysisResult.detectedVerbs.length}):
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {analysisResult.detectedVerbs.length > 0 ? (
                          analysisResult.detectedVerbs.map((v, i) => (
                            <span key={i} className="text-[10px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded font-semibold border border-blue-200">
                              {v}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-slate-400">None detected. Add words like Engineered, Optimized, Delivered.</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10.5px] font-bold text-slate-700 block mb-1">
                        Quantifiable Numbers/Metrics Found ({analysisResult.detectedMetrics.length}):
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {analysisResult.detectedMetrics.length > 0 ? (
                          analysisResult.detectedMetrics.map((m, i) => (
                            <span key={i} className="text-[10px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded font-semibold border border-amber-200">
                              {m}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-slate-400">None detected. Add percentages like 30%, 500+ users.</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Optional JD Match Details */}
                {analysisResult.jdMatchDetails && (
                  <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-[#ff5421]" />
                        <span>Job Description Keyword Match Rate</span>
                      </span>
                      <span className="text-sm font-black text-[#ff5421]">
                        {analysisResult.jdMatchDetails.matchRate !== null
                          ? `${analysisResult.jdMatchDetails.matchRate}% Match`
                          : "Evaluating"}
                      </span>
                    </div>

                    {analysisResult.jdMatchDetails.matched.length > 0 && (
                      <div>
                        <span className="text-[10.5px] font-bold text-emerald-700 block mb-1">
                          ✅ Skills in Both Resume & Job Description ({analysisResult.jdMatchDetails.matched.length}):
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {analysisResult.jdMatchDetails.matched.map((kw, i) => (
                            <span key={i} className="text-[9.5px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {analysisResult.jdMatchDetails.missing.length > 0 && (
                      <div>
                        <span className="text-[10.5px] font-bold text-rose-700 block mb-1">
                          ⚠️ Skills in Job Description You Should Add to Your Resume ({analysisResult.jdMatchDetails.missing.length}):
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {analysisResult.jdMatchDetails.missing.map((kw, i) => (
                            <span key={i} className="text-[9.5px] bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded border border-rose-200">
                              + {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Suggestions & Strengths */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Actionable Tips */}
                  <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 space-y-2">
                    <div className="font-bold text-xs text-amber-900 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span>Tips to Reach 98+ ATS Score:</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-amber-950">
                      {analysisResult.suggestions.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                      {analysisResult.suggestions.length === 0 && (
                        <li className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Your resume is 100% ATS optimized!</span>
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Strengths */}
                  <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 space-y-2">
                    <div className="font-bold text-xs text-emerald-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Key Strengths of Your Resume:</span>
                    </div>
                    <ul className="space-y-1 text-xs text-emerald-950">
                      {analysisResult.strengths.slice(0, 6).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Current Resume Builder Score */}
        {activeTab === "builder" && (
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 bg-slate-50/70">
            {/* Main Score Banner */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                  <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      strokeDasharray={`${builderScoreData.score}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke={builderColors.stroke}
                      fill="none"
                      className="transition-all duration-700 ease-out"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className={`text-2xl font-black ${builderColors.text}`}>{builderScoreData.score}</span>
                    <span className="text-[9px] text-slate-400 -mt-1 font-bold">/100</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-500">Current Builder Resume Score</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${builderColors.bg} ${builderColors.text} border ${builderColors.border}`}>
                      {builderScoreData.score >= 85 ? "GRADE A+" : builderScoreData.score >= 65 ? "GRADE B" : "NEEDS WORK"}
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900 mt-0.5">
                    {builderScoreData.status}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Candidate: <strong>{resumeData.personalInfo?.fullName || "Not Specified"}</strong> • {resumeData.personalInfo?.jobTitle || "Software Engineer"}
                  </p>
                </div>
              </div>

              <div className="w-full sm:w-auto flex sm:flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onOpenPreview) onOpenPreview();
                  }}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#ff5421] hover:bg-[#e04515] text-white font-bold text-xs shadow-md shadow-orange-500/20 flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-white" />
                  <span>View Resume</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onOpenAiChat) onOpenAiChat();
                  }}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white hover:bg-orange-50 text-[#ff5421] border border-orange-200 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#ff5421]" />
                  <span>Boost Score with AI</span>
                </button>
              </div>
            </div>

            {/* 6-Point ATS Screening Breakdown Checklist */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-3">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#ff5421]" />
                <span>ATS 6-Point Screening Checklist</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start gap-2.5">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${resumeData.personalInfo?.fullName && resumeData.personalInfo?.email ? "text-emerald-600" : "text-amber-500"}`} />
                  <div>
                    <div className="font-bold text-slate-800">1. Contact & Identity</div>
                    <div className="text-[11px] text-slate-500">
                      {resumeData.personalInfo?.fullName ? `Name: ${resumeData.personalInfo.fullName}` : "Name missing"} • {resumeData.personalInfo?.location || "Location pending"}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start gap-2.5">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${resumeData.experience?.length > 0 || resumeData.projects?.length > 0 ? "text-emerald-600" : "text-amber-500"}`} />
                  <div>
                    <div className="font-bold text-slate-800">2. Work Experience & Projects</div>
                    <div className="text-[11px] text-slate-500">
                      {resumeData.experience?.length || 0} role(s) & {resumeData.projects?.length || 0} project(s) documented
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start gap-2.5">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${resumeData.skills?.technical?.length >= 5 ? "text-emerald-600" : "text-amber-500"}`} />
                  <div>
                    <div className="font-bold text-slate-800">3. Technical Skills</div>
                    <div className="text-[11px] text-slate-500">
                      {resumeData.skills?.technical?.length || 0} core skills ({resumeData.skills?.tools?.length || 0} developer tools)
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start gap-2.5">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${resumeData.projects?.length > 0 ? "text-emerald-600" : "text-amber-500"}`} />
                  <div>
                    <div className="font-bold text-slate-800">4. Key Projects</div>
                    <div className="text-[11px] text-slate-500">
                      {resumeData.projects?.length || 0} production/academic projects listed
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start gap-2.5">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${resumeData.education?.length > 0 ? "text-emerald-600" : "text-amber-500"}`} />
                  <div>
                    <div className="font-bold text-slate-800">5. Education & Degree</div>
                    <div className="text-[11px] text-slate-500">
                      {resumeData.education?.[0]?.degree || "Graduation details specified"}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                  <div>
                    <div className="font-bold text-slate-800">6. Recruiter Standard Format</div>
                    <div className="text-[11px] text-slate-500">
                      100% Monochrome Black & White (No graphics/tables)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Builder JD Matcher */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#ff5421]" />
                  <span>Job Description (JD) Matcher</span>
                </h4>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
                  Match With Any Job
                </span>
              </div>

              <div className="flex gap-2">
                <textarea
                  rows={2}
                  value={builderJd}
                  onChange={(e) => setBuilderJd(e.target.value)}
                  placeholder="Paste job description requirements to compare keyword match against your current builder resume..."
                  className="flex-1 p-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#ff5421] transition"
                />
                <button
                  type="button"
                  onClick={handleAnalyzeBuilderJd}
                  disabled={!builderJd.trim()}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Scan JD</span>
                </button>
              </div>

              {builderJdResult && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-800">Job Keyword Match Rate:</span>
                    <span className="font-black text-sm text-[#ff5421]">{builderJdResult.matchScore}% Match</span>
                  </div>

                  {builderJdResult.matched.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 block mb-1">
                        ✅ Matching Keywords ({builderJdResult.matched.length}):
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {builderJdResult.matched.map((kw, i) => (
                          <span key={i} className="text-[9.5px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded border border-emerald-200">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {builderJdResult.missing.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold text-rose-700 block mb-1">
                        ⚠️ Missing Keywords in Resume ({builderJdResult.missing.length}):
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {builderJdResult.missing.map((kw, i) => (
                          <span key={i} className="text-[9.5px] bg-rose-50 text-rose-700 font-semibold px-2 py-0.5 rounded border border-rose-200">
                            + {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Suggestions & Strengths */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-2">
                <div className="font-bold text-xs text-amber-900 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Tips to Reach 98+ ATS Score:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-amber-950">
                  {builderScoreData.suggestions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                  {builderScoreData.suggestions.length === 0 && (
                    <li className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Your resume is already 100% ATS optimized!</span>
                    </li>
                  )}
                </ul>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-2">
                <div className="font-bold text-xs text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Key Strengths of Your Resume:</span>
                </div>
                <ul className="space-y-1 text-xs text-emerald-950">
                  {builderScoreData.strengths.slice(0, 5).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 bg-white border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-bold text-slate-800">Uncodemy Placement Engine</span>
            <span>•</span>
            <span>100% Free Resume Analysis for All Students</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              Close
            </button>

            {analysisResult?.parsedData && activeTab === "upload" && (
              <button
                type="button"
                onClick={handleImportToBuilder}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/25 flex items-center gap-1.5 transition cursor-pointer"
              >
                <span>Import & Fix in Builder</span>
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                onClose();
                if (onOpenPreview) onOpenPreview();
              }}
              className="px-5 py-2.5 rounded-xl bg-[#ff5421] hover:bg-[#e04515] text-white font-bold text-xs shadow-md shadow-orange-500/25 flex items-center gap-1.5 transition cursor-pointer"
            >
              <span>View ATS Black & White Resume</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
