import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { checkBackendHealth } from '../services/api';
import { Activity, Cpu, Wifi, WifiOff, CheckCircle2, RefreshCw, Server, Zap, ShieldCheck, Clock } from 'lucide-react';

export function SystemStatusPage() {
  const { backendHealth, apiBaseUrl, isDemoMode } = useApp();
  const [testingConnection, setTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const handleTestEndpoint = async () => {
    setTestingConnection(true);
    const res = await checkBackendHealth(apiBaseUrl);
    setTestResult(res);
    setTestingConnection(false);
  };

  const modules = [
    { name: 'V0.1 Image Quality', status: 'FROZEN / ACTIVE', desc: 'Lighting, resolution, blur & glare verification' },
    { name: 'V0.2 Structure & Geometry', status: 'FROZEN / ACTIVE', desc: 'Localization of outer, middle, inner rings & ports' },
    { name: 'V0.3 Surface Analysis', status: 'FROZEN / ACTIVE', desc: 'Dirt score & visual corrosion indication mapping' },
    { name: 'V0.4.1 Damage Analysis', status: 'FROZEN / ACTIVE', desc: 'Possible crack-like visual indication detection' }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Frozen Pipeline Milestone Banner */}
      <div className="glass-card rounded-2xl p-6 border border-cyan-500/40 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Cpu className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono text-xs font-bold">
                Classical CV Foundation: V0.4.1 Frozen
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-100 mt-1">
              BurnerVision Model Telemetry & Pipeline Status
            </h2>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 font-mono uppercase block">Pipeline Latency</span>
          <span className="text-2xl font-extrabold font-mono text-emerald-400">~ 1.2 s</span>
        </div>
      </div>

      {/* Services Operational Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200">Frontend Application</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-[10px]">
              ONLINE
            </span>
          </div>
          <p className="text-xs text-slate-400">React + Vite SPA running smoothly</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200">FastAPI API Layer</span>
            <span className={`px-2 py-0.5 rounded font-mono text-[10px] border ${
              isDemoMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                : backendHealth.online
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
            }`}>
              {isDemoMode ? 'DEMO MODE' : backendHealth.online ? 'CONNECTED' : 'OFFLINE'}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono text-[11px] truncate">
            {apiBaseUrl}
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200">CV Pipeline Core</span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono text-[10px]">
              READY
            </span>
          </div>
          <p className="text-xs text-slate-400">V0.1–V0.4.1 computer vision algorithms</p>
        </div>
      </div>

      {/* Computer Vision Pipeline Modules Table */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-slate-100 text-sm">Computer Vision Milestone Modules</h3>
          <span className="text-xs font-mono text-slate-400">Architecture Specs</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {modules.map((m, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">{m.name}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-[10px]">
                  {m.status}
                </span>
              </div>
              <p className="text-xs text-slate-400">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* API Endpoint Test Diagnostic Utility */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-slate-100 text-sm">API Health Ping Utility</h3>
          </div>
          <button
            onClick={handleTestEndpoint}
            disabled={testingConnection}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-colors flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${testingConnection ? 'animate-spin' : ''}`} />
            <span>Ping {apiBaseUrl}/health</span>
          </button>
        </div>

        {testResult && (
          <div className={`p-4 rounded-xl border text-xs font-mono space-y-1 ${
            testResult.online ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-amber-950/30 border-amber-500/40 text-amber-300'
          }`}>
            <div>Status: <strong>{testResult.online ? 'ONLINE (200 OK)' : 'OFFLINE / UNREACHABLE'}</strong></div>
            <div>Pipeline: {testResult.pipeline}</div>
            <div>Message: {testResult.message}</div>
          </div>
        )}
      </div>
    </div>
  );
}
