import React from 'react';
import { Camera, CheckCircle2, XCircle, Sun, Frame, Sparkles } from 'lucide-react';

export function PhotoGuideCard() {
  const guidelines = [
    { text: 'Entire circular burner visible in frame', icon: Frame, good: true },
    { text: 'Good, even lighting (no heavy shadows)', icon: Sun, good: true },
    { text: 'Minimal glare on cast-iron metallic surface', icon: Sparkles, good: true },
    { text: 'Burner centered overhead (near 90° angle)', icon: CheckCircle2, good: true },
    { text: 'Avoid heavy side angles or extreme perspective', icon: XCircle, good: false }
  ];

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <Camera className="w-5 h-5 text-amber-400" />
        <h3 className="font-bold text-slate-100 text-sm tracking-wide">
          Recommended Image Capture Guide
        </h3>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed">
        For optimal accuracy from the V0.1–V0.4.1 computer vision pipeline, ensure the circular multi-ring burner meets the following conditions:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {guidelines.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`p-3 rounded-xl border flex flex-col items-start gap-2 text-xs transition-colors ${
                item.good
                  ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-amber-500/40'
                  : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <Icon className={`w-4 h-4 ${item.good ? 'text-amber-400' : 'text-rose-400'}`} />
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${item.good ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                  {item.good ? 'DO' : 'AVOID'}
                </span>
              </div>
              <span className="font-medium text-[11px] leading-tight">{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
