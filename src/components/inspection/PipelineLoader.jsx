import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  CircleDashed,
  Cpu,
  Eye,
  Layers,
  Sparkles,
  ShieldAlert,
  FileCheck,
  Flame
} from 'lucide-react';

export function PipelineLoader() {
  const { analysisStage, analysisProgress } = useApp();

  const stages = [
    { id: 1, title: 'V0.1 Image Quality Verification', desc: 'Lighting, resolution, glare, & occlusion check', icon: Eye },
    { id: 2, title: 'V0.2 Structure & Geometry Analysis', desc: 'Localization of 3 concentric rings & gas ports', icon: Layers },
    { id: 3, title: 'V0.3 Surface Deposit & Oxidation Check', desc: 'Dirt score & visual corrosion indication mapping', icon: Sparkles },
    { id: 4, title: 'V0.4.1 Damage & Discontinuity Scan', desc: 'Possible crack-like visual indication detection', icon: ShieldAlert },
    { id: 5, title: 'Report Synthesis & Telemetry Generation', desc: 'Compiling structural metrics & recommendations', icon: FileCheck }
  ];

  return (
    <div className="max-w-2xl mx-auto glass-card rounded-2xl p-8 border border-slate-800 space-y-6 text-center shadow-2xl">
      {/* Radar Scanner Animation Hub */}
      <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="absolute inset-0 rounded-full border-2 border-amber-500/40 animate-ping"></div>
        <div className="absolute inset-2 rounded-full border border-cyan-500/30 animate-pulse"></div>
        <div className="absolute inset-4 rounded-full border border-slate-700 bg-slate-950 flex items-center justify-center">
          <Flame className="w-12 h-12 text-amber-400 animate-bounce" />
        </div>

        {/* Radar Scanner Sweep */}
        <div className="absolute inset-0 rounded-full border-t-2 border-amber-400 animate-radar pointer-events-none"></div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center justify-center gap-2">
          <span>AI Visual Inspection Pipeline Active</span>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            V0.4.1 Frozen
          </span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Processing circular multi-ring burner condition assessment...
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono text-slate-300">
          <span>Processing Stage {analysisStage} of 5</span>
          <span className="text-amber-400 font-bold">{analysisProgress}%</span>
        </div>
        <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-cyan-500 rounded-full transition-all duration-300 shadow-md shadow-amber-500/30"
            style={{ width: `${analysisProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Stages Pipeline Flow List */}
      <div className="space-y-2.5 text-left border-t border-slate-800/80 pt-5">
        {stages.map(stage => {
          const Icon = stage.icon;
          const isDone = analysisStage > stage.id;
          const isCurrent = analysisStage === stage.id;

          return (
            <div
              key={stage.id}
              className={`flex items-center gap-3.5 p-3 rounded-xl border transition-all ${
                isCurrent
                  ? 'bg-amber-500/10 border-amber-500/40 text-slate-100 shadow-lg shadow-amber-950/20'
                  : isDone
                  ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                  : 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-60'
              }`}
            >
              <div className="shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : isCurrent ? (
                  <CircleDashed className="w-5 h-5 text-amber-400 animate-spin" />
                ) : (
                  <Icon className="w-5 h-5 text-slate-600" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold truncate">{stage.title}</h4>
                  {isCurrent && (
                    <span className="text-[10px] font-mono text-amber-400 font-semibold uppercase animate-pulse">
                      Analyzing...
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 truncate">{stage.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
