import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function ExecutiveSerifAtsTemplate({
  data,
  fontClass = "font-serif",
  density = "standard",
  dividerStyle = "double"
}) {
  const {
    personalInfo = {},
    experience = [],
    education = [],
    skills = { technical: [], softSkills: [], tools: [] },
    projects = [],
    certifications = []
  } = data || {};

  const spacingClasses = {
    compact: {
      padding: "p-4 sm:p-6 md:p-8",
      sectionGap: "mb-3.5",
      headerGap: "mb-3",
      itemGap: "space-y-2",
      bulletLeading: "leading-snug text-[11px]",
      fontSize: "text-[11.5px]"
    },
    spacious: {
      padding: "p-5 sm:p-8 md:p-12",
      sectionGap: "mb-6",
      headerGap: "mb-5",
      itemGap: "space-y-4",
      bulletLeading: "leading-relaxed text-xs",
      fontSize: "text-[13px]"
    },
    standard: {
      padding: "p-4 sm:p-7 md:p-10",
      sectionGap: "mb-5",
      headerGap: "mb-4",
      itemGap: "space-y-3",
      bulletLeading: "leading-normal text-xs",
      fontSize: "text-xs"
    }
  }[density] || {
    padding: "p-4 sm:p-7 md:p-10",
    sectionGap: "mb-5",
    headerGap: "mb-4",
    itemGap: "space-y-3",
    bulletLeading: "leading-normal text-xs",
    fontSize: "text-xs"
  };

  return (
    <div
      className={`bg-white text-black min-h-[1050px] print:min-h-0 print:h-auto w-full max-w-[820px] mx-auto select-text font-serif print:p-0 ${spacingClasses.padding} ${spacingClasses.fontSize}`}
      style={{ color: "#000000", backgroundColor: "#ffffff" }}
    >
      {/* ========================================================
          HEADER: EXECUTIVE CLASSIC SERIF (Centered, double rule)
          ======================================================== */}
      <header className={`text-center ${spacingClasses.headerGap} border-b-2 border-double border-black pb-3`}>
        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-widest text-black">
          {personalInfo.fullName || "YOUR FULL NAME"}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-neutral-800 uppercase mt-1">
            {personalInfo.jobTitle}
          </p>
        )}

        {/* Contact info with bullet dots */}
        <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[11px] text-neutral-800 mt-2 font-normal">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && (
            <>
              <span className="text-neutral-400">•</span>
              <span>{personalInfo.phone}</span>
            </>
          )}
          {personalInfo.email && (
            <>
              <span className="text-neutral-400">•</span>
              <span>{personalInfo.email}</span>
            </>
          )}
          {personalInfo.linkedin && (
            <>
              <span className="text-neutral-400">•</span>
              <span>linkedin.com/in/{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "").replace(/\/$/, "")}</span>
            </>
          )}
          {personalInfo.github && (
            <>
              <span className="text-neutral-400">•</span>
              <span>github.com/{personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, "").replace(/\/$/, "")}</span>
            </>
          )}
        </div>
      </header>

      {/* ========================================================
          EXECUTIVE SUMMARY
          ======================================================== */}
      {personalInfo.summary && (
        <section className={spacingClasses.sectionGap}>
          <h2 className="text-xs font-bold uppercase tracking-widest text-center border-b border-black pb-0.5 mb-1.5 text-black">
            Executive Summary
          </h2>
          <p className={`text-neutral-900 ${spacingClasses.bulletLeading} text-justify`}>
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* ========================================================
          AREAS OF EXPERTISE & TECHNICAL SKILLS
          ======================================================== */}
      {(skills.technical?.length > 0 || skills.tools?.length > 0 || skills.softSkills?.length > 0) && (
        <section className={spacingClasses.sectionGap}>
          <h2 className="text-xs font-bold uppercase tracking-widest text-center border-b border-black pb-0.5 mb-1.5 text-black">
            Areas of Expertise & Core Competencies
          </h2>
          <div className="space-y-1 text-[11.5px] text-neutral-900">
            {skills.technical?.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="font-bold sm:w-44 shrink-0 text-black">Technical Proficiencies:</span>
                <span className="text-neutral-800">{skills.technical.join(", ")}</span>
              </div>
            )}
            {skills.tools?.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="font-bold sm:w-44 shrink-0 text-black">Tools & Architectures:</span>
                <span className="text-neutral-800">{skills.tools.join(", ")}</span>
              </div>
            )}
            {skills.softSkills?.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="font-bold sm:w-44 shrink-0 text-black">Professional Leadership:</span>
                <span className="text-neutral-800">{skills.softSkills.join(", ")}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ========================================================
          PROFESSIONAL EXPERIENCE
          ======================================================== */}
      {experience?.length > 0 && (
        <section className={spacingClasses.sectionGap}>
          <h2 className="text-xs font-bold uppercase tracking-widest text-center border-b border-black pb-0.5 mb-2 text-black">
            Professional Experience
          </h2>
          <div className={spacingClasses.itemGap}>
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <span className="font-bold text-black uppercase tracking-wide">{exp.title}</span>
                    {exp.company && <span className="font-medium italic text-neutral-800">, {exp.company}</span>}
                  </div>
                  <div className="text-[11px] font-semibold text-neutral-700">
                    {exp.startDate} – {exp.endDate || "Present"}
                  </div>
                </div>

                {exp.description && (
                  <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-neutral-900">
                    {exp.description
                      .split("\n")
                      .filter((line) => line.trim().length > 0)
                      .map((bullet, i) => (
                        <li key={i} className={spacingClasses.bulletLeading}>
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
        <section className={spacingClasses.sectionGap}>
          <h2 className="text-xs font-bold uppercase tracking-widest text-center border-b border-black pb-0.5 mb-2 text-black">
            Key Initiatives & Projects
          </h2>
          <div className={spacingClasses.itemGap}>
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <span className="font-bold text-black">{proj.name}</span>
                    {proj.techStack && (
                      <span className="text-[11px] font-medium text-neutral-700 italic">
                        {" "}— {proj.techStack}
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
                  <p className={`text-neutral-900 mt-0.5 ${spacingClasses.bulletLeading}`}>
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================
          EDUCATION
          ======================================================== */}
      {education?.length > 0 && (
        <section className={spacingClasses.sectionGap}>
          <h2 className="text-xs font-bold uppercase tracking-widest text-center border-b border-black pb-0.5 mb-2 text-black">
            Academic Background
          </h2>
          <div className={spacingClasses.itemGap}>
            {education.map((edu) => (
              <div key={edu.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <div>
                  <div className="font-bold text-black">{edu.degree}</div>
                  <div className="text-[11px] italic text-neutral-800">{edu.institution}</div>
                </div>
                <div className="sm:text-right shrink-0">
                  <div className="text-[11px] font-semibold text-neutral-700">{edu.year}</div>
                  {edu.grade && (
                    <div className="text-[10.5px] font-medium text-neutral-800">Honors: {edu.grade}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================
          CERTIFICATIONS
          ======================================================== */}
      {certifications?.length > 0 && (
        <section className={spacingClasses.sectionGap}>
          <h2 className="text-xs font-bold uppercase tracking-widest text-center border-b border-black pb-0.5 mb-1.5 text-black">
            Professional Certifications
          </h2>
          <div className="space-y-1 text-[11.5px]">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <div>
                  <span className="font-bold text-black">{cert.name}</span>
                  {cert.issuer && <span className="text-neutral-800">, {cert.issuer}</span>}
                </div>
                {cert.year && (
                  <span className="text-[11px] text-neutral-700">{cert.year}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
