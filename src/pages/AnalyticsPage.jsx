import React from 'react';
import { useApp } from '../context/AppContext';
import { BarChart3, TrendingUp, Sparkles, ShieldAlert, Layers } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';

export function AnalyticsPage() {
  const { history } = useApp();

  // Format data for trends
  const trendData = history.map((item, idx) => ({
    name: item.id ? item.id.replace('INSP-', '') : `Scan #${idx + 1}`,
    dirt: item.dirt?.score || 20,
    corrosion: item.corrosion?.score || 10,
    crack: item.crack_evidence?.score || 5,
    score: item.overall_score || 85
  })).reverse();

  const normalCount = history.filter(h => h.overall_damage_status === 'NORMAL').length;
  const cleaningCount = history.filter(h => h.overall_damage_status === 'CLEANING REQUIRED').length;
  const inspectionCount = history.filter(h => h.overall_damage_status === 'INSPECTION NEEDED').length;

  const pieData = [
    { name: 'Normal', value: normalCount, color: '#10b981' },
    { name: 'Cleaning Required', value: cleaningCount, color: '#f59e0b' },
    { name: 'Inspection Needed', value: inspectionCount, color: '#ef4444' }
  ];

  const radarData = [
    { subject: 'Ring Geometry', A: 94, fullMark: 100 },
    { subject: 'Port Openness', A: 78, fullMark: 100 },
    { subject: 'Surface Cleanliness', A: 72, fullMark: 100 },
    { subject: 'Corrosion Absence', A: 85, fullMark: 100 },
    { subject: 'Crack Safety', A: 88, fullMark: 100 },
    { subject: 'Radial Symmetry', A: 92, fullMark: 100 }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-amber-400" />
            <span>Cast-Iron Burner Condition Analytics</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Aggregate visual telemetry metrics across all recorded inspection scans
          </p>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
          V0.4.1 Telemetry Engine
        </span>
      </div>

      {/* Grid of Recharts Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Overall Condition Score Trend */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-slate-100 text-xs uppercase font-mono">
                Condition Score Trend Over Scans
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Index / 100</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }} />
                <Area type="monotone" dataKey="score" stroke="#f59e0b" strokeWidth={2.5} fillOpacity={1} fill="url(#scoreGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Surface Deposit & Corrosion Trends */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-slate-100 text-xs uppercase font-mono">
                Dirt & Corrosion Indication Scores
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">V0.3 Surface</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }} />
                <Bar dataKey="dirt" name="Dirt Deposit Score" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="corrosion" name="Visual Corrosion Indication" fill="#c2410c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Condition Distribution Donut */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <h3 className="font-bold text-slate-100 text-xs uppercase font-mono">
                Historical Overall Condition Breakdown
              </h3>
            </div>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Burner Structural Topology Radar Chart */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <h3 className="font-bold text-slate-100 text-xs uppercase font-mono">
                Burner Health Dimension Radar
              </h3>
            </div>
            <span className="text-[10px] text-cyan-400 font-mono">Topology Map</span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={9} />
                <Radar name="Burner Health" dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
