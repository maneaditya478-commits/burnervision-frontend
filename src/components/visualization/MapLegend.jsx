import React from 'react';

export function MapLegend() {
  const legendItems = [
    { color: 'bg-emerald-500', border: 'border-emerald-400', label: 'Normal structure (Green)' },
    { color: 'bg-orange-500', border: 'border-orange-400', label: 'Possible obstruction / discontinuity (Orange)' },
    { color: 'bg-rose-500', border: 'border-rose-400', label: 'Possible damage / crack-like indication (Red)' },
    { color: 'bg-cyan-400', border: 'border-cyan-300', label: 'Detected structural rings (Cyan)' },
    { color: 'bg-slate-100', border: 'border-slate-300', label: 'Detected gas ports (White)' }
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
      <span className="font-semibold text-slate-400 uppercase text-[10px] tracking-wider mr-1">
        Map Legend:
      </span>
      {legendItems.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${item.color} ${item.border} border shadow-sm`}></span>
          <span className="text-slate-300">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
