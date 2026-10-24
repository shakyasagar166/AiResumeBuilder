import React, { useState } from "react";
import { Plus, Trash2, Sparkles, Building, Calendar, MapPin } from "lucide-react";
import { apiService } from "../../services/apiService";

export default function ExperienceForm({ experiences, onChange }) {
  const [loadingAiIdx, setLoadingAiIdx] = useState(null);

  const handleAdd = () => {
    const newExp = {
      id: "exp-" + Date.now(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "• Spearheaded ...\n• Developed ...\n• Improved ..."
    };
    onChange([...experiences, newExp]);
  };

  const handleRemove = (id) => {
    onChange(experiences.filter((exp) => exp.id !== id));
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    onChange(updated);
  };

  const handleAiSuggest = async (index) => {
    setLoadingAiIdx(index);
    try {
      const suggested = await apiService.polishBulletWithAI("", "software");
      const currentDesc = experiences[index].description || "";
      const updatedDesc = currentDesc ? `${currentDesc}\n• ${suggested}` : `• ${suggested}`;
      handleItemChange(index, "description", updatedDesc);
    } finally {
      setLoadingAiIdx(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Work Experience & Internships</h3>
          <p className="text-xs text-slate-500">List full-time roles, internships, or freelance experience.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#ff5421] hover:bg-[#e04515] text-white rounded-xl text-xs font-bold shadow-sm shadow-orange-500/20 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Experience
        </button>
      </div>

      {experiences.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50">
          <p className="text-xs text-slate-500 font-medium">No work experience added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-3 text-xs text-indigo-600 hover:underline font-bold"
          >
            + Click here to add your first position
          </button>
        </div>
      )}

      {experiences.map((exp, index) => (
        <div
          key={exp.id || index}
          className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3.5 relative"
        >
          <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">
              Position #{index + 1}
            </span>
            <button
              type="button"
              onClick={() => handleRemove(exp.id)}
              className="text-slate-400 hover:text-rose-600 transition cursor-pointer p-1"
              title="Delete this role"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Job Title</label>
              <input
                type="text"
                value={exp.title || ""}
                onChange={(e) => handleItemChange(index, "title", e.target.value)}
                placeholder="Software Engineer / Web Dev Intern"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Company / Organization</label>
              <div className="relative">
                <Building className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={exp.company || ""}
                  onChange={(e) => handleItemChange(index, "company", e.target.value)}
                  placeholder="Company Name"
                  className="w-full bg-white border border-slate-300 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Start Date</label>
              <div className="relative">
                <Calendar className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={exp.startDate || ""}
                  onChange={(e) => handleItemChange(index, "startDate", e.target.value)}
                  placeholder="Jan 2023"
                  className="w-full bg-white border border-slate-300 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">End Date</label>
              <input
                type="text"
                disabled={exp.current}
                value={exp.current ? "Present" : exp.endDate || ""}
                onChange={(e) => handleItemChange(index, "endDate", e.target.value)}
                placeholder="Present / Dec 2024"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={exp.location || ""}
                  onChange={(e) => handleItemChange(index, "location", e.target.value)}
                  placeholder="Bengaluru / Remote"
                  className="w-full bg-white border border-slate-300 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`curr-${index}`}
              checked={exp.current || false}
              onChange={(e) => handleItemChange(index, "current", e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
            <label htmlFor={`curr-${index}`} className="text-xs font-semibold text-slate-700 cursor-pointer">
              I currently work here
            </label>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">
                Key Accomplishments & Bullet Points
              </label>
              <button
                type="button"
                onClick={() => handleAiSuggest(index)}
                disabled={loadingAiIdx === index}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#ff5421] hover:text-[#e04515] cursor-pointer transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                {loadingAiIdx === index ? "Generating..." : "+ AI Suggest Metric Bullet"}
              </button>
            </div>
            <textarea
              rows={4}
              value={exp.description || ""}
              onChange={(e) => handleItemChange(index, "description", e.target.value)}
              placeholder="• Architected RESTful microservices reducing latency by 35%&#10;• Led cross-functional team of 4 engineers..."
              className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 font-mono leading-relaxed"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
