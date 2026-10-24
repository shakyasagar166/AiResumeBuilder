import React, { useState } from "react";
import { User, Briefcase, GraduationCap, Zap, FolderGit2, Award, ChevronRight, ChevronLeft, FileText } from "lucide-react";
import PersonalInfoForm from "./PersonalInfoForm";
import ExperienceForm from "./ExperienceForm";
import EducationForm from "./EducationForm";
import SkillsForm from "./SkillsForm";
import ProjectsForm from "./ProjectsForm";
import CertificationsForm from "./CertificationsForm";

const TABS = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Zap },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "certifications", label: "Certificates", icon: Award }
];

export default function EditorContainer({ resumeData, setResumeData, onOpenPreview }) {
  const [activeTab, setActiveTab] = useState("personal");

  const currentIndex = TABS.findIndex((t) => t.id === activeTab);

  const goToNextTab = () => {
    if (currentIndex < TABS.length - 1) {
      setActiveTab(TABS[currentIndex + 1].id);
    }
  };

  const goToPrevTab = () => {
    if (currentIndex > 0) {
      setActiveTab(TABS[currentIndex - 1].id);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 bg-slate-50/90 overflow-x-auto scrollbar-none">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3.5 text-xs font-bold whitespace-nowrap transition cursor-pointer border-b-2 ${
                isActive
                  ? "border-[#ff5421] text-[#ff5421] bg-white shadow-2xs"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#ff5421]" : "text-slate-400"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Body */}
      <div className="p-5 sm:p-6 flex-1 overflow-y-auto max-h-[700px] bg-white">
        {activeTab === "personal" && (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onChange={(val) => setResumeData({ ...resumeData, personalInfo: val })}
          />
        )}
        {activeTab === "experience" && (
          <ExperienceForm
            experiences={resumeData.experience}
            onChange={(val) => setResumeData({ ...resumeData, experience: val })}
          />
        )}
        {activeTab === "education" && (
          <EducationForm
            education={resumeData.education}
            onChange={(val) => setResumeData({ ...resumeData, education: val })}
          />
        )}
        {activeTab === "skills" && (
          <SkillsForm
            skills={resumeData.skills}
            onChange={(val) => setResumeData({ ...resumeData, skills: val })}
          />
        )}
        {activeTab === "projects" && (
          <ProjectsForm
            projects={resumeData.projects}
            onChange={(val) => setResumeData({ ...resumeData, projects: val })}
          />
        )}
        {activeTab === "certifications" && (
          <CertificationsForm
            certifications={resumeData.certifications}
            onChange={(val) => setResumeData({ ...resumeData, certifications: val })}
          />
        )}
      </div>

      {/* Bottom Step Flow Navigation */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-slate-50/90 border-t border-slate-200">
        <div className="flex items-center justify-between sm:justify-start gap-2">
          <button
            type="button"
            onClick={goToPrevTab}
            disabled={currentIndex === 0}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <span className="text-[11px] text-slate-500 font-semibold px-1">
            {currentIndex + 1} / {TABS.length}
          </span>

          {currentIndex < TABS.length - 1 ? (
            <button
              type="button"
              onClick={goToNextTab}
              className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-800 bg-slate-200/80 hover:bg-slate-300 transition cursor-pointer"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : null}
        </div>

        {/* Primary CTA Button: Generate & View Resume */}
        {onOpenPreview && (
          <button
            type="button"
            onClick={onOpenPreview}
            className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-black text-white bg-gradient-to-r from-[#ff5421] to-[#e04515] hover:from-[#e04515] hover:to-[#c2380d] shadow-md shadow-orange-500/25 transition cursor-pointer active:scale-[0.98]"
          >
            <FileText className="w-4 h-4 text-white" />
            <span>2. View Resume (Preview) →</span>
          </button>
        )}
      </div>
    </div>
  );
}
