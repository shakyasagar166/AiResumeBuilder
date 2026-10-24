import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function TwoColumnSplitAtsTemplate({
  data,
  fontClass = "font-sans",
  density = "standard",
  dividerStyle = "solid"
}) {
  const {
    personalInfo = {},
    experience = [],
    education = [],
    skills = { technical: [], softSkills: [], tools: [] },
    projects = [],
    certifications = []
  } = data || {};

  return (
    <div
      className={`bg-white text-black min-h-[1050px] print:min-h-0 print:h-auto w-full max-w-[820px] mx-auto select-text print:p-0 ${fontClass} p-4 sm:p-8 text-xs`}
      style={{ color: "#000000", backgroundColor: "#ffffff" }}
    >
      {/* Top Banner Header */}
      <header className="border-b-2 border-black pb-3 mb-4">
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
          {personalInfo.fullName || "YOUR FULL NAME"}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-xs sm:text-sm font-bold tracking-widest text-neutral-800 uppercase mt-0.5">
            {personalInfo.jobTitle}
          </p>
        )}
      </header>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* ================= LEFT RAIL (Cols 1-4: 33% width) ================= */}
        <aside className="md:col-span-4 md:border-r border-black md:pr-4 space-y-4">
          {/* Contact Details */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
              Contact Info
            </h3>
            <div className="space-y-1 text-[11px] text-neutral-800">
              {personalInfo.phone && <div>📞 {personalInfo.phone}</div>}
              {personalInfo.email && <div className="break-all">✉️ {personalInfo.email}</div>}
              {personalInfo.location && <div>📍 {personalInfo.location}</div>}
              {personalInfo.linkedin && (
                <div className="break-all">🔗 {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, "")}</div>
              )}
              {personalInfo.github && (
                <div className="break-all">💻 {personalInfo.github.replace(/^https?:\/\/(www\.)?/, "")}</div>
              )}
            </div>
          </div>

          {/* Technical Skills */}
          {(skills.technical?.length > 0 || skills.tools?.length > 0) && (
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
                Technical Skills
              </h3>
              <div className="space-y-2 text-[11px]">
                {skills.technical?.length > 0 && (
                  <div>
                    <div className="font-bold text-black mb-0.5">Languages & Frameworks:</div>
                    <div className="text-neutral-800 leading-snug">{skills.technical.join(", ")}</div>
                  </div>
                )}
                {skills.tools?.length > 0 && (
                  <div>
                    <div className="font-bold text-black mb-0.5">Tools & Databases:</div>
                    <div className="text-neutral-800 leading-snug">{skills.tools.join(", ")}</div>
                  </div>
                )}
                {skills.softSkills?.length > 0 && (
                  <div>
                    <div className="font-bold text-black mb-0.5">Core Competencies:</div>
                    <div className="text-neutral-800 leading-snug">{skills.softSkills.join(", ")}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
                Education
              </h3>
              <div className="space-y-2 text-[11px]">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-black">{edu.degree}</div>
                    <div className="text-neutral-800">{edu.institution}</div>
                    <div className="text-[10px] text-neutral-600 font-mono">
                      {edu.year} {edu.grade && `• ${edu.grade}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications?.length > 0 && (
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
                Certifications
              </h3>
              <div className="space-y-1.5 text-[11px]">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <div className="font-bold text-black">{cert.name}</div>
                    <div className="text-[10px] text-neutral-700">
                      {cert.issuer} {cert.year && `(${cert.year})`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* ================= RIGHT RAIL (Cols 5-12: 67% width) ================= */}
        <main className="md:col-span-8 space-y-4">
          {/* Summary */}
          {personalInfo.summary && (
            <section>
              <h3 className="text-[11px] font-black uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
                Executive Profile
              </h3>
              <p className="text-neutral-900 leading-relaxed text-justify">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experience?.length > 0 && (
            <section>
              <h3 className="text-[11px] font-black uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
                Experience & Internships
              </h3>
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                      <div>
                        <span className="font-bold text-black">{exp.title}</span>
                        {exp.company && <span className="font-semibold text-neutral-800"> — {exp.company}</span>}
                      </div>
                      <div className="text-[10.5px] font-mono font-semibold text-neutral-700">
                        {exp.startDate} – {exp.endDate || "Present"}
                      </div>
                    </div>

                    {exp.description && (
                      <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-neutral-900 text-[11px]">
                        {exp.description
                          .split("\n")
                          .filter((line) => line.trim().length > 0)
                          .map((bullet, i) => (
                            <li key={i} className="leading-snug">
                              {bullet.replace(/^[\s•\-\*]+/, "")}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects?.length > 0 && (
            <section>
              <h3 className="text-[11px] font-black uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
                Key Technical Projects
              </h3>
              <div className="space-y-2.5">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                      <div>
                        <span className="font-bold text-black">{proj.name}</span>
                        {proj.techStack && (
                          <span className="text-[10.5px] font-mono text-neutral-700 font-medium">
                            {" "}[{proj.techStack}]
                          </span>
                        )}
                      </div>
                      {proj.link && (
                        <span className="text-[10px] text-neutral-600 font-mono">
                          {proj.link.replace(/^https?:\/\//, "")}
                        </span>
                      )}
                    </div>

                    {proj.description && (
                      <p className="text-neutral-900 mt-0.5 text-[11px] leading-snug">
                        {proj.description}
                      </p>
                    )}
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
