import React, { useState } from 'react';
import { GOOD_VS_DEFECTIVE_PAIRS } from '../../data/defectReferenceLibrary';
import {
  CheckCircle2,
  XCircle,
  Eye,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Info,
  Maximize2
} from 'lucide-react';

export function GoodVsDefectiveView({ onOpenDetail }) {
  const [selectedPairIndex, setSelectedPairIndex] = useState(0);
  const activePair = GOOD_VS_DEFECTIVE_PAIRS[selectedPairIndex];

  return (
    <div className="space-y-6">
      {/* Header & Sub-selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <h3 className="text-base font-bold text-slate-100 tracking-wide">
              Good vs Defective Comparison Bench
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Side-by-side comparative visual analysis inspired by official reference defect standards
          </p>
        </div>

        <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 text-slate-400 border border-slate-800 self-start sm:self-auto">
          Reference Educational Standard
        </span>
      </div>

      {/* Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {GOOD_VS_DEFECTIVE_PAIRS.map((pair, idx) => {
          const isSelected = idx === selectedPairIndex;
          return (
            <button
              key={pair.id}
              onClick={() => setSelectedPairIndex(idx)}
              className={`p-2.5 rounded-xl text-left border transition-all flex flex-col gap-1 ${
                isSelected
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md shadow-amber-950/40'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800/80 hover:text-slate-200'
              }`}
            >
              <span className="text-[10px] font-mono uppercase text-slate-400">
                Pair 0{idx + 1}
              </span>
              <span className="text-xs font-bold truncate text-slate-200">
                {pair.title.split(' vs ')[0]}
              </span>
              <span className="text-[10px] text-amber-400/90 truncate">
                vs {pair.title.split(' vs ')[1]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Comparison Card */}
      <div className="glass-card rounded-2xl border border-slate-800 p-6 space-y-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
              {activePair.category}
            </span>
            <h4 className="text-lg font-bold text-slate-100 mt-0.5">
              {activePair.title}
            </h4>
          </div>

          {onOpenDetail && (
            <button
              onClick={() => onOpenDetail(activePair)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Full Category Details</span>
            </button>
          )}
        </div>

        {/* Full Official Image Display showing both Good (Left) and Defective (Right) */}
        <div className="space-y-2">
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex items-center justify-center">
            <img
              src={activePair.image}
              alt={activePair.title}
              className="w-full h-full object-contain"
            />
            {/* Split marker indicator */}
            <div className="absolute top-3 left-3 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-[11px] font-mono px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Left: Good Reference</span>
            </div>
            <div className="absolute top-3 right-3 bg-rose-500/20 backdrop-blur-md border border-rose-500/40 text-rose-300 text-[11px] font-mono px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow">
              <XCircle className="w-3.5 h-3.5 text-rose-400" />
              <span>Right: Defective Example</span>
            </div>
          </div>
          <div className="flex justify-between text-[11px] font-mono text-slate-500 px-1">
            <span>Reference File: {activePair.originalFilename}</span>
            <span>Comparative RGB Optical Inspection</span>
          </div>
        </div>

        {/* Comparison Callout Cards (Side by side comparison columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column: Good Reference */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>{activePair.goodLabel}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activePair.goodDesc}
            </p>
            <div className="pt-2 border-t border-emerald-500/20 text-[11px] text-emerald-300/80 font-mono">
              ✓ Verified acceptable standard geometry and surface
            </div>
          </div>

          {/* Right Column: Defective Example */}
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/40 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <XCircle className="w-4 h-4" />
              <span>{activePair.defectLabel}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activePair.defectDesc}
            </p>
            <div className="pt-2 border-t border-rose-500/20 text-[11px] text-rose-300/80 font-mono">
              ✗ Defect condition requiring cleaning, bench inspection, or replacement
            </div>
          </div>
        </div>

        {/* What to Look For & Recommended Action */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <Eye className="w-4 h-4" />
              <span>What To Look For During Inspection</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activePair.whatToLookFor}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
              <AlertTriangle className="w-4 h-4" />
              <span>Recommended Follow-Up Action</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activePair.recommendedAction}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
