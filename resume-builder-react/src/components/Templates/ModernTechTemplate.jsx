import React from "react";
import { Mail, Phone, MapPin, Globe, ExternalLink, Calendar } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "../Icons";

export default function ModernTechTemplate({ data, accentColor, fontClass }) {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div
      className={`resume-sheet w-full bg-white text-slate-800 p-8 sm:p-10 shadow-2xl rounded-xl transition-all duration-300 ${fontClass}`}
      style={{ minHeight: "1050px" }}
    >
      {/* Header */}
      <header className="border-b-2 pb-6" style={{ borderColor: accentColor.primary }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            <p className="text-lg font-semibold mt-1" style={{ color: accentColor.primary }}>
              {personalInfo.jobTitle || "Professional Title"}
            </p>
          </div>
          {personalInfo.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              className="w-20 h-20 rounded-full object-cover border-2 shadow-sm"
              style={{ borderColor: accentColor.primary }}
            />
          )}
        </div>

        {/* Contact Links */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-xs sm:text-sm text-slate-600">
          {personalInfo.email && (
            <span className="flex items-center gap-1.5 hover:text-slate-900">
              <Mail className="w-3.5 h-3.5" style={{ color: accentColor.primary }} />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" style={{ color: accentColor.primary }} />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" style={{ color: accentColor.primary }} />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1.5">
              <LinkedinIcon className="w-3.5 h-3.5" style={{ color: accentColor.primary }} />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1.5">
              <GithubIcon className="w-3.5 h-3.5" style={{ color: accentColor.primary }} />
              {personalInfo.github}
            </span>
          )}
          {personalInfo.portfolio && (
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" style={{ color: accentColor.primary }} />
              {personalInfo.portfolio}
            </span>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <section className="mt-5">
          <h2 className="text-xs uppercase tracking-wider font-bold mb-2" style={{ color: accentColor.primary }}>
            Professional Summary
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed text-justify">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Technical Skills */}
      {skills && (skills.technical?.length > 0 || skills.tools?.length > 0) && (
        <section className="mt-5">
          <h2 className="text-xs uppercase tracking-wider font-bold mb-2.5" style={{ color: accentColor.primary }}>
            Core Competencies & Technical Skills
          </h2>
          <div className="space-y-1.5 text-xs sm:text-sm">
            {skills.technical?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="font-semibold text-slate-800 text-xs min-w-28">Technologies:</span>
                <div className="flex flex-wrap gap-1.5">
                  {skills.technical.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {skills.tools?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="font-semibold text-slate-800 text-xs min-w-28">Tools & Platforms:</span>
                <div className="flex flex-wrap gap-1.5">
                  {skills.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {experience && experience.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xs uppercase tracking-wider font-bold mb-3" style={{ color: accentColor.primary }}>
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="relative pl-3 border-l-2 border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="font-bold text-slate-900 text-sm sm:text-base">
                    {exp.title}{" "}
                    <span className="font-normal text-slate-600">at {exp.company}</span>
                  </div>
                  <div className="text-xs font-medium text-slate-500 flex items-center gap-1 mt-0.5 sm:mt-0">
                    <Calendar className="w-3 h-3" />
                    {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : exp.current ? "- Present" : ""}
                    {exp.location ? ` | ${exp.location}` : ""}
                  </div>
                </div>
                <div className="mt-1.5 text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed">
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
          <h2 className="text-xs uppercase tracking-wider font-bold mb-3" style={{ color: accentColor.primary }}>
            Key Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {projects.map((proj) => (
              <div key={proj.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-start justify-between">
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">{proj.name}</span>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs flex items-center gap-1 hover:underline"
                      style={{ color: accentColor.primary }}
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                {proj.techStack && (
                  <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                    Tech: {proj.techStack}
                  </p>
                )}
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Certifications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 pt-3 border-t border-slate-100">
        {/* Education */}
        {education && education.length > 0 && (
          <section>
            <h2 className="text-xs uppercase tracking-wider font-bold mb-2" style={{ color: accentColor.primary }}>
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs sm:text-sm">
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-600 text-xs">{edu.institution} {edu.year ? `(${edu.year})` : ""}</div>
                  {edu.grade && <div className="text-xs font-semibold text-slate-700">Score: {edu.grade}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section>
            <h2 className="text-xs uppercase tracking-wider font-bold mb-2" style={{ color: accentColor.primary }}>
              Certifications & Honors
            </h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-xs sm:text-sm">
                  <div className="font-semibold text-slate-900">{cert.name}</div>
                  <div className="text-slate-500 text-xs">{cert.issuer} {cert.year ? `• ${cert.year}` : ""}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
