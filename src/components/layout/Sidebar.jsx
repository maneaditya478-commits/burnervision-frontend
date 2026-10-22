import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  ScanEye,
  History,
  BarChart3,
  Activity,
  Settings,
  ChevronLeft,
  ChevronRight,
  Flame,
  ShieldAlert,
  Cpu,
  BookOpen
} from 'lucide-react';

export function Sidebar() {
  const { activeTab, setActiveTab } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'new-inspection', label: 'New Inspection', icon: ScanEye, badge: 'V0.4.1' },
    { id: 'reference-library', label: 'Reference Library', icon: BookOpen, badge: '5 Types' },
    { id: 'history', label: 'Inspection History', icon: History },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'system-status', label: 'System Status', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside
      className={`relative flex flex-col h-screen glass-panel border-r border-slate-800 transition-all duration-300 z-30 select-none ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center gap-3 p-4 border-b border-slate-800/80">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-cyan-500 p-0.5 shadow-lg shadow-amber-500/20 shrink-0">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <Flame className="w-6 h-6 text-amber-400 animate-pulse" />
          </div>
        </div>

        {!collapsed && (
          <div className="flex flex-col overflow-hidden">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-amber-400 via-orange-300 to-cyan-400 bg-clip-text text-transparent">
                BurnerVision
              </span>
              <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30">
                AI
              </span>
            </div>
            <span className="text-[11px] text-slate-400 tracking-tight truncate">
              Cast-Iron Burner Inspection
            </span>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-transparent text-amber-300 border border-amber-500/30 shadow-md shadow-amber-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={`w-5 h-5 shrink-0 transition-colors ${
                  isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-200'
                }`}
              />

              {!collapsed && (
                <div className="flex-1 flex items-center justify-between overflow-hidden">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* System Status Footprint */}
      {!collapsed && (
        <div className="m-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>CV Pipeline</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              V0.4.1 Frozen
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Circular multi-ring model foundation active.
          </p>
        </div>
      )}

      {/* Collapse Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-3 border-t border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 flex items-center justify-center transition-colors"
      >
        {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>
    </aside>
  );
}
