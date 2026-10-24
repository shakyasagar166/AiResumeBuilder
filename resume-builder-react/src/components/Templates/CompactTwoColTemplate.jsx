import React from "react";
import { Mail, Phone, MapPin, Globe, ExternalLink, Calendar, GraduationCap, Award } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "../Icons";

export default function CompactTwoColTemplate({ data, accentColor, fontClass }) {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div
      className={`resume-sheet w-full bg-white text-slate-800 p-8 sm:p-10 shadow-2xl rounded-xl transition-all duration-300 ${fontClass}`}
      style={{ minHeight: "1050px" }}
    >
      {/* Name Header */}
      <div className="pb-5 border-b-2" style={{ borderColor: accentColor.primary }}>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        <p className="text-base font-bold mt-0.5" style={{ color: accentColor.primary }}>
          {personalInfo.jobTitle || "Engineering Professional"}
        </p>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-5">
        {/* Left Column (4 cols) */}
        <aside className="md:col-span-4 space-y-5 border-r md:pr-5 border-slate-200">
          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider mb-2.5" style={{ color: accentColor.primary }}>
              Contact
            </h3>
            <div className="space-y-1.5 text-xs text-slate-600">
              {personalInfo.email && <div className="break-all"><strong className="text-slate-800">Email:</strong> {personalInfo.email}</div>}
              {personalInfo.phone && <div><strong className="text-slate-800">Phone:</strong> {personalInfo.phone}</div>}
              {personalInfo.location && <div><strong className="text-slate-800">Location:</strong> {personalInfo.location}</div>}
              {personalInfo.linkedin && <div className="break-all"><strong className="text-slate-800">LinkedIn:</strong> {personalInfo.linkedin}</div>}
              {personalInfo.github && <div className="break-all"><strong className="text-slate-800">GitHub:</strong> {personalInfo.github}</div>}
            </div>
          </div>

          {/* Skills */}
          {skills && (
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider mb-2.5" style={{ color: accentColor.primary }}>
                Skills
              </h3>
              <div className="space-y-2 text-xs">
                {skills.technical?.length > 0 && (
                  <div>
                    <span className="font-bold text-slate-800 block text-[11px]">Core Tech:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {skills.technical.map((s, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {skills.tools?.length > 0 && (
                  <div>
                    <span className="font-bold text-slate-800 block text-[11px]">Tools:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {skills.tools.map((t, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider mb-2.5" style={{ color: accentColor.primary }}>
                Education
              </h3>
              <div className="space-y-2 text-xs">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-600 text-[11px]">{edu.institution}</div>
                    <div className="text-slate-500 text-[10px]">{edu.year} {edu.grade ? `• ${edu.grade}` : ""}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider mb-2.5" style={{ color: accentColor.primary }}>
                Certifications
              </h3>
              <div className="space-y-1.5 text-xs">
                {certifications.map((c) => (
                  <div key={c.id}>
                    <span className="font-bold text-slate-800">{c.name}</span>
                    <span className="text-slate-500 text-[10px] block">{c.issuer} ({c.year})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Right Main Column (8 cols) */}
        <main className="md:col-span-8 space-y-5">
          {/* Summary */}
          {personalInfo.summary && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-wider mb-1.5" style={{ color: accentColor.primary }}>
                Summary
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed text-justify">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-wider mb-2.5" style={{ color: accentColor.primary }}>
                Experience
              </h2>
              <div className="space-y-3.5">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">
                        {exp.title} — <span className="font-normal text-slate-600">{exp.company}</span>
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {exp.startDate} {exp.endDate ? `– ${exp.endDate}` : "- Present"}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-1 whitespace-pre-line leading-relaxed">
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
              <h2 className="text-xs font-black uppercase tracking-wider mb-2.5" style={{ color: accentColor.primary }}>
                Key Projects
              </h2>
              <div className="space-y-2.5">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900 text-xs">{proj.name}</span>
                      {proj.techStack && <span className="text-[10px] font-mono text-slate-500 font-semibold">{proj.techStack}</span>}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
