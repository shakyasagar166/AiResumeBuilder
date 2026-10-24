import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function MinimalistSwissAtsTemplate({
  data,
  fontClass = "font-sans",
  density = "standard",
  dividerStyle = "minimal"
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
      className={`bg-white text-black min-h-[1050px] print:min-h-0 print:h-auto w-full max-w-[820px] mx-auto select-text print:p-0 ${fontClass} p-5 sm:p-10 text-xs`}
      style={{ color: "#000000", backgroundColor: "#ffffff" }}
    >
      {/* Header: Swiss Minimalist Left-Aligned */}
      <header className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-black">
          <span className="font-extrabold">{personalInfo.fullName?.split(" ")[0] || "YOUR"}</span>{" "}
          <span>{personalInfo.fullName?.split(" ").slice(1).join(" ") || "NAME"}</span>
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-xs font-mono font-medium tracking-wider text-neutral-600 mt-1 uppercase">
            // {personalInfo.jobTitle}
          </p>
        )}

        {/* Minimalist Contact Line */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-neutral-700 mt-3 pt-2 border-t border-dashed border-neutral-300 font-mono">
          {personalInfo.phone && <span>t: {personalInfo.phone}</span>}
          {personalInfo.email && <span>e: {personalInfo.email}</span>}
          {personalInfo.location && <span>l: {personalInfo.location}</span>}
          {personalInfo.linkedin && (
            <span>in: {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "").replace(/\/$/, "")}</span>
          )}
          {personalInfo.github && (
            <span>gh: {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, "").replace(/\/$/, "")}</span>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-5">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500 mb-1">
            01 / PROFILE
          </div>
          <div className="border-t border-dashed border-neutral-400 pt-1.5">
            <p className="text-neutral-900 leading-relaxed text-justify">
              {personalInfo.summary}
            </p>
          </div>
        </section>
      )}

      {/* Technical Skills */}
      {(skills.technical?.length > 0 || skills.tools?.length > 0 || skills.softSkills?.length > 0) && (
        <section className="mb-5">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500 mb-1">
            02 / CORE CAPABILITIES
          </div>
          <div className="border-t border-dashed border-neutral-400 pt-2 space-y-1.5 text-[11.5px]">
            {skills.technical?.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="font-bold sm:w-40 shrink-0 text-black">Technologies:</span>
                <span className="text-neutral-800">{skills.technical.join(" / ")}</span>
              </div>
            )}
            {skills.tools?.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="font-bold sm:w-40 shrink-0 text-black">Infrastructure & DB:</span>
                <span className="text-neutral-800">{skills.tools.join(" / ")}</span>
              </div>
            )}
            {skills.softSkills?.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="font-bold sm:w-40 shrink-0 text-black">Practices:</span>
                <span className="text-neutral-800">{skills.softSkills.join(" / ")}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <section className="mb-5">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500 mb-1">
            03 / EXPERIENCE
          </div>
          <div className="border-t border-dashed border-neutral-400 pt-2 space-y-3.5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <span className="font-extrabold text-black">{exp.title}</span>
                    {exp.company && <span className="font-normal text-neutral-700"> — {exp.company}</span>}
                  </div>
                  <div className="text-[10.5px] font-mono text-neutral-600">
                    {exp.startDate} → {exp.endDate || "Present"}
                  </div>
                </div>

                {exp.description && (
                  <ul className="mt-1 space-y-0.5 text-neutral-800 text-[11.5px] pl-2">
                    {exp.description
                      .split("\n")
                      .filter((line) => line.trim().length > 0)
                      .map((bullet, i) => (
                        <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                          <span className="text-neutral-400 shrink-0">—</span>
                          <span>{bullet.replace(/^[\s•\-\*]+/, "")}</span>
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
        <section className="mb-5">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500 mb-1">
            04 / PROJECTS
          </div>
          <div className="border-t border-dashed border-neutral-400 pt-2 space-y-2.5">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <span className="font-extrabold text-black">{proj.name}</span>
                    {proj.techStack && (
                      <span className="text-[10.5px] font-mono text-neutral-600">
                        {" "}// {proj.techStack}
                      </span>
                    )}
                  </div>
                  {proj.link && (
                    <span className="text-[10px] text-neutral-500 font-mono">
                      {proj.link.replace(/^https?:\/\//, "")}
                    </span>
                  )}
                </div>

                {proj.description && (
                  <p className="text-neutral-800 mt-0.5 text-[11.5px] leading-relaxed pl-2">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Certifications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        {education?.length > 0 && (
          <div>
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500 mb-1">
              05 / EDUCATION
            </div>
            <div className="border-t border-dashed border-neutral-400 pt-2 space-y-2">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-extrabold text-black">{edu.degree}</div>
                  <div className="text-[11px] text-neutral-700">{edu.institution}</div>
                  <div className="text-[10px] font-mono text-neutral-500">
                    {edu.year} {edu.grade && `• ${edu.grade}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications?.length > 0 && (
          <div>
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500 mb-1">
              06 / CERTIFICATIONS
            </div>
            <div className="border-t border-dashed border-neutral-400 pt-2 space-y-1.5">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <div className="font-extrabold text-black">{cert.name}</div>
                  <div className="text-[10.5px] text-neutral-600">
                    {cert.issuer} {cert.year && `(${cert.year})`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
