import React from 'react';
import { Compass, CircleCheck, AlertTriangle } from 'lucide-react';

export function GeometryDiagram({ geometry, ports }) {
  if (!geometry) return null;

  const outerR = 120;
  const middleR = 85;
  const innerR = 50;
  const center = 150;

  const rings = [
    { name: 'Outer Ring', radius: outerR, ports: 72 },
    { name: 'Middle Ring', radius: middleR, ports: 48 },
    { name: 'Inner Ring', radius: innerR, ports: 24 }
  ];

  const obstructedCount = ports?.suspected_obstructed || 0;

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-slate-100 text-sm tracking-wide">
            Burner Ring & Port Geometry (V0.2)
          </h3>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
          3 Rings Detected
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* SVG Concentric Ring Vector Visualizer */}
        <div className="relative flex items-center justify-center p-2 bg-slate-950/80 rounded-xl border border-slate-800">
          <svg viewBox="0 0 300 300" className="w-full max-w-[280px] h-auto drop-shadow-lg">
            {/* Background Grid Lines */}
            <line x1="0" y1={center} x2="300" y2={center} stroke="#334155" strokeDasharray="3,3" strokeWidth="1" />
            <line x1={center} y1="0" x2={center} y2="300" stroke="#334155" strokeDasharray="3,3" strokeWidth="1" />

            {/* Concentric Rings */}
            {rings.map((ring, idx) => (
              <circle
                key={idx}
                cx={center}
                cy={center}
                r={ring.radius}
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.5"
                strokeDasharray="6,4"
              />
            ))}

            {/* Center Hub */}
            <circle cx={center} cy={center} r="18" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
            <circle cx={center} cy={center} r="4" fill="#06b6d4" />

            {/* Ring Port Points */}
            {rings.map((ring, rIdx) => {
              const count = ring.ports / 2; // SVG sample density
              return Array.from({ length: count }).map((_, pIdx) => {
                const angle = (pIdx * 2 * Math.PI) / count;
                const px = center + ring.radius * Math.cos(angle);
                const py = center + ring.radius * Math.sin(angle);
                const isObstructed = obstructedCount > 0 && (pIdx + rIdx) % 6 === 0;

                return (
                  <g key={`${rIdx}-${pIdx}`}>
                    <circle
                      cx={px}
                      cy={py}
                      r={isObstructed ? 4 : 2.5}
                      fill={isObstructed ? '#f97316' : '#ffffff'}
                    />
                    {isObstructed && (
                      <circle
                        cx={px}
                        cy={py}
                        r="7"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="1.5"
                        opacity="0.8"
                      />
                    )}
                  </g>
                );
              });
            })}
          </svg>
        </div>

        {/* Geometry Numerical Telemetry Grid */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Outer Radius</span>
              <span className="font-mono text-sm font-bold text-slate-100">{geometry.outer_radius_px || 240} px</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Inner Radius</span>
              <span className="font-mono text-sm font-bold text-slate-100">{geometry.inner_radius_px || 100} px</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Ring Count</span>
              <span className="font-mono text-sm font-bold text-cyan-400">{geometry.ring_count || 3} Rings</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Visible Ports</span>
              <span className="font-mono text-sm font-bold text-slate-100">{ports?.total_visible || 144}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Symmetry Score</span>
              <span className="font-mono text-sm font-bold text-emerald-400">{((geometry.symmetry_score || 0.95) * 100).toFixed(1)}%</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Radial Deviation</span>
              <span className="font-mono text-sm font-bold text-amber-400">{geometry.radial_deviation || '1.2%'}</span>
            </div>
          </div>

          {/* Perspective & Obstructed Port Status Badges */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Suspected Obstructed Ports:</span>
              <span className={`font-bold font-mono ${obstructedCount > 10 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {obstructedCount} ports
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Perspective Status:</span>
              <span className="font-mono text-slate-200">{geometry.perspective_status || 'Normal'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
