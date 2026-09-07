import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ScanEye,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Activity,
  ArrowRight,
  Sparkles,
  Flame,
  BarChart3
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export function DashboardPage() {
  const { history, setActiveTab, setCurrentReport } = useApp();

  const total = history.length;
  const normalCount = history.filter(h => h.overall_damage_status === 'NORMAL').length;
  const cleaningCount = history.filter(h => h.overall_damage_status === 'CLEANING REQUIRED').length;
  const inspectionCount = history.filter(h => h.overall_damage_status === 'INSPECTION NEEDED').length;

  const avgScore = total > 0
    ? Math.round(history.reduce((acc, h) => acc + (h.overall_score || 85), 0) / total)
    : 85;

  const pieData = [
    { name: 'Normal', value: normalCount, color: '#10b981' },
    { name: 'Cleaning Required', value: cleaningCount, color: '#f59e0b' },
    { name: 'Inspection Needed', value: inspectionCount, color: '#ef4444' }
  ];

  const handleSelectReport = (report) => {
    setCurrentReport(report);
    setActiveTab('report');
  };

  return (
    <div className="space-y-6">
      {/* Hero Landing Banner */}
      <div className="relative glass-card rounded-3xl p-8 border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Circular Multi-Ring Cast-Iron Burner Inspection</span>
          </div>

          <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">
            Inspect. Analyze. Understand.
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            AI-assisted visual condition assessment for circular cast-iron gas burners. Automated V0.1–V0.4.1 computer vision pipeline for ring topology, port obstruction, surface deposits, and crack-like indications.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActiveTab('new-inspection')}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all transform hover:scale-[1.02]"
            >
              <ScanEye className="w-4 h-4" />
              <span>Start New Inspection</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className="px-4 py-3 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
            >
              View Inspection History ({total})
            </button>
          </div>
        </div>

        {/* Decorative Graphic Background */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <Flame className="w-96 h-96 text-amber-500" />
        </div>
      </div>

      {/* Metrics Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 uppercase font-mono block">Total Inspections</span>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-extrabold font-mono text-slate-100">{total}</span>
            <Activity className="w-6 h-6 text-amber-400" />
          </div>
          <span className="text-[11px] text-slate-500">Recorded scans</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 uppercase font-mono block">Normal Burners</span>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-extrabold font-mono text-emerald-400">{normalCount}</span>
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          </div>
          <span className="text-[11px] text-emerald-400/80 font-mono">
            {total > 0 ? ((normalCount / total) * 100).toFixed(0) : 0}% of total
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 uppercase font-mono block">Cleaning Required</span>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-extrabold font-mono text-amber-400">{cleaningCount}</span>
            <AlertTriangle className="w-6 h-6 text-amber-400" />
          </div>
          <span className="text-[11px] text-amber-400/80 font-mono">
            {total > 0 ? ((cleaningCount / total) * 100).toFixed(0) : 0}% of total
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 uppercase font-mono block">Inspection Needed</span>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-extrabold font-mono text-rose-400">{inspectionCount}</span>
            <ShieldAlert className="w-6 h-6 text-rose-400" />
          </div>
          <span className="text-[11px] text-rose-400/80 font-mono">
            {total > 0 ? ((inspectionCount / total) * 100).toFixed(0) : 0}% of total
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 uppercase font-mono block">Avg Condition Score</span>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-extrabold font-mono text-cyan-400">{avgScore}/100</span>
            <Sparkles className="w-6 h-6 text-cyan-400" />
          </div>
          <span className="text-[11px] text-cyan-400/80 font-mono">Overall health index</span>
        </div>
      </div>

      {/* Main Charts & Recent Inspections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Condition Distribution Donut Chart */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-slate-100 text-sm">Condition Distribution</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">Telemetry</span>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-emerald-400 font-bold block">{normalCount}</span>
              <span className="text-slate-400 text-[10px]">Normal</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-amber-400 font-bold block">{cleaningCount}</span>
              <span className="text-slate-400 text-[10px]">Cleaning</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-rose-400 font-bold block">{inspectionCount}</span>
              <span className="text-slate-400 text-[10px]">Needed</span>
            </div>
          </div>
        </div>

        {/* Recent Inspections Table */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-100 text-sm">Recent Visual Inspections</h3>
            <button
              onClick={() => setActiveTab('history')}
              className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                <tr>
                  <th className="p-3">Inspection ID</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Score</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {history.slice(0, 5).map(item => (
                  <tr key={item.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="p-3 font-mono font-bold text-slate-200">{item.id}</td>
                    <td className="p-3 text-slate-400">{item.date}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                        item.overall_damage_status === 'NORMAL'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : item.overall_damage_status === 'CLEANING REQUIRED'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      }`}>
                        {item.overall_damage_status}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-bold text-amber-400">
                      {item.overall_score || 85}/100
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleSelectReport(item)}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg border border-slate-700 transition-colors"
                      >
                        View Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
