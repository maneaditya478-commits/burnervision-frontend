import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sun, Moon, Wifi, WifiOff, Sparkles, User, ShieldCheck } from 'lucide-react';

export function Header() {
  const { activeTab, isDarkMode, setIsDarkMode, isDemoMode, setIsDemoMode, backendHealth } = useApp();

  const titles = {
    dashboard: { title: 'Burner Condition Dashboard', subtitle: 'Inspect. Analyze. Understand.' },
    'new-inspection': { title: 'New Visual Inspection', subtitle: 'Single-image circular multi-ring cast-iron burner condition assessment' },
    report: { title: 'Inspection Report', subtitle: 'Detailed multi-layer visual analysis & condition diagnostics' },
    history: { title: 'Inspection History', subtitle: 'Historical record of circular gas burner condition reports' },
    analytics: { title: 'Condition Analytics', subtitle: 'Aggregate trends for surface deposits, corrosion, and damage' },
    'system-status': { title: 'System Status & Telemetry', subtitle: 'V0.1–V0.4.1 Classical CV Foundation pipeline diagnostics' },
    settings: { title: 'System Settings', subtitle: 'API configuration, demo mode, and sensitivity thresholds' }
  };

  const currentMeta = titles[activeTab] || titles.dashboard;

  return (
    <header className="sticky top-0 z-20 glass-panel border-b border-slate-800 px-6 py-3.5 flex items-center justify-between gap-4">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>{currentMeta.title}</span>
        </h1>
        <p className="text-xs text-amber-400/90 font-medium tracking-wide">
          {currentMeta.subtitle}
        </p>
      </div>

      {/* Action Controls & Indicators */}
      <div className="flex items-center gap-3">
        {/* Backend Connectivity / Demo Mode Pill */}
        <button
          onClick={() => setIsDemoMode(!isDemoMode)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all shadow-sm ${
            isDemoMode
              ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
              : backendHealth.online
              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
              : 'bg-rose-500/10 text-rose-300 border-rose-500/30 hover:bg-rose-500/20'
          }`}
          title="Click to toggle Demo / Simulated CV Results vs Live API"
        >
          {isDemoMode ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Demo / Simulated CV Results</span>
            </>
          ) : backendHealth.online ? (
            <>
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                FastAPI Backend Connected
              </span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5 text-rose-400" />
              <span>Backend Offline (Demo Mode Active)</span>
            </>
          )}
        </button>

        {/* Dark / Light Mode Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700/60"
          title="Toggle Light / Dark Mode"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>

        {/* User Badge */}
        <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center text-amber-400 font-bold text-xs">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-slate-200">Inspector Tier-1</span>
            <span className="text-[10px] text-slate-400 font-mono">CV V0.4.1 Active</span>
          </div>
        </div>
      </div>
    </header>
  );
}
