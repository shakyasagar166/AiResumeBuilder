import React from "react";
import { Mail, Phone, MapPin, Globe, ExternalLink } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "../Icons";

export default function StandardAtsBlackWhiteTemplate({
  data,
  fontClass = "font-sans",
  density = "standard", // standard, compact, spacious
  dividerStyle = "solid" // solid, double, minimal
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

  const getDividerBorder = () => {
    if (dividerStyle === "double") return "border-b-2 border-double border-black pb-0.5";
    if (dividerStyle === "minimal") return "border-b border-neutral-300 pb-0.5";
    return "border-b border-black pb-0.5";
  };

  return (
    <div
      className={`bg-white text-black min-h-[1050px] print:min-h-0 print:h-auto w-full max-w-[820px] mx-auto shadow-sm print:shadow-none print:m-0 print:p-0 select-text ${fontClass} ${spacingClasses.padding} ${spacingClasses.fontSize}`}
      style={{ color: "#000000", backgroundColor: "#ffffff" }}
    >
      {/* ========================================================
          HEADER SECTION (100% Black & White ATS Optimized)
          ======================================================== */}
      <header className={`text-center ${spacingClasses.headerGap} border-b border-neutral-400 pb-3`}>
        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-black">
          {personalInfo.fullName || "YOUR FULL NAME"}
        </h1>

        {personalInfo.jobTitle && (
          <p className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-800 uppercase mt-1">
            {personalInfo.jobTitle}
          </p>
        )}

        {/* Contact info in single line divider */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] text-neutral-800 mt-2 font-medium">
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-black inline" />
              <span>{personalInfo.phone}</span>
            </span>
          )}

          {personalInfo.email && (
            <>
              <span className="text-neutral-400">•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-black inline" />
                <span>{personalInfo.email}</span>
              </span>
            </>
          )}

          {personalInfo.location && (
            <>
              <span className="text-neutral-400">•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-black inline" />
                <span>{personalInfo.location}</span>
              </span>
            </>
          )}

          {personalInfo.linkedin && (
            <>
              <span className="text-neutral-400">•</span>
              <span className="flex items-center gap-1">
                <LinkedinIcon className="w-3 h-3 text-black inline" />
                <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, "")}</span>
              </span>
            </>
          )}

          {personalInfo.github && (
            <>
              <span className="text-neutral-400">•</span>
              <span className="flex items-center gap-1">
                <GithubIcon className="w-3 h-3 text-black inline" />
                <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?/, "")}</span>
              </span>
            </>
          )}

          {personalInfo.portfolio && (
            <>
              <span className="text-neutral-400">•</span>
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-black inline" />
                <span>{personalInfo.portfolio.replace(/^https?:\/\/(www\.)?/, "")}</span>
              </span>
            </>
          )}
        </div>
      </header>

      {/* ========================================================
          PROFESSIONAL SUMMARY
          ======================================================== */}
      {personalInfo.summary && (
        <section className={spacingClasses.sectionGap}>
          <h2 className={`text-xs font-bold uppercase tracking-wider text-black mb-1.5 ${getDividerBorder()}`}>
            Professional Summary
          </h2>
          <p className={`text-neutral-900 ${spacingClasses.bulletLeading} text-justify`}>
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* ========================================================
          TECHNICAL & PROFESSIONAL SKILLS
          ======================================================== */}
      {(skills.technical?.length > 0 || skills.tools?.length > 0 || skills.softSkills?.length > 0) && (
        <section className={spacingClasses.sectionGap}>
          <h2 className={`text-xs font-bold uppercase tracking-wider text-black mb-1.5 ${getDividerBorder()}`}>
            Technical Skills & Competencies
          </h2>
          <div className="space-y-1 text-neutral-900 text-[11.5px]">
            {skills.technical?.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="font-bold sm:w-36 shrink-0 text-black">Languages & Frameworks:</span>
                <span className="text-neutral-800">{skills.technical.join(", ")}</span>
              </div>
            )}
            {skills.tools?.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="font-bold sm:w-36 shrink-0 text-black">Developer Tools & DB:</span>
                <span className="text-neutral-800">{skills.tools.join(", ")}</span>
              </div>
            )}
            {skills.softSkills?.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-baseline">
                <span className="font-bold sm:w-36 shrink-0 text-black">Core Competencies:</span>
                <span className="text-neutral-800">{skills.softSkills.join(", ")}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ========================================================
          WORK EXPERIENCE & INTERNSHIPS
          ======================================================== */}
      {experience?.length > 0 && (
        <section className={spacingClasses.sectionGap}>
          <h2 className={`text-xs font-bold uppercase tracking-wider text-black mb-2 ${getDividerBorder()}`}>
            Professional Experience & Internships
          </h2>
          <div className={spacingClasses.itemGap}>
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <span className="font-bold text-black">{exp.title}</span>
                    {exp.company && <span className="font-medium text-neutral-800"> — {exp.company}</span>}
                  </div>
                  <div className="text-[11px] font-semibold text-neutral-700 tabular-nums">
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
          ACADEMIC & PERSONAL PROJECTS
          ======================================================== */}
      {projects?.length > 0 && (
        <section className={spacingClasses.sectionGap}>
          <h2 className={`text-xs font-bold uppercase tracking-wider text-black mb-2 ${getDividerBorder()}`}>
            Key Projects
          </h2>
          <div className={spacingClasses.itemGap}>
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <span className="font-bold text-black">{proj.name}</span>
                    {proj.techStack && (
                      <span className="text-[11px] font-medium text-neutral-700 italic">
                        {" "}({proj.techStack})
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
          <h2 className={`text-xs font-bold uppercase tracking-wider text-black mb-2 ${getDividerBorder()}`}>
            Education
          </h2>
          <div className={spacingClasses.itemGap}>
            {education.map((edu) => (
              <div key={edu.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <div>
                  <div className="font-bold text-black">{edu.degree}</div>
                  <div className="text-[11px] text-neutral-800">{edu.institution}</div>
                </div>
                <div className="sm:text-right shrink-0">
                  <div className="text-[11px] font-semibold text-neutral-700 tabular-nums">{edu.year}</div>
                  {edu.grade && (
                    <div className="text-[10.5px] font-medium text-neutral-800">Score: {edu.grade}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================
          CERTIFICATIONS & TRAININGS
          ======================================================== */}
      {certifications?.length > 0 && (
        <section className={spacingClasses.sectionGap}>
          <h2 className={`text-xs font-bold uppercase tracking-wider text-black mb-1.5 ${getDividerBorder()}`}>
            Certifications & Training
          </h2>
          <div className="space-y-1 text-[11.5px]">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <div>
                  <span className="font-bold text-black">{cert.name}</span>
                  {cert.issuer && <span className="text-neutral-800"> — {cert.issuer}</span>}
                </div>
                {cert.year && (
                  <span className="text-[11px] text-neutral-700 tabular-nums">{cert.year}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
