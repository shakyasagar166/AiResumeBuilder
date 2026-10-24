import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function CampusPlacementAtsTemplate({
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
      {/* Header: Centered Placement Drive Format */}
      <header className="text-center border-b-2 border-black pb-3 mb-3.5">
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
          {personalInfo.fullName || "YOUR FULL NAME"}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-xs sm:text-sm font-bold tracking-wide text-neutral-800 uppercase mt-0.5">
            {personalInfo.jobTitle}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-neutral-800 mt-2 font-medium">
          {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
          {personalInfo.email && (
            <>
              <span>•</span>
              <span>✉️ {personalInfo.email}</span>
            </>
          )}
          {personalInfo.location && (
            <>
              <span>•</span>
              <span>📍 {personalInfo.location}</span>
            </>
          )}
          {personalInfo.linkedin && (
            <>
              <span>•</span>
              <span>🔗 linkedin.com/in/{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "").replace(/\/$/, "")}</span>
            </>
          )}
          {personalInfo.github && (
            <>
              <span>•</span>
              <span>💻 github.com/{personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, "").replace(/\/$/, "")}</span>
            </>
          )}
        </div>
      </header>

      {/* 01. EDUCATION FIRST (Crucial for Campus Placements) */}
      {education?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-black uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
            Education & Academic Background
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <div>
                  <span className="font-bold text-black">{edu.degree}</span>
                  <span className="text-neutral-800"> — {edu.institution}</span>
                </div>
                <div className="sm:text-right shrink-0">
                  <span className="font-semibold text-neutral-700 tabular-nums">{edu.year}</span>
                  {edu.grade && (
                    <span className="font-bold text-black ml-2">[Score: {edu.grade}]</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 02. TECHNICAL SKILLS */}
      {(skills.technical?.length > 0 || skills.tools?.length > 0 || skills.softSkills?.length > 0) && (
        <section className="mb-4">
          <h2 className="text-xs font-black uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
            Technical Skills & Competencies
          </h2>
          <div className="space-y-1.5 text-[11.5px] text-neutral-900">
            {skills.technical?.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="font-bold sm:w-44 shrink-0 text-black">Programming & Frameworks:</span>
                <span className="text-neutral-800 font-medium">{skills.technical.join(", ")}</span>
              </div>
            )}
            {skills.tools?.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="font-bold sm:w-44 shrink-0 text-black">Tools, Databases & IDE:</span>
                <span className="text-neutral-800 font-medium">{skills.tools.join(", ")}</span>
              </div>
            )}
            {skills.softSkills?.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="font-bold sm:w-44 shrink-0 text-black">Core Subject Areas:</span>
                <span className="text-neutral-800 font-medium">{skills.softSkills.join(", ")}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 03. ACADEMIC & PERSONAL PROJECTS (High weightage for freshers) */}
      {projects?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-black uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
            Academic & Capstone Projects
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <span className="font-bold text-black">{proj.name}</span>
                    {proj.techStack && (
                      <span className="text-[11px] font-semibold text-neutral-800 italic">
                        {" "}(Tech: {proj.techStack})
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
                  <p className="text-neutral-900 mt-0.5 leading-snug">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 04. INTERNSHIPS & INDUSTRIAL TRAINING */}
      {experience?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-black uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
            Internships & Professional Training
          </h2>
          <div className="space-y-2.5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <span className="font-bold text-black">{exp.title}</span>
                    {exp.company && <span className="font-medium text-neutral-800"> — {exp.company}</span>}
                  </div>
                  <div className="text-[11px] font-semibold text-neutral-700">
                    {exp.startDate} – {exp.endDate || "Present"}
                  </div>
                </div>

                {exp.description && (
                  <ul className="list-disc list-outside ml-4 mt-0.5 space-y-0.5 text-neutral-900">
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

      {/* 05. CERTIFICATIONS & WORKSHOPS */}
      {certifications?.length > 0 && (
        <section className="mb-3.5">
          <h2 className="text-xs font-black uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
            Certifications & Technical Training
          </h2>
          <div className="space-y-1 text-[11.5px]">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <div>
                  <span className="font-bold text-black">{cert.name}</span>
                  {cert.issuer && <span className="text-neutral-800"> — {cert.issuer}</span>}
                </div>
                {cert.year && (
                  <span className="text-[11px] font-semibold text-neutral-700 tabular-nums">{cert.year}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 06. CAREER OBJECTIVE / SUMMARY */}
      {personalInfo.summary && (
        <section className="pt-1 border-t border-neutral-300">
          <h2 className="text-xs font-black uppercase tracking-wider text-black mb-1">
            Career Objective
          </h2>
          <p className="text-neutral-900 leading-snug text-justify text-[11px]">
            {personalInfo.summary}
          </p>
        </section>
      )}
    </div>
  );
}
