import React from 'react';
import {
  X,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Info,
  Wrench,
  Search,
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';

export function ReferenceDetailModal({ defect, category, onClose, onSelectOtherCategory }) {
  if (!defect && !category) return null;

  const activeCategory = category;
  const activeDefect = defect || category?.subItems?.[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${
              activeCategory?.id === 'good-reference'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
            }`}>
              {activeCategory?.id === 'good-reference' ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <ShieldAlert className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                  Category {activeCategory?.key}: {activeCategory?.shortTitle || activeCategory?.name}
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  activeDefect?.status?.includes('CRITICAL') || activeDefect?.status?.includes('DEFECT')
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : activeDefect?.status === 'NORMAL'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {activeDefect?.status || 'REFERENCE'}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-100 tracking-wide mt-0.5">
                {activeDefect?.name || activeCategory?.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-100 transition-colors border border-slate-700"
            title="Close detail view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Main Visual Reference Display */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl flex items-center justify-center group">
              <img
                src={activeCategory?.image}
                alt={activeCategory?.name}
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-2 left-2 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-mono text-slate-400 border border-slate-800">
                Official Comparative Reference File: <span className="text-cyan-300">{activeCategory?.originalFilename}</span>
              </div>
            </div>

            {/* Sub-defect selection pills if category has multiple */}
            {activeCategory?.subItems?.length > 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-xs text-slate-400 font-semibold self-center mr-1">Condition Types:</span>
                {activeCategory.subItems.map((sub) => {
                  const isSelected = sub.id === activeDefect?.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => onSelectOtherCategory && onSelectOtherCategory(activeCategory, sub)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-bold'
                          : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {sub.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Detailed Parameter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Visual Characteristics */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Search className="w-4 h-4" />
                <span>Visual Characteristics</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeDefect?.characteristics}
              </p>
            </div>

            {/* 2. Why It Matters for Inspection */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Why It Matters for Inspection</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeDefect?.whyItMatters}
              </p>
            </div>

            {/* 3. Common Causes */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Info className="w-4 h-4" />
                <span>Common Causes (Physical Context)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeDefect?.commonCauses || 'Operating wear, thermal expansion cycles, mechanical handling.'}
              </p>
            </div>

            {/* 4. Recommended Follow-Up Action */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Wrench className="w-4 h-4" />
                <span>Recommended Action</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeDefect?.action}
              </p>
            </div>
          </div>

          {/* Scientific Accuracy & Limitations Alert */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>Inspection Limitations & Verification Notice</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeDefect?.limitations}
            </p>
            <p className="text-[11px] text-amber-200/80 italic pt-1 border-t border-amber-500/20">
              Notice: BurnerVision provides computer-vision based visual screening assistance only. 2D RGB photographic inspection cannot prove internal micro-cracks, metal fatigue, gas leakage hermeticity, line pressure, or combustion stoichiometry. For suspected cracks, material loss, or structural warping, qualified physical bench inspection is required.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-800 bg-slate-950/80">
          <span className="text-[11px] font-mono text-slate-500">
            BurnerVision Visual Defect Reference Standard V0.4.1
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-colors"
          >
            Close Reference
          </button>
        </div>
      </div>
    </div>
  );
}
