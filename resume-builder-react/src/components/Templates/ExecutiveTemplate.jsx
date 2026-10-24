import React from "react";
import { Mail, Phone, MapPin, Globe, ExternalLink } from "lucide-react";

export default function ExecutiveTemplate({ data, accentColor, fontClass }) {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div
      className={`resume-sheet w-full bg-white text-slate-900 p-8 sm:p-12 shadow-2xl rounded-xl transition-all duration-300 ${fontClass}`}
      style={{ minHeight: "1050px" }}
    >
      {/* Top Header */}
      <div className="text-center pb-6 border-b-2" style={{ borderColor: accentColor.primary }}>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-normal uppercase text-slate-900">
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        <p className="text-sm sm:text-base font-medium tracking-wide mt-1.5 uppercase" style={{ color: accentColor.primary }}>
          {personalInfo.jobTitle || "Executive Title"}
        </p>

        {/* Contact bar */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 mt-3 text-xs text-slate-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.portfolio && <span>• {personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mt-6">
          <h2 className="text-xs uppercase font-serif font-bold tracking-widest text-slate-800 border-b border-slate-300 pb-1 mb-2">
            Executive Summary
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xs uppercase font-serif font-bold tracking-widest text-slate-800 border-b border-slate-300 pb-1 mb-3">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-sm sm:text-base text-slate-900">
                    {exp.title}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : exp.current ? "- Present" : ""}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-600 italic mb-1.5">
                  <span>{exp.company}</span>
                  {exp.location && <span>{exp.location}</span>}
                </div>
                <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed">
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
          <h2 className="text-xs uppercase font-serif font-bold tracking-widest text-slate-800 border-b border-slate-300 pb-1 mb-3">
            Key Strategic Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">{proj.name}</span>
                  {proj.techStack && <span className="text-xs text-slate-500">[{proj.techStack}]</span>}
                </div>
                <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Two Column Footer: Education & Skills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 pt-2">
        {/* Education */}
        {education && education.length > 0 && (
          <section>
            <h2 className="text-xs uppercase font-serif font-bold tracking-widest text-slate-800 border-b border-slate-300 pb-1 mb-2">
              Education & Academic Credentials
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-600">{edu.institution} {edu.year ? `(${edu.year})` : ""}</div>
                  {edu.grade && <div className="text-slate-500 font-medium">Performance: {edu.grade}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills && (
          <section>
            <h2 className="text-xs uppercase font-serif font-bold tracking-widest text-slate-800 border-b border-slate-300 pb-1 mb-2">
              Areas of Expertise
            </h2>
            <div className="text-xs text-slate-700 space-y-1">
              {skills.technical?.length > 0 && (
                <div>
                  <span className="font-semibold text-slate-900">Technical: </span>
                  {skills.technical.join(", ")}
                </div>
              )}
              {skills.tools?.length > 0 && (
                <div>
                  <span className="font-semibold text-slate-900">Platforms: </span>
                  {skills.tools.join(", ")}
                </div>
              )}
              {skills.softSkills?.length > 0 && (
                <div>
                  <span className="font-semibold text-slate-900">Leadership: </span>
                  {skills.softSkills.join(", ")}
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
