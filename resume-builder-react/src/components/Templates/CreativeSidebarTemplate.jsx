import React from "react";
import { Mail, Phone, MapPin, Globe, Sparkles } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "../Icons";

export default function CreativeSidebarTemplate({ data, accentColor, fontClass }) {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div
      className={`resume-sheet w-full bg-white text-slate-800 shadow-2xl rounded-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row ${fontClass}`}
      style={{ minHeight: "1050px" }}
    >
      {/* Left Sidebar */}
      <aside
        className="w-full md:w-5/12 p-6 sm:p-8 text-white flex flex-col justify-between"
        style={{ backgroundColor: accentColor.primary }}
      >
        <div>
          {/* Avatar & Name */}
          <div className="text-center md:text-left">
            {personalInfo.photoUrl && (
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                className="w-24 h-24 rounded-full mx-auto md:mx-0 object-cover border-4 border-white/20 shadow-md mb-4"
              />
            )}
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            <p className="text-sm font-medium text-white/80 mt-1">
              {personalInfo.jobTitle || "Creative Professional"}
            </p>
          </div>

          {/* Contact Details */}
          <div className="mt-6 space-y-2.5 text-xs text-white/90 border-t border-white/20 pt-4">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-white/70 shrink-0" />
                <span className="truncate">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-white/70 shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-white/70 shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <LinkedinIcon className="w-3.5 h-3.5 text-white/70 shrink-0" />
                <span className="truncate">{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-2">
                <GithubIcon className="w-3.5 h-3.5 text-white/70 shrink-0" />
                <span className="truncate">{personalInfo.github}</span>
              </div>
            )}
          </div>

          {/* Skills with sleek tags */}
          {skills && (
            <div className="mt-6 border-t border-white/20 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-2.5 text-white/90">
                Skills & Tech
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {(skills.technical || []).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white/20 text-white backdrop-blur-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education in sidebar */}
          {education && education.length > 0 && (
            <div className="mt-6 border-t border-white/20 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-2 text-white/90">
                Education
              </h3>
              <div className="space-y-2 text-xs">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-white">{edu.degree}</div>
                    <div className="text-white/80 text-[11px]">{edu.institution}</div>
                    <div className="text-white/70 text-[10px]">{edu.year} {edu.grade ? `• ${edu.grade}` : ""}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pro watermark subtle badge */}
        <div className="mt-6 pt-3 border-t border-white/10 text-[10px] text-white/60 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-300" /> Executive Pro Series
        </div>
      </aside>

      {/* Main Right Content */}
      <main className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col justify-between">
        <div className="space-y-5">
          {/* Summary */}
          {personalInfo.summary && (
            <section>
              <h2 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-2">
                Profile Summary
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-3">
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-3 border-l-2 border-slate-200">
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">
                      {exp.title}
                    </div>
                    <div className="text-xs font-semibold" style={{ color: accentColor.primary }}>
                      {exp.company} <span className="text-slate-400 font-normal">| {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : "- Present"}</span>
                    </div>
                    <div className="mt-1 text-xs text-slate-600 whitespace-pre-line leading-relaxed">
                      {exp.description}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Key Projects */}
          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-3">
                Featured Projects
              </h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="font-bold text-slate-900 text-xs">{proj.name}</div>
                    {proj.techStack && (
                      <div className="text-[10px] font-semibold text-slate-500">{proj.techStack}</div>
                    )}
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Certifications at bottom */}
        {certifications && certifications.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <h2 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-1.5">
              Certifications
            </h2>
            <div className="flex flex-wrap gap-2 text-xs">
              {certifications.map((c) => (
                <span key={c.id} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">
                  {c.name} ({c.issuer})
                </span>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
