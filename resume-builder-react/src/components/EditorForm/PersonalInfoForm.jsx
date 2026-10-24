import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Globe, Sparkles, Image, Check } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "../Icons";
import { apiService } from "../../services/apiService";

export default function PersonalInfoForm({ data, onChange }) {
  const [isPolishing, setIsPolishing] = useState(false);
  const [aiSuccess, setAiSuccess] = useState(false);

  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const handlePolishSummary = async () => {
    setIsPolishing(true);
    try {
      const enhanced = await apiService.polishBulletWithAI(data.summary, "summary");
      handleChange("summary", enhanced);
      setAiSuccess(true);
      setTimeout(() => setAiSuccess(false), 2500);
    } finally {
      setIsPolishing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={data.fullName || ""}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-50 shadow-2xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Target Job Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={data.jobTitle || ""}
            onChange={(e) => handleChange("jobTitle", e.target.value)}
            placeholder="e.g. Java Full Stack Developer"
            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-50 shadow-2xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="email"
              value={data.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="rahul.sharma@example.com"
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-50 shadow-2xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="tel"
              value={data.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-50 shadow-2xs"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Location (City, Country)
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={data.location || ""}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="Bengaluru, Karnataka, India"
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-50 shadow-2xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Profile Photo URL (Optional)
          </label>
          <div className="relative">
            <Image className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="url"
              value={data.photoUrl || ""}
              onChange={(e) => handleChange("photoUrl", e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-50 shadow-2xs"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">LinkedIn Profile</label>
          <div className="relative">
            <LinkedinIcon className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={data.linkedin || ""}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              placeholder="linkedin.com/in/username"
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">GitHub / Code</label>
          <div className="relative">
            <GithubIcon className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={data.github || ""}
              onChange={(e) => handleChange("github", e.target.value)}
              placeholder="github.com/username"
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Portfolio / Website</label>
          <div className="relative">
            <Globe className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={data.portfolio || ""}
              onChange={(e) => handleChange("portfolio", e.target.value)}
              placeholder="yourportfolio.dev"
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* Summary with AI Polish */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-bold text-slate-700">
            Professional Summary (ATS High Impact)
          </label>
          <button
            type="button"
            onClick={handlePolishSummary}
            disabled={isPolishing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-orange-50 hover:bg-orange-100 text-[#ff5421] border border-orange-200 shadow-2xs transition disabled:opacity-60 cursor-pointer"
          >
            {isPolishing ? (
              <span className="animate-spin inline-block">⚡</span>
            ) : aiSuccess ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            )}
            {isPolishing ? "AI Polishing..." : aiSuccess ? "Optimized!" : "AI Summary Booster"}
          </button>
        </div>
        <textarea
          rows={4}
          value={data.summary || ""}
          onChange={(e) => handleChange("summary", e.target.value)}
          placeholder="Brief summary of your background, technical skills, and career achievements..."
          className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 leading-relaxed shadow-2xs"
        />
        <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1">
          <span>Tip: Mention 2-3 key technical specializations and metrics.</span>
          <span className="font-medium">{data.summary ? data.summary.length : 0} characters</span>
        </div>
      </div>
    </div>
  );
}
