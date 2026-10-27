import React from "react";
import { Plus, Trash2, FolderGit2, Link as LinkIcon } from "lucide-react";

export default function ProjectsForm({ projects, onChange }) {
  const handleAdd = () => {
    const newProj = {
      id: "proj-" + Date.now(),
      name: "",
      techStack: "",
      link: "",
      description: ""
    };
    onChange([...projects, newProj]);
  };

  const handleRemove = (id) => {
    onChange(projects.filter((p) => p.id !== id));
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...projects];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Portfolio & Key Projects</h3>
          <p className="text-xs text-slate-500">Essential for students and engineers to demonstrate practical abilities.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#ff5421] hover:bg-[#e04515] text-white rounded-xl text-xs font-bold shadow-sm shadow-orange-500/20 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {projects.length === 0 && (
        <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50">
          <p className="text-xs text-slate-500 font-medium">No projects added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-2 text-xs text-[#ff5421] hover:underline font-bold"
          >
            + Add your top project
          </button>
        </div>
      )}

      {projects.map((proj, index) => (
        <div key={proj.id || index} className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3.5">
          <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
            <span className="text-xs font-bold text-[#ff5421] uppercase tracking-wide">
              Project #{index + 1}
            </span>
            <button
              type="button"
              onClick={() => handleRemove(proj.id)}
              className="text-slate-400 hover:text-rose-600 transition cursor-pointer p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Project Name</label>
              <div className="relative">
                <FolderGit2 className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={proj.name || ""}
                  onChange={(e) => handleItemChange(index, "name", e.target.value)}
                  placeholder="e.g. AI Resume Builder"
                  className="w-full bg-white border border-slate-300 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tech Stack</label>
              <input
                type="text"
                value={proj.techStack || ""}
                onChange={(e) => handleItemChange(index, "techStack", e.target.value)}
                placeholder="React, Spring Boot, MySQL, Docker"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Demo / GitHub Link</label>
            <div className="relative">
              <LinkIcon className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
              <input
                type="url"
                value={proj.link || ""}
                onChange={(e) => handleItemChange(index, "link", e.target.value)}
                placeholder="https://github.com/yourname/project"
                className="w-full bg-white border border-slate-300 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Project Impact & Features</label>
            <textarea
              rows={2}
              value={proj.description || ""}
              onChange={(e) => handleItemChange(index, "description", e.target.value)}
              placeholder="Built responsive interface handling 5k monthly visits. Integrated Spring Boot REST API for PDF processing..."
              className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 leading-relaxed shadow-2xs"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
