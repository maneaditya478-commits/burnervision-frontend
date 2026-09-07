import React from 'react';
import { ShieldCheck, Wrench, AlertOctagon, RotateCcw, CheckCircle2 } from 'lucide-react';

export function RecommendationPanel({ report }) {
  if (!report) return null;

  const status = report.overall_damage_status;

  const recommendationsList = [];

  if (status === 'NORMAL') {
    recommendationsList.push({
      title: 'No Significant Visual Abnormality Detected',
      desc: 'The circular multi-ring burner shows uniform ring topology, clear gas ports, and minimal surface oxidation.',
      action: 'Schedule standard periodic visual check in 6 months.',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/30'
    });
  } else if (status === 'CLEANING REQUIRED') {
    recommendationsList.push({
      title: 'Visual Surface Deposits Detected — Cleaning Recommended',
      desc: 'Grease, carbon soot, or food residue visually obscuring multiple outer gas jet ports.',
      action: 'Perform thorough wire brush carbon deposit removal and port clearing.',
      icon: Wrench,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/30'
    });
  } else {
    recommendationsList.push({
      title: 'Possible Crack-Like Indication — Manual Inspection Recommended',
      desc: 'Visual discontinuity detected along circular ring sector. Physical bench evaluation recommended.',
      action: 'Remove burner for close physical bench examination by qualified technician.',
      icon: AlertOctagon,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/30'
    });
  }

  // Add lighting re-capture check if quality is mediocre
  if (report.image_quality?.score < 80) {
    recommendationsList.push({
      title: 'Sub-Optimal Image Quality — Re-capture Recommended',
      desc: 'Glare or uneven illumination detected during V0.1 quality evaluation.',
      action: 'Capture fresh photo overhead under uniform diffused lighting.',
      icon: RotateCcw,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/30'
    });
  }

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <ShieldCheck className="w-5 h-5 text-amber-400" />
        <h3 className="font-bold text-slate-100 text-sm tracking-wide">
          Actionable Recommendations & Next Steps
        </h3>
      </div>

      <div className="space-y-3">
        {recommendationsList.map((rec, idx) => {
          const Icon = rec.icon;
          return (
            <div key={idx} className={`p-4 rounded-xl border flex items-start gap-3.5 ${rec.bg}`}>
              <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${rec.color}`} />
              <div className="space-y-1">
                <h4 className={`text-xs font-bold ${rec.color}`}>{rec.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{rec.desc}</p>
                <div className="pt-1 text-[11px] font-mono text-slate-400">
                  <strong className="text-slate-200">Recommended Action:</strong> {rec.action}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
