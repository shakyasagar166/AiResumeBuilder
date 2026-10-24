import React from "react";
import { Mail, Phone, MapPin, Globe, GraduationCap, Award, Code2, Briefcase } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "../Icons";

export default function StudentFresherTemplate({ data, accentColor, fontClass }) {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div
      className={`resume-sheet w-full bg-white text-slate-800 p-8 sm:p-10 shadow-2xl rounded-xl transition-all duration-300 ${fontClass}`}
      style={{ minHeight: "1050px" }}
    >
      {/* Top Banner Header with subtle tint */}
      <div
        className="p-6 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ backgroundColor: accentColor.bgLight, borderColor: `${accentColor.primary}33` }}
      >
        <div>
          <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-1" style={{ backgroundColor: accentColor.primary, color: '#fff' }}>
            Campus Placement & Graduate Profile
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {personalInfo.fullName || "Your Full Name"}
          </h1>
          <p className="text-sm font-semibold mt-0.5" style={{ color: accentColor.primary }}>
            {personalInfo.jobTitle || "Fresh Graduate / Candidate"}
          </p>
          {personalInfo.location && (
            <p className="text-xs text-slate-600 mt-1 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {personalInfo.location}
            </p>
          )}
        </div>

        {/* Contact links card */}
        <div className="flex flex-col gap-1 text-xs text-slate-700 bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-slate-200">
          {personalInfo.email && (
            <span className="flex items-center gap-1.5 font-medium">
              <Mail className="w-3.5 h-3.5" style={{ color: accentColor.primary }} /> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" style={{ color: accentColor.primary }} /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1.5">
              <LinkedinIcon className="w-3.5 h-3.5" style={{ color: accentColor.primary }} /> {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1.5">
              <GithubIcon className="w-3.5 h-3.5" style={{ color: accentColor.primary }} /> {personalInfo.github}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mt-5">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic border-l-2 pl-3" style={{ borderColor: accentColor.primary }}>
            "{personalInfo.summary}"
          </p>
        </section>
      )}

      {/* Education First for Students */}
      {education && education.length > 0 && (
        <section className="mt-5">
          <h2 className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold mb-3" style={{ color: accentColor.primary }}>
            <GraduationCap className="w-4 h-4" /> Academic Background & Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                <div>
                  <div className="font-bold text-slate-900 text-sm">{edu.degree}</div>
                  <div className="text-slate-600 text-xs font-medium">{edu.institution} {edu.location ? `• ${edu.location}` : ""}</div>
                </div>
                <div className="flex sm:flex-col items-baseline sm:items-end justify-between text-xs">
                  <span className="font-semibold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-800">
                    {edu.grade || "Aggregate CGPA"}
                  </span>
                  <span className="text-slate-500 font-medium text-[11px] sm:mt-1">{edu.year}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technical Skills */}
      {skills && (
        <section className="mt-5">
          <h2 className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold mb-2.5" style={{ color: accentColor.primary }}>
            <Code2 className="w-4 h-4" /> Technical & Core Skills
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {(skills.technical || []).map((skill, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md text-xs font-semibold text-slate-800 border"
                style={{ backgroundColor: accentColor.bgLight, borderColor: `${accentColor.primary}44` }}
              >
                {skill}
              </span>
            ))}
            {(skills.tools || []).map((tool, idx) => (
              <span
                key={`t-${idx}`}
                className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects Highlights */}
      {projects && projects.length > 0 && (
        <section className="mt-5">
          <h2 className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold mb-3" style={{ color: accentColor.primary }}>
            <Code2 className="w-4 h-4" /> Key Academic & Personal Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="border-l-2 pl-3" style={{ borderColor: accentColor.primary }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">
                    {proj.name}
                    {proj.techStack && (
                      <span className="ml-2 font-mono text-[11px] text-slate-500">[{proj.techStack}]</span>
                    )}
                  </div>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold hover:underline"
                      style={{ color: accentColor.primary }}
                    >
                      View Live / GitHub →
                    </a>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Internships & Experience */}
      {experience && experience.length > 0 && (
        <section className="mt-5">
          <h2 className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold mb-3" style={{ color: accentColor.primary }}>
            <Briefcase className="w-4 h-4" /> Internships & Practical Training
          </h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id} className="text-xs sm:text-sm">
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>{exp.title} - <span className="font-normal text-slate-600">{exp.company}</span></span>
                  <span className="text-slate-500 text-xs font-normal">{exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ""}</span>
                </div>
                <div className="text-xs text-slate-600 mt-1 whitespace-pre-line leading-relaxed">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mt-5 pt-3 border-t border-slate-200">
          <h2 className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold mb-2" style={{ color: accentColor.primary }}>
            <Award className="w-4 h-4" /> Certifications & Achievements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {certifications.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-800">{c.name}</span>
                <span className="text-slate-500 text-[11px]">{c.issuer}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
