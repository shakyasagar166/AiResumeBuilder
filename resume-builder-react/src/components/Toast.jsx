import React from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border text-xs font-semibold backdrop-blur-md ${
          toast.type === "success"
            ? "bg-emerald-950/90 border-emerald-500/40 text-emerald-200"
            : toast.type === "warning"
            ? "bg-amber-950/90 border-amber-500/40 text-amber-200"
            : "bg-slate-900 border-slate-700 text-white"
        }`}
      >
        {toast.type === "success" ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        ) : (
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
        )}
        <span>{toast.message}</span>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 hover:opacity-80 p-0.5 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
