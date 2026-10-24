import React from "react";
import { Plus, Trash2, GraduationCap, School } from "lucide-react";

export default function EducationForm({ education, onChange }) {
  const handleAdd = () => {
    const newEdu = {
      id: "edu-" + Date.now(),
      degree: "",
      institution: "",
      location: "",
      year: "",
      grade: ""
    };
    onChange([...education, newEdu]);
  };

  const handleRemove = (id) => {
    onChange(education.filter((edu) => edu.id !== id));
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...education];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Education & Qualifications</h3>
          <p className="text-xs text-slate-500">Add degree, diploma, college/university, and scores.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#ff5421] hover:bg-[#e04515] text-white rounded-xl text-xs font-bold shadow-sm shadow-orange-500/20 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Education
        </button>
      </div>

      {education.length === 0 && (
        <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50">
          <p className="text-xs text-slate-500 font-medium">No education entries added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-2 text-xs text-[#ff5421] hover:underline font-bold"
          >
            + Add degree or college
          </button>
        </div>
      )}

      {education.map((edu, index) => (
        <div key={edu.id || index} className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3.5">
          <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">
              Degree #{index + 1}
            </span>
            <button
              type="button"
              onClick={() => handleRemove(edu.id)}
              className="text-slate-400 hover:text-rose-600 transition cursor-pointer p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Degree / Course</label>
              <div className="relative">
                <GraduationCap className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={edu.degree || ""}
                  onChange={(e) => handleItemChange(index, "degree", e.target.value)}
                  placeholder="B.Tech in Computer Science"
                  className="w-full bg-white border border-slate-300 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">College / University</label>
              <div className="relative">
                <School className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={edu.institution || ""}
                  onChange={(e) => handleItemChange(index, "institution", e.target.value)}
                  placeholder="e.g. NIT / Delhi University"
                  className="w-full bg-white border border-slate-300 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Year / Duration</label>
              <input
                type="text"
                value={edu.year || ""}
                onChange={(e) => handleItemChange(index, "year", e.target.value)}
                placeholder="2020 - 2024"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Score / CGPA / %</label>
              <input
                type="text"
                value={edu.grade || ""}
                onChange={(e) => handleItemChange(index, "grade", e.target.value)}
                placeholder="8.9 CGPA / 85%"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
              <input
                type="text"
                value={edu.location || ""}
                onChange={(e) => handleItemChange(index, "location", e.target.value)}
                placeholder="New Delhi, India"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
