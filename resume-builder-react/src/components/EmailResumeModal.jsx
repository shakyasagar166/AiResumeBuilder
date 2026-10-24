import React, { useState } from "react";
import {
  Mail,
  X,
  CheckCircle2,
  Loader2,
  Sparkles,
  Send,
  FileCheck,
  ShieldCheck,
  ExternalLink,
  Crown
} from "lucide-react";
import confetti from "canvas-confetti";
import { apiService } from "../services/apiService";

export default function EmailResumeModal({
  isOpen,
  onClose,
  resumeData,
  selectedTemplate,
  atsScore = 92,
  isProUser,
  onOpenPricing
}) {
  const [recipientEmail, setRecipientEmail] = useState(
    resumeData.personalInfo?.email || ""
  );
  const [recipientName, setRecipientName] = useState(
    resumeData.personalInfo?.fullName || ""
  );
  const [subject, setSubject] = useState(
    `${resumeData.personalInfo?.fullName || "Candidate"} - ${resumeData.personalInfo?.jobTitle || "Resume"} (ATS Score: ${atsScore}%)`
  );
  const [includePdf, setIncludePdf] = useState(true);
  const [includeAtsReport, setIncludeAtsReport] = useState(true);

  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState("");
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!recipientEmail || !recipientEmail.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setErrorMsg("");
    setIsSending(true);
    setSendStatus("📄 Preparing ATS resume data & PDF structure...");

    try {
      setTimeout(() => {
        setSendStatus("📧 Dispatching via Spring Boot Mail Service...");
      }, 700);

      // Attempt to convert resume container to PDF base64 if element is available
      let pdfBase64 = null;
      try {
        const resumeEl = document.getElementById("resume-print-area");
        if (resumeEl && window.jspdf && window.html2canvas) {
          const canvas = await window.html2canvas(resumeEl, { scale: 1.5 });
          const imgData = canvas.toDataURL("image/png");
          const { jsPDF } = window.jspdf;
          const pdf = new jsPDF("p", "mm", "a4");
          const imgWidth = 210;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
          pdfBase64 = pdf.output("datauristring");
        }
      } catch (pdfErr) {
        console.warn("Client PDF generation fallback", pdfErr);
      }

      const payload = {
        recipientEmail: recipientEmail.trim(),
        recipientName: recipientName.trim(),
        subject: subject.trim(),
        templateId: selectedTemplate,
        atsScore,
        pdfBase64,
        resumeData
      };

      const response = await apiService.sendResumeEmail(payload);

      setResult(response);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error("Email send error", err);
      setErrorMsg("Error sending email. Please try again.");
    } finally {
      setIsSending(false);
      setSendStatus("");
    }
  };

  const handleMailtoFallback = () => {
    const bodyText = `Hello,\n\nPlease find attached the ATS-optimized resume for ${recipientName}.\nJob Title: ${resumeData.personalInfo?.jobTitle || "Professional"}\nATS Score: ${atsScore}/100\n\nGenerated with ResumeCraft Pro.`;
    const mailtoUrl = `mailto:${encodeURIComponent(recipientEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    window.open(mailtoUrl, "_blank");
  };

  const handleResetForm = () => {
    setResult(null);
    setErrorMsg("");
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="no-print fixed inset-0 z-[2000] flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in"
    >
      <div className="w-full max-w-lg max-h-[92dvh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header in Uncodemy Orange */}
        <div className="bg-gradient-to-r from-[#ff5421] via-orange-600 to-[#e04515] p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-xs">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg text-white">Send Resume to Email</h3>
                <span className="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Direct Inbox
                </span>
              </div>
              <p className="text-xs text-orange-100 mt-0.5">
                Your 100% ATS Resume will be delivered directly to your email inbox.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex-1 overflow-y-auto">
          {result ? (
            /* Success State */
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h4 className="text-xl font-black text-slate-900">
                  🎉 Resume Sent Successfully!
                </h4>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                  Your resume has been sent to <strong className="text-slate-900">{result.recipientEmail}</strong>.
                </p>
              </div>

              {/* Delivery Receipt Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2 max-w-sm mx-auto">
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Status:</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {result.deliveryStatus || "DELIVERED"}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tracking ID:</span>
                  <span className="font-mono font-bold text-slate-800">{result.trackingId}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Template Attached:</span>
                  <span className="font-medium text-slate-800 uppercase">{selectedTemplate}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>ATS Score:</span>
                  <span className="font-bold text-indigo-600">{atsScore}/100</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500">
                💡 Tip: If you don't see the email within 1-2 minutes, please check your Spam or Promotions folder.
              </p>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition cursor-pointer"
                >
                  Done
                </button>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer"
                >
                  Send to Another Email
                </button>
              </div>
            </div>
          ) : (
            /* Input Form */
            <form onSubmit={handleSendEmail} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Recipient Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="student@gmail.com ya recruiter@company.com"
                    className="w-full rounded-xl border border-slate-300 py-2.5 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Candidate Full Name
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Rahul Sharma"
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Selected Template
                  </label>
                  <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 truncate capitalize">
                    {selectedTemplate.replace("-", " ")}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Subject Line
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition"
                />
              </div>

              {/* Options */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includePdf}
                    onChange={(e) => setIncludePdf(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                  />
                  <span className="font-medium">Attach High-Resolution PDF document</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeAtsReport}
                    onChange={(e) => setIncludeAtsReport(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                  />
                  <span className="font-medium">Include ATS Score badge ({atsScore}/100) & keyword tips</span>
                </label>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#ff5421] hover:bg-[#e04515] disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{sendStatus || "Sending Email..."}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Resume to Email</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleMailtoFallback}
                  className="w-full sm:w-auto py-3 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Open in your default email client (Gmail/Outlook)"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Email App</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
