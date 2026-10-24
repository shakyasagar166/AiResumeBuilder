import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function CompactGridAtsTemplate({
  data,
  fontClass = "font-sans",
  density = "compact",
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
      className={`bg-white text-black min-h-[1050px] print:min-h-0 print:h-auto w-full max-w-[820px] mx-auto select-text print:p-0 ${fontClass} p-4 sm:p-6 text-[11px] leading-tight`}
      style={{ color: "#000000", backgroundColor: "#ffffff" }}
    >
      {/* ========================================================
          HEADER: ULTRA-COMPACT 1-PAGE ATS
          ======================================================== */}
      <header className="border-b border-black pb-2 mb-2.5">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <div>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black">
              {personalInfo.fullName || "YOUR FULL NAME"}
            </h1>
            {personalInfo.jobTitle && (
              <span className="text-[11px] font-bold text-neutral-800 uppercase tracking-wide">
                {personalInfo.jobTitle}
              </span>
            )}
          </div>

          <div className="text-[10px] text-neutral-800 sm:text-right font-medium">
            <span className="inline-block">{personalInfo.phone}</span>
            {personalInfo.phone && personalInfo.email && <span className="mx-1.5">•</span>}
            <span className="inline-block">{personalInfo.email}</span>
            {personalInfo.location && <span className="mx-1.5">•</span>}
            <span className="inline-block">{personalInfo.location}</span>
            {personalInfo.linkedin && (
              <>
                <span className="mx-1.5">•</span>
                <span className="inline-block font-mono">linkedin.com/in/{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "").replace(/\/$/, "")}</span>
              </>
            )}
            {personalInfo.github && (
              <>
                <span className="mx-1.5">•</span>
                <span className="inline-block font-mono">github.com/{personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, "").replace(/\/$/, "")}</span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================
          SUMMARY
          ======================================================== */}
      {personalInfo.summary && (
        <section className="mb-2.5">
          <h2 className="text-[10.5px] font-black uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1">
            Summary
          </h2>
          <p className="text-neutral-900 leading-snug text-justify">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* ========================================================
          TECHNICAL SKILLS GRID (3 Columns)
          ======================================================== */}
      {(skills.technical?.length > 0 || skills.tools?.length > 0 || skills.softSkills?.length > 0) && (
        <section className="mb-2.5">
          <h2 className="text-[10.5px] font-black uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
            Technical Skills & Competencies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-2 bg-neutral-50 border border-neutral-200 rounded text-[10.5px]">
            {skills.technical?.length > 0 && (
              <div>
                <div className="font-bold text-black border-b border-neutral-300 pb-0.5 mb-1">Languages & Tech</div>
                <div className="text-neutral-800 leading-snug">{skills.technical.join(", ")}</div>
              </div>
            )}
            {skills.tools?.length > 0 && (
              <div>
                <div className="font-bold text-black border-b border-neutral-300 pb-0.5 mb-1">Frameworks & DB</div>
                <div className="text-neutral-800 leading-snug">{skills.tools.join(", ")}</div>
              </div>
            )}
            {skills.softSkills?.length > 0 && (
              <div>
                <div className="font-bold text-black border-b border-neutral-300 pb-0.5 mb-1">Core Concepts</div>
                <div className="text-neutral-800 leading-snug">{skills.softSkills.join(", ")}</div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ========================================================
          EXPERIENCE
          ======================================================== */}
      {experience?.length > 0 && (
        <section className="mb-2.5">
          <h2 className="text-[10.5px] font-black uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
            Experience & Internships
          </h2>
          <div className="space-y-2">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <span className="font-bold text-black">{exp.title}</span>
                    {exp.company && <span className="font-semibold text-neutral-800"> — {exp.company}</span>}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-700">
                    {exp.startDate} – {exp.endDate || "Present"}
                  </div>
                </div>

                {exp.description && (
                  <ul className="list-disc list-outside ml-3.5 mt-0.5 space-y-0.5 text-neutral-900">
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

      {/* ========================================================
          PROJECTS
          ======================================================== */}
      {projects?.length > 0 && (
        <section className="mb-2.5">
          <h2 className="text-[10.5px] font-black uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
            Projects
          </h2>
          <div className="space-y-1.5">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <span className="font-bold text-black">{proj.name}</span>
                    {proj.techStack && (
                      <span className="text-[10px] font-mono font-medium text-neutral-700">
                        {" "}[{proj.techStack}]
                      </span>
                    )}
                  </div>
                  {proj.link && (
                    <span className="text-[9.5px] text-neutral-600 font-mono">
                      {proj.link.replace(/^https?:\/\//, "")}
                    </span>
                  )}
                </div>

                {proj.description && (
                  <p className="text-neutral-900 mt-0.5 leading-snug">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================
          EDUCATION & CERTIFICATIONS (2-Col Side by Side on Desktop)
          ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-neutral-300">
        {education?.length > 0 && (
          <div>
            <h2 className="text-[10.5px] font-black uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1">
              Education
            </h2>
            <div className="space-y-1">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <div className="font-bold text-black">{edu.degree}</div>
                    <div className="text-[10px] text-neutral-700">{edu.institution}</div>
                  </div>
                  <div className="text-right text-[10px] text-neutral-700">
                    <div>{edu.year}</div>
                    {edu.grade && <div className="font-semibold">{edu.grade}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications?.length > 0 && (
          <div>
            <h2 className="text-[10.5px] font-black uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1">
              Certifications
            </h2>
            <div className="space-y-1">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-black">{cert.name}</span>
                    {cert.issuer && <span className="text-neutral-700"> ({cert.issuer})</span>}
                  </div>
                  {cert.year && (
                    <span className="text-[10px] text-neutral-700">{cert.year}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
