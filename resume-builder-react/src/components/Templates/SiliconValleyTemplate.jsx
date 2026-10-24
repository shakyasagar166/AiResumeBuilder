import React from "react";
import { Mail, Phone, MapPin, Globe, ExternalLink, Calendar, Code2, Sparkles } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "../Icons";

export default function SiliconValleyTemplate({ data, accentColor, fontClass }) {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div
      className={`resume-sheet w-full bg-white text-slate-800 p-8 sm:p-10 shadow-2xl rounded-xl transition-all duration-300 ${fontClass}`}
      style={{ minHeight: "1050px" }}
    >
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-5 border-b-2" style={{ borderColor: `${accentColor.primary}44` }}>
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white mb-1.5" style={{ backgroundColor: accentColor.primary }}>
            <Sparkles className="w-3 h-3" /> Tech Candidate
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {personalInfo.fullName || "Your Full Name"}
          </h1>
          <p className="text-base font-semibold mt-0.5" style={{ color: accentColor.primary }}>
            {personalInfo.jobTitle || "Software Engineer"}
          </p>
        </div>

        {/* Contact Badges */}
        <div className="flex flex-col sm:items-end gap-1 text-xs text-slate-600">
          {personalInfo.email && <span className="flex items-center gap-1.5 font-medium"><Mail className="w-3.5 h-3.5" />{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{personalInfo.location}</span>}
          <div className="flex items-center gap-3 mt-1">
            {personalInfo.linkedin && <span className="flex items-center gap-1 text-slate-700 font-semibold"><LinkedinIcon className="w-3.5 h-3.5 text-indigo-600" />{personalInfo.linkedin}</span>}
            {personalInfo.github && <span className="flex items-center gap-1 text-slate-700 font-semibold"><GithubIcon className="w-3.5 h-3.5 text-slate-800" />{personalInfo.github}</span>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Skills Badges */}
      {skills && (
        <section className="mt-5">
          <h2 className="text-xs uppercase font-extrabold tracking-wider mb-2" style={{ color: accentColor.primary }}>
            Core Tech Stack & Tools
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {(skills.technical || []).map((skill, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs font-bold text-slate-800 border"
                style={{ backgroundColor: accentColor.bgLight, borderColor: `${accentColor.primary}44` }}
              >
                {skill}
              </span>
            ))}
            {(skills.tools || []).map((tool, idx) => (
              <span
                key={`t-${idx}`}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xs uppercase font-extrabold tracking-wider mb-3" style={{ color: accentColor.primary }}>
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">
                    {exp.title} <span className="text-slate-500 font-semibold">@ {exp.company}</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-500">
                    {exp.startDate} {exp.endDate ? `– ${exp.endDate}` : exp.current ? "– Present" : ""}
                  </div>
                </div>
                <div className="text-xs text-slate-700 mt-1.5 whitespace-pre-line leading-relaxed">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xs uppercase font-extrabold tracking-wider mb-3" style={{ color: accentColor.primary }}>
            Shipped Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {projects.map((proj) => (
              <div key={proj.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">{proj.name}</span>
                    {proj.link && <ExternalLink className="w-3.5 h-3.5 text-slate-400" />}
                  </div>
                  {proj.techStack && (
                    <span className="inline-block mt-0.5 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                      {proj.techStack}
                    </span>
                  )}
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{proj.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mt-5 pt-3 border-t border-slate-200">
          <h2 className="text-xs uppercase font-extrabold tracking-wider mb-2" style={{ color: accentColor.primary }}>
            Education & Placement Track
          </h2>
          <div className="flex flex-wrap gap-4 text-xs">
            {education.map((edu) => (
              <div key={edu.id}>
                <span className="font-bold text-slate-900">{edu.degree}</span>
                <span className="text-slate-500">, {edu.institution} ({edu.year}) {edu.grade ? `• ${edu.grade}` : ""}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
