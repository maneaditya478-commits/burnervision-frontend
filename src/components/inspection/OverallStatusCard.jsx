import React from 'react';
import { CheckCircle2, AlertTriangle, ShieldAlert, Sparkles, Clock, Calendar, Download, Printer, Flame, Camera } from 'lucide-react';

export function OverallStatusCard({ report }) {
  if (!report) return null;

  const statusConfig = {
    'NORMAL': {
      title: 'NORMAL VISUAL CONDITION',
      badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      borderClass: 'border-emerald-500/40',
      gradientClass: 'from-emerald-950/40 via-slate-900 to-slate-900',
      icon: CheckCircle2,
      iconColor: 'text-emerald-400'
    },
    'CLEANING REQUIRED': {
      title: 'CLEANING REQUIRED',
      badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      borderClass: 'border-amber-500/40',
      gradientClass: 'from-amber-950/40 via-slate-900 to-slate-900',
      icon: AlertTriangle,
      iconColor: 'text-amber-400'
    },
    'INSPECTION NEEDED': {
      title: 'MANUAL BENCH INSPECTION RECOMMENDED',
      badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      borderClass: 'border-rose-500/40',
      gradientClass: 'from-rose-950/40 via-slate-900 to-slate-900',
      icon: ShieldAlert,
      iconColor: 'text-rose-400'
    }
  };

  const currentStatus = statusConfig[report.overall_damage_status] || statusConfig['NORMAL'];
  const StatusIcon = currentStatus.icon;

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(report, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BurnerVision_${report.id || 'Report'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Determine the exact badge type
  const isRealTestImage = report.image_meta?.source === 'real_test_image' || (typeof report.original_image === 'string' && (report.original_image.includes('/burner/good/') || report.original_image.includes('/burner/challenging/')));
  const isLiveAnalysis = report.badge_label === 'LIVE CV ANALYSIS' || report.isDemoResult === false;
  
  const badgeLabel = isLiveAnalysis
    ? 'LIVE CV ANALYSIS'
    : isRealTestImage
    ? 'REAL IMAGE / SIMULATED CV RESULT'
    : 'DEMO / SIMULATED';

  return (
    <div className={`glass-card rounded-2xl p-6 border ${currentStatus.borderClass} bg-gradient-to-br ${currentStatus.gradientClass} space-y-4 shadow-2xl`}>
      {/* Top Banner Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl bg-slate-950 border border-slate-800 ${currentStatus.iconColor}`}>
            <StatusIcon className="w-8 h-8 animate-pulse" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-full font-extrabold text-xs tracking-wider border uppercase ${currentStatus.badgeClass}`}>
                {report.overall_damage_status}
              </span>

              {/* Assessment Mode Badge */}
              <span
                className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold border flex items-center gap-1.5 ${
                  isLiveAnalysis
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : isRealTestImage
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}
              >
                {isLiveAnalysis ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : isRealTestImage ? (
                  <Camera className="w-3.5 h-3.5 text-cyan-400" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                )}
                <span>{badgeLabel}</span>
              </span>

              {isRealTestImage && report.image_meta?.filename && (
                <span className="text-[10px] font-mono text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                  {report.image_meta.filename}
                </span>
              )}
            </div>

            <h2 className="text-xl font-bold text-slate-100 mt-1.5">
              {currentStatus.title}
            </h2>
          </div>
        </div>

        {/* Action Controls & Report Score */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] uppercase font-mono text-slate-400 block">Condition Index</span>
            <span className="text-3xl font-extrabold font-mono bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              {report.overall_score || 85}/100
            </span>
          </div>

          <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
            <button
              onClick={handlePrint}
              className="p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700/60 transition-colors"
              title="Print Report"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleExportJSON}
              className="p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700/60 transition-colors"
              title="Download Telemetry JSON"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Primary Recommendation Banner */}
      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-slate-200 leading-relaxed">
        <strong className="text-amber-400 font-semibold block mb-1">AI Recommendation Summary:</strong>
        {report.recommendation}
      </div>

      {/* Metadata Telemetry Pills */}
      <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-3 pt-1">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            ID: <strong className="text-slate-300">{report.id}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            Analyzed: <strong className="text-slate-300">{report.date}</strong>
          </span>
        </div>

        <div className="text-amber-300/80 text-[11px]">
          {report.disclaimer}
        </div>
      </div>
    </div>
  );
}
