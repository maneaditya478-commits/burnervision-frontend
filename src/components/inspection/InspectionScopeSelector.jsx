import React from 'react';
import { INSPECTION_SCOPES } from '../../data/inspectionModules';
import {
  Layers,
  ShieldAlert,
  Flame,
  Sparkles,
  CheckCircle2,
  Check,
  Info
} from 'lucide-react';

export function InspectionScopeSelector({ selectedScope, onSelectScope }) {
  const getScopeIcon = (id) => {
    switch (id) {
      case 'full':
        return Layers;
      case 'structural':
        return ShieldAlert;
      case 'ports':
        return Flame;
      case 'surface':
        return Sparkles;
      default:
        return Layers;
    }
  };

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3.5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" />
          <h3 className="font-bold text-slate-100 text-xs uppercase tracking-wider">
            Select Inspection Scope & Focus
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          Default: <strong className="text-amber-400">Full Visual Inspection</strong>
        </span>
      </div>

      <p className="text-xs text-slate-400">
        Choose your inspection focus. BurnerVision executes the frozen V0.1–V0.4.1 pipeline and prioritizes the chosen modules in the resulting report.
      </p>

      {/* Scope Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {INSPECTION_SCOPES.map(scope => {
          const Icon = getScopeIcon(scope.id);
          const isSelected = selectedScope === scope.id;

          return (
            <button
              key={scope.id}
              type="button"
              onClick={() => onSelectScope(scope.id)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 ${
                isSelected
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 ring-1 ring-amber-500/30 shadow-md shadow-amber-950/40'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span className="font-bold text-xs truncate text-slate-100">
                    {scope.label}
                  </span>
                </div>
                {isSelected && (
                  <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-slate-950">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </div>

              <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
                {scope.description}
              </p>

              <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 self-start">
                {scope.badge}
              </span>
            </button>
          );
        })}
      </div>

      <div className="pt-1 flex items-center gap-2 text-[10px] font-mono text-slate-500">
        <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <span>
          Backend Note: The scope selector configures display and reporting focus. The full V0.1–V0.4.1 computer vision pipeline is evaluated consistently.
        </span>
      </div>
    </div>
  );
}
