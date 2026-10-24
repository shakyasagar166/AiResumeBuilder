import React, { useState } from "react";
import { Plus, X, Sparkles, Tag } from "lucide-react";

const SUGGESTED_SKILLS = [
  "Java", "Spring Boot", "React.js", "JavaScript", "TypeScript",
  "Node.js", "Python", "SQL", "PostgreSQL", "MongoDB",
  "Docker", "AWS", "Git", "REST APIs", "Microservices",
  "Tailwind CSS", "Redux", "Data Structures"
];

export default function SkillsForm({ skills, onChange }) {
  const [techInput, setTechInput] = useState("");
  const [toolInput, setToolInput] = useState("");
  const [softInput, setSoftInput] = useState("");

  const technical = skills.technical || [];
  const tools = skills.tools || [];
  const softSkills = skills.softSkills || [];

  const addTechSkill = (skill) => {
    const trimmed = skill.trim();
    if (trimmed && !technical.includes(trimmed)) {
      onChange({
        ...skills,
        technical: [...technical, trimmed]
      });
      setTechInput("");
    }
  };

  const removeTechSkill = (index) => {
    onChange({
      ...skills,
      technical: technical.filter((_, i) => i !== index)
    });
  };

  const addTool = (tool) => {
    const trimmed = tool.trim();
    if (trimmed && !tools.includes(trimmed)) {
      onChange({
        ...skills,
        tools: [...tools, trimmed]
      });
      setToolInput("");
    }
  };

  const removeTool = (index) => {
    onChange({
      ...skills,
      tools: tools.filter((_, i) => i !== index)
    });
  };

  const addSoftSkill = (soft) => {
    const trimmed = soft.trim();
    if (trimmed && !softSkills.includes(trimmed)) {
      onChange({
        ...skills,
        softSkills: [...softSkills, trimmed]
      });
      setSoftInput("");
    }
  };

  const removeSoftSkill = (index) => {
    onChange({
      ...skills,
      softSkills: softSkills.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      {/* Quick Add Trending ATS Skills */}
      <div className="p-4 bg-orange-50/70 rounded-2xl border border-orange-200">
        <div className="flex items-center gap-1.5 text-xs font-bold text-orange-950 mb-2.5">
          <Sparkles className="w-4 h-4 text-[#ff5421]" />
          <span>Quick 1-Click Trending ATS Keywords:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_SKILLS.map((item) => {
            const alreadyHas = technical.includes(item);
            return (
              <button
                key={item}
                type="button"
                disabled={alreadyHas}
                onClick={() => addTechSkill(item)}
                className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                  alreadyHas
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-white hover:bg-orange-100 text-[#ff5421] border border-orange-200 shadow-2xs"
                }`}
              >
                + {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* Technical Skills */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-[#ff5421]" />
            Technical Skills & Programming Languages
          </label>
          <span className="text-[11px] text-slate-500 font-semibold">{technical.length} skills listed</span>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTechSkill(techInput);
              }
            }}
            placeholder="Type skill & press Enter (e.g. Next.js, C++, Microservices)"
            className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#ff5421]"
          />
          <button
            type="button"
            onClick={() => addTechSkill(techInput)}
            className="px-4 py-2 bg-[#ff5421] hover:bg-[#e04515] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {technical.map((skill, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-800 shadow-2xs"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeTechSkill(idx)}
                className="hover:text-rose-600 text-indigo-400 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Tools & Frameworks */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3.5">
        <label className="text-xs font-bold text-slate-800 block">
          Tools, Databases & Platforms
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={toolInput}
            onChange={(e) => setToolInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTool(toolInput);
              }
            }}
            placeholder="e.g. VS Code, Postman, Docker, IntelliJ, Jira"
            className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
          />
          <button
            type="button"
            onClick={() => addTool(toolInput)}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {tools.map((tool, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 border border-slate-300 text-slate-700 shadow-2xs"
            >
              {tool}
              <button
                type="button"
                onClick={() => removeTool(idx)}
                className="hover:text-rose-600 text-slate-400 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3.5">
        <label className="text-xs font-bold text-slate-800 block">
          Soft Skills & Interpersonal Competencies
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={softInput}
            onChange={(e) => setSoftInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSoftSkill(softInput);
              }
            }}
            placeholder="e.g. System Design, Team Leadership, Problem Solving"
            className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
          />
          <button
            type="button"
            onClick={() => addSoftSkill(softInput)}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {softSkills.map((soft, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 border border-slate-300 text-slate-700 shadow-2xs"
            >
              {soft}
              <button
                type="button"
                onClick={() => removeSoftSkill(idx)}
                className="hover:text-rose-600 text-slate-400 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
