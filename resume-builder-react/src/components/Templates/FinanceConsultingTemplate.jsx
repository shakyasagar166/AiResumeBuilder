import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { LinkedinIcon } from "../Icons";

export default function FinanceConsultingTemplate({ data, accentColor, fontClass }) {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div
      className={`resume-sheet w-full bg-white text-slate-900 p-8 sm:p-12 shadow-2xl rounded-xl transition-all duration-300 font-serif`}
      style={{ minHeight: "1050px" }}
    >
      {/* Header */}
      <div className="text-center pb-4 border-b-2 border-slate-900">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 uppercase">
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        <p className="text-xs font-semibold tracking-widest mt-1 text-slate-700 uppercase">
          {personalInfo.jobTitle || "Strategic Consultant & Analyst"}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 mt-2.5 text-xs text-slate-600 font-sans">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.email && <span>• {personalInfo.email}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mt-5">
          <h2 className="text-xs uppercase font-bold tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-2">
            Executive Summary
          </h2>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed text-justify font-sans">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xs uppercase font-bold tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-2.5">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-sm text-slate-900">
                    {exp.company}
                  </span>
                  <span className="text-xs text-slate-600 font-sans">
                    {exp.startDate} {exp.endDate ? `– ${exp.endDate}` : "- Present"}
                  </span>
                </div>
                <div className="flex justify-between text-xs italic text-slate-700 mb-1">
                  <span>{exp.title}</span>
                  {exp.location && <span className="font-sans not-italic text-slate-500">{exp.location}</span>}
                </div>
                <div className="text-xs text-slate-800 mt-1 whitespace-pre-line leading-relaxed font-sans">
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
          <h2 className="text-xs uppercase font-bold tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-2.5">
            Key Engagements & Projects
          </h2>
          <div className="space-y-3 font-sans">
            {projects.map((proj) => (
              <div key={proj.id} className="text-xs">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{proj.name}</span>
                  {proj.techStack && <span className="font-normal text-slate-500">[{proj.techStack}]</span>}
                </div>
                <p className="text-slate-700 mt-0.5 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xs uppercase font-bold tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-2">
            Education
          </h2>
          <div className="space-y-1.5 text-xs font-sans">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-slate-900">{edu.institution}</span>
                  <span className="text-slate-700">, {edu.degree}</span>
                </div>
                <span className="text-slate-600 font-medium">{edu.year} {edu.grade ? `(Honors: ${edu.grade})` : ""}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && (
        <section className="mt-5 pt-2 border-t border-slate-200">
          <h2 className="text-xs uppercase font-bold tracking-widest text-slate-900 mb-1.5">
            Core Competencies
          </h2>
          <div className="text-xs text-slate-800 font-sans space-y-1">
            {skills.technical?.length > 0 && <div><strong>Technical & Analytical:</strong> {skills.technical.join(", ")}</div>}
            {skills.tools?.length > 0 && <div><strong>Tools & Platforms:</strong> {skills.tools.join(", ")}</div>}
          </div>
        </section>
      )}
    </div>
  );
}
