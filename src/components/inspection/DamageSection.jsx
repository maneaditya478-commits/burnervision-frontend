import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, Activity, Info, ExternalLink } from 'lucide-react';
import { REFERENCE_CATEGORIES } from '../../data/defectReferenceLibrary';

export function DamageSection({ report, onOpenCategory }) {
  if (!report) return null;

  const crack = report.crack_evidence || {};
  const ringDisc = report.ring_discontinuity || {};
  const structural = report.structural_damage || {};
  const deformation = report.deformation || {};
  const perspective = report.perspective || {};

  const isDamaged = report.overall_damage_status === 'INSPECTION NEEDED';
  const crackRefCat = REFERENCE_CATEGORIES.find(c => c.id === 'cracks');
  const deformRefCat = REFERENCE_CATEGORIES.find(c => c.id === 'deformation');

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-400" />
          <h3 className="font-bold text-slate-100 text-sm tracking-wide">
            Section 5: Damage and Deformation (V0.4.1)
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {crackRefCat && onOpenCategory && (
            <button
              type="button"
              onClick={() => onOpenCategory(crackRefCat)}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold"
            >
              <span>Ref: Cat C / D</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
            Conservative Visual Metrics
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Crack-like Visual Indication Card */}
        <div className={`p-4 rounded-xl border space-y-3 ${
          crack.score > 40
            ? 'bg-rose-950/20 border-rose-500/40 text-slate-200'
            : 'bg-slate-900/80 border-slate-800 text-slate-300'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-100 block">
                Possible Crack-Like Visual Indication
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Visual indication candidate evaluation
              </span>
            </div>
            <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
              crack.score > 40 ? 'bg-rose-500/30 text-rose-300 border border-rose-500/50' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}>
              Score: {crack.score || 2}/100
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="text-slate-500 text-[10px] block uppercase">Candidate Count</span>
              <span className={`font-bold ${crack.candidate_count > 0 ? 'text-rose-400' : 'text-slate-300'}`}>
                {crack.candidate_count || 0} locations
              </span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="text-slate-500 text-[10px] block uppercase">Confidence</span>
              <span className="font-bold text-slate-300">
                {((crack.confidence || 0.05) * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            {crack.explanation}
          </p>
        </div>

        {/* Structural Damage & Ring Discontinuities */}
        <div className={`p-4 rounded-xl border space-y-3 ${
          structural.score > 40
            ? 'bg-rose-950/20 border-rose-500/40 text-slate-200'
            : 'bg-slate-900/80 border-slate-800 text-slate-300'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-100 block">
                Possible Structural Damage
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Ring geometry continuity
              </span>
            </div>
            <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
              structural.score > 40 ? 'bg-rose-500/30 text-rose-300 border border-rose-500/50' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}>
              Score: {structural.score || 3}/100
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="text-slate-500 text-[10px] block uppercase">Possible Discontinuities</span>
              <span className={`font-bold ${ringDisc.count > 0 ? 'text-amber-400' : 'text-slate-300'}`}>
                {ringDisc.count || 0} gaps
              </span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="text-slate-500 text-[10px] block uppercase">Deformation Status</span>
              <span className="font-bold text-slate-300 truncate">
                {deformation.status || 'NONE'}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            {structural.explanation}
          </p>
        </div>
      </div>

      {/* Conservative Terminology Notice Footer */}
      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-400">
        <Info className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>
          <strong>Conservative AI Phrasing Enforced:</strong> All structural findings are designated as <em>“Possible crack-like visual indication”</em> or <em>“Possible structural damage”</em> to emphasize visual inspection nature.
        </span>
      </div>
    </div>
  );
}
