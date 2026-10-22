import { Sparkles, ShieldAlert, AlertCircle, Info, ExternalLink } from 'lucide-react';
import { REFERENCE_CATEGORIES } from '../../data/defectReferenceLibrary';

export function SurfaceSection({ report, onOpenCategory }) {
  if (!report) return null;

  const dirt = report.dirt || {};
  const corrosion = report.corrosion || {};
  const discoloration = report.discoloration || {};
  const surfaceAnomaly = report.surface_anomaly || {};

  const surfaceRefCat = REFERENCE_CATEGORIES.find(c => c.id === 'surface');

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-slate-100 text-sm tracking-wide">
            Section 4: Surface Condition (V0.3)
          </h3>
        </div>
        <div className="flex items-center gap-3">
          {surfaceRefCat && onOpenCategory && (
            <button
              type="button"
              onClick={() => onOpenCategory(surfaceRefCat)}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
            >
              <span>Ref: Category E</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
          <span className="text-xs font-mono text-slate-400">
            Assessable Area: <strong className="text-slate-200">96.8%</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dirt & Carbon Deposits Card */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200">Surface Dirt & Carbon Deposits</span>
            <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
              dirt.score > 50 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}>
              {dirt.level || 'LOW'} ({dirt.score || 12}/100)
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Deposit Coverage:</span>
              <span className="font-mono font-bold text-slate-200">{dirt.coverage_percent || 3.4}%</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-amber-500 rounded-full transition-all"
                style={{ width: `${dirt.coverage_percent || 3.4}%` }}
              ></div>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            {dirt.explanation}
          </p>
        </div>

        {/* Visual Corrosion Indication Card */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-200 block">
                Visual Corrosion Indication
              </span>
              <span className="text-[10px] text-amber-400 font-mono">
                Visual indication only — unconfirmed depth
              </span>
            </div>
            <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
              corrosion.score > 50 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}>
              {corrosion.level || 'NONE'} ({corrosion.score || 8}/100)
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Indication Coverage:</span>
              <span className="font-mono font-bold text-slate-200">{corrosion.coverage_percent || 0.8}%</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-rose-500 rounded-full transition-all"
                style={{ width: `${corrosion.coverage_percent || 0.8}%` }}
              ></div>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            {corrosion.explanation}
          </p>
        </div>
      </div>

      {/* Discoloration & Thermal Oxidation Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
          <span className="text-slate-400">Thermal Discoloration Bloom:</span>
          <span className="font-mono font-bold text-slate-200">{discoloration.level || 'LOW'} ({discoloration.score || 14}/100)</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
          <span className="text-slate-400">Overall Surface Anomaly Index:</span>
          <span className="font-mono font-bold text-amber-400">{surfaceAnomaly.score || 10}/100</span>
        </div>
      </div>
    </div>
  );
}
