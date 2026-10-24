import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "../Icons";

export default function MinimalistNordicTemplate({ data, accentColor, fontClass }) {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div
      className={`resume-sheet w-full bg-white text-slate-800 p-8 sm:p-12 shadow-2xl rounded-xl transition-all duration-300 ${fontClass}`}
      style={{ minHeight: "1050px" }}
    >
      {/* Nordic Minimalist Header */}
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-3xl sm:text-4xl font-light tracking-wide text-slate-900 uppercase">
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        <p className="text-sm font-semibold tracking-wider mt-1 uppercase text-slate-500">
          {personalInfo.jobTitle || "Professional Title"}
        </p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-3 text-xs text-slate-500 font-mono">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>• {personalInfo.github}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mt-5">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-3">
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-xs sm:text-sm text-slate-900">
                    {exp.title} — <span className="font-medium text-slate-600">{exp.company}</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {exp.startDate} {exp.endDate ? `– ${exp.endDate}` : exp.current ? "– Present" : ""}
                  </span>
                </div>
                <div className="text-xs text-slate-600 mt-1 whitespace-pre-line leading-relaxed font-light">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-3">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="text-xs">
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{proj.name} {proj.techStack && <span className="font-mono text-[11px] text-slate-400 font-normal">({proj.techStack})</span>}</span>
                  {proj.link && <span className="text-[11px] font-mono text-slate-400">{proj.link}</span>}
                </div>
                <p className="text-slate-600 mt-0.5 leading-relaxed font-light">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && (
        <section className="mt-6">
          <h2 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">
            Skills & Competencies
          </h2>
          <div className="text-xs text-slate-700 space-y-1">
            {skills.technical?.length > 0 && (
              <div><strong className="text-slate-900">Technical:</strong> {skills.technical.join(" • ")}</div>
            )}
            {skills.tools?.length > 0 && (
              <div><strong className="text-slate-900">Tools:</strong> {skills.tools.join(" • ")}</div>
            )}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mt-6 pt-3 border-t border-slate-100">
          <h2 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">
            Education
          </h2>
          <div className="space-y-1.5 text-xs">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <span className="font-bold text-slate-900">{edu.degree} — <span className="font-normal text-slate-600">{edu.institution}</span></span>
                <span className="font-mono text-slate-400 text-[11px]">{edu.year} {edu.grade ? `(${edu.grade})` : ""}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
