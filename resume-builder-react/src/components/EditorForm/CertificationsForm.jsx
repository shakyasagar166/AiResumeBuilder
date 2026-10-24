import React from "react";
import { Plus, Trash2, Award } from "lucide-react";

export default function CertificationsForm({ certifications, onChange }) {
  const handleAdd = () => {
    const newCert = {
      id: "cert-" + Date.now(),
      name: "",
      issuer: "",
      year: ""
    };
    onChange([...certifications, newCert]);
  };

  const handleRemove = (id) => {
    onChange(certifications.filter((c) => c.id !== id));
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...certifications];
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
          <h3 className="text-sm font-bold text-slate-900">Certificates & Licenses</h3>
          <p className="text-xs text-slate-500">AWS, Oracle, Unacademy, Coursera, or Google certifications.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#ff5421] hover:bg-[#e04515] text-white rounded-xl text-xs font-bold shadow-sm shadow-orange-500/20 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Certification
        </button>
      </div>

      {certifications.length === 0 && (
        <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50">
          <p className="text-xs text-slate-500 font-medium">No certifications added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-2 text-xs text-[#ff5421] hover:underline font-bold"
          >
            + Add a certificate or award
          </button>
        </div>
      )}

      {certifications.map((cert, index) => (
        <div key={cert.id || index} className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3.5">
          <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
            <span className="text-xs font-bold text-[#ff5421] uppercase tracking-wide">
              Certification #{index + 1}
            </span>
            <button
              type="button"
              onClick={() => handleRemove(cert.id)}
              className="text-slate-400 hover:text-rose-600 transition cursor-pointer p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Certification Name</label>
              <div className="relative">
                <Award className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={cert.name || ""}
                  onChange={(e) => handleItemChange(index, "name", e.target.value)}
                  placeholder="AWS Certified Solutions Architect / Java SE 11"
                  className="w-full bg-white border border-slate-300 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Year / Date</label>
              <input
                type="text"
                value={cert.year || ""}
                onChange={(e) => handleItemChange(index, "year", e.target.value)}
                placeholder="2024"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Issuing Authority / Academy</label>
            <input
              type="text"
              value={cert.issuer || ""}
              onChange={(e) => handleItemChange(index, "issuer", e.target.value)}
              placeholder="e.g. Unacademy / Amazon Web Services / Oracle"
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
