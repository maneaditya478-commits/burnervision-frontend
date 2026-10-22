import React, { useState } from 'react';
import { INSPECTION_MODULES } from '../../data/inspectionModules';
import { REFERENCE_CATEGORIES } from '../../data/defectReferenceLibrary';
import {
  Layers,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Cpu,
  Clock,
  Info
} from 'lucide-react';

export function ModuleParametersView({ report = null, onOpenCategory = null }) {
  const [expandedModules, setExpandedModules] = useState({
    structural: true,
    ports: true,
    surface: true,
    damage: true
  });

  const toggleModule = (id) => {
    setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getStatusBadge = (status, implemented = true) => {
    if (!implemented || status === 'NOT AVAILABLE') {
      return (
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
          PLANNED / NOT AVAILABLE
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
    <div className="space-y-6">
      {/* Overview Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-100">
            BurnerVision Inspection Modules & Parameters
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            4 Core Inspection Modules with genuine V0.1–V0.4.1 measurements and planned V0.5 extensions
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Active Metrics
          </span>
          <span className="flex items-center gap-1 ml-3">
            <span className="w-2 h-2 rounded-full bg-slate-500"></span> Planned Metrics
          </span>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {INSPECTION_MODULES.map(module => {
          const isExpanded = expandedModules[module.id];
          const implementedCount = module.parameters.filter(p => p.implemented).length;
          const totalCount = module.parameters.length;

          return (
            <div
              key={module.id}
              className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-lg"
            >
              {/* Module Header Bar */}
              <button
                type="button"
                onClick={() => toggleModule(module.id)}
                className="w-full p-4 bg-slate-900/90 hover:bg-slate-850 flex items-center justify-between text-left transition-colors border-b border-slate-800/80"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-100 text-sm">
                        {module.name}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {module.stage}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {module.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-slate-400">
                    <strong className="text-slate-200">{implementedCount}</strong>/{totalCount} Implemented
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Module Parameters Table */}
              {isExpanded && (
                <div className="p-4 overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase">
                        <th className="py-2.5 px-3">Parameter Name</th>
                        <th className="py-2.5 px-3">Pipeline Status</th>
                        <th className="py-2.5 px-3">{report ? 'Result / Status' : 'Metric Type'}</th>
                        <th className="py-2.5 px-3">Score / Confidence</th>
                        <th className="py-2.5 px-3">Explanation</th>
                        <th className="py-2.5 px-3">Related Reference</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850">
                      {module.parameters.map(param => {
                        const evalResult = report ? param.evaluator(report) : null;
                        const relatedCat = REFERENCE_CATEGORIES.find(c =>
                          c.id === module.relatedRefCategoryId ||
                          c.name.toLowerCase().includes(param.name.toLowerCase()) ||
                          (evalResult?.relatedDefect && c.name.toLowerCase().includes(evalResult.relatedDefect.toLowerCase()))
                        );

                        return (
                          <tr key={param.id} className="hover:bg-slate-900/40 transition-colors">
                            {/* Parameter Name */}
                            <td className="py-3 px-3 font-semibold text-slate-200 whitespace-nowrap">
                              {param.name}
                            </td>

                            {/* Implementation Status */}
                            <td className="py-3 px-3 whitespace-nowrap">
                              {param.implemented ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Implemented</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-500">
                                  <Clock className="w-3 h-3" />
                                  <span>Planned (V0.5)</span>
                                </span>
                              )}
                            </td>

                            {/* Result / Status */}
                            <td className="py-3 px-3 whitespace-nowrap">
                              {report ? (
                                getStatusBadge(evalResult.status, param.implemented)
                              ) : (
                                <span className="font-mono text-[11px] text-slate-400">
                                  {param.implemented ? 'Quantitative / Visual' : 'Planned Algorithm'}
                                </span>
                              )}
                            </td>

                            {/* Score / Confidence (Never fabricated!) */}
                            <td className="py-3 px-3 whitespace-nowrap font-mono text-[11px]">
                              {report && param.implemented ? (
                                <div className="space-y-0.5">
                                  {evalResult.score !== null && (
                                    <div className="text-slate-200">
                                      Score: <strong>{evalResult.score}</strong>
                                    </div>
                                  )}
                                  {evalResult.confidence !== null && (
                                    <div className="text-cyan-400">
                                      Conf: {(evalResult.confidence * 100).toFixed(0)}%
                                    </div>
                                  )}
                                  {evalResult.coverage !== null && evalResult.coverage !== undefined && (
                                    <div className="text-amber-400">
                                      Area: {evalResult.coverage}%
                                    </div>
                                  )}
                                  {evalResult.score === null && evalResult.confidence === null && evalResult.coverage === undefined && (
                                    <span className="text-slate-500">—</span>
                                  )}
                                </div>
                              ) : (
                                <span className="text-slate-500">—</span>
                              )}
                            </td>

                            {/* Explanation */}
                            <td className="py-3 px-3 text-slate-300 max-w-xs text-xs leading-relaxed">
                              {report ? (
                                evalResult.explanation
                              ) : param.implemented ? (
                                'Integrated into active V0.1–V0.4.1 frozen pipeline.'
                              ) : (
                                <span className="text-slate-400 italic">
                                  Not currently computed in frozen V0.4.1. Planned for next pipeline version.
                                </span>
                              )}
                            </td>

                            {/* Related Reference Link */}
                            <td className="py-3 px-3 whitespace-nowrap">
                              {relatedCat && onOpenCategory ? (
                                <button
                                  type="button"
                                  onClick={() => onOpenCategory(relatedCat)}
                                  className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                                >
                                  <span>{relatedCat.shortTitle || relatedCat.name}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </button>
                              ) : (
                                <span className="text-slate-500 text-[11px] font-mono">
                                  {evalResult?.relatedDefect || 'Reference Card'}
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
