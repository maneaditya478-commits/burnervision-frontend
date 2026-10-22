import React from 'react';
import { INSPECTION_MODULES } from '../../data/inspectionModules';
import { REFERENCE_CATEGORIES } from '../../data/defectReferenceLibrary';
import { Compass, Flame, CheckCircle2, AlertTriangle, ExternalLink, ShieldAlert, Clock } from 'lucide-react';

export function StructureAndPortsSection({ report, onOpenCategory }) {
  if (!report) return null;

  const structuralModule = INSPECTION_MODULES.find(m => m.id === 'structural');
  const portsModule = INSPECTION_MODULES.find(m => m.id === 'ports');

  const getStatusBadge = (status, implemented = true) => {
    if (!implemented || status === 'NOT AVAILABLE') {
      return (
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
          PLANNED
        </span>
      );
    }
    switch (status) {
      case 'NORMAL':
        return (
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            NORMAL
          </span>
        );
      case 'DETECTED':
        return (
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
            DETECTED
          </span>
        );
      case 'POSSIBLE':
        return (
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30">
            POSSIBLE
          </span>
        );
      case 'REVIEW REQUIRED':
        return (
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
            REVIEW REQUIRED
          </span>
        );
      case 'INSUFFICIENT VISUAL EVIDENCE':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            INSUFFICIENT EVIDENCE
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* SECTION 2: BURNER STRUCTURE */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4 flex flex-col justify-between shadow-xl">
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-slate-100 text-sm tracking-wide">
                Section 2: Burner Structure (V0.2)
              </h3>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
              Concentric Multi-Ring
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Evaluates circular concentric geometry, ring contour continuity, symmetry, and gross physical deformation.
          </p>

          {/* Structural Parameters Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase">
                  <th className="py-2 px-2">Parameter</th>
                  <th className="py-2 px-2">Status</th>
                  <th className="py-2 px-2">Score / Conf</th>
                  <th className="py-2 px-2">Explanation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {structuralModule?.parameters.map(param => {
                  const res = param.evaluator(report);
                  const relatedCat = REFERENCE_CATEGORIES.find(c =>
                    c.name.toLowerCase().includes((res.relatedDefect || '').toLowerCase())
                  );

                  return (
                    <tr key={param.id} className="hover:bg-slate-900/40">
                      <td className="py-2.5 px-2 font-semibold text-slate-200 whitespace-nowrap">
                        {param.name}
                      </td>
                      <td className="py-2.5 px-2 whitespace-nowrap">
                        {getStatusBadge(res.status, param.implemented)}
                      </td>
                      <td className="py-2.5 px-2 font-mono text-[11px] whitespace-nowrap">
                        {param.implemented ? (
                          <>
                            {res.score !== null && <span className="text-slate-200 block">Score: {res.score}</span>}
                            {res.confidence !== null && <span className="text-cyan-400 block">Conf: {(res.confidence * 100).toFixed(0)}%</span>}
                            {res.score === null && res.confidence === null && <span className="text-slate-500">—</span>}
                          </>
                        ) : (
                          <span className="text-slate-500">—</span>
                        )}
                      </td>
                      <td className="py-2.5 px-2 text-slate-300 text-[11px] leading-tight">
                        <div>{res.explanation}</div>
                        {relatedCat && onOpenCategory && (
                          <button
                            type="button"
                            onClick={() => onOpenCategory(relatedCat)}
                            className="mt-1 text-[10px] text-amber-400 hover:underline flex items-center gap-0.5"
                          >
                            <span>Ref: {relatedCat.shortTitle}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SECTION 3: BURNER PORTS */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4 flex flex-col justify-between shadow-xl">
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-slate-100 text-sm tracking-wide">
                Section 3: Burner Ports (V0.2)
              </h3>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
              Gas Jet Apertures
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Evaluates drilled gas jet aperture count, occlusion indicators, aperture visibility, and pitch uniformity.
          </p>

          {/* Port Parameters Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase">
                  <th className="py-2 px-2">Parameter</th>
                  <th className="py-2 px-2">Status</th>
                  <th className="py-2 px-2">Score / Conf</th>
                  <th className="py-2 px-2">Explanation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {portsModule?.parameters.map(param => {
                  const res = param.evaluator(report);
                  const relatedCat = REFERENCE_CATEGORIES.find(c =>
                    c.name.toLowerCase().includes((res.relatedDefect || '').toLowerCase())
                  );

                  return (
                    <tr key={param.id} className="hover:bg-slate-900/40">
                      <td className="py-2.5 px-2 font-semibold text-slate-200 whitespace-nowrap">
                        {param.name}
                      </td>
                      <td className="py-2.5 px-2 whitespace-nowrap">
                        {getStatusBadge(res.status, param.implemented)}
                      </td>
                      <td className="py-2.5 px-2 font-mono text-[11px] whitespace-nowrap">
                        {param.implemented ? (
                          <>
                            {res.score !== null && <span className="text-slate-200 block">Score: {res.score}</span>}
                            {res.confidence !== null && <span className="text-cyan-400 block">Conf: {(res.confidence * 100).toFixed(0)}%</span>}
                            {res.score === null && res.confidence === null && <span className="text-slate-500">—</span>}
                          </>
                        ) : (
                          <span className="text-slate-500">—</span>
                        )}
                      </td>
                      <td className="py-2.5 px-2 text-slate-300 text-[11px] leading-tight">
                        <div>{res.explanation}</div>
                        {relatedCat && onOpenCategory && (
                          <button
                            type="button"
                            onClick={() => onOpenCategory(relatedCat)}
                            className="mt-1 text-[10px] text-amber-400 hover:underline flex items-center gap-0.5"
                          >
                            <span>Ref: {relatedCat.shortTitle}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
